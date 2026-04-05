import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { fadeUp, smoothTransition } from '../hooks/useAnimations'

function TypeDeleteHeadline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const prefix = 'What if you'
  const deletable = 'r admin'
  const suffix = ' could '

  const [charsVisible, setCharsVisible] = useState(deletable.length)
  const [started, setStarted] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (!isInView || started) return
    setStarted(true)

    let count = deletable.length
    let intervalId: ReturnType<typeof setInterval>

    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        count--
        setCharsVisible(count)
        if (count <= 0) clearInterval(intervalId)
      }, 120)
    }, 1500)

    return () => {
      clearTimeout(startDelay)
      if (intervalId) clearInterval(intervalId)
    }
  }, [isInView, started])

  useEffect(() => {
    if (!started) return
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [started])

  const currentDeletable = deletable.slice(0, charsVisible)

  return (
    <span ref={ref}>
      {prefix}
      {currentDeletable}
      <span
        className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-[1px] rounded-sm"
        style={{
          opacity: started && charsVisible < deletable.length ? (cursorVisible ? 1 : 0) : 0,
          transition: 'opacity 0.1s',
          verticalAlign: 'text-bottom',
        }}
      />
      {suffix}
      <span className="gradient-text">do it all?</span>
    </span>
  )
}

export default function TheShift() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h2 variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ ...smoothTransition }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-text tracking-tight mb-8">
          <TypeDeleteHeadline />
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.15 }}
          className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
          FlowSprite brings software engineering best practices to Salesforce — <strong className="text-text">without requiring a single software engineer.</strong>{' '}
          Git version control. Pull requests. Automated validation. CI/CD deploys. All wrapped in an interface your admin already understands.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.3 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <span className="text-3xl">👤</span>
          <span className="text-text font-semibold text-lg">One admin. Five sandboxes. Full production lifecycle.</span>
        </motion.div>
      </div>
    </section>
  )
}
