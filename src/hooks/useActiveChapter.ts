import { useEffect, useState } from 'react'
import { chapters } from '../data/chapters'

export function useActiveChapter(): string {
  const [active, setActive] = useState<string>(chapters[0]?.id ?? '')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.4
      let cur = chapters[0]?.id ?? ''
      let best = Infinity
      for (const ch of chapters) {
        const el = document.getElementById(ch.id)
        if (!el) continue
        const d = Math.abs(el.getBoundingClientRect().top - mid)
        if (d < best) {
          best = d
          cur = ch.id
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

  return active
}