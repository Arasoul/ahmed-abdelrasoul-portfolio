import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  label: string
  description?: string
  icon?: string
}

export default function AnimatedCounter({ value, label, description, icon }: Props) {
  const [displayed, setDisplayed] = useState('0')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const num = parseInt(value.replace(/[^0-9]/g, ''))
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !num) { setDisplayed(value); return }
    let frame: number
    const start = performance.now()
    const duration = 800 + Math.random() * 400
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(String(Math.floor(eased * num)) + suffix)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, num, suffix, value])

  return (
    <div ref={ref} className="stat-card group relative" title={description}>
      {icon && <span className="text-lg mb-0.5 block">{icon}</span>}
      <div className="stat-value">{displayed}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
