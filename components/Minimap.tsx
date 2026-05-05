'use client'
import { useEffect, useRef, useState, RefObject, MouseEvent as ReactMouseEvent } from 'react'

interface MinimapProps {
  content: string
  scrollRef: RefObject<HTMLDivElement>
}

type LineType = 'heading' | 'code' | 'blank' | 'text'

function classifyLine(line: string): LineType {
  if (!line.trim()) return 'blank'
  if (/^#{1,6}\s/.test(line)) return 'heading'
  if (line.startsWith('```') || line.startsWith('    ') || line.startsWith('\t')) return 'code'
  return 'text'
}

const LINE_COLORS: Record<LineType, string> = {
  heading: '#569cd6',
  code: '#4ec9b0',
  text: '#858585',
  blank: 'transparent',
}

const LINE_H = 2

export default function Minimap({ content, scrollRef }: MinimapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportTop, setViewportTop] = useState(0)
  const [viewportRatio, setViewportRatio] = useState(1)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)

  const lines = content.split('\n')
  const totalH = lines.length * LINE_H

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    function update() {
      const ratio = el!.clientHeight / el!.scrollHeight
      setViewportRatio(Math.min(ratio, 1))
      setViewportTop((el!.scrollTop / el!.scrollHeight) * totalH)
    }
    update()
    el.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scrollRef, totalH])

  function handleMinimapClick(e: ReactMouseEvent<HTMLDivElement>) {
    if (isDragging.current) return
    const rect = containerRef.current!.getBoundingClientRect()
    const ratio = (e.clientY - rect.top) / totalH
    if (scrollRef.current) {
      scrollRef.current.scrollTop = ratio * scrollRef.current.scrollHeight
    }
  }

  function handleViewportMouseDown(e: ReactMouseEvent) {
    e.stopPropagation()
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = scrollRef.current?.scrollTop ?? 0

    function onMove(ev: MouseEvent) {
      if (!isDragging.current) return
      const delta = ev.clientY - dragStartY.current
      if (scrollRef.current) {
        scrollRef.current.scrollTop = dragStartScroll.current + (delta / totalH) * scrollRef.current.scrollHeight
      }
    }
    function onUp() {
      isDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  if (viewportRatio >= 1) return null

  const viewportH = Math.max(20, viewportRatio * totalH)

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 w-[80px] border-l border-vscode-border overflow-hidden cursor-pointer select-none"
      onClick={handleMinimapClick}
    >
      {lines.map((line, i) => {
        const type = classifyLine(line)
        if (type === 'blank') return null
        const w = Math.min(72, Math.max(8, Math.round(line.trimEnd().length * 1.1)))
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * LINE_H,
              left: 4,
              width: w,
              height: LINE_H - 0.5,
              background: LINE_COLORS[type],
              opacity: 0.55,
              borderRadius: 1,
            }}
          />
        )
      })}
      <div
        style={{
          position: 'absolute',
          top: viewportTop,
          left: 0,
          right: 0,
          height: viewportH,
          background: 'rgba(255,255,255,0.07)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          cursor: 'ns-resize',
        }}
        onMouseDown={handleViewportMouseDown}
      />
    </div>
  )
}
