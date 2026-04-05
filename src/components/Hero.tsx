import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import ProductDemo from './ProductDemo'

// Floating brand logos (Claude, Salesforce, GitHub) - realfood.gov scattered style
function FloatingLogos() {
  const logos = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Salesforce_logo.svg/2560px-Salesforce_logo.svg.png', alt: 'Salesforce', x: '8%', y: '25%', size: 52, delay: 0, rotate: -8 },
    { src: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', alt: 'GitHub', x: '88%', y: '18%', size: 44, delay: 0.5, rotate: 12 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1024px-Claude_AI_logo.svg.png', alt: 'Claude', x: '6%', y: '65%', size: 40, delay: 1, rotate: -5 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Salesforce_logo.svg/2560px-Salesforce_logo.svg.png', alt: 'Salesforce', x: '90%', y: '60%', size: 38, delay: 1.5, rotate: 8 },
    { src: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', alt: 'GitHub', x: '14%', y: '82%', size: 36, delay: 2, rotate: -12 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1024px-Claude_AI_logo.svg.png', alt: 'Claude', x: '82%', y: '80%', size: 34, delay: 0.8, rotate: 15 },
  ]

  return (
    <>
      {logos.map((logo, i) => (
        <motion.img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className="absolute pointer-events-none select-none opacity-[0.08] hidden lg:block"
          style={{ left: logo.x, top: logo.y, width: logo.size, height: logo.size, objectFit: 'contain' }}
          initial={{ opacity: 0, scale: 0, rotate: logo.rotate * 3 }}
          animate={{
            opacity: 0.08,
            scale: 1,
            rotate: logo.rotate,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: logo.delay },
            scale: { duration: 0.8, delay: logo.delay, type: 'spring', bounce: 0.4 },
            rotate: { duration: 0.8, delay: logo.delay },
            y: { duration: 6 + i, delay: logo.delay + 0.8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-alt to-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.04),transparent_50%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating logos */}
      <FloatingLogos />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Now in public beta — free to start
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-text mb-6"
        >
          Your Salesforce.{' '}
          <br className="hidden sm:block" />
          Your repo.{' '}
          <span className="highlight-box">Zero risk.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          FlowSprite pulls your entire org metadata into a private GitHub repository
          <strong className="text-text"> you own</strong>. Every change goes through a pull request.
          Nothing touches your sandbox until you approve it.
          Nothing touches production. <strong className="text-text">Ever.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a href="#pricing" className="group px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary/20">
            Start Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#how-it-works" className="px-8 py-3.5 border border-border text-text rounded-xl text-lg hover:bg-surface-alt transition-all flex items-center gap-2">
            <Play size={18} />
            See How It Works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-text-light mb-16"
        >
          2-minute setup · No Connected App · No SFDX · No developers required
        </motion.p>

        <ProductDemo />
      </div>
    </section>
  )
}
