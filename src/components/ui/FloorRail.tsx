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
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    for (const s of stops) {
      const el = document.getElementById(s.id)
      if (el) spy.observe(el)
    }
    return () => spy.disconnect()
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
