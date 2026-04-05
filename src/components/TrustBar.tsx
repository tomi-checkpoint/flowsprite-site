import { motion } from 'framer-motion'
import { Shield, Lock, Eye } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

export default function TrustBar() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="relative py-20 bg-dark border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10"
        >
          Your metadata never leaves infrastructure you control. FlowSprite connects to your Salesforce org,
          pulls metadata into a <strong className="text-white">private GitHub repo under YOUR account</strong>,
          and syncs changes back only to sandboxes. That's it. We never store your org data on our servers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {[
            { icon: Shield, label: 'Your GitHub Repo', desc: 'You own every commit' },
            { icon: Lock, label: 'Encrypted in Transit', desc: 'TLS everywhere' },
            { icon: Eye, label: 'Full Audit Trail', desc: 'Every action logged' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center">
                <item.icon size={20} className="text-violet-light" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
