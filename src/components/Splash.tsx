import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const logos = [
  { src: '/flowsprite-site/logos/Salesforce.com_logo.svg.png', alt: 'Salesforce',
    finalX: 28, finalY: 38, height: 200, delay: 0,
    fromX: -500, fromY: -350, fromRotate: -40 },
  { src: '/flowsprite-site/logos/GitHub_Invertocat_Black.png', alt: 'GitHub',
    finalX: 52, finalY: 36, height: 200, delay: 0.12,
    fromX: 450, fromY: -400, fromRotate: 35 },
  { src: '/flowsprite-site/logos/Claude_AI_symbol.png', alt: 'Claude',
    finalX: 26, finalY: 62, height: 200, delay: 0.25,
    fromX: -550, fromY: 350, fromRotate: 45 },
  { src: '/flowsprite-site/logos/ChatGPT-Logo.png', alt: 'ChatGPT',
    finalX: 54, finalY: 60, height: 200, delay: 0.38,
    fromX: 500, fromY: 400, fromRotate: -30 },
]

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'show' | 'swipe' | 'done'>('show')
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock scroll and sit at top during splash
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => {
      setPhase('swipe')
      // Scroll down to hero as splash translates up
      // This makes the page "catch up" to where the hero is
    }, 2200)

    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      setPhase('done')
      // Scroll to top so hero is in view after splash is removed from DOM
      window.scrollTo(0, 0)
      onComplete()
    }, 2900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <motion.div
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#F5F0EB' }}
      animate={phase === 'swipe' ? { marginTop: '-100vh' } : { marginTop: 0 }}
      transition={phase === 'swipe' ? { duration: 0.7, ease: [0.4, 0, 0.2, 1] } : {}}
    >
      {logos.map((logo, i) => (
        <motion.img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className="absolute"
          style={{
            height: logo.height,
            width: 'auto',
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
  )
}
