# Spectrea Illustration Prompt — v4

> Universal, subject-agnostic prompt template for generating on-brand
> illustrations with AI image-generation tools (Gemini, DALL-E / Bing
> Image Creator, Adobe Firefly, Stable Diffusion, Imagen).
>
> **Intent.** A pure visual-identity spec. The prompt controls **how**
> anything is rendered — palette, composition, depth, shape vocabulary,
> figure treatment. It does **not** dictate **what** appears in the scene.
> Subject comes entirely from the `SUBJECT:` line. Same prompt works for a
> person at a desk, a city skyline, a data dashboard, a kitchen scene, or
> an abstract concept.
>
> **Usage loop.** Paste the prompt into your image generator. Fill the
> `SUBJECT:` line with a single sentence describing the scene. Evaluate
> against the checklist. Once one output lands, save it as the reference
> image and attach it as a style anchor for every subsequent generation.
>
> **What this prompt is not.** It is not a subject guide. Choosing which
> scenarios to illustrate is an editorial decision separate from the style.
> Keep those lists in briefs and content plans, not in the render prompt.

---

## The universal prompt

```
Modern editorial illustration, flat with subtle depth.
Filled shapes only — NO outlines, NO borders, NO strokes, NO line art.

PALETTE (Spectrea brand, exact hex codes — use ONLY these and their tints):
  Primary:  Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
  Neutrals: Ink #18181C · Pewter #97979E · Cloud #F4F4F1 · Canvas #FDFDFB · Paper #FAF8F2
  Skin:     #E8C7A0 (light) · #B8835A (mid) · #6B4423 (deep)

TINTS — use lighter opacity versions (20–60%) of the primary colours liberally
for supporting elements, mid-ground forms, atmospheric depth, and soft washes.
Do NOT default supporting elements to pure neutrals or pure tints — that leaves
the composition unbalanced and drab.

BACKGROUND comes from the palette — a single neutral (Canvas #FDFDFB
preferred, Paper #FAF8F2 when a slightly warmer ground is wanted), or a
soft gradient between two palette values. Pewter and Cloud are structural
only — not default fills.

COMPOSITION:
- Balanced in BOTH visual weight AND colour. Every element carries colour —
  full-saturation primary for focal elements, tints of the primaries for
  supporting elements. Avoid large empty neutral areas.
- Asymmetric balance via rule-of-thirds or diagonal flow.
- One hero primary colour dominates; the other primaries appear as supporting
  tints or small accents. Not all four primaries at full saturation.
- Element count fits the subject — rich enough to feel composed, uncluttered
  enough to read clearly.

SHAPE VOCABULARY — both modes always present:
- Basic geometric primitives (circles, rectangles, triangles, arcs, half-circles)
- Organic curved shapes (soft contours, flowing lines, rounded forms, blobs)
- Every composition contains both. Exact proportion follows the subject,
  but geometric content is never below ~15% of the coloured area — even in
  nature / soft / organic subjects, structural geometry (framing edges,
  ground planes, horizon lines, background fields) keeps the composition
  anchored.
- Do not invent objects unrelated to the subject in order to hit the minimum —
  introduce geometry through compositional / atmospheric means.

RENDERING:
- Filled shapes only. No strokes, outlines, or line art.
- Soft gradient allowed on background fields only.
- On rounded organic objects, a single darker tonal step on the shadow side
  (one deeper value of the same fill colour). No soft gradients on objects
  themselves — just the one crisp tonal step.
- Figures (when present in the subject): clean silhouette, flat-block clothing
  in palette colours, simple hair, suggested face only (one dot per eye or
  blank). No detailed facial features.

REFERENCE: Linear.app + Stripe brand illustration aesthetic — composed,
full of life, clean. Not editorial-typographic old. Not Storyset-clipart.

SUBJECT: [one sentence describing the scene]

AVOID:
- Outlines, strokes, borders, line-art rendering
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows, lens flares
- Textures, noise, grain, hatching
- Off-brand colours (neon, magenta, cyan, bright yellow, pastel pink)
- Detailed facial features — suggested shapes only
- Overcrowded scenes
- Large empty neutral areas — use tints to balance colour
- Watermarks, text overlays, mascot characters, anthropomorphic objects

OUTPUT: 16:9, approachable mood, cohesive palette, every element carrying
colour.
```

---

## Warmth + palette checklist

An output ships only if it hits **all** of these:

1. **Zero outlines.** Not a single stroke anywhere.
2. **Every element carries colour.** No element defaults to pure neutral fill.
   Background and mid-ground forms use tints of primaries.
3. **One hero primary.** A single spectrum colour dominates; the others appear
   as supporting tints or accents.
4. **Subtle depth.** At least one rounded object has a single darker tonal step
   on its shadow side. Not soft gradients. Not drop shadows.
5. **Both modes present.** Geometric shapes never drop below ~15% of the
   composition. Organic shapes always present too. Proportion above the floor
   follows the subject.
6. **Coloured ground.** Background is a palette neutral or palette gradient —
   not pure white, not pure grey.
7. **No face detail.** A face is a suggestion (one dot per eye max, or blank).
8. **Asymmetric balance.** Not centred, not symmetrical.

**Reject conditions** (regenerate if any is true):

- Any outline, stroke, or line-art edge
- Neutral grey backdrop or supporting forms
- Pure white or cool grey background
- Four-colour confetti (all primaries shouting at once)
- Faces with irises, noses, mouths, or expressions

---

## Iteration protocol

1. Write the subject — one sentence describing the scene. The subject can be
   literally anything. The prompt does not constrain it.
2. Paste the prompt into your image generator.
3. Generate 4 variants.
4. Score against the checklist. If 0 of 4 pass, identify which rule the model
   ignored, add emphasis or a concrete example in that section, regenerate.
5. Once one output lands, save it as the **reference image** and attach it as
   a style anchor for every subsequent generation (Firefly reference upload,
   Gemini "use this style", Midjourney `--cref`, etc.).
6. Vectorise the raster (Inkscape → Path → Trace Bitmap) and drop into
   `/public/illustrations/`. Any stroke that sneaks in during trace — delete.

---

## Division of labour — image-gen vs. hand-SVG

The v4 prompt owns **mid- and higher-complexity illustration**: marketing
heroes, feature-page illustrations, blog headers, About imagery, onboarding
scenes, social posts.

Hand-coded SVG is reserved for **very basic, simple, direct primitives**:

- **Graph primitives** — node types, edge styles, cluster, trail, confidence,
  highlight. Pure data-viz vocabulary.
- **Section dividers** — spectrum band, dot rule, arc divider.
- **In-product state dots** — connection-formed, item-arrived, notification
  badge, AI-just-acted, loading skeleton, empty-state dots.
- **Painterly-field backdrop** — reusable SVG atmosphere.
- **Thread / constellation** — lightweight two-dot / anchor-plus-orbit
  primitives.

Rule of thumb: if the piece would fit in a 120×90px brand-guide vocabulary
card, hand-SVG. If it wants to be a 16:9 scene, image-gen.

---

## Companion: editorial subject guidance (separate from the prompt)

Not every prospective illustration subject is equally on-brand. That editorial
judgement happens **before** the prompt, not inside it. A short suggested set
of subjects worth revisiting across the brand — useful for content planning,
**not** for injecting into every render:

- People working, collaborating, thinking, discovering
- Hands, desks, home, office, outdoor moments
- Knowledge objects: books, documents, cards, notes, threads
- Light, warmth, growth, atmosphere — lanterns, plants, windows, sunrise
- Abstract compositions — constellations, trails, paths, doorways

Treat this as a content brief for humans picking subjects. The render prompt
itself stays subject-agnostic.

---

## Per-generator tweaks

- **Gemini / DALL-E / Bing Image Creator**: prose prompt above works as-written.
- **Stable Diffusion**: convert to comma-separated tokens with weights, e.g.
  `(Spectrea brand flat editorial:1.4), (filled shapes no outlines:1.3),
  (palette #4271DF #00B6A0 #E19000 #F24260 on Paper #FAF8F2:1.3),
  (one hero primary tints supporting:1.2), (Linear Stripe aesthetic warmed:1.1)…`
- **Adobe Firefly**: pair the prompt with a reference-image upload once you
  have one on-brand output to anchor the style.

---

## Tools that are free + commercial-safe

| Tool                          | Free tier commercial? | Notes                                            |
| ----------------------------- | --------------------- | ------------------------------------------------ |
| Gemini (consumer + API)       | ✅ Yes                | Google doesn't claim ownership; SynthID watermark |
| Bing Image Creator (DALL-E 3) | ✅ Yes                | No indemnification                               |
| Adobe Firefly free            | ✅ Yes                | No indemnification; cleaner training data        |
| Stable Diffusion (local)      | ✅ Yes                | Legally cleanest; needs a GPU                    |
| Recraft free                  | ❌ No                 | Paid plan required for commercial use            |
| Midjourney                    | ❌ No                 | No free tier                                     |

---

## Versioning

**v4 (2026-04-18 → 2026-04-19)** — Universal, subject-agnostic prompt. One
template for every surface. Key moves: tint discipline (supporting elements
use 20–60% tints of primaries, never default to neutrals), single darker
tonal step for subtle depth, geometric floor ~15% to keep organic scenes
anchored, no facial detail, Linear/Stripe warmed reference. Retires v3's
two-style split (Editorial Geometry + Living Graph) and the ten-noun
"recurring subject cast" that was biasing every render toward the same
metaphor set.

**v3 (2026-04-18, late)** — Added the Form layer, Treatments, seven craft
moves, and paired two production styles (Editorial Geometry + Living Graph).
Retired in v4 because the two-style split added rules without adding voice,
and the "recurring subject cast" was prescribing content not style.

**v2 (2026-04-18, early)** — Dot System with five atoms. Superseded by v3.

**v1** — Linear/Stripe-reference prompt. Retired in v2.
