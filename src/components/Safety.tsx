import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowDownUp, GitPullRequest, FileText, ShieldCheck, Database, UserCheck } from 'lucide-react'

const cards = [
  { icon: ArrowDownUp, title: 'One-Way Safety Valve', desc: 'Metadata flows FROM your org INTO your repo. Changes flow FROM your repo INTO your sandbox. Nothing ever flows directly to production.', color: '#818CF8', bg: '#EEF2FF', rotate: -6 },
  { icon: GitPullRequest, title: 'Every Change Is a PR', desc: 'Every field, flow, and permission change is a Git commit with a timestamp, author, and full diff. Rollback to any point.', color: '#F472B6', bg: '#FDF2F8', rotate: 4 },
  { icon: FileText, title: 'Plain English Previews', desc: '"Adds required field Renewal_Date on Opportunity." See exactly what will change before anything touches your sandbox.', color: '#FBBF24', bg: '#FFFBEB', rotate: -3 },
  { icon: ShieldCheck, title: '7 Policy Guardrails', desc: 'Production deletions blocked. Security metadata flagged. Apex without tests rejected. Flow activations require validation first.', color: '#34D399', bg: '#ECFDF5', rotate: 5 },
  { icon: Database, title: 'You Own Everything', desc: 'Cancel FlowSprite tomorrow — your entire org history, every commit, every rollback point stays in your GitHub repo. Forever.', color: '#F87171', bg: '#FEF2F2', rotate: -4 },
  { icon: UserCheck, title: 'Role-Based Access', desc: '5-level permission hierarchy from viewer to owner. Sandbox isolation per team. SOC 2 aligned audit logging.', color: '#60A5FA', bg: '#EFF6FF', rotate: 3 },
]

export default function Safety() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  // Track section visibility
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '0px 0px -20% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle through cards
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % cards.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section id="safety" ref={sectionRef} className="py-28 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            The most <span className="gradient-text">paranoid</span> deployment system for Salesforce.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Built by people who've seen too many production incidents.
          </p>
        </motion.div>

        {/* Card stack + description layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: stacked tilted cards */}
          <div className="relative w-[320px] h-[380px] shrink-0">
            {cards.map((card, i) => {
              const isActive = i === activeIndex
              const distance = ((i - activeIndex + cards.length) % cards.length)
              // Cards behind the active one stack with offset
              const zIndex = cards.length - distance
              const yOffset = distance * 8
              const scaleVal = 1 - distance * 0.04
              const opacityVal = distance === 0 ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.4 : 0.15

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer"
                  style={{
                    backgroundColor: card.bg,
                    border: `2px solid ${card.color}30`,
                    boxShadow: isActive ? `0 20px 60px ${card.color}20` : '0 4px 20px rgba(0,0,0,0.06)',
                    zIndex,
                  }}
                  animate={{
                    rotate: isActive ? card.rotate : card.rotate * 0.5,
                    y: yOffset,
                    scale: scaleVal,
                    opacity: opacityVal,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                  onClick={() => setActiveIndex(i)}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <card.icon size={30} style={{ color: card.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{card.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Right: active card details + nav dots */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: `${cards[activeIndex].color}15`, color: cards[activeIndex].color }}
              >
                {(() => { const Icon = cards[activeIndex].icon; return <Icon size={16} /> })()}
                {cards[activeIndex].title}
              </div>
              <p className="text-text-muted text-lg leading-relaxed max-w-md">
                {cards[activeIndex].desc}
              </p>
            </motion.div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-8 justify-center lg:justify-start">
              {cards.map((card, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === activeIndex ? card.color : '#D1D5DB',
                    transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
