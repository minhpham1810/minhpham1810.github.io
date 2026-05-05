'use client'
import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { allFiles } from '@/lib/virtualFs'

type PaletteMode = 'files' | 'commands'

interface PaletteCommand {
  label: string
  description: string
  action: string
}

const PALETTE_COMMANDS: PaletteCommand[] = [
  { label: 'Open Terminal', description: 'View: Toggle Terminal', action: 'openTerminal' },
  { label: 'Close Tab', description: 'View: Close Editor', action: 'closeTab' },
  { label: 'Toggle Preview', description: 'Markdown: Toggle Preview', action: 'togglePreview' },
  { label: 'Toggle Split View', description: 'View: Toggle Split Editor', action: 'toggleSplit' },
  { label: 'Go to File...', description: '', action: 'gotoFile' },
]

interface CommandPaletteProps {
  recentFiles: string[]
  onOpenFile: (filename: string) => void
  onCommand: (action: string) => void
  onClose: () => void
  initialMode: PaletteMode
}

function fuzzyMatch(query: string, target: string): { matched: boolean; indices: number[] } {
  if (!query) return { matched: true, indices: [] }
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  const indices: number[] = []
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { indices.push(ti); qi++ }
  }
  return qi === q.length ? { matched: true, indices } : { matched: false, indices: [] }
}

function HighlightedText({ text, indices }: { text: string; indices: number[] }) {
  const set = new Set(indices)
  return (
    <>
      {text.split('').map((ch, i) =>
        set.has(i)
          ? <span key={i} className="text-[#18a3ff]">{ch}</span>
          : <span key={i}>{ch}</span>
      )}
    </>
  )
}

export default function CommandPalette({
  recentFiles, onOpenFile, onCommand, onClose, initialMode,
}: CommandPaletteProps) {
  const [query, setQuery] = useState(initialMode === 'commands' ? '>' : '')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const isCommandMode = query.startsWith('>')
  const searchQuery = isCommandMode ? query.slice(1).trimStart() : query

  const fileResults = !isCommandMode
    ? allFiles()
        .map(f => ({ ...f, ...fuzzyMatch(searchQuery, f.name) }))
        .filter(r => r.matched)
        .slice(0, 8)
    : []

  const cmdResults = isCommandMode
    ? PALETTE_COMMANDS.filter(c =>
        !searchQuery || c.label.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : []

  const resultCount = isCommandMode ? cmdResults.length : fileResults.length

  useEffect(() => { setSelectedIdx(0) }, [query])
  useEffect(() => { inputRef.current?.focus() }, [])

  function select(idx: number) {
    if (isCommandMode) {
      const cmd = cmdResults[idx]
      if (!cmd) return
      if (cmd.action === 'gotoFile') { setQuery(''); return }
      onCommand(cmd.action)
      onClose()
    } else {
      const file = fileResults[idx]
      if (!file) return
      onOpenFile(file.name)
      onClose()
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, resultCount - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter') { select(selectedIdx) }
  }

  const showRecent = !isCommandMode && !searchQuery && recentFiles.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-[90vw] bg-[#252526] border border-vscode-border rounded shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isCommandMode ? 'Type a command...' : 'Go to File...'}
          className="w-full px-4 py-3 bg-transparent outline-none text-vscode-text text-[13px] placeholder:text-vscode-textMuted border-b border-vscode-border"
        />
        <div className="max-h-[320px] overflow-y-auto">
          {showRecent && (
            <>
              <div className="px-4 py-1 text-[11px] text-vscode-textMuted uppercase tracking-wider">recently opened</div>
              {recentFiles.slice(0, 5).map((f, i) => (
                <div
                  key={f}
                  className={`flex items-center px-4 py-1.5 cursor-pointer text-[13px] ${i === selectedIdx ? 'bg-vscode-highlight' : 'hover:bg-vscode-highlight'} text-vscode-text`}
                  onClick={() => { onOpenFile(f); onClose() }}
                >
                  {f}
                </div>
              ))}
            </>
          )}
          {!isCommandMode && searchQuery && (
            fileResults.length === 0
              ? <div className="px-4 py-2 text-vscode-textMuted text-[13px]">No files matching &lsquo;{searchQuery}&rsquo;</div>
              : fileResults.map((r, i) => (
                  <div
                    key={r.name + r.folder}
                    className={`flex items-center px-4 py-1.5 cursor-pointer text-[13px] ${i === selectedIdx ? 'bg-vscode-highlight' : 'hover:bg-vscode-highlight'} text-vscode-text`}
                    onClick={() => { onOpenFile(r.name); onClose() }}
                  >
                    <span className="flex-1"><HighlightedText text={r.name} indices={r.indices} /></span>
                    {r.folder && <span className="text-vscode-textMuted text-[11px] ml-3">{r.folder}</span>}
                  </div>
                ))
          )}
          {isCommandMode && (
            cmdResults.length === 0
              ? <div className="px-4 py-2 text-vscode-textMuted text-[13px]">No commands matching &lsquo;{searchQuery}&rsquo;</div>
              : cmdResults.map((c, i) => (
                  <div
                    key={c.action}
                    className={`flex items-center justify-between px-4 py-1.5 cursor-pointer text-[13px] ${i === selectedIdx ? 'bg-vscode-highlight' : 'hover:bg-vscode-highlight'} text-vscode-text`}
                    onClick={() => select(i)}
                  >
                    <span>{c.label}</span>
                    {c.description && <span className="text-vscode-textMuted text-[11px]">{c.description}</span>}
                  </div>
                ))
          )}
        </div>
      </div>
    </div>
  )
}
