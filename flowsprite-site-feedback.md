# FlowSprite Website — Feedback & Fix Brief

**URL:** https://tomi-checkpoint.github.io/flowsprite-site/
**Date:** 2026-04-05
**Priority:** High — all items below must be addressed before next review.

---

## 1. HERO SECTION — Background Needs Real Animation Reference

**Problem:** The hero background is too static and generic. It does not reflect the actual animation styles from the source/reference material that was provided.

**Fix:**
- Go back to every reference site/app that was shared as inspiration.
- Study the actual animations used on those sites — motion patterns, easing, particle effects, gradient transitions, whatever they're doing.
- Rebuild the hero background to incorporate those animation styles directly. Do not improvise or use generic effects.
- The result should feel dynamic and high-energy, not decorative wallpaper.

**Acceptance Criteria:** The hero background animation must be clearly traceable to at least one animation technique from the provided reference material.

---

## 2. DEPLOY PREVIEW SECTION — Complete Redesign Required

**Problem:** The current deploy preview section doesn't make sense. It's unclear what the product actually does.

**Fix — Two-panel layout:**

### Left Panel: AI Chat Interface
- Should resemble a Claude Code / AI terminal-style chat interface.
- Show a realistic chat thread where a user is typing a prompt to the AI (e.g., requesting a Flow to be built or modified).
- Include a typing indicator / animation to simulate live interaction.

### Right Panel: GitHub-style Deploy View
- Should look like a GitHub pull request page — with PR metadata, commit info, file diffs, status checks, and a deploy action.
- Show the AI's work being committed and deployed — e.g., a Flow being built, then a deployment status going from "pending" to "deployed."
- This should be a visual narrative: the user asks on the left, the system builds and ships on the right.

**Acceptance Criteria:** A viewer should immediately understand the product loop: "I talk to AI → it builds my Flow → it deploys via GitHub." Both panels should be animated/interactive enough to convey this without reading any copy.

---

## 3. SECURITY METADATA SECTION — Font Size Too Small

**Problem:** The metadata line about data never leaving infrastructure, plus the trust signals (GitHub repo encryption, in-transit encryption, full audit trail) are in far too small a font. They're barely legible and carry no visual weight.

**Fix:**
- Significantly increase the font size of the trust/security metadata.
- These are key buying signals for enterprise — they need to hit hard visually.
- The items "GitHub repo encryption," "in transit," and "full audit trail" should be presented as prominent, standalone trust badges or large-format callouts — not fine print.

**Acceptance Criteria:** A user scanning the page at normal speed should be able to read and absorb the security claims without squinting or slowing down.

---

## 4. MIDDLE SECTIONS — Visual Flow & Animation Polish

**Problem:** The sections between the deploy preview and the bottom CTA are structurally fine in terms of content, but they lack visual polish and animation continuity.

**Fix:**
- Review each mid-page section for scroll-triggered animation, transitions, and visual rhythm.
- Ensure consistent motion language across sections (don't mix animation styles randomly).
- Each section should feel like it belongs to the same design system and page flow.

**Acceptance Criteria:** Scrolling through the mid-page sections should feel smooth and intentional, not like isolated blocks stacked on top of each other.

---

## 5. "FROM I NEED A DEV TO I JUST SHIPPED IT" SECTION — Numbers Need Impact

**Problem:** The stat numbers in this section are too small and flat. They don't pop.

**Fix:**
- Make the numbers significantly larger — they should be the dominant visual element in that section.
- Add count-up animation or other scroll-triggered entrance animation so they feel alive.
- Give them typographic weight: bigger font size, bolder weight, maybe a subtle color accent or glow.

**Acceptance Criteria:** The numbers should be the first thing your eye lands on when this section enters the viewport.

---

## 6. "MOST PARANOID DEVELOPMENT SYSTEM FOR SALESFORCE" SECTION — Needs 6 Bullets

**Problem:** The section doesn't have enough content points. It currently has fewer than six distinct items.

**Fix:**
- Expand this section to include exactly six bullet points / feature callouts.
- Each bullet should represent a distinct security or governance capability (e.g., encryption at rest, encryption in transit, audit logging, role-based access, sandbox isolation, SOC 2 alignment — or whatever is accurate to the product).
- Maintain the bold, confident tone. This section's headline is great — back it up with substance.

**Acceptance Criteria:** Exactly six distinct, substantive bullet points in this section.

---

## Summary of Changes

| # | Section | Core Issue | Effort |
|---|---------|-----------|--------|
| 1 | Hero Background | Not using reference animations | Medium |
| 2 | Deploy Preview | Needs two-panel AI chat + GitHub PR redesign | High |
| 3 | Security Metadata | Font too small, needs prominence | Low |
| 4 | Mid-page Sections | Animation and visual flow polish | Medium |
| 5 | Stats / Numbers | Too small, need pop and animation | Low–Medium |
| 6 | Paranoid Security | Needs exactly 6 bullets | Low |

---

*All other sections not mentioned above are approved as-is for now.*
