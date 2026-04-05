import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { fadeUp, smoothTransition } from '../hooks/useAnimations'

function TypeDeleteHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)
  const deletable = 'r admin'
  const [charsVisible, setCharsVisible] = useState(deletable.length)
  const [cursorOn, setCursorOn] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const triggered = useRef(false)

  // Manual IntersectionObserver: fires when element is 30% above bottom of viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          // Start blinking cursor after a short pause
          setTimeout(() => {
            setCursorOn(true)
            setDeleting(true)
          }, 800)
        }
      },
      {
        // rootMargin bottom -30% means it fires when the element is 30% above the bottom
        rootMargin: '0px 0px -30% 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Delete characters one at a time
  useEffect(() => {
    if (!deleting) return
    let count = deletable.length
    const interval = setInterval(() => {
      count--
      setCharsVisible(count)
      if (count <= 0) {
        clearInterval(interval)
        // Stop cursor blinking after a pause
        setTimeout(() => setCursorOn(false), 1500)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [deleting])

  // Blink the cursor
  const [cursorVisible, setCursorVisible] = useState(true)
  useEffect(() => {
    if (!cursorOn) return
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [cursorOn])

  return (
    <h2
      ref={ref}
      className="text-4xl sm:text-5xl md:text-6xl font-black text-text tracking-tight mb-8"
    >
      What if you{deletable.slice(0, charsVisible)}
      {cursorOn && (
        <span
          className="inline-block w-[3px] bg-primary rounded-sm"
          style={{
            height: '0.75em',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.08s',
            verticalAlign: 'baseline',
            marginLeft: '2px',
          }}
        />
      )}
      {' could '}
      <span className="gradient-text">do it all?</span>
    </h2>
  )
}

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

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate={visible ? 'visible' : 'hidden'} transition={{ ...smoothTransition }}>
          <TypeDeleteHeadline />
        </motion.div>
        <motion.p variants={fadeUp} initial="hidden" animate={visible ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.15 }}
          className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
          FlowSprite brings software engineering best practices to Salesforce — <strong className="text-text">without requiring a single software engineer.</strong>{' '}
          Git version control. Pull requests. Automated validation. CI/CD deploys. All wrapped in an interface your admin already understands.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate={visible ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.3 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <span className="text-3xl">👤</span>
          <span className="text-text font-semibold text-lg">One admin. Five sandboxes. Full production lifecycle.</span>
        </motion.div>
      </div>
    </section>
  )
}
