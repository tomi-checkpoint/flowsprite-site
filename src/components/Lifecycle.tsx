import { motion } from 'framer-motion'
import { ArrowRight, Hand } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const stages = [
  { label: 'Dev Sandbox', mode: 'auto', color: 'bg-primary' },
  { label: 'QA Sandbox', mode: 'auto', color: 'bg-primary' },
  { label: 'UAT', mode: 'auto', color: 'bg-violet' },
  { label: 'Staging', mode: 'auto', color: 'bg-violet' },
  { label: 'Production', mode: 'manual', color: 'bg-amber' },
]

export default function Lifecycle() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Full lifecycle. <span className="gradient-text">One person.</span>
          </h2>
        </motion.div>

        {/* Pipeline visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
        >
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className={`px-4 sm:px-6 py-3 rounded-xl border ${
                stage.mode === 'manual'
                  ? 'border-amber/40 bg-amber/10'
                  : 'border-white/10 bg-white/[0.03]'
              } text-center`}>
                <div className="text-xs text-gray-500 mb-1 font-mono uppercase">
                  {stage.mode === 'manual' ? (
                    <span className="text-amber flex items-center justify-center gap-1">
                      <Hand size={10} /> manual
                    </span>
                  ) : (
                    <span className="text-success">auto</span>
                  )}
                </div>
                <div className={`text-sm font-semibold ${stage.mode === 'manual' ? 'text-amber' : 'text-white'}`}>
                  {stage.label}
                </div>
              </div>
              {i < stages.length - 1 && (
                <ArrowRight size={16} className="text-gray-600 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-block px-6 py-4 rounded-xl bg-amber/5 border border-amber/20 mb-8">
            <p className="text-amber font-semibold text-sm">
              ☝️ You push this button. Always you. Never us.
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed">
            FlowSprite manages the entire promotion path from development to staging.
            When changes reach production, we generate a validated change order with test results,
            dependency analysis, and rollback instructions. But the final deploy is yours.{' '}
            <strong className="text-white">This is a safety boundary we will never cross.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
