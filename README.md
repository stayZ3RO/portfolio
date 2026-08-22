# stayZ3RO Portfolio

Personal technical portfolio for IT support, networking, cloud infrastructure, homelab, and self-hosted projects.

## Overview

This portfolio is a recruiter-facing project hub. It highlights documented infrastructure labs, project status, core skills, contact links, and a downloadable resume.

## Focus Areas

- IT support and troubleshooting
- Home network infrastructure
- DNS, DHCP, VLANs, routing, and remote access
- Proxmox, Docker, Linux VPS hosting, and self-hosted services
- Monitoring, alerting, and operational validation
- Documentation and project case studies

## Tech Stack

- Vite
- React
- Plain CSS
- GitHub Pages static hosting

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

The Vite base path is configured for GitHub Pages project hosting at `/portfolio/`.

## Repo Structure

```text
portfolio/
|-- index.html
|-- package.json
|-- vite.config.js
|-- public/
|   `-- resume.pdf
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   |-- styles.css
|   |-- components/
|   `-- data/
|       `-- projects.js
|-- docs/
`-- resume.pdf
```
