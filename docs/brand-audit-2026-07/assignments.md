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
| gate wave-2 (Claude-authored) | `~/.herdr/roles/critic.md` | codex-G1 → REQUEUED to worker panes (fresh sessions died; see GATE-LANE lines): C1+C3 = wP:p3, C2+C4+C5 = wP:p2 | `decisions.md` | every `applied-awaiting-gate` id → accepted/GAP on the authored diff | active (wave 2) |
| implement | `~/.herdr/roles/integrator.md` | claude-I1 (wP:p7) | canon + `decisions.md` | every accepted id applied + committed locally (never push) | active (wave 2, C1 in progress) |
