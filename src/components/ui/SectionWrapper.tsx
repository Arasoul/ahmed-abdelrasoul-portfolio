import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface Props {
  id?: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: Props) {
  const { ref, revealed } = useScrollReveal<HTMLElement>({ threshold: 0.05 })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`px-4 py-20 md:px-8 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}
