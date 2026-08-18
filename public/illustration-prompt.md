<!-- DO NOT EDIT — generated from src/data/brand.ts by scripts/generate-ai-formats.mjs (2026-08-18)
     Canonical copy: https://branding.spectrea.com/illustration-prompt.md — canon v2.15.0 (2026-08-18). If you are reading a vendored snapshot, it is stale when https://branding.spectrea.com/brand-contract.json reports a higher "version"; re-vendor the whole set (brand-contract.json, brand-checklist.md, brand-few-shots.md, brand-agent-rules.md, llms.txt, brand-guide.md) rather than editing this file. -->

# Spectrea illustration prompt

Generated from src/data/brand.ts (illustration) — canon v2.15.0, 2026-08-18.

One invariant DNA block plus one register sentence per job. The DNA is the identity and never varies; the register is the context dial, chosen per job and never enforced across jobs. Measurements report, they never gate — a scorer rewards crude flat images, so a person looks at every render before it is claimed or shipped.

## The DNA block

Fill the four slots; change nothing else.

```
Generate this image directly.

[SUBJECT]
[REGISTER]

Flat editorial illustration in the style of Linear.app and Stripe brand art, slightly warmed.
Filled shapes only. No outlines, no strokes, no line art.

Colours: cobalt blue #4271DF, teal #00B6A0, amber #E19000, rose #F24260, warm off-white background #FAF8F2. One colour dominates; the others support as pale tints. Never all four at full strength.

Warmth comes from palette and light, not from crowding. No grey filler shapes.
Mix soft rounded forms with clean geometric ones.
If people appear, their faces are blank or one dot per eye.

[TEXT]
No isometric view, no 3D, no photorealism, no houseplants.

[ASPECT].
```

- **[SUBJECT]** — One sentence naming the scene. A subject that must contain no people says so — figures are not part of the DNA.
- **[REGISTER]** — One sentence from registers below, or one derived per registerDerivation.
- **[TEXT]** — Marketing and editorial subjects: "No text." Product subjects: "Render the interface accurately, with the text it genuinely needs. Never lorem, never gibberish."
- **[ASPECT]** — The aspect ratio, e.g. "16:9", "1:1", "1200x630".

Length is load-bearing. The ~2,900-character predecessor lost generator attention; compacting to ~750 characters was the single change that moved every measured metric. Adding rules to this block costs attention on the rules already in it — a new constraint belongs in a register sentence, not here.

## Registers — pick one sentence for [REGISTER]

- **hero** (Draws attention; rewards a look) — "A detailed, balanced scene with warm light — rich enough to reward a second look, composed enough to breathe."
- **spot** (Sits beside content; must not compete with it) — "Simple and direct: a few large deliberate shapes and one large calm empty area."
- **docs** (Explains; carries order and motion) — "A clear single idea in motion — order emerging, mid density, nothing decorative."
- **product** (Shows the actual software) — "Render the product accurately; named source documents sit beside the answer."
- **social** (Reads at thumbnail size) — "Bold and immediate at small size; two equal subjects may share the lead colour."

These five are named presets, not a closed list. A register is one sentence positioning a job on five axes: density, composition, light, text, and subjects. A context with no register gets a sentence composed on those axes; if the context recurs, name the sentence, make its best render the exemplar, and add it here. The DNA never moves — only the sentence does.

## What may vary, and how far

- **Temperature** — Cool-leaning (Cobalt-led and spare on the warm ground) to golden-hour (warm light over a dense warm scene). The ground is ALWAYS warm off-white — temperature varies in the shapes and the light, never the ground. Default: Gentle warmth: warm light present, not golden. Out of range: A cool white or grey ground; blue-grey washes; heat with no cool counterweight. (judged by eye; No ratio scores this axis: warm-share-of-colour is blind to quantity and ranked a spare image above a dense golden one. Perceived warmth is warm coverage combined with light and density.)
- **Density** — Largest open area from ~12% (richest) to ~76% (sparest). Default: Set by register — a hero carries detail, a spot carries few large shapes. An unregistered job sits mid. Out of range: Below ~12%: nothing breathes. The retired anchor sat at 5%. (judged by eye; Density is FELT in shape count and detail, and open-ground percentage tracks it only loosely. In the shipped exemplars the hero measures MORE open ground than the spot (34.7% against 25.1%) while looking plainly denser — a detailed desk with a lamp, books and a poster against a few large shapes and a quiet half-frame. Two samples are not a range; they are enough to show the number cannot define the register. Read it as a drift signal.)
- **Abstraction** — Accurate product scenes to pure geometric abstraction. Default: Simplified representational — a real scene built from flat shapes. Out of range: Photorealism at one end; literal banned metaphors (networks, nodes, prisms) and decoration with no job at the other. (judged by eye)
- **Depth** — Vector has no range: strictly flat. Raster runs from pure flat through layered flat (overlap occlusion) to believable perspective where the subject itself needs it. Default: Layered flat, at most one darker tonal step. Out of range: Isometric projection as a style; slab-edge stacks; gloss; rendered 3D. (judged by eye)
- **Saturation** — One primary at full strength leads; a second may reach full strength in small accents; three only where shapes themselves are the subject. Default: Exactly one primary at full strength. Out of range: Four primaries at full strength — the retired anchor. (judged by report)
- **Figures** — None, one, or two equals (social register only). Default: Zero or one. Faces are always blank or one dot per eye. Out of range: Crowds, detailed facial features, mascots. (judged by eye)

## Media

- **Generated raster** — Owns warmth, light and human presence. It cannot hit an exact brand hex — across every raster measured, the closest Cobalt landed at colour distance 33 — so its palette rule is a stated tolerance, never an exactness claim. Depth is permitted while it stays illustration.
- **Hand-authored SVG** — Owns exact palette, strict flatness and product accuracy: the author types the hex. Tints are lighter SOLID hexes, never fill-opacity — a translucent fill over a coloured ground composites to a colour in no palette (Amber at 60% over Teal reads olive, and a hue-family checker passes it).
- **Choosing** — Warmth, mood, human presence, marketing scenes → raster. Exact brand colour, schematic product, in-guide primitives, anything that must be edited later → vector.

## Reference images

A reference image is a CONTENT channel, not a style channel: its pull scales with how compatible its content is with the prompt. The prompt sets the level; the reference narrows variance toward itself.

- **none** — A new composition — the default: The register sentence alone sets the level, and nothing bleeds in.
- **cross-subject** — A batch that must feel like one campaign: Style steadies and variance narrows; expect motifs from the reference to echo, which inside one campaign reads as cohesion.
- **same-subject** — A variant of an image that already exists: The render collapses onto the reference — three of three draws reproduced it object-for-object. Cloning is the feature here and a defect everywhere else.

## Measurement

Report, never gate. Reported: largest open ground area · neutral grey filler share · primaries at full saturation · hero lead ratio · top colours by area, named.

A crude flat image scores perfectly while being incoherent, and a render that broke the warm-ground rule scored best of its round. Numbers describe an image so drift is visible over time; they never decide whether it ships. Every render is opened and looked at before any claim is made about it.

## Never

- **Mascots or character cartoons** — Spectrea is a mentor, not a pet.
- **Stock photography** — Warmth comes from the palette and the light in generated scenes, not from stock imagery.
- **Outlines or line art** — Every shape is filled. A stroke that survives a trace is a defect, not a style.
- **Off-palette gradients and neon** — The palette is the identity; a colour outside it is a different brand.
- **Bauhaus limb-figures** — The retired SpectreaFigure illustrated the opposite of the product's composability promise.
