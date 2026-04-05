import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useAnimations'

const chatMessages = [
  { role: 'user', text: 'Create a Lead Routing flow that assigns leads by region', delay: 0 },
  { role: 'ai', text: 'I\'ll build a Record-Triggered Flow on Lead with region-based assignment. Creating the flow now...', delay: 2000 },
  { role: 'ai', text: '✓ Flow created: Lead_Routing_v12\n✓ Entry criteria: Lead.Region__c is not null\n✓ 4 assignment rules configured\n✓ Fallback to round-robin queue', delay: 4500 },
  { role: 'user', text: 'Deploy it to the sandbox', delay: 7500 },
  { role: 'ai', text: 'Opening PR #47 with deploy preview...', delay: 9000 },
]

const prStages = [
  { label: 'PR Created', status: 'done', delay: 9500 },
  { label: 'Policy Checks', status: 'done', delay: 10500 },
  { label: 'Validation', status: 'done', delay: 11500 },
  { label: 'Deployed to Sandbox', status: 'done', delay: 13000 },
]

const diffLines = [
  { type: 'file', text: 'force-app/main/default/flows/Lead_Routing.flow-meta.xml' },
  { type: 'add', text: '+ <actionType>flowAssignment</actionType>' },
  { type: 'add', text: '+ <field>OwnerId</field>' },
  { type: 'add', text: '+ <value>Lead_Queue_EMEA</value>' },
  { type: 'context', text: '  <processType>AutoLaunchedFlow</processType>' },
  { type: 'add', text: '+ <triggerType>RecordAfterSave</triggerType>' },
]

export default function ProductDemo() {
  const { ref, isInView } = useScrollAnimation(0.1)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [visibleStages, setVisibleStages] = useState(0)
  const [showDiff, setShowDiff] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const timers: ReturnType<typeof setTimeout>[] = []

    // Animate chat messages
    chatMessages.forEach((msg, i) => {
      if (msg.role === 'ai' && i > 0) {
        timers.push(setTimeout(() => setIsTyping(true), msg.delay - 1200))
      }
      timers.push(setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(i + 1)
      }, msg.delay))
    })

    // Animate PR stages
    prStages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleStages(i + 1), prStages[i].delay))
    })

    // Show diff
    timers.push(setTimeout(() => setShowDiff(true), 10000))

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl border border-white/10 overflow-hidden bg-dark-lighter/80 backdrop-blur-sm glow-violet">

        {/* LEFT: AI Chat Panel */}
        <div className="border-b lg:border-b-0 lg:border-r border-white/5">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-gray-500 ml-2 font-mono">FlowSprite AI</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] text-success">Connected to TrustYou Sandbox</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-4 space-y-3 min-h-[280px] text-left">
            <AnimatePresence>
              {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet/20 text-violet-light border border-violet/20'
                      : 'bg-white/[0.05] text-gray-300 border border-white/5'
                  }`}>
                    <pre className="whitespace-pre-wrap font-mono">{msg.text}</pre>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT: GitHub PR Panel */}
        <div>
          {/* PR header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#8B5CF6" className="shrink-0">
              <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
            </svg>
            <span className="text-xs text-gray-500 font-mono">PR #47</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success font-mono ml-auto">main ← feature/lead-routing</span>
          </div>

          {/* PR content */}
          <div className="p-4 min-h-[280px] text-left">
            {/* PR title */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-1">Add Lead Routing Flow v12</h4>
              <p className="text-[10px] text-gray-500">Region-based lead assignment with EMEA, NA, APAC rules</p>
            </div>

            {/* Status checks */}
            <div className="space-y-1.5 mb-4">
              {prStages.map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={i < visibleStages ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    i < visibleStages ? 'bg-success/20' : 'bg-white/5'
                  }`}>
                    {i < visibleStages ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    )}
                  </div>
                  <span className={`text-xs font-mono ${i < visibleStages ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stage.label}
                  </span>
                  {i === visibleStages - 1 && i === prStages.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[9px] px-1.5 py-0.5 rounded-full bg-success/20 text-success font-semibold ml-auto"
                    >
                      LIVE
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Diff view */}
            <AnimatePresence>
              {showDiff && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-white/5 overflow-hidden"
                >
                  <div className="px-3 py-1.5 bg-white/[0.02] border-b border-white/5">
                    <span className="text-[10px] font-mono text-gray-500">Lead_Routing.flow-meta.xml</span>
                  </div>
                  <div className="p-2 space-y-0">
                    {diffLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`text-[10px] font-mono px-2 py-0.5 ${
                          line.type === 'add' ? 'bg-success/5 text-success' :
                          line.type === 'remove' ? 'bg-danger/5 text-danger' :
                          line.type === 'file' ? 'text-gray-500 font-semibold' :
                          'text-gray-600'
                        }`}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="text-xs text-gray-600 mt-4 text-center"
      >
        Ask AI to build → Review the PR → Deploy to sandbox. That's the whole workflow.
      </motion.p>
    </motion.div>
  )
}
