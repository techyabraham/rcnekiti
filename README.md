# RCN Ekiti

The static website for Remnant Christian Network, Ekiti. Built with Next.js App Router, React, TypeScript and Tailwind CSS, and exported as static files for Vercel.

## Requirements

- Node.js 20.9 or later
- npm

## Local development

```sh
npm install
npm run prepare-brand
npm run optimize-images
npm run dev
```

## Build

```sh
npm run lint
npm run typecheck
npm run build
```

Static output is written to `out/`. See `OPEN_ITEMS.md` for details requiring confirmation and `DECISIONS.md` for implementation choices.
