import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownUp, GitPullRequest, FileText, ShieldCheck, Database, UserCheck } from 'lucide-react'

const cards = [
  { icon: ArrowDownUp, title: 'One-Way Safety Valve', desc: 'Metadata flows FROM your org INTO your repo. Changes flow FROM your repo INTO your sandbox. Nothing ever flows directly to production.', color: '#818CF8', bg: '#EEF2FF', rotate: -4 },
  { icon: GitPullRequest, title: 'Every Change Is a PR', desc: 'Every field, flow, and permission change is a Git commit with a timestamp, author, and full diff. Rollback to any point.', color: '#F472B6', bg: '#FDF2F8', rotate: 3.5 },
  { icon: FileText, title: 'Plain English Previews', desc: '"Adds required field Renewal_Date on Opportunity." See exactly what will change. No XML. No guessing.', color: '#FBBF24', bg: '#FFFBEB', rotate: -2.5 },
  { icon: ShieldCheck, title: '7 Policy Guardrails', desc: 'Production deletions blocked. Security metadata flagged. Apex without tests rejected. Flow activations require validation first.', color: '#34D399', bg: '#ECFDF5', rotate: 4 },
  { icon: Database, title: 'You Own Everything', desc: 'Cancel FlowSprite tomorrow — your entire org history stays in your GitHub repo. Forever.', color: '#F87171', bg: '#FEF2F2', rotate: -3 },
  { icon: UserCheck, title: 'Role-Based Access', desc: '5-level permission hierarchy. Sandbox isolation per team. SOC 2 aligned audit logging.', color: '#60A5FA', bg: '#EFF6FF', rotate: 2.5 },
]

export default function Safety() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const totalScroll = sectionHeight - viewportHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScroll))
      setProgress(p)
      if (rect.top < viewportHeight * 0.8) setVisible(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Each card gets revealed at a fraction of the total scroll
  const cardStep = 1 / cards.length

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + cards.length * 80}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            The most <span className="gradient-text">paranoid</span> deployment system for Salesforce.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Built by people who've seen too many production incidents.
          </p>
        </motion.div>

        {/* Card stack */}
        <div className="relative w-[300px] sm:w-[340px] h-[300px] sm:h-[340px]">
          {cards.map((card, i) => {
            const Icon = card.icon
            // This card's reveal threshold
            const revealAt = i * cardStep
            // 0 = not yet, 0→1 = sliding in, 1 = fully landed
            const cardProgress = Math.max(0, Math.min(1, (progress - revealAt) / cardStep))
            const isRevealed = cardProgress > 0

            // Stack offset: each landed card pushes down slightly so edges peek out
            // Top card (latest) is at y=0, cards below shift down
            const landedCards = Math.floor(progress / cardStep)
            const stackPosition = isRevealed ? Math.max(0, landedCards - i - 1) : 0
            const stackY = stackPosition * -8  // older cards shift UP (peek out above)

            // Incoming card slides up from below
            const slideY = cardProgress < 1 ? (1 - cardProgress) * 250 : 0

            return (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: card.bg,
                  border: `2px solid ${card.color}30`,
                  boxShadow: `0 8px 30px ${card.color}15, 0 2px 8px rgba(0,0,0,0.06)`,
                  zIndex: isRevealed ? i + 1 : 0,
                  pointerEvents: isRevealed ? 'auto' : 'none',
                }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: slideY + stackY,
                  rotate: isRevealed ? card.rotate : 0,
                  scale: isRevealed ? 1 - stackPosition * 0.02 : 0.9,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 16,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <Icon size={28} style={{ color: card.color }} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text mb-2">{card.title}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
