import { useEffect, useState } from 'react'
import { scrollToHash } from '../../utils/scroll'

const stops = [
  { id: 'origin', label: 'Origin' },
  { id: 'map', label: 'Map' },
  { id: 'systems', label: 'Systems' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'experience', label: 'Experience' },
  { id: 'now', label: 'Now' },
  { id: 'connect', label: 'Connect' },
]

export default function FloorRail() {
  const [active, setActive] = useState('origin')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let cur = stops[0].id
      let best = Infinity
      for (const s of stops) {
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
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav className="floorrail" aria-label="Section navigation">
      <span className="floorrail-eyebrow">FLOOR RAIL</span>
      <div className="floorrail-track" aria-hidden="true">
        {stops.map((s) => {
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToHash(`#${s.id}`, 80)}
              className={`floorrail-stop ${isActive ? 'floorrail-stop--active' : ''}`}
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="floorrail-dot" />
              <span className="floorrail-label">{s.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
