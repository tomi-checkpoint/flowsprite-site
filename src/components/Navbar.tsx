import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// FlowSprite wordmark as SVG paths for per-letter color animation
function Wordmark({ hovered }: { hovered: boolean }) {
  const colors = ['#4F46E5', '#EC4899', '#F59E0B', '#7C3AED', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4']
  const letters = [
    { char: 'F', d: 'M2 2h8v3H5.5v3H9v3H5.5v6H2V2z' },
    { char: 'l', d: 'M12 2h3.5v15H12V2z' },
    { char: 'o', d: 'M18 9.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0zm3.2 0a1.3 1.3 0 112.6 0 1.3 1.3 0 01-2.6 0z' },
    { char: 'w', d: 'M29 7h3.2l1.8 6 2-6h3l2 6 1.8-6H46l-3.5 10h-3l-2-6-2 6h-3L29 7z' },
    { char: 'S', d: 'M49 7c3 0 5 1.5 5 3.5h-3.2c0-.7-.8-1.2-1.8-1.2s-1.6.4-1.6 1c0 1.8 6.6.5 6.6 4.7 0 2.2-2 3.5-5 3.5-3.2 0-5.2-1.5-5.2-3.7h3.2c0 .8.9 1.4 2 1.4s1.8-.5 1.8-1.1c0-1.8-6.6-.5-6.6-4.7 0-2 2-3.4 4.8-3.4z' },
    { char: 'p', d: 'M57 7h3.5v1.5A3.5 3.5 0 0164 7c2.5 0 4.5 2 4.5 5s-2 5-4.5 5a3.5 3.5 0 01-3.5-1.5V21H57V7zm3.5 5c0 1.5 1 2.5 2.2 2.5S65 13.5 65 12s-1-2.5-2.3-2.5S60.5 10.5 60.5 12z' },
    { char: 'r', d: 'M71 7h3.5v2A3 3 0 0178 7v3.5h-1c-2 0-3 1-3 3V17H71V7z' },
    { char: 'i', d: 'M81 3.5a2 2 0 110 2.5 2 2 0 010-2.5zM79.5 7H83v10h-3.5V7z' },
    { char: 't', d: 'M86 2h3.5v5H92v3h-2.5v4.5c0 .8.3 1.2 1.2 1.2H92V19h-2c-2.2 0-3.5-1-3.5-3.2V10H85V7h1V2z' },
    { char: 'e', d: 'M95 12c0-3 2.2-5 5-5s5 2 5 4.8v1H98.3c.2 1.3 1.2 2 2.5 2 1 0 1.8-.4 2.3-1h3.2c-.7 2-2.7 3.2-5.3 3.2-3.2 0-5.5-2-5.5-5zm3.3-1h4c-.2-1.2-1-2-2-2s-1.8.8-2 2z' },
  ]

  return (
    <svg viewBox="0 0 105 22" className="h-6 sm:h-7" fill="none">
      {letters.map((l, i) => (
        <path
          key={i}
          d={l.d}
          fill={hovered ? colors[i % colors.length] : '#1E293B'}
          style={{ transition: 'fill 0.15s ease' }}
        />
      ))}
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

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
        <a
          href="#"
          className="flex items-center gap-2.5"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-violet to-primary-light flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4"/>
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z"/>
            </svg>
          </div>
          <Wordmark hovered={logoHovered} />
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
