# Brand — Christopher Lorenzo

Shared identity for **`chrisalorenzo.com`** (portfolio), **`stayz3ro.dev`**
(blog), and the brand layer of **`homelab-command-center`**.

The command-center keeps its own `design_guidelines.json` for NOC-functional
decisions (semantic red/green/amber, dense tables, grid). This file governs
the **brand layer** — palette, type, one accent, voice — so the three
properties read as one person's work without looking identical.

## Direction

Muted, low-contrast, warm-dark — the aesthetic of the colour schemes
engineers theme their editors with: **Rosé Pine**, Tokyo Night, Catppuccin.
The palette signals "a developer made this" before a word is read. Easy on
the eyes for long reading, subtle enough to stay out of the way, distinct
enough that it isn't the default near-black-plus-acid-accent look.

**Spine: Rosé Pine.** Tokyo Night's structural calm and Catppuccin's
softness inform the details. Contrast comes from the palette's own steps,
not from brightness — **no gradients on brand surfaces, no glow.**

## Colour

### Dark — default for portfolio + command-center; available on the blog

| Token | Hex | Use |
|---|---|---|
| `base` | `#191724` | page background |
| `surface` | `#1f1d2e` | cards, raised panels |
| `overlay` | `#26233a` | inputs, hover, code blocks |
| `muted` | `#6e6a86` | borders, hairlines, faint text |
| `subtle` | `#908caa` | secondary text, captions |
| `text` | `#e0def4` | primary text |
| `pine` | `#31748f` | **signature accent** — links, focus ring, key marks |
| `gold` | `#f6c177` | the few things that must catch the eye (LIVE, active nav) |
| `foam` | `#9ccfd8` | ok / online (dashboard) |
| `love` | `#eb6f92` | error / offline (dashboard) |
| `iris` | `#c4a7e7` | occasional second accent, tags |

### Light — default for the blog; toggle on the portfolio

| Token | Hex | Use |
|---|---|---|
| `base` | `#faf4ed` | background |
| `surface` | `#fffaf3` | cards |
| `overlay` | `#f2e9e1` | code, hover |
| `muted` | `#dfdad9` | borders, hairlines |
| `subtle` | `#797593` | secondary text |
| `text` | `#575279` | primary text |
| `pine` | `#286983` | signature accent |
| `gold` | `#ea9d34` | highlights |
| `foam` | `#56949f` | ok |
| `love` | `#b4637a` | error |
| `iris` | `#907aa9` | second accent |

### Rules

- **One accent does the work: `pine`.** `gold` is reserved for the handful
  of elements that genuinely need the eye. Everything else is
  `text` / `subtle` / `muted`.
- Inside the command-center, functional semantics win: offline = `love`,
  online = `foam`, warning = `gold`, retired = `subtle`.
- No gradient fills, no drop shadows, no glow on brand surfaces. Depth is
  the 1px `muted` hairline and the `base` → `surface` → `overlay` step.

## Type

| Role | Face | Notes |
|---|---|---|
| Display / headings | **JetBrains Mono** 500–700 | sentence case; `-0.02em` tracking at large sizes. The mono headline is the identity move — an engineer's site, typeset like one. |
| Body | **IBM Plex Sans** 400 / 500 | the command-center's body face; humanist, holds up at reading length |
| Data / eyebrows / labels | **JetBrains Mono** 400 | IPs, metrics, dates; eyebrows lowercase with a leading `/` (e.g. `/ ha dns`), `0.04em` tracking |

Carried over from the command-center: **no Inter, Roboto, Open Sans, Lato.**

Type scale — body `15 / 16 / 18`; display `22 / 30 / 44 / 64`, tightening
tracking as size grows.

## Layout

- **Portfolio** — single column. ~680px measure for text, full-bleed for
  diagrams and screenshots (the real artefacts are the visual payload, not
  decorative UI). Sections divided by a 1px `muted` rule, not cards.
  Pattern: eyebrow (mono, `/ prefix`) → heading (mono) → body (Plex Sans).
- **Blog** — ~680px measure, light-first, mono eyebrows for date + tags,
  code blocks on `overlay`. Nothing between the reader and the words.
- **Command-center** — its own grid stands; this file only swaps the
  palette (`base` / `surface` / `overlay` / `text` / accent) and keeps the
  mono numerics.

## Signature

**The all-mono headline**, plus **restraint everywhere else.** Headings in
JetBrains Mono are unusual enough to be remembered and honest about who
made the site. Motion is quiet: on load the hero settles in one beat; on
scroll, sections fade and rise ~12px, staggered; hover lifts contrast in
120ms. One accent, one type idea, one motion — nothing else asking for
attention. `prefers-reduced-motion` disables the reveals.

## Voice

Plain, specific, no filler. "Migrated my home network off Omada" — not
"leveraged cutting-edge infrastructure solutions." Name things by what they
do. Let the work carry the weight; the copy points at it.

## Status

Settled. Signature accent is **`pine`** (`#31748f` dark / `#286983` light).
