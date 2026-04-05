import { motion } from 'framer-motion'
import { Shield, Lock, Eye } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const badges = [
  { icon: Shield, label: 'Your GitHub Repo', desc: 'You own every commit. We never store your metadata.', color: 'text-primary', bg: 'bg-primary/5', iconBg: 'bg-primary/10' },
  { icon: Lock, label: 'Encrypted In Transit', desc: 'TLS everywhere. Zero plaintext credentials.', color: 'text-violet', bg: 'bg-violet/5', iconBg: 'bg-violet/10' },
  { icon: Eye, label: 'Full Audit Trail', desc: 'Every action logged. Every deploy tracked.', color: 'text-amber-dark', bg: 'bg-amber/5', iconBg: 'bg-amber/10' },
]

export default function TrustBar() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="relative py-24 bg-white border-y border-border-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center text-2xl sm:text-3xl font-bold text-text leading-snug max-w-3xl mx-auto mb-4">
          Your metadata never leaves infrastructure you control.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-lg text-text-muted max-w-2xl mx-auto mb-14 leading-relaxed">
          FlowSprite connects to your Salesforce org, pulls metadata into a <strong className="text-text">private GitHub repo under YOUR account</strong>,
          and syncs changes back only to sandboxes. We never store your org data on our servers.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {badges.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className={`p-6 rounded-2xl ${item.bg} border border-border-light text-center hover:shadow-md transition-all`}>
              <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mx-auto mb-4`}>
                <item.icon size={28} className={item.color} />
              </div>
              <h3 className={`text-xl font-bold text-text mb-2`}>{item.label}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
