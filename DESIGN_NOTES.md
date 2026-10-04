# Design notes

## Direction

The site uses the provided RCN Ekiti identity: a deep navy field, bone-colored reading surfaces, flame red accents, strong display lettering and editorial serif emphasis. It aims to feel like a living prayer gathering with clear practical information, rather than a generic institutional template. The supplied photography, logos and event flyers remain the visual source of truth; decorative effects stay secondary to them.

## Shared interface

- **Header:** the wordmark and simple page navigation make the church identifiable immediately. Compact widths use an accessible menu with keyboard focus containment, Escape close and focus return.
- **Buttons and labels:** a small set of shared button, badge and placeholder styles keeps links distinguishable across the dark and light sections.
- **Footer:** repeats the main contact and destination links so visitors can act from the end of every page.
- **Typography and color:** Bricolage Grotesque carries headings and body text; Instrument Serif adds a softer editorial note; DM Mono is used for compact labels. Contrast choices and exact values are recorded in `DECISIONS.md` and `styles/tokens.css`.

## Home page

- **Hero:** an atmospheric, locally hosted image and large type establish a sense of place. The text and key actions remain readable without motion or image loading.
- **Marquees and motion:** repeated identity details provide rhythm between sections. Motion is conditional on the visitor's reduced-motion preference and device/data conditions.
- **This Week:** compact cards expose practical recurring program information quickly, with WAT times and upcoming occurrences.
- **Featured gathering:** an event or currently live session gets more space, supported by a flyer or recap photo; the selection rules live in `content/featured.ts`.
- **Five Answers:** a structured editorial section explains what to expect and helps visitors decide whether to attend.
- **About preview and pastor:** short church context and a supplied portrait make the leadership visible without overwhelming the event information.
- **Pillars and poster wall:** concise ministry themes and a flyer archive give the page its community-specific character.
- **Messages and join prompt:** video cards and a clear WhatsApp invitation lead from browsing to participation.

## Inner pages

- **About:** combines the church's identity, relationship and pastor biography with a direct path to visit.
- **Gatherings:** separates recurring schedule from dated flyers so visitors can distinguish weekly rhythms from one-off events.
- **Messages:** presents the supplied message titles as cards. Until video IDs are confirmed, cards use the YouTube channel fallback.
- **Watch Live:** gives direct streaming destinations without embedding an autoplay player.
- **Visit:** prioritizes the full address, arrival directions, map search fallback and contact action.
- **Give:** provides a safe local contact path while an Ekiti giving URL is unconfirmed.
- **Not found:** reuses the identity and gives visitors a direct route back to the home page.

## Motion, responsive behavior and accessibility

The underlying content stays visible if scripts or motion do not run. Reduced-motion settings suppress nonessential animation. Narrow layouts stack content and keep controls usable; color and keyboard decisions are detailed in `DECISIONS.md`. The codebase has not yet recorded formal Lighthouse or axe scores; these remain release checks in `OPEN_ITEMS.md`.
