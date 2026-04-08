import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { fadeUp, smoothTransition } from '../hooks/useAnimations'

export default function TheShift() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '0px 0px -20% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const examples = [
    '"Add a required field for renewal date on Opportunity."',
    '"Route enterprise leads from DACH to the Berlin team."',
    '"No deal closes without a signed contract."',
  ]

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate={visible ? 'visible' : 'hidden'} transition={smoothTransition}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text tracking-tight mb-10">
            What if you could just <span className="gradient-text">say what you need?</span>
          </h2>
        </motion.div>

        <div className="space-y-4 mb-10">
          {examples.map((example, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={visible ? 'visible' : 'hidden'}
              transition={{ ...smoothTransition, delay: 0.15 + i * 0.1 }}
              className="text-xl sm:text-2xl text-primary/80 font-medium italic"
            >
              {example}
            </motion.p>
          ))}
        </div>

        <motion.p variants={fadeUp} initial="hidden" animate={visible ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.5 }}
          className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
          FlowSprite turns natural language into real Salesforce changes. Every change is reviewed before anything moves. Every change can be reversed. You're always in control.
        </motion.p>
      </div>
    </section>
  )
}
