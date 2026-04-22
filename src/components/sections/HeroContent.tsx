'use client'

import { motion } from 'framer-motion'
import { slideUp } from '@/lib/motion'

export function HeroContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative z-10 text-center px-4"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}
