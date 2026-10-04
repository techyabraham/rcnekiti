# RCN Ekiti

The public website for Remnant Christian Network, Ekiti, in Ado-Ekiti, Nigeria. It is built with Next.js App Router, React, TypeScript and Tailwind CSS, then exported as a static site for Vercel.

## Pages

- `/` — home, gatherings, featured message and event archive
- `/about/` — church and resident pastor
- `/gatherings/` — recurring schedule and event archive
- `/messages/` — message listings and YouTube links
- `/watch-live/` — live stream destinations
- `/visit/` — address, directions and contact options
- `/give/` — local giving/contact information

## Run locally

Requirements: Node.js 20.9 or later and npm.

```sh
npm install
npm run prepare-brand
npm run optimize-images
npm run dev
```

Open `http://localhost:3000`. Image preparation can be skipped when the checked-in generated files in `public/` are already present. Keep `assets-src/` as the source of truth for supplied artwork.

## Quality checks and production build

```sh
npm run lint
npm run typecheck
npm run test:logic
npm run build
```

The build writes the static site to `out/`. See [DEPLOY.md](DEPLOY.md) for Vercel configuration. To regenerate the share image, run `npm run prepare-og`.

## Where to make common changes

- Church links, phone, address, domain and giving/map destinations: `content/site.ts`
- Weekly and monthly program schedule: `content/schedule.ts`
- One-off events and flyers: `content/events.ts`
- Messages and YouTube IDs: `content/messages.ts`
- Pastor bio and portrait: `content/leader.ts`
- Homepage and page copy: `content/copy.ts`
- Shared colors and typography: `styles/tokens.css`
- Original supplied files: `assets-src/`; generated optimized files: `public/`

See [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md) for editing and asset steps, [ASSETS_NEEDED.md](ASSETS_NEEDED.md) for remaining inputs, [DESIGN_NOTES.md](DESIGN_NOTES.md) for the visual system, [DECISIONS.md](DECISIONS.md) for implementation choices, and [OPEN_ITEMS.md](OPEN_ITEMS.md) for facts awaiting church confirmation.

## Release status

Static export, lint, type checking, logic checks and build have passed during implementation. Automated Lighthouse and axe scores have not yet been recorded; complete the release checks listed in [OPEN_ITEMS.md](OPEN_ITEMS.md) before treating the site as fully signed off.
