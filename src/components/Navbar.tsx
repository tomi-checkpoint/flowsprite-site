import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function Wordmark() {
  const [hovered, setHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const p = Math.min(1, window.scrollY / 400)
      setScrollProgress(p)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const middleChars = 'lowSprit'
  const getDisplayText = () => {
    if (scrollProgress >= 1) return 'Fs'
    if (scrollProgress <= 0) return 'FlowSprite'
    // Gradually remove middle chars
    const mid = middleChars.slice(0, Math.round(middleChars.length * (1 - scrollProgress)))
    return 'F' + mid + (mid.length > 0 ? 'e' : 's')
  }

  const text = getDisplayText()
  const duplicateCount = 3
  const color = '#1E293B'

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main wordmark line */}
      <div className="flex leading-none whitespace-nowrap" style={{ fontFamily: "'Bitcount', monospace", fontSize: '24px', letterSpacing: '1px', color }}>
        <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
          {text.length > 2 ? text.slice(0, 4) : text}
        </motion.span>
        {text.length > 4 && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            {text.slice(4)}
          </motion.span>
        )}
      </div>

      {/* Hover: duplicate down, no color — same dark color, decreasing opacity */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute left-0 top-full z-50 pointer-events-none">
            {/* "Flow" copies */}
            {Array.from({ length: duplicateCount }).map((_, i) => (
              <motion.div
                key={`flow-${i}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 0.55 - i * 0.15, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, delay: i * 0.04 }}
                className="leading-none whitespace-nowrap"
                style={{ fontFamily: "'Bitcount', monospace", fontSize: '24px', letterSpacing: '1px', color }}
              >
                {text.length >= 4 ? text.slice(0, 4) : text}
              </motion.div>
            ))}

            {/* "Sprite" copies — slight delay after Flow */}
            {text.length > 4 && Array.from({ length: duplicateCount }).map((_, i) => (
              <motion.div
                key={`sprite-${i}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 0.55 - i * 0.15, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, delay: 0.15 + i * 0.04 }}
                className="leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'Bitcount', monospace",
                  fontSize: '24px',
                  letterSpacing: '1px',
                  color,
                  paddingLeft: `${4 * 14.4}px`,
                }}
              >
                {text.slice(4)}
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
