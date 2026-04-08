import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useAnimations'
import { ChevronRight } from 'lucide-react'

/* ── Pipeline stages ── */
const stages = [
  'Ideation',
  'Iteration',
  'Push to GitHub',
  'Review in GitHub',
  'Approved',
  'Live in Sandbox',
  'In Change Set',
  'Ready for Production',
]

/* ── Claude Code chat items ── */
type ChatItem =
  | { type: 'user'; text: string; delay: number }
  | { type: 'ai'; text: string; delay: number }
  | { type: 'collapse'; label: string; delay: number }
  | { type: 'code'; label: string; content: string; delay: number }
  | { type: 'table'; delay: number }

const chatItems: ChatItem[] = [
  { type: 'user', text: 'Add upsell delta calculation for UPS/DWN opportunities. When a ramp is linked to an opp, compare CB Products (before) against ramp line items (after) and create delta records.', delay: 0 },
  { type: 'ai', text: 'Let me read your answers and explore the codebase areas that need changes.', delay: 1800 },
  { type: 'collapse', label: 'Read a file', delay: 2600 },
  { type: 'ai', text: 'Now let me explore the key files that need changes based on these answers.', delay: 3200 },
  { type: 'collapse', label: 'Ran 3 agents', delay: 4000 },
  { type: 'ai', text: 'Now let me design the implementation plan.', delay: 4800 },
  { type: 'collapse', label: 'Design implementation plan', delay: 5400 },
  { type: 'ai', text: "Good — 14 custom objects vs 199 standard. A better .forceignore strategy: instead of listing 199 standard objects, use a reverse pattern. Let me write the plan now.", delay: 6200 },
  { type: 'collapse', label: 'Created a file, finished plan', delay: 7200 },
  { type: 'ai', text: "The plan is written. Here's the summary:", delay: 8000 },
  { type: 'table', delay: 8800 },
  { type: 'ai', text: 'Skipped per your answers: currency fix, notifications, reporting, close-date alerts, prod deployment, health monitoring.', delay: 10000 },
]

/* ── GitHub PR content sections (revealed sequentially) ── */
const prSections = [
  { id: 'header', delay: 11000 },
  { id: 'summary', delay: 11800 },
  { id: 'components', delay: 12600 },
  { id: 'risk', delay: 13400 },
  { id: 'impacted', delay: 14200 },
  { id: 'testplan', delay: 15000 },
  { id: 'rollback', delay: 15800 },
  { id: 'footer', delay: 16400 },
]

/* ── Pipeline timing: which stage lights up at which ms ── */
const stageTiming = [0, 1800, 10500, 11000, 14200, 15800, 16400, 17200]

function CollapsedSection({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1 text-text-light">
      <ChevronRight size={12} className="shrink-0" />
      <span className="text-[11px] italic">{label}</span>
    </div>
  )
}

function PlanTable() {
  const rows = [
    { phase: '1. Deploy Pipeline', items: '4 items (S-M)', focus: 'Expand .forceignore → simplify deploy → add daily auto-sync workflow' },
    { phase: '2. Apex Code Quality', items: '4 items (S-M)', focus: 'DeveloperNames → CLogger → error logging → charge items + ramps' },
    { phase: '3. MCP Propose Tools', items: '4 items (all S)', focus: 'propose_apex_class, propose_flow, propose_permission_set' },
    { phase: '4. Test Coverage', items: '3 items (M-L)', focus: 'RemoteProductSyncTest, RampPricingServiceTest, SubscriptionTest' },
  ]
  return (
    <div className="rounded-md border border-border-light overflow-hidden text-[10px]">
      <div className="grid grid-cols-[1fr_0.7fr_2fr] bg-surface-warm font-semibold text-text-muted">
        <div className="px-2 py-1.5 border-b border-border-light">Phase</div>
        <div className="px-2 py-1.5 border-b border-border-light">Items</div>
        <div className="px-2 py-1.5 border-b border-border-light">Focus</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_0.7fr_2fr] text-text-muted">
          <div className="px-2 py-1.5 border-b border-border-light font-medium text-text">{r.phase}</div>
          <div className="px-2 py-1.5 border-b border-border-light">{r.items}</div>
          <div className="px-2 py-1.5 border-b border-border-light">{r.focus}</div>
        </div>
      ))}
    </div>
  )
}

function CodeBadge({ children }: { children: string }) {
  return <span className="px-1 py-0.5 rounded bg-red-50 text-red-700 font-mono text-[9px] border border-red-100">{children}</span>
}

export default function ProductDemo() {
  const { ref, isInView } = useScrollAnimation(0.1)
  const [visibleItems, setVisibleItems] = useState(0)
  const [visiblePR, setVisiblePR] = useState(0)
  const [activeStage, setActiveStage] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const prScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isInView) return
    const timers: ReturnType<typeof setTimeout>[] = []

    // Chat items
    chatItems.forEach((item, i) => {
      if (item.type === 'ai' && i > 0) {
        timers.push(setTimeout(() => setIsTyping(true), item.delay - 800))
      }
      timers.push(setTimeout(() => {
        setIsTyping(false)
        setVisibleItems(i + 1)
      }, item.delay))
    })

    // PR sections
    prSections.forEach((_, i) => {
      timers.push(setTimeout(() => setVisiblePR(i + 1), prSections[i].delay))
    })

    // Pipeline stages
    stageTiming.forEach((t, i) => {
      timers.push(setTimeout(() => setActiveStage(i), t))
    })

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [visibleItems, isTyping])

  // Auto-scroll PR
  useEffect(() => {
    if (prScrollRef.current) {
      prScrollRef.current.scrollTop = prScrollRef.current.scrollHeight
    }
  }, [visiblePR])

  return (
    <section className="py-20 bg-white relative">
      <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }} className="w-full max-w-6xl mx-auto px-6">

        {/* ── Pipeline stages ── */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-center gap-0 min-w-[700px] mx-auto">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  animate={{
                    color: i <= activeStage ? '#059669' : '#94A3B8',
                    fontWeight: i <= activeStage ? 600 : 400,
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] whitespace-nowrap px-1.5"
                >
                  {i <= activeStage && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-block mr-1"
                    >
                      ✓
                    </motion.span>
                  )}
                  {stage}
                </motion.div>
                {i < stages.length - 1 && (
                  <span className="text-text-light text-[10px] mx-0.5">·</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-panel demo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-border bg-white shadow-xl shadow-primary/5 overflow-hidden">

          {/* LEFT: Claude Code */}
          <div className="border-b lg:border-b-0 lg:border-r border-border flex flex-col">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-light bg-[#2D2B2B] shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-3 ml-3">
                <span className="text-[11px] text-white/40">Chat</span>
                <span className="text-[11px] text-white/40">Cowork</span>
                <span className="text-[11px] text-white/90 bg-white/10 px-2 py-0.5 rounded">Code</span>
              </div>
              <span className="text-[10px] text-white/30 ml-auto font-mono">Opus 4.6 1M</span>
            </div>

            {/* Scrollable chat area */}
            <div ref={chatScrollRef} className="p-4 space-y-3 h-[420px] overflow-y-auto text-left bg-[#FAFAF8]">
              <AnimatePresence>
                {chatItems.slice(0, visibleItems).map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    {item.type === 'user' && (
                      <div className="bg-[#F0EDE8] rounded-lg px-3 py-2.5 text-[12px] text-text leading-relaxed border border-[#E5E0D8]">
                        {item.text}
                      </div>
                    )}
                    {item.type === 'ai' && (
                      <div className="text-[12px] text-text leading-relaxed py-1">
                        {item.text}
                      </div>
                    )}
                    {item.type === 'collapse' && (
                      <CollapsedSection label={item.label} />
                    )}
                    {item.type === 'table' && (
                      <div className="py-1">
                        <p className="text-[11px] text-text font-semibold mb-2">5 phases, 16 work items:</p>
                        <PlanTable />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex gap-1 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-light animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border-light px-4 py-2 bg-[#FAFAF8] flex items-center gap-2 shrink-0">
              <div className="flex-1 px-3 py-1.5 rounded-lg border border-border-light bg-white text-[11px] text-text-light">Reply...</div>
              <span className="text-[9px] text-text-light font-mono">Plan</span>
            </div>
          </div>

          {/* RIGHT: GitHub PR */}
          <div className="bg-white flex flex-col">
            {/* GitHub header bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-light bg-[#F6F8FA] shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#24292F" className="shrink-0">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span className="text-[11px] text-[#57606A] font-mono">noahatcheckpoint</span>
              <span className="text-[11px] text-[#57606A]">/</span>
              <span className="text-[11px] text-[#24292F] font-semibold font-mono">sfdc-sandbox</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-border-light text-text-light ml-auto">Pull requests</span>
            </div>

            {/* Scrollable PR content */}
            <div ref={prScrollRef} className="p-4 h-[420px] overflow-y-auto text-left">
              <AnimatePresence>
                {visiblePR >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-[14px] font-semibold text-[#24292F] leading-snug mb-2">
                      feat: Upsell delta calculation — auto-compute A minus B for UPS/DWN opps
                      <span className="text-[#57606A] font-normal"> #35</span>
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A5BBF] text-white font-medium">Merged</span>
                      <span className="text-[10px] text-[#57606A]">2 commits into <CodeBadge>main</CodeBadge> from <CodeBadge>feature/upsell-delta-calculation</CodeBadge></span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#57606A] mb-4 border-b border-border-light pb-3">
                      <span>Conversation 0</span>
                      <span>Commits 2</span>
                      <span>Checks 0</span>
                      <span>Files changed 30</span>
                      <span className="ml-auto font-mono text-[9px]"><span className="text-green-600">+842</span> <span className="text-red-500">-1</span></span>
                    </div>
                  </motion.div>
                )}

                {visiblePR >= 2 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Change Summary</h4>
                    <p className="text-[11px] text-[#57606A] leading-relaxed mb-2">
                      Adds automatic delta calculation for upsell/downsell opportunities. When a ramp is linked to a UPS/DWN opp, the service compares CB Products (before state) against ramp line items (after state) and creates Upsell_Delta_Line_Item__c records showing per-product before/after/delta breakdown.
                    </p>
                  </motion.div>
                )}

                {visiblePR >= 3 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Components</h4>
                    <ul className="text-[10px] text-[#57606A] space-y-1 list-disc list-inside">
                      <li>New custom object: Upsell_Delta_Line_Item__c (20 fields)</li>
                      <li>New field: Opportunity.Upsell_Delta_Amount__c</li>
                      <li>New Apex class: UpsellDeltaCalculationService</li>
                      <li>New trigger: CbRampTrigger (after insert/update on CB_Ramp__c)</li>
                      <li>New test class: UpsellDeltaCalculationServiceTest</li>
                      <li>New PermissionSet: Upsell_Delta_Access</li>
                    </ul>
                  </motion.div>
                )}

                {visiblePR >= 4 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Risk Classification</h4>
                    <p className="text-[11px] text-[#57606A]">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber mr-1.5 align-middle" />
                      <strong>Tier 2 — Process automation / Routing</strong>
                    </p>
                    <p className="text-[10px] text-[#57606A] mt-1">Approval required: Admin + stakeholder</p>
                  </motion.div>
                )}

                {visiblePR >= 5 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Impacted Components</h4>
                    <p className="text-[10px] text-[#57606A]">
                      <strong>Objects:</strong> Opportunity, CB_Ramp__c, CB_Ramp_Line_Item__c, Upsell_Delta_Line_Item__c
                    </p>
                    <p className="text-[10px] text-[#57606A] mt-1"><strong>Teams:</strong> Sales, Revenue Operations</p>
                  </motion.div>
                )}

                {visiblePR >= 6 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Test Plan</h4>
                    <ol className="text-[10px] text-[#57606A] space-y-0.5 list-decimal list-inside">
                      <li>Deploy to sandbox via PR validation workflow</li>
                      <li>Create a UPS opportunity with CB Products</li>
                      <li>Link a ramp with items_to_add and items_to_update</li>
                      <li>Verify Upsell_Delta_Line_Item__c records created</li>
                      <li>Verify Opportunity.Upsell_Delta_Amount__c equals sum</li>
                      <li>Modify ramp — verify delta recalculates</li>
                      <li>Run UpsellDeltaCalculationServiceTest</li>
                    </ol>
                  </motion.div>
                )}

                {visiblePR >= 7 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                    <h4 className="text-[12px] font-semibold text-[#24292F] mb-1.5">Rollback Notes</h4>
                    <p className="text-[10px] text-[#57606A] leading-relaxed">
                      Delete the Upsell_Delta_Line_Item__c custom object and Upsell_Delta_Amount__c field. Remove CbRampTrigger. Delete UpsellDeltaCalculationService and test class. Delete Upsell_Delta_Access PermissionSet.
                    </p>
                  </motion.div>
                )}

                {visiblePR >= 8 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="border-t border-border-light pt-3 mt-2">
                      <p className="text-[10px] text-[#57606A] italic">Generated by FlowSprite via Claude Code</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PR sidebar hint */}
            <div className="border-t border-border-light px-4 py-2 bg-[#F6F8FA] flex items-center gap-3 text-[9px] text-[#57606A] shrink-0">
              <span>Labels: <span className="px-1.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1A5BBF] font-medium">mixed</span> <span className="px-1.5 py-0.5 rounded-full bg-amber/15 text-amber-dark font-medium">risk-tier-2</span></span>
            </div>
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }} className="text-sm text-text-muted mt-6 text-center">
          You describe the business outcome. FlowSprite figures out the implementation.
        </motion.p>
      </motion.div>
    </section>
  )
}
