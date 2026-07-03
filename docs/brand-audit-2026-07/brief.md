# Brand-Guide Audit — Commission Brief (2026-07-03)

**You are the orchestrator (Claude Fable 5) of a brand-guide audit + implementation run in THIS repo
(`spectrea-branding`). Commissioned by Darren; handed off — Darren manages you directly from here.**

## Mission (Darren's words, lightly structured)

Audit the brand guide. Despite this guide, there are still deviations sometimes, **especially when
working with AI**. Then:

1. **Identify gaps in the branding and the guide** — where the brand system is incomplete, ambiguous,
   or silent, such that a person or an AI producing on-brand work has to guess.
2. **Audit alignment with the vision** — the product vision moved on 2026-07-03 (see Context below);
   check every brand surface against it.
3. **Identify optimal formats for AI to reference** — diagnose WHY AI-assisted work drifts off-brand
   despite the guide existing, and design/implement the machine-consumable form(s) that fix it.
4. You may **/orchestrate** to audit AND to implement the updates in this repo.

## Context pack

- **This repo** is the upstream brand source of truth. Key surfaces: `src/data/brand.ts` (canonical
  brand data: palette, personality, values, voice formula, never-use vocab), `public/brand-guide.md`
  (the full written guide), `public/llms.txt` (existing AI-facing summary), `src/pages/**` (the
  deployed guide app at https://matchwise.github.io/spectrea-branding/#/), `docs/brand-critical-review.md`
  (dated review record — **immutable**, read for known weaknesses).
- **Fresh local commit `4d4c804` (push pending):** category noun corrected to "composable
  **intelligence** platform" (user-ratified fork VM-F-CAT from the spectrea vision-market audit).
  Don't re-litigate the noun; do sweep for any surface it missed.
- **Vision cross-references (READ-ONLY — the spectrea repo may have another active session; never
  edit it, flag needed changes instead):**
  - `../spectrea/docs/00-overview/spectrea-vision.md` — APPROVED, amended 2026-07-03: per-viewer-truth
    design property, moat re-anchor + dated assumption ledger, breadth cold-start mechanism
    (free-tier posture), sovereign-data guarantee, "star-where-it-shines" graph posture.
  - `../spectrea/docs/superpowers/specs/audit/vision-market/decisions.md` — user-ratified forks
    verbatim (VM-F-CAT north-star + legible on-ramp; VM-F3 graph star-where-it-shines; VM-F-SUBSTRATE
    four-layer openness; VM-F-BREADTH-MECH free-tier/funnel posture).
  - `../spectrea/docs/superpowers/specs/audit/vision-market/findings-vocab-onramp.md` — market vocab
    research + 5 on-ramp term packages (the term pick itself is RESCHEDULED to a brand cycle — this
    run may PREPARE that decision but the pick is Darren's).
  - Known watch: the brand claim "compounding intelligence" is now market-CONTESTED (Engram, XTrace —
    verified 2026-07-03). Accepted interim risk; audit how the guide should hedge/differentiate it.
- The spectrea repo vendors a snapshot of this repo at `docs/05-reference/brand/` pinned to `4d4c804`.
  If this run changes brand.ts/brand-guide/llms.txt, note in your synthesis that the vendored snapshot
  needs re-pinning (do NOT edit the spectrea repo yourself).

## Suggested probe dimensions (yours to refine — brainstorm beyond these)

- **AI-drift root-cause:** take real failure shapes (AI-written copy that drifts) and trace which
  guide gap permitted each: unstated rule? rule stated but buried in prose? no negative examples?
  no machine-readable contract? guide too long to fit a context window?
- **Coverage gaps:** voice/tone per surface (error states, empty states, marketing vs product vs docs),
  vocabulary (approved/forbidden terms incl. the never-use list), visual tokens (dark mode, motion,
  accessibility — note product floor is WCAG 2.2 AA), lockup/asset usage, audience-map currency.
- **Vision alignment:** category noun consistency; tagline/anchor arcs; per-viewer truth + sovereign
  data as brand-visible trust claims; free-tier/funnel posture vs any pricing/enterprise-toned copy;
  graph star-where-it-shines vs how the guide depicts the product.
- **AI-reference formats (design + implement the winners):** candidates include a hardened `llms.txt`
  (verify it against the current guide — it lagged on the noun), a compact machine-readable
  brand-contract (JSON/TS derived from brand.ts as the single source), a drop-in rules snippet for
  agent harnesses (CLAUDE.md/AGENTS.md-style block repos can vendor), few-shot on-brand/off-brand
  example pairs (AI conforms better to contrastive examples than prose rules), and a generation-time
  checklist. Prefer DERIVED artifacts (generated from brand.ts) over hand-maintained copies — drift
  between formats is the failure mode this run exists to kill.

## Operating rules

- Herdr playbook: `~/.herdr/AGENT-GUIDE.md` (+ `mechanics.md`, `coordination.md`, `roles/`). Seat
  breadth on Codex panes (~60:40), cross-model critic gates Claude-authored changes (checker ≠ checked),
  one mutating hand. Cost gate: collapse to fewer agents where the work is sequential.
- Blackboard + all run artifacts live under `docs/brand-audit-2026-07/` in this repo.
- Mutations: this repo only. Commit locally with clear messages; **never push** (Darren pushes).
  `docs/brand-critical-review.md` and other dated records are immutable.
- Genuine brand/vision forks (e.g. the on-ramp term pick, any tagline change) → present to Darren
  with options + a recommendation tied to a quality axis; don't self-ratify. Derive everything else.
- Deliverables: findings ledger with verdicts · implemented guide/data/format updates (committed) ·
  an AI-reference format recommendation with the chosen format(s) shipped · a final synthesis that
  names what changed, what's for Darren to decide, and what routes to other repos.
