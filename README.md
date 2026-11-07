# Christopher Austin Lorenzo - Portfolio

I'm an IT Service Desk Analyst II building toward cloud, network, and infrastructure engineering. This portfolio documents hands-on labs alongside the tools on my resume.

**Live site:** https://chrisalorenzo.com

## Purpose

I use this repository to build my public portfolio. It shows what I've built and validated, separates mature work from active buildouts and learning labs, and links to the repositories, resume, and contact channels for each project.

## Key Portfolio Sections

- **Hero**, a two-line headline with an availability pill, a short bio, and calls to action
- **Systems**, work cards for each project with a color-coded status kicker (running / building)
- **Lab**, the live lab status block
- **About**, experience, the Now block (a three-row status block with no timestamp), and an interlude
- **Field Notes**, links to posts on the blog
- **Contact**, ways to reach me

## Featured Engineering Projects

| Project | Status | What it shows |
|---|---|---|
| [Home Network Infrastructure / HA DNS](https://github.com/stayZ3RO/dns) | Running | Pi-hole + Unbound + Keepalived HA DNS, Prometheus/Grafana/Alertmanager monitoring, validated failover |
| [Managed Network Infrastructure Lab](https://github.com/stayZ3RO/netlab) | Running | UDM Pro and USW-24-PoE have been the core since 2026-09-27; the LAN remains flat, Deco nodes are APs, and VLAN/firewall segmentation is planned. Earlier Omada evidence is labeled historical. |
| [AWS Network Automation Lab](https://github.com/stayZ3RO/cloud-netlab) | Building, CI-validated | Reusable Terraform/OpenTofu VPC module + Python drift-detection CLI, tested and CI-gated, no cloud resources applied |
| [VPS Cloud Infrastructure Lab](https://github.com/stayZ3RO/vps-lab) | Running | Netcup VPS with Caddy HTTPS. Kuma monitors: see the status page. Discord and self-hosted ntfy alerts have been live since 2026-09-28. Umami is on the public sites. |
| Service desk automation platform | Building | n8n workflows plus native and Grafana dashboards for the ticketing queue; workflows are staged pending approval |
| Homelab command center | Building | Self-hosted ops console for the lab (React, FastAPI, MongoDB); v1 is code-complete locally and not yet deployed against the live lab |
| Service desk diagnostic toolkit | Running | Portable PowerShell and WPF diagnostics toolkit for Windows triage, with sanitized ticket-ready summaries |

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
|-- design-history/
|-- docs/
|-- scripts/gen-meta.mjs
`-- src/
    |-- App.jsx
    |-- main.jsx
    `-- site/
        |-- Site.jsx
        |-- data.js
        `-- status.js
```

## Deployment

Hosted on **Cloudflare Pages**. Pushing to `main` triggers a Cloudflare Pages build (`npm run build`, publish directory `dist/`) which deploys automatically. No manual deploy step is required. `chrisalorenzo.com` and `www.chrisalorenzo.com` are attached as custom domains in the Cloudflare Pages project; DNS is managed in Cloudflare (Porkbun is the registrar only).

## Public-Safety Note

This site and repository are intentionally scoped to public-safe content: no secrets, tokens, credentials, internal IP addresses, sensitive hostnames, or detailed firewall/remote-access configuration. Private or in-progress projects are described at a high level only, without exposing internal operational detail.
