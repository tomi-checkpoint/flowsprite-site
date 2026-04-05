import { motion } from 'framer-motion'
import { ArrowDownUp, GitPullRequest, FileText, ShieldCheck, Database, UserCheck } from 'lucide-react'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useAnimations'

const features = [
  { icon: ArrowDownUp, title: 'One-Way Safety Valve', description: 'Metadata flows FROM your org INTO your repo. Changes flow FROM your repo INTO your sandbox. Nothing ever flows directly to production.', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
  { icon: GitPullRequest, title: 'Every Change Is a Pull Request', description: 'Every field, flow, and permission change is a Git commit with a timestamp, author, and full diff. Rollback to any point in history.', iconColor: 'text-violet', iconBg: 'bg-violet/10' },
  { icon: FileText, title: 'Deploy Previews in Plain English', description: '"Adds required field Renewal_Date on Opportunity." See exactly what will change before anything touches your sandbox. No XML.', iconColor: 'text-amber-dark', iconBg: 'bg-amber/10' },
  { icon: ShieldCheck, title: '7 Built-In Policy Guardrails', description: 'Production deletions blocked. Security metadata flagged. Apex without tests rejected. Flow activations require validation first.', iconColor: 'text-success', iconBg: 'bg-success/10' },
  { icon: Database, title: 'You Own Everything', description: 'Cancel FlowSprite tomorrow — your entire org history, every commit, every rollback point stays in your GitHub repo. Forever.', iconColor: 'text-danger', iconBg: 'bg-danger/10' },
  { icon: UserCheck, title: 'Role-Based Access Control', description: '5-level permission hierarchy from viewer to owner. Sandbox isolation per team. SOC 2 aligned audit logging.', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
]

export default function Safety() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="safety" ref={ref} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            The most <span className="gradient-text">paranoid</span> deployment system for Salesforce.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Built by people who've seen too many production incidents.</p>
        </motion.div>

        {/* Opennote-style cards: clean white bg, subtle border, icon + title + description, rounded */}
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div key={i} variants={staggerItem}
              className="p-6 rounded-2xl bg-surface border border-border-light hover:shadow-lg hover:border-border hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl ${feature.iconBg} group-hover:scale-110 flex items-center justify-center mb-5 transition-transform`}>
                <feature.icon size={22} className={feature.iconColor} />
              </div>
              <h3 className="text-base font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
