'use client'
import { useEffect, useRef, KeyboardEvent } from 'react'

interface FindPanelProps {
  query: string
  onChange: (q: string) => void
  matchCount: number
  activeMatch: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  caseSensitive: boolean
  onToggleCase: () => void
  useRegex: boolean
  onToggleRegex: () => void
}

export default function FindPanel({
  query, onChange, matchCount, activeMatch,
  onNext, onPrev, onClose,
  caseSensitive, onToggleCase,
  useRegex, onToggleRegex,
}: FindPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'Enter') { e.shiftKey ? onPrev() : onNext() }
  }

  const counterText = !query
    ? ''
    : matchCount === 0
    ? 'No results'
    : `${activeMatch + 1} of ${matchCount}`

  return (
    <div className="absolute top-2 right-2 z-40 flex max-w-[calc(100%-1rem)] items-center gap-1 rounded border border-vscode-border bg-[#252526] px-2 py-1.5 shadow-xl sm:right-4">
      <input
        ref={inputRef}
        value={query}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find"
        className="w-28 rounded border border-transparent bg-[#3c3c3c] px-2 py-0.5 text-[13px] text-vscode-text outline-none placeholder:text-vscode-textMuted focus:border-[#007acc] sm:w-48"
        spellCheck={false}
      />
      {counterText && (
        <span className="hidden w-16 text-center text-[11px] text-vscode-textMuted sm:inline">{counterText}</span>
      )}
      <button
        onClick={onToggleCase}
        title="Match Case"
        className={`w-6 h-6 text-[11px] font-bold rounded flex items-center justify-center transition-colors ${caseSensitive ? 'bg-vscode-highlight text-vscode-text' : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight'}`}
      >Aa</button>
      <button
        onClick={onToggleRegex}
        title="Use Regular Expression"
        className={`w-6 h-6 text-[11px] rounded flex items-center justify-center transition-colors ${useRegex ? 'bg-vscode-highlight text-vscode-text' : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight'}`}
      >.*</button>
      <button onClick={onPrev} title="Previous Match (Shift+Enter)" className="w-6 h-6 text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight rounded flex items-center justify-center">&uarr;</button>
      <button onClick={onNext} title="Next Match (Enter)" className="w-6 h-6 text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight rounded flex items-center justify-center">&darr;</button>
      <button onClick={onClose} title="Close (Escape)" className="w-6 h-6 text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight rounded flex items-center justify-center text-lg leading-none">&times;</button>
    </div>
  )
}
