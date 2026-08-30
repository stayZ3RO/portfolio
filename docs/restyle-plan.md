# Portfolio Restyle Plan

Implementation spec for applying [`brand.md`](brand.md) (Rosé Pine spine, `pine`
signature accent) to this site. `brand.md` sets the shared tokens; this file is
the portfolio-specific execution plan.

## Direction

Personal-engineer site, not a dashboard. Confident, quiet, typographic. The
visual payload is the real work (diagrams, screenshots, project detail), not
decorative UI chrome.

## Reference

A mockup of the hero + work-list direction was built and reviewed
2026-08-29: https://claude.ai/code/artifact/164c3592-98e1-42b8-9c12-b5df59e785ec
(approved). That link is a Claude Artifact, not guaranteed to persist — this
document is the durable spec; rebuild the mockup from here if the link dies.

## Hero

- Headline (name) set in **JetBrains Mono** — the signature move, an
  engineer's site typeset like one. Large, confident, staggered settle-in on
  load (one beat, not a sequence of animations).
- Eyebrow line: a `/`-prefixed label in `pine`, e.g. `/ infrastructure &
  platform engineering`. This is one of the only two places `pine` appears in
  the hero — restraint is the point.
- Subhead in body sans (IBM Plex Sans), `subtle` color — one or two sentences,
  no buzzword stacking.
- No photo requirement, no gradient, no glow.

## Work / project list

- **Ruled list, not cards.** Each entry: title (mono, hover → `pine`), a
  status kicker, one-line description, a link out.
- **Status kicker per entry**, color-coded, real information not decoration:
  - `mature` → `foam`
  - `active` → `gold`
  - `learning lab` → `pine`
  - `in progress` / `planned` → `subtle`
- List entries fade + rise 12px as they scroll into view (see Motion below).

## Sections not yet built

- About, Skills, Contact — still on the old design; restyle after the work
  list ships and reads right.
- Résumé link — carry over from the current site, restyle only.
- Real diagrams/screenshots, full-bleed between sections — the actual visual
  proof-of-work. This is the highest-value remaining piece; wire in the
  diagrams already merged in `home-network-infrastructure-HA-DNS`,
  `home-network-managed-infrastructure-lab`, `vps-cloud-infra-lab`, and
  `aws-network-automation-lab` once each project's write-up exists.

## Motion

- Hero: one staggered settle-in beat on load.
- Sections/list entries: fade + rise 12px on scroll into view.
- Hover: 120ms, lift the title only — no shadow, no scale-bounce.
- `prefers-reduced-motion`: all of the above becomes a plain opacity swap, no
  transform.

## Theme

Dark is the default/primary experience (Rosé Pine). A light toggle (Rosé Pine
Dawn, tokens in `brand.md`) is supported, not primary.

## Build order

1. Port hero + work-list tokens/markup into `Hero.jsx` and the project list
   component (this plan's scope).
2. Wire in real diagrams/screenshots per project.
3. About / Skills / Contact restyle. Includes `Header.jsx` (nav bar: `Z3`
   logo mark, `stayZ3RO` wordmark) — originally missing from this build
   order entirely; folded in here (2026-08-30) rather than left unscoped,
   since it was sitting inconsistent against the already-restyled
   Hero/Projects sections.
4. Résumé link restyle.

Nothing in this file authorizes a commit by itself — it is the spec to build
against.
