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

function useColumns() {
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setCols(w < 640 ? 1 : w < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return cols
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const cols = useColumns()

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
  // How far through the reveal sequence we are
  const revealedCount = Math.min(cards.length, Math.floor(progress / cardStep) + (progress % cardStep > 0 ? 1 : 0))

  // Grid gap and card sizing
  const gap = 24

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + cards.length * 70}vh` }}
    >
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

        {/* Grid container */}
        <div
          className="relative mx-auto px-6"
          style={{
            width: '100%',
            maxWidth: cols === 3 ? 960 : cols === 2 ? 660 : 340,
          }}
        >
          {/* Invisible grid sizer for consistent layout */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap,
            }}
          >
            {cards.map((card, i) => {
              const Icon = card.icon
              const revealAt = i * cardStep
              const cardProgress = Math.max(0, Math.min(1, (progress - revealAt) / cardStep))
              const isRevealed = cardProgress > 0.01

              // Target grid position
              const row = Math.floor(i / cols)
              const col = i % cols

              // During animation: slide up from below. When landed: grid position
              const landed = cardProgress >= 0.95
              const slideFromY = landed ? 0 : (1 - cardProgress) * 200

              return (
                <motion.div
                  key={i}
                  className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: card.bg,
                    border: `2px solid ${card.color}20`,
                    boxShadow: `0 4px 20px ${card.color}10, 0 2px 6px rgba(0,0,0,0.04)`,
                    gridColumn: col + 1,
                    gridRow: row + 1,
                    minHeight: 180,
                  }}
                  animate={{
                    opacity: isRevealed ? 1 : 0,
                    y: slideFromY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 18,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <Icon size={24} style={{ color: card.color }} />
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">{card.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
