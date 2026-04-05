import { motion } from 'framer-motion'
import { Layers, GitCompare, RadioTower, ShieldAlert, ClipboardList, Webhook } from 'lucide-react'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const features = [
  { icon: Layers, title: '37 Metadata Types', description: 'Objects, fields, flows, Apex, LWC, profiles, permissions, layouts, and 29 more. Full coverage.' },
  { icon: GitCompare, title: 'Cross-Org Compare', description: 'Side-by-side diff of any two orgs. See exactly what\'s different. Promote changes in one click.' },
  { icon: RadioTower, title: 'Drift Detection', description: 'Know the instant someone makes an untracked change in your sandbox. Daily sync catches everything.' },
  { icon: ShieldAlert, title: 'Policy Engine', description: '7 built-in rules that prevent dangerous deploys before they happen. Customize or add your own.' },
  { icon: ClipboardList, title: 'Full Audit Trail', description: 'Every action logged. Every deploy tracked. Every user accountable. Export for compliance.' },
  { icon: Webhook, title: 'Webhook Integrations', description: 'Slack, Teams, or your own endpoint. Get notified on syncs, deploys, drift, and policy violations.' },
]

export default function Features() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="features" ref={ref} className="py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">Everything a full Salesforce DevOps team does.</h2>
          <p className="text-xl text-text-muted">For the price of lunch.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div key={i} variants={staggerItem}
              className="p-6 rounded-2xl bg-surface border border-border-light hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center mb-4 transition-colors">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
