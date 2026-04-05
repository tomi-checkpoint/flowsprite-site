import { motion } from 'framer-motion'
import { ArrowDownUp, GitPullRequest, FileText, ShieldCheck, Database } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const features = [
  {
    icon: ArrowDownUp,
    title: 'One-Way Safety Valve',
    description: 'Metadata flows FROM your org INTO your repo. Changes flow FROM your repo INTO your sandbox. Nothing ever flows directly to production. This isn\'t a setting — it\'s architecture.',
  },
  {
    icon: GitPullRequest,
    title: 'Every Change Is a Pull Request',
    description: 'No more "who changed what and when." Every field, every flow, every permission change is a Git commit with a timestamp, an author, and a full diff. Rollback to any point in history.',
  },
  {
    icon: FileText,
    title: 'Deploy Previews in Plain English',
    description: 'Before anything touches your sandbox, see exactly what will change. "Adds required field Renewal_Date on Opportunity." No XML. No guessing.',
  },
  {
    icon: ShieldCheck,
    title: '7 Built-In Policy Guardrails',
    description: 'Production deletions blocked. Security metadata flagged. Apex without tests rejected. Flow activations require validation first. These aren\'t suggestions — they\'re gates.',
  },
  {
    icon: Database,
    title: 'You Own Everything',
    description: 'Your metadata lives in YOUR private GitHub repository. Cancel FlowSprite tomorrow — your entire org history, every commit, every rollback point stays with you. Forever.',
  },
]

export default function Safety() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="safety" ref={ref} className="py-24 bg-gradient-to-b from-dark to-dark-lighter relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            The most <span className="text-amber">paranoid</span> deployment system for Salesforce.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built by people who've seen too many production incidents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className={`p-6 rounded-2xl bg-white/[0.03] border border-amber/10 hover:border-amber/25 transition-all ${i === 4 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 mt-1">
                  <feature.icon size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
