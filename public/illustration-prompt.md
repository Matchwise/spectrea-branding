<!-- DO NOT EDIT — published copy of docs/illustration-prompt.md (the source); edit that file and run npm run generate:ai. DO NOT EDIT — generated from src/data/brand.ts by scripts/generate-ai-formats.mjs (2026-08-11) -->

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
> **Usage loop.** Paste the prompt into your image generator. Replace
> the `SUBJECT` line with a single sentence describing the scene — that
> line sits at the top of the prompt so every downstream rule attaches
> to something concrete. Evaluate against the checklist. Once one output
> lands, save it as the reference image and attach it as a style anchor
> for every subsequent generation.
>
> **What this prompt is not.** It is not a subject guide. Choosing which
> scenarios to illustrate is an editorial decision separate from the style.
> Keep those lists in briefs and content plans, not in the render prompt.

---

## The universal prompt

Paste the block below into your image generator. Replace the `SUBJECT` line with one sentence describing what you want rendered. Leave everything else verbatim.

```
Generate the following image. Render it directly — do not describe or summarise it in text.

SUBJECT
[One sentence describing the scene. Example: "A person at a desk reviewing notes by a window at dawn."]

STYLE
Modern editorial illustration, flat with subtle depth. Filled shapes only — zero outlines, strokes, or line art. Composed, warm, clean. Reference aesthetic: Linear.app + Stripe brand illustration, slightly warmed.

PALETTE (use ONLY these hex and their tints)
• Primary   Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
• Neutral   Ink #18181C · Pewter #97979E · Cloud #F4F4F1 · Canvas #FDFDFB · Paper #FAF8F2
• Skin      #E8C7A0 (light) · #B8835A (mid) · #6B4423 (deep)

COLOUR RULES
• One hero primary dominates — full-saturation on focal elements. Other primaries appear as supporting tints or small accents. Never four primaries at full saturation.
• Every element carries colour. Supporting elements use 20–60% opacity tints of the primaries — never default to pure neutrals or pure tints.
• Pewter and Cloud are structural only (dividers, thin edges); they are not default fills.
• Background: Canvas #FDFDFB (preferred), Paper #FAF8F2 for a warmer ground, or a soft gradient between two palette values.

COMPOSITION
• Balanced in BOTH visual weight AND colour. Asymmetric balance — rule-of-thirds or diagonal flow. Not centred, not symmetrical.
• Element density fits the subject — rich enough to feel composed, uncluttered enough to read clearly.
• No large empty neutral areas.

SHAPE VOCABULARY (both modes always present)
• Geometric: circles, rectangles, triangles, arcs, half-circles.
• Organic: soft contours, flowing curves, rounded blobs.
• Geometric content ≥ ~15% of the coloured area, even for nature / soft subjects — achieved through framing edges, ground planes, horizon lines, or atmospheric fields. Do not invent unrelated objects to hit this floor.

RENDERING
• Filled shapes only. Zero strokes, outlines, or line art.
• Soft gradient permitted on background fields only.
• Rounded organic objects get one darker tonal step on the shadow side (one deeper value of the same fill colour). No object-level gradients, drop shadows, or glows.
• Figures: clean silhouette, flat-block clothing in palette colours, simple hair, face suggested only (≤ one dot per eye, or blank). Never detailed facial features.

AVOID
Outlines · strokes · borders · line art · photorealism · 3D · isometric projection · drop shadows · glows · lens flares · textures · noise · grain · hatching · neon · magenta · cyan · bright yellow · pastel pink · detailed facial features · overcrowded scenes · large empty neutral areas · watermarks · text overlays · mascot characters · anthropomorphic objects.

OUTPUT
16:9 aspect ratio, approachable mood, cohesive palette, every element carrying colour.
```

### Why this structure

- **Intent line first.** General chat models (Gemini, ChatGPT, Claude) can otherwise interpret a structured block as *analyse this* rather than *render this*. The opening line names the action and tells the model to output the image, not a description of it. Dedicated image-gen UIs (Firefly, Midjourney, DALL-E direct) treat it as harmless framing.
- **Subject second.** Image-generation models weight early tokens more heavily; leading with the subject (right after the intent) lets every downstream rule attach to something concrete.
- **Sections as stable contracts.** `STYLE` / `PALETTE` / `COLOUR RULES` / `COMPOSITION` / `SHAPE VOCABULARY` / `RENDERING` / `AVOID` / `OUTPUT` are fixed; swap `SUBJECT` between generations and the rest of the prompt stays byte-identical — that's what makes outputs read as one family.
- **Positive rules before negative.** Constraints that *shape* the output come first; things to avoid are consolidated at the end.
- **Hex codes, exact percentages, concrete references.** No "nice colours" or "some depth" — every constraint is machine-unambiguous.
- **One idea per bullet.** Scannable for the human editing the prompt, tokenisable for the model.

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

- **Gemini / DALL-E / Bing Image Creator**: prompt above works as-written. Lead with the SUBJECT line, keep the rest verbatim.
- **Stable Diffusion**: convert to comma-separated weighted tokens, subject first:
  `[subject sentence], (Spectrea brand flat editorial:1.4), (filled shapes no outlines:1.3), (palette #4271DF #00B6A0 #E19000 #F24260 on Canvas #FDFDFB:1.3), (one hero primary tints supporting:1.2), (Linear Stripe aesthetic warmed:1.1)…` — use a negative prompt for the AVOID list.
- **Adobe Firefly**: pair the prompt with a reference-image upload once you have one on-brand output to anchor the style. Place the subject sentence in the main prompt; leave the rules in a secondary "style" field if the generator separates them.
- **Midjourney**: put the SUBJECT in plain prose, then append the rules as `--style` parameters where supported, and use `--cref` to anchor an approved reference image.

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

**v4.1 (2026-04-20)** — Same rules, re-ordered for prompt-engineering
discipline. Explicit intent line at the very top (*"Generate the
following image. Render it directly…"*) so general chat models like
Gemini / ChatGPT / Claude don't interpret the structured block as a
request to analyse rather than render. SUBJECT moves directly after
(early tokens carry the most weight); sections become fixed, parallel,
scannable contracts; positive rules precede negative; AVOID consolidates
as a single pipe-separated list; OUTPUT anchors the tail. No rule
changes — outputs should match v4.0 exactly, but the prompt is now
easier to edit, reason about, and port between generators. (One
iteration inside v4.1 restored three clauses accidentally dropped
during condensation: "full-saturation on focal elements" on the hero-
primary rule, "or pure tints" on the supporting-element guard, and
"balanced in BOTH visual weight AND colour" on composition. Kept as a
note so future re-orders don't lose them again.)

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
