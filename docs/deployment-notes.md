# Deployment Notes

## Hosting Model

Static site (HTML / CSS / JavaScript), built with Vite and hosted on
**Cloudflare Pages**.

No backend server, database, Docker, or VM.

## Deployment Flow

```text
Local repo
  ↓
git push origin main
  ↓
GitHub repository (source only)
  ↓
Cloudflare Pages build  (npm run build → dist/)
  ↓
Cloudflare edge (global CDN, automatic HTTPS)
  ↓
chrisalorenzo.com  /  www.chrisalorenzo.com
```

## DNS / Domain

- **Registrar:** Porkbun (registration only)
- **DNS:** Cloudflare (authoritative nameservers)
- **Custom domains:** `chrisalorenzo.com` and `www.chrisalorenzo.com` are
  attached to the Cloudflare Pages project, which manages the DNS records
  and the TLS certificate (apex handled by Cloudflare CNAME flattening).

## Notes

- `vite.config.js` `base` is `/` — the site serves from the domain root.
- GitHub Pages is not used; there is no deploy workflow in `.github/workflows/`.
- Migrating to self-hosting (VPS + Caddy behind Cloudflare) later would not
  require domain or repo changes — only the Pages project is swapped out.
