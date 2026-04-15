# Spectrea Illustration Prompt

> Versioned prompt template for generating on-brand illustrations with AI
> image-generation tools (Gemini, DALL-E / Bing Image Creator, Adobe
> Firefly, Stable Diffusion). Paste the prompt below and replace
> `[INSERT]` with your subject.

---

## Prompt

```
Modern editorial illustration, flat with subtle depth.
Filled shapes only — NO outlines, NO borders, NO strokes, NO line art.

Palette (Spectrea brand, exact hex codes — use ONLY these and their tints):
Primary:  Cobalt #4271DF · Teal #00B6A0 · Amber #E19000 · Rose #F24260
Neutrals: Ink #18181C · Pewter #97979E · Cloud #F4F4F1 · Canvas #FDFDFB

TINTS — use lighter opacity versions (20–60%) of the primary colours
liberally for supporting elements, mid-ground forms, atmospheric depth,
and soft washes. Do NOT default supporting elements to pure neutrals —
that leaves the composition unbalanced and drab.

Background is Canvas, or a soft vertical gradient between a neutral
and a light primary tint. Pewter and Cloud appear only for structural
accents or distant recessed elements, never as the default fill.

Composition:
- Balanced in BOTH visual weight AND colour. Every element carries
  colour — full-saturation primary for focal elements, tints of the
  primaries for supporting elements. Avoid large empty neutral areas.
- Asymmetric balance via rule-of-thirds or diagonal flow
- Element count fits the subject — rich enough to feel composed,
  uncluttered enough to read clearly

Shape vocabulary — balanced mix:
- Basic geometric primitives (circles, rectangles, triangles, arcs)
- Organic curved shapes (soft contours, flowing lines, rounded forms)
- Both live side by side — geometry for structured subjects,
  organic for natural / soft subjects, mixed freely

Rendering:
- Filled shapes only. No strokes, outlines, or line art.
- Soft gradient allowed on background fields only.
- On rounded organic objects, a single darker tonal step on the
  shadow side. No soft gradients on objects themselves.
- Figures (when present): clean silhouette, flat-block clothing in
  palette colours, simple hair, suggested face only.

Reference: Linear.app and Stripe brand illustration aesthetic — warm,
composed, full of life, clean.

Subject: [INSERT]

Avoid:
- Outlines, strokes, borders, line-art rendering
- Photorealism, 3D rendering, isometric projection
- Drop shadows, glows, lens flares
- Textures, noise, grain, hatching
- Off-brand colours (neon, magenta, cyan, bright yellow, pastel pink)
- Detailed facial features — suggested shapes only
- Overcrowded scenes
- Large empty neutral areas — use tints to balance colour
- Watermarks, text overlays, mascot characters, anthropomorphic objects

Output: 16:9, warm approachable mood, cohesive vibrant palette, every
element carrying colour.
```

---

## How to use

1. Copy the prompt block above
2. Replace `[INSERT]` with a one-sentence description of the subject
3. Paste into an AI image generator
4. Vectorise the raster output with Inkscape (Path → Trace Bitmap)
5. Drop the SVG into `/public/illustrations/`

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

## Per-generator tweaks

- **Gemini / DALL-E / Bing**: prose above works as written
- **Stable Diffusion**: convert to comma-separated tokens with weights, e.g. `(flat editorial illustration:1.3), (palette #4271DF #00B6A0 #E19000 #F24260:1.4), (filled shapes no outlines:1.3)…`
- **Adobe Firefly**: pair the prompt with a reference-image upload of an existing on-brand illustration to lock the style

## Consistency tips

1. Fix the seed when the generator exposes it (Stable Diffusion, Leonardo) — same seed + same prompt = deterministic output
2. Generate 4 variants, pick the best, image-to-image it with the same prompt to tighten drift
3. Upload a reference image once you have one on-brand illustration — use it as the style anchor for every subsequent generation
4. Keep the Subject line one sentence — long subject descriptions cause the model to free-associate extra elements
