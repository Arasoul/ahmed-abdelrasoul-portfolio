import { chapters } from '../../data/chapters'
import { scrollToHash } from '../../utils/scroll'
import { useActiveChapter } from '../../hooks/useActiveChapter'

export default function FloorRail() {
  const active = useActiveChapter()

  return (
    <nav className="floorrail" aria-label="Section navigation">
      <span className="floorrail-eyebrow">FLOOR RAIL</span>
      <div className="floorrail-track" aria-hidden="true">
        {chapters.map((ch) => {
          const isActive = ch.id === active
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToHash(ch.hash, 80)}
              className={`floorrail-stop ${isActive ? 'floorrail-stop--active' : ''}`}
              aria-label={`Go to ${ch.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="floorrail-dot" />
              <span className="floorrail-label">{ch.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}