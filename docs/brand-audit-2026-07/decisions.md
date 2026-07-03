# DECISIONS — brand-audit-2026-07 (append-only; each agent APPENDS, never edits a prior line)

A decision's state = its **latest** line for that id. Write your line in ONE call, only when nudged /
on your turn. Ids (BA-nn) are assigned at intake by the orchestrator — one id namespace with `ledger.md`.

Schema (canonical; wave-2 implement extension declared in `charter.md` — Codex gate accepts the
authored diff BEFORE the integrator commits; no commit-then-verify):
```
BA-nn | found     | <one-line finding> | src findings-<x> | by orchestrator
BA-nn | confirmed | <quoted evidence file:line>           | by critic+<model>
BA-nn | refuted   | <counter-evidence>                    | by critic+<model>
BA-nn | proposed  | apply <file>:<anchor>                 | by orchestrator
BA-nn | accepted  | by critic+<model>   # MUST differ from the drafter's model
BA-nn | GAP       | <what's missing>    | by critic+<model>
BA-nn | committed | <sha>               | by integrator
BA-nn | failed    | <dead lane, reason> | by orchestrator
BA-nn | requeued  | <new pane / brief>  | by orchestrator
```
Forks: `BA-nn | FORK-proposed | <choice + trade-off> | by orchestrator` → ratified ONLY by Darren.

---

<!-- append decision lines below -->

BA-1 | found | source-of-truth authority contradictory: brand.ts "single source" vs Downloads "Markdown is source" vs llms.txt/guide "app wins" (COV-1/DR-1/AIF-20) | src findings-coverage+drift+aiformats | by orchestrator
BA-2 | found | brand-guide.pdf STALE: embedded gen-date 2026-04-19, last touched commit 0cc7399, predates noun fix 4d4c804 — still says "composable knowledge platform"; deploy.yml never regenerates (DR-2) [orch pre-verified via git log] | src findings-drift | by orchestrator
BA-3 | found | stale "Knowledge, connected." in Social.tsx:27 X-bio + generate-brand-assets.mjs:518 + type-samples.svg + PDF (DR-3/VA-1) | src findings-drift+vision | by orchestrator
BA-4 | found | category still explained via knowledge-management adjacency on Positioning.tsx:60-61 + social copy (VA-1) | src findings-vision | by orchestrator
BA-5 | found | totalizing language survives 2026-07-03 de-totalization: "incomparably better" (brand.ts:62,149; guide:35; TypeScale.tsx:130), "ceiling infinite", every/always sweep (DR-4/VA-7) | src findings-drift+vision | by orchestrator
BA-6 | found | neverUse list truncated in guide (8 of 12) + absent from llms.txt key facts (DR-5) | src findings-drift | by orchestrator
BA-7 | found | neverUse lacks 2026 AI-hype cluster: agentic, AI-first, copilot (generic), 10x, supercharge, effortless, magical (COV-4) | src findings-coverage | by orchestrator
BA-8 | found | naming never-rules diverge: guide:139 vs llms.txt:79 vs Naming.tsx:12-17 (DR-6) | src findings-drift | by orchestrator
BA-9 | found | Voice.tsx:50 says "five personality traits"; canon has four (DR-7) | src findings-drift | by orchestrator
BA-10 | found | lockup-form conflict: LogoExploration "full-spectrum-white" uses markColorMode 'color' (true full-spectrum lockup, guide forbids); generated logo-lockup-spectrum-white.svg is actually Cool Duet (misnamed); internal mismatch; approved-form decision = Darren FORK (DR-8) [orch pre-verified: generator:336-340 coolDuetColorFn vs LogoExploration:146-158 markColorMode 'color'] | src findings-drift | by orchestrator
BA-11 | found | dark button hover/active colors hand-invented in Buttons.tsx:52-55, canonical nowhere (DR-9) | src findings-drift | by orchestrator
BA-12 | found | type-scale.svg omits H4/H5; Code SM exists only in live TypeScale (DR-10) | src findings-drift | by orchestrator
BA-13 | found | favicon.svg uses non-canonical #111827/#FFFFFF instead of Ink/Canvas (DR-11) | src findings-drift | by orchestrator
BA-14 | found | voice surface-pattern gaps: onboarding, empty states, confirmations, release notes, notifications, settings/security, legal, support, UI microcopy (COV-2) | src findings-coverage | by orchestrator
BA-15 | found | AI entity naming/personification unbounded: assistant vs agent vs copilot vs Spectrea AI; autonomy-verb rules absent (COV-3) | src findings-coverage | by orchestrator
BA-16 | found | graph/data-viz rendering spec absent — nodes/edges/confidence/states for the product's hero UI (COV-5) | src findings-coverage | by orchestrator
BA-17 | found | WCAG 2.2 AA floor never stated; Pewter whisper rule not operationalized to allow/deny matrix (COV-6) | src findings-coverage | by orchestrator
BA-18 | found | audience model lacks individual/solo tier + ratified breadth mechanics (solo-free-full-featured, pay-after-value) (COV-7/VA-4) | src findings-coverage+vision | by orchestrator
BA-19 | found | governance lacks version metadata, owner map, changelog location; TopBar says v0.1 (COV-8) | src findings-coverage | by orchestrator
BA-20 | found | company-vs-product (Matchwise Pte. Ltd. vs Spectrea) naming rules silent (COV-9) | src findings-coverage | by orchestrator
BA-21 | found | brand.ts machine-token schema incomplete: radii/spacing/elevation/motion/dark tokens/washes/lifts/state colors live only in prose/CSS/TSX (COV-10/AIF-55/DR-9) | src findings-coverage+aiformats | by orchestrator
BA-22 | found | logo numeric edge cases: watermark opacity textual, co-brand optical sizing unstated (COV-11) | src findings-coverage | by orchestrator
BA-23 | found | trust/legal disclosure templates absent (privacy, AI-use, retention, enterprise readiness) despite trust-first brand (COV-12) | src findings-coverage | by orchestrator
BA-24 | found | executive/spokesperson voice + Singapore origin stance silent (COV-13) | src findings-coverage | by orchestrator
BA-25 | found | per-viewer truth (ratified vision §1 property 2, VM-47 differentiated) absent from all brand-visible trust claims (VA-2) | src findings-vision | by orchestrator
BA-26 | found | sovereign-data/export exit-rights claim absent; Social.tsx:28 GitHub bio "Open-source tools." blurs closed-substrate/open-surface posture (VA-3) [orch pre-verified Social.tsx:28] | src findings-vision | by orchestrator
BA-27 | found | mechanism-first graph-led copy vs ratified star-where-it-shines + unanimous outcome-first market grain (VA-5/VM-61/VM-74) | src findings-vision | by orchestrator
BA-28 | found | "compounding intelligence" contested in-market (VM-73: Engram, XTrace); brand stakes it with no mechanism-tying guardrail (VA-6) | src findings-vision | by orchestrator
BA-29 | found | differentiator table generic; not re-anchored to amended moat: per-viewer synthesis, org-executive-function, loop, solo-to-institution delivery (VA-8) | src findings-vision | by orchestrator
BA-30 | found | llms.txt is discovery-only: omits neverUse, density, anti-values, gradient/logo constraints, load order, SPA-route labeling (AIF-21..28) | src findings-aiformats | by orchestrator
BA-31 | found | no derived AI-format pipeline: scripts re-declare constants, brand.ts not .mjs-importable (noEmit), generate:ai + brand-contract.json + checklist + few-shots + agent-rules + regenerated llms.txt needed (AIF-29..43,54-56) [orch pre-verified: zero brand.ts imports in scripts] | src findings-aiformats | by orchestrator
BA-32 | found | public/icons.svg unreferenced by app, contains non-brand colors (W2 residual) | src findings-drift | by orchestrator

BA-1 | confirmed | four-way authority conflict: brand.ts:2 "Brand Data — Single source of truth" vs Downloads.tsx:14+27+31 "Markdown version is the single source of truth"/"Canonical" vs brand-guide.md:813 "If the two ever disagree, the app wins" (llms.txt:19 "live app...is canonical") vs brand-guide.md:680 "regenerated from this as source of truth" | by critic+claude
BA-2 | confirmed | live legs verified: deploy.yml:26-27 runs only npm ci + npm run build (no generate:pdf step); generate-pdf.mjs:280 stamps footer gen-date at run time; guide already "intelligence" (brand-guide.md:3,:8) — PDF text staleness itself (2026-04-19, "knowledge platform") rests on orch git-log/pypdf pre-verification; binary text extraction unavailable in critic sandbox (Bash denied) | by critic+claude
BA-3 | confirmed | Social.tsx:27 X-bio 'We connect the dots. Knowledge, connected.'; generate-brand-assets.mjs:518 + committed type-samples.svg:7 render it as the H2 specimen; phrase has zero canonical basis (guide:651 bio template = "We connect the dots. Composable intelligence platform."; not in brand.ts); PDF leg per findings-drift.md:49 pypdf extraction | by critic+claude
BA-4 | confirmed | Positioning.tsx:60-63 "new category at the intersection of knowledge management, graph intelligence, and composable architecture" vs vision:45-46 "Category: Composable intelligence platform (not knowledge management, not AI assistant...)" (NOTE: social-copy leg did NOT verify — grep "knowledge management" hits only Positioning.tsx:61 in src; social surfaces carry the stale tagline instead, already BA-3) | by critic+claude
BA-5 | confirmed | "incomparably better" live at brand.ts:62 + brand.ts:149 + guide:35 + TypeScale.tsx:130; "the ceiling is infinite" brand.ts:159 + guide:76; vision de-totalized 2026-07-03: spectrea-vision.md:398 amendment (6) EVALUATE "incomparably"->"measurably + testable" (VM-6); sibling app-overview.md:64 already reads "measurably better" | by critic+claude
BA-6 | confirmed | guide:125 "Words we never use:" lists exactly 8; brand.ts:332-336 neverUse has 12 — guide omits seamless, cutting-edge, synergy, leverage (as verb); llms.txt Key facts :77-97 carry no neverUse list at all | by critic+claude
BA-7 | confirmed | brand.ts:332-336 neverUse = 12 legacy hype terms only; agentic / AI-first / copilot(generic) / 10x / supercharge / effortless / magical verified absent from every canon surface (repo grep: hits only in immutable docs/ history + this audit's own files); whether to ADD them = Darren veto per plan.md:58-59 | by critic+claude
BA-8 | confirmed | three divergent never-sets with no shared union: guide:139 {SpectreAI, "Spectrea AI" (lead), spectra}; llms.txt:79 {Spectre, Spectra, SpectreAI}; Naming.tsx:12-18 {all-caps, lowercase-in-headings, "The Spectrea", hype-terms, random-caps} | by critic+claude
BA-9 | confirmed | Voice.tsx:50 "the verbal expression of its five personality traits" vs brand.ts:108-129 exactly four trait objects (Warm/Perceptive/Grounded/Adaptive) + guide:54 "Personality (four traits with guardrails)" + llms.txt:92 "(v2, 4 traits)" | by critic+claude
BA-10 | confirmed | LogoExploration.tsx:146-158 'full-spectrum-white' markColorMode:'color' + lockupEnabled:true (ditto 'full-spectrum' :132-144) = a third lockup form vs guide:183 "No gradient-filled wordmark, no full-spectrum lockup"; generator :334-340 writes logo-lockup-spectrum-white.svg with coolDuetColorFn under the self-contradictory comment "Full spectrum style — Cool Duet mark"; file also ABSENT from public/brand-assets/ (assets never regenerated since 751c073); approved-form pick = Darren FORK as intaken | by critic+claude
BA-11 | confirmed | Buttons.tsx:52-55 dark hover/active hexes (#5C87E5/#7699EB, #F56579/#F78892, #20C8B2/#40D4C3, #ECA41E/#F2B63C) + :47 secondaryHover #3A3A40 appear nowhere in brand.ts or guide — guide:283-286 specifies light-mode hover/active only | by critic+claude
BA-12 | confirmed | committed type-scale.svg:5-24 ladder = 10 steps, omitting H4, H5 AND Code SM vs guide:474-482 + TypeScale.tsx:13-21 (13 steps, matching each other) (NOTE: sub-claim "Code SM exists only in live TypeScale" is inaccurate — Code SM is also in guide:482; the drift is SVG-vs-both, slightly wider than intaken) | by critic+claude
BA-13 | confirmed | favicon.svg:1 container circle fill="#111827" (Tailwind gray-900, non-token) + mark dots/strokes "#FFFFFF" vs canonical Ink #18181C (brand.ts:431) / Canvas #FDFDFB (brand.ts:429); guide:228 mandates variant #10 ink circle for favicon | by critic+claude
BA-14 | confirmed | voice system = 4 toneSpectrum contexts (brand.ts:291-312) + 6 toneExamples (:354-391) + 2 contextShifts (:339-348); onboarding, empty-state, confirmation, notification, settings/security, legal, and support VOICE patterns absent (NOTE: narrow the list — release-notes~="Feature Announcement" exists brand.ts:368-372, Cards.tsx:294-321 covers empty-state UI layout but not copy voice, product microcopy partially covered by contextShifts.product :344-347) | by critic+claude
BA-15 | confirmed | no rule selects assistant vs agent vs copilot vs "Spectrea AI": guide:147 uses "the assistant" only as a lowercase-noun EXAMPLE; guide:139 bounds only "Spectrea AI (lead)"; autonomy stance exists at value level (brand.ts:117 "suggests, never dictates"; :139-140; :167-168) but no copy-level verb allow/deny list for AI actions | by critic+claude
BA-16 | confirmed | only graph vocabulary in canon is illustration primitives (guide:528-530 "node, edge, cluster, trail, confidence, highlight" as 120x90 hand-SVG cards) + motion Formation (guide:599); no product graph-UI rendering spec (node/edge colours by type, confidence display, selected/hover/stale states) although the graph is the celebrated hero surface (VM-F3 star-where-it-shines, vision-market decisions.md:150); nearest crumb: guide:279 maps Amber to "confidence" | by critic+claude
BA-17 | confirmed | NARROWED, severity should drop: "WCAG 2" appears nowhere in repo (grep zero) and guide:492-496 gives contrast-only minimums unversioned — no 2.2 non-contrast criteria (focus appearance, target size); BUT the Pewter half is weak: guide:309 already carries an allow-list (overlines, timestamps, meta chips, placeholders, captions) + step-up rule, and guide:320 a deny ("whisper — never for informational text"); residual gap is matrix FORM + version pin only | by critic+claude
BA-18 | confirmed | brand.ts:210-235 audiences = 4 org-tier personas, no individual/solo row; ratified mechanics absent canon-wide: VM-F-BREADTH-MECH (vision-market decisions.md:267 "free tier full-featured... pay-AFTER-first-value", capacity-triggered upgrades, free bounded collaboration) + vision:398 amendment (5) (NOTE: Positioning.tsx:29-32 prose acknowledges individuals/freelancers but has no need/message row and no mechanics) | by critic+claude
BA-19 | confirmed | NARROWED: no version stamp on guide or brand.ts; TopBar.tsx:21 hardcodes "v0.1" while llms.txt:5 says "(v2, 2026-04-18)" — divergent version story; BUT an owner exists at role level (guide:680 "Brand lead owns this document") and a changelog location IS stated (guide:677 "change log posted in #brand") — real gaps are version metadata + a durable in-repo changelog, not total governance silence | by critic+claude
BA-20 | confirmed | "Matchwise" appears in ZERO canon surfaces (repo grep: hits only docs/matchwise-brand-audit.txt + brand-critical-review.md history); no company-vs-product naming rule anywhere in brand.ts, guide, llms.txt, or src pages | by critic+claude
BA-21 | confirmed | brand.ts machine surface ends at typography (:248-273) + palette (:418-438): radii/spacing/elevation live only in guide:735-800 CSS/prose, hover/active state colours only in guide:283-286 + Buttons.tsx:52-55, washes/lifts only in guide:291-296/:367-384 (NOTE: "dark tokens" leg inaccurate — brand.ts:437 darkMode already holds the 5 dark tokens; NOTE adjacent issue: Downloads.tsx:208-210 CSS block ships only 2 of 6 radii and no spacing/elevation vs guide:735-751 — same-family drift) | by critic+claude
BA-22 | confirmed | watermark opacity textual on every surface: guide:236 "#5 at low opacity", Variations.tsx:215 + :395 "low opacity", LogoExploration.tsx:197 "apply at low opacity" — no canonical numeric anywhere, while demo divs use unspecced literals (Variations.tsx:59/:210 opacity 0.2, Misuse.tsx:69 0.25); co-brand row guide:233 names variants #3/#4 only, no optical-sizing rule | by critic+claude
BA-23 | confirmed | zero privacy / AI-use / retention / disclosure templates in canon (grep GDPR|retention|privacy policy|disclosure: no canon hits — matches were unrelated notification-badge/empty-state UI) despite trust-first positioning (brand.ts:143-146) and vision:398 amendment (7) adding ISO 42001-class attestation + managed-path no-train contract | by critic+claude
BA-24 | confirmed | "Singapore" absent from all canon (repo grep: only docs/matchwise-brand-audit.txt history); no executive/spokesperson voice section anywhere in brand.ts voice (:285-392), guide §2, or guide §12 Communications | by critic+claude
BA-25 | confirmed | "per-viewer" has ZERO hits in spectrea-branding (repo grep); brand trust claims stop at transparency/traceability (brand.ts:53-56 secondary message, :143-146 value, guide:73); vision side live: spectrea-vision.md:49-54 "Structural trust includes per-viewer truth..." + moat anchor :99-100 + VM-47 confirmed (vision-market decisions.md:155) | by critic+claude
BA-26 | confirmed | sovereign-data/export-guarantee absent canon-wide (grep "sovereign": zero canon hits; differentiators stop at "Private by default" brand.ts:244) vs VM-F-SUBSTRATE (vision-market decisions.md:265) "full-fidelity export (structure+data+provenance) as MARKETED first-class guarantee" + vision:398 amendment (8); Social.tsx:28 GitHub bio "Open-source tools." contradicts ratified L1 closed-source / L3 open-interfaces posture | by critic+claude
BA-27 | confirmed | flagship copy mechanism-leads: brand.ts:48-49 primary supporting "...brings it together into a single living graph", :295 marketing example "Spectrea builds a living graph..." — against the brand's own rule brand.ts:288-289 "Start with the human benefit, then introduce the technical concept" + VM-61 confirmed (vision-market decisions.md:169) + VM-74 confirmed-directional (:256 outcome-first primary-verified heroes) + VM-F3 star-where-it-shines (:150 — non-exploration jobs outcome-first) | by critic+claude
BA-28 | confirmed | brand stakes the phrase with no guardrail: brand.ts:36 promise, :59-62 secondary message, :148-150 value; guide:3+:29+:35; llms.txt:3 — no canon text ties "compounding" to mechanism/evidence or flags contest; VM-73 confirmed contested (vision-market decisions.md:195+:236 — Engram $98M launch 2026-06-23, XTrace "own and compound their intelligence") | by critic+claude
BA-29 | confirmed | brand.ts:238-245 differentiator table = six generic rows (transparent/compounding/verifiable/composable/unified/private) vs amended moat vision:98-104 "per-viewer claim synthesis" + "org-executive-function as graph artefacts" + closed KNOW->PLAN->ACT->EVALUATE loop + "delivered self-serve from individual to institution" — zero of the four moat elements surface in the table | by critic+claude
BA-30 | confirmed | llms.txt omits: neverUse (nowhere in :1-97), density rule (guide:127 unmirrored), anti-values (guide:78-82 unmirrored), gradient/logo never-rules (guide:447/:242 unmirrored), reading/load order, and SPA-route caveat (:44-75 link client-rendered routes unlabelled) (NOTE: "discovery-only" overstates — Key facts :77-97 is substantive; the enumerated omissions are the confirmed part) | by critic+claude
BA-31 | confirmed | scripts import zero brand data: generate-brand-assets.mjs:17-20 + generate-pdf.mjs:15-20 pull only node builtins + fontkit, and re-declare palette constants (generate-brand-assets.mjs:54-66 COBALT/TEAL/CANVAS/INK hardcoded); tsconfig.json:12 "noEmit": true (brand.ts emits no importable JS); package.json:10-12 has generate:assets/pdf/all only — no generate:ai; no brand-contract.json / checklist / few-shots exist in public/ | by critic+claude
BA-32 | confirmed | public/icons.svg unreferenced (repo grep "icons.svg": zero hits in src/ or index.html — index.html:5 loads favicon.svg only) and carries non-brand colours: icons.svg:10-12+:18-19 stroke="#aa3bff" (purple — off-brand per guide:568) and :3/:7/:15/:22 fill="#08060d" ≠ Ink #18181C | by critic+claude

BA-1 | proposed | apply plan.md C1 (brand.ts meta.sourceOfTruth) + C2 (guide footer + Downloads stanza) + C3 (llms stanza) | by orchestrator
BA-2 | proposed | apply plan.md C5 (regenerate PDF + deploy.yml generate:all before build) | by orchestrator
BA-3 | proposed | apply plan.md C2 (Social.tsx X-bio) + C4 (generator type-samples phrase) + C5 (regen) | by orchestrator
BA-4 | proposed | apply plan.md C2 (Positioning.tsx category explanation, outcome-first, derive from brand.ts) — social leg dropped per critic narrowing | by orchestrator
BA-5 | proposed | apply plan.md C1 (brand.ts de-totalize) + C2 (guide/TypeScale/Copy text) | by orchestrator
BA-6 | proposed | apply plan.md C2 (guide full 12-item neverUse) + C3 (llms regeneration carries it) | by orchestrator
BA-7 | proposed | apply plan.md C1 (neverUse + AI-hype cluster; Darren veto noted in synthesis) | by orchestrator
BA-8 | proposed | apply plan.md C1 (naming.neverNames union) + C2 (guide/llms/Naming page unified) | by orchestrator
BA-9 | proposed | apply plan.md C2 (Voice.tsx five→four via brand.personality.length) | by orchestrator
BA-11 | proposed | apply plan.md C1 (brandTokens state colors; gate checks contrast) | by orchestrator
BA-12 | proposed | apply plan.md C4 (type-scale.svg add H4/H5/Code SM — full 13-step ladder per critic-widened scope) | by orchestrator
BA-13 | proposed | apply plan.md C4 (favicon Ink/Canvas) | by orchestrator
BA-14 | proposed | apply plan.md C1 (voice.surfacePatterns, narrowed list) + C2 (guide mirror) | by orchestrator
BA-15 | proposed | apply plan.md C1 (naming.aiNaming) + C2 (guide mirror) | by orchestrator
BA-16 | proposed | apply plan.md C1 (graphViz foundation ONLY; full operational spec routed to product design cycle) | by orchestrator
BA-17 | proposed | apply plan.md C1 (WCAG 2.2 AA pin + 2.2 criteria + Pewter matrix form; narrowed) + C2 (guide mirror) | by orchestrator
BA-18 | proposed | apply plan.md C1 (audiences + solo tier + breadth mechanics) + C2 (guide/Positioning mirror) | by orchestrator
BA-19 | proposed | apply plan.md C1 (meta.version/lastUpdated/changelog pointer; narrowed — owner exists) + C2 (TopBar version derives from brand.ts meta) | by orchestrator
BA-20 | proposed | apply plan.md C1 (naming.companyProduct) + C2 (guide mirror) | by orchestrator
BA-21 | proposed | apply plan.md C1 (brandTokens full schema) + C2 (Downloads CSS completion) + C3 (contract emits tokens) | by orchestrator
BA-22 | proposed | apply plan.md C1 (logo.constraints numerics: watermark ≤20%, co-brand optical rule) + C2 (guide mirror) | by orchestrator
BA-23 | proposed | apply plan.md C1 (trustCopy, counsel-review flag) + C2 (guide Trust & disclosures section) | by orchestrator
BA-24 | proposed | apply plan.md C1 (executiveVoice only; originStance recorded as undecided/silent — Singapore = FORK) + C2 (guide mirror) | by orchestrator
BA-25 | proposed | apply plan.md C1 (per-viewer truth in value + differentiators) + C2 (guide mirror) | by orchestrator
BA-26 | proposed | apply plan.md C1 (sovereign-data proof point) + C2 (GitHub bio → "Composable intelligence platform. Open interfaces and developer tools.") | by orchestrator
BA-27 | proposed | apply plan.md C1 (outcome-first rule in voice; messaging supporting-copy rewrite) + C2 (Copy.tsx examples) | by orchestrator
BA-28 | proposed | apply plan.md C1 (compounding usageGuardrail, dated contested note; claim itself KEPT) + C2 (guide mirror) | by orchestrator
BA-29 | proposed | apply plan.md C1 (differentiators re-anchored to amended moat + retrieval-never-differentiator guardrail) + C2 (guide mirror) | by orchestrator
BA-30 | proposed | apply plan.md C3 (llms.txt regenerated as router with hard facts + load order + SPA labeling) | by orchestrator
BA-31 | proposed | apply plan.md C3 (generate-ai-formats.mjs via TS-compiler-API transpile; contract/checklist/few-shots/agent-rules; generate:ai in package.json; deploy freshness in C5) | by orchestrator
BA-32 | proposed | apply plan.md C4 (delete public/icons.svg; restorable from git) | by orchestrator
BA-10 | FORK-proposed | lockup third form: (a) approve "Full Spectrum / White" as third lockup form (guide two-forms rule amended) vs (b) re-scope app style + asset name to Cool Duet (variant #7 — matches what the generator actually renders; two-forms rule intact). Orchestrator recommendation: (b), quality axis = system legibility (two-forms rule is load-bearing; the shipped SVG is already Cool Duet). Darren decides | by orchestrator
BA-24F | FORK-proposed | Singapore origin stance: lean-in ("engineered in Singapore" as governance/rigor signal) vs codified silence. Orchestrator recommendation: codified silence until a GTM cycle argues otherwise, quality axis = claim discipline (brand only carries claims with proof surfaces behind them). Darren decides | by orchestrator
PLAN-1 | proposed | PLAN-APPROVED gate: implement plan.md clusters C1-C5 (user pre-authorization = brief.md:17+71-77; forks BA-10/BA-24F/on-ramp term EXCLUDED from implementation). Critic: verify plan.md against the confirmed findings and append accepted or GAP per proposed id above, plus on this PLAN-1 line | by orchestrator

BA-1 | accepted | by critic+claude
BA-2 | accepted | by critic+claude
BA-3 | accepted | by critic+claude
BA-4 | accepted | by critic+claude
BA-5 | accepted | note: plan.md C2 file list (:93-99) omits src/pages/typography/TypeScale.tsx though the BA-5 proposed line names it — integrator must include TypeScale.tsx:130 or "incomparably better" survives | by critic+claude
BA-6 | accepted | by critic+claude
BA-7 | accepted | by critic+claude
BA-8 | accepted | by critic+claude
BA-9 | accepted | by critic+claude
BA-11 | accepted | by critic+claude
BA-12 | accepted | by critic+claude
BA-13 | accepted | by critic+claude
BA-14 | accepted | by critic+claude
BA-15 | accepted | by critic+claude
BA-16 | accepted | by critic+claude
BA-17 | accepted | by critic+claude
BA-18 | accepted | by critic+claude
BA-19 | accepted | by critic+claude
BA-20 | accepted | by critic+claude
BA-21 | accepted | by critic+claude
BA-22 | accepted | by critic+claude
BA-23 | accepted | by critic+claude
BA-24 | accepted | by critic+claude
BA-25 | accepted | by critic+claude
BA-26 | accepted | by critic+claude
BA-27 | accepted | note: rewrite touches flagship supporting copy but NOT the tagline; new copy is wave-2 Codex-gate territory — check it opens with outcome per VM-F3 before commit | by critic+claude
BA-28 | accepted | by critic+claude
BA-29 | accepted | by critic+claude
BA-30 | accepted | by critic+claude
BA-31 | accepted | by critic+claude
BA-32 | accepted | by critic+claude
PLAN-1 | accepted | PLAN-APPROVED: all 31 proposed ids verified against confirmed verdicts + charter — every confirmed id routed (implement, C1-C5) or explicitly excluded (BA-10/BA-24F forks, on-ramp term, BA-16 full spec, spectrea re-pin); all six critic narrowings honored in the plan text; cross-model gate preserved (codex-G1 on every authored diff before commit); hard rules hold (no push, spectrea read-only, noun untouched, forks PREPARE-only); caveats ride BA-5 (TypeScale.tsx in C2) + BA-27 (outcome-first copy check at wave-2 gate) | by critic+claude
GATE-LANE | failed | fresh codex-G1 panes died 3x back to shell (wP:p8 twice, wP:p9 once - Codex session/usage cap suspected; the 4 worker sessions from earlier persist fine) | by orchestrator
GATE-LANE | requeued | gate duty reassigned to IDLE CODEX WORKER PANES with rotation to dilute finding-level self-approval: C1+C3 gated by worker-drift pane wP:p3 (its drafts least embodied there - only BA-11), C2+C4+C5 gated by worker-coverage pane wP:p2; hard cross-model rule intact (author = Claude integrator, gate = Codex); deviation recorded for the MODEL SPLIT/drift ledger | by orchestrator

BA-1 | applied-awaiting-gate | src/data/brand.ts (meta.sourceOfTruth hierarchy; guide/llms legs ride C2/C3) | by integrator
BA-5 | applied-awaiting-gate | src/data/brand.ts (data leg: "incomparably"×2 → measurably-sharper phrasing; "ceiling is infinite" → "ceiling rises with you"; text legs incl. TypeScale.tsx:130 ride C2 per critic caveat) | by integrator
BA-6 | applied-awaiting-gate | src/data/brand.ts (canon leg: voice.neverUse stays the single canonical list, now 19 items; guide/llms mirrors ride C2/C3) | by integrator
BA-7 | applied-awaiting-gate | src/data/brand.ts (voice.neverUse + agentic, AI-first, copilot (as generic noun), 10x, supercharge, effortless, magical; Darren veto flagged for synthesis) | by integrator
BA-8 | applied-awaiting-gate | src/data/brand.ts (naming.neverNames = union of guide:139 + llms:79 + Naming.tsx:12-18 sets, 8 entries; page/guide/llms mirrors ride C2/C3) | by integrator
BA-11 | applied-awaiting-gate | src/data/brand.ts (brandTokens.buttonStates: light per guide:283-286 + dark CANONIZED from Buttons.tsx:52-55 incl. secondary hover #3A3A40 — integrator pick per plan; dark hover/active lighten-on-dark, transient-state contrast note left for gate) | by integrator
BA-14 | applied-awaiting-gate | src/data/brand.ts (voice.surfacePatterns: onboarding, empty states, confirmations, notifications, settings/security, legal, support — rule + right/wrong each; release notes excluded per critic narrowing) | by integrator
BA-15 | applied-awaiting-gate | src/data/brand.ts (naming.aiNaming: canonical noun "the assistant"/"Assistant", never copilot/"Spectrea AI", verbs suggests/surfaces/drafts vs decides/acts-without-review) | by integrator
BA-16 | applied-awaiting-gate | src/data/brand.ts (graphViz foundation: node/edge/confidence/state colour semantics mapped to Tier-3 + graph vocabulary; full operational spec routed to product design cycle per plan) | by integrator
BA-17 | applied-awaiting-gate | src/data/brand.ts (accessibility: WCAG 2.2 AA pin + focus-appearance/target-size≥24px/dragging-alternatives + Pewter allow/deny matrix formalizing guide:309/:320) | by integrator
BA-18 | applied-awaiting-gate | src/data/brand.ts (audiences + "Solo Knowledge Workers" first-class row + audienceBreadth free→invite→pay-at-capacity mechanics per VM-F-BREADTH-MECH) | by integrator
BA-19 | applied-awaiting-gate | src/data/brand.ts (meta.version '2.1.0' + lastUpdated 2026-07-03 + changelog pointer; TopBar derivation rides C2) | by integrator
BA-20 | applied-awaiting-gate | src/data/brand.ts (naming.companyProduct: Matchwise Pte. Ltd. = legal entity only, Spectrea = product/brand, legacy-name policy) | by integrator
BA-21 | applied-awaiting-gate | src/data/brand.ts (brandTokens: radii/spacing/elevation/motion durations+easings/washes light+dark/lifts/focus ring — from guide §5/§10/§14; Downloads CSS completion rides C2) | by integrator
BA-22 | applied-awaiting-gate | src/data/brand.ts (logo.constraints: dotCount 10, circle-never-squircle, dots #A3A3A3, tail-only-in-canonical-lockup, clear-space 0.5×, watermarkMaxOpacity 0.2, co-brand optical-height rule; lockupForms held at 2 pending BA-10 fork) | by integrator
BA-23 | applied-awaiting-gate | src/data/brand.ts (trustCopy: privacy/aiUse/retention/enterpriseReadiness masters + counsel-review note; attestations phrased as stated targets per vision:398 amendment 7) | by integrator
BA-24 | applied-awaiting-gate | src/data/brand.ts (executiveVoice practitioner rule + example pair; originStance EXPLICITLY undecided → silent, Singapore = Darren fork BA-24F untouched) | by integrator
BA-25 | applied-awaiting-gate | src/data/brand.ts (per-viewer truth added to Trustworthy Intelligence description + differentiators row 1, phrasing from vision:49-54) | by integrator
BA-26 | applied-awaiting-gate | src/data/brand.ts (sovereign-data full-fidelity-export proof point in Human-First proof + differentiators row 7 per VM-F-SUBSTRATE L2; GitHub bio rides C2) | by integrator
BA-27 | applied-awaiting-gate | src/data/brand.ts (voice.outcomeFirst rule per VM-F3 star-where-it-shines; messaging.primary.supporting rewritten outcome-first — graph no longer opens flagship copy; Copy.tsx examples ride C2; gate to check new copy opens with outcome per critic caveat) | by integrator
BA-28 | applied-awaiting-gate | src/data/brand.ts (usageGuardrail on Compounding Intelligence value + messaging secondary, contested-phrase note dated 2026-07-03 per VM-73; claim itself KEPT) | by integrator
BA-29 | applied-awaiting-gate | src/data/brand.ts (differentiators re-anchored: 4 moat rows [per-viewer truth · graph-resident decisions w/ provenance · outcomes feed back · one substrate solo→institution] + 3 retained qualities + differentiatorGuardrail "retrieval/search quality never the differentiator") | by integrator
C1 | applied-awaiting-gate | cluster complete: single edit pass over src/data/brand.ts (+9 new exports: meta, naming, brandTokens, accessibility, logo, graphViz, trustCopy, executiveVoice, originStance); npm run build GREEN (tsc -b && vite build, 85 modules); working tree uncommitted, awaiting codex gate wP:p3 per GATE-LANE requeue | by integrator
GATE-LANE | requeued | machine/session restart killed all wave-1 panes pre-C1-apply (no repo mutations lost - tree was clean); Codex sessions start again post-restart. Gate = FRESH codex session in wP:p3 (relaunched pane; prior worker context died with the restart, so no finding-level framing inheritance - single standing gate for all clusters). Integrator relaunched fresh in wP:pB with C1 go-signal | by orchestrator
BA-1 | accepted | by critic+codex
BA-5 | accepted | by critic+codex
BA-6 | accepted | by critic+codex
BA-7 | accepted | by critic+codex
BA-8 | accepted | by critic+codex
BA-11 | GAP | dark hover/active states fail contrast sanity with white text and the new AA claim is too broad; examples include teal active #40D4C3 at 1.84:1 and amber active #F2B63C at 1.82:1, src/data/brand.ts:555 | by critic+codex
BA-14 | accepted | by critic+codex
BA-15 | accepted | by critic+codex
BA-16 | accepted | by critic+codex
BA-17 | accepted | by critic+codex
BA-18 | accepted | by critic+codex
BA-19 | accepted | by critic+codex
BA-20 | accepted | by critic+codex
BA-21 | accepted | by critic+codex
BA-22 | accepted | by critic+codex
BA-23 | accepted | by critic+codex
BA-24 | accepted | by critic+codex
BA-25 | accepted | by critic+codex
BA-26 | accepted | by critic+codex
BA-27 | accepted | by critic+codex
BA-28 | accepted | by critic+codex
BA-29 | accepted | by critic+codex
C1 | GAP | BA-11 unresolved: dark button hover/active contrast guardrail missing/false, src/data/brand.ts:555 | by critic+codex
BA-11 | proposed | REVISED per gate GAP: do NOT canonize the Buttons.tsx dark hover/active values. In brandTokens.buttonStates keep light (guide-backed) canonical; move dark hover/active to an explicitly-labelled exploratory field with an honest annotation: fails AA with white text (teal active #40D4C3 1.84:1, amber active #F2B63C 1.82:1) - dark interactive-state colour design is an OPEN item routed to a design cycle. Remove any broad AA claim covering these values. Buttons.tsx untouched (demo stays as-is; C2/C4 do not promote it) | by orchestrator
BA-11 | applied-awaiting-gate | src/data/brand.ts (buttonStates restructured per revised proposal: light block canonical; darkExploratory block carries the Buttons.tsx demo values with machine-visible status annotation quoting the failing ratios — teal active #40D4C3 1.84:1, amber active #F2B63C 1.82:1 — and OPEN-item routing; broad AA claim removed; Buttons.tsx untouched) | by integrator
C1 | applied-awaiting-gate | BA-11 gate revision applied; npm run build GREEN again (tsc -b && vite build); working tree still uncommitted, cluster back to gate wP:p3 | by integrator
BA-11 | accepted | by critic+codex
C1 | accepted | by critic+codex

BA-1 | committed | 2df71aa (C1 leg; guide/llms legs ride C2/C3) | by integrator
BA-5 | committed | 2df71aa (data leg; TypeScale.tsx + guide text legs ride C2) | by integrator
BA-6 | committed | 2df71aa (canon leg; guide/llms mirrors ride C2/C3) | by integrator
BA-7 | committed | 2df71aa | by integrator
BA-8 | committed | 2df71aa (canon leg; guide/Naming/llms mirrors ride C2/C3) | by integrator
BA-11 | committed | 2df71aa (as revised at gate: light canonical, darkExploratory annotated) | by integrator
BA-14 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-15 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-16 | committed | 2df71aa (foundation only) | by integrator
BA-17 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-18 | committed | 2df71aa (canon leg; guide/Positioning mirror rides C2) | by integrator
BA-19 | committed | 2df71aa (meta leg; TopBar derivation rides C2) | by integrator
BA-20 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-21 | committed | 2df71aa (canon leg; Downloads CSS + contract legs ride C2/C3) | by integrator
BA-22 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-23 | committed | 2df71aa (canon leg; guide section rides C2) | by integrator
BA-24 | committed | 2df71aa (executiveVoice + originStance silent; BA-24F fork stays with Darren) | by integrator
BA-25 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-26 | committed | 2df71aa (canon leg; GitHub bio rides C2) | by integrator
BA-27 | committed | 2df71aa (canon leg; Copy.tsx examples ride C2) | by integrator
BA-28 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
BA-29 | committed | 2df71aa (canon leg; guide mirror rides C2) | by integrator
C1 | committed | 2df71aa — one-cluster-one-commit; blackboard swept into same commit; build green at commit time | by integrator

BA-1 | applied-awaiting-gate | public/brand-guide.md (footer "app wins" → brand.ts-canonical stanza; governance Owner + Version steps re-pointed at brand.ts) + src/pages/resources/Downloads.tsx (tooltip/badge/description/regeneration stanza: md+PDF = derived mirrors, brand.ts wins); llms leg rides C3 | by integrator
BA-3 | applied-awaiting-gate | src/pages/communications/Social.tsx (X bio → "We connect the dots. Composable intelligence platform." per guide:651 template); generator + regen legs ride C4/C5 | by integrator
BA-4 | applied-awaiting-gate | src/pages/foundation/Positioning.tsx (category derives from brand.positioning.category; knowledge-management-adjacency explanation replaced with vision-ratified not-KM/not-assistant/not-automation + outcome-named category) | by integrator
BA-5 | applied-awaiting-gate | public/brand-guide.md (guide:35 "incomparably" → measurably-sharper phrasing; guide:76 ceiling → bounded) + src/pages/typography/TypeScale.tsx:130 ("incomparably better" → "measurably sharper still" — critic caveat honored); BA-5 now fully applied across all confirmed legs | by integrator
BA-6 | applied-awaiting-gate | public/brand-guide.md (neverUse list now mirrors full canon — 19 items incl. BA-7 additions); llms leg rides C3 | by integrator
BA-8 | applied-awaiting-gate | public/brand-guide.md (§3 Never line = unified 8-entry canon list) + src/pages/foundation/Naming.tsx (incorrect-usage hand list replaced by naming.neverNames derivation); llms leg rides C3 | by integrator
BA-9 | applied-awaiting-gate | src/pages/foundation/Voice.tsx ("five" → {brand.personality.length}, renders 4 and can never drift again) | by integrator
BA-14 | applied-awaiting-gate | public/brand-guide.md (§2 Surface patterns table — 7 surfaces, rule + right/wrong each, release-notes pointer to Feature Announcement) | by integrator
BA-15 | applied-awaiting-gate | public/brand-guide.md (§3 "Naming the AI" mirror of naming.aiNaming) | by integrator
BA-16 | applied-awaiting-gate | public/brand-guide.md (§5 graph-viz colour semantics foundation + routed-to-design-cycle note) | by integrator
BA-17 | applied-awaiting-gate | public/brand-guide.md (§7 WCAG 2.2 AA pin + three 2.2 criteria; §5 Pewter prose recast as explicit allow/deny matrix) | by integrator
BA-18 | applied-awaiting-gate | public/brand-guide.md (§1 Audiences — five personas + breadth path) + src/pages/foundation/Positioning.tsx (Audience Scope: five personas, solo first-class; renders brand.audienceBreadth) | by integrator
BA-19 | applied-awaiting-gate | public/brand-guide.md (header Version 2.1.0 line; governance version step → meta.version; durable changelog = git history) + src/components/layout/TopBar.tsx (v0.1 → v{meta.version}) | by integrator
BA-20 | applied-awaiting-gate | public/brand-guide.md (§3 "Company vs product" mirror of naming.companyProduct) | by integrator
BA-21 | applied-awaiting-gate | src/pages/resources/Downloads.tsx (CSS tokens completed: 6 radii + 8 spacing vars matching guide §14 + elevation reference comment) | by integrator
BA-22 | applied-awaiting-gate | public/brand-guide.md (watermark row "low opacity" → "≤20% opacity"; co-brand row + optical-height rule) | by integrator
BA-23 | applied-awaiting-gate | public/brand-guide.md (§12 Trust & disclosures — four approved masters + counsel note) | by integrator
BA-24 | applied-awaiting-gate | public/brand-guide.md (§12 Executive voice + origin-silence note; fork stays with Darren) | by integrator
BA-25 | applied-awaiting-gate | public/brand-guide.md (value 2 per-viewer sentence + Differentiators row 1) | by integrator
BA-26 | applied-awaiting-gate | src/pages/communications/Social.tsx (GitHub bio → "Composable intelligence platform. Open interfaces and developer tools.") + public/brand-guide.md (value 1 sovereign-export sentence + Differentiators row 7) | by integrator
BA-27 | applied-awaiting-gate | public/brand-guide.md (§2 Outcome-first paragraph) + src/pages/communications/Copy.tsx (short-description + press boilerplate de-totalized and outcome-first; "One graph" formula example → "One connected view"; Do bullet → outcome-first) — all new copy opens with outcome per critic caveat | by integrator
BA-28 | applied-awaiting-gate | public/brand-guide.md (messaging item 2 measurably-sharper + usage guardrail with dated contested note) | by integrator
BA-29 | applied-awaiting-gate | public/brand-guide.md (§1 Differentiators table re-anchored to 4 moat rows + retrieval-never guardrail) | by integrator
C2 | applied-awaiting-gate | cluster complete: public/brand-guide.md mirror sweep + 7 app files (Social, Positioning, Voice, TypeScale, Copy, Downloads, Naming, TopBar); llms.txt untouched per plan (regenerated in C3); npm run build GREEN (tsc -b && vite build); residual grep clean (only deliberate "not knowledge management" negation remains); uncommitted, awaiting codex gate | by integrator
BA-1 | GAP | guide source-of-truth mirror adds Figma library/Tailwind config as derived mirrors outside meta.sourceOfTruth hierarchy, public/brand-guide.md:752 | by critic+codex
BA-3 | accepted | by critic+codex
BA-4 | accepted | by critic+codex
BA-5 | accepted | by critic+codex
BA-6 | accepted | by critic+codex
BA-8 | accepted | by critic+codex
BA-9 | accepted | by critic+codex
BA-14 | GAP | guide surface-pattern mirror omits canonical rule clauses, e.g. onboarding drops "No feature carousels, no welcome to the future", public/brand-guide.md:151 | by critic+codex
BA-15 | GAP | guide AI-naming mirror omits forbidden verb "takes over" from naming.aiNaming.forbiddenVerbs, public/brand-guide.md:198 | by critic+codex
BA-16 | accepted | by critic+codex
BA-17 | accepted | by critic+codex
BA-18 | GAP | guide audience mirror summarizes personas instead of mirroring brand.audiences who/need/message values, e.g. Solo Knowledge Workers need is absent, public/brand-guide.md:87 | by critic+codex
BA-19 | accepted | by critic+codex
BA-20 | accepted | by critic+codex
BA-21 | accepted | by critic+codex
BA-22 | GAP | guide co-brand row omits the align-on-vertical-centres clause from logo.constraints.coBrand, public/brand-guide.md:280 | by critic+codex
BA-23 | accepted | by critic+codex
BA-24 | GAP | guide executive-voice mirror omits the correct/incorrect example pair from executiveVoice.example, public/brand-guide.md:735 | by critic+codex
BA-25 | GAP | guide Trustworthy Intelligence value mirror drops "coexisting perspectives stay attributed" from brand.values, public/brand-guide.md:74 | by critic+codex
BA-26 | GAP | guide Human-First value mirror drops "You can always leave with everything" from sovereign-export proof, public/brand-guide.md:73 | by critic+codex
BA-27 | GAP | new press boilerplate opens with category ("Spectrea is a composable intelligence platform") instead of outcome, src/pages/communications/Copy.tsx:111 | by critic+codex
BA-28 | GAP | guide compounding guardrail omits "the mechanism, not the slogan, carries the claim" from brand.ts, public/brand-guide.md:36 | by critic+codex
BA-29 | GAP | guide differentiator guardrail omits "differentiate on what the substrate makes structural" from brand.ts, public/brand-guide.md:108 | by critic+codex
C2 | GAP | unresolved mirror/copy gaps: BA-1, BA-14, BA-15, BA-18, BA-22, BA-24, BA-25, BA-26, BA-27, BA-28, BA-29 | by critic+codex
C2 | proposed | REWORK per gate GAPs (11 ids): governing rule for ALL guide mirrors - carry the brand.ts clause VERBATIM, never paraphrase or summarize (paraphrase-divergence is the drift disease this run kills). Fix each individual GAP line exactly: BA-1 remove Figma/Tailwind additions not in meta.sourceOfTruth; BA-14 restore dropped rule clauses; BA-15 add "takes over" to forbidden verbs mirror; BA-18 mirror full who/need/message per persona; BA-22 add align-on-vertical-centres clause; BA-24 include the correct/incorrect example pair; BA-25 restore "coexisting perspectives stay attributed"; BA-26 restore "You can always leave with everything"; BA-27 press boilerplate opens with the outcome sentence THEN the category sentence; BA-28 restore "the mechanism, not the slogan, carries the claim"; BA-29 restore "differentiate on what the substrate makes structural" | by orchestrator
BA-1 | applied-awaiting-gate | public/brand-guide.md Owner paragraph now mirrors meta.sourceOfTruth verbatim (brand.ts canonical → app renders → guide/llms/PDF/assets derived mirrors → brand.ts wins); Figma library / Tailwind config additions removed | by integrator
BA-14 | applied-awaiting-gate | public/brand-guide.md surface-patterns Rule column now VERBATIM from voice.surfacePatterns — restored all dropped clauses incl. "No feature carousels...", "in the user's terms", "No celebration, no vagueness", "especially for privacy and access", "State facts and obligations", "Never open with an apology template", "An empty state is" | by integrator
BA-15 | applied-awaiting-gate | public/brand-guide.md AI-naming mirror now carries aiNaming.rule + verbRule verbatim plus explicit allowed/forbidden verb lists incl. "takes over" | by integrator
BA-18 | applied-awaiting-gate | public/brand-guide.md Audiences recast as full table mirroring brand.audiences who/need/message verbatim for all five personas; breadth path now verbatim brand.audienceBreadth incl. "The designed path:" | by integrator
BA-22 | applied-awaiting-gate | public/brand-guide.md co-brand row now carries logo.constraints.coBrand verbatim incl. "align on the marks' vertical centres" | by integrator
BA-24 | applied-awaiting-gate | public/brand-guide.md Executive voice now includes the correct/incorrect example pair + why, verbatim from executiveVoice.example | by integrator
BA-25 | applied-awaiting-gate | public/brand-guide.md value 2 restored "coexisting perspectives stay attributed, and" — sentence now verbatim brand.ts | by integrator
BA-26 | applied-awaiting-gate | public/brand-guide.md value 1 restored "You can always leave with everything." — proof now verbatim brand.ts | by integrator
BA-27 | applied-awaiting-gate | src/pages/communications/Copy.tsx press boilerplate reordered: outcome sentence ("makes knowledge trustworthy, connected, and actionable") opens, category sentence second | by integrator
BA-28 | applied-awaiting-gate | public/brand-guide.md compounding guardrail restored "the mechanism, not the slogan, carries the claim" — now verbatim usageGuardrail | by integrator
BA-29 | applied-awaiting-gate | public/brand-guide.md differentiator guardrail restored "; differentiate on what the substrate makes structural" — now verbatim differentiatorGuardrail | by integrator
C2 | applied-awaiting-gate | REWORK complete: all 11 gate GAPs fixed under the verbatim-mirror rule (10 guide clauses + 1 Copy.tsx reorder); npm run build GREEN; uncommitted, back to gate wP:p3 | by integrator
BA-1 | GAP | Owner paragraph is equivalent but not verbatim meta.sourceOfTruth: it uses "src/data/brand.ts" / "this document" / "regenerated from it" instead of the canonical sentence, public/brand-guide.md:763 | by critic+codex
BA-14 | accepted | by critic+codex
BA-15 | accepted | by critic+codex
BA-18 | accepted | by critic+codex
BA-22 | GAP | co-brand row still does not carry logo.constraints.coBrand verbatim; first sentence "Use the ink variants (#3 mark / #4 lockup)" is represented as row columns plus "Ink prevents colour competition", public/brand-guide.md:285 | by critic+codex
BA-24 | accepted | by critic+codex
BA-25 | accepted | by critic+codex
BA-26 | accepted | by critic+codex
BA-27 | accepted | by critic+codex
BA-28 | accepted | by critic+codex
BA-29 | accepted | by critic+codex
C2 | GAP | unresolved verbatim-mirror gaps: BA-1 and BA-22 | by critic+codex
C2 | proposed | ORCHESTRATOR ADJUDICATION on mirror standard (ends the verbatim ping-pong): (1) the source-of-truth stanza is authority-critical - BA-1 fix = quote meta.sourceOfTruth's canonical sentence VERBATIM in the guide Owner paragraph; (2) for FORM-transformed mirrors (tables, rows) the binding standard is CLAUSE-COMPLETE + the canonical sentence quoted at least once adjacent - BA-22 fix = keep the co-brand table row, add logo.constraints.coBrand's canonical sentence verbatim as a note beneath the variant table. Gate: apply this standard to the re-verify; character-level verbatim is required only for authority/guardrail sentences, clause-completeness elsewhere | by orchestrator
BA-1 | applied-awaiting-gate | public/brand-guide.md Owner paragraph now QUOTES meta.sourceOfTruth verbatim ("brand.ts is the canonical brand data. The app renders it; the guide (brand-guide.md), llms.txt, the PDF, and generated assets are derived mirrors. On any conflict, brand.ts wins.") with explicit source attribution | by integrator
BA-22 | applied-awaiting-gate | public/brand-guide.md co-brand table row kept; logo.constraints.coBrand canonical sentence added VERBATIM as a note beneath the variant table per adjudicated form-transformed-mirror standard | by integrator
C2 | applied-awaiting-gate | adjudication applied to both remaining ids; npm run build GREEN; uncommitted, back to gate wP:p3 for re-verify | by integrator
BA-1 | accepted | by critic+codex
BA-22 | accepted | by critic+codex
C2 | accepted | by critic+codex

BA-1 | committed | 4babd2a (guide footer/Owner + Downloads stanza legs; llms leg rides C3) | by integrator
BA-3 | committed | 4babd2a (X-bio leg; generator + regen legs ride C4/C5) | by integrator
BA-4 | committed | 4babd2a | by integrator
BA-5 | committed | 4babd2a (all confirmed legs now applied: brand.ts + guide + TypeScale.tsx) | by integrator
BA-6 | committed | 4babd2a (guide leg; llms leg rides C3) | by integrator
BA-8 | committed | 4babd2a (guide + Naming page legs; llms leg rides C3) | by integrator
BA-9 | committed | 4babd2a | by integrator
BA-14 | committed | 4babd2a (guide mirror leg) | by integrator
BA-15 | committed | 4babd2a (guide mirror leg) | by integrator
BA-16 | committed | 4babd2a (guide mirror leg) | by integrator
BA-17 | committed | 4babd2a (guide mirror leg) | by integrator
BA-18 | committed | 4babd2a (guide + Positioning mirror legs) | by integrator
BA-19 | committed | 4babd2a (guide version line + TopBar derivation) | by integrator
BA-20 | committed | 4babd2a (guide mirror leg) | by integrator
BA-21 | committed | 4babd2a (Downloads CSS leg; contract leg rides C3) | by integrator
BA-22 | committed | 4babd2a (guide mirror leg incl. canonical co-brand note) | by integrator
BA-23 | committed | 4babd2a (guide Trust & disclosures leg) | by integrator
BA-24 | committed | 4babd2a (guide Executive voice leg) | by integrator
BA-25 | committed | 4babd2a (guide mirror leg) | by integrator
BA-26 | committed | 4babd2a (GitHub bio + guide mirror legs) | by integrator
BA-27 | committed | 4babd2a (guide outcome-first + Copy.tsx legs) | by integrator
BA-28 | committed | 4babd2a (guide mirror leg) | by integrator
BA-29 | committed | 4babd2a (guide mirror leg) | by integrator
C2 | committed | 4babd2a — one-cluster-one-commit; blackboard swept into same commit; build green at commit time | by integrator

BA-31 | applied-awaiting-gate | scripts/generate-ai-formats.mjs (NEW: ts.transpileModule in-memory → temp .mjs → dynamic import of brand.ts AND navigation.ts; ZERO re-declared brand constants — every emitted value read from the imported canon; in-script sanity checks fail the run on drift) + package.json (generate:ai added; generate:all = assets → ai → pdf) + public/brand-contract.json + brand-checklist.md + brand-few-shots.md + brand-agent-rules.md (all NEW, all with DO-NOT-EDIT generated header; JSON carries it as _generated field); few-shots derive from voice.toneExamples + voice.surfacePatterns per plan | by integrator
BA-30 | applied-awaiting-gate | public/llms.txt REGENERATED as router by generate-ai-formats.mjs: source-of-truth stanza (meta.sourceOfTruth verbatim), 6-step load order, hard key facts now incl. neverUse(19)/density/anti-values/gradient+logo constraints/AI naming/compounding guardrail, SPA routes derived from navigation.ts and explicitly labelled client-rendered with use-the-mirrors caveat | by integrator
BA-1 | applied-awaiting-gate | public/llms.txt (llms leg — final BA-1 leg): "live app is canonical" replaced by verbatim meta.sourceOfTruth stanza; source-of-truth now consistent across brand.ts/guide/Downloads/llms | by integrator
C3 | applied-awaiting-gate | cluster complete: generate:ai pipeline authored + run (5 artifacts emitted, sizes 4.9k–22.4k); npm run build GREEN; gate note: spot-check ≥5 contract facts vs brand.ts per plan; uncommitted, awaiting codex gate wP:p3 | by integrator
BA-30 | accepted | by critic+codex
BA-31 | GAP | generator still re-declares brand-bearing output literals instead of deriving them from brand.ts/navigation.ts, e.g. hard-coded "Spectrea" document titles and "Assistant"/"Spectrea AI" copy, scripts/generate-ai-formats.mjs:142,167,217,238,255 | by critic+codex
C3 | GAP | BA-31 unresolved: generate-ai-formats.mjs fails zero re-declared brand constants requirement | by critic+codex
BA-31 | proposed | REVISED per gate GAP: in generate-ai-formats.mjs replace every brand-BEARING literal with a value read from the imported canon - product name from brand.name, AI-entity nouns from naming.aiNaming, category/tagline/never-name examples from their brand.ts fields (lines flagged: 142,167,217,238,255 + sweep the whole file). Boundary: structural scaffolding (markdown glue, section labels like "Load order") MAY stay literal; anything that would go stale if a brand fact changed MUST interpolate. Re-run generate:ai; emitted artifacts must be byte-identical except where interpolation fixes a latent divergence | by orchestrator
BA-31 | applied-awaiting-gate | scripts/generate-ai-formats.mjs: all flagged lines (142,167,217,238,255) + full-file sweep fixed — document titles interpolate brand.name; "Assistant"/"Spectrea AI"/category-substitution paraphrases replaced by shared consts built from canon (categoryRule from brand.positioning.category, aiNamingLine = naming.aiNaming.rule + verbRule + verb lists); grep for brand-bearing literals now hits only the script's own non-emitted header comment. Re-ran generate:ai: contract byte-identical (22,404 chars); checklist/agent-rules/llms grew only where paraphrase → canonical sentence (the permitted latent-divergence fix); few-shots byte-identical | by integrator
C3 | applied-awaiting-gate | BA-31 gate revision applied; generate:ai re-run clean, npm run build GREEN; uncommitted, back to gate wP:p3 | by integrator
BA-31 | GAP | fresh sweep still finds a generator-side brand-bearing category-substitution literal: "knowledge" for "intelligence" is hard-coded inside categoryRule instead of traced to brand.ts/navigation.ts, scripts/generate-ai-formats.mjs:68; flagged regions and re-emitted artifact values otherwise checked | by critic+codex
C3 | GAP | BA-31 unresolved: generate-ai-formats.mjs still re-declares a brand-specific category-substitution example, so C3 cannot pass zero re-declared brand constants | by critic+codex
BA-31 | proposed | FINAL revision per gate GAP: the category-substitution example is brand-bearing (references the retired noun) so it gets a canonical home - add a small field to src/data/brand.ts positioning (e.g. positioning.categoryGuard = { exactNoun: true, badSubstitutions: ['composable knowledge platform', 'knowledge platform', 'AI assistant'] } or equivalent shape consistent with existing style); generator builds categoryRule FROM that field, zero generator-side brand literals remain. This is a canon-completion required by the pipeline and rides the C3 commit (C1 already committed - noted for audit trail) | by orchestrator
BA-31 | applied-awaiting-gate | src/data/brand.ts positioning.categoryGuard ADDED ({ exactNoun: true, badSubstitutions: [composable knowledge platform, knowledge platform, knowledge management, AI assistant, automation tool] } — retired noun + the vision's rejected adjacent categories, per proposal's "or equivalent" latitude) + scripts/generate-ai-formats.mjs builds categoryRule FROM categoryGuard and the contract now also carries categoryGuard raw; grep "knowledge|intelligence" over the generator = zero hits — zero generator-side brand literals remain; generate:ai re-run clean (contract 22,706 chars — grew only by the categoryGuard data + derived rule text) | by integrator
C3 | applied-awaiting-gate | FINAL BA-31 revision applied (canon-completion rides C3 commit per proposal); npm run build GREEN; uncommitted, back to gate wP:p3 | by integrator
BA-31 | accepted | by critic+codex
C3 | accepted | by critic+codex
