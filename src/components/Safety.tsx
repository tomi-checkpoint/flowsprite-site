import { motion } from 'framer-motion'
import { Shield, Database, ClipboardList } from 'lucide-react'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const points = [
  { icon: Shield, title: 'Sandbox first, always.', description: 'FlowSprite works with your sandbox. Production deploys are manual, deliberate, and always your decision.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Database, title: 'You own your data.', description: 'Everything lives in your private repository. Cancel anytime. Your history stays.', color: 'text-violet', bg: 'bg-violet/10' },
  { icon: ClipboardList, title: 'Full audit trail.', description: 'Every change logged. Every action tracked. Every user accountable. Export anytime.', color: 'text-success', bg: 'bg-success/10' },
]

export default function Safety() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="safety" ref={ref} className="py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Your production org is never touched.
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div key={i} variants={staggerItem}
              className="p-8 rounded-2xl bg-surface border border-border-light hover:shadow-md transition-all text-center">
              <div className={`w-14 h-14 rounded-xl ${point.bg} flex items-center justify-center mb-6 mx-auto`}>
                <point.icon size={28} className={point.color} />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{point.title}</h3>
              <p className="text-text-muted leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
