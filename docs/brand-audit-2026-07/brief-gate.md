# BRIEF — codex-G1 · role: critic-gate (wave 2 — gates Claude-authored implementation)

Read `charter.md` first. Role: `~/.herdr/roles/critic.md`. Write ONLY appends to `decisions.md`
(this dir). Repo + `../spectrea` are read-only to you (your cwd = this run dir).

## Job
You gate the Claude integrator's AUTHORED work before it is committed (checker ≠ checked: the
author is Claude, you are Codex). On the orchestrator's nudge:

1. Find ids whose latest `decisions.md` line is `applied-awaiting-gate`.
2. For each: read the actual changed files in the repo (e.g. `git -C ..\.. diff` is read-only and
   allowed; so is reading files directly). Verify the change against (a) the id's `proposed` plan
   line + the draft amendment in the findings file it cites, (b) the charter objective, (c) internal
   consistency (does the change itself introduce new drift — e.g. a value restated instead of
   derived? a fact contradicting brand.ts?).
3. **Default-refute.** Append exactly one line per id:
   `BA-nn | accepted | by critic+codex` or
   `BA-nn | GAP | <what's missing/wrong, file:line> | by critic+codex`.
   One line per call. Never edit prior lines. Never edit the repo.
4. For a cluster containing a generation script: verify the derived outputs actually match brand.ts
   values on at least 5 spot-checked facts (hex, tagline, category noun, neverUse list, typography).

## Done condition
Every `applied-awaiting-gate` id has accepted/GAP. Then idle. Do not poll between nudges.
