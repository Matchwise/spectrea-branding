# Spectrea Brand Guide

> The complete brand system for Spectrea — a composable knowledge platform that turns scattered information into compounding intelligence.

![Spectrea gradient lockup](/brand-assets/logo-lockup-gradient.svg)

**Tagline:** We connect the dots.
**Category:** Composable knowledge platform.
**Pronunciation:** /spek-TREE-uh/ (from Latin *spectra* — the full range or spectrum).

---

## 1. Brand Foundation

### Why we exist
We live in an information age that's paradoxically making us less informed — more data, less truth; more tools, fewer insights; more noise, less action. Spectrea exists to close the gap between having information, truly understanding it, and being able to build on it.

### Mission
To make knowledge trustworthy, connected, and actionable — empowering people to build on what came before, so that every insight becomes the foundation for what comes next.

### Vision
A world where anyone can see the full spectrum of what's known, trust what they see, and build on it — where understanding compounds across every boundary that used to contain it.

### Positioning
- **For:** Anyone who works with knowledge.
- **Category:** Composable knowledge platform.
- **Promise:** Turns scattered information into compounding intelligence.
- **Tactical:** For anyone who works with knowledge, Spectrea is the composable knowledge platform that turns scattered information into compounding intelligence — unlike fragmented point solutions that silo your knowledge and hide their reasoning.

### Messaging hierarchy
Primary theme is **Connection** — the headline "We connect the dots" and the idea that scattered knowledge becomes a single living graph. Three supporting themes:
1. **Trustworthy Intelligence** — "Intelligence you can trust." Every claim has a source; every action is auditable.
2. **Compounding Intelligence** — "It gets smarter with every interaction." Your second year is incomparably better than your first.
3. **Composability** — "Build exactly what you need." Simple, combinable parts assembled into any solution.

### Archetype
**The Magician.** Transformation — making the impossible possible. Turns complexity into clarity. Reveals hidden patterns. The world is more intelligible because Spectrea exists.

### Personality (four traits with guardrails)
- **Warm** — respects the person behind every interaction. *Guardrail: not soft — trust users to be capable.*
- **Perceptive** — sees patterns others miss; surfaces connections, then steps back. *Guardrail: not presumptuous — suggests, never dictates.*
- **Grounded** — powerful but never pretentious; substance over style. *Guardrail: not boring — substance needs spark.*
- **Adaptive** — meets you where you are; same system, different depths. *Guardrail: not shapeless — Spectrea has a point of view.*

### Emotional core
**Empowerment + Clarity.** Feeling more capable because Spectrea helped you see clearly and choose wisely. Like putting on glasses — everything that was blurry snaps into focus.

### Visual metaphor
**Prism + Living Network.** The prism is Spectrea's origin (raw information enters, organized insight exits — the "reveal" moment). The network is its promise — a web of connections that grows denser and more intelligent over time.

### Aesthetic direction
**Warm + Intelligent.** Like a brilliant mentor — approachable yet deep. Rich colours, inviting spacing, feels human. References: Notion, Stripe. Tradeoff: **power over polish** — capability is sacred; elegance is valued but never at the cost of depth.

### Values
1. **Human-First** — Spectrea serves people, not the other way around. AI assists understanding; it never replaces judgment.
2. **Trustworthy Intelligence** — every claim attributed, every action auditable, every connection traceable.
3. **Compounding Intelligence** — the more you use it, the more it gives back.
4. **Composable by Nature** — build solutions that fit your world; don't reshape your world to fit a tool.
5. **Accessible Power** — deep capability that meets you where you are. Floor high, ceiling infinite.

### Anti-values (what Spectrea never does)
- Never replaces human judgment.
- Never leaves anyone behind.
- Never complex or bloated — if it needs a consultant, we failed.
- Never a black box — you can always ask "why?" and get an answer.

---

## 2. Voice & Tone

### Voice formula
Spectrea sounds like a brilliant mentor: confident without being arrogant, specific without being jargon-heavy, warm without being cloying. The voice stays constant; the tone adapts to context.

### Tone spectrum
| Context | Tone | Example |
|---|---|---|
| Marketing copy | Evocative, confident | "Every connection you never noticed. Surfaced." |
| Product UI | Clear, concise, warm | "3 new connections discovered — review them?" |
| Error messages | Specific, helpful, never blaming | "This file type isn't supported yet. Try PDF, DOCX, or MD." |
| Onboarding | Encouraging, low-friction | "Start with one document. The rest will compound." |
| Technical docs | Precise, well-structured | "The graph grows O(n·log n) with document count when using the default indexer." |

### Vocabulary
**Words we use:** connect, surface, compound, graph, claim, insight, understanding, verify, trace, build-on, meets-you-where, spectrum, prism, clarity.

**Words we never use:** disrupt, synergy, leverage (as verb), seamless, revolutionize, game-changer, unparalleled, cutting-edge, AI-powered (as lead adjective), solution (generic).

---

## 3. Naming

- **Spelling:** Spectrea (capital S, no space).
- **Pronunciation:** /spek-TREE-uh/ — emphasis on the second syllable.
- **Etymology:** Latin *spectra* — the full range or spectrum. The name evokes the complete range of hidden connections the platform reveals.
- **Product names:** lowercase after the master brand. E.g., "Spectrea graph", "Spectrea claims", "Spectrea composer". Master brand always capitalised.
- **Never:** "SpectreAI", "Spectrea AI" (lead), "spectra" (missing e).

---

## 4. Logo System

![Primary Spectrea mark — Cool Duet stroke over ten grey dots](/brand-assets/logo-mark-cool.svg)

### Anatomy
The logo has three parts:
1. **Mark** — the "connecting the dots" S-curve. 10 dots along a cubic Bézier path, with the final three visually trailing. Spectrum-gradient stroke connecting the first seven. The mark also reads as the leading `S` glyph in the lockup.
2. **Wordmark** — Albert Sans Semibold 600, lowercase, 0.02em letter-spacing. Renders as `pectrea`, always paired with the S mark. Never rendered alone in production.
3. **Lockup** — S mark + lowercase wordmark.

### Construction
- **Dots:** 10 dots, radius 3.5. Grey (`#A3A3A3`) in the primary treatment.
- **Stroke:** width 8, round linecap. Cool Duet (Cobalt `#4271DF` → Teal `#00B6A0`) in the static mark and in the gradient lockup's mark.
- **Trailing dots:** the last 3 dots are left visually unconnected — the "about to connect" moment.
- **Container:** 64×64 construction viewBox. Circle container when needed at small sizes; never a squircle.

### The two-forms rule (lockup)
The lockup has **exactly two forms** — no third:
1. **Gradient lockup** — `LogotypeGradient` component. S mark carries the two-tone Cool Duet (Cobalt `#4271DF` → Teal `#00B6A0`) on the stroke and connected dots; trailing dots stay grey. The wordmark is monotone — Ink on light, White on dark — following the `colorMode` prop.
2. **Mono lockup** — `Logotype` component. Everything renders in a single `ink` / `white` / `grey` colour.

![Gradient lockup — LogotypeGradient](/brand-assets/logo-lockup-gradient.svg)
![Ink mono lockup](/brand-assets/logo-lockup-ink.svg)
![White mono lockup on ink](/brand-assets/logo-lockup-white.svg)

The gradient lives in the mark only. No gradient-filled wordmark, no full-spectrum lockup — the wordmark is always solid so it stays legible at every size. Duets (Balanced / Warm) belong to the static mark only; they are not lockup options.

### Mark colour modes
- `'color'` — full spectrum (Cobalt → Teal → Amber). Default for `AnimatedLogo`. Used for hero moments.
- `'cool'` — Cool Duet (Cobalt → Teal). Default for `StaticLogo`. Primary static mark for everyday use.
- `'balanced'` — Balanced Duet (Teal → `#6FB884` at 65% → Amber). For product/ecosystem moments.
- `'warm'` — Warm Duet (Amber → Rose). For marketing attention.
- `'grey'` — Pewter. Watermarks only.
- `'white'` — Canvas `#FDFDFB`. Dark backgrounds.
- `'ink'` — Ink `#18181C`. Formal, co-branding, single-colour print.

### Dot-colour rule
- **Mono mode** (`ink`/`white`/`grey`) → dots match the mark — not grey.
- **Gradient/duet mode** → dots are grey (`#A3A3A3`). This is the primary brand treatment.
- **Exception:** the intentional "Ink + Grey Dots" variant labelled *Quiet authority* — connection formed, spectrum dormant.

### Variants (11 approved)
**On light backgrounds:**
1. Primary mark (Cool Duet, grey dots)
2. Primary lockup
3. Ink mark
4. Ink lockup
5. Grey mark (watermark only)

**On dark backgrounds:**
6. Primary on dark (Cool Duet + grey dots)
7. Primary lockup on dark
8. White mark
9. White lockup

**Contained (below 48px):**
10. Ink circle (white mark on ink fill)
11. White circle (ink mark on white fill)

### Lockup arrangements (three)
1. **Gradient logotype** — `LogotypeGradient`. Preferred for brand/marketing.
2. **Horizontal with descriptor** — `StaticLogo` + lowercase `pectrea` wordmark + descriptor below. For nav, product headers, sub-brands. Descriptor styling: `gap-3` between mark and wordmark column, `text-xs`, uppercase, tracking-widest, Pewter (`#97979E`).
3. **Stacked** — mark above wordmark. For title slides, centered compositions. Wordmark width ≤ mark width.

### When to use which variant
| Context | Variant | Why |
|---|---|---|
| Website header (light) | Logotype | Preferred horizontal treatment |
| Website header (dark) | Logotype (white) | White logotype on dark |
| Product sidebar / nav | #1 + descriptor | Primary mark with descriptor |
| Favicon (16–32px) | #10 | Ink circle — high contrast small |
| App icon | #10 | Bold, distinctive in app grids |
| Social avatar | #10 | Circular crop on most platforms |
| Social cover image | #2 or #7 | Full lockup, match cover background |
| Marketing hero | Logotype or stacked | Logotype inline; stacked centered |
| Co-branding | #3 or #4 | Ink prevents colour competition |
| Legal / formal | #4 | Ink lockup — authoritative, max contrast |
| Watermark | #5 at low opacity | Grey mark, subtle |
| Emboss / foil stamp | #3 | Single-tone production |

### Clear space
Minimum clear space around the lockup = 0.5× the mark height. No other graphic element (text, border, background image) enters the clear-space box.

### Misuse
Never: stretch or distort · change colours (spectrum gradient is Cobalt → Teal → Amber; never substitute) · rotate · add drop shadows, glows, bevels · use only the stroke path without dots · use on low-contrast backgrounds (< 2.5:1) · change dot count (always exactly 10) · swap mark and wordmark positions · violate clear space · use a squircle container (always round) · colour the dots in the primary treatment · substitute the wordmark typeface.

---

## 5. Colour System

![Spectrum accents — Cobalt, Teal, Amber, Rose](/brand-assets/swatches-spectrum.svg)

![Warm Blend neutrals — Canvas, Cloud, Pewter, Graphite, Ink](/brand-assets/swatches-neutrals.svg)

![Bridge tier — tinted washes for semantic surfaces](/brand-assets/swatches-bridge.svg)

### Warm Blend neutrals (applied system-wide)
A subtle warm tint layered under the spectrum — closes the gap between cold Tailwind grays and the warm accents. Luminance shift is <2% but cohesive as a system.

| Role | Name | Hex | CSS var |
|---|---|---|---|
| Background | Canvas | `#FDFDFB` | `--color-canvas` |
| Elevated surface | Cloud | `#F4F4F1` | `--color-cloud` |
| Muted / secondary text | Pewter | `#97979E` | `--color-pewter` |
| Dark UI surface | Graphite | `#212226` | `--color-graphite` |
| Primary text / dark surface | Ink | `#18181C` | `--color-ink` |

### Spectrum accents (the four spectrum colours)
| Role | Name | Hex | Meaning |
|---|---|---|---|
| Hero / primary | Cobalt | `#4271DF` | Intelligence, trust, focus. One primary action per section. |
| Positive / growth | Teal | `#00B6A0` | Success, growth, connected status. |
| Attention | Amber | `#E19000` | Warnings, pending, confidence. |
| Urgency / action | Rose | `#F24260` | Errors, destructive actions, critical alerts. |

Hover/active states for each accent:
- Cobalt: base `#4271DF`, hover `#3A63C4`, active `#3255A7`.
- Teal: base `#00B6A0`, hover `#009E8A`, active `#008775`.
- Amber: base `#E19000`, hover `#C58200`, active `#A86E00`.
- Rose: base `#F24260`, hover `#D63B55`, active `#BA3249`.

### Bridge tier (tinted washes)
Tiered between the neutral canvas and the vivid accents — 5–10% saturation versions of each spectrum colour. Always carry semantic meaning; never decorative.

| Name | Hex | Paired accent | Use |
|---|---|---|---|
| Cobalt Wash | `#EDF0F8` | Cobalt | Info alert background, selected row |
| Teal Mist | `#E6F5F3` | Teal | Success toast, positive trend card |
| Amber Stone | `#F5F0E6` | Amber | Warning alert, highlighted callout |
| Rose Blush | `#FDF0F2` | Rose | Error message, destructive confirmation |

### Colour ratio (the 60/20/10/10 rule)
- **60%** Canvas (page background)
- **20%** Cloud (elevated surfaces: cards, sidebars, dropdowns)
- **10%** Ink + Pewter (text and UI)
- **10%** Spectrum accents (semantic moments only)

![Usage ratio bar — 60% Canvas, 20% Cloud, 10% text, 10% spectrum](/brand-assets/ratio-bar.svg)

### Tiered colour framework
Every colour in Spectrea lives in one of three tiers:

1. **Tier 1 — Responsive (Cobalt).** Action-oriented elements — things that trigger an operation. Temporary and reactive: present during hover, focus, press, then settles. Primary buttons, links, CTAs, input focus, hovered icons.
2. **Tier 2 — Structural (Ink).** Persistent state and navigation. Active nav item, selected tab, toggled-on icon, current breadcrumb. Ink keeps the canvas calm while Cobalt stays reserved for action.
3. **Tier 3 — Semantic (spectrum + Pewter).** The system communicating status. Info (Cobalt), success (Teal), warning (Amber), error (Rose). Never decorative — every appearance carries meaning.

---

## 6. Gradients

**Three gradients — don't conflate them.**

### Primary brand gradient (the default)
**Cobalt → Teal → Amber** at 135°, interpolated in **OKLCH** on modern browsers with a clean sRGB fallback. This is the everyday brand gradient — hero sections, accent bars, dividers, decorative strips, progress indicators.

![Brand gradient](/brand-assets/gradient-brand.svg)

#### Cross-browser CSS recipe
```css
.brand-gradient {
  background: linear-gradient(135deg, #4271DF, #00B6A0, #E19000);
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000);
  }
}
```

The `@supports` block is silently ignored by browsers that don't understand OKLCH (Chrome <111, Safari <16.2, Firefox <117) — they keep the sRGB base. Modern browsers apply the OKLCH override for a perceptually richer middle that avoids the muddy olive zone.

### Lockup mark gradient (inside `LogotypeGradient` only)
Two-tone Cool Duet — the same gradient as the primary static mark. The wordmark stays monotone (Ink / White); only the mark carries colour.
```
0% #4271DF  →  100% #00B6A0
```
Implemented in SVG (`<linearGradient>`). **Never used as a general-purpose decorative gradient.**

![Lockup mark gradient — Cool Duet](/brand-assets/gradient-lockup.svg)

### Full spectrum with Rose (sparingly)
`Cobalt → Teal → Amber → Rose` at 135°. Use only for peak brand expression — landing-page heroes, launch moments. Reserving it keeps its impact.

![Full spectrum with Rose](/brand-assets/gradient-full-rose.svg)

### Two-colour duets (adjacent pairs only)
Must use **adjacent** spectrum pairs. Skip pairs (Cobalt→Amber direct, Teal→Rose, Cobalt→Rose) break the continuous-spectrum metaphor and are off-brand.
- **Cool Duet** — Cobalt → Teal. Intelligence + growth. The resting-state duet. Used by the static S mark and data/technical contexts.
- **Balanced Duet** — Teal → `#6FB884` at 65% → Amber. *Must* include the `#6FB884` intermediate; without it, teal and amber desaturate into muddy olive. For product/ecosystem moments.
- **Warm Duet** — Amber → Rose. Energy + urgency. Marketing, launches, attention.

![Cool Duet](/brand-assets/gradient-cool-duet.svg)
![Balanced Duet — with the #6FB884 intermediate bridge](/brand-assets/gradient-balanced-duet.svg)
![Warm Duet](/brand-assets/gradient-warm-duet.svg)

### Gradient rules
- **Use for:** logo mark background, hero accent bars, marketing page headers, loading progress bars, slide deck title dividers, social media profile accents.
- **Never for:** buttons (use solid Cobalt), text colour, body backgrounds, borders, small icons or badges, repeated elements.

---

## 7. Typography

![Typography samples — Albert Sans headings, Lexend body, JetBrains Mono code](/brand-assets/type-samples.svg)

### Type system (three typefaces)
| Role | Family | Weights | Use |
|---|---|---|---|
| Headings | Albert Sans | 600 (Semibold), 700 (Bold — logo wordmark, hero only) | Page titles, section headings, card titles, stat values |
| Body | Lexend | 300, 400, 500 | Body text, descriptions, form labels, nav items |
| Code / metadata | JetBrains Mono | 400 | Inline code, data values, entity types, provenance |

### Type scale

![Type scale ladder — Display through Code](/brand-assets/type-scale.svg)

| Size | Value | Line height | Weight | Use |
|---|---|---|---|---|
| Display | 48 px | 1.1 | 600 | Hero headlines, landing-page titles |
| H1 | 36 px | 1.2 | 600 | Page titles |
| H2 | 30 px | 1.25 | 600 | Major section headings |
| H3 | 24 px | 1.3 | 600 | Sub-section headings, card titles |
| H4 | 20 px | 1.4 | 600 | Minor headings, dialog titles |
| H5 | 18 px | 1.4 | 600 | Sidebar section titles |
| Body LG | 18 px | 1.6 | 400 | Lead paragraphs |
| Body | 16 px | 1.6 | 400 | Default body text |
| Body SM | 14 px | 1.5 | 400 | Secondary text, table cells, form inputs |
| Caption | 12 px | 1.5 | 500 | Labels, timestamps, helper text |
| Overline | 12 px | 1.5 | 600 | Section labels (uppercase + 0.05em tracking) |

### Responsive scale
Desktop (1024+) / Tablet (640–1023) / Mobile (<640):
- Display: 48 / 36 / 30
- H1: 36 / 30 / 24
- H2: 30 / 24 / 20
- H3: 24 / 20 / 18
- Body / Body SM: unchanged across breakpoints.

### Accessibility
- Body text minimum: 16 px. Never lower for primary content.
- Contrast ratio minimum: 4.5:1. Ink on Canvas ≈ 17.6:1. Pewter on Canvas ≈ 3.1:1 (decorative only).
- Never rely on colour alone — pair colour coding with icons, patterns, or labels.
- Layout must not break at 200% browser text-zoom.

---

## 8. Iconography

**Library:** Tabler Icons (`react-icons/tb` — outline + filled from one library).

**Specs:**
- Style: outline by default; filled only for active/selected states.
- Stroke width: 2 px (Tabler default, consistent across all icons).
- Stroke caps/joins: round (matches the brand's warm personality).
- Grid: 24×24 px.
- Padding: 2 px inset — content stays within a 20 px live area.

**Colour system (tiered):**
- **Ink** (`#18181C`) — primary: nav, headings, actions.
- **Pewter** (`#97979E`) — secondary: helpers, disabled, muted.
- **Cobalt** (`#4271DF`) — active state, selected, links (hover responsive).
- **Cloud** (`#F4F4F1`) — on dark backgrounds.

**Rule:** never use spectrum accents (Teal, Amber, Rose) for decorative icons. Those colours are reserved for semantic meaning.

---

## 9. Illustration

Spectrea runs a **dual visual language**. Iconography and product UI stay strictly geometric (Section 8). Illustration — for marketing pages, blog posts, fundraising decks, social, and brand storytelling — is warmer, richer, and allows more organic composition. Both tiers share the same palette so they read as one brand.

### Tier A — Product / docs (strict geometric)
Already defined by Sections 5–8. Flat primitives, no gradients, strict palette. Used for: app UI, iconography, technical diagrams, developer documentation, changelogs, status pages.

### Tier B — Marketing / editorial (warmer illustrated)
For everything people-facing and narrative. Characterised by:

- **Filled shapes only** — no outlines, no borders, no line art
- **Mixed shape vocabulary** — basic geometric primitives (circles, rectangles, triangles, arcs) for structured subjects + organic curved shapes (flowing foliage, rounded hills, billowy clouds, soft contours) for natural / soft subjects
- **Tints of primaries** — 20–60% opacity versions of Cobalt, Teal, Amber, Rose for supporting elements, mid-ground, atmospheric depth. Every element carries colour; no large empty neutral areas
- **Subtle depth** — soft vertical gradient permitted on background fields only; single darker tonal step on rounded organic objects; atmospheric perspective for recessed elements
- **Figures** — clean silhouette, flat-block clothing in palette colours, suggested face only. No detailed facial features
- **Balanced composition** — visual weight and colour distributed across the frame; asymmetric balance via rule-of-thirds or diagonal flow; element count fits the subject (rich but uncluttered)

**Reference aesthetic:** Linear.app and Stripe brand illustrations — warm, composed, full of life, clean.

### Production workflow
1. Generate with a free + commercial-safe AI tool (Gemini, Bing Image Creator / DALL-E 3, Adobe Firefly, or Stable Diffusion locally) using the locked prompt template
2. Vectorise the raster output with **Inkscape** (Path → Trace Bitmap → Multiple scans → Colors)
3. Drop the SVG into `/public/illustrations/`, or paste markup into a React component
4. Snap fills to exact Spectrea hex codes, namespace IDs, clean up excess paths

**Prompt template:** versioned at `/docs/illustration-prompt.md` (internal). Keep that file as the single source of truth — edit there, not here.

### What Tier B never does
- Outlines, strokes, borders, line art
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows, lens flares
- Heavy textures, noise, grain, hatching
- Off-brand colours (neon, magenta, cyan, bright yellow, pastel pink, purple, lavender, bright green)
- Detailed facial features — suggested shapes only
- Mascot characters, anthropomorphic objects
- Overcrowded scenes

### When to use which tier

| Surface | Tier |
|---|---|
| App UI, iconography | A — strict geometric |
| Technical diagrams, dashboards | A |
| Developer docs, changelogs | A |
| Marketing website | B — illustrated |
| Blog / editorial | B |
| Fundraising / sales deck | B |
| Social posts | B |
| Onboarding / product tour hero images | B (with restraint) |

---

## 10. Motion

### Philosophy
Purposeful, subtle, natural. Every animation answers "what does this help the user understand?" — if the answer is "nothing," remove it. Motion guides attention, confirms actions, and creates continuity; it never decorates.

### Durations
- 100 ms — micro (hover tints, colour shifts)
- 150 ms — standard (UI transitions, dropdowns)
- 200 ms — comfortable (modals, slide-overs)
- 300 ms — deliberate (page transitions, choreographed sequences)

### Easing
- `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`) — default for things entering or settling.
- `ease-in-out` (`cubic-bezier(0.4, 0, 0.2, 1)`) — for back-and-forth movements, continuous animations.
- Never use linear (feels mechanical) or ease-in alone (feels like something is wrong).

### Animated mark
The Spectrea mark animates on a 3-second loop: the spectrum stroke draws along the S curve, pauses, then dissolves to reveal the dots again. Always uses the **full spectrum** (Cobalt → Teal → Amber) — the "reveal" moment. Use for loading states, hero animations, and motion assets.

---

## 11. Components

### Buttons
- **Primary (Cobalt)** — the hero action. One per section. `#4271DF`, white text; hover `#3A63C4`; active `#3255A7`.
- **Secondary** — supporting actions. Stone-100 background, stone-700 text (light); Graphite tint background, Cloud text (dark).
- **Ghost** — tertiary actions. 2-px border, transparent background.
- **Destructive (Rose)** — irreversible actions. `#F24260`, white text.
- **Confirm (Teal)** — verify, approve, connect. `#00B6A0`, white text.
- **Caution (Amber)** — override, merge, proceed. `#E19000`, white text.

Common specs: padding `px-4 py-2` (default), radius `8 px` (rounded-lg), font `Lexend 500`, font-size `14 px`.

Focus ring: Amber `rgba(236, 164, 30, 0.7)`, 2 px solid, 2 px offset (`.btn-focus:focus-visible`).

### Forms
Input fields: `1 px` border (Stone-200), `8 px` radius, `px-3 py-2` padding, `14 px` Lexend. On focus: `2 px` Cobalt border, no separate shadow ring. Placeholder colour: Pewter.

### Cards
Container: `1 px` Stone-200 border, `12 px` radius (rounded-xl), `20 px` padding (p-5), Canvas background. Elevated variant adds `shadow-md` (floating elements only). Cards sit on the Cloud surface — the Canvas-vs-Cloud contrast gives them "home."

### Layout
- **Sidebar:** 256 px fixed width, collapsible on mobile.
- **Top bar:** 40–48 px height. Search + user menu.
- **Content area:** fluid, scrollable, Cloud (`#F4F4F1`) background.
- **Breakpoints:** mobile `<640 px` (1 column), tablet `640–1023` (2 cols), desktop `1024–1279` (3 cols), wide `1280+` (4 cols).
- **Base spacing unit:** 4 px. All spacing values are multiples of 4.

---

## 12. Communications

### Voice in action
Every piece of written output — product copy, email, social, presentation slides — follows the same voice formula: clear, specific, warm. Technical language is welcomed when it earns its place ("graph architecture" is fine; "leveraging our graph-based RAG pipeline for vector embeddings" is not).

### Email
- **Signature:** `Logotype` at `fontSize=11`, `colorMode="ink"`, `color="#212226"`, followed by "| We connect the dots."
- **Transactional header:** `LogotypeGradient` at `fontSize=13` on Canvas.
- **Marketing header (dark):** `LogotypeGradient` at `fontSize=13` on Ink. No `wordmarkColor` override.
- **Body typography:** Lexend 400, `16 px`, Ink on Canvas.

### Social media
- **Avatar:** gradient mark at 400×400 px (square, no crop).
- **Cover images:** brand gradient bar + tagline on Ink background (LinkedIn); gradient bar at bottom with tagline centered (Twitter/X).
- **Bio template:** "We connect the dots. Composable knowledge platform."
- **Quote card:** Ink background, Cloud text, `h-1` brand gradient accent strip at bottom.
- **Stat card:** Ink background, 3 xl Cloud number, Pewter supporting text, gradient accent strip at bottom.

### Presentations
- **Canvas slide background:** Canvas (`#FDFDFB`).
- **Ink slide background:** Ink (`#18181C`) — for divider / emphasis slides.
- **Title typography:** Albert Sans 600, 48 px.
- **Body typography:** Lexend 400, 24 px.
- **Accent strip:** brand gradient, 4 px tall, at the bottom of title slides.
- **Footer:** `Logotype` at `fontSize=9`, `colorMode="ink"`, `color="#97979E"`.

---

## 13. Governance

### The simple test
If you need to ask "is this OK?" — it probably isn't. The logo should always look exactly like the approved versions on the Variations page. When in doubt, use the primary treatment (grey dots, Cool-Duet stroke) on Canvas — that's always correct.

### Change process
1. **Propose** — document what you want to change and why.
2. **Review** — design lead + brand lead sign off.
3. **Version** — bump this guide and the related code.
4. **Communicate** — change log posted in `#brand`.

### Owner
Brand lead owns this document. Updates live here; downstream consumers (Figma library, Tailwind config, PDF export) are regenerated from this as source of truth.

---

## 14. Resources

### CSS tokens
```css
:root {
  /* Spectrum */
  --color-brand: #4271DF;
  --color-brand-teal: #00B6A0;
  --color-brand-amber: #E19000;
  --color-brand-rose: #F24260;

  /* Warm Blend neutrals */
  --color-canvas: #FDFDFB;
  --color-cloud:  #F4F4F1;
  --color-pewter: #97979E;
  --color-graphite: #212226;
  --color-ink:    #18181C;

  /* Typography */
  --font-heading: 'Albert Sans', sans-serif;
  --font-body:    'Lexend', 'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Radii */
  --radius-lg: 8px;
  --radius-xl: 12px;
}

/* Brand gradient — OKLCH with sRGB fallback */
.brand-gradient {
  background: linear-gradient(135deg, #4271DF, #00B6A0, #E19000);
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000);
  }
}
```

### Icon library
Tabler Icons via `react-icons/tb` — outline and filled from one library. 2 px stroke, round caps/joins, 24×24 grid.

### Fonts
All via Google Fonts:
- [Albert Sans](https://fonts.google.com/specimen/Albert+Sans) (weights 600, 700)
- [Lexend](https://fonts.google.com/specimen/Lexend) (weights 300, 400, 500)
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (weight 400)

---

*This document is the single source of truth for the Spectrea brand. The live web version at [spectrea.com/brand](/) contains interactive demos and the asset generator. If this document and the web guide ever disagree, this document wins.*
