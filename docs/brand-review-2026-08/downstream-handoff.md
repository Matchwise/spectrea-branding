# Hand-off: downstream repos after the v2.5.0 push (spectrea, spectrea-web)

> Written 2026-08-07 by the brand-review session. These steps are for sessions working IN the
> consumer repos; nothing here is done yet. Precondition: spectrea-branding main pushed at
> v2.5.0 (deploy republishes all artifacts at https://branding.spectrea.com/).

## 1. Re-pin the vendored brand snapshots

Both `spectrea/docs/05-reference/brand/` and `spectrea-web/docs/brand/` vendor generated
artifacts. Refresh every vendored file from the pushed head and record that sha as the new pin.
Sources in `public/`: `brand-guide.md`, `llms.txt`, `brand-contract.json`,
`brand-agent-rules.md` (all GENERATED from `src/data/brand.ts` — never hand-edit a vendored
copy). The contract gained three sections consumers may want: `identity.visualMetaphor`
(co-primary + role tiebreaker), `logoLockup` (B constants), `logoMarkGeometry` (K3′ segs, ink
extents, dot rule).

## 2. The mark changed shape — refresh any copied logo assets

v2.5.0 adopts the K3′ mark (spine fitted to the Albert Sans 600 S; deliberate shallow tail) and
metric-true lockup constants. Any downstream copy of a logo SVG, favicon, or social avatar
rendered from the old mark (`M 44 12 …`, stroke 8, dots r 3.5) is retired. Re-copy from
`public/brand-assets/` and `public/favicon.svg` at the new pin. The lockup now genuinely reads
"Spectrea" with the mark as the S.

## 3. Notable v2.5.0 brand-side facts

- Visual metaphors are explicitly CO-PRIMARY: Prism = identity/reveal, Living Network =
  product/growth; when one must lead, role decides. Guide §Visual metaphor and the contract
  carry the rule.
- "Compounding intelligence": DEFEND stance ratified — the phrase stays (one of the five
  homepage differentiator beats), always mechanism-tied per the standing guardrail.
- Contrast: "all four accents pass AA on Ink" was false and is corrected everywhere — Cobalt on
  Ink is 3.93:1 (large-text/UI only; use Cobalt Lift for body text). On-wash text hexes are now
  canonical (`brandTokens.washes.light[].textOn`).
- Trust copy: counsel trigger ratified — before any launch that puts trust/security/compliance
  claims on a public page, counsel reads the masters first (same engagement covers trademark
  clearance; knockout search 2026-08-07 found no "Spectrea" collision).
- Etymology is now a sourced coinage ("from spectrum, Latin, from specere") — drop any "from
  Latin spectra" phrasing in downstream copy.
- Small sizes: NO micro-construction — the standard mark scales down unchanged at every size.

Full decision record: `docs/brand-review-2026-08/` (15 ratifications + audit ledger + critic
verdicts).
