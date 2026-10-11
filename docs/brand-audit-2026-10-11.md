# Brand audit: chrisalorenzo.com and blog.chrisalorenzo.com

Audited 2026-10-11 against the portfolio branch
`fix/lab-figure-hostname-redaction` (local, one commit ahead of main) and the
blog branch `redesign/field-manual-pass` (the field-manual pass, built on
`fold/muse-redesign`). Pages captured at 1440 and 390 wide, dark color
scheme, reduced motion for repeatable captures: portfolio `/`, `/cfm`, 404;
blog `/`, `/ledger/`, a long and a short entry, `/about/`, `/systems/`,
`/projects/`, a project page, `/tags/`, a tag page, `/uses/`, 404.

The two sites share a palette and a mono face and nothing else visible.
Each has its own wordmark string, display face, body face, nav, footer, and
link set, and the portfolio still points at the blog's old domain.

## Findings

### Type

| | Portfolio | Blog |
|---|---|---|
| Display | Space Grotesk 700, self-hosted | Zilla Slab 600, Google Fonts |
| Body | System sans stack, 17px | Source Serif 4, 17px root |
| Labels, data | JetBrains Mono, self-hosted | JetBrains Mono, Google Fonts |
| Eyebrows | UPPERCASE, .22em tracking | lowercase `/ prefix`, .14em tracking |

Only the mono face is shared. The blog's `design.md` locks the three-voice
slab / serif / mono system; the portfolio predates it. The blog's `TOKENS.md`
says "the portfolio repo is never modified to match", which this audit
reverses on request.

### Color

Both sites' dark palette is the same set of hexes (`#141518` paper, `#1c1e22`
surface, `#2e3138` hairline, `#f4f4f2` ink, white accent). The names differ:
the portfolio uses `--text`, `--secondary`, `--hairline`, the blog uses the
role contract `--fg`, `--fg-2`, `--line`. The blog ships nine themes behind a
switcher and persists the choice under the `theme` key "shared with the
portfolio"; the portfolio has no switcher and one theme, so the key is never
read there. The portfolio hard-codes `#f4f4f2`, `#c9ccd1`, and `#ffffff` in
`LabFigure.jsx` (figure strokes, packets) outside any token.

### Nav

| | Portfolio | Blog |
|---|---|---|
| Wordmark | "Christopher Lorenzo", Space Grotesk 700 | "Chris Lorenzo", Zilla Slab 600, `FM-01` doc tag, tagline |
| Links | Systems · Lab · Now · Experience · Contact · Resume, sans, Title Case | ledger · about · portfolio · status · rss, mono, lowercase, pills |
| To the other site | none in the nav; a "Field notes" section deep in the page links to `stayz3ro.dev` | `portfolio` link, present |
| Controls | none | search, theme switcher; motion toggle in the footer |
| Rule under masthead | 1px hairline | 4px double rule |
| Mobile | section links hidden at 640px, only name and Resume stay | every link stays, nav wraps to its own row |
| `/cfm` | its own nav: Portfolio · Lab · Contact | n/a |

### Footer

| | Portfolio | Blog |
|---|---|---|
| Content | status dot, "built and operated by Christopher Lorenzo", build date, UTC clock | type credits, © line, UTC clock, links row, hire line, motion toggle |
| Links | none | ledger · systems · projects · uses · portfolio · github · linkedin · status · rss |
| Rule | 1px hairline | 4px double rule |

The blog footer still links `status.stayz3ro.dev` while its masthead links
`status.chrisalorenzo.com`.

### Cross-links between projects and posts

- Portfolio `FieldNotes.jsx` hard-codes `BLOG = 'https://stayz3ro.dev'` and
  three entries copied on 2026-09-29. The domain moved on 2026-10-04 (blog
  entry 35 documents it). The links work only while the old host redirects.
- Portfolio `SYSTEMS` rows carry a `github` link and an unused `writeup`
  slot. No row links to the blog. The blog has a project page per repo
  (`/projects/ha-dns/`, `/projects/vps/`, `/projects/managed-network/`,
  `/projects/portfolio/`, `/projects/blog/`) that lists every entry for it.
- Blog `data/projects.ts` links each project to its GitHub repo only. The
  portfolio has no per-row anchors, so there is nothing stable to link back
  to below `#systems`.
- Blog `data/projects.ts` keys projects by repo URL and the entries use two
  URLs for the same DNS repo (`dns` and the pre-rename
  `home-network-infrastructure-HA-DNS`), so the HA DNS series and project
  page miss the entries that carry the old URL. `projects.ts` also points
  "This blog" at the pre-rename `stayz3ro-dev` repo.

### Facts that disagree between the two sites

- Portfolio `FLEET` places `blog` on `vps-edge`; the VPS row in the same
  file says the blog and portfolio are on Cloudflare Pages. The blog's
  README agrees with the latter.
- Portfolio `Now` says the managed cutover is done; the blog `About` "now"
  block (dated sep 29) says the production cutover is still gated. The blog
  entry 33 (sep 29) and the portfolio agree the UniFi core went live on
  2026-09-27, so the About block is the stale one.
- Blog `About` and `README` describe the lab hosts as `stayz3ro.dev`
  subdomains in places; the portfolio contact email is `stayz3ro@gmail.com`
  and the blog has no email. Noted, not changed.

## Decision: one family, the manual's voice

The blog's field-manual system is the newer, more specified of the two and
already carries the shared token contract. The portfolio adopts it:

- **Type.** Zilla Slab display, Source Serif 4 body, JetBrains Mono labels,
  on both sites. The portfolio self-hosts all three (it already self-hosts
  mono); the blog keeps Google Fonts for now, same families, so the two
  render identically.
- **Color.** The portfolio takes the blog's `tokens.css` verbatim (role
  names, nine themes). Its old names (`--text`, `--secondary`, `--hairline`,
  `--surface-2`, `--on-accent`, `--nav-bg`, glow and ghost values) become
  aliases of the roles so every existing rule keeps working, and hard-coded
  figure colors move onto tokens. The theme switcher and the motion toggle
  are the blog's, reading the same `theme` and `motion` localStorage keys,
  so a choice made on one site holds on the other.
- **Nav.** Same masthead on both: wordmark "Christopher Lorenzo" in Zilla
  Slab, a mono doc tag (`FM-01` on the blog, `PF-01` on the portfolio),
  mono lowercase links, search where there is something to search, the
  theme switcher, a double rule underneath. The portfolio nav gains `blog`;
  no link is hidden on mobile. `/cfm` uses the same masthead.
- **Footer.** Same colophon on both: type credits, © line, live UTC clock,
  a links row (the other site first), the hire line, the motion toggle,
  double rule above.
- **Cross-links.** Every portfolio system row with blog coverage links to
  its blog project page; rows get stable ids so the blog's project pages
  link back to `chrisalorenzo.com/#sys-<slug>`. Field notes point at
  `blog.chrisalorenzo.com` and list the three newest published entries.
  The blog's stale repo URLs are corrected so the project pages are
  complete.
- **Facts.** The `FLEET` blog row moves off the VPS. The blog About "now"
  block gets a dated correction on the cutover line. Nothing else is
  rewritten.

Kept on purpose: the portfolio's hero thesis, scan strip, decision-log
rows, lab figure, and interlude. They are the portfolio's content; the pass
changes their dress, not their shape. The blog's motion inventory is
untouched.

## Changes, one per commit

Portfolio, branch `redesign/shared-brand` (from
`fix/lab-figure-hostname-redaction`):

1. `docs: brand audit and the shared-family decision` (this file)
2. `feat: adopt the blog's token contract and nine themes`
3. `feat: Zilla Slab and Source Serif 4, self-hosted, replace Space Grotesk and the system sans`
4. `feat: shared masthead with blog link, theme switcher, and motion toggle`
5. `feat: shared colophon footer`
6. `feat: system rows link to their blog project pages, field notes on the new domain`
7. `fix: the blog is on Cloudflare Pages, not the VPS edge`

Blog, continuing `redesign/field-manual-pass`:

8. `fix: footer status link and stale repo URLs in the project map`
9. `feat: project pages link back to the portfolio system rows`
10. `fix: About now block, cutover line dated`

Nothing merged. Each commit builds clean.

## Before and after

Captures live in the session scratchpad and are collected in the audit
gallery handed over with this pass. Per page, what changed:

| Page | Before | After |
|---|---|---|
| Portfolio `/` | Space Grotesk hero, sans body, bare nav without a blog link, status-line footer | Slab hero, serif body, shared masthead with `blog` and the switcher, shared colophon, system rows link to entries |
| Portfolio `/cfm` | Own nav (Portfolio · Lab · Contact), sans | Shared masthead and colophon, slab and serif |
| Portfolio 404 | Unstyled blue-on-navy page, system sans | Masthead, colophon, tokens |
| Blog `/` | Field manual, `writing` nav link, no rss above the fold | Unchanged by this audit; the field-manual pass already added `rss` and renamed the link |
| Blog `/projects/<slug>/` | Repo link only | Repo link plus `on the portfolio →` |
| Blog `/about/` | "now" block says the cutover is gated | Line corrected and dated |
| Blog footer | `status.stayz3ro.dev` | `status.chrisalorenzo.com` |
