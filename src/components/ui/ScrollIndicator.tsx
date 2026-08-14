'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">
          Scroll
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-[#4CAF50] to-transparent" />
      </motion.div>
    </motion.div>
  )
}
