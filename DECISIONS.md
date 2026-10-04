# Decisions

- **Static export:** Next.js App Router with `output: "export"` and trailing slashes, matching the Vercel static-only requirement.
- **Versions:** Next.js 16.1.7 (latest stable shown on npm at scaffold time; 16.2 was still canary), Tailwind CSS 4.3.3, Motion 13.4.6, GSAP 3.15.0, Lenis 1.3.26, Lucide React 1.51.0 and Sharp 0.35.4. Motion, GSAP and Lenis will be loaded only for the interactions that need them.
- **Tailwind v4 integration:** use the official `@tailwindcss/postcss` plugin and keep brand values in `styles/tokens.css`.
- **Asset pipeline:** source assets remain in `assets-src`; scripts generate optimized local files under `public`. Never hotlink source sites.
- **Flyer archive:** descriptive slugs preserve recognizable dates; `public/flyers.manifest.json` maps original filenames to processed paths and includes status and alt text.
- **Contrast:** bone `#F4EEE6` and muted `#A9AEC9` are the small-text foregrounds on navy. Flame red is reserved for large type, icons and borders; orange is used for text only at large/bold sizes. A light theme is deferred to protect the schedule.
- **Time handling:** recurring schedule is represented with WAT times and timezone-free recurrence rules; Africa/Lagos is UTC+1 year-round, so no DST conversion is needed.
- **Placeholders:** null map, giving, Waystream and Mixlr values remain explicit in `content/site.ts`; UI components can render designed fallbacks without inventing links.
- **Additional packages:** Sharp is needed to meet the requested local AVIF/WebP pipeline. No other dependencies were added beyond the fixed stack.
