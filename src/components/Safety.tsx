import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownUp, GitPullRequest, FileText, ShieldCheck, Database, UserCheck } from 'lucide-react'

const cards = [
  { icon: ArrowDownUp, title: 'One-Way Safety Valve', desc: 'Metadata flows FROM your org INTO your repo. Changes flow FROM your repo INTO your sandbox. Nothing ever flows directly to production.', color: '#818CF8', bg: '#EEF2FF', rotate: -4 },
  { icon: GitPullRequest, title: 'Every Change Is a PR', desc: 'Every field, flow, and permission change is a Git commit with a timestamp, author, and full diff. Rollback to any point.', color: '#F472B6', bg: '#FDF2F8', rotate: 3 },
  { icon: FileText, title: 'Plain English Previews', desc: '"Adds required field Renewal_Date on Opportunity." See exactly what will change. No XML. No guessing.', color: '#FBBF24', bg: '#FFFBEB', rotate: -2.5 },
  { icon: ShieldCheck, title: '7 Policy Guardrails', desc: 'Production deletions blocked. Security metadata flagged. Apex without tests rejected. Flow activations require validation first.', color: '#34D399', bg: '#ECFDF5', rotate: 4 },
  { icon: Database, title: 'You Own Everything', desc: 'Cancel FlowSprite tomorrow — your entire org history stays in your GitHub repo. Forever.', color: '#F87171', bg: '#FEF2F2', rotate: -3 },
  { icon: UserCheck, title: 'Role-Based Access', desc: '5-level permission hierarchy. Sandbox isolation per team. SOC 2 aligned audit logging.', color: '#60A5FA', bg: '#EFF6FF', rotate: 2.5 },
]

export default function Safety() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
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

  // How many cards are revealed based on scroll progress
  const revealedCount = Math.min(cards.length, Math.floor(progress * (cards.length + 1)))

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="relative"
      // Tall section to give scroll room for all cards to stack
      style={{ height: `${100 + cards.length * 40}vh` }}
    >
      {/* Sticky container — pins the card stack to the viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
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

        {/* Card stack area */}
        <div className="relative w-[300px] sm:w-[340px] h-[320px] sm:h-[360px]">
          {cards.map((card, i) => {
            const isRevealed = i < revealedCount
            // Each card stacks with a small vertical offset and its own rotation
            const stackOffset = Math.min(i, revealedCount - 1) * 6
            const Icon = card.icon

            return (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: card.bg,
                  border: `2px solid ${card.color}30`,
                  zIndex: isRevealed ? i + 1 : 0,
                }}
                initial={false}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? stackOffset : 80,
                  scale: isRevealed ? 1 - (revealedCount - 1 - i) * 0.03 : 0.85,
                  rotate: isRevealed ? card.rotate : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 18,
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

        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i < revealedCount ? card.color : '#D1D5DB',
                transform: i < revealedCount ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
