import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiArrowRight, FiCommand } from 'react-icons/fi'
import { useCommandPalette } from '../../hooks/useCommandPalette'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export default function CommandPalette() {
  const { open, setOpen, query, setQuery, filtered } = useCommandPalette()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useFocusTrap(overlayRef, open, () => setOpen(false))

  useEffect(() => {
    setActive(0)
  }, [query, open])

  useEffect(() => {
    if (!open) return
    const buttons = overlayRef.current?.querySelectorAll<HTMLButtonElement>('[data-palette-item]')
    if (buttons && buttons.length > 0) {
      const idx = Math.min(active, buttons.length - 1)
      buttons[idx]?.focus()
    }
  }, [active, open, filtered.length])

  const typeIcons: Record<string, string> = {
    nav: '\u2192',
    project: '\uD83D\uDCE6',
    skill: '\u26A1',
  }

  const select = (index: number) => {
    const item = filtered[index]
    if (!item) return
    item.action()
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(filtered.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(active)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="card-elevated w-full max-w-xl overflow-hidden"
            style={{ borderColor: 'var(--border-accent)', boxShadow: 'var(--shadow-glow)' }}
          >
            <div className="flex items-center gap-3 border-b px-5 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <FiSearch className="text-secondary flex-shrink-0" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, projects, skills..."
                aria-label="Search commands"
                className="input border-0 bg-transparent p-0 focus:shadow-none focus:ring-0"
                autoFocus
              />
              <kbd className="rounded-md border px-1.5 py-0.5 text-[10px] text-secondary" style={{ borderColor: 'var(--border-subtle)' }}>
                <FiCommand className="inline" size={10} />K
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-secondary">
                  No results found for "{query}"
                </div>
              )}
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  data-palette-item
                  onClick={() => select(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`btn-ghost flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${i === active ? 'palette-item--active' : ''}`}
                  style={i === active ? { background: 'var(--accent-primary-10)', borderColor: 'var(--border-accent)' } : undefined}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs" style={{ background: 'var(--accent-primary-10)' }}>
                    {typeIcons[item.type] || '\u2022'}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-primary">{item.label}</div>
                    <div className="text-[10px] text-secondary">{item.description}</div>
                  </div>
                  <FiArrowRight className="text-secondary opacity-0 transition-opacity group-hover:opacity-100" size={12} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}