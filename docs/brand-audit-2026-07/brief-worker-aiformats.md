# BRIEF — codex-W4 · lens: ai-consumability (drift root-cause + format design inputs)

Read `charter.md` first. Role: `~/.herdr/roles/worker.md`. Write ONLY `findings-aiformats.md` (this
dir). Repo root: `..\..\` (spectrea-branding). Local id namespace **AIF-n**.

## Objective
Diagnose WHY AI-assisted work drifts off-brand despite the guide existing, and produce the evidence
base for the machine-consumable format(s) that fix it. The orchestrator designs the winning formats
from YOUR analysis — your job is root-cause rigor + a complete feasibility inventory, plus your own
draft recommendation.

## Scope (read-only)
`public/llms.txt` · `public/brand-guide.md` · `src/data/brand.ts` · `public/robots.txt` ·
`.github/workflows/deploy.yml` (what URL serves what) · `scripts/generate-*.mjs` (existing derivation
infra) · `index.html` · the deployed-app structure (`src/pages/**` — hash routing implication for
crawlers/agents).

## Probe list (cover ALL; add your own)
1. **AI-surface inventory:** everything an AI could be pointed at today (llms.txt, brand-guide.md,
   brand.ts, the live app URL, PDF). For each: approximate token count (estimate chars/4), format
   (prose/table/code), fetchability (is llms.txt at the served root? does the hash-router hide pages
   from non-JS agents?), and freshness mechanism (hand-maintained vs generated).
2. **Failure-shape → gap trace.** For each realistic AI-drift failure shape, name WHICH gap permits
   it: (a) rule unstated · (b) rule stated but buried in prose · (c) no negative/contrastive example ·
   (d) no machine-readable contract · (e) reference too long for a working context · (f) formats
   disagree so the AI picked the stale one. Failure shapes to trace (minimum set — add more):
   wrong category noun (this ACTUALLY happened — llms.txt lagged on the noun until 4d4c804);
   hype vocab ("seamless", "AI-powered"); wrong tone for surface (chirpy error message); totalizing
   claims; wrong casing/naming ("Spectrea AI"); off-palette hex or wrong token for text tier;
   forbidden gradient use (skip-pair duet, gradient on buttons/text); wrong lockup/wordmark treatment
   ("pectrea" standalone); privileged-word overdose (density rule violation); outcome-vs-mechanism
   hero copy; wrong dot count / squircle container in generated imagery.
3. **llms.txt hardness check:** field-by-field against brand.ts + guide — what does it omit that an
   AI writing copy NEEDS (e.g. neverUse list? density rule? tone pairs? dark tokens?), what does it
   state loosely, what would make it verifiable rather than descriptive?
4. **Derivation infrastructure:** what do generate-brand-assets.mjs / generate-pdf.mjs already prove
   about generating artifacts from brand.ts? What would a `generate:ai` script need (imports brand.ts
   — note it's TS with `as const`; how do the existing .mjs scripts read it — re-declared? parsed?
   compiled?). Ground this precisely — it decides wave-2 design.
5. **Candidate format assessment** (evidence per candidate, not vibes): hardened llms.txt · compact
   brand-contract JSON derived from brand.ts · drop-in agent-rules snippet (CLAUDE.md/AGENTS.md-style
   block other repos vendor) · few-shot on-brand/off-brand contrastive pairs file · generation-time
   checklist (pre-flight the AI runs before emitting copy). For each: what drift failures from §2 it
   kills, token cost, maintenance path (MUST be derivable from brand.ts — flag anything that would
   create a new hand-maintained copy), and consumption story (how does an agent actually load it?).
6. **Single-source violations:** where guide/llms.txt/pages restate brand.ts facts by hand (overlap
   with W2 §6 — cite their inventory shape but focus on the AI-facing artifacts; don't duplicate the
   full sweep).

## Output format
`findings-aiformats.md`: §1 inventory table · §2 failure→gap matrix · §3 llms.txt audit · §4
derivation-infra ground truth · §5 per-candidate assessment + YOUR draft recommendation (ranked,
with what each format kills) · residuals + breadth-gate line + ≤10-line lens verdict. Ids AIF-n on
every discrete claim.

## Done condition
All 6 probes; every claim grounded file:line (or measured, for token counts); recommendation drafted.
**Hard cap: 2 passes, then condense and stop.** No edits outside your findings file. No git.
