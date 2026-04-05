import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const logos = [
  // Each logo flies in from a different edge/direction
  { src: '/flowsprite-site/logos/Salesforce.com_logo.svg.png', alt: 'Salesforce', 
    finalX: 28, finalY: 30, size: 200, delay: 0,
    fromX: -300, fromY: -200, fromRotate: -35 },  // from top-left
  { src: '/flowsprite-site/logos/GitHub_Invertocat_Black.png', alt: 'GitHub',
    finalX: 70, finalY: 25, size: 180, delay: 0.15,
    fromX: 300, fromY: -250, fromRotate: 25 },     // from top-right
  { src: '/flowsprite-site/logos/Claude_AI_symbol.png', alt: 'Claude',
    finalX: 22, finalY: 65, size: 170, delay: 0.3,
    fromX: -350, fromY: 200, fromRotate: 30 },     // from bottom-left
  { src: '/flowsprite-site/logos/ChatGPT-Logo.png', alt: 'ChatGPT',
    finalX: 72, finalY: 62, size: 190, delay: 0.45,
    fromX: 350, fromY: 250, fromRotate: -20 },     // from bottom-right
]

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logos' | 'swipe' | 'done'>('logos')

  useEffect(() => {
    // Logos float for 2.2s, then swipe up over 0.7s
    const t1 = setTimeout(() => setPhase('swipe'), 2200)
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {(
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ backgroundColor: '#F5F0EB' }}
          initial={{ y: 0 }}
          animate={{ y: phase === 'swipe' ? '-100vh' : 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Floating logos — fly in from different angles */}
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
                left: `${logo.finalX}%`,
                top: `${logo.finalY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{
                opacity: 0,
                x: logo.fromX,
                y: logo.fromY,
                rotate: logo.fromRotate,
                scale: 0.4,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
                rotate: 0,
                scale: 1,
              }}
              transition={{
                opacity: { duration: 0.5, delay: logo.delay },
                x: { duration: 0.8, delay: logo.delay, type: 'spring', stiffness: 60, damping: 12 },
                y: {
                  duration: 4 + i * 0.5,
                  delay: logo.delay + 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: { duration: 0.8, delay: logo.delay, type: 'spring', stiffness: 60, damping: 12 },
                scale: { duration: 0.8, delay: logo.delay, type: 'spring', stiffness: 60, damping: 12 },
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
