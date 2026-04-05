import { motion } from 'framer-motion'
import { Plug, GitBranch, Rocket } from 'lucide-react'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const steps = [
  { icon: Plug, number: '01', title: 'Connect', description: 'Enter your Salesforce username and security token. That\'s it. No Connected App setup, no certificates, no SFDX installation.', accent: 'Two minutes.', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/15', hoverBorder: 'hover:border-primary/30' },
  { icon: GitBranch, number: '02', title: 'Sync', description: 'FlowSprite pulls your entire org — 37 metadata types — into a private GitHub repo you own. Objects, fields, flows, Apex, permissions, layouts. All version-controlled.', accent: 'All yours.', color: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/15', hoverBorder: 'hover:border-violet/30' },
  { icon: Rocket, number: '03', title: 'Ship', description: 'Make changes. See exactly what will deploy in plain English. Approve the PR. It lands in your sandbox. When you\'re ready for production, FlowSprite packages a change order — but YOU push the button in Salesforce.', accent: 'Always.', color: 'text-amber-dark', bg: 'bg-amber/10', border: 'border-amber/15', hoverBorder: 'hover:border-amber/30' },
]

export default function HowItWorks() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-surface-warm relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            From <span className="text-text-light">"I need a dev"</span> to <span className="gradient-text">"I just shipped it."</span>
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className={`relative p-8 rounded-2xl bg-white border ${step.border} ${step.hoverBorder} shadow-sm hover:shadow-md transition-all`}>
              <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-6`}>
                <step.icon size={24} className={step.color} />
              </div>
              <div className={`text-xs font-mono ${step.color} mb-2 tracking-wider`}>{step.number}</div>
              <h3 className="text-2xl font-bold text-text mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed mb-3">{step.description}</p>
              <p className={`${step.color} font-semibold`}>{step.accent}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
