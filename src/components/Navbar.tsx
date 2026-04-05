import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// Ditto-style wordmark: duplicate-down on hover, accordion-to-F on scroll
function Wordmark() {
  const [hovered, setHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      // 0 at top, 1 at ~400px scroll
      const p = Math.min(1, window.scrollY / 400)
      setScrollProgress(p)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // On scroll, letters collapse: FlowSprite -> Flowsprit -> ... -> Fl -> F
  const fullText = 'FlowSprite'
  const visibleChars = Math.max(1, Math.round(fullText.length * (1 - scrollProgress)))
  const displayText = fullText.slice(0, visibleChars)

  const duplicateCount = 3
  const baseColor = '#1E293B'
  const dupeColors = [
    ['#4F46E5', '#EC4899', '#7C3AED'], // row colors for "Flow"
    ['#F59E0B', '#10B981', '#3B82F6'], // row colors for "Sprite"
  ]

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main wordmark */}
      <div
        className="font-bold leading-none whitespace-nowrap"
        style={{
          fontFamily: "'Bitcount', monospace",
          fontSize: '24px',
          letterSpacing: '1px',
          color: baseColor,
        }}
      >
        {displayText}
      </div>

      {/* Hover duplication: stacked copies below */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute left-0 top-full z-50" style={{ pointerEvents: 'none' }}>
            {/* "Flow" duplicates */}
            {Array.from({ length: duplicateCount }).map((_, i) => (
              <motion.div
                key={`flow-${i}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.7 - i * 0.15, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, delay: i * 0.05 }}
                className="leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'Bitcount', monospace",
                  fontSize: '24px',
                  letterSpacing: '1px',
                  color: dupeColors[0][i],
                  mixBlendMode: 'multiply',
                }}
              >
                {displayText.length >= 4 ? displayText.slice(0, 4) : displayText}
              </motion.div>
            ))}

            {/* "Sprite" duplicates (delayed) */}
            {displayText.length > 4 && Array.from({ length: duplicateCount }).map((_, i) => (
              <motion.div
                key={`sprite-${i}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.7 - i * 0.15, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, delay: 0.2 + i * 0.05 }}
                className="leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'Bitcount', monospace",
                  fontSize: '24px',
                  letterSpacing: '1px',
                  color: dupeColors[1][i],
                  mixBlendMode: 'multiply',
                  paddingLeft: `${4 * 14.4}px`, // offset to align under "Sprite" portion
                }}
              >
                {displayText.slice(4)}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Safety', href: '#safety' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-violet to-primary-light flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4"/>
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z"/>
            </svg>
          </div>
          <Wordmark />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-text-muted hover:text-text transition-colors">{l.label}</a>
          ))}
          <a href="#pricing" className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg text-sm transition-colors">
            Start Free
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-text">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-border px-6 py-4 space-y-3"
        >
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-text-muted hover:text-text py-2">{l.label}</a>
          ))}
          <a href="#pricing" className="block px-5 py-2 bg-primary text-white font-semibold rounded-lg text-sm text-center">Start Free</a>
        </motion.div>
      )}
    </motion.nav>
  )
}
