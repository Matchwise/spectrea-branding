# BRIEF — codex-W2 · lens: consistency-drift

Read `charter.md` first. Role: `~/.herdr/roles/worker.md`. Write ONLY `findings-drift.md` (this dir).
Repo root: `..\..\` (spectrea-branding). Local id namespace **DR-n** (orchestrator assigns BA-nn at intake).

## Objective
Find every place the SAME brand fact diverges across surfaces. Cross-format drift is the failure
mode this run exists to kill — inventory it precisely so wave 2 can derive instead of hand-copy.

## Scope (read-only)
`src/data/brand.ts` (canonical) vs `public/brand-guide.md` vs `public/llms.txt` vs `src/pages/**` vs
`src/components/**` vs `index.html` vs `scripts/generate-brand-assets.mjs` + `scripts/generate-pdf.mjs`
vs `public/brand-assets/*.svg` vs `public/brand-guide.pdf` (check generation date/staleness vs the
sources it mirrors) vs `.github/workflows/deploy.yml` (what actually ships) vs `README*` if present.

## Probe list (cover ALL; add your own)
1. **Category noun sweep:** local commit 4d4c804 corrected "composable knowledge platform" →
   "composable **intelligence** platform" (user-ratified; do NOT re-litigate). Grep EVERY surface
   (pages, index.html title/meta/og tags, PDF text, SVGs, scripts, llms.txt, social bio templates in
   Social.tsx, email templates, docs) for leftover "knowledge platform" or stale noun forms.
2. **Fact diff:** tagline, strategic claim, pronunciation, etymology, hex values (incl. hover/active
   + dark tokens + washes + lifts), typography weights/sizes, motion durations, radii, spacing,
   personality traits, values, anti-values, archetypes, messaging hierarchy, audiences, neverUse
   list, privileged words — anywhere a value is HARDCODED in a page/script instead of imported from
   brand.ts, or differs between brand.ts / guide / llms.txt.
3. **Totalizing language:** vision (2026-07-03) de-totalized "incomparably better than the first" →
   "measurably better" + testability. brand.ts still says "incomparably" (messaging + values). Find
   every occurrence of totalizing/unfalsifiable claims across brand surfaces.
4. **llms.txt lag:** field-by-field vs guide + brand.ts (it lagged on the noun before; what else lags?).
5. **PDF staleness:** is public/brand-guide.pdf regenerated after the latest content commits? Check
   what generate-pdf.mjs consumes; flag if stale.
6. **Derived-vs-hand-maintained inventory:** for EVERY brand artifact, classify: generated-from-
   brand.ts (by which script) / hand-maintained duplicate / hand-maintained unique. This inventory
   is a primary wave-2 input — be exhaustive.
7. Naming rules: "Never: SpectreAI, Spectrea AI (lead), spectra" — consistent everywhere? Wordmark
   casing rules (sentence-case vs lowercase-tail) consistent between guide §3/§4 and components?

## Output format
`findings-drift.md`: id DR-n | severity | surfaces + quoted values file:line (BOTH sides of every
divergence) | canonical value (per brand.ts or ratified vision) | draft amendment. Then the §6
inventory table. End with residuals + breadth-gate line + ≤10-line lens verdict.

## Done condition
Every probe covered; both sides of every divergence quoted file:line; inventory table complete.
**Hard cap: 2 passes, then condense and stop.** No edits outside your findings file. No git.
