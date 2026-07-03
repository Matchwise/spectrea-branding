# Hand-off: spectrea repo follow-ups (after Darren pushes spectrea-branding)

> Written 2026-07-04 by the brand-audit orchestrator. The spectrea repo was READ-ONLY for the
> audit run, so these steps are for a session working IN spectrea. Nothing here is done yet.
> Precondition: Darren has pushed spectrea-branding main (deploy republishes all artifacts).

## 1. Re-pin the vendored brand snapshot

`spectrea/docs/05-reference/brand/` is pinned to spectrea-branding commit `4d4c804`, which is now
far behind: it predates the entire brand-audit implementation (canonical brand.ts extension,
guide sync, generated AI formats, ratified fork resolutions, v2.2.0+).

- Refresh every vendored file from spectrea-branding at the pushed head, and record that sha as
  the new pin.
- The canonical sources to vendor from `public/` are now: `brand-guide.md`, `llms.txt`,
  `brand-contract.json` (new), `brand-agent-rules.md` (new). All are GENERATED from
  `src/data/brand.ts` — never hand-edit a vendored copy; refresh from source.

## 2. Vendor the agent rules block

Drop the block from `public/brand-agent-rules.md` into spectrea's CLAUDE.md / AGENTS.md chain so
every agent producing brand-adjacent output (UI copy, docs, marketing surfaces) carries the brand
contract. The file is self-describing and regenerable; vendor it verbatim with its header.

## 3. Notable brand-side facts spectrea should know

- Category noun: "composable intelligence platform" (ratified, swept everywhere incl. PDF).
- On-ramp (Darren-ratified 2026-07-04): outcome-first hero, no whole-product term; sanctioned
  hero example + adopt/avoid vocabulary live in `positioning.onRamp` (see brand-contract.json
  `vocabulary.onRamp`).
- Origin stance: decided silence — no origin claims on any surface.
- "Compounding intelligence": kept, but only with mechanism named (usage guardrail in contract).
- Dark button states resolved 2026-07-04: lighten-on-dark + label flips to Ink during
  hover/active (all pairs AA-verified; values in `brandTokens.buttonStates.dark`).
- Graph-viz: brand-level colour semantics shipped (`graphViz` export); the FULL node/edge/state
  rendering spec is routed to a product design cycle — it needs spectrea's product-side taxonomy.
  That cycle should start from `graphViz` + the guide §5 graph section.
