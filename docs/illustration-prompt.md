# Spectrea Illustration Prompt — v3

> Versioned prompt template for generating on-brand illustrations with AI
> image-generation tools (Gemini, DALL-E / Bing Image Creator, Adobe
> Firefly, Stable Diffusion).
>
> **The system (v3):** a layered vocabulary — atoms, forms, treatments,
> palette — plus seven craft moves that turn system-applied into
> composition-with-craft. Two paired styles cover the brand's two
> illustration jobs: **Editorial Geometry** for brand/marketing surfaces
> and **Living Graph** for product/explanation surfaces. Both styles
> share palette, type, paper ground, and the brand-mark curve.
>
> Paste the prompt below (Editorial Geometry OR Living Graph, depending
> on the surface) and replace `[INSERT]` with your subject.

---

## The four-layer vocabulary

### Layer 1 — Atoms (the brand DNA)

The mark itself is built from these. Every illustration must echo at least one.

1. **Dot** — filled circle in a brand colour. The fundamental unit.
2. **Curve** — a soft Bézier line that connects two things. Same flowing feel as the Spectrea mark.
3. **Cluster** — a group of 3–8 dots in proximity, optionally wired with curves.
4. **Trail** — a sequence of 4–6 dots in directional order, opacity or size ramping faint → full.
5. **Field** — a soft tinted radial or linear wash in one bridge tone (Cobalt Wash `#EDF0F8`, Teal Mist `#E6F5F3`, Amber Stone `#F5F0E6`, Rose Blush `#FDF0F2`). Atmosphere — never the subject.

### Layer 2 — Forms (geometric shapes for figurative content)

Build figures, scenes, objects, structures. Always co-occur with atoms in a composition.

- **Rounded rectangle** (body parts, screens, frames, plates)
- **Square** (structural blocks, layout units)
- **Triangle / polygon** (direction, tension, geometric mass)
- **Arc** — 90°–270° circle segment (horizons, archways, partial ranges)
- **Half-circle** (ground, dome, top of a form)
- **Soft blob** (atmospheric mass when not a Field)

### Layer 3 — Treatments (how shapes are rendered)

- **Filled** — default, primary content
- **Outlined** — ghost / context / negative space
- **Halo** — soft radial light wrapping a focal element. Depth without shadow.
- **Layered** — multiple shapes stacked at varying opacity for depth

### Layer 4 — Palette & ratio

Brand palette only. 60 / 20 / 10 / 10 ratio (Canvas / Cloud / Ink+Pewter / Spectrum).
One spectrum hero per composition; supporting colours at lower opacity. Pewter for ghost / context. Paper `#FAF8F2` for Editorial surfaces.

**Spectrum:** Cobalt `#4271DF` · Teal `#00B6A0` · Amber `#E19000` · Rose `#F24260`
**Neutrals:** Canvas `#FDFDFB` · Cloud `#F4F4F1` · Pewter `#97979E` · Ink `#18181C` · Paper `#FAF8F2`
**Bridge:** Cobalt Wash `#EDF0F8` · Teal Mist `#E6F5F3` · Amber Stone `#F5F0E6` · Rose Blush `#FDF0F2`

---

## The seven craft moves

These are the techniques that distinguish polished composition from stacked primitives:

1. **Arc** — the Bézier's geometric sibling.
2. **Halo** — soft radial wash behind a focal Dot or Cluster.
3. **Painterly Field** — Field upgraded from flat radial to two-or-more-tone overlapping radials. Atmosphere with depth.
4. **Spectrum Band** — painterly streak through Cobalt → Teal → Amber → Rose. Backdrop or subject.
5. **Translucent Plate** — soft-cornered rectangle at 40–70% opacity in Cloud or a Bridge tint. Editorial structure.
6. **Keyline Rule** — 0.5–1px Pewter hairline. Editorial composition skeleton.
7. **Hand-imperfect Mark** — exactly one subtle imperfection per composition (slightly off-round dot, a curve with a tremor). The human signature.

Plus **Paper Grain** (SVG noise filter at 4–7% opacity) for Editorial Geometry surfaces only.

---

## Prompt A — Editorial Geometry (brand / marketing surfaces)

Use for: homepage hero, About / story / mission, blog headers, press, brand-guide section opens.

```
Modern editorial illustration in the Spectrea brand system.
Style: Editorial Geometry — flat geometric shapes on warm paper,
Stripe Press / Pelican classics / MIT Press lineage. Calm,
intellectual, generous white space.

VOCABULARY — use atoms (Dots, Curves, Clusters, Trails, Fields)
and Forms (rounded rectangles, arcs, half-circles, triangles)
together. Every composition includes at least one Atom and at
least one Form.

CRAFT MOVES — apply several of:
- Arc (the Bézier's geometric sibling, used as horizon or partial sweep)
- Halo (soft radial wash behind the focal element)
- Painterly Field (two-or-more-tone overlapping radial washes)
- Translucent Plate (soft-cornered rectangle framing a cluster)
- Keyline Rule (thin Pewter hairlines at the composition margins)
- One Hand-imperfect mark (a slightly off-round dot, one visible irregularity)
- Paper Grain (subtle noise texture over the paper ground)

PALETTE (exact hex codes — use ONLY these):
Spectrum:  Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
Neutrals:  Canvas #FDFDFB · Cloud #F4F4F1 · Pewter #97979E · Ink #18181C · Paper #FAF8F2
Bridge:    Cobalt Wash #EDF0F8 · Teal Mist #E6F5F3 · Amber Stone #F5F0E6 · Rose Blush #FDF0F2

USAGE:
- Background: warm Paper #FAF8F2 with a Painterly Field wash over it
  (two radials — one Amber Stone, one Cobalt Wash).
- One spectrum hero colour per composition; others appear at low opacity.
- Serif headline type in Ink, monospace metadata in Pewter (uppercase,
  letter-spacing 0.1em).
- Editorial keyline rules at page margins.

COMPOSITION:
- Rule-of-thirds or golden-ratio layout. Asymmetric balance.
- Generous negative space; single focal accent.
- Hint at the brand mark's soft Bézier curve somewhere in every composition.

THE CONNECTION TO THE BRAND MARK:
The Spectrea logo mark is 10 dots along a soft Bézier curve, the last 3
trailing. Every illustration echoes that curve — in an arc, a connecting
line, a horizon, or a quoted small mark.

RENDERING:
- Flat filled shapes. No 3D, no isometric, no perspective.
- Gradients only on Field backgrounds and the optional Spectrum Band.
- No drop shadows, glows, lens flares.
- Paper grain texture is the only permitted surface effect.

SUBJECT: [INSERT]

AVOID:
- Neon, magenta, cyan, bright yellow, pastel pink
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows, bevels
- Mascots, anthropomorphic objects, cartoon characters
- Figurative human imagery (use the Bauhaus specialisation below)
- Overcrowded scenes

OUTPUT: 16:9, Editorial Geometry aesthetic, warm paper ground,
serif typography-ready composition. Every element either an atom,
a form, or one of the seven craft moves — nothing else.
```

---

## Prompt B — Living Graph (product / explanation surfaces)

Use for: product feature pages, docs hero, "how it works" diagrams, onboarding, in-product loading and empty states.

```
Modern product illustration in the Spectrea brand system.
Style: Living Graph — dense node + edge compositions with depth
and atmosphere, Vercel / Linear lineage applied to Spectrea's
graph metaphor. Alive, growing, compounding.

VOCABULARY — primarily atoms (Dots, Curves, Clusters, Trails, Fields).
Forms (rectangles, arcs) appear when needed for structural elements
(a screen frame, a horizon). Figures use the SpectreaFigure
specialisation if human presence is required.

CRAFT MOVES — apply several of:
- Painterly Field (multiple overlapping radial washes; on dark Ink,
  use localised spectrum-tint halos rather than background washes)
- Halo (soft radial behind the focal Dot or Cluster)
- Arc (the brand-mark curve quoted across the full composition)
- Layered density — at least three opacity tiers: sparse far galaxy
  (0.15–0.3), mid texture (0.4–0.7), anchor dots (1.0)
- One Hand-imperfect mark per composition

PALETTE (exact hex codes — use ONLY these):
Spectrum:  Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
Neutrals:  Canvas #FDFDFB · Cloud #F4F4F1 · Pewter #97979E · Ink #18181C
Bridge:    Cobalt Wash #EDF0F8 · Teal Mist #E6F5F3 · Amber Stone #F5F0E6 · Rose Blush #FDF0F2

USAGE:
- Background: Canvas (light variant) OR Ink (dark variant).
- Dense composition — 30–120+ elements across density tiers.
- One spectrum colour as the focal anchor; others orbit at lower opacity.
- Pewter for ghost / context dots that don't participate in the focal story.

COMPOSITION:
- Centre-of-gravity layout with a single anchor dot (often haloed).
- Multiple clusters arranged around the anchor.
- Long inter-cluster curves that echo the brand mark's Bézier gesture at scale.
- Atmospheric perspective: distant elements smaller, fainter, lower contrast.

THE CONNECTION TO THE BRAND MARK:
Every composition quotes the brand mark's curve at three scales — the
wide background sweep, the connecting paths between clusters, and the
orbits around the anchor.

RENDERING:
- Flat filled shapes. No 3D, no isometric, no perspective.
- Gradients allowed on Field backgrounds and on spectrum-coloured focal halos.
- No drop shadows (halos replace them).
- No paper grain on dark-background variants; optional on light variant.

SUBJECT: [INSERT]

AVOID:
- Neon, magenta, cyan, bright yellow, pastel pink
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows beyond the Halo treatment
- Mascots, anthropomorphic objects, cartoon characters
- Figurative human imagery (use the Bauhaus specialisation below)
- Sparse compositions — Living Graph is meant to be dense

OUTPUT: 16:9, Living Graph aesthetic, dense and alive, every element
either an atom, a form, or one of the seven craft moves — nothing else.
```

---

## How to use

1. Decide the surface first:
   - Brand / marketing → **Prompt A** (Editorial Geometry)
   - Product / explanation → **Prompt B** (Living Graph)
2. Copy the appropriate prompt block.
3. Replace `[INSERT]` with a one-sentence description of the subject (e.g., *"a knowledge graph emerging from scattered documents"* or *"a team discovering connections across departments"*).
4. Paste into an AI image generator (Gemini, DALL-E / Bing Image Creator, Adobe Firefly, Stable Diffusion).
5. Vectorise the raster output with Inkscape (Path → Trace Bitmap).
6. Drop the SVG into `/public/illustrations/`.

---

## Specialisation — human / team imagery (Bauhaus)

When an illustration needs to depict people explicitly (about page, team photo, customer story), use the **Bauhaus specialisation** — the `SpectreaFigure` component.

- Each person = a head Dot + a torso Form (rounded rectangle) + arm/leg Forms, in one brand colour.
- Multiple people = a cluster of these figures, optionally connected by thin Pewter curves.
- Standing pose only — pose articulation is out of scope for hand-coded SVG.
- For scenes needing pose articulation (person at desk, gesture, conversation with body language), generate via AI-gen with this prompt.

Bauhaus figures are a **Layer-2 Form-layer construct** wrapped in Layer-1 atoms (head dot, hand dots, idea Trail, Field halo). Same system, different specialisation.

---

## Per-generator tweaks

- **Gemini / DALL-E / Bing Image Creator**: prose prompts above work as-written.
- **Stable Diffusion**: convert to comma-separated tokens with weights, e.g.
  `(Spectrea Editorial Geometry:1.4), (flat geometric shapes paper ground:1.3), (Stripe Press Pelican lineage:1.2), (palette #4271DF #00B6A0 #E19000 #F24260 on paper #FAF8F2:1.3), (serif headline monospace metadata:1.1)…`
- **Adobe Firefly**: pair the prompt with a reference-image upload of an existing on-brand illustration. Once you have one strong illustration in each style, use them as style anchors for subsequent generations.

---

## Tools that are free + commercial-safe

Verified against primary sources:

| Tool                          | Free tier commercial? | Notes                                            |
| ----------------------------- | --------------------- | ------------------------------------------------ |
| Gemini (consumer + API)       | ✅ Yes                | Google doesn't claim ownership; SynthID watermark |
| Bing Image Creator (DALL-E 3) | ✅ Yes                | No indemnification                               |
| Adobe Firefly free            | ✅ Yes                | No indemnification; cleaner training data        |
| Stable Diffusion (local)      | ✅ Yes                | Legally cleanest; needs a GPU                    |
| Recraft free                  | ❌ No                 | Paid plan required for commercial use            |
| Midjourney                    | ❌ No                 | No free tier                                     |

---

## Consistency tips

1. **Fix the seed** when the generator exposes it — same seed + same prompt = deterministic output.
2. **Generate 4 variants**, pick the best, image-to-image it with the same prompt to tighten drift.
3. **Upload a reference image** once you have one on-brand illustration per style — use it as the style anchor for every subsequent generation.
4. **Keep the Subject line one sentence** — long subject descriptions cause the model to free-associate elements outside the vocabulary.
5. **Reject any output that introduces shapes outside the vocabulary.** Triangles are OK (Layer 2 Form). Mascots, line art, skeuomorphic 3D, neon — all off-brand. Regenerate.
6. **When output looks primitive, add craft moves.** Layered density, halos, painterly fields, one hand-imperfection. Density at 30–120+ elements is what separates "diagram" from "illustration."

---

## Reference URLs

- **Editorial Geometry reference:** [Stripe Press](https://press.stripe.com/), [Yuin Chien's Stripe Press portfolio](https://yuinchien.com/p/stripe-press), MIT Press, Fitzcarraldo Editions
- **Living Graph reference:** [Vercel](https://vercel.com/), [Linear](https://linear.app/)
- **Warmth strategy (not technique):** [Anthropic brand guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md), [Geist – Anthropic case study](https://geist.co/work/anthropic) — steal the paper-ground + single-warm-accent + editorial-register approach; do NOT copy their hand-drawn technique

---

## Versioning

**v3 (2026-04-18, late)** — adds the Form layer, Treatments, seven craft moves, and pairs two production styles (Editorial Geometry + Living Graph). Named the channel model (in-house / AI-gen / designer / Canva). See `docs/superpowers/specs/2026-04-18-illustration-system-v3-design.md` for the full rationale.

**v2 (2026-04-18, early)** — Dot System with five atoms. Retained as a proper subset of v3. Strict-five-atoms-only compositions (from v2) are still valid at small scale (vocabulary cards, in-product moments, system diagrams); v3 adds the vocabulary needed to compose larger illustrations without reading as primitive.

**v1** — Linear/Stripe-reference prompt. Retired in v2.
