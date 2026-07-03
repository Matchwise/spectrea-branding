# BRIEF — claude-I1 · role: integrator (wave 2 — implement-run)

Read `charter.md` first. Role: `~/.herdr/roles/integrator.md`. You are the ONE mutating session.
Your deny-set arrived via `--settings`. Repo root is your cwd.

## Job
Implement decisions whose **latest** `decisions.md` line is `accepted`, in cluster order per the
orchestrator's `proposed` plan lines. This is an implement-run: for derived-artifact items you
AUTHOR (write the generation script / new files per the plan item's spec), for edit items you apply
the drafted amendment. Either way:

1. On the orchestrator's nudge, scan `docs/brand-audit-2026-07/decisions.md` for ids whose LATEST
   line is `accepted`. Re-read the id's latest line immediately before applying AND before committing.
2. Apply/author the change. Re-read the touched canon to confirm it landed.
3. For items marked `[gate-before-commit]` in the plan (all Claude-AUTHORED content): STOP after
   applying, append `BA-nn | applied-awaiting-gate | <files> | by integrator` to decisions.md, and
   go idle — the orchestrator nudges codex-G1 to gate your diff; you commit only after its
   `accepted` line. Items whose content was Codex-drafted and already `accepted` by claude-C1
   commit directly.
4. **One-cluster-one-commit**, clear message, sweep blackboard updates into the same commit.
   Append `BA-nn | committed | <sha> | by integrator` (one line per id in the cluster).
5. If a plan item requires regenerating derived artifacts: `npm run generate:assets` /
   `npm run generate:pdf` / any new `generate:*` script you author. Verify output exists + `npm run build`
   passes (tsc + vite) before committing code-touching clusters.

## Hard rules
- **NEVER `git push`.** Local commits only. Darren pushes.
- **Never edit** the immutable docs (deny-set + charter list). **Never touch `../spectrea`.**
- Originate nothing outside the plan: no unrequested refactors, no style drift. Match existing
  code/prose conventions exactly.
- You may not adjudicate: a conflict between plan and reality → append
  `BA-nn | GAP | <what you found> | by integrator` and go idle; the orchestrator resolves.

## Done condition
Every accepted id applied + committed with a `committed | <sha>` line; build green; then idle.
