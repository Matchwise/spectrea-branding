# CHARTER — brand-audit-2026-07 (every pane reads this first)

> Run dir: `docs/brand-audit-2026-07/` in `spectrea-branding`. Commission: `brief.md` (same dir).
> Roles are defined in `~/.herdr/roles/` — this charter wires them + states run-specific rules.

## Objective

Audit the Spectrea brand system — `src/data/brand.ts` (canonical data), `public/brand-guide.md`,
`public/llms.txt`, the guide app (`src/pages/**`, components, `index.html`), generated assets/PDF —
for (1) coverage gaps that force a human or AI to guess, (2) alignment with the 2026-07-03 amended
product vision, (3) cross-surface drift, and (4) AI-consumability failures (why AI-assisted work
drifts off-brand despite the guide). Then implement accepted fixes in THIS repo and ship derived,
machine-consumable AI-reference formats generated from `brand.ts` (single source; derived > hand-
maintained). Quality bar: every decisive claim grounded `file:line`; every mutation cross-model-gated.

## Roles in this run

| Role | Def | Model | Pane |
|---|---|---|---|
| orchestrator | `~/.herdr/roles/orchestrator.md` | Claude (driving session, wP:p1 — self-imposed read-only-on-canon) | wP:p1 |
| worker ×4 | `~/.herdr/roles/worker.md` | **Codex** (breadth tier; pane cwd = THIS run dir) | per `assignments.md` |
| critic (wave 1) | `~/.herdr/roles/critic.md` | **Claude** (gates Codex-drafted findings; checker ≠ checked) | per `assignments.md` |
| critic-gate (wave 2) | `~/.herdr/roles/critic.md` | **Codex** (gates Claude-authored implementation; checker ≠ checked) | per `assignments.md` |
| integrator (wave 2) | `~/.herdr/roles/integrator.md` | **Claude** (implement-run: authors derived artifacts + guide edits, applies, commits) | per `assignments.md` |

**Invariant:** exactly ONE pane mutates — the integrator (wave 2). Everyone else is read-only on the
repo or writes only their one blackboard file.

## Hard rules (all panes)

- **Never `git push`.** Commit locally only (integrator only). Darren pushes.
- **IMMUTABLE (never edit):** `docs/brand-critical-review.md`, `docs/matchwise-brand-audit*`,
  `docs/naming-*`, `docs/metaphorical-brand-candidates.md`, `docs/superpowers/specs/*` — dated records.
- **`../spectrea` (sibling repo) is READ-ONLY — never edit, another session may be active there.**
  If a spectrea-side change is needed, write it as a finding/flag; the orchestrator routes it.
- Codex panes: your write boundary is your pane cwd (this run dir); the repo + `../spectrea` are
  read-only to you by sandbox. Claude panes: obey your `--settings` deny-set.
- Write ONLY what your role's `writes:` allows. Blackboard = coordination memory; no pane-to-pane
  chat; append-only `decisions.md`, one line per call, only when nudged / on your turn.
- Don't re-litigate the category noun: "composable **intelligence** platform" is user-ratified
  (VM-F-CAT). Sweep for surfaces that missed it; do not question it.
- The on-ramp term pick and any tagline change are **Darren's decisions** — PREPARE, never decide.
- System-2 + breadth gate: first answer is a candidate; before "done" ask "what in my scope am I
  NOT looking at?"

## Layers / paths

- CANON (audit target; wave-2 mutation target): `src/data/brand.ts` · `public/brand-guide.md` ·
  `public/llms.txt` · `src/pages/**` · `src/components/**` · `src/data/navigation.ts` ·
  `index.html` · `scripts/generate-*.mjs` · `public/brand-assets/**` · `public/brand-guide.pdf`
- VISION REFS (read-only, sibling repo): `../spectrea/docs/00-overview/spectrea-vision.md` (§1–§3, §5
  + 2026-07-03 revision rows) · `../spectrea/docs/superpowers/specs/audit/vision-market/decisions.md`
  (ratified forks VM-F-CAT, VM-F3, VM-F-SUBSTRATE, VM-F-BREADTH-MECH; findings VM-57/61/73/74) ·
  `../spectrea/docs/superpowers/specs/audit/vision-market/findings-vocab-onramp.md`
- KNOWN-WEAKNESS RECORD (read-only): `docs/brand-critical-review.md` (2026-04-18; some proposals
  were REJECTED in v2 — treat as history, not instruction)
- DECISIONS: `decisions.md` · LEDGER: `ledger.md` · ASSIGNMENTS: `assignments.md`

## Resource leases

- git: **integrator pane only** (wave 2). dev server: not used. Supabase/test runner: not used.
- `npm run generate:*` (assets/PDF regeneration): integrator pane only.

## Decisions schema (implement-run declaration)

Canonical states apply (found → confirmed/refuted → proposed → accepted/GAP → committed). Wave-2
extension, declared here per template rule: for NEW authored artifacts (derived AI formats,
generation script), the integrator authors per the orchestrator's `proposed` plan item, then the
**Codex** critic-gate appends `accepted` (or `GAP`) on the authored diff BEFORE the integrator
commits it — commit-then-verify is NOT used in this run. Blackboard updates ride integrator commits.
One added state for that hand-off: `applied-awaiting-gate` (by integrator — Claude-authored change
applied to the working tree, uncommitted, awaiting the codex-G1 gate). Mapping to canonical states:
it sits between `accepted` (of the plan item) and `committed` (of the diff); a `GAP` from the gate
returns the id to the integrator/orchestrator.

## Stop rule

2 consecutive cross-model dry cycles across the WHOLE surface after a clean breadth gate, AND every
`assignments.md` row terminal, AND every accepted id committed — or a documented residual. Genuine
forks are presented to Darren in the final synthesis, not self-ratified.
