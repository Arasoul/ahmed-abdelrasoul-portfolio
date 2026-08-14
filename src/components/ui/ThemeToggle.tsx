import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

interface Props {
  dark: boolean
  toggle: () => void
}

export default function ThemeToggle({ dark, toggle }: Props) {
  return (
    <motion.button
      onClick={toggle}
      className="btn-icon"
      whileTap={{ scale: 0.85 }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {dark ? <FiMoon size={16} /> : <FiSun size={16} />}
      </motion.span>
    </motion.button>
  )
}
