import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import MeshGradient from './MeshGradient'
import ProductDemo from './ProductDemo'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Dark base */}
      <div className="absolute inset-0 bg-dark" />

      {/* Animated mesh gradient background */}
      <MeshGradient />

      {/* Subtle grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Now in public beta — free to start
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6"
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
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          FlowSprite pulls your entire org metadata into a private GitHub repository
          <strong className="text-white"> you own</strong>. Every change goes through a pull request.
          Nothing touches your sandbox until you approve it.
          Nothing touches production. <strong className="text-white">Ever.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="#pricing"
            className="group px-8 py-3.5 bg-amber hover:bg-amber-dark text-dark font-bold rounded-xl text-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            Start Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 border border-white/20 text-white rounded-xl text-lg hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Play size={18} />
            See How It Works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-gray-500 mb-16"
        >
          2-minute setup · No Connected App · No SFDX · No developers required
        </motion.p>

        {/* Two-panel product demo */}
        <ProductDemo />
      </div>
    </section>
  )
}
