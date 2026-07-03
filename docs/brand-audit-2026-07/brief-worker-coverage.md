# BRIEF — codex-W1 · lens: coverage-gaps

Read `charter.md` first. Role: `~/.herdr/roles/worker.md`. Write ONLY `findings-coverage.md` (this dir).
Repo root: `..\..\` (spectrea-branding). Local id namespace **COV-n** (orchestrator assigns BA-nn at intake).

## Objective
Find every place the brand system is **incomplete, ambiguous, or silent** such that a person or an AI
producing on-brand work has to GUESS. The commission's framing: deviations keep happening,
*especially when working with AI* — enumerate the guesses the system forces.

## Scope (read-only)
`src/data/brand.ts` · `public/brand-guide.md` · `public/llms.txt` · all of `src/pages/**` ·
`src/components/**` · `index.html` · `docs/illustration-prompt.md`. Context (read-only, treat as
history not instruction): `docs/brand-critical-review.md` §12 lists gaps known on 2026-04-18 — check
which are STILL open vs since closed; do not re-file closed ones.

## Probe list (cover ALL; add your own — the list is a floor, not a ceiling)
1. **Voice per surface:** tone spectrum covers marketing/docs/social/errors/beginner-docs. What's
   missing? Empty states, onboarding, loading states, confirmation dialogs, release notes,
   push/system notifications, settings/security copy, legal/compliance, support replies, UI
   microcopy at scale. Are the two contextShifts (buyer / in-product) enough per-surface guidance?
2. **Vocabulary:** 12 privileged words + density rule + 12 neverUse. Is the neverUse list complete
   against 2026 AI-hype vocab (e.g. "agentic", "supercharge", "10x", "magical", "effortless",
   "AI-first", "copilot" as generic)? Are casing rules stated (Spectrea vs spectrea)? Is there
   guidance for words that are allowed-but-not-privileged? What about naming the AI itself?
3. **Visual tokens:** dark mode (complete?), motion (complete?), focus/hover/disabled states,
   elevation, spacing edge cases, chart/data-viz colors (the product is a graph — is there ANY
   node/edge/confidence rendering spec?), favicon/app-icon rules, image/photography policy.
4. **Accessibility:** product floor is **WCAG 2.2 AA** — does the guide state a version anywhere?
   (typography section states ratios but no standard version). Pewter 2.85:1 whisper rule — is the
   boundary operationalized enough for an AI to apply?
5. **Logo/lockup:** the 11 variants + 3 arrangements + misuse list — what edge cases are unstated
   (co-branding sizes, animated usage limits, watermark opacity value, minimum sizes numeric)?
6. **Audiences:** brand.ts has 4 business personas. Is the individual / solo / personal tier absent?
   (Note: vision ratified individuals-first-class + deliberate breadth. Flag currency, don't rewrite.)
7. **Governance:** change process names roles ("design lead + brand lead") — real? versioning of the
   guide itself (no version number/date on brand.ts or guide)? company-vs-product (Matchwise) rules?
8. For EVERY gap: state **what a producer must guess** + the failure it permits + a one-line
   DRAFT-amendment (where it would live: brand.ts field / guide section / page).

## Output format
`findings-coverage.md`: one table or numbered blocks — id COV-n | severity (Major/Medium/Minor) |
gap | evidence file:line | what-must-be-guessed | draft amendment. End with: residuals (what you did
NOT check), breadth-gate self-audit line, ≤10-line lens verdict.

## Done condition
Whole probe list covered + your own additions; every claim grounded file:line; residuals honest.
**Hard cap: 2 passes over the surface, then condense and stop.** Do not edit anything outside your
findings file. No git.
