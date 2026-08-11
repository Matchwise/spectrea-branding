# Remaining branding work — plan (2026-08-11)

> **Reconciled 2026-08-12: every scheduled item below is done.** The review closed
> at 36 decisions, all implemented, pushed and live through v2.12.0 (`1ce3db2`).
> The plan text is kept as written, with status annotated in place; what genuinely
> remains is listed at the end and none of it lives in this repository.

The 2026-08 review is 36 decisions deep and every one of them is implemented,
pushed and live. What follows was the plan for what was left, in the order it
should happen and with the reason for that order. The authoritative status of
individual audit items is the reconciled "Still open" section of
`ratifications-2026-08-06.md`; this file is the plan, not the ledger.

## Sequencing

**1. Reconcile the stale open-list — DONE 2026-08-11.**
First because it was actively misinforming. The section had been carrying eleven
items that later decisions closed, and it reported Pages HTTPS as needing
Darren's go-ahead when `https_enforced` has been `true` for some time. Every
closure claim is now re-verified against the decision that closed it and against
canon or a live API read, with a table mapping each D-number to its closing
decision so the cross-references still resolve. Two generator to-dos in the
"Discovered during this session" section were also verified as landed and
annotated.

**2. The conformance checker — DONE 2026-08-11; gate accepted at round seven,
pushed `30135c9`, live.**
Second because it is the one thing that changes what can go wrong next. See
below.

**3. The art session — DONE 2026-08-11/12 (decision 36, v2.12.0).**
Everything else genuinely open funnelled into one working session: illustration
under canon (D4/D6/D7/D33/D32, P2), the hero anchor (P4), and the F6
style-family opinion. It ran as predicted — one session, Darren steering every
call — and closed as the `illustration` canon export: an invariant DNA block
plus one register sentence per job, settled empirically across ~30 single-render
lanes (evidence in `.runs/2026-08-11-art-session/`). Two dispositions differ
from this plan's wording. The pre-canon hero anchor was **retired, not
regenerated** — it broke four of its own rules, so it no longer renders anywhere
(the file stays on disk because an archived decision sheet references it). And
F6 resolved into the DNA block's reference line after a pre-registered n=10 A/B
showed style wording is not the lever — within-prompt variance exceeds
between-prompt difference, so the style family lives in one sentence of the DNA,
not in a wording choice.

**4. Standing, not scheduled.**
The counsel trigger (decisions 13 and 14c) fires before any public launch that
puts trust, security or compliance claims on a page; one engagement covers the
trust-copy read and the formal trademark clearance. R7, the graph-viz operational
spec, is open by design — canon says at `brand.ts:1157` that it is a product
deliverable, and it closes in the product repo or not at all.

## Why the conformance checker was the right second item

The drift scan run on 2026-08-11 was hand-written, and it looked for what I
thought to look for: logo geometry, focus styling, stale pins. It never looked at
copy. The category noun retired on 2026-07-03 was live in spectrea's site-wide
metadata, its `(app)` layout and its OG image for five weeks, and no mechanism in
either repo could have noticed. Ratifying canon and shipping it downstream is
worth very little if nothing downstream can tell when it has drifted back.

`scripts/generate-conformance.mjs` reads `src/data/brand.ts` and emits
`public/brand-conformance.mjs`, a zero-dependency Node CLI consumers vendor with
the snapshot and run in CI. Validated against the real history: over the three
pre-fix files it reports all three escapes as errors; over both consumer repos at
their current state, zero errors.

Two design decisions carry the whole thing:

- **Severity is doing real work.** Canon's `badSubstitutions` mixes the specific
  noun it retired with generic words like "AI assistant" — and Spectrea has an AI
  assistant feature, so an undifferentiated checker reports 82 errors in the
  product repo, 80 of them noise. Generic entries are `review`; only the retired
  noun is an `error`. A checker whose error tier cries wolf gets switched off.
- **Canon growth fails the build rather than escaping the checker.** Every canon
  entry that carries a qualifier is classified explicitly in the generator, and an
  entry it has not been taught is a hard generator failure. When someone adds a
  never-use word or a bad substitution, the pipeline stops and asks how to read
  it. The alternative — guessing — is how a checker quietly stops checking.

## The known gap, stated plainly

> **Decided and implemented since this was written:** decision 35b (ratified
> 2026-08-11) answered yes — canon gained the `retired` export at v2.11.0
> (`353e644`, pushed and live): five entries with scope `absolute` → error /
> `contextual` → review, which the generated checker now reads. The paragraphs
> below are the argument as it stood when the question was open.

The checker cannot enforce a migration rule unless canon holds the retired value.
Canon carries the *current* focus ring, so a checker generated from canon cannot
recognise the *old* ring it would need to flag. The category noun is only
checkable because canon deliberately keeps its retired forms in
`categoryGuard.badSubstitutions`.

That asymmetry is a decision waiting to be made, not an oversight: **should canon
carry a general retired-values register**, the way it already does for the
category noun? It would make focus-ring migrations, retired colour tokens and
retired URLs machine-checkable in consumers. The cost is that canon starts
carrying history as well as truth, which cuts against how `brand.ts` has been
kept. Worth a decision; not worth assuming.

A second, smaller finding for whoever owns spectrea: it hard-codes the never-use
vocabulary across seven test files. That hand-copied list is its own drift risk —
it goes stale silently — and it is what the generated checker is meant to replace.

## What is actually left (2026-08-12)

No scheduled work remains in this repository. The open items are downstream and
standing:

- **Consumer repos commit and re-pin.** Both have their own sessions with
  unpushed branches (counts go stale — check the branch, not this doc): spectrea
  carries its 2026-08-11 drift-fix commits on `darren` amid other unpushed
  feature work, plus its sync-policy follow-ups; spectrea-web carries its
  drift-fix commits on `dev` and in-flight illustration components (the vector
  medium — solid-hex tints, register model). Both then re-pin their snapshots to
  the head carrying v2.12.0 — spectrea's vendored `illustration-prompt.md` is
  the retired v4 prompt and must be re-copied from generated `public/`, never
  hand-reconciled. Section 0 of `downstream-handoff.md` is the working brief.
- **The spectrea deep pass** Darren deferred on 2026-08-11 ("best effort for
  now"). The largest single piece of outstanding work; it happens in that repo's
  own session.
- **Standing controls, unchanged from §4 above:** the counsel trigger before any
  public trust/security/compliance claims, and R7, the graph-viz operational
  spec, which closes in the product repo or not at all.
