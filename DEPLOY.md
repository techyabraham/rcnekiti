# Deploying RCN Ekiti

The project builds a static export into `out/` and is configured for Vercel. No database, server runtime, form service, payment processor or account provisioning is part of this website.

## Before the first public deployment

1. Resolve the launch-critical items in [OPEN_ITEMS.md](OPEN_ITEMS.md), especially phone, affiliation wording, pastor bio approval, event/schedule facts, giving and destination links.
2. Choose the canonical public domain. The current value `https://rcnekiti.vercel.app` is a placeholder, not a confirmed church domain.
3. Run the local checks below and review the site at desktop and mobile sizes.

## Configure Vercel

1. Push the approved repository to the Git provider and import it in Vercel.
2. Set the project root to the repository root and keep the **Next.js** framework preset. Use `npm install` as the install command and `npm run build` as the build command. Leave Vercel's framework output handling enabled; Next.js writes the static export to `out/` during the build, and its Vercel integration publishes that export.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin (for example, `https://www.example.org`) for the Production environment. This value is read at build time and is used by canonical URLs, sitemap, social metadata and structured data. Set an appropriate preview origin for Preview builds if preview links should have their own canonical metadata.
4. Deploy a Preview build first. Check every route, local images, social/contact links, map fallback, share preview, sitemap and `robots.txt`.
5. Attach the approved domain in Vercel. If both apex and `www` are used, choose one canonical host and redirect the other to it. Update `NEXT_PUBLIC_SITE_URL` to match that canonical origin, then redeploy.

`vercel.json` contains the response security headers and cache policy. Keep it at the project root so Vercel applies it to the exported site.

## Build locally

```sh
npm install
npm run prepare-brand
npm run optimize-images
npm run lint
npm run typecheck
npm run test:logic
npm run build
```

The generated export is in `out/`. For a local preview, run `npm run dev`; to inspect the actual export, serve the `out/` directory with a static file server that serves directory index files.

## After launch

- Confirm HTTPS and the chosen canonical host, then inspect response headers and redirects.
- Verify the live, giving, WhatsApp, map and social destinations from the deployed pages.
- Run Lighthouse and axe checks against the deployed build and record the results in the release notes. The implementation handover has not recorded those automated scores yet.
- Confirm Vercel's Git integration is publishing the intended production branch and that future content changes trigger a new static build.
