import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

export default function FinalCTA() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet/10 via-dark to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
        >
          Your admin is more capable than you think.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Give them FlowSprite and watch a 5-person Salesforce team become{' '}
          <strong className="text-white">one person who ships faster, safer, and with complete confidence.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#pricing"
            className="group px-10 py-4 bg-amber hover:bg-amber-dark text-dark font-bold rounded-xl text-lg transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Start Free — No Credit Card Required
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-gray-500">
            Setup takes 2 minutes. Your first sync happens in under 5.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
