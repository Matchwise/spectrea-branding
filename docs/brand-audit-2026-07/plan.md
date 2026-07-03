# WAVE-2 IMPLEMENTATION PLAN — brand-audit-2026-07 (orchestrator draft; critic-gated before integrator launch)

Authorization: the commission brief (`brief.md:17,71-77`) pre-authorizes implementing derivable
updates in THIS repo (commit locally, never push). Genuine forks are NOT implemented — they are
presented to Darren in the final synthesis. This plan implements only ids whose latest
`decisions.md` state is `confirmed` at integrator-dispatch time; refuted ids drop out of their cluster.

## Design decision — the AI-format pipeline (BA-31/BA-30, informed by AIF-29..43)

**Winners (per W4's evidence + orchestrator judgment):** a generated bundle, all emitted from
`src/data/brand.ts` by ONE new script:

| Artifact | Role | Kills |
|---|---|---|
| `public/brand-contract.json` | hard machine constraints (verifiable, parseable) | wrong noun, banned terms, hex/tier misuse, gradient/logo misuse, density |
| `public/brand-checklist.md` | generation-time pre-flight (classify surface → check list) | tone-for-surface, totalizing claims, black-box/autonomy claims |
| `public/brand-few-shots.md` | contrastive on/off-brand pairs (taste JSON can't carry) | chirpy errors, platitude marketing, mechanism-first heroes |
| `public/brand-agent-rules.md` | drop-in CLAUDE.md/AGENTS.md block other repos vendor | off-repo agent drift |
| `public/llms.txt` (REGENERATED) | small router: source-of-truth stanza + load order + SPA-route labeling | stale-copy divergence, wrong-source pick |

**Derivation mechanics:** `scripts/generate-ai-formats.mjs` loads `src/data/brand.ts` by
transpiling it in-memory with the TypeScript compiler API (`typescript` is already a devDependency;
`ts.transpileModule` → temp .mjs → dynamic `import()`). NO re-declared constants (the existing
generators' anti-pattern, AIF-30). Every emitted file gets a header:
`DO NOT EDIT — generated from src/data/brand.ts by scripts/generate-ai-formats.mjs (<ISO date>)`.
Add `"generate:ai"` to package.json; fold into `generate:all`. Deploy workflow runs
`npm run generate:all` before `npm run build` so shipped artifacts can never lag sources (BA-2 root cause).

**Prerequisite:** the contract can only be as complete as brand.ts — hence Cluster C1 extends the
schema FIRST, and every rule the contract needs gets a typed home (AIF-55).

## Clusters (one commit each; integrator authors, codex-G1 gates before commit)

### C1 — brand.ts canonical extension `[gate-before-commit]`
Ids: BA-1, BA-5(data), BA-6(canon), BA-7, BA-8(canon), BA-11, BA-14, BA-15, BA-17, BA-18, BA-19,
BA-20, BA-21, BA-22, BA-23, BA-24(voice part), BA-25, BA-26, BA-28, BA-29, BA-16(foundation).
One edit pass over `src/data/brand.ts`:
- `meta`: version ('2.1.0'), lastUpdated, sourceOfTruth hierarchy ("brand.ts is canonical data;
  app renders it; guide/llms/PDF/assets are derived mirrors; on conflict brand.ts wins"),
  changelog pointer (BA-1, BA-19).
- `positioning.promise`/messaging/values: de-totalize "incomparably" → "measurably sharper —
  more context retained, more decisions traceable, more outcomes feeding the next cycle" (BA-5);
  replace "The floor is high, the ceiling is infinite" with bounded phrasing (BA-5).
- `values.trustworthyIntelligence` + `differentiators`: add per-viewer truth (BA-25), sovereign-data
  export exit-rights proof point (BA-26); re-anchor differentiators to the amended moat: per-viewer
  truth · decisions/doctrines live in the graph with provenance · outcomes feed the next cycle ·
  one substrate solo→institution; add guardrail "retrieval/search quality is never the
  differentiator" (BA-29).
- `values.compoundingIntelligence` + messaging: add `usageGuardrail` — use "compounding
  intelligence" only with its defensible mechanism named (provenance + per-viewer access + the
  closed loop); contested-phrase note dated 2026-07-03 (BA-28).
- `audiences`: add "Solo Knowledge Workers" (first-class, free-full-featured framing) + breadth
  note (start free alone → invite a few collaborators → pay at capacity/admin scale) (BA-18).
- `voice.surfacePatterns`: right/wrong pairs + rules for onboarding, empty-state COPY (UI layout
  exists; copy voice doesn't), confirmation dialogs, system notifications, settings/security,
  legal/compliance, support replies (BA-14 as NARROWED by critic — release notes already covered
  by the Feature Announcement pair). Outcome-first rule strengthened: mechanism (graph/loop) never opens buyer copy
  except graph-native jobs (exploration/visualisation) per VM-F3 (BA-27).
- `voice.neverUse`: + agentic, AI-first, copilot (as generic noun), 10x, supercharge, effortless,
  magical (BA-7; flagged in synthesis for easy veto).
- `naming`: unified neverNames (SpectreAI, "Spectrea AI" as lead, spectra-typo, SPECTREA all-caps,
  random caps) (BA-8); `aiNaming` (canonical noun "the assistant" lowercase generic / "Assistant"
  as feature; never "copilot"/"Spectrea AI"; allowed verbs suggest/surface/draft — never decides/
  acts-without-review) (BA-15); `companyProduct` (Matchwise Pte. Ltd. = legal entity; Spectrea =
  product/brand; legacy-name policy) (BA-20).
- `brandTokens`: radii, spacing, elevation, motion durations/easings, button state colors light+dark
  (canonize the Buttons.tsx dark values or mark exploratory — integrator picks the guide-consistent
  option and the gate checks contrast), washes, dark washes, lifts, focus ring (BA-11, BA-21).
- `accessibility` (BA-17 as NARROWED): pin the floor "WCAG 2.2 AA" explicitly (currently
  unversioned, contrast-only) + name the 2.2-specific non-contrast criteria (focus appearance,
  target size ≥24px, dragging alternatives) + formalize the EXISTING Pewter allow-list (guide:309)
  and deny rule (guide:320) into one matrix. Light touch — most content exists, form + version pin
  are the gap.
- `logo.constraints`: dotCount 10, container circle-never-squircle, primary dots #A3A3A3, two lockup
  forms, tail-only-in-canonical-lockup, clear-space 0.5×, watermark ≤20% opacity, co-brand optical
  height rule (BA-22; lockup FORM COUNT untouched pending BA-10 fork).
- `graphViz` (foundation only): node/edge/confidence/state color semantics mapped to the Tier-3
  framework + existing graph vocabulary (Illustration page primitives); explicit note that the full
  operational spec is routed to a product design cycle (BA-16).
- `trustCopy`: approved privacy sentence, AI-use disclosure, retention posture, enterprise-readiness
  paragraph — derived from ratified vision (sovereign data, no-train default-path target, per-viewer,
  provenance); marked "review with counsel before external legal use" (BA-23).
- `executiveVoice`: founder/exec surfaces speak as practitioners (same voice formula, first person,
  no corporate we-speak), examples; `originStance`: EXPLICITLY marked undecided → silent until
  Darren decides (BA-24; fork noted).
Verification: `npm run build` green (tsc catches schema errors); gate spot-checks 5 facts.

### C2 — guide + llms interim sync + pages drift fixes `[gate-before-commit]`
Ids: BA-3(app), BA-4, BA-5(text), BA-6(guide), BA-8(pages), BA-9, BA-26(bio), BA-27(copy) + guide
sections mirroring every C1 addition (per-viewer, sovereign, differentiators, compounding guardrail,
WCAG 2.2 AA, audiences, surface patterns, AI naming, company/product, trust copy, graph-viz
foundation, source-of-truth stanza replacing "app wins" footer).
Files: `public/brand-guide.md`, `src/pages/foundation/Voice.tsx` (five→four via
`brand.personality.length`), `src/pages/foundation/Positioning.tsx` (derive category from brand.ts;
outcome-first category explanation), `src/pages/communications/Social.tsx` (X bio → ratified line;
GitHub bio → "Composable intelligence platform. Open interfaces and developer tools."),
`src/pages/communications/Copy.tsx` (totalizing boilerplate + outcome-first examples),
`src/pages/resources/Downloads.tsx` (CSS-token snippet ships 2 of 6 radii, no spacing/elevation —
complete it from brandTokens; critic-flagged adjacent issue under BA-21).
NOTE: llms.txt is NOT hand-patched here — it is regenerated in C3 (avoid double maintenance).

### C3 — generate:ai pipeline + llms.txt regeneration `[gate-before-commit]`
Ids: BA-30, BA-31, BA-1(llms stanza).
Files: `scripts/generate-ai-formats.mjs` (new), `package.json` (generate:ai + generate:all),
`public/brand-contract.json`, `public/brand-checklist.md`, `public/brand-few-shots.md`,
`public/brand-agent-rules.md`, `public/llms.txt` (now generated router). Few-shots derive from
`voice.toneExamples` + `voice.surfacePatterns`. Gate MUST spot-check ≥5 contract facts vs brand.ts.

### C4 — asset generator + static asset fixes `[gate-before-commit]`
Ids: BA-3(generator), BA-12, BA-13, BA-32.
Files: `scripts/generate-brand-assets.mjs` (type-samples phrase → ratified category line; add H4/H5
to type-scale; source constants annotated as mirror-of-brand.ts pending full derivation),
`public/favicon.svg` (Ink #18181C / Canvas #FDFDFB), delete `public/icons.svg` (unreferenced,
off-brand — restorable from git if wanted). BA-10 surfaces are NOT touched (fork pending).

### C5 — regenerate derived artifacts + deploy freshness
Ids: BA-2 + regeneration fallout of C1–C4.
Run `npm run generate:all` (assets + PDF now reflect current sources incl. the category noun).
NOTE: committed assets lag the generator since 751c073 (critic-verified: logo-lockup-spectrum-white.svg
absent from public/brand-assets/). Regeneration will CREATE it; its content is Cool Duet
(guide-compliant substance, contested NAME) — generated as committed-generator status quo, naming
resolved by the BA-10 fork.
`.github/workflows/deploy.yml`: add `- run: npm run generate:all` before `npm run build`.
Verify: PDF text contains "composable intelligence platform" and zero "knowledge platform";
`npm run build` green. Commit sweeps ledger/decisions updates.

## NOT implemented (routed)
- **BA-10** lockup third form → FORK to Darren (recommendation in synthesis).
- **BA-16** full operational graph-viz spec → routed to a product design cycle (foundation shipped in C1).
- **BA-24** Singapore origin stance → FORK to Darren (silence codified as interim).
- On-ramp term pick → prepared in synthesis per VM-F-CAT (packages A–E + recommendation); no
  surface changes ride on it in this run.
- Vendored snapshot in `../spectrea/docs/05-reference/brand/` pinned to 4d4c804 → needs re-pin
  after this run's commits (spectrea-side task; NOT done by this run).

## Execution protocol
Integrator (claude-I1) launches after: (1) critic-claude confirms the underlying findings, (2)
critic gates this plan (`accepted` on the plan ids), recorded as the PLAN-APPROVED line. Clusters
apply in order C1→C5; each cluster: apply → `applied-awaiting-gate` → codex-G1 `accepted` → commit
→ `committed | <sha>`. Any GAP returns to orchestrator.
