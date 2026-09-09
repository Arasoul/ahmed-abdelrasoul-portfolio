import { useEffect, useRef, useState } from 'react'
import { withBase } from '../../utils/assetPath'

const stages = [
  'ARTIFACT IMAGE',
  'OBJECT DETECTION',
  'SEGMENTATION',
  'CLASSIFICATION',
  'READING ORDER',
  'TRANSLITERATION',
  'TRANSLATION',
]

const boxes: Array<{ left: number; top: number; w: number; h: number; label?: string }> = [
  { left: 18, top: 22, w: 20, h: 26 },
  { left: 42, top: 34, w: 22, h: 24 },
  { left: 68, top: 18, w: 16, h: 30 },
  { left: 33, top: 56, w: 18, h: 20 },
]

const hieroglyphs = [
  '𓀀','𓀁','𓀂','𓀃','𓁀','𓁁','𓁂','𓁃','𓂀','𓂁','𓂂','𓂃','𓃀','𓃁','𓃂','𓃃',
  '𓄀','𓄁','𓄂','𓄃','𓅀','𓅁','𓅂','𓅃','𓆀','𓆁','𓆂','𓆃','𓇀','𓇁','𓇂','𓇃',
  '𓈀','𓈁','𓈂','𓈃','𓉀','𓉁','𓉂','𓉃','𓊀','𓊁','𓊂','𓊃','𓋀','𓋁','𓋂','𓋃',
  '𓌀','𓌁','𓌂','𓌃','𓍀','𓍁','𓍂','𓍃','𓎀','𓎁','𓎂','𓎃','𓏀','𓏁','𓏂','𓏃',
]

function generateWallGrid(): string[][] {
  const rows = 5
  const cols = 8
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      hieroglyphs[Math.floor(Math.random() * hieroglyphs.length)]
    )
  )
}

export default function PharaohPipeline() {
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const [imgOk, setImgOk] = useState(false)
  const [wallGrid] = useState(generateWallGrid)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % stages.length), 1800)
    return () => window.clearInterval(id)
  }, [inView])

  const showBoxes = step >= 1 && step <= 3
  const showMasks = step >= 2
  const showOrder = step >= 4

  const imgSrc = withBase('/images/pharouh.png')

  return (
    <div ref={rootRef} className="pharaoh-visual">
      <div className="relative overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border-accent)' }}>
        {/* Real artifact image when available */}
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pharaoh-artifact"
          onLoad={() => setImgOk(true)}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        {/* Hieroglyphic wall simulation (fallback when no image file) */}
        {!imgOk && (
          <div className="pharaoh-wall">
            {wallGrid.map((row, ri) => (
              <div key={ri} className="pharaoh-wall-row">
                {row.map((g, ci) => (
                  <span
                    key={ci}
                    className="pharaoh-glyph"
                    style={{ animationDelay: `${(ri * row.length + ci) * 40}ms` }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="pharaoh-scanline" aria-hidden="true" />

        {boxes.map((b, i) => (
          <div
            key={i}
            className={`pharaoh-box ${showBoxes ? 'pharaoh-box--on' : ''}`}
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              transitionDelay: `${i * 120}ms`,
              background: showMasks && i % 2 === 0 ? 'var(--accent-primary-10)' : 'transparent',
            }}
          >
            {showBoxes && (
              <span className="pharaoh-box-label">
                D-{String(i + 1).padStart(2, '0')}
              </span>
            )}
          </div>
        ))}

        <div className="absolute left-3 top-3 rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-accent"
          style={{ background: 'color-mix(in srgb, var(--bg-surface) 82%, transparent)' }}>
          {stages[step]}
        </div>

        {showOrder && (
          <div className="absolute bottom-3 right-3 rounded-md px-2 py-1 font-mono text-[9px] tracking-wider text-secondary"
            style={{ background: 'color-mix(in srgb, var(--bg-surface) 86%, transparent)' }}>
            READING ORDER → TRANSLITERATION → TRANSLATION
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
          DETECTION · SEGMENTATION · CLASSIFICATION · TRANSLATION
        </span>
        <span className="font-mono text-[9px] text-accent">40K+ files · 1,080 classes</span>
      </div>
    </div>
  )
}