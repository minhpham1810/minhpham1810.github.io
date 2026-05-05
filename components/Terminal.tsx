'use client'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { listDir, resolveSegments, segmentsToDisplay, nodeAtPath, VFSNode } from '@/lib/virtualFs'
import { contentMap } from '@/lib/contentMap'

interface TerminalProps {
  onOpenFile: (filename: string) => void
  onClose: () => void
}

interface Line {
  type: 'input' | 'output' | 'error'
  content: string
}

const COMMANDS = ['ls', 'cd', 'pwd', 'cat', 'echo', 'env', 'history', 'man', 'clear', 'open', 'help']

const MAN_PAGES: Record<string, string> = {
  ls: 'ls - list directory contents\n\nUSAGE\n  ls [-la] [DIR]\n\nOPTIONS\n  -la    long listing with permissions and sizes',
  cd: 'cd - change the working directory\n\nUSAGE\n  cd [DIR]\n  cd ~     go to home\n  cd ..    go up one level',
  cat: 'cat - concatenate and print files\n\nUSAGE\n  cat FILE',
  open: 'open - open a file in the VS Code editor\n\nUSAGE\n  open FILE',
  pwd: 'pwd - print name of current working directory',
  echo: 'echo - display a line of text\n\nUSAGE\n  echo [STRING]',
  env: 'env - print environment variables',
  history: 'history - display the command history list',
  clear: 'clear - clear the terminal screen',
  help: 'help - display available commands',
  man: 'man - display manual pages\n\nUSAGE\n  man COMMAND',
}

const FAKE_ENV = `USER=minh
HOME=/home/minh/portfolio
SHELL=/bin/bash
TERM=xterm-256color
PWD=/home/minh/portfolio
LANG=en_US.UTF-8
EDITOR=code
NODE_ENV=production`

export default function Terminal({ onOpenFile, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', content: 'Welcome to minh@portfolio. Type `help` for available commands.\n' },
  ])
  const [input, setInput] = useState('')
  const [cwdSegs, setCwdSegs] = useState<string[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const cwd = segmentsToDisplay(cwdSegs)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'auto' }) }, [lines])
  useEffect(() => { inputRef.current?.focus() }, [])

  function prompt() { return `minh@portfolio:${cwd}$ ` }

  function processCommand(raw: string): Line[] | 'clear' {
    const parts = raw.trim().split(/\s+/)
    const cmd = parts[0]
    const args = parts.slice(1)

    if (cmd === 'clear') return 'clear'

    if (cmd === 'help') return [{
      type: 'output',
      content: `Available commands:\n  ${COMMANDS.join('  ')}`,
    }]

    if (cmd === 'pwd') return [{
      type: 'output',
      content: `/home/minh/portfolio${cwdSegs.length ? '/' + cwdSegs.join('/') : ''}`,
    }]

    if (cmd === 'env') return [{ type: 'output', content: FAKE_ENV }]

    if (cmd === 'echo') return [{ type: 'output', content: args.join(' ') }]

    if (cmd === 'history') {
      const text = cmdHistory.length
        ? cmdHistory.map((h, i) => `  ${String(cmdHistory.length - i).padStart(4)}  ${h}`).join('\n')
        : '(no history)'
      return [{ type: 'output', content: text }]
    }

    if (cmd === 'man') {
      if (!args[0]) return [{ type: 'error', content: 'What manual page do you want?' }]
      const page = MAN_PAGES[args[0]]
      return page
        ? [{ type: 'output', content: page }]
        : [{ type: 'error', content: `No manual entry for ${args[0]}` }]
    }

    if (cmd === 'ls') {
      const longFmt = args.some(a => a.startsWith('-') && a.includes('l'))
      const target = args.find(a => !a.startsWith('-'))
      const segs = target ? resolveSegments(cwdSegs, target) : cwdSegs
      if (segs === null) return [{ type: 'error', content: `ls: cannot access '${target}': No such file or directory` }]
      const children = listDir(segs)
      if (!children) return [{ type: 'error', content: `ls: ${target ?? '.'}: Not a directory` }]
      if (longFmt) {
        const date = 'May  4 2026'
        const rows = children.map(n => {
          const isDir = n.type === 'dir'
          return `${isDir ? 'drwxr-xr-x' : '-rw-r--r--'}  1 minh minh  ${isDir ? ' 4096' : ' 2048'} ${date} ${n.name}${isDir ? '/' : ''}`
        })
        return [{ type: 'output', content: [`total ${children.length}`, ...rows].join('\n') }]
      }
      return [{ type: 'output', content: children.map(n => n.name + (n.type === 'dir' ? '/' : '')).join('  ') }]
    }

    if (cmd === 'cd') {
      const target = args[0] ?? '~'
      const resolved = resolveSegments(cwdSegs, target)
      if (resolved === null) return [{ type: 'error', content: `cd: ${target}: No such file or directory` }]
      const node: Pick<VFSNode, 'type'> | null = resolved.length === 0
        ? { type: 'dir' }
        : nodeAtPath(resolved.slice(0, -1), resolved[resolved.length - 1])
      if (node?.type === 'file') return [{ type: 'error', content: `cd: ${target}: Not a directory` }]
      setCwdSegs(resolved)
      return []
    }

    if (cmd === 'cat') {
      if (!args[0]) return [{ type: 'error', content: 'cat: missing file operand' }]
      const name = args[0].split('/').pop()!
      const node = nodeAtPath(cwdSegs, args[0].split('/')[0])
      if (node?.type === 'dir') return [{ type: 'error', content: `cat: ${args[0]}: Is a directory` }]
      const text = contentMap[name]
      if (!text) return [{ type: 'error', content: `cat: ${args[0]}: No such file or directory` }]
      return [{ type: 'output', content: text }]
    }

    if (cmd === 'open') {
      if (!args[0]) return [{ type: 'error', content: 'open: missing file operand' }]
      const name = args[0].split('/').pop()!
      if (!contentMap[name] && name !== 'resume.pdf') return [{ type: 'error', content: `open: ${args[0]}: No such file` }]
      onOpenFile(name)
      return [{ type: 'output', content: `Opening ${name} in editor...` }]
    }

    return [{ type: 'error', content: `bash: ${cmd}: command not found` }]
  }

  function submit() {
    const cmd = input.trim()
    const inputLine: Line = { type: 'input', content: `${prompt()}${cmd}` }
    if (!cmd) { setLines(prev => [...prev, inputLine]); setInput(''); return }
    setCmdHistory(prev => [cmd, ...prev])
    setHistIdx(-1)
    const result = processCommand(cmd)
    if (result === 'clear') {
      setLines([])
    } else {
      setLines(prev => [...prev, inputLine, ...result])
    }
    setInput('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(idx)
      if (cmdHistory[idx] !== undefined) setInput(cmdHistory[idx])
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const parts = input.split(' ')
      const last = parts[parts.length - 1]
      if (parts.length === 1) {
        const matches = COMMANDS.filter(c => c.startsWith(last))
        if (matches.length === 1) setInput(matches[0] + ' ')
      } else {
        const children = listDir(cwdSegs) ?? []
        const matches = children.filter(n => n.name.startsWith(last))
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0].name + (matches[0].type === 'dir' ? '/' : '')
          setInput(parts.join(' '))
        }
      }
    }
  }

  return (
    <div
      className="flex flex-col h-full bg-vscode-bg text-vscode-text font-mono text-[13px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between px-3 border-b border-vscode-border bg-vscode-tabInactive h-8 flex-shrink-0">
        <span className="text-[11px] text-vscode-text border-t-2 border-[#007acc] px-1 h-full flex items-center">
          TERMINAL
        </span>
        <button
          onClick={onClose}
          className="text-vscode-textMuted hover:text-vscode-text text-lg leading-none px-1"
        >
          &times;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words leading-5 ${line.type === 'error' ? 'text-red-400' : 'text-vscode-text'}`}
          >
            {line.content}
          </pre>
        ))}
        <div className="flex items-center">
          <span className="text-green-400 select-none whitespace-pre">{prompt()}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-vscode-text caret-white min-w-0"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
