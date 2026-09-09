import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCommand } from 'react-icons/fi'
import { navLinks } from '../../data/personal'
import logo from '../../assets/Logo.png'
import ThemeToggle from './ThemeToggle'
import { scrollToHash } from '../../utils/scroll'

interface Props {
  dark: boolean
  toggleTheme: () => void
  onOpenPalette: () => void
}

const SECTION_COUNT = navLinks.length

export default function Navbar({ dark, toggleTheme, onOpenPalette }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const fillRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`
        setScrolled(window.scrollY > 50)
      })
    }

    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) spy.observe(el)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      spy.disconnect()
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const handleClick = useCallback((href: string) => {
    setOpen(false)
    window.requestAnimationFrame(() => scrollToHash(href, 92))
  }, [])

  const activeIndex = navLinks.findIndex((l) => l.href.slice(1) === activeSection)
  const sectionCounter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(SECTION_COUNT).padStart(2, '0')}`

  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'border-b shadow-sm' : 'bg-transparent'}`}
      style={{ backgroundColor: scrolled ? 'var(--bg-surface)' : 'transparent', borderColor: scrolled ? 'var(--border-subtle)' : 'transparent' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <button onClick={() => handleClick('#origin')} className="flex items-center gap-2.5 group">
            <img src={logo} alt="Arasoul" className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0" />
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-bold tracking-tight text-primary font-display">AHMED</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted">AI & DATA</span>
            </div>
          </button>

        <span className="nav-counter hidden items-center gap-1.5 font-mono text-[10px] tracking-tight text-muted sm:flex">
          <span className="font-semibold text-accent">AHMED</span>
          <span>{sectionCounter}</span>
        </span>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            const idx = navLinks.indexOf(link)
            return (
              <button key={link.href} onClick={() => handleClick(link.href)}
                className={`nav-link relative px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-lg ${isActive ? 'text-accent' : ''}`}
                style={{ backgroundColor: isActive ? 'var(--accent-primary-10)' : 'transparent' }}
              >
                <span className="font-mono text-[9px] text-muted mr-1">{String(idx + 1).padStart(2, '0')}</span>
                {link.label}
                {isActive && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                    style={{ background: 'linear-gradient(to right, var(--accent), var(--accent-secondary))' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          <div className="ml-2 flex items-center gap-1.5 border-l pl-2" style={{ borderColor: 'var(--border-subtle)' }}>
            <button onClick={onOpenPalette}
              className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-all"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
            >
              <FiCommand size={12} /> <span>Ctrl+K</span>
            </button>
            <ThemeToggle dark={dark} toggle={toggleTheme} />
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <span className="font-mono text-[10px] text-muted">AHMED / {sectionCounter}</span>
          <button onClick={onOpenPalette}
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
            <FiCommand size={14} />
          </button>
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ color: 'var(--text-primary)' }} aria-label="Toggle menu">
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-glass-strong)' }}
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link, i) => (
                <button key={link.href} onClick={() => handleClick(link.href)}
                  className="nav-link flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium">
                  <span>{link.label}</span>
                  <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="nav-progress" aria-hidden="true">
        <div ref={fillRef} className="nav-progress-fill" style={{ transform: 'scaleX(0)' }} />
      </div>
    </motion.header>
  )
}
