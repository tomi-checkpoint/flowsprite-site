import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const logos = [
  { src: '/flowsprite-site/logos/Salesforce.com_logo.svg.png', alt: 'Salesforce', x: 28, y: 22, size: 120, delay: 0, rotate: -4 },
  { src: '/flowsprite-site/logos/GitHub_Invertocat_Black.png', alt: 'GitHub', x: 68, y: 18, size: 90, delay: 0.15, rotate: 6 },
  { src: '/flowsprite-site/logos/Claude_AI_symbol.png', alt: 'Claude', x: 18, y: 62, size: 85, delay: 0.3, rotate: -8 },
  { src: '/flowsprite-site/logos/ChatGPT-Logo.png', alt: 'ChatGPT', x: 72, y: 58, size: 95, delay: 0.45, rotate: 5 },
]

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logos' | 'fadeout' | 'done'>('logos')

  useEffect(() => {
    // Logos float for 2s, then fade out over 0.8s
    const t1 = setTimeout(() => setPhase('fadeout'), 2000)
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {(
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#F5F0EB' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating logos */}
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="absolute"
              style={{
                width: logo.size,
                height: logo.size,
                objectFit: 'contain',
                left: `${logo.x}%`,
                top: `${logo.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{
                opacity: 0,
                scale: 0.3,
                rotate: logo.rotate * 3,
              }}
              animate={{
                opacity: phase === 'fadeout' ? 0 : 1,
                scale: phase === 'fadeout' ? 0.5 : 1,
                rotate: logo.rotate,
                y: phase === 'fadeout' ? 0 : [0, -12, 0],
              }}
              transition={{
                opacity: { duration: phase === 'fadeout' ? 0.6 : 0.5, delay: phase === 'fadeout' ? 0 : logo.delay },
                scale: { duration: phase === 'fadeout' ? 0.6 : 0.6, delay: phase === 'fadeout' ? 0 : logo.delay, type: 'spring', bounce: 0.35 },
                rotate: { duration: 0.6, delay: logo.delay },
                y: {
                  duration: 4 + i * 0.5,
                  delay: logo.delay + 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
