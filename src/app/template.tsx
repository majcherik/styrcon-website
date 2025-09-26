'use client'

import { motion } from 'framer-motion'

/**
 * Root template for smooth page transitions across STYRCON website
 * Provides consistent animation experience for all page navigations
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}