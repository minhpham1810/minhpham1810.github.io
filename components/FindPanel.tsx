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

  let invalidPattern = false
  if (useRegex && query) {
    try {
      new RegExp(query)
    } catch {
      invalidPattern = true
    }
  }

  const counterText = invalidPattern
    ? 'Invalid pattern'
    : !query
    ? ''
    : matchCount === 0
    ? 'No results'
    : `${activeMatch + 1} of ${matchCount}`

  return (
    <div className="absolute right-2 top-2 z-40 flex max-w-[calc(100%-1rem)] items-center gap-1 border border-vscode-border bg-vscode-surfaceRaised px-2 py-1.5 shadow-[0_16px_40px_rgba(5,7,5,0.36)] sm:right-4">
      <input
        ref={inputRef}
        value={query}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find"
        aria-invalid={invalidPattern}
        className={`w-28 border bg-vscode-bg px-2 py-1 text-[13px] text-vscode-text outline-none placeholder:text-vscode-textMuted sm:w-48 ${
          invalidPattern
            ? "border-vscode-accent"
            : "border-vscode-border focus:border-vscode-accent"
        }`}
        spellCheck={false}
      />
      {counterText && (
        <span className={`hidden w-20 text-center text-[10px] sm:inline ${
          invalidPattern ? "text-[#d88970]" : "text-vscode-textMuted"
        }`}>{counterText}</span>
      )}
      <button
        onClick={onToggleCase}
        title="Match Case"
        className={`flex h-6 w-6 items-center justify-center text-[11px] font-bold transition-colors ${caseSensitive ? 'bg-vscode-accent text-[#17120f]' : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight'}`}
      >Aa</button>
      <button
        onClick={onToggleRegex}
        title="Use Regular Expression"
        className={`flex h-6 w-6 items-center justify-center text-[11px] transition-colors ${useRegex ? 'bg-vscode-accent text-[#17120f]' : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-highlight'}`}
      >.*</button>
      <button onClick={onPrev} title="Previous Match (Shift+Enter)" className="flex h-6 w-6 items-center justify-center text-vscode-textMuted hover:bg-vscode-highlight hover:text-vscode-text">&uarr;</button>
      <button onClick={onNext} title="Next Match (Enter)" className="flex h-6 w-6 items-center justify-center text-vscode-textMuted hover:bg-vscode-highlight hover:text-vscode-text">&darr;</button>
      <button onClick={onClose} title="Close (Escape)" className="flex h-6 w-6 items-center justify-center text-lg leading-none text-vscode-textMuted hover:bg-vscode-highlight hover:text-vscode-text">&times;</button>
    </div>
  )
}
