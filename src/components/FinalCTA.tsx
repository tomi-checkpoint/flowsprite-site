import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

export default function FinalCTA() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary/5 via-surface-alt to-violet/5 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-text mb-6">Your admin is more capable than you think.</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Give them FlowSprite and watch a 5-person Salesforce team become <strong className="text-text">one person who ships faster, safer, and with complete confidence.</strong>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col items-center gap-4">
          <a href="#pricing" className="group px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-lg transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-primary/20">
            Start Free — No Credit Card Required <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-text-light">Setup takes 2 minutes. Your first sync happens in under 5.</p>
        </motion.div>
      </div>
    </section>
  )
}
