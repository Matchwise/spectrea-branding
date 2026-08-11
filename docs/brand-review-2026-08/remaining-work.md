# Remaining branding work — plan (2026-08-11)

The 2026-08 review is 34 decisions deep and every one of them is implemented,
pushed and live. What follows is what is genuinely left, in the order it should
happen and with the reason for that order. The authoritative status of individual
audit items is the reconciled "Still open" section of
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

**2. The conformance checker — DONE 2026-08-11, gate in flight.**
Second because it is the one thing that changes what can go wrong next. See
below.

**3. The art session — blocked on Darren's calendar.**
Everything else genuinely open funnels into one working session: illustration
under canon (D4/D6/D7/D33/D32, P2), regeneration of the hero anchor (P4 — the
honest caption shipped as the interim, the anchor itself is still a pre-canon
render), and the F6 style-family opinion. It is one session, not five tasks, and
it needs Darren in the room because every item in it is a taste judgement that
canon deliberately does not make.

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
