# Assets and confirmations needed

The supplied source package is already in `assets-src/`, and the site runs without additional files. The following inputs would let the church replace current fallbacks or confirm public details.

## Needed before final public sign-off

- **Venue map pin:** a direct Google Maps pin/share URL for the RCN Prayer Tent at Olaoluwa House, with the address confirmed.
- **Local giving destination:** the approved Ekiti-specific giving URL, if one exists. The current page directs visitors to contact the church and does not redirect to global giving.
- **Telephone confirmation:** confirm that `+234 816 118 6328` is correct for calls as well as WhatsApp.
- **Public affiliation wording:** approve the RCN Global relationship sentence and the spelling/full name for Apostle Arome Osayi.
- **Pastor bio approval:** Dr. Taiwo Omolayo should approve the employer and NHIS position shown in the long biography.

## Optional official links and media details

- Ekiti Instagram account URL (the supplied materials show an icon but no handle).
- Official Waystream and Mixlr channel URLs, if those services are still used.
- Verified YouTube video IDs for the six message cards in `content/messages.ts`.
- Verified YouTube live destination if the existing channel `/live` link does not resolve to the intended stream.

## Event and schedule facts to resolve

- Confirm whether Monthly Encounters continues through Sunday and, if so, its end time.
- Confirm LifeClass schedule before publishing it as a recurring program.
- Confirm the month for the two Divine Service flyers.
- Confirm the date of the EPAC 2024 recap.
- Confirm how Divine Service / schedule flyer dates align with the dated event archive.

The specific content fields and files to edit are listed in [OPEN_ITEMS.md](OPEN_ITEMS.md).

## Files already supplied

The current source package includes the brand logo, leader portrait, church/event photographs, event flyers and a Prayer Tent schedule flyer. No new artwork is required to run or deploy the site. Keep originals in `assets-src/`; generated optimized versions belong in `public/` and can be recreated with the scripts described in [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md).

## Preparing any new image

- Supply an original `.jpg` or `.png`; do not pre-compress it into a tiny thumbnail.
- Name it descriptively and avoid adding duplicate variants with ` (1)` suffixes.
- Include the correct event date/title or photo context, suggested alt text, and confirmation that RCN Ekiti may publish it.
- Add the source to the relevant `assets-src/` folder and update the matching content record before rebuilding.
