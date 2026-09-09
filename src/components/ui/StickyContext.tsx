import { useEffect, useState } from 'react'

const sections: { id: string; label: string; context?: string; mode?: string }[] = [
  { id: 'origin', label: 'IDENTITY', context: 'ORIGIN' },
  { id: 'map', label: 'DOMAIN MAP' },
  { id: 'systems', label: 'SYSTEMS', context: 'SYSTEM DIRECTORY', mode: 'BROWSE' },
  { id: 'engineering', label: 'ENGINEERING', context: 'CAPABILITIES & METHOD' },
  { id: 'experience', label: 'EXPERIENCE', context: 'CREDENTIALS' },
  { id: 'now', label: 'CURRENT FOCUS' },
  { id: 'connect', label: 'CONNECT', mode: 'BUILD TOGETHER' },
]

export default function StickyContext() {
  const [active, setActive] = useState('origin')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.4
      let cur = sections[0].id
      let best = Infinity
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const d = Math.abs(el.getBoundingClientRect().top - mid)
        if (d < best) {
          best = d
          cur = s.id
        }
      }
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const current = sections.find((s) => s.id === active)
  const idx = sections.findIndex((s) => s.id === active)

  return (
    <aside className="sticky-context" aria-hidden="true">
      <div className="sticky-context-inner">
        <div className="sticky-context-num">
          {String(idx + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </div>
        <div className="sticky-context-label">{current?.label}</div>
        {current?.context && (
          <div className="sticky-context-row">
            <span className="sticky-context-k">CONTEXT</span>
            <span className="sticky-context-v">{current.context}</span>
          </div>
        )}
        {current?.mode && (
          <div className="sticky-context-row">
            <span className="sticky-context-k">MODE</span>
            <span className="sticky-context-v">{current.mode}</span>
          </div>
        )}
      </div>
    </aside>
  )
}
