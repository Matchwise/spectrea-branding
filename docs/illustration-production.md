# Illustration production notes

**Not canon.** The doctrine — DNA block, registers, ranges, media split, reference modes —
lives in `src/data/brand.ts` (`illustration`) and publishes to
[`/illustration-prompt.md`](../public/illustration-prompt.md). Use that as the source; this
file carries the operational knowledge around it: which generator to reach for, how to
translate the block when a generator needs a different shape, and which tools are safe to
use commercially.

These notes were kept when the hand-maintained v4 prompt doc was retired into canon
(decision 36, 2026-08-11). They are working knowledge, not ratified brand rules — nothing
here overrides the generated prompt, and where this file and canon disagree, canon wins.

## Per-generator translation

The canonical DNA block is written for generators that accept prose. Some need reshaping;
the rules must survive the reshaping unchanged.

- **Gemini / DALL·E / Bing Image Creator** — works as written. Keep the block verbatim; the
  subject line stays first after the intent line.
- **Stable Diffusion** — convert to comma-separated weighted tokens, subject first:
  `[subject sentence], [register sentence], (flat editorial brand illustration:1.4), (filled shapes no outlines:1.3), (palette #4271DF #00B6A0 #E19000 #F24260 on #FAF8F2:1.3), (one colour dominates others as pale tints:1.2)` — and put the AVOID line into the negative prompt.
- **Adobe Firefly** — subject and register in the main prompt; the remaining rules in the
  secondary style field where the generator separates them.
- **Midjourney** — subject and register as plain prose, rules appended as parameters where
  supported, `--cref` for the reference-image modes.

Whatever the generator, the reference-image behaviour in canon still applies: no reference
for a new composition, a same-register different-subject reference for batch cohesion, a
same-subject reference only when a near-variant is what you want.

## Tool safety

| Tool | Free tier usable commercially | Notes |
|---|---|---|
| Gemini (consumer + API) | Yes | No ownership claim; SynthID watermark |
| Bing Image Creator (DALL·E) | Yes | No indemnification |
| Adobe Firefly (free) | Yes | No indemnification; cleaner training data |
| Stable Diffusion (local) | Yes | Legally cleanest; needs a GPU |
| Recraft (free) | No | Paid plan required for commercial use |
| Midjourney | No | No free tier |

Verify current terms before a commercial render — this table records what was true when the
notes were written, and vendors change licensing.

## Choosing subjects

Editorial judgement happens *before* the prompt, never inside it — the DNA block is
deliberately subject-agnostic so the same system serves any scene. Subjects that have read
as Spectrea in practice:

- People working, collaborating, thinking, discovering
- Hands, desks, home, office, outdoor moments
- Knowledge objects: books, documents, cards, notes, threads
- Light, warmth, growth, atmosphere — windows, sunrise, open rooms
- Abstract compositions where the two shape families are themselves the subject

Treat this as a content brief for whoever picks the subject, not as material to inject into
a render. One note from the art session: a subject that must contain **no people** has to say
so in the subject line — the DNA permits figures, it does not request them.

## Working practice

- Generate one image per fresh session when you are comparing options. A generator that can
  see its own previous renders is not giving you independent draws, and the whole art session
  had to be re-run once for exactly that reason.
- **Do not run concurrent sessions on the same subject.** Six concurrent lanes once produced
  three byte-identical files (verified by SHA-256) from two different register sentences that
  shared one subject line. The cause was never isolated — a backend collapsing near-identical
  simultaneous requests fits, so would a cache or a harness defect — but the practical rule
  holds either way: run sequentially and compare hashes before treating renders as separate
  samples. Identical bytes mean you have one draw, however many lanes reported success.
- Open every render before you say anything about it. The measurement script reports; it has
  been shown to score a crude, incoherent image perfectly.
- `.runs/2026-08-11-art-session/measure.mjs` is the reporting script if you want the numbers
  (open ground, grey filler, primaries at full saturation, hero lead, top colours).
