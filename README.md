# Christopher Austin Lorenzo - Portfolio

IT Service Desk Analyst II building toward cloud, network, and infrastructure engineering, documented through hands-on labs, not just tools listed on a resume.

**Live site:** https://chrisalorenzo.com

## Purpose

This repository is the source for my public portfolio: a recruiter-facing site that shows what I've actually built and validated, distinguishes mature work from active buildouts and learning labs, and links out to the real repositories, resume, and contact channels behind each project.

## Key Portfolio Sections

- **Hero**, name set in JetBrains Mono, a `/`-prefixed pine eyebrow, and a one-line positioning subhead
- **About**, how service-desk experience turns into infrastructure practice, including how AI-assisted engineering fits into the workflow (reviewed and validated, not autonomous)
- **Current Focus**, what's actively in progress right now, kept short and current
- **Projects**, a ruled work-list with color-coded status kickers (mature / active / learning lab / in progress / private), followed by a full-bleed proof band of architecture diagrams and screenshots per project
- **Skills**, grouped by domain (infrastructure, networking/DNS, cloud/IaC, Linux, automation, observability, enterprise IT), no skill-bar percentages or inflated claims
- **Resume & Contact**, downloadable resume, email, GitHub, and LinkedIn

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
|   `-- data/
|       `-- projects.js
`-- docs/
```

## Deployment

Hosted on **Cloudflare Pages**. Pushing to `main` triggers a Cloudflare Pages build (`npm run build`, publish directory `dist/`) which deploys automatically. No manual deploy step is required. `chrisalorenzo.com` and `www.chrisalorenzo.com` are attached as custom domains in the Cloudflare Pages project; DNS is managed in Cloudflare (Porkbun is the registrar only).

## Public-Safety Note

This site and repository are intentionally scoped to public-safe content: no secrets, tokens, credentials, internal IP addresses, sensitive hostnames, or detailed firewall/remote-access configuration. Private or in-progress projects are described at a high level only, without exposing internal operational detail.
