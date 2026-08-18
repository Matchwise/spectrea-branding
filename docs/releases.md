---
role: process
topic: brand-releases
status: CURRENT
---

# Releases

A GitHub release here marks a **selected** canon version — one consumers are meant to
adopt. It is not a build artefact and not every version bump gets one.

## The two channels, and why both exist

| | Live files | Release |
| --- | --- | --- |
| Where | https://branding.spectrea.com | https://github.com/Matchwise/spectrea-branding/releases |
| Carries | the newest canon, always | a version chosen as worth adopting |
| Moves | on every push to `main` | only when a release is cut |
| For | checking freshness, reading the current guide | pinning a vendored snapshot |

Consumer repos vendor a snapshot rather than importing canon, so they need a stable
thing to pin to and a clear signal about when moving is worth the churn. The live files
answer "what is current?"; a release answers "what should I be on?".

## What gets a release

The brand lead selects. The guidance, not a rule:

- **Release it** when consumers have to do something: a key removed from
  `brand-contract.json`, a doctrine that changes how output is generated, a new file in
  the vendoring set, a rule that invalidates work produced under the old canon.
- **Skip it** for wording fixes, added ledger entries, asset regeneration, and anything a
  consumer would not act on. Those still land on `main` and go live immediately.

A skipped version is not a lesser version — canon is canon the moment it is on `main`.
The release is a recommendation about *pinning*, not about correctness.

## Cutting one

Preconditions: `main` is pushed, CI green, and `npm run generate:all` leaves the tree
clean (a release whose artefacts do not match canon is a lie about its own contents).

```sh
npm run generate:all && git status --porcelain    # must be empty
git tag -a v<version> -m "Spectrea brand canon v<version>"
git push origin v<version>
gh release create v<version> --latest --title "..." --notes-file <notes>
```

Attach the vendoring set as one archive (`spectrea-brand-snapshot-v<version>.zip`):
`brand-contract.json`, `brand-checklist.md`, `brand-few-shots.md`,
`brand-agent-rules.md`, `llms.txt`, `brand-guide.md`, `brand-conformance.mjs`. They are
generated together and only make sense together — a partial re-vendor mixes canon
versions, and the checker in particular bakes its rules in at generation time.

Release notes are public. Write them from the published artefacts only: internal-tier
fields are registered in `internalCanon` precisely so they do not appear on a
crawler-readable surface, and a release page is one.

## What a consumer does with it

1. Read the release notes for removed keys and required actions.
2. Take the whole archive into the snapshot directory; byte-verify with `cmp`.
3. Refresh the vendored `brand-agent-rules.md` block inside that repo's
   `CLAUDE.md` / `AGENTS.md` — it goes stale independently of the files beside it.
4. Run the vendored `brand-conformance.mjs` against the repo's source.
5. Record the new pin (commit + version) in the snapshot README.

Repos whose format hooks rewrite files on commit must keep the snapshot directory out of
the formatter — the verification here is `cmp` against upstream, and a prettier pass
turns a pin into a fork silently.
