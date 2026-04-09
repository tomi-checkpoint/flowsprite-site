import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, FileText, GitCompare, RadioTower, ShieldAlert, ClipboardList } from 'lucide-react'

const cards = [
  { icon: Layers, title: 'Full Org Coverage', desc: 'Objects, fields, flows, permissions, layouts, and 30+ more. FlowSprite understands your entire Salesforce architecture.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: FileText, title: 'Plain English Previews', desc: 'Every change described in language anyone can read. No XML. No code diffs.', color: '#1A5BBF', bg: '#DBEAFE' },
  { icon: GitCompare, title: 'Cross-Org Compare', desc: 'Side-by-side view of any two environments. See exactly what\'s different.', color: '#D97706', bg: '#FFFBEB' },
  { icon: RadioTower, title: 'Drift Detection', desc: 'Know instantly when someone makes an untracked change. No surprises.', color: '#059669', bg: '#ECFDF5' },
  { icon: ShieldAlert, title: 'Policy Guardrails', desc: 'Built-in rules that block dangerous changes before they happen.', color: '#EF4444', bg: '#FEF2F2' },
  { icon: ClipboardList, title: 'Audit Trail', desc: 'Every action logged. Every user accountable. Export for compliance.', color: '#3B82F6', bg: '#EFF6FF' },
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
          className="text-center mb-8 px-6"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-text mb-4">
            Everything under the hood.
          </h2>
        </motion.div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl px-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            const revealAt = i * cardStep
            const cardProgress = Math.max(0, Math.min(1, (progress - revealAt) / cardStep))
            const isRevealed = cardProgress > 0

            const slideY = cardProgress < 1 ? (1 - cardProgress) * 250 : 0

            return (
              <motion.div
                key={i}
                className="rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[200px]"
                style={{
                  backgroundColor: card.bg,
                  border: `2px solid ${card.color}30`,
                  boxShadow: `0 8px 30px ${card.color}15, 0 2px 8px rgba(0,0,0,0.06)`,
                  pointerEvents: isRevealed ? 'auto' : 'none',
                }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? slideY : 250,
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
