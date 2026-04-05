import { motion } from 'framer-motion'
import { Plug, GitBranch, Rocket } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const steps = [
  {
    icon: Plug,
    number: '01',
    title: 'Connect',
    description: 'Enter your Salesforce username and security token. That\'s it. No Connected App setup, no certificates, no SFDX installation.',
    accent: 'Two minutes.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: GitBranch,
    number: '02',
    title: 'Sync',
    description: 'FlowSprite pulls your entire org — 37 metadata types — into a private GitHub repo you own. Objects, fields, flows, Apex, permissions, layouts. All version-controlled.',
    accent: 'All yours.',
    color: 'text-violet-light',
    bg: 'bg-violet/10',
    border: 'border-violet/20',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Ship',
    description: 'Make changes. See exactly what will deploy in plain English. Approve the PR. It lands in your sandbox. When you\'re ready for production, FlowSprite packages a change order — but YOU push the button in Salesforce.',
    accent: 'Always.',
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
  },
]

export default function HowItWorks() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-dark-lighter relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            From <span className="text-gray-500">"I need a dev"</span> to{' '}
            <span className="gradient-text">"I just shipped it."</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className={`relative p-8 rounded-2xl bg-white/[0.02] border ${step.border} hover:bg-white/[0.04] transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-6`}>
                <step.icon size={24} className={step.color} />
              </div>
              <div className={`text-xs font-mono ${step.color} mb-2`}>{step.number}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-3">{step.description}</p>
              <p className={`${step.color} font-semibold`}>{step.accent}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
