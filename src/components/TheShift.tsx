import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useAnimations'

export default function TheShift() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-8"
        >
          What if your admin could{' '}
          <span className="gradient-text">do it all?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          FlowSprite brings software engineering best practices to Salesforce —
          <strong className="text-white"> without requiring a single software engineer.</strong>{' '}
          Git version control. Pull requests. Automated validation. CI/CD deploys.
          All wrapped in an interface your admin already understands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-violet/10 border border-violet/20"
        >
          <span className="text-3xl">👤</span>
          <span className="text-white font-semibold">One admin. Five sandboxes. Full production lifecycle.</span>
        </motion.div>
      </div>
    </section>
  )
}
