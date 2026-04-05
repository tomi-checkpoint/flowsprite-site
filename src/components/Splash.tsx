import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const logos = [
  { src: '/flowsprite-site/logos/Salesforce.com_logo.svg.png', alt: 'Salesforce', 
    finalX: 35, finalY: 35, size: 240, delay: 0,
    fromX: -450, fromY: -300, fromRotate: -45 },
  { src: '/flowsprite-site/logos/GitHub_Invertocat_Black.png', alt: 'GitHub',
    finalX: 62, finalY: 32, size: 215, delay: 0.12,
    fromX: 400, fromY: -350, fromRotate: 30 },
  { src: '/flowsprite-site/logos/Claude_AI_symbol.png', alt: 'Claude',
    finalX: 32, finalY: 60, size: 200, delay: 0.25,
    fromX: -500, fromY: 300, fromRotate: 40 },
  { src: '/flowsprite-site/logos/ChatGPT-Logo.png', alt: 'ChatGPT',
    finalX: 65, finalY: 58, size: 230, delay: 0.38,
    fromX: 450, fromY: 350, fromRotate: -35 },
]

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logos' | 'swipe' | 'done'>('logos')

  useEffect(() => {
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
                scale: 0.3,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
                rotate: 0,
                scale: 1,
              }}
              transition={{
                opacity: { duration: 0.35, delay: logo.delay },
                x: { duration: 0.55, delay: logo.delay, type: 'spring', stiffness: 80, damping: 14 },
                y: {
                  duration: 4 + i * 0.5,
                  delay: logo.delay + 0.55,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: { duration: 0.55, delay: logo.delay, type: 'spring', stiffness: 80, damping: 14 },
                scale: { duration: 0.55, delay: logo.delay, type: 'spring', stiffness: 80, damping: 14 },
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
