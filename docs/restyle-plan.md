# Portfolio Restyle Plan

Implementation spec for applying [`brand.md`](brand.md) (Rosé Pine spine, `pine`
signature accent) to this site. `brand.md` sets the shared tokens; this file is
the portfolio-specific execution plan.

**Status (superseded, 2026-08-31):** The Rosé Pine dark theme described here
was replaced by a light, corporate-neutral palette (see the current
`src/styles.css` and `docs/brand.md`'s note). This document is retained as the
historical execution record for the restyle effort, not the active spec. The
final direction was a light neutral base, petrol/slate accent, terminal hero,
horizontal-scroll work strip, and ruled per-project detail, driven by operator
feedback ("something neutral, professional, corporate, like a director of IT
infra would expect"). See the repo README for the current section map.

## Direction

Personal-engineer site, not a dashboard. Confident, quiet, typographic. The
visual payload is the real work (diagrams, screenshots, project detail), not
decorative UI chrome.

## Reference

A mockup of the hero + work-list direction was built and reviewed
2026-08-29: https://claude.ai/code/artifact/164c3592-98e1-42b8-9c12-b5df59e785ec
(approved). That link is a Claude Artifact, not guaranteed to persist, this
document is the durable spec; rebuild the mockup from here if the link dies.

## Hero

- Headline (name) set in **JetBrains Mono**, the signature move, an
  engineer's site typeset like one. Large, confident, staggered settle-in on
  load (one beat, not a sequence of animations).
- Eyebrow line: a `/`-prefixed label in `pine`, e.g. `/ infrastructure &
  platform engineering`. This is one of the only two places `pine` appears in
  the hero, restraint is the point.
- Subhead in body sans (IBM Plex Sans), `subtle` color, one or two sentences,
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

- Real diagrams/screenshots, full-bleed between sections, the actual visual
  proof-of-work. This is the highest-value remaining piece; wire in the
  diagrams already merged in `home-network-infrastructure-HA-DNS`,
  `home-network-managed-infrastructure-lab`, `vps-cloud-infra-lab`, and
  `aws-network-automation-lab` once each project's write-up exists.

## About / Skills / Resume / Contact (step 3, done)

- Removed the bordered-card treatment (background, border-radius, pine
  left-bar) across `About.jsx`, `CurrentFocus.jsx` (sharing the same old
  card pattern though never named in this plan, fixed alongside step 3
  rather than left broken), `Skills.jsx`, `Resume.jsx`, and `Contact.jsx`.
- Body copy now renders directly against the page background inside a
  `.section-body` container (~680px measure), matching `brand.md`'s
  "sections divided by a 1px muted rule, not cards."
- Skills became a ruled two-column grid (`.skills-list`) instead of bordered
  tiles, same divider language as the work-list, collapses to one column
  under 680px.
- Contact became a ruled list (`.contact-list`: mono `pine` label, value,
  right-aligned mono tag) instead of three boxed tiles.
- `Header.jsx` needed no changes, already used the right tokens.

## Motion

- Hero: one staggered settle-in beat on load.
- Sections/list entries: fade + rise 12px on scroll into view.
- Hover: 120ms, lift the title only, no shadow, no scale-bounce.
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
   logo mark, `stayZ3RO` wordmark), originally missing from this build
   order entirely; folded in here (2026-08-30) rather than left unscoped,
   since it was sitting inconsistent against the already-restyled
   Hero/Projects sections.
4. Résumé link restyle.

Nothing in this file authorizes a commit by itself, it is the spec to build
against.
