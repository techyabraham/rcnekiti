# How to update the site

The site is a static export. Change the typed content in `content/`, regenerate affected images when needed, then rebuild and redeploy. There is no CMS or runtime database.

## Update church details and links

Edit `content/site.ts` for the public name, relationship wording, address and directions, phone, social links, stream links, map pin, giving destination, and site URL.

- Set `mapPinUrl` only to a verified venue pin; otherwise the site uses the address search fallback.
- Set `giving.ekitiUrl` only to the approved Ekiti giving destination. The current setup deliberately does not fall back to RCN Global giving.
- Set `links.ekitiInstagram`, `links.waystream`, or `links.mixlr` only when the official accounts/URLs are confirmed.
- `site.siteUrl` reads `NEXT_PUBLIC_SITE_URL` at build time and otherwise uses the Vercel placeholder. Update the deployment environment variable when the canonical domain is chosen.

## Change recurring gatherings

Edit `content/schedule.ts`. Each `ScheduleItem` needs a stable `id`, title, `published` or `draft` status, human-readable day and time, `weekly` or `monthly` frequency, `Hybrid` mode, description, venue, and recurrence rule. Times are written in WAT (Africa/Lagos). Keep unconfirmed events as drafts or describe only the confirmed portion.

The calculation for upcoming/live occurrences is in `content/occurrences.ts`; change that logic only when recurrence behavior itself changes. Logic changes should preserve the Africa/Lagos handling and be covered by the existing `npm run test:logic` checks.

## Add or update a dated event

1. Place the original flyer in `assets-src/flyers/` as a `.jpg` file. Use a clear filename and avoid duplicate names ending in ` (1).jpg`.
2. Add or edit an `EventRecord` in `content/events.ts`. Use a unique lowercase hyphenated `id`, a verified ISO date (`YYYY-MM-DD`) or `null` if the date is unknown, optional `endDateISO` for multi-day events, a supplied time, descriptive `alt`, series, and speaker names. Set `status` to `published` only after details are approved.
3. Add the flyer to the `flyerNames` list in `scripts/optimize-images.mjs` as `[source filename prefix, output slug, title, date label]`. The source prefix must uniquely match the original flyer.
4. Run `npm run optimize-images`. This creates the full-size WebP, a small WebP thumbnail, and `public/flyers.manifest.json`.
5. Point the event's `flyer` field to the generated path under `/flyers/` and confirm its `alt` text describes the flyer.

Do not guess event dates or speaker names. `content/featured.ts` selects the current featured item from published dated events and live recurring occurrences.

## Update messages

Edit `content/messages.ts`. A message contains a stable ID, title, status, series, optional cover path and `youtubeId`. Use the exact YouTube video ID after verifying the video; do not paste a full watch URL into `youtubeId`. If no verified ID exists, keep it `null` so the card links to the channel fallback.

## Replace or add photographs and brand assets

Put original JPEG or PNG photos in `assets-src/photos/` and the leader portrait in `assets-src/leader/`. Then run `npm run optimize-images` to generate local WebP and AVIF widths under `public/photos/` and `public/leader/`. Keep the content's existing asset base path and responsive widths in sync if a filename changes. The logo source is in `assets-src/brand/`; run `npm run prepare-brand` after replacing it.

For new photos, provide an accurate alt description and confirm the church has permission to publish them. Do not hotlink remote copies.

## Update copy or visual styling

- General page copy: `content/copy.ts`
- Leader facts: `content/leader.ts` (get personal approval for employment details)
- Colors, fonts and shared visual tokens: `styles/tokens.css`
- Page-specific composition: relevant files in `app/` and `components/`

Keep public facts aligned with `OPEN_ITEMS.md`; resolve the item there as part of the same change.

## Verify and publish

```sh
npm run lint
npm run typecheck
npm run test:logic
npm run build
```

Review the generated site locally with `npm run dev` for content or component edits. For production, commit and push the approved changes to the connected Git repository; Vercel rebuilds and publishes the static output. See [DEPLOY.md](DEPLOY.md).
