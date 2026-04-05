import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useScrollAnimation, fadeUp, smoothTransition } from '../hooks/useAnimations'

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
    <section ref={ref} className="py-28 bg-surface-warm relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">Stop managing Salesforce like it's <span className="text-text-light">2015.</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ ...smoothTransition, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
          <div className="grid grid-cols-3 bg-surface">
            <div className="p-4 border-b border-border-light" />
            <div className="p-4 border-b border-border-light text-center"><span className="text-text-light font-semibold text-sm">Without FlowSprite</span></div>
            <div className="p-4 border-b border-border-light text-center bg-primary/[0.03]"><span className="text-primary font-semibold text-sm">With FlowSprite</span></div>
          </div>
          {rows.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ ...smoothTransition, delay: 0.3 + i * 0.06 }}
              className="grid grid-cols-3 border-b border-border-light last:border-0">
              <div className="p-4 flex items-center"><span className="text-text-muted text-sm font-medium">{row.label}</span></div>
              <div className="p-4 flex items-center justify-center text-center">
                <div className="flex items-center gap-2"><X size={14} className="text-danger/50 shrink-0" /><span className="text-text-light text-sm">{row.without}</span></div>
              </div>
              <div className="p-4 flex items-center justify-center text-center bg-primary/[0.02]">
                <div className="flex items-center gap-2"><Check size={14} className="text-success shrink-0" /><span className="text-text text-sm font-medium">{row.with}</span></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
