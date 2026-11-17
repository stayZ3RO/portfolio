# DESIGN.md

The UI and UX instructions for this site. Read this before any change to
layout, CSS, tokens, fonts, images, motion or page copy. The blog
(blog.chrisalorenzo.com) carries the same rules in its own DESIGN.md; the
two sites are one person's work and share one type system and one palette.

Direction, chosen 2026-11-17: slab headings, a reading serif, mono for
data, plain rules between sections. Evidence first, restraint everywhere
else.

Status: this file describes the target. The site does not match it yet.
Until the redesign lands, a change to existing pages follows this file
where it can and must not move the site further away from it.

## How this file relates to the others

- `src/site/site.css` holds the tokens today, under portfolio names
  (`--text`, `--secondary`, `--hairline`). The redesign moves them to the
  shared role names below (`--fg`, `--fg-2`, `--line`), the same names the
  blog uses, so one theme reads the same on both sites.
- `docs/brand.md` points at the blog's token contract. This file replaces
  it as the instruction file for this repo.
- `docs/restyle-plan.md` and `design-history/` are history. Where they and
  this file disagree, this file wins.
- Method: this file follows my design-system and UX skills: one token
  source, role names in code, a fixed order of authority, a UX pass
  (names, flow, states, words, accessibility) before code, and a check
  list before shipping. No shared token package is vendored here yet;
  until one is, the token tables below are the source and any new value
  needs my go, recorded under "Exceptions".

## Principles

1. **Evidence before adjectives.** The first screen shows something real:
   a diagram, a check table, a command and its result. No claim that a
   record cannot back.
2. **One voice per job.** Slab for headings, serif for reading, mono for
   labels, dates and code. Nothing else.
3. **Structure comes from rules and spacing, not boxes.** Hairlines and
   section kickers, not card grids.
4. **Still by default.** The page is complete without motion and without
   JavaScript. Motion is feedback, never decoration.
5. **Public-safe always.** Every image and example could be printed on a
   billboard. See "Imagery".

## Type

Three families, all SIL OFL 1.1, all self-hosted with their `OFL.txt`.
No request to Google Fonts or any other font host, at build time or in the
browser.

| Role | Family | Weights | Used for |
| --- | --- | --- | --- |
| Display | Zilla Slab | 600, 700 | page titles, section and case study headings, the wordmark |
| Reading | Source Serif 4 | 400, 600, italic 400 | body text, ledes, summaries |
| Label | JetBrains Mono | 400, 500 | kickers, dates, metadata, table data, code, captions |

Fonts live in `public/fonts/` as woff2, latin subset, one folder per
family with its `OFL.txt`. Space Grotesk and the OS sans are retired. The
JetBrains Mono files already there stay and get their `OFL.txt`.

Scale (root 17px). The names match the blog's tokens; this site adopts
them in the redesign.

| Token | Value | Use |
| --- | --- | --- |
| `--text-display` | `clamp(2.4rem, 6vw, 4rem)` | one per page at most: the intro line |
| `--text-h1` | `2rem` | page titles |
| `--text-h2` | `1.4rem` | sections |
| `--text-h3` | `1.1rem` | subsections |
| `--text-body` | `1.02rem` | reading text |
| `--text-small` | `0.85rem` | metadata, table text |
| `--text-caption` | `0.75rem` | kickers, figure captions |

Rules:

- Display tracking `-0.02em`, roman only. Body leading 1.65, headings 1.1
  to 1.3, code 1.75.
- Kickers: mono, uppercase, `0.14em` tracking, caption size, `--muted`.
- Measure: 60 to 75 characters for reading text (`--maxw-prose`).
- Mono is for data. A sentence is never set in mono.
- Italic only for emphasis inside running text.

## Colour

Two house themes, Zero light and Zero dark, true neutrals with one petrol
accent. They are the defaults on both sites. This site offers only these two:
the OS preference picks one, a stored choice wins. A blog theme id ending
in `-light` or `-dark` maps onto the matching Zero theme, as it does now.

| Role | Zero light | Zero dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f4f4f2` | `#141518` | page |
| `--bg-2` | `#ebece9` | `#0f1013` | bands, table heads |
| `--surface` | `#ffffff` | `#1c1e22` | figures |
| `--code-bg` | `#ebece9` | `#101114` | code blocks |
| `--line` | `#d9dad6` | `#2e3138` | hairlines |
| `--line-2` | `#c3c5c1` | `#3a3e46` | strong rules, input borders |
| `--fg` | `#141518` | `#f4f4f2` | headings, body |
| `--fg-2` | `#3a3e46` | `#c9ccd1` | secondary text |
| `--muted` | `#5b5f66` | `#9a9da3` | metadata, captions, kickers |
| `--faint` | `#8a8d93` | `#6f737a` | decoration only, never text |
| `--accent` | `#2f6670` | `#6fb3bf` | links, focus, the one highlight per view |
| `--ok` | `#2f6b3a` | `#8fbf8a` | status word "running", passing checks |
| `--warn` | `#8a5a00` | `#d4a373` | "building", "staged", unconfirmed |
| `--err` | `#a3262a` | `#e0787a` | failing checks, blocked paths in diagrams |

Contrast, WCAG 2.x relative luminance, computed 2026-11-17:

| Role | Light on `--bg` | Light on `--surface` | Dark on `--bg` | Dark on `--surface` |
| --- | --- | --- | --- | --- |
| `--fg` | 16.58 | 18.26 | 16.58 | 15.16 |
| `--fg-2` | 9.74 | 10.73 | 11.34 | 10.37 |
| `--muted` | 5.83 | 6.42 | 6.72 | 6.14 |
| `--accent` | 5.86 | 6.45 | 7.72 | 7.05 |
| `--ok` | 5.80 | 6.39 | 8.68 | 7.94 |
| `--warn` | 5.38 | 5.93 | 8.07 | 7.38 |
| `--err` | 6.65 | 7.32 | 6.21 | 5.67 |
| `--faint` | 3.02 | 3.33 | 3.83 | 3.50 |

Rules:

- Text uses `--fg`, `--fg-2`, `--muted` or a status colour. Every one of
  them is at least 4.5:1 in both themes. `--faint` is for rules, inactive
  marks and diagram strokes only.
- Status is never colour alone: the word is always there ("running",
  "building", "times out").
- One accent use per view beyond links: the active item, the allow path in
  a diagram, the focus ring. No accent fills on large areas.
- No gradients, no glass (`backdrop-filter`), no glows, no drop shadows.
- Code uses role names only. No hex literals outside the token block in
  `src/site/site.css`.

## Spacing and grid

- 4px module, tokens `--space-N` (N quarter-rems). Use the existing steps:
  1, 2, 3, 4, 6, 8, 12, 16, 24.
- Widths: prose 720px (`--maxw-prose`), wide 1120px (`--maxw-wide`).
- Gutter: 16px up to 760px, 32px above.
- Sections are separated by `--space-16` and a hairline.
- Entry rows (post lists, case studies) use two columns at 760px and up:
  a 120px meta column (date, status) and the body. One column below.
- No horizontal page scroll at 320, 375, 390, 414 or 768. Tables and code
  scroll inside their own box or wrap.

## Components

Keep the set small. A new component needs a reason in its commit message
and a line here.

- **Masthead**: wordmark "Christopher Lorenzo" in Zilla Slab 600, text
  nav (work, notes, about, resume), theme. Double rule under it. No
  tagline.
- **Intro**: kicker, one display line in plain words, the role line from
  the resume headline in mono, one paragraph of what I do, and `fig. 1`
  beside it on wide screens (under it on phones). No buttons, no pill, no
  spec sheet.
- **Section kicker**: `§ 01 name` in mono caps, hairline to the right,
  then the heading.
- **Case study**: entry row with a meta column (ISO date, status word) and
  a body: slab title, the problem in one or two sentences, a check table,
  `read the case study →`. Ranked: the strongest first. Smaller projects
  are a plain list under the case studies, one line each.
- **Check table**: mono, hairline rows, columns like check, before, after
  or expected, result. Result cells use status colours plus words. This is
  the main evidence component.
- **Figure**: hairline border, `--surface` fill, caption in mono
  `fig. N · what it shows`. Diagrams are inline SVG drawn with tokens.
  Labels are roles, never real hostnames or addresses.
- **Fleet manifest**: the service, host role, purpose table stays, in the
  check table style.
- **Experience**: role, team type, bullets. The peer review quote stays,
  attributed, as a plain block quote with a hairline rule.
- **Notes list**: latest posts from the blog as entry rows, ISO dates.
- **Contact**: one sentence about the work I like and plain links: email,
  LinkedIn, GitHub, resume (PDF). No slogan heading.
- **Link CTA**: mono, lowercase, arrow. Underlined. No filled buttons.
- **Footer**: type credits, last updated date, `© year Christopher
  Lorenzo`.

Not used: card grids of equal tiles, pills or badges that announce
anything, a spec sheet or skills card, avatar photos, icon rows, stat
counters, progress rings, tickers, live clocks, hover-only maps.

## Motion

- Allowed: colour and underline transitions on hover and focus, 120 to
  160ms; opening a disclosure (case study details), up to 200ms, height
  or opacity only.
- Not allowed: reveal-on-scroll for content, canvas backgrounds, parallax,
  tilt, magnetic links, cursor effects, kinetic or typed text, tickers,
  looping animation, theme-change washes.
- Content is visible on first paint with JavaScript off. The page HTML
  carries the full text: render it at build time (see "Rendering").
  Nothing waits for an intersection observer to appear.
- Reduced motion (OS setting or the stored `motion` override): every
  transition and animation is 0ms. The page is identical apart from that.

## Rendering

The site is a React app built by Vite, and today the served HTML holds an
empty root element; all text arrives with the script. The redesign
renders the page to static HTML at build time with `react-dom/server`
(part of `react-dom`, already a dependency) and hydrates only what needs
script: the theme switch and the case study disclosures. No new
dependency is needed for this. If a framework change is ever proposed,
list it and stop for my go first.

## Imagery

- Diagrams over pictures. A diagram shows a real mechanism: zones and
  allows, a packet path, a cutover order. Hand-built SVG, token colours,
  mono labels, a caption that says what it proves.
- Screenshots only when they prove something a diagram cannot (a UI
  state, an error, a result). Crop to the part that matters.
- Redaction before any image is committed: solid fill boxes, never blur or
  pixelation, over every real address, hostname, tailnet name, hardware
  address, account ID, email and token. Re-check at 200% zoom.
- Examples use RFC 5737 ranges (`192.0.2.0/24`, `198.51.100.0/24`,
  `203.0.113.0/24`), or 10.x clearly marked as examples that do not match
  the real plan.
- No stock photos, no generated images, no generated cover tiles. A post
  without a real image has no image.
- Every image has alt text that says what it shows and why it is there.
- The OG image (`public/og.png`) is redrawn in the new type and palette
  when the redesign lands.

## Voice

- First person, plain engineer notes. Say what changed, how it was
  checked, what broke.
- No em dashes or en dashes. No hype words: no "passionate", "cutting
  edge", "seamless", "robust", "leverage", "journey", "unlock", "supercharge".
- Sentence case for headings and buttons. ISO dates in metadata.
- Every number traces to a record. If a record cannot back it, cut it.
- No job-search announcements on either site. Contact is a plain line
  about the work and a way to reach me.
- Status words, one meaning each: `running` (live and checked), `building`
  (in progress), `staged` (built, not switched on), `documented` (written
  up, current state not shown).

## Do and don't

| Do | Don't |
| --- | --- |
| Lead with a diagram, a check table or a command and its result | Lead with a slogan, a pill or a skills list |
| Rank work: the strongest case study first and largest | Give every project the same card |
| Use the three type roles exactly | Add a fourth family or set sentences in mono |
| Use role tokens | Write hex values in components |
| Self-host fonts with `OFL.txt` | Load fonts from a CDN |
| Keep content visible without JS | Hide content until scroll |
| Write the status word next to the colour | Use colour alone |
| Redact with solid fills, RFC 5737 examples | Blur, or show real addresses or names |
| Cut a section that has nothing real in it | Fill space with filler sections |

## Check before shipping

For every page a change touches:

- Snapshots at 320px and 1280px, Zero light and Zero dark.
- Reduced motion on: page complete and static.
- Keyboard only: every control reachable, focus ring visible.
- Text contrast at least 4.5:1 (use the table above; new values need a
  computed ratio).
- No horizontal overflow at 320, 375, 390, 414, 768.
- No external font request (network panel), no hex literals outside
  the token block.
- `npm run build` passes, the built `index.html` contains the page
  text, and `src/site/buildmeta.json` is not committed unless the change
  is a release.

## Changes from the current site

Each applies when the redesign is implemented.

- **Type**: Space Grotesk and the OS sans give way to Zilla Slab and
  Source Serif 4, the blog's families. JetBrains Mono stays, for labels
  and data only.
- **Palette**: the Zero values stay. Token names move to the shared role
  names. Status colours are added.
- **Intro**: the availability pill, the kinetic letter-by-letter
  headline, the hero canvas, the ambient layer and the spec sheet go. The
  intro is text plus `fig. 1`.
- **Work**: six equal cards become ranked case studies plus a short list.
- **Lab**: the hover map gives way to a static as-built figure; the fleet
  manifest stays.
- **Motion**: reveal-on-scroll, the scroll progress bar and the live UTC
  clock go. The reduced-motion behaviour becomes the only behaviour, so
  the motion toggle goes too.
- **Rendering**: static HTML at build time.
- **Kept**: the case study copy and its labels (what I built, what broke,
  what I'd do differently, what I learned), the fleet manifest, the peer
  review quote, the Zero palette, hairlines and § kickers.

## Exceptions

None yet. Add each one with my go and the date.
