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
  const flowPart = text.length > 4 ? text.slice(0, 4) : text
  const spritePart = text.length > 4 ? text.slice(4) : ''
  const color = '#1E293B'
  const dupeCount = 5
  const fontSize = '30px'
  const lineH = 30 // px, matches font size with leading-[1]
  const fontBase = { fontFamily: "'Bitcount', monospace", fontSize, letterSpacing: '1px', color }

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main wordmark */}
      <div className="flex leading-none whitespace-nowrap" style={fontBase}>
        <span>{flowPart}</span>
        {spritePart && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            {spritePart}
          </motion.span>
        )}
      </div>

      {/* Hover: Flow column + Sprite column offset half a line down */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute left-0 top-full z-50 pointer-events-none flex">
            {/* Flow column */}
            <div>
              {Array.from({ length: dupeCount }).map((_, i) => (
                <motion.div
                  key={`f-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: Math.max(0.06, 0.5 - i * 0.1) }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1, delay: i * 0.03 }}
                  className="leading-[1] whitespace-nowrap"
                  style={fontBase}
                >
                  {flowPart}
                </motion.div>
              ))}
            </div>

            {/* Sprite column — offset down by half a line height, enters after Flow */}
            {spritePart && (
              <div style={{ marginTop: `${lineH / 2}px` }}>
                {Array.from({ length: dupeCount }).map((_, i) => (
                  <motion.div
                    key={`s-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: Math.max(0.06, 0.5 - i * 0.1) }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, delay: 0.08 + i * 0.03 }}
                    className="leading-[1] whitespace-nowrap"
                    style={fontBase}
                  >
                    {spritePart}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onWarmBg, setOnWarmBg] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50)

      // Detect which section background the navbar is over
      const navY = 32 // middle of 64px nav
      const sections = document.querySelectorAll('section')
      let warm = false
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= navY && rect.bottom > navY) {
          const bg = getComputedStyle(section).backgroundColor
          // warm sections have bg-surface-warm (#F5F3F0) or similar warm tones
          // Check if it's not pure white and not the default surface
          if (section.classList.contains('bg-surface-warm')) {
            warm = true
          }
        }
      })
      setOnWarmBg(warm)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Safety', href: '#safety' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? onWarmBg
            ? 'bg-[#F5F3F0]/90 backdrop-blur-md border-b border-[#E8E4DF] shadow-sm'
            : 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
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
          <a href="#pricing" className="px-5 py-2 btn-gradient text-white font-semibold rounded-lg text-sm transition-colors">
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
