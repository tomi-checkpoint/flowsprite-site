import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const testimonials = [
  {
    quote: 'Our Salesforce backlog went from 47 open tickets to 6 in the first month. I didn\'t hire anyone. I just gave my ops team FlowSprite.',
    name: 'Fabian Liebig',
    title: 'VP Revenue Operations',
    company: 'Staffbase',
  },
  {
    quote: 'I stopped being the bottleneck. My team describes what they need and I review it instead of building it from scratch.',
    name: 'Thorsten Schaar',
    title: 'Senior Salesforce Admin',
    company: 'Foodji',
  },
  {
    quote: 'We used to schedule Salesforce changes quarterly. Now we ship weekly. Same team, same org, completely different velocity.',
    name: 'Monica Garcia',
    title: 'Head of Sales Operations',
    company: 'TrustYou',
  },
]

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section ref={ref} className="py-28 bg-surface-warm relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={smoothTransition} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Teams that made the switch.
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={staggerItem}
              className="p-8 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-md transition-all">
              <p className="text-text text-lg leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-text">{t.name}</p>
                <p className="text-text-muted text-sm">{t.title}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
