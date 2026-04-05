import { motion } from 'framer-motion'
import { useScrollAnimation, fadeUp, smoothTransition } from '../hooks/useAnimations'

export default function TheShift() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h2 variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ ...smoothTransition }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-text tracking-tight mb-8">
          What if your admin could <span className="gradient-text">do it all?</span>
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
