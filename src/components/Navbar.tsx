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
    const mid = middleChars.slice(0, Math.round(middleChars.length * (1 - scrollProgress)))
    return 'F' + mid + (mid.length > 0 ? 'e' : 's')
  }

  const text = getDisplayText()
  const color = '#1E293B'
  const dupeCount = 5
  const fontStyle = { fontFamily: "'Bitcount', monospace", fontSize: '30px', letterSpacing: '1px', color }

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main wordmark */}
      <div className="flex leading-none whitespace-nowrap" style={fontStyle}>
        <span>{text.length > 4 ? text.slice(0, 4) : text}</span>
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

      {/* Hover: tightly packed duplicates fading down */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute left-0 top-full z-50 pointer-events-none">
            {Array.from({ length: dupeCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.max(0.06, 0.5 - i * 0.1) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, delay: i * 0.03 }}
                className="leading-[1] whitespace-nowrap"
                style={fontStyle}
              >
                {text}
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
        <a href="#" className="flex items-center">
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
