# Christopher Austin Lorenzo - Portfolio

I'm an IT Service Desk Analyst II building toward cloud, network, and infrastructure engineering. This portfolio documents hands-on labs alongside the tools on my resume.

**Live site:** https://chrisalorenzo.com

## Purpose

I use this repository to build my public portfolio. It shows what I've built and validated, separates mature work from active buildouts and learning labs, and links to the repositories, resume, and contact channels for each project.

## Key Portfolio Sections

- **Hero**, terminal-style intro (`whoami` / `ls ~/projects`) with clickable repo, blog, and dashboard links, plus a one-line positioning statement and status pill
- **Now**, a timestamped project-status snapshot with a relative "updated X ago" label
- **Work**, a horizontal-scroll strip of project panels (architecture diagram or code snippet, tool stack, status) that moves as you scroll
- **Detail**, a ruled Problem / Implementation / Validation / Outcome breakdown for each project, with the color-coded status kicker (mature / active / learning lab / in progress)
- **Links**, cards to the blog, the public status dashboard, and GitHub

## Featured Engineering Projects

| Project | Status | What it shows |
|---|---|---|
| [Home Network Infrastructure / HA DNS](https://github.com/stayZ3RO/dns) | Mature | Pi-hole + Unbound + Keepalived HA DNS, Prometheus/Grafana/Alertmanager monitoring, validated failover |
| [Managed Network Infrastructure Lab](https://github.com/stayZ3RO/netlab) | Active | UDM Pro and USW-24-PoE have been the core since 2026-09-27; the LAN remains flat, Deco nodes are APs, and VLAN/firewall segmentation is planned. Earlier Omada evidence is labeled historical. |
| [AWS Network Automation Lab](https://github.com/stayZ3RO/cloud-netlab) | Learning lab, CI-validated | Reusable Terraform/OpenTofu VPC module + Python drift-detection CLI, tested and CI-gated, no cloud resources applied |
| [VPS Cloud Infrastructure Lab](https://github.com/stayZ3RO/vps-lab) | In progress | Netcup VPS with Caddy HTTPS, seven Kuma monitors, and Discord plus self-hosted ntfy alerts live since 2026-09-28; Umami and backup/restore work remain planned |

## Technology Stack

- Vite
- React
- Plain CSS (no framework)
- Cloudflare Pages static hosting
- Custom canvas network background (no animation library)
- IntersectionObserver scroll-reveal (no reveal library)

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

The Vite base path is `/`, the site is served from the domain root on Cloudflare Pages.

## Repository Structure

```text
portfolio/
|-- index.html
|-- package.json
|-- vite.config.js
|-- public/
|   |-- resume.pdf
|   `-- proof/
|       |-- ha-dns-foundation.webp
|       |-- ha-dns-failover-dashboard.webp
|       |-- managed-topology.webp
|       |-- managed-omada-topology.webp
|       |-- vps-architecture.webp
|       |-- vps-ufw-firewall.webp
|       `-- vps-dns-records.webp
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   |-- styles.css
|   |-- components/
|   |   |-- Header.jsx
|   |   |-- Hero.jsx
|   |   |-- Now.jsx
|   |   |-- WorkSection.jsx
|   |   |-- ProjectDetails.jsx
|   |   |-- Links.jsx
|   |   |-- NetworkBackground.jsx
|   |   `-- Reveal.jsx
|   `-- data/
|       `-- projects.js
`-- docs/
```

## Deployment

Hosted on **Cloudflare Pages**. Pushing to `main` triggers a Cloudflare Pages build (`npm run build`, publish directory `dist/`) which deploys automatically. No manual deploy step is required. `chrisalorenzo.com` and `www.chrisalorenzo.com` are attached as custom domains in the Cloudflare Pages project; DNS is managed in Cloudflare (Porkbun is the registrar only).

## Public-Safety Note

This site and repository are intentionally scoped to public-safe content: no secrets, tokens, credentials, internal IP addresses, sensitive hostnames, or detailed firewall/remote-access configuration. Private or in-progress projects are described at a high level only, without exposing internal operational detail.
