import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, FileText, GitCompare, RadioTower, ShieldAlert, ClipboardList } from 'lucide-react'

const cards = [
  { icon: Layers, title: 'Full Org Coverage', desc: 'Objects, fields, flows, permissions, layouts, and 30+ more. FlowSprite understands your entire Salesforce architecture.', color: '#818CF8', bg: '#EEF2FF', rotate: -4 },
  { icon: FileText, title: 'Plain English Previews', desc: 'Every change described in language anyone can read. No XML. No code diffs.', color: '#F472B6', bg: '#FDF2F8', rotate: 3.5 },
  { icon: GitCompare, title: 'Cross-Org Compare', desc: 'Side-by-side view of any two environments. See exactly what\'s different.', color: '#FBBF24', bg: '#FFFBEB', rotate: -2.5 },
  { icon: RadioTower, title: 'Drift Detection', desc: 'Know instantly when someone makes an untracked change. No surprises.', color: '#34D399', bg: '#ECFDF5', rotate: 4 },
  { icon: ShieldAlert, title: 'Policy Guardrails', desc: 'Built-in rules that block dangerous changes before they happen.', color: '#F87171', bg: '#FEF2F2', rotate: -3 },
  { icon: ClipboardList, title: 'Audit Trail', desc: 'Every action logged. Every user accountable. Export for compliance.', color: '#60A5FA', bg: '#EFF6FF', rotate: 2.5 },
]

export default function Features() {
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

  const cardStep = 1 / cards.length

  return (
    <section
      id="features"
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
            Everything under the hood.
          </h2>
        </motion.div>

        {/* Card stack */}
        <div className="relative w-[300px] sm:w-[340px] h-[300px] sm:h-[340px]">
          {cards.map((card, i) => {
            const Icon = card.icon
            const revealAt = i * cardStep
            const cardProgress = Math.max(0, Math.min(1, (progress - revealAt) / cardStep))
            const isRevealed = cardProgress > 0

            const landedCards = Math.floor(progress / cardStep)
            const stackPosition = isRevealed ? Math.max(0, landedCards - i - 1) : 0
            const stackY = stackPosition * -8

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
