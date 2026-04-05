import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { useScrollAnimation } from '../hooks/useAnimations'

const stats = [
  { value: 156, prefix: '$', suffix: 'K/yr', label: 'Average cost of one Salesforce developer', color: 'text-danger' },
  { value: 73, suffix: '%', label: 'Of deployments fail on first attempt', color: 'text-amber-dark' },
  { value: 4, suffix: '+ hrs', label: 'To set up an SFDX CI/CD toolchain', color: 'text-primary' },
]

export default function Problem() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="relative py-28 bg-surface-warm overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Salesforce teams are <span className="text-danger">drowning.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 + i * 0.15, type: 'spring', bounce: 0.3 }}
              className="text-center p-10 rounded-2xl bg-white border border-border-light shadow-sm">
              <div className={`text-7xl sm:text-8xl font-black ${stat.color} mb-4 tracking-tight`}>
                <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-text-muted text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center text-text-muted text-xl max-w-2xl mx-auto leading-relaxed">
          You hired admins to configure Salesforce. Instead, they're stuck filing tickets to a dev team that deploys XML by hand and <strong className="text-text">prays nothing breaks.</strong>
        </motion.p>
      </div>
    </section>
  )
}
