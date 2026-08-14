import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCommand } from 'react-icons/fi'
import { navLinks } from '../../data/personal'
import logo from '../../assets/Logo.png'
import ThemeToggle from './ThemeToggle'

interface Props {
  dark: boolean
  toggleTheme: () => void
  onOpenPalette: () => void
}

export default function Navbar({ dark, toggleTheme, onOpenPalette }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50)
      const ids = navLinks.map(l => l.href.slice(1))
      for (const id of ids.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) { setActiveSection(id); return }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleClick = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'border-b shadow-sm backdrop-blur-2xl' : 'bg-transparent'}`}
      style={{ backgroundColor: scrolled ? 'var(--bg-glass-strong)' : 'transparent', borderColor: scrolled ? 'var(--border-subtle)' : 'transparent' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <button onClick={() => handleClick('#hero')} className="flex items-center gap-2 text-xl font-bold tracking-tight gradient-text">
            <img src={logo} alt="Arasoul" className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0" />
            Arasoul
          </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <button key={link.href} onClick={() => handleClick(link.href)}
                className={`nav-link relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive ? 'text-accent' : ''}`}
                style={{ backgroundColor: isActive ? 'var(--accent-primary-10)' : 'transparent' }}
              >
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

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onOpenPalette}
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
            <FiCommand size={14} />
          </button>
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <button onClick={() => setOpen(!open)} className="flex h-9 w-9 items-center justify-center rounded-full"
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
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => handleClick(link.href)}
                  className="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium">{link.label}</button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
