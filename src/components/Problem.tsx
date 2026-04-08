import { motion } from 'framer-motion'
import { useScrollAnimation, fadeUp, smoothTransition } from '../hooks/useAnimations'

export default function Problem() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="relative py-28 bg-surface-warm overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Nobody fully understands your Salesforce org.
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ ...smoothTransition, delay: 0.2 }}
          className="text-center">
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-6">
            Not the admin who inherited it. Not the consultant you hired last year. Not the developer who's afraid to touch it.
          </p>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            So every change is a gamble. Every deploy is a prayer. And every request sits in a queue while your team works around the system instead of with it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
