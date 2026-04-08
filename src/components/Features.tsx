import { motion } from 'framer-motion'
import { Layers, FileText, GitCompare, RadioTower, ShieldAlert, ClipboardList } from 'lucide-react'
import { useScrollAnimation, fadeUp, smoothTransition } from '../hooks/useAnimations'

const features = [
  { icon: Layers, title: 'Full Org Coverage', desc: 'Objects, fields, flows, permissions, layouts, and 30+ more. FlowSprite understands your entire Salesforce architecture.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: FileText, title: 'Plain English Previews', desc: 'Every change described in language anyone can read. No XML. No code diffs.', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: GitCompare, title: 'Cross-Org Compare', desc: 'Side-by-side view of any two environments. See exactly what\'s different.', color: 'text-amber-dark', bg: 'bg-amber/10' },
  { icon: RadioTower, title: 'Drift Detection', desc: 'Know instantly when someone makes an untracked change. No surprises.', color: 'text-success', bg: 'bg-success/10' },
  { icon: ShieldAlert, title: 'Policy Guardrails', desc: 'Built-in rules that block dangerous changes before they happen.', color: 'text-danger', bg: 'bg-danger/10' },
  { icon: ClipboardList, title: 'Audit Trail', desc: 'Every action logged. Every user accountable. Export for compliance.', color: 'text-info', bg: 'bg-info/10' },
]

export default function Features() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="features" ref={ref} className="py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Everything under the hood.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="p-6 rounded-2xl bg-surface border border-border-light hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${feature.bg} group-hover:scale-110 flex items-center justify-center mb-4 transition-transform`}>
                <feature.icon size={20} className={feature.color} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
