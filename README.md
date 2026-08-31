# Christopher Austin Lorenzo - Portfolio

IT Service Desk Analyst II building toward cloud, network, and infrastructure engineering, documented through hands-on labs, not just tools listed on a resume.

**Live site:** https://chrisalorenzo.com

## Purpose

This repository is the source for my public portfolio: a recruiter-facing site that shows what I've actually built and validated, distinguishes mature work from active buildouts and learning labs, and links out to the real repositories, resume, and contact channels behind each project.

## Key Portfolio Sections

- **Hero**, terminal-style intro (`whoami` / `ls ~/projects`) with clickable repo, blog, and dashboard links, plus a one-line positioning statement and status pill
- **Now**, a timestamped list of current work with a relative "updated X ago" label
- **Work**, a horizontal-scroll strip of project panels (architecture diagram or code snippet, tool stack, status) that moves as you scroll
- **Detail**, a ruled Problem / Implementation / Validation / Outcome breakdown for each project, with the color-coded status kicker (mature / active / learning lab / in progress / private)
- **Links**, cards to the blog, the public status dashboard, and GitHub

## Featured Engineering Projects

| Project | Status | What it shows |
|---|---|---|
| [Home Network Infrastructure / HA DNS](https://github.com/stayZ3RO/home-network-infrastructure-HA-DNS) | Mature | Pi-hole + Unbound + Keepalived HA DNS, Prometheus/Grafana/Alertmanager monitoring, validated failover |
| [Managed Network Infrastructure Lab](https://github.com/stayZ3RO/home-network-managed-infrastructure-lab) | Active | Omada/ER605 managed cutover complete; segmentation, VLAN, and firewall redesign retained as planned future work |
| [AWS Network Automation Lab](https://github.com/stayZ3RO/aws-network-automation-lab) | Learning lab, CI-validated | Reusable Terraform/OpenTofu VPC module + Python drift-detection CLI, tested and CI-gated, no cloud resources applied |
| [VPS Cloud Infrastructure Lab](https://github.com/stayZ3RO/vps-cloud-infra-lab) | In progress | Linux VPS hardening, DNS/public routing; reverse proxy, deployment, monitoring, and backups still in progress |

Service Desk Toolkit (PowerShell diagnostics/reporting) is private and in development, mentioned on the site at a high level only.

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
