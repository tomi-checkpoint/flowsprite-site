import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const floatingIcons = [
  { emoji: '📦', x: '10%', y: '20%', delay: 0 },
  { emoji: '🔀', x: '85%', y: '15%', delay: 1 },
  { emoji: '🛡️', x: '5%', y: '70%', delay: 2 },
  { emoji: '⚡', x: '90%', y: '65%', delay: 0.5 },
  { emoji: '🔐', x: '15%', y: '45%', delay: 1.5 },
  { emoji: '📋', x: '80%', y: '40%', delay: 2.5 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Floating icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20 pointer-events-none select-none"
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
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
          className="text-sm text-gray-500"
        >
          2-minute setup · No Connected App · No SFDX · No developers required
        </motion.p>

        {/* Hero visual — deploy preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-white/10 bg-dark-lighter/80 backdrop-blur-sm overflow-hidden glow-violet">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-gray-500 ml-2 font-mono">Deploy Preview — PR #47 → TrustYou Sandbox</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-left">
              <div className="text-gray-500 mb-3">3 changes · 0 warnings · All policy checks passed ✓</div>
              <div className="flex items-start gap-2 mb-2">
                <span className="text-success font-bold">+</span>
                <span className="text-success">Adds required field <span className="text-white font-semibold">'Renewal_Date__c'</span> on Opportunity</span>
              </div>
              <div className="flex items-start gap-2 mb-2">
                <span className="text-amber font-bold">~</span>
                <span className="text-amber">Updates validation rule <span className="text-white font-semibold">'Closed_Lost_Reason_Required'</span> formula</span>
              </div>
              <div className="flex items-start gap-2 mb-2">
                <span className="text-primary font-bold">→</span>
                <span className="text-primary">Activates Flow <span className="text-white font-semibold">'Lead_Routing'</span> version 12</span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-gray-500">
                Dependencies checked · No downstream breaks detected · <span className="text-success">Ready to deploy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
