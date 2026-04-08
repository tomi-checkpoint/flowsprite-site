import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem, fadeUp, smoothTransition } from '../hooks/useAnimations'

const testimonials = [
  {
    quote: 'Our Salesforce backlog went from 47 open tickets to 6 in the first month. I didn\'t hire anyone. I just gave my ops team FlowSprite.',
    name: 'Fabian Liebig',
    company: 'Staffbase',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Staffbase_Logo.svg/512px-Staffbase_Logo.svg.png',
  },
  {
    quote: 'I stopped being the bottleneck. My team describes what they need and I review it instead of building it from scratch.',
    name: 'Thorsten Schaar',
    company: 'Foodji',
    logo: 'https://foodji.com/wp-content/uploads/2023/01/foodji-logo.svg',
  },
  {
    quote: 'We used to schedule Salesforce changes quarterly. Now we ship weekly. Same team, same org, completely different velocity.',
    name: 'Monica Garcia',
    company: 'TrustYou',
    logo: 'https://www.trustyou.com/wp-content/uploads/2023/06/trustyou-logo.svg',
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
        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={staggerItem}
              className="p-8 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-md transition-all flex flex-col">
              {/* Quote at top */}
              <p className="text-text text-lg leading-relaxed italic flex-1">
                "{t.quote}"
              </p>
              {/* Name + logo at bottom */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-light">
                <img
                  src={t.logo}
                  alt={t.company}
                  className="h-5 w-auto opacity-40 grayscale"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="ml-auto text-right">
                  <p className="font-semibold text-text text-sm">{t.name}</p>
                  <p className="text-text-light text-xs">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
