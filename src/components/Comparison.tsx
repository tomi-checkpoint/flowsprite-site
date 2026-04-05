import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const rows = [
  { label: 'Team size', without: '5-person dev team', with: '1 admin, full control' },
  { label: 'Deploy strategy', without: 'Deploy and pray', with: 'Preview every change first' },
  { label: 'Change tracking', without: '"Who changed that field?"', with: 'Full Git history' },
  { label: 'Rollback', without: 'Restore from backup', with: 'Revert a commit' },
  { label: 'CI/CD setup', without: 'Weeks to configure', with: '2 minutes to connect' },
  { label: 'Your data', without: 'On vendor servers', with: 'Your repo, your GitHub' },
  { label: 'Annual cost', without: '$780K+ team cost', with: '$199/mo' },
]

export default function Comparison() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="py-24 bg-dark relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Stop managing Salesforce like it's <span className="text-gray-500">2015.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-white/10"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.03]">
            <div className="p-4 border-b border-white/5" />
            <div className="p-4 border-b border-white/5 text-center">
              <span className="text-gray-500 font-semibold text-sm">Without FlowSprite</span>
            </div>
            <div className="p-4 border-b border-white/5 text-center bg-violet/5">
              <span className="text-violet-light font-semibold text-sm">With FlowSprite</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-0">
              <div className="p-4 flex items-center">
                <span className="text-gray-400 text-sm font-medium">{row.label}</span>
              </div>
              <div className="p-4 flex items-center justify-center text-center">
                <div className="flex items-center gap-2">
                  <X size={14} className="text-danger/60 shrink-0" />
                  <span className="text-gray-500 text-sm">{row.without}</span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-center text-center bg-violet/[0.03]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-success shrink-0" />
                  <span className="text-white text-sm font-medium">{row.with}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
