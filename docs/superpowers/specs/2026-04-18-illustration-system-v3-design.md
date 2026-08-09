> **Superseded (historical record, 2026-04-18).** This v3 illustration system was retired by the v4 illustration prompt (2026-04-19, published at /illustration-prompt.md), which retires the two-style split, the recurring subject cast, the four-layer vocabulary, the production matrix, and the decision rubric this spec defines. Not canon. Retained for traceability.

# Spectrea illustration system — v3 design

> Date: 2026-04-18
> Supersedes: v2 Dot System (specified in `2026-04-18-brand-iteration-v2-design.md` Decision 6)
> Trigger: user reviewed v2 attempts at high-fidelity composition and judged them "malformed and meaningless." This v3 reframes the system honestly: a layered vocabulary, four production channels with clear allocation, and a decision rubric so future contributors know where to send each kind of work.

---

## 1. Why v3

The v2 spec defined a "Dot System" of five atoms (Dot, Curve, Cluster, Trail, Field) and claimed two specialisations (geometric primitives for product UI, Bauhaus figures for human imagery). In practice:

- The strict five-atom rule was contradicted by both specialisations — Bauhaus figures use rectangles, geometric primitives use squares/triangles/arcs, neither of which are atoms. The framing was retrofitted, not real.
- Compositions built only from the five atoms read as primitive at scale ("a child putting basic shapes together"), not as illustration.
- The brand has *two illustration jobs* — brand/marketing surfaces and product/explanation surfaces — and one style cannot serve both well.
- Author capability is uneven: schematic geometric work is reliable; pictorial figures and editorial scenes are not.

v3 fixes all four problems by separating **vocabulary** from **production channel** and being explicit about both.

## 2. Vocabulary — four layers

The system is layered. Each layer answers one question. Together they form a vocabulary that can carry both abstract Dot-System compositions *and* richer figurative scenes — without becoming infinite.

### Layer 1 — Atoms (the brand DNA)

The mark itself is built from these. Every illustration must echo at least one.

| Atom | Form |
|---|---|
| **Dot** | Filled circle, brand colour |
| **Curve** | Soft Bézier line connecting things |
| **Cluster** | 3–8 dots in proximity, optionally wired with curves |
| **Trail** | Sequence of 4–6 dots, opacity / size ramping faint→full |
| **Field** | Soft radial or linear wash in a bridge tone |

### Layer 2 — Forms (geometric shapes for figurative content)

Used to build figures, scenes, objects, structures. Always co-occur with atoms in a composition.

| Form | When |
|---|---|
| **Rounded rectangle** | Body parts, frames, screens, plates |
| **Square** | Structural blocks, units of layout |
| **Triangle / polygon** | Direction, tension, geometric mass |
| **Arc** (90°–270° circle segment) | The Bézier's geometric cousin. Horizons, archways, partial ranges |
| **Half-circle** | Ground, dome, top of a form |
| **Soft blob** | Atmospheric mass when not a Field |

### Layer 3 — Treatments (how shapes are rendered)

Apply to both atoms and forms.

| Treatment | Reads as |
|---|---|
| **Filled** | Default. Primary content. |
| **Outlined** | Ghost / context / negative space |
| **Halo** | Soft radial light wrapping a focal element. Depth without shadow. |
| **Layered** | Multiple shapes stacked at varying opacity for depth |

### Layer 4 — Palette & ratio

Brand palette only. Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260 · Pewter #97979E · Ink #18181C · Cloud #F4F4F1 · Canvas #FDFDFB · plus four bridge tints (Cobalt Wash · Teal Mist · Amber Stone · Rose Blush) and a warmer Paper #FAF8F2 for editorial surfaces.

60 / 20 / 10 / 10 ratio: Canvas / surface (Cloud) / text + UI / spectrum. One spectrum hero per composition; supporting colours at lower opacity. Pewter for ghost / context.

## 3. The seven craft moves

Beyond the four layers, these are the techniques that distinguish "system applied with craft" from "shapes assembled."

1. **Arc** — already in Forms, but worth naming separately as a craft move. The Bézier's geometric sibling.
2. **Halo** — soft radial wash behind a focal Dot or Cluster. Replaces flat fills that kill atmosphere.
3. **Painterly Field** — Field upgraded from single radial wash to two-or-more-tone overlapping radials. Atmosphere with depth.
4. **Spectrum Band** — painterly streak through Cobalt → Teal → Amber → Rose. Backdrop or subject.
5. **Translucent Plate** — soft-cornered rectangle at 40–70% opacity in Cloud or a Bridge tint. Editorial structure.
6. **Keyline Rule** — 0.5–1px Pewter hairline. Editorial composition skeleton.
7. **Hand-imperfect Mark** — exactly one subtle imperfection per composition (a slightly off-round dot, a curve with a tremor, a plate corner not perfectly radiused). The single human signature.

Plus paper grain (SVG noise filter at 4–7% opacity) for Editorial Geometry compositions.

## 4. Two paired styles

The brand has two illustration jobs. Pair two styles that share palette / type / paper ground / curve gesture but differ in execution.

### Editorial Geometry (brand / marketing surfaces)

Stripe Press / Pelican classics / MIT Press lineage. Flat geometric shapes on warm paper, generous white space, serif headline + monospace metadata, single warm focal accent. Used for: homepage hero, About / story / mission, blog headers, press, brand-guide section opens.

References: [Stripe Press](https://press.stripe.com/), [Yuin Chien's Stripe Press portfolio](https://yuinchien.com/p/stripe-press), MIT Press, Fitzcarraldo Editions.

### Living Graph (product / explanation surfaces)

Vercel / Linear lineage applied to Spectrea's actual subject. Dense node + edge compositions on either Canvas or Ink, with depth (painterly Fields, halos, layered opacity), atmospheric perspective, focal hierarchy. Used for: product feature pages, docs hero, "how it works" diagrams, onboarding moments, in-product loading and empty states.

References: [Vercel.com](https://vercel.com/), [Linear.app](https://linear.app/).

Both styles share: brand palette (Layer 4), brand-mark curve quoted somewhere, at least one hand-imperfection, soft Bézier as a recurring gesture, no gradients except on Field backgrounds and the brand mark.

## 5. Channels — who produces each illustration

Four channels. Every illustration in the brand system is allocated to exactly one.

### Channel 1 — In-house (me, with render-iterate loop)

Reliable lane. ~80% of brand-guide illustrations.

- Vocabulary cards (atoms, forms, treatments)
- Layout & system diagrams (60/20/10/10 ratio, spacing scale, 12-col grid, type scale ladder, gradient strips, swatch displays)
- Motion primitive demos (static frames + the live React/CSS components on Motion page)
- Data-viz primitive cards (node types, edge styles, confidence ramps, provenance trails, interactive states)
- Empty states, loading skeletons, searching states
- In-product brand moments (connection-formed, item-arrived, AI-just-acted, notification dots)
- Section dividers (spectrum bands, dot rules, arc dividers)
- Brand mark variants (cool duet, mono ink, mono white, full spectrum, animated frames)
- Component examples (cards, buttons, forms — generic mockups with brand styling)
- Comparison diagrams (do/don't, before/after, scattered/composed diptychs)

Capability assumption: I author SVG, render via `google-chrome --headless --screenshot`, read the PNG via Read tool (vision), iterate. Two or three passes per composition.

### Channel 2 — AI image-generation (via the locked prompt)

Pictorial scenes that need atmosphere or figures Bézier can't fake. ~15% of illustrations.

Workflow: user generates via Gemini / DALL-E / Adobe Firefly / Stable Diffusion using `docs/illustration-prompt.md` v3 prompt → user vectorises with Inkscape Path → Trace Bitmap → drops the SVG into `/public/illustrations/`.

- Marketing site hero (homepage above fold)
- Feature page heroes that need pictorial subjects
- Blog post header art
- Social post imagery (one-off campaigns)
- About page atmospheric imagery
- Anything that requires a figure mid-action, a scene with depth, a metaphorical landscape

### Channel 3 — Designer (commissioned)

The 5% that defines the brand in front of the world.

- Brand launch keynote slide / hero visual
- Conference banner & booth visuals
- Print brand-guide cover & section-open plates
- About page main hero illustration
- Custom marketing campaign imagery (paid)
- Photography direction & art direction for human imagery

The brand guide tells the designer what the system is; the designer produces the heroes.

### Channel 4 — Canva (template-driven, optional)

Only worth setting up if the team will use it weekly. Requires a Spectrea brand kit configured in Canva (palette, fonts, logo upload).

- Sales presentation decks
- One-off social posts using brand-kitted templates
- Internal flyers, event posters

Tool surface: `mcp__claude_ai_Canva__generate-design` with `brand_kit_id`.

## 6. Decision rubric

For any new illustration, ask three questions in order:

1. **Is it a system artefact?** Vocabulary card, primitive demo, layout diagram, swatch, in-product moment, dataviz primitive, brand mark variant. → **Channel 1 (Me)**.
2. **Does it need a pictorial subject?** A figure mid-action, a scene with depth, a metaphorical landscape, atmospheric texture. → **Channel 2 (AI image-gen)**.
3. **Does it carry the launch / paid media / print?** Homepage hero, conference banner, About hero, print cover, paid campaign. → **Channel 3 (Designer)**.

Canva is reserved for template-driven recurring formats (Channel 4).

If "not sure": default to Channel 1, render through the loop, evaluate honestly. If malformed, escalate.

## 7. Implementation surfaces

| File / surface | Change |
|---|---|
| `docs/illustration-prompt.md` | Replace v2 prompt with v3: includes four layers, seven craft moves, paired styles, palette refinements |
| `public/brand-guide.md` Section 9 | Replace v2 Dot System section with v3: layers, craft moves, paired styles, channel matrix, decision rubric |
| `src/pages/imagery/Illustration.tsx` | Rebuild around v3 vocabulary cards + channel allocation. Mark designer-pending surfaces honestly. Use the verified low-fi SVG cards from the brainstorm showcase. |
| `src/data/brand.ts` | No changes (illustration data is in the page itself) |
| `public/llms.txt` | Update illustration vocabulary summary to v3 |
| `public/brand-guide.pdf` | Regenerate after Markdown updates |

The existing `SpectreaFigure.tsx` Bauhaus component stays — reframed as a **Channel 1 Form-layer construct** (rounded rectangles for body parts) wrapped in atoms (head dot, hand dots, idea Trail, Field halo). The framing was wrong before; the geometry was always right.

## 8. Acceptance criteria

1. `docs/illustration-prompt.md` describes the v3 four-layer vocabulary, the seven craft moves, both paired styles (Editorial Geometry + Living Graph), and the production guidance for AI generators.
2. `public/brand-guide.md` Section 9 (Illustration) is rewritten around v3. The four channels and the decision rubric appear there.
3. `src/pages/imagery/Illustration.tsx` renders the four-layer vocabulary cards (5 atoms + 6 forms + 4 treatments + palette block), the seven craft moves, the channel allocation matrix, and the decision rubric.
4. `src/pages/imagery/Illustration.tsx` clearly marks which existing illustration categories now route to AI image-gen or designer, rather than letting low-fi SVG stand in for hero work.
5. `public/llms.txt` reflects v3 vocabulary and channel model.
6. PDF regenerated; build clean.
7. v3 spec (this file) committed to docs/superpowers/specs/.

## 9. What this iteration does NOT do

- Does not produce hero illustrations. Those are Channels 2/3 — out of scope here.
- Does not commission a designer. That's a procurement step the user owns.
- Does not set up the Canva brand kit. Optional follow-on.
- Does not touch the brand mark, the colour system, the typography system, or the motion system. Those are stable.

## 10. Provenance

- `docs/brand-critical-review.md` (2026-04-18) — original audit; identified the four structural tensions in v1 brand
- `docs/superpowers/specs/2026-04-18-brand-iteration-v2-design.md` Decision 6 — established the original Dot System with 5 atoms
- This conversation (2026-04-18, late) — interview + brainstorm session that produced the v3 vocabulary, channel allocation, and rubric. Source artefacts in `.superpowers/brainstorm/3964501-1776491117/content/` for the visual proof of each iteration.
- Research input: Anthropic / Claude design refresh ([Geist](https://geist.co/work/anthropic), [Anthropic brand guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md)), [Stripe Press](https://press.stripe.com/), [Vercel](https://vercel.com/), [Linear](https://linear.app/).
