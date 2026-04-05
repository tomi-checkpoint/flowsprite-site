import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const plans = [
  { name: 'Free', price: '$0', period: '/mo', description: 'Perfect to explore', features: ['1 sandbox', '1 user', 'Metadata sync', 'Deploy previews', 'Your own GitHub repo'], cta: 'Start Free', popular: false },
  { name: 'Starter', price: '$49', period: '/mo', description: 'For solo admins shipping changes', features: ['3 sandboxes', '3 users', '50 deploys/mo', 'Git branching & PRs', 'Deploy previews', 'Audit trail'], cta: 'Start Free', popular: false },
  { name: 'Pro', price: '$199', period: '/mo', description: 'For teams managing multiple orgs', features: ['5 sandboxes', '10 users', '500 deploys/mo', 'Cross-org compare', 'Promotion workflows', 'Policy engine', 'Webhooks', 'Drift detection'], cta: 'Start Free', popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', description: 'For large orgs with compliance needs', features: ['Unlimited sandboxes', 'Unlimited users', 'Unlimited deploys', 'Approval workflows', 'Audit export', 'SSO / SAML', 'Dedicated support', 'Custom policies'], cta: 'Contact Us', popular: false },
]

export default function Pricing() {
  const { ref, isInView } = useScrollAnimation()
  return (
    <section id="pricing" ref={ref} className="py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-4">
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">Transparent pricing. <span className="text-text-light">No sales calls required.</span></h2>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-text-muted mb-16 text-lg">
          All plans include your own GitHub repo, full audit trail, deploy previews, and the guarantee that we <strong className="text-text">never touch your production org.</strong>
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all ${plan.popular ? 'border-primary/30 bg-primary/[0.02] shadow-lg shadow-primary/5 scale-[1.02]' : 'border-border bg-white shadow-sm'}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full text-xs text-white font-semibold">Most Popular</div>}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2"><span className="text-4xl font-black text-text">{plan.price}</span><span className="text-text-light text-sm">{plan.period}</span></div>
                <p className="text-text-light text-sm">{plan.description}</p>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm"><Check size={16} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-primary' : 'text-success'}`} /><span className="text-text-muted">{f}</span></li>
                ))}
              </ul>
              <a href="#" className={`flex items-center justify-center gap-2 w-full text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${
                plan.popular ? 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20' :
                plan.name === 'Enterprise' ? 'bg-surface hover:bg-border-light text-text border border-border' :
                'bg-primary/10 hover:bg-primary/15 text-primary'
              }`}>{plan.cta}<ArrowRight size={14} /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
