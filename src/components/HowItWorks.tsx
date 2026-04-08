import { motion } from 'framer-motion'
import { MessageCircle, CheckCircle, Rocket } from 'lucide-react'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const steps = [
  { icon: MessageCircle, number: '01', title: 'Ask', description: 'You or your team describes what needs to change. A new field. A routing rule. A validation. Plain language, no jargon.', accent: 'Your words.', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/15', hoverBorder: 'hover:border-primary/30' },
  { icon: CheckCircle, number: '02', title: 'Approve', description: 'FlowSprite shows you exactly what will change and what it affects. Review it. Revise it. Approve when it looks right.', accent: 'Your call.', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/15', hoverBorder: 'hover:border-accent/30' },
  { icon: Rocket, number: '03', title: 'Deploy', description: 'Approved changes land safely in your sandbox. Test them in a real environment. Push to production on your terms, on your timeline.', accent: 'Your pace.', color: 'text-amber-dark', bg: 'bg-amber/10', border: 'border-amber/15', hoverBorder: 'hover:border-amber/30' },
]

export default function HowItWorks() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-surface-warm relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            How it works
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className={`relative p-8 rounded-2xl bg-white border ${step.border} ${step.hoverBorder} shadow-sm hover:shadow-md transition-all flex flex-col`}>
              <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-6`}>
                <step.icon size={24} className={step.color} />
              </div>
              <div className={`text-2xl font-mono font-bold ${step.color} mb-2 tracking-wider`}>{step.number}</div>
              <h3 className="text-2xl font-bold text-text mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed mb-3 flex-1">{step.description}</p>
              <p className={`${step.color} font-semibold`}>{step.accent}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
