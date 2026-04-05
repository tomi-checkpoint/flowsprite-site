import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Variants } from 'framer-motion'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

// Consistent motion language across all sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

export const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
}

export const smoothTransition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}
