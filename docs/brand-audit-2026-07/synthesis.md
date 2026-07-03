# SYNTHESIS — Brand-Guide Audit 2026-07-03 (orchestrator; Claude Fable 5)

> Run record: `ledger.md` (32 findings, all confirmed cross-model) · `decisions.md` (full audit
> trail) · `plan.md` (implementation spec). Commission: `brief.md`.
> STATUS: COMPLETE 2026-07-03 — 5 clusters committed locally (unpushed; Darren pushes).

## 1. What this run found (one paragraph)

The brand system is verbally strong and philosophically coherent, but it drifts — especially under
AI — for one structural reason: brand facts are hand-copied across five surfaces (brand.ts, guide,
llms.txt, app pages, generator scripts) with contradictory authority claims and no derivation, and
the compact AI-facing file omitted exactly the enforcement content (banned words, density, logo and
gradient constraints, source-of-truth). The 2026-07-03 vision amendments had not propagated: the
two ratified differentiated trust claims (per-viewer truth, sovereign-data export) were absent from
every brand surface, the differentiator table still sold the generic 2024 set, audiences had no
solo tier despite ratified breadth, and the public PDF still carried the pre-ratification category
noun. All 32 findings were confirmed by a cross-model critic; zero refuted.

## 2. What changed (committed locally — Darren pushes)

Every cluster was gate-verified by a cross-model reviewer BEFORE its commit.

- **C1 `2df71aa`** — brand.ts canonical extension (9 new exports: meta, naming, brandTokens,
  accessibility, logo, graphViz, trustCopy, executiveVoice, originStance; de-totalized claims;
  moat re-anchor; per-viewer + sovereign-data claims; solo audience; voice surface patterns;
  AI naming; WCAG 2.2 AA pin; trust copy masters; version metadata v2.1.0).
- **C2 `4babd2a`** — guide + pages sync (drift fixes incl. "five traits", KM-adjacent category
  copy, stale bios, totalizing text; guide mirrors of every C1 addition under a verbatim-mirror
  standard; source-of-truth stanza replaces "app wins"; TopBar version derives from meta.version).
- **C3 `b16be8e`** — generate:ai pipeline: brand-contract.json + brand-checklist.md +
  brand-few-shots.md + brand-agent-rules.md + llms.txt router, ALL generated from brand.ts
  (TS-compiler-API in-memory transpile; zero re-declared brand facts anywhere in the generator —
  includes a small canon addition, positioning.categoryGuard, so even the bad-substitution
  examples have a canonical home).
- **C4 `60f592c`** — asset/generator fixes (type-samples phrase, 13-step type-scale ladder incl.
  H4/H5/Code SM, favicon on canonical Ink/Canvas tokens, icons.svg deleted). Full asset regen
  also materialized `logo-lockup-spectrum-white.svg` (generator status quo; see D1 — the file's
  CONTENT is Cool Duet, only the NAME awaits your call).
- **C5 `5ae173a`** — full generate:all (PDF regenerated: 37pp, ratified noun ×6, retired noun ×0,
  gen-date 2026-07-03; assets + AI formats confirmed byte-identical = pipeline idempotent) +
  deploy.yml runs generate:all before build so shipped artifacts can never lag sources again +
  an additive win32 Chrome-discovery fix in generate-pdf.mjs (CI path unchanged).

## 3. AI-reference format recommendation (shipped)

**Root cause of AI drift** (verified, matches the real noun-lag incident): rules prose-heavy,
duplicated, inconsistently exposed; no machine contract; no stated load order; formats disagree and
the AI picks the stale one.

**Shipped fix — a generated bundle, one source:**
| File | Job | Agent loads it when |
|---|---|---|
| `/brand-contract.json` | hard constraints, machine-verifiable | any brand task (first) |
| `/brand-checklist.md` | pre-flight before emitting copy/design | generation time |
| `/brand-few-shots.md` | contrastive on/off-brand pairs | writing copy |
| `/brand-agent-rules.md` | drop-in CLAUDE.md/AGENTS.md block | vendored into OTHER repos |
| `/llms.txt` | router: source-of-truth + load order + SPA labeling | discovery |

Rule going forward: **never hand-edit a generated file; never restate a brand fact — extend
brand.ts and regenerate.** The vendor snippet (`brand-agent-rules.md`) is the piece to drop into
spectrea and any future repo that produces brand-adjacent output.

## 4. Decisions for Darren (options + recommendation; nothing self-ratified)

**All four ratified by Darren 2026-07-03 (interview) and implemented in commit `389d436`** —
D1 re-scope to gradient family · D2 outcome hero, no term · D3 codified silence · D4 keep all.
Implementation notes: D1 turned out to be pure naming drift — no surface ever rendered a true
full-spectrum lockup (the app preview at LogoExploration:397 renders LogotypeGradient, i.e. Cool
Duet); the asset is now `logo-lockup-gradient-white.svg`, form 1's dark rendering. D3's
brand.ts stance moved from "explicitly undecided" to `decided-silence`. The original decision
packages are preserved below as presented.

### D1 — Lockup third form (BA-10) — RATIFIED: (b) re-scope to gradient family (2026-07-03)
Your recent asset-generator commits (751c073, afedac7) added a "Full Spectrum / White" lockup
style. The guide's two-forms rule forbids full-spectrum lockups — and the feature disagrees with
itself: the downloadable SVG is actually **Cool Duet** (misnamed "spectrum-white") while the app
preview renders true full-spectrum (Cobalt→Teal→Amber) on the mark.
- **(a)** Approve full-spectrum/white as a third lockup form → guide two-forms rule amended; SVG
  regenerated to match the preview.
- **(b) [recommended]** Re-scope the style + asset name to Cool Duet (= approved variant #7).
  Quality axis: system legibility — the two-forms rule is load-bearing, and the shipped SVG is
  already Cool Duet; only the app preview and the name change.

### D2 — On-ramp term — RATIFIED: outcome hero, no term; codified as positioning.onRamp (2026-07-03)
Constraints from your ratified forks: deliberate breadth (no term spans individual→institution —
verified), PLG self-serve, star-where-it-shines graph, north-star noun stays internal.
The five researched packages (findings-vocab-onramp.md, verbatim market evidence 2026-07-03):
- **A "Work AI"** — most legible, but Glean-owned + enterprise-coded; undercuts the solo tier.
- **B "Organizational memory"** — best thesis fit, but enterprise-bound, "memory" reads passive,
  and the compounding space is now contested (Engram $98M, XTrace).
- **C "AI workspace"** — PLG-proven breadth (Notion), but commoditized; reads "Notion clone."
- **D "AI OS"** — matches substrate ambition; agent-coded, over-promises day-0.
- **E "Second brain, for teams"** — best consumer on-ramp; enterprise rejects it.
- **[recommended] Segment-neutral outcome hero + per-surface ADOPT vocabulary.** Don't buy any
  owned/contested whole-product term. Front door leads with the entry job/outcome (e.g. "Drop in
  your docs — get answers that show their sources, and a system that gets sharper every week"),
  while each surface uses the market's word where one exists — ADOPT: "permission-aware", "cited/
  grounded answers", "knowledge graph" (exploration surfaces only, per VM-F3); AVOID: "ambient
  agents" (2026 meaning-collision), "bitemporal", "ontology", "enterprise graph", "Work AI".
  Coin ONLY for the two genuinely un-named differentiators: per-viewer truth, decisions-in-the-
  graph. Quality axis: breadth-coherence — the only posture that serves individual→institution
  without picking a side, which is the ratified product shape. If you prefer a term-led door,
  B is the differentiation play and C is the reach play.
  (If adopted, a follow-up cycle applies it to hero/social copy; nothing in this run pre-commits it.)

### D3 — Singapore origin stance (BA-24F) — RATIFIED: codified silence (2026-07-03)
Lean-in ("engineered in Singapore" as rigor/governance signal) vs codified silence.
**Recommended: codified silence** until a GTM cycle argues otherwise. Quality axis: claim
discipline — the brand only carries claims with proof surfaces behind them. brand.ts now records
the stance as explicitly undecided (so AI stops guessing), not as a decision.

### D4 — Easy-veto items — RATIFIED: keep everything (2026-07-03)
- neverUse additions: agentic · AI-first · copilot (as generic noun) · 10x · supercharge ·
  effortless · magical (BA-7).
- GitHub bio: "Open-source tools." → "Open interfaces and developer tools." (per ratified
  closed-substrate/open-surface posture) (BA-26).
- icons.svg deleted (unreferenced, off-palette; one `git revert` away) (BA-32).
- trustCopy masters are drafted from the ratified vision but marked "review with counsel before
  external legal use" (BA-23).

### D5 — "Compounding intelligence" (watch item, no action needed now)
Kept as brand claim per your accepted-interim-risk call. The guide now carries a usage guardrail
(only with the mechanism named: provenance + per-viewer access + closed loop) and a dated
contested-market note (Engram, XTrace). The deeper defend/differentiate/cede decision stays open on
the vision side (VM-73 watch).

## 5. Routes to other repos (nothing done by this run)

- **spectrea**: re-pin the vendored brand snapshot `docs/05-reference/brand/` (currently 4d4c804)
  to this run's final commit once pushed. Consider vendoring `public/brand-agent-rules.md` into the
  spectrea CLAUDE.md/AGENTS.md chain. The full graph-viz rendering spec (BA-16) is routed to a
  product design cycle (needs product-side node/edge taxonomy; brand-level foundation shipped here).
- **Push**: this run committed locally only; Darren pushes (deploy then regenerates + republishes
  the corrected PDF/llms/assets).

## 6. Residuals (documented, accepted)

- Dark-mode interactive state colors (button hover/active) are an OPEN design item — the previously
  hand-invented values failed AA with white text (gate-caught, 1.8:1); marked exploratory in
  brand.ts, not canonical (BA-11).
- Illustration checklist not yet a generated artifact (referenced file lives in docs/, not deployed);
  noted inside llms.txt regeneration scope (AIF-27) — carried as a follow-up.
- Live-site fetchability was assessed from repo/deploy shape, not a live crawl (AIF-44).
- pdf/PDF binary content verified via pypdf text extraction + generator provenance, not visual layout.

## 7. Run health (MODEL SPLIT + deviations)

- Breadth: 4/4 worker lenses on Codex; verify: Claude critic; implement: Claude integrator;
  wave-2 gate: Codex. Leader/synthesis: Claude (Fable 5, driving session).
  Pane split 62.5% Codex — on the ~60:40 charter target.
- Deviations: fresh Codex gate panes died 3× pre-restart (usage/session cap) → after a machine
  restart mid-wave-2 (zero repo damage — tree was clean, blackboard preserved everything) the gate
  ran as one fresh Codex session (GATE-LANE lines in decisions.md).
- Cross-model discipline held and was load-bearing, not ceremonial — the Codex gate caught three
  real defects in Claude-authored work before commit: (1) BA-11 dark button states failed AA at
  1.8:1; (2) eleven C2 guide mirrors paraphrased canon and silently dropped clauses — fixed under
  an adjudicated verbatim/clause-complete standard; (3) the C3 generator hard-coded brand-bearing
  literals (twice), driven to a true zero-literals pipeline.
- Gate rounds per cluster: C1×2, C2×3, C3×3, C4×1, C5×1 — later clusters passed first-shot as the
  standards from earlier adjudications took hold.
