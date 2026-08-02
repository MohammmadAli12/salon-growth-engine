## Salunnn — AI-Powered Salon Growth Platform

Built strictly phase-by-phase. Each phase stops for your approval before the next begins. No section already approved gets touched again unless you ask.

### Locked decisions

**Colors (only these)**
- Background `#FBFAF7` · Cards `#FFFFFF` · Ink `#0E1116` · Slate `#5B616B`
- Accents: Indigo `#4F46E5`, Violet `#8B5CF6`, Magenta `#EC4899`, Coral `#F97066`, Amber `#F59E0B`, Lime `#84CC16`, Teal `#14B8A6`, Sky `#0EA5E9`
- Gradients: hero Indigo→Violet→Magenta · buttons Indigo→Violet · card hover White→`#EEF2FF` · marketplace Sky→Teal · success Lime→Teal

**Typography** — Sora (headings, 600/700/800) + Inter (body, buttons, numbers), exactly as in your design-system mockup. Loaded from Google Fonts.

**Scale** — 8pt grid: outer margin 20px, section gap 64px (96–128px desktop), card gap 16px, card padding 20px, button/input height 56px. Radius: buttons 18px, cards 24px, images 28px, floating cards 32px. Shadow `0 8px 30px rgba(15,23,42,.08)`.

**Craft rules** — mobile-first at 390px, Lucide icons only (no emoji), motion 200–350ms, restrained. Feel: Stripe / Linear / Google Material. No neon, no AI-glow.

### Phase 6 — Foundation (this build)

1. Design tokens in `src/styles.css`: every color above, radius scale, shadow scale, gradient tokens, font tokens.
2. Google Fonts `<link>` for Sora + Inter in `src/routes/__root.tsx`.
3. Route stubs so all navigation works end-to-end, each with its own SEO `head()` (unique title, description, og/twitter tags):
   `/` · `/case-studies` · `/marketplace` · `/community` · `/learning` · `/hiring` · `/newsroom` · `/salunnn` · `/about` · `/pricing` · `/contact` · `/faqs` · `/careers` · `/privacy` · `/terms`
   Stubs render the shared shell plus a page title — no invented content.

### Phase 7 — Navbar only
Sticky top bar, Salunnn wordmark with gradient spark, 8 desktop links + "More" dropdown, gradient "Book Consultation" CTA, full-screen mobile drawer. Nothing else built.

**Then, one at a time, each awaiting approval:** Hero → Statistics → Services (bento) → Why Salunnn (process timeline) → Marketplace Preview → Case Study (Xing Salon) → Community → Learning → CTA band → Footer. Inner pages after Home is signed off.

### Technical notes

- Stack is fixed: TanStack Start + React 19 + Tailwind v4 + TypeScript. Routing is file-based under `src/routes/` — the `src/pages` + React Router folder layout from your Phase-6 doc doesn't apply here; equivalent structure is `src/components/{ui,layout,sections,cards}` + `src/routes/`.
- Tailwind v4 is CSS-first: tokens live in `src/styles.css` `@theme`, there's no `tailwind.config.js`.
- Animation: Motion for React (Framer Motion successor), already the standard here. GSAP/Lenis only if a section genuinely needs it.
- All content is static/local for now. No backend, database, or auth in this pass — say the word when you want consultation forms actually submitting and I'll enable Lovable Cloud.
