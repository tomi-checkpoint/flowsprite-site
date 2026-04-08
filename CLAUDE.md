# FlowSprite Sales Page — Development Guide

## What This Is

Marketing/sales landing page for **FlowSprite** (flowsprite.ai) — a Git-powered Salesforce DevOps SaaS platform. Previously codenamed "SFDC Manager" / "GitForce AI". The actual product codebase is at `/Users/macmini/files/sfdc-manager/`.

**Live site**: https://tomi-checkpoint.github.io/flowsprite-site/
**Repo**: https://github.com/tomi-checkpoint/flowsprite-site
**Deploys**: Automatically via GitHub Actions → GitHub Pages (free hosting)

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (using `@tailwindcss/vite` plugin, NOT postcss)
- **Framer Motion** for animations
- **Lucide React** for icons
- **Bitcount** font (Google Fonts, self-hosted woff in `/public/fonts/`)
- **Inter** font (loaded via Google Fonts CDN in `index.html`)

## Project Structure

```
flowsprite-site/
├── .github/workflows/deploy.yml   # GitHub Pages deploy action
├── public/
│   ├── fonts/
│   │   ├── bitcount.woff           # Logo font (400 weight)
│   │   └── bitcount-bold.woff      # Logo font (700 weight)
│   ├── logos/                      # Brand logos for splash intro
│   │   ├── ChatGPT-Logo.png
│   │   ├── Claude_AI_symbol.png
│   │   ├── GitHub_Invertocat_Black.png
│   │   └── Salesforce.com_logo.svg.png
│   ├── MetadataFlow.webm           # Manim explainer animation (VP9, 535KB)
│   └── favicon.svg
├── src/
│   ├── App.tsx                     # Root — Splash + all sections
│   ├── main.tsx                    # ReactDOM entry
│   ├── index.css                   # Tailwind imports + @font-face + custom theme
│   ├── hooks/
│   │   └── useAnimations.ts        # Shared animation variants (fadeUp, stagger, etc.)
│   └── components/
│       ├── Splash.tsx              # Full-screen intro: floating logos → fade to hero
│       ├── Navbar.tsx              # Sticky nav with Bitcount wordmark + scroll accordion
│       ├── Hero.tsx                # Main hero: headline + floating logos + ProductDemo
│       ├── ProductDemo.tsx         # Two-panel: AI chat (left) + GitHub PR (right)
│       ├── TrustBar.tsx            # 3 trust badges (repo, encryption, audit)
│       ├── Problem.tsx             # Stats section ($156K, 73%, 4+ hrs)
│       ├── TheShift.tsx            # "What if you could do it all?" with backspace animation
│       ├── HowItWorks.tsx          # 3-step cards: Connect → Sync → Ship
│       ├── Safety.tsx              # Scroll-driven sticky stacking cards (6 cards)
│       ├── Comparison.tsx          # Before/after table (7 rows)
│       ├── Features.tsx            # 6-card grid (metadata types, compare, drift, etc.)
│       ├── Lifecycle.tsx           # Dev → QA → UAT → Staging → Production pipeline
│       ├── Pricing.tsx             # 4 tiers: Free / $49 / $199 / Custom
│       ├── FinalCTA.tsx            # "Your admin is more capable than you think"
│       ├── Footer.tsx              # Links + copyright
│       └── AnimatedCounter.tsx     # Count-up number animation
├── vite.config.ts                  # base: '/flowsprite-site/' for GitHub Pages
├── index.html
└── package.json
```

## Design System

### Color Palette (defined in `src/index.css` via `@theme`)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#4F46E5` | CTAs, links, main accent (indigo) |
| `primary-light` | `#6366F1` | Lighter variant |
| `primary-dark` | `#4338CA` | Hover states |
| `violet` | `#7C3AED` | Secondary accent, GitHub-related |
| `violet-light` | `#8B5CF6` | Lighter variant |
| `amber` | `#F59E0B` | Warnings, highlights |
| `amber-dark` | `#D97706` | Hover states |
| `success` | `#10B981` | Deploy success, sandbox |
| `danger` | `#EF4444` | Errors, production boundary |
| `surface` | `#FAFBFE` | Main background (light blue-white) |
| `surface-warm` | `#F8F7F4` | Alternating section bg (warm white) |
| `surface-alt` | `#F1F0FB` | Hero bg tint (lavender) |
| `text` | `#1E293B` | Primary text (dark slate) |
| `text-muted` | `#64748B` | Secondary text |
| `text-light` | `#94A3B8` | Tertiary text |
| `border` | `#E2E8F0` | Default borders |
| `border-light` | `#F1F5F9` | Subtle borders |

### Typography

- **Headlines**: Inter, font-black (900 weight)
- **Body**: Inter, regular/medium
- **Logo**: Bitcount (pixel font, self-hosted)
- **Code/mono**: JetBrains Mono (Google Fonts CDN)

### Design Theme

**Light and airy** — inspired by Opennote.com. White and warm-white backgrounds, soft shadows, subtle colored borders. NOT dark theme.

## Key Animations & Interactions

### 1. Splash Intro (`Splash.tsx`)
- Full-screen overlay with tan background (`#F5F0EB`)
- 4 logos (Salesforce, GitHub, Claude, ChatGPT) fly in from corners at angles
- Spring physics on entry (stiffness 80, damping 14)
- Logos float gently (infinite bob animation)
- After 2.2s: clean opacity fade reveals hero underneath
- Component unmounts after 3s

### 2. Logo Wordmark (`Navbar.tsx`)
- "FlowSprite" in Bitcount font (30px)
- **Page load**: "Flow" appears, then "Sprite" fades in with slight delay (0.08s)
- **Hover**: 5 copies of the full word duplicate below, tightly packed (`leading-[1]`), fading opacity (0.5 → 0.06). "Flow" and "Sprite" are separate columns — Sprite is offset down by half a line height (15px). Sprite copies enter 80ms after Flow copies.
- **Scroll**: Word condenses from "FlowSprite" → "Fs" over 400px of scroll. Middle chars "lowSprit" collapse, keeping bookend F and s.
- All duplicates are same color (#1E293B), no rainbow colors.

### 3. Backspace Effect (`TheShift.tsx`)
- Starts as "What if your admin could do it all?"
- Uses native `IntersectionObserver` with `rootMargin: '0px 0px -30% 0px'`
- When element is 30% above viewport bottom: 800ms pause → blinking cursor appears → "r admin" deletes right-to-left at 120ms/char → leaves "What if you could do it all?"
- Cursor blinks for 1.5s after deletion, then disappears

### 4. Scroll-Driven Card Stack (`Safety.tsx`)
- Section height: `100 + cards.length * 80`vh (gives scroll room)
- `position: sticky` container pins to viewport center
- 6 colored cards stack on top of each other as user scrolls
- Each new card slides up from 250px below with spring animation
- Older cards shift up 8px (edges peek out) and shrink 2% per layer
- Each card has its own tilt rotation (-4° to +4°)
- Card colors: indigo, pink, amber, green, red, blue (matching their content)

### 5. Animated Counters (`Problem.tsx` + `AnimatedCounter.tsx`)
- Stats ($156K, 73%, 4+ hrs) count up from 0 when scrolled into view
- Uses `useScrollAnimation` hook (Framer Motion `useInView`, once: true)
- Font size: 7xl/8xl for maximum visual impact

### 6. Other Animations
- All sections use consistent `fadeUp` / `staggerContainer` / `staggerItem` variants from `useAnimations.ts`
- Spring physics: stiffness 100, damping 15
- Smooth easing: `[0.25, 0.1, 0.25, 1]`
- ProductDemo: auto-playing chat + PR sequence with typing indicators

## Competitor

**HighRev.ai** (https://www.highrev.ai/) — "Agentic Implementation Platform for Salesforce"

FlowSprite differentiates by emphasizing:
1. **Safety** — one-way data flow, PR-based, production never auto-touched
2. **Ownership** — your private GitHub repo, your data stays with you forever
3. **Simplicity** — one admin replaces a 5-person dev team, 2-min setup
4. **Transparency** — public pricing (no "Book a Demo" wall)

## Manim Explainer Video

Source: `/tmp/flowsprite_explainer.py` (Manim Community v0.19.0)
Output: `/public/MetadataFlow.webm` (VP9, 535KB, 23s, 720p)
Font: Avenir Next (system font)
Manim binary: `/Users/macmini/Library/Python/3.9/bin/manim` (needs PATH export)
Render: `manim render -qm flowsprite_explainer.py MetadataFlow`

## Build & Deploy

```bash
npm install          # Install dependencies
npm run dev          # Local dev server (port 5173)
npm run build        # TypeScript check + Vite build → dist/
npm run preview      # Preview production build locally
git push             # Auto-deploys to GitHub Pages via Actions
```

**IMPORTANT**: `vite.config.ts` has `base: '/flowsprite-site/'` for GitHub Pages subpath. If moving to a custom domain (flowsprite.ai), change this to `base: '/'`.

## Reference Sites (Design Inspiration)

- **Ditto** (dittowords.com) — rainbow letter hover on logo, color-blocked sections
- **Opennote** (opennote.com) — light/airy palette, clean card design, tab feature showcase
- **Realfood.gov** — floating food images entrance animation, animated stat counters, scroll-driven sections

## Outstanding Work / Next Steps

1. Embed the Manim explainer video somewhere on the page
2. The gstack design review framework was being explored for design improvements (paused)
3. Custom domain setup (flowsprite.ai) — change Vite base path + DNS
4. Add real product screenshots/mockups to replace placeholder illustrations
5. Mobile responsiveness polish (current design is desktop-first)
6. Add actual signup/waitlist form connected to a backend
7. SEO: meta tags, og:image, structured data
8. Performance: lazy-load below-fold sections, optimize images

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
