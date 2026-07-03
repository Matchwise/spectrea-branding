# BRIEF — codex-W3 · lens: vision-alignment

Read `charter.md` first. Role: `~/.herdr/roles/worker.md`. Write ONLY `findings-vision.md` (this dir).
Repo root: `..\..\` (spectrea-branding). Local id namespace **VA-n** (orchestrator assigns BA-nn at intake).

## Objective
Check every brand surface against the product vision as amended **2026-07-03**. The vision moved;
the brand may not have. Flag misalignments + draft amendments. The sibling repo is **READ-ONLY** —
never edit it; if a spectrea-side change seems needed, record it as a "route-to-spectrea" flag.

## Vision sources (read-only)
`..\..\..\spectrea\docs\00-overview\spectrea-vision.md` — §1 Identity, §2 Problem+Thesis (moat
re-anchor + assumption ledger), §3 Who It Serves (breadth cold-start / free-tier posture), §5
Boundaries (sovereign-data guarantee, standards seed) + the 2026-07-03 revision-history rows.
`..\..\..\spectrea\docs\superpowers\specs\audit\vision-market\decisions.md` — ratified forks
VM-F-CAT, VM-F3, VM-F-SUBSTRATE, VM-F-BREADTH-MECH; findings VM-57, VM-61, VM-73, VM-74.

## Probe list (cover ALL; add your own)
1. **Category noun:** "composable intelligence platform" everywhere (W2 sweeps text; you check
   MEANING — e.g. copy that still explains the category as knowledge-management).
2. **Tagline/anchor arcs:** brand.ts tagline "We connect the dots", strategic claim "See it whole.
   Trust what you see. Build on what you find.", vision internal anchor "Where scattered knowledge
   becomes compounding intelligence", brand claim "Compounding intelligence". Do the arcs cohere?
   Where do brand surfaces state arcs the vision superseded? (Tagline itself is Darren's — flag only.)
3. **Per-viewer truth** (vision §1 design property 2; VM-47 differentiated + under-surfaced): is it
   brand-visible anywhere (values, differentiators, messaging, audiences)? Should it be? Draft where.
4. **Sovereign-data guarantee** (vision §5, ratified): "your data is never hostage", full-fidelity
   export. Brand.ts has "Private by default — your knowledge stays yours" — does the brand carry the
   export/exit-rights claim? Draft where it belongs.
5. **Free-tier / breadth posture** (vision §3 ratified 2026-07-03): solo free + full-featured,
   pay-after-first-value, individuals first-class. Audit: brand.ts audiences (4 business personas,
   no individual tier), any enterprise-toned or pricing-implying copy across pages (Email.tsx,
   Copy.tsx, Social.tsx, Positioning.tsx...). Flag mismatches + draft persona/copy amendments.
6. **Star-where-it-shines** (VM-F3): the graph is celebrated identity AND functionally-scoped
   (exploration/visualisation hero; capture/Q&A outcome-first). How does the brand depict the
   product? ("living graph" in messaging/supporting copy, illustration vocabulary, first-aha
   framing). Also **VM-61/VM-74**: market hero copy is unanimously OUTCOME-first, mechanism
   subordinated — does brand messaging lead with mechanism? Does the voice section teach outcome-first
   strongly enough? (brand.ts contextShifts.buyer partially covers this — is it enough?)
7. **Contested claim** (VM-73, accepted interim risk): "compounding intelligence" now contested
   in-market (Engram $98M "AI That Actually Knows Your Organization"; XTrace "own and compound their
   intelligence" — verified 2026-07-03). Where does the brand stake the phrase publicly (promise,
   values, messaging, audiences)? Draft HOW the guide should hedge/differentiate (e.g. tie compounding
   to the mechanism only Spectrea ships: provenance + per-viewer + loop). Do NOT draft dropping the
   claim — that's Darren's.
8. **Moat re-anchor** (vision §2): retrieval quality is NEVER claimed as differentiator. Does any
   brand copy claim search/retrieval superiority? Also: differentiators list currency vs the
   re-anchored moat (per-viewer synthesis, org-executive-function, loop, PLG delivery).
9. **Totalizing claims** the vision de-totalized ("incomparably better") — meaning-level check
   (W2 handles the string sweep).
10. **AI posture:** vision = AI-as-default rides a no-LLM floor; humans+AI share one substrate.
    Brand value "Human-First" says "The system works without AI; AI elevates, never gates" — aligned?
    Any brand copy over- or under-claiming AI agency vs the vision posture?

## Output format
`findings-vision.md`: id VA-n | severity | brand surface file:line | vision anchor (file:line or
fork id) | misalignment | draft amendment (or route-to-spectrea flag / route-to-Darren fork).
End with residuals + breadth-gate line + ≤10-line lens verdict.

## Done condition
All 10 probes + own additions; every claim grounded on BOTH sides (brand file:line AND vision
file:line/fork id). **Hard cap: 2 passes, then condense and stop.** No edits outside your findings
file. No git. NEVER write to ../spectrea.
