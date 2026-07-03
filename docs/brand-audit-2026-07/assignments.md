# ASSIGNMENTS — brand-audit-2026-07

Each worker reads `charter.md` + its row + its `brief-<agent>.md`, writes ONLY its output file.
Every row must reach a TERMINAL state before the stop rule may fire.
Pre-flight assertion (checked before spawn): critic model ≠ every drafter it gates —
wave 1: Codex workers → **Claude** critic ✓ · wave 2: Claude integrator-author → **Codex** gate ✓.

| lens / subtask | role-def | agent (model) | output file | done-condition | state |
|---|---|---|---|---|---|
| coverage-gaps | `~/.herdr/roles/worker.md` | codex-W1 | `findings-coverage.md` | whole lens answered, decisive claims file:line, residuals listed, ends in DRAFT-amendments | launched |
| consistency-drift | `~/.herdr/roles/worker.md` | codex-W2 | `findings-drift.md` | same | launched |
| vision-alignment | `~/.herdr/roles/worker.md` | codex-W3 | `findings-vision.md` | same | launched |
| ai-consumability | `~/.herdr/roles/worker.md` | codex-W4 | `findings-aiformats.md` | same | launched |
| verify wave-1 (Codex-drafted) | `~/.herdr/roles/critic.md` | claude-C1 (wP:p6) | `decisions.md` | every `found` id → confirmed/refuted | DELIVERED (32/32 verdicts + plan gate) |
| gate wave-2 (Claude-authored) | `~/.herdr/roles/critic.md` | codex-G1 → after machine restart: single FRESH Codex session, wP:p3 (see GATE-LANE lines) | `decisions.md` | every `applied-awaiting-gate` id → accepted/GAP on the authored diff | DELIVERED (5/5 clusters; GAP catches: BA-11, C2 mirrors ×11, BA-31 ×2 — all resolved) |
| implement | `~/.herdr/roles/integrator.md` | claude-I1 (wP:p7 → relaunched wP:pB after restart) | canon + `decisions.md` | every accepted id applied + committed locally (never push) | DELIVERED (C1 2df71aa · C2 4babd2a · C3 b16be8e · C4 60f592c · C5 5ae173a) |
