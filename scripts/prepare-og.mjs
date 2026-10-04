import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const flyer = path.join(root, "public/flyers/2026-09-30-epac-26-sustaining-spiritual-watch.webp");
const logo = path.join(root, "public/brand/logo-dark-bg.png");
const output = path.join(root, "public/og.png");
const canvas = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00061F"/><stop offset="1" stop-color="#101A5A"/></linearGradient>
  <linearGradient id="ember" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#D8120C"/><stop offset=".62" stop-color="#EE5A03"/><stop offset="1" stop-color="#F4B63F"/></linearGradient>
  <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#00061F" stop-opacity=".05"/><stop offset="1" stop-color="#00061F" stop-opacity=".5"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<circle cx="375" cy="160" r="410" fill="#D8120C" opacity=".075"/>
<path d="M70 535H720" stroke="url(#ember)" stroke-width="2"/>
<text x="74" y="265" fill="#F4EEE6" font-family="Arial,sans-serif" font-size="80" font-weight="700" letter-spacing="-5">Closer than</text>
<text x="74" y="354" fill="#F4B63F" font-family="Georgia,serif" font-size="86" font-style="italic" letter-spacing="-3">you think.</text>
<text x="78" y="414" fill="#A9AEC9" font-family="Arial,sans-serif" font-size="22" letter-spacing="2">REMNANT CHRISTIAN NETWORK · EKITI</text>
<text x="78" y="464" fill="#F4EEE6" font-family="Arial,sans-serif" font-size="19">Prayer · The Word · Fellowship</text>
<rect x="785" y="0" width="415" height="630" fill="url(#shade)"/>
<rect x="784" y="57" width="350" height="510" rx="14" fill="none" stroke="#F4B63F" stroke-opacity=".45"/>
</svg>`);

const [background, poster, wordmark] = await Promise.all([
  sharp(canvas).png().toBuffer(),
  sharp(flyer).resize(350, 510, { fit: "cover", position: "attention" }).png().toBuffer(),
  sharp(logo).resize({ width: 315 }).png().toBuffer(),
]);

await sharp(background)
  .composite([
    { input: poster, left: 784, top: 57 },
    { input: wordmark, left: 76, top: 56 },
  ])
  .png()
  .toFile(output);
console.log(`Wrote ${path.relative(root, output)} (1200×630)`);
