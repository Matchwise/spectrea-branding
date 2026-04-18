# Spectrea Illustration Prompt — Dot System v2

> Versioned prompt template for generating on-brand illustrations with AI
> image-generation tools (Gemini, DALL-E / Bing Image Creator, Adobe
> Firefly, Stable Diffusion).
>
> **The system:** every Spectrea illustration assembles from five primitives
> (Dot, Curve, Cluster, Trail, Field), in the brand palette, on a Canvas
> ground. The brand mark *is* this system at small scale; illustrations
> extend it at larger scale. No exceptions, no decorative elements outside
> the five primitives.
>
> Paste the prompt below and replace `[INSERT]` with your subject.

---

## The five atoms

1. **Dot** — filled circle in a brand colour. The fundamental unit. A point of attention. Stand it for whatever the illustration needs it to stand for.
2. **Curve** — a soft Bézier line that connects. The relationship between two things. Same flowing feel as the Spectrea mark.
3. **Cluster** — a group of dots in proximity (3–8 dots). Things that belong together. A whole made of parts. Optionally wired with curves.
4. **Trail** — a sequence of dots in directional order, typically with increasing opacity or size from earliest (faint) to latest (full). Movement through time. The path from then to now.
5. **Field** — a soft tinted radial or linear wash using one bridge tone (Cobalt Wash `#EDF0F8`, Teal Mist `#E6F5F3`, Amber Stone `#F5F0E6`, or Rose Blush `#FDF0F2`). Atmospheric depth — the air around the subject, never the subject itself.

That's the entire vocabulary. Anything not assembled from these atoms is off-brand.

---

## Prompt

```
Modern editorial illustration in the Spectrea Dot System.
Filled shapes only — NO outlines, NO borders, NO strokes, NO line art.

VOCABULARY — assemble the illustration from ONLY these five primitives:
1. Dots — filled circles in brand colours. Points of attention; stand them for whatever the subject needs.
2. Curves — soft Bézier lines that connect. Relationships between things.
3. Clusters — groups of 3–8 dots in proximity. Things that belong together; a whole made of parts.
4. Trails — sequences of dots in directional order, opacity or size increasing
   from earliest (faint) to latest (full). Movement through time; the path from then to now.
5. Fields — soft radial or linear washes in a bridge tone. The air around the subject; never the subject itself.

Do NOT introduce any other shapes (no rectangles unless serving as a structural
frame, no triangles, no organic blobs, no abstract forms, no figurative art).
Do NOT use line art, outlines, strokes, or wireframe.

PALETTE (Spectrea brand, exact hex codes — use ONLY these):
Spectrum:  Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
Bridge:    Cobalt Wash #EDF0F8 · Teal Mist #E6F5F3 · Amber Stone #F5F0E6 · Rose Blush #FDF0F2
Neutrals:  Ink #18181C · Pewter #97979E · Cloud #F4F4F1 · Canvas #FDFDFB

USAGE:
- Background: Canvas, or a soft Field gradient (radial bridge-tone wash on Canvas).
- Dots: full-opacity spectrum colours for primary subjects;
  20–60% opacity tints of spectrum colours for supporting / mid-ground;
  Pewter for ghost / context dots.
- Curves: thin Pewter strokes at 30–50% opacity for supporting connections;
  thicker spectrum-coloured strokes for emphasised relationships.
- Trails: same dot, repeated 4–6 times along a path, opacity 20% → 100%.

COMPOSITION:
- Asymmetric balance via rule-of-thirds or diagonal flow.
- Element count fits the subject — rich enough to feel composed,
  uncluttered enough to read clearly.
- Every illustration should feel like a fragment of a knowledge graph
  caught in the middle of growing — alive, breathing, expanding.

THE CONNECTION TO THE BRAND MARK:
The Spectrea logo mark is itself a Dot System composition: 10 dots along a
soft Bézier curve, the last 3 unconnected (the "about-to-connect" moment).
Every illustration extends this same DNA at a larger scale. Hint at the
mark's curve in at least one element of every composition.

RENDERING:
- Filled shapes only. No strokes on dots themselves. Curves can be strokes.
- Soft gradient allowed on Field backgrounds only.
- No drop shadows, no glows, no lens flares.
- No textures, no noise, no grain, no hatching.
- No 3D, no isometric, no perspective. Flat.

SUBJECT: [INSERT]

AVOID:
- Outlines on dots, borders, line-art rendering
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows, lens flares
- Textures, noise, grain, hatching
- Off-brand colours (neon, magenta, cyan, bright yellow, pastel pink)
- Figurative human imagery (use clusters of dots as abstracted people if
  human presence is needed — see Tier B specialisation below)
- Overcrowded scenes
- Mascots, anthropomorphic objects, generic productivity imagery
- Watermarks, text overlays

OUTPUT: 16:9, Spectrea Dot System aesthetic, warm and alive, every element
either a dot, a curve, a cluster, a trail, or a field — nothing else.
```

---

## How to use

1. Copy the prompt block above.
2. Replace `[INSERT]` with a one-sentence description of the subject (e.g.,
   *"a knowledge graph emerging from scattered documents"* or *"a team
   discovering connections across departments"*).
3. Paste into an AI image generator (Gemini, DALL-E / Bing Image Creator,
   Adobe Firefly, Stable Diffusion).
4. Vectorise the raster output with Inkscape (Path → Trace Bitmap).
5. Drop the SVG into `/public/illustrations/`.

---

## Specialisation — human / team imagery

When an illustration needs to depict people (about page, team photo,
customer story), use the **Bauhaus distillation** of the Dot System:

- Each person = a head dot + a torso shape (soft rounded form), in one
  brand colour.
- Multiple people = a cluster of these figures, with thin Pewter curves
  optionally connecting them (their "shared graph").
- The same composition rules apply (rule-of-thirds, asymmetric balance,
  no decorative elements outside the system).

This is the existing Bauhaus figure component (`SpectreaFigure.tsx`)
reframed as a Dot System specialisation — the figures are clusters of
dots and shapes in brand colours, connected by curves of the same DNA
as the rest of the system.

---

## Per-generator tweaks

- **Gemini / DALL-E / Bing Image Creator**: prose above works as-written.
- **Stable Diffusion**: convert to comma-separated tokens with weights, e.g.
  `(Spectrea Dot System illustration:1.4), (filled circles dots only:1.3),
  (no outlines no line art:1.4), (palette #4271DF #00B6A0 #E19000 #F24260
  on canvas #FDFDFB:1.3), (knowledge graph composition:1.2)…`
- **Adobe Firefly**: pair the prompt with a reference-image upload of an
  existing on-brand Dot System illustration to lock the style. Once you
  have one strong illustration, use it as the style anchor for every
  subsequent generation.

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

1. **Fix the seed** when the generator exposes it (Stable Diffusion,
   Leonardo) — same seed + same prompt = deterministic output.
2. **Generate 4 variants**, pick the best, image-to-image it with the
   same prompt to tighten drift.
3. **Upload a reference image** once you have one on-brand illustration —
   use it as the style anchor for every subsequent generation. A
   composition library will be built post-launch as on-brand outputs
   accumulate.
4. **Keep the Subject line one sentence** — long subject descriptions
   cause the model to free-associate extra elements outside the
   five-atom vocabulary.
5. **Reject any output that introduces shapes outside the five atoms.**
   The Dot System is the entire vocabulary. Triangles, abstract blobs,
   wireframes, line art, mascots — all off-brand. Regenerate.

---

## Versioning

This is the v2 prompt (Dot System), replacing the v1 Linear/Stripe-reference
prompt. v2 commits to a finite primitive vocabulary anchored to the Spectrea
brand mark, rather than imitating an external aesthetic. See
`docs/superpowers/specs/2026-04-18-brand-iteration-v2-design.md` Decision 6
for the rationale.
