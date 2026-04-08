import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function BackspaceHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)
  const deletable = 'r admin'
  const [charsVisible, setCharsVisible] = useState(deletable.length)
  const [cursorOn, setCursorOn] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          setTimeout(() => {
            setCursorOn(true)
            setDeleting(true)
          }, 800)
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!deleting) return
    let count = deletable.length
    const interval = setInterval(() => {
      count--
      setCharsVisible(count)
      if (count <= 0) {
        clearInterval(interval)
        setTimeout(() => setCursorOn(false), 1500)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [deleting])

  const [cursorVisible, setCursorVisible] = useState(true)
  useEffect(() => {
    if (!cursorOn) return
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [cursorOn])

  return (
    <h2 ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-black text-text mb-6">
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

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-surface-alt to-accent/5 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BackspaceHeadline />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Give them FlowSprite and watch a 5-person Salesforce team become <strong className="text-text">one person who ships faster, safer, and with complete confidence.</strong>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col items-center gap-4">
          <a href="#pricing" className="group px-10 py-4 btn-gradient text-white font-bold rounded-xl text-lg transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-primary/20">
            Start Free — No Credit Card Required <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-text-light">Setup takes 2 minutes. Your first change ships today.</p>
        </motion.div>
      </div>
    </section>
  )
}
