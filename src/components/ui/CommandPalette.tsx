import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiArrowRight, FiCommand } from 'react-icons/fi'
import { useCommandPalette } from '../../hooks/useCommandPalette'

export default function CommandPalette() {
  const { open, setOpen, query, setQuery, filtered } = useCommandPalette()

  const typeIcons: Record<string, string> = {
    nav: '\u2192',
    project: '\uD83D\uDCE6',
    skill: '\u26A1',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card-elevated w-full max-w-xl overflow-hidden"
            style={{ borderColor: 'var(--border-accent)', boxShadow: 'var(--shadow-glow)' }}
          >
            <div className="flex items-center gap-3 border-b px-5 py-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <FiSearch className="text-secondary flex-shrink-0" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects, skills..."
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
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="btn-ghost flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm"
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
