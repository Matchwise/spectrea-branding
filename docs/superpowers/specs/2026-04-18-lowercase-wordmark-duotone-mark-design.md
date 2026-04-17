# Lowercase wordmark + duotone mark in gradient lockup

**Date:** 2026-04-18
**Status:** Approved

## Summary

Final adjustments to the Spectrea logo:

1. The wordmark is lowercase everywhere it appears (`PECTREA` → `pectrea`). The S mark remains the leading glyph, so the full lockup reads `s + pectrea`.
2. The primary gradient lockup (`LogotypeGradient`) changes meaning: the mark carries a two-tone Cool Duet gradient (Cobalt → Teal), and the wordmark becomes monotone (following the existing Ink-on-light / White-on-dark mono rules).
3. The mono lockup (`Logotype`) is unchanged except for the lowercase wordmark text.

The old rule "mark AND wordmark share the full-spectrum gradient" is retired. The new rule: the gradient lives in the mark only; the wordmark is always solid.

## Scope

### In scope

- `src/components/brand/SpectreaLogo.tsx`:
  - `Logotype.text` → lowercase `pectrea`.
  - `LogotypeGradient.text` → lowercase `pectrea`.
  - `LogotypeGradient`: mark gradient stops change from the 5-stop full spectrum to Cool Duet (two stops: `#4271DF` → `#00B6A0`). The trailing-dots behaviour (grey) is preserved.
  - `LogotypeGradient`: wordmark `fill` changes from the gradient URL to a solid mono colour. Add `colorMode?: MonoColorMode` prop (default `ink`) matching `Logotype`'s API.
  - Replace the `LOCKUP_GRADIENT_STOPS` constant and the accompanying doc-comment block (which currently enforces the "single unified gradient" rule) with new copy that reflects the new semantics.
  - Keep layout/metrics code (`useLockupLayout`, `capH = fontSize * 0.72`, the gap and padding) exactly as today — mark height stays at cap-height, not x-height. Letter-spacing stays at `0.02em`.
- Static SVG assets in `public/brand-assets/`:
  - `logo-lockup-gradient.svg` — regenerated with Cool Duet mark + Ink wordmark + lowercase glyph paths.
  - `logo-lockup-ink.svg` — regenerated with lowercase glyph paths.
  - `logo-lockup-white.svg` — regenerated with lowercase glyph paths.
  - Regeneration goes through `scripts/generate-brand-assets.mjs` (updated to match the new component behaviour).
- Light copy sweep (no visual changes) across pages that narrate the old rule: `src/pages/logo/PrimaryLogo.tsx`, `LogoGuidelines.tsx`, `Variations.tsx`, `Misuse.tsx`, and `public/brand-guide.md`.

### Out of scope

- Standalone mark (`StaticLogo`) — no change.
- Animated mark (`AnimatedLogo`) — no change.
- Any non-lockup usage of the wordmark (none exists as standalone text today; all wordmark appearances go through these two components).
- Typography scale, brand colour tokens, or any other brand system changes.

## Design decisions

**Mark height = cap height (unchanged).** With a lowercase wordmark the S mark could be scaled to cap height (matches ascenders like `p`, `t`) or x-height (matches `e`, `c`, `r`, `a`). Cap height is kept — the mark stays visually dominant and the lockup still reads as `S pectrea`. X-height alignment was rejected because the mark would shrink noticeably below its own letters.

**Wordmark mono colour follows existing rules.** Ink (`#18181C`) on light surfaces, White (`#FDFDFB`) on dark. This matches `Logotype` so consumers use one mental model for the wordmark colour regardless of whether the mark is gradient or mono.

**Gradient lives in the mark only.** This reverses the current "unified gradient" rule. The reasoning: a two-tone mark + solid wordmark lets the mark carry the brand energy while keeping the wordmark legible at small sizes and in varied contexts. No more gradient-on-text legibility risk.

**Trailing dots stay grey in the gradient lockup.** Preserved from today's behaviour — the "raw data vs insight" visual metaphor still holds.

## Files changed

- `src/components/brand/SpectreaLogo.tsx`
- `scripts/generate-brand-assets.mjs`
- `public/brand-assets/logo-lockup-gradient.svg` (regenerated)
- `public/brand-assets/logo-lockup-ink.svg` (regenerated)
- `public/brand-assets/logo-lockup-white.svg` (regenerated)
- `src/pages/logo/PrimaryLogo.tsx` (copy only)
- `src/pages/logo/LogoGuidelines.tsx` (copy only)
- `src/pages/logo/Variations.tsx` (copy only)
- `src/pages/logo/Misuse.tsx` (copy only)
- `public/brand-guide.md` (copy only)

## Verification

- Build the Vite dev server and visually inspect the primary logo page, guidelines page, variations page, and misuse page.
- Confirm the gradient lockup shows a Cobalt → Teal mark with a solid Ink wordmark (and a White wordmark on the dark variant).
- Confirm the mono lockup shows `s + pectrea` in a single Ink/White colour.
- Confirm the three regenerated SVG assets render correctly when loaded standalone.
- Run `tsc --noEmit` to confirm no type errors from the new `colorMode` prop on `LogotypeGradient`.
