# Spectrea Brand Iteration v2 — Design Spec

> Consolidated brand decisions from the iteration interview held 2026-04-18,
> resolving findings in `docs/brand-critical-review.md` against the user's
> strategic intent and prior April 2026 commitments.
>
> Status: design approved, pending user review of this spec.
> Implementation plan to follow via `superpowers:writing-plans`.

---

## 1. Frame and intent

The April 2026 brand iteration (logo lockup, Warm Blend, OKLCH gradients, brand guide PDF) shipped a coherent visual system. The April work was the *foundation* layer.

This v2 iteration sits on top of that foundation and resolves a different question: *what strategic position does the brand stake?* The critical review (`docs/brand-critical-review.md`) surfaced four structural tensions in the brand-as-shipped — archetype vs. traceability, name metaphor vs. graph product, figure system vs. composability, tagline vs. mark. The interview tested each tension against user intent rather than treating the report's recommendations as commitments.

Two strategic clarifications shaped the iteration:

1. **Audience scope is mass-appeal.** The four named personas in `brand.ts:216-244` (Business Leaders, Knowledge Workers, Technology Leaders, Growing Teams) and the SMB / mid-market focus in matchwise-business-copilot `CLAUDE.md` are only the *named top tier*. The brand spans B2C personal use through enterprise procurement. Every artefact has to read across the full spectrum.

2. **Spectrea is more than a substrate.** Notion's brand restraint works because Notion really is just a clean substrate. Spectrea is substrate + intelligence + composability + AI-augmented possibility. The brand strategy follows from this larger promise.

The strategic claim that emerged from the interview, and that this spec implements:

> **Spectrea is the spectrum of clarity. Everything you know, in one living view — alive with possibility, yours to keep. See it whole. Trust what you see. Build on what you find.**

This claim is brand-pure: a reader who has never used the product can still parse it. It differentiates from Notion (substrate-only), Stripe (one-accent infrastructure), Anthropic (editorial-research), Linear (austere modern), and Replit / Vercel (developer tooling). It's a position only Spectrea can occupy because only Spectrea has *spectrum + clarity + aliveness + ownership* as its native brand vocabulary.

> **Note on revision (2026-04-18, late):** an earlier draft of this spec used the phrasing "Spectrea is the spectrum of attributed knowledge — a living graph that grows with you, augmented by AI, owned by you. Every claim traceable. Every possibility composable." That version leaked product-feature words ("attributed", "claim", "graph") into a brand-pure surface. The user explicitly asked that the brand "shine with its own right and standing" — readable without product knowledge. The claim above is the brand-pure rewrite that became canonical across `brand.ts`, `brand-guide.md`, and `llms.txt`. Earlier-draft phrasing is retained here only for traceability of the design decision.

---

## 2. Decisions ledger

### Decision 1 — Name

**Outcome:** Keep Spectrea. No swap, no public stress-test.

**Etymology, revised (brand-pure):** Dual-reading. (a) *Spectrum* — the full range, the complete view, the whole picture. (b) *Revealing* — bringing what was hidden into clear view. Together: *the spectrum of clarity*. (Earlier draft used "the spectrum of attributed claims, observations, and connections" — replaced because it required product knowledge to parse.)

**Touches:** `src/data/brand.ts:9-11` (etymology field), brand-guide naming section if present.

---

### Decision 2 — Archetype: tri-domain split

**Outcome:** Replace single Magician archetype with three archetypes assigned to surface domains.

| Archetype | Owns | Why |
|---|---|---|
| **Magician** | Marketing surfaces (landing pages, launch video, social, blog headers) | The discovery / "aha" moment when scattered knowledge becomes a graph |
| **Sage** | Trust surfaces (provenance UI, audit log, settings, errors, docs, security pages) | Authority through clarity; aligns with P5 Total Traceability and the "Never a black box" anti-value |
| **Creator** | Product surfaces (composition, graph editor, primitives, workflows) | Agency and ownership; aligns with P3 Composable Primitives |

**Voice formula update:** "Tech earns its place by **explaining the magic**" → "Tech earns its place by **showing its work**." The original formula contradicted P5 / Never a black box on every surface that wasn't marketing. The new formula works everywhere.

**Trade-off accepted:** every Tier-1 brand decision now needs a "which surface does this serve?" question. More overhead; the brand carries all three personalities honestly.

**Touches:** `src/data/brand.ts:73-76` (archetype + description), `:253-256` (voice formula + tech description). Brand-guide foundation section.

---

### Decision 3 — Primary message + tagline

**Outcome:** Keep "We connect the dots" as the primary tagline, unchanged. Connection stays as the primary message theme. Trustworthy Intelligence remains a secondary message.

The report's critique that the tagline "implies the system concludes rather than the user judges" was acknowledged but rejected. The tagline does brand work that abstract trust language can't, and it's literally illustrated by the mark.

**Touches:** none required — `brand.ts:14-19` already has this; reaffirmed.

---

### Decision 4 — Wordmark architecture

**Outcome:** Keep the April lockup architecture exactly as-is.

- Lockup forms remain `Logotype` (mono) and `LogotypeGradient` (Cool Duet mark + monotone wordmark).
- Wordmark `pectrea` (lowercase, S carried by the mark) is preserved.
- No sentence-case wordmark variant added.
- Plain-text "Spectrea" in typed contexts (browser tabs, search results, contracts, email) is the same situation Stripe / Linear / Notion accept.
- Mark already stands alone in tiny spaces (favicon).

**Touches:** none required — `LogotypeGradient` and `Logotype` components stay.

---

### Decision 5 — The mark itself

**Outcome:** Keep S-curve with 10 dots, 3 trailing. Cool Duet treatment from April stays.

The mark literally illustrates the "We connect the dots" tagline, carries the "about-to-connect" idea, provides the missing S in the lockup, and is the brand's most distinctive visual asset. The report's "it's only a line, not a graph" critique was overreaching given the equity already accumulated.

**Touches:** none required — `SpectreaLogo.tsx` and generated SVG assets stay.

---

### Decision 6 — Illustration: the Dot System

**Outcome:** Adopt the Dot System as the brand's universal illustration vocabulary.

**The five atoms:**

1. **Dot** — filled circle in a brand colour. The fundamental unit. Represents an entity, claim, idea, or person depending on context.
2. **Curve** — a line connecting two or more dots. The relationship / connection unit. Same Bézier feel as the mark.
3. **Cluster** — a group of dots in proximity. Represents a topic, team, community, or knowledge area.
4. **Trail** — a sequence of dots in directional order, typically with increasing opacity / size from past to present. Represents provenance, history, evolution.
5. **Field** — a soft tinted wash using the bridge tones (Cobalt Wash `#EDF0F8`, Teal Mist `#E6F5F3`, Amber Stone `#F5F0E6`, Rose Blush `#FDF0F2`). Atmospheric depth, never the subject.

**The rule:** every brand illustration assembles from these five atoms only, in the brand palette, on Canvas or a Field. Filled shapes only — no outlines, strokes, drop shadows, glows, or textures.

**Why this fits:** The mark *is* this system at small scale (dots + a curve). Illustrations are the same system at larger scale. The brand's DNA literally extends from logo to hero illustration. Anything Linear / Stripe / Notion can't do (because their products aren't graphs), Spectrea can do natively.

**Subsumes:** the existing Bauhaus figure system in `src/components/illustrations/SpectreaFigure.tsx` is reframed as a *specialisation* of the Dot System — figures are stylised clusters of dots / brand-coloured shapes when explicit human imagery is needed. The component does not need rewriting; it gets reclassified in the brand-guide narrative.

**Composition library:** intentionally not pre-composed in this spec. Designer work post-spec, using Figma / Illustrator / AI generation against the rewritten illustration prompt. The brand guide specifies *only* the atoms, the rules, and the prompt — not specific compositions.

**Touches:** `docs/illustration-prompt.md` (rewrite), new brand-guide section "Illustration vocabulary," brand-guide tier labels collapse from Tier A/B to a unified illustration system + iconography (Tabler).

---

### Decision 7 — Strategic position: own the spectrum + graph + alive identity

**Outcome:** Stake the position the existing system already gestures at, with confidence and consistency.

**Five operating commitments:**

1. **Spectrum is the brand signature, not just functional accents.** Cobalt + Teal + Amber + Rose used confidently in marketing as the visual claim — the way Google's four colours signal Google, Slack's signal Slack, Microsoft's signal Microsoft. Functional / semantic discipline (Tier 1/2/3 framework) stays inside product UI. Marketing surfaces commit to spectrum hero moments — full-spectrum gradients, four-colour illustration moments, spectrum lockups.

2. **Graph is the central illustration motif.** The Dot System (Decision 6) is non-optional and pervasive. Where Stripe shows 3D gradient orbs and Notion shows clean documents, Spectrea shows growing knowledge graphs. The graph is the brand's universal visual idea.

3. **Motion signals "alive, growing, compounding."** See Decision 12. Three signature motion primitives carry the *alive* claim across product and marketing.

4. **Type and Warm Blend stay as April designed.** Modern sans (Albert Sans + Lexend + JetBrains Mono) for the substrate's clarity. No editorial serif; that would belong to a different brand position (the Anthropic-editorial position). Warm Blend canvas neutrals stay — provides systemic cohesion without competing with the spectrum.

5. **One register everywhere.** Marketing surfaces and product surfaces share the same *visual aesthetic* — spectrum + graph + warm canvas + modern sans. The variation is *how dense* and *how much hero treatment*, not *what kind of brand*. Marketing is product-with-room-to-breathe; product is marketing-with-functional-density. Same visual world. This is the maintenance fix for the abandoned hybrid (editorial-marketing + modern-product) approach considered earlier in the interview.

   **How this reconciles with Decision 2 (tri-archetype):** the tri-archetype split assigns *emotional tone and voice* to surface domains (Magician on marketing, Sage on trust surfaces, Creator on product). The "one register everywhere" rule assigns *visual aesthetic* (spectrum + graph + Warm Blend + modern sans) to all surfaces. They operate on different axes and don't conflict. A marketing page leads with the Magician's discovery moment in copy, but renders that moment using the same visual vocabulary as the product. A trust surface leads with the Sage's verification framing in copy, but uses the same visual vocabulary too. The voice changes per surface; the look doesn't.

**What this differs from where the brand sits today:** today the spectrum is described as accents with strict semantic discipline; gradients have a clear hierarchy; the mark is the lockup; illustrations are warm-Bauhaus. Tomorrow the spectrum is the brand signature applied confidently in marketing; gradients show up at every hero moment; the mark anchors the Dot System illustration vocabulary; motion makes the system feel alive. The April work was conservative about claiming the spectrum as the brand identity. v2 makes that claim explicit.

**Touches:** brand-guide rewrite of foundation + colour-system framing; positioning copy updates; marketing surface design direction.

---

### Decision 8 — Voice "always-use" vocabulary

**Outcome:** Tighten the privileged-vocabulary list from 31 words to 12 distinctive ones.

**The new list:**

| Word | Why it earns its place |
|---|---|
| **provenance** | Direct from P2/P5; almost no competitor uses this term seriously |
| **traceable** | Concrete, audit-flavoured, rare in B2B SaaS |
| **auditable** | Same — signals trust the way "secure" can't |
| **attributed** | Product literally attributes claims; product-true |
| **sourced** | Same flavour, more accessible than "provenance" |
| **verified** | Trust-flavoured, concrete |
| **transparent** | Pairs naturally with the audit / anti-black-box stance |
| **compose** | P3 Composable Primitives; distinctive verb |
| **compound** | Compounding intelligence; Spectrea-specific framing |
| **spectrum** | The brand name's own root; signals brand awareness |
| **connect** | Earns its place via the tagline (Decision 3) |
| **surface** | Verb that fits the product's actual action ("surface a connection / a claim") |

Generic words (insights, intelligence, transform, empower, unlock, enable, build, evolve, grow, etc.) remain allowed in writing but no longer privileged. Writers can use them when natural; they shouldn't reach for them as default.

The "never use" list (`brand.ts:290-293`) is unchanged.

**Touches:** `src/data/brand.ts:282-289` (replace `alwaysUse` array). Brand-guide voice section.

---

### Decision 9 — Personality traits: add Rigorous

> **Reverted (post-launch revision):** Rigorous was added per this decision and shipped briefly, but on review it read as a methodology rather than a personality — strange to call someone "rigorous" alongside warm / perceptive / grounded / adaptive. The brand's discipline and consistency (fixed primitives, fixed palette, fixed motion language) are now enforced **structurally** by the system rules in the guide, not claimed verbally as a fifth personality trait. The personality returned to four traits.

**Outcome (now superseded):** Five personality traits with guardrails. Keep all four existing; add Rigorous.

| # | Trait | Guardrail |
|---|---|---|
| 1 | **Warm** | But not soft — warmth doesn't mean hand-holding |
| 2 | **Perceptive** | But not presumptuous — suggests, never dictates |
| 3 | **Grounded** | But not boring — substance doesn't mean plain |
| 4 | **Adaptive** | But not shapeless — flexibility doesn't mean no opinion |
| 5 | **Rigorous** | But not rigid — system discipline that serves clarity, not dogma |

**Rationale for Rigorous:** the brand system is highly prescriptive (locked illustration prompt, single figure pose, 60/20/10/10, mark with exactly 10 dots, lockup with exactly two forms, now also one register everywhere and 12-word vocabulary). Rigorous makes that discipline a personality claim rather than an unspoken contradiction. The guardrail prevents rigour from tipping into pedantry.

"Generative" was considered and rejected (too loaded with generative-AI association, too generic). "Adaptive" was kept rather than reframed because it describes a real product property (depth-on-demand) the brand wants to claim.

**Touches:** `src/data/brand.ts:79-100` (add 5th trait object). Brand-guide foundation section.

---

### Decision 10 — Data visualisation specification

> **Superseded (post-launch revision, 2026-04-18 late):** This decision has been **reversed**. A `Data Visualization` page and brand-guide section were initially shipped per this decision, but the user reviewed the brand guide and judged the section "too opinionated on how specific parts of the product is like." The brand guide was reframed as **product-agnostic generic foundations** — design rules for any Spectrea-branded surface, not a product design system. Knowledge-graph rendering specs (node/edge/confidence/provenance/layout) belong in a product design system, not the brand guide. The page (`src/pages/imagery/DataViz.tsx`), the brand-guide Section 10b, and all related references have been removed. The Dot System (Decision 6) remains the brand's visual vocabulary — generic enough to be applied to graphs, but not prescriptive about graph rendering.

**Original (now-superseded) outcome:** Add a new brand-guide section specifying how the knowledge graph itself should be rendered.

**Why now (not deferred):** Decision 7 made the graph the brand's central visual idea. If the graph IS the brand, the rendering of the graph IS a brand artefact. Decision 6 (Dot System) needs the in-product graph to align with the illustration vocabulary or the brand splits. Marketing screenshots are the product's most important brand asset and currently have no rendering rules.

**Scope of the spec section:**

- **Node rendering:** default fill by entity type (Cobalt = primary entities, Teal = relationships rendered as nodes, Pewter = context); size encoding by centrality (one signal max); selected / hovered / focused appearance; max nodes per view before clustering (~80); empty state.
- **Edge rendering:** stroke style by relationship category (solid = confirmed, dashed = inferred, dotted = hypothetical); stroke weight by confidence; default colour Pewter or inherited; directional vs undirectional; self-loops.
- **Confidence encoding:** opacity 50–100% mapped to confidence 0.5–1.0; combined with the `hedge_marker` text in tooltips.
- **Provenance trail:** highlighted-path styling for "trace this claim back to its source"; source nodes get a subtle outline ring; animation defined in Decision 12.
- **Layout / density:** when to show full graph vs cluster vs single-entity focus; pan/zoom conventions; background (Canvas in light mode, Ink in dark mode).
- **Cross-product consistency:** the same node / edge rendering must appear in product UI, marketing screenshots, blog post diagrams, brand-guide examples, and Dot System illustrations.

**Touches:** new section in `public/brand-guide.md` (between current Section 9 Imagery and Section 10 Motion). Asset-generation script if visual examples are wanted in the guide. Does not require redesigning existing graph components in this iteration; documents the choices that should be true.

---

### Decision 11 — Product-feature naming convention

> **Spec table superseded (post-launch revision):** the original table below enumerated specific product features (Knowledge Graph, Claims View, Observations, Sources, Assistant, Spectrum View, Suggestions, Traces) as canonical examples. In the product-agnostic-foundations review, that was reframed as too tied to the current product roadmap. The shipped guide replaces the feature-list table with a **generic pattern table** (lowercase noun in prose → Title-Case Proper Noun for canonical → multi-word capitalised → "Spectrea X" reserved for branded surfaces). The convention is unchanged; only the examples were genericised so the rule outlives any specific feature lineup. The original table is retained below for traceability.

**Outcome:** Title-case feature names without brand prefix, Apple-style.

| Feature | Name |
|---|---|
| Knowledge graph | **Knowledge Graph** |
| Claims surface | **Claims View** (or **Claims**) |
| Observation records | **Observations** |
| Source records | **Sources** |
| AI assistant | **Assistant** |
| Spectrum / multi-perspective view | **Spectrum View** |
| AI-surfaced suggestions | **Suggestions** |
| Provenance trails | **Traces** |

**Rules:**

1. Title-case Proper Noun is the default for first-class features.
2. Brand-prefix (e.g., *Spectrea Studio*) reserved for distinct branded surfaces — separately-paid tiers, developer surfaces, installable companions. Even then, only after deliberate review.
3. Lowercase generic nouns in running prose are still acceptable when naturally appropriate ("the assistant suggested" reads fine), but the canonical name in marketing copy and documentation cross-references is Title-case.

**Touches:** new brand-guide section (suggest under section 11 Communications). No code changes needed; this is a writing convention.

---

### Decision 12 — Motion: three signature primitives

> **Names generalised (post-launch revision):** the three primitives below were originally named **Node arrival / Edge formation / Spectrum shift** with triggers tied directly to the in-product graph view. In the product-agnostic-foundations review, the names and triggers were generalised so the patterns apply across any Spectrea surface (not just the graph UI). The shipped names are **Arrival (~400ms) / Formation (~300ms) / Spectrum sweep (~600ms)**. Timings, easing, and spec mechanics are unchanged. The original table is retained below for traceability.

**Outcome:** Add three signature motion primitives to the brand system, each owning one moment in the brand's "alive, growing, compounding" claim.

| # | Primitive | Trigger | Spec |
|---|---|---|---|
| 1 | **Node arrival** | New node enters the graph (extraction, AI suggestion, user action) | Scale up from 0 with soft elastic settle, then a brief radial pulse in the node's spectrum colour. ~400ms total. |
| 2 | **Edge formation** | A relationship forms between two nodes | Edge draws from source toward target with the spectrum gradient running along the line, then settles to its resting colour. ~300ms. |
| 3 | **Spectrum shift** | AI surfaces a connection / insight / claim | A thin gradient strip somewhere onscreen (divider, corner accent, header line) traverses Cobalt → Teal → Amber → Rose. ~600ms. The brand's signal for "AI just acted" without saying the word AI. |

Plus standard restrained interactive motion: 150ms easing on hovers, 200ms on focus / state changes, snap-to-position (no overshoot) for state transitions.

**Where the primitives apply:**
- Node arrival: in-product graph view, marketing demo videos, onboarding moments.
- Edge formation: same — anywhere the graph is shown live or recorded.
- Spectrum shift: signal of AI activity. Used sparingly — when the AI has *meaningfully* acted (surfaced an insight, made a connection, completed an extraction). Not on every API response.

**Engineering surface:** three reusable React/CSS components. One-time build, reused everywhere. Should be noted in the implementation plan but is downstream of brand spec.

**Touches:** new section in `public/brand-guide.md` Section 10 (Motion) extending the existing motion section. Reusable motion primitives in the matchwise-business-copilot codebase (post-spec implementation).

---

### Decision 13 — Tier 3 deferrals

**Outcome:** Defer six items from the report's Tier 3 list to a separate post-launch initiative. They are tracked here for visibility but not in this iteration's scope.

| Item | Defer because |
|---|---|
| Singapore positioning (lean in vs stay silent) | Decision waits until launch context clarifies which market tests first |
| Pitch deck template | Investor narrative needs final v2 brand assets first |
| Case study template | Format gets validated by first real customers; no point freezing pre-launch |
| Spokesperson / executive voice | Founder voice emerges from real usage; pre-launch framing is premature |
| Trust disclosure documents (privacy, AI use, retention) | Legal / product-state work; not brand iteration |
| Brand evolution framework | By definition post-launch — the system has to live first |

---

## 3. Implementation surfaces (summary)

The decisions above touch the following files and artefacts:

### Code

- `src/data/brand.ts`
  - `:9-11` etymology — extend with dual reading
  - `:73-76` archetype + description — replace single Magician with tri-archetype model + descriptions per surface domain
  - `:79-100` personality — add 5th trait (Rigorous + guardrail)
  - `:253-256` voice formula + tech description — replace "magic" with "show its work"
  - `:282-289` `alwaysUse` array — replace with 12-word distinctive list

- `src/components/illustrations/SpectreaFigure.tsx` — no rewrite required; reclassified in brand-guide narrative as a Dot System specialisation for human imagery

- `SpectreaLogo.tsx`, lockup components — unchanged

- Motion primitives — new reusable components for node-arrival, edge-formation, spectrum-shift (post-spec implementation, follows from Decision 12)

### Docs and brand guide

- `public/brand-guide.md` — significant edits across multiple sections:
  - Foundation: tri-archetype model, expanded etymology, 5 personality traits, strategic claim
  - Voice: tightened "always use" list, updated formula, Sage / Magician / Creator surface assignments
  - Colour: reframe spectrum as brand signature in marketing, semantic in product (no hex changes)
  - **New section: Illustration vocabulary** (Dot System — five atoms + rules + AI prompt reference)
  - **New section: Data visualisation specification** (node / edge / confidence / provenance / layout rules)
  - **New section: Feature naming convention** (Title-case Proper Nouns, brand-prefix exceptions)
  - Motion: extend with three signature primitives (node arrival, edge formation, spectrum shift)

- `docs/illustration-prompt.md` — rewrite around Dot System primitives (atoms + composition rules + brand palette + filled shapes only)

- `dist/brand-guide.md`, `public/brand-guide.pdf` — regenerated from updated source

- `public/llms.txt` — updated to reference new sections

### Generated assets

- New SVG assets via `scripts/generate-brand-assets.mjs`:
  - Dot System atoms (5 reference visuals)
  - Data viz spec examples (node types, edge styles, confidence encoding)
  - (Optional) one or two reference compositions to anchor the illustration prompt

### Out of scope for this iteration

- Designer-built illustration composition library (post-spec)
- Engineering implementation of motion primitives (post-spec)
- Six Tier 3 items (deferred per Decision 13)

---

## 4. Acceptance criteria

The iteration is complete when:

1. `src/data/brand.ts` reflects all field-level changes (Decisions 1, 2, 8, 9).
2. `public/brand-guide.md` integrates all new sections (Dot System, data viz spec, feature naming) and updates existing sections (foundation, voice, colour framing, motion).
3. `docs/illustration-prompt.md` is rewritten around Dot System atoms.
4. PDF and downstream LLM-readable assets regenerated.
5. Build + typecheck clean across the matchwise-business-copilot and spectrea-branding repos.
6. Brand iteration memory (`project_brand_iteration.md`) updated with v2 ledger.
7. The strategic claim in Section 1 of this spec (Spectrea = the spectrum of clarity; everything you know in one living view; alive with possibility, yours to keep) is consistent with every section of the updated brand guide. (Brand-pure rewrite supersedes the earlier "spectrum of attributed knowledge" draft — see note in Section 1.)

---

## 5. What this iteration does NOT do

- Does not redesign the logo, mark, or wordmark.
- Does not change palette hex values or gradient stops.
- Does not change typography stack.
- Does not implement engineering surfaces (motion components, graph rendering refactor) — those follow in a separate plan.
- Does not generate the illustration composition library — designer work post-spec.
- Does not rewrite the matchwise-business-copilot product documentation.
- Does not address the six Tier 3 items deferred in Decision 13.

---

## 6. Provenance

This spec consolidates the interview held 2026-04-18 in the spectrea-branding session, which iterated through 13 decisions against the findings in `docs/brand-critical-review.md`. The interview format used the `superpowers:brainstorming` skill with the visual companion for Decision 6 atom verification. Per a feedback memory recorded mid-interview, the report was treated as a starting point to evolve from, not a checklist to execute — several recommendations (retire the tagline, retire Bauhaus figures, reopen the name) were rejected in favour of additive moves that preserve April 2026 work.

The strategic position confirmed in Decision 7 (own the spectrum + graph + alive identity) emerged from a comparative analysis of Anthropic, Palantir, Notion, Stripe, Figma, Replit, and Vercel. None was a perfect analogue; the position synthesises elements from several while staking ground that none currently occupies.
