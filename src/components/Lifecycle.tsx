import { motion } from 'framer-motion'
import { ArrowRight, Hand } from 'lucide-react'
import { useScrollAnimation, fadeUp, staggerContainer, staggerItem, smoothTransition } from '../hooks/useAnimations'

const stages = [
  { label: 'Dev Sandbox', mode: 'auto' },
  { label: 'QA Sandbox', mode: 'auto' },
  { label: 'UAT', mode: 'auto' },
  { label: 'Staging', mode: 'auto' },
  { label: 'Production', mode: 'manual' },
]

export default function Lifecycle() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="py-28 bg-surface-warm relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">Full lifecycle. <span className="gradient-text">One person.</span></h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {stages.map((stage, i) => (
            <motion.div key={i} variants={staggerItem} className="flex items-center gap-2 sm:gap-3">
              <div className={`px-4 sm:px-6 py-3 rounded-xl border ${stage.mode === 'manual' ? 'border-amber/30 bg-amber/5' : 'border-border bg-white'} text-center shadow-sm`}>
                <div className="text-xs text-text-light mb-1 font-mono uppercase">
                  {stage.mode === 'manual' ? <span className="text-amber-dark flex items-center justify-center gap-1"><Hand size={10} /> manual</span> : <span className="text-success">auto</span>}
                </div>
                <div className={`text-sm font-semibold ${stage.mode === 'manual' ? 'text-amber-dark' : 'text-text'}`}>{stage.label}</div>
              </div>
              {i < stages.length - 1 && <ArrowRight size={16} className="text-text-light shrink-0" />}
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ ...smoothTransition, delay: 0.4 }} className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-6 py-4 rounded-xl bg-amber/5 border border-amber/15 mb-8">
            <p className="text-amber-dark font-semibold text-sm">☝️ You push this button. Always you. Never us.</p>
          </div>
          <p className="text-text-muted leading-relaxed">
            FlowSprite manages the entire promotion path from development to staging. When changes reach production, we generate a validated change order with test results, dependency analysis, and rollback instructions.
            But the final deploy is yours. <strong className="text-text">This is a safety boundary we will never cross.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
