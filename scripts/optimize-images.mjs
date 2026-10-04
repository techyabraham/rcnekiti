import { createRequire } from "node:module";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const sourceDir = path.join(root, "assets-src");
const publicDir = path.join(root, "public");
const flyerNames = [
  ["634394323", "2026-02-15-lifeclass-relationship", "LifeClass: Relationship", null],
  ["637708258", "2026-02-20-praying-always-part-3", "Praying Always, Part 3", "20 February 2026"],
  ["639517296", "2026-02-27-engaging-spiritual-gate", "Engaging Spiritual Gate (Gatekeepers Retreat)", "27–28 February 2026"],
  ["646376959", "2026-03-06-the-deep-calleth", "The Deep Calleth", "6 March 2026"],
  ["650369322", "2026-03-13-stand-up-and-look-up", "Stand Up and Look Up", "13 March 2026"],
  ["651759359", "prayer-tent-schedule", "Prayer Tent: schedule flyer", null],
  ["654444494", "2026-03-20-fresh-start", "Fresh Start", "20 March 2026"],
  ["655699414", "2026-03-27-higher-measure", "Higher Measure (March Encounters)", "27–28 March 2026"],
  ["660857711", "2026-04-03-prevailing-power-cross", "The Prevailing Power of the Cross", "3 April 2026"],
  ["678812193", "2026-04-24-laws-of-kingdom-part-2", "The Laws of the Kingdom, Part 2 (April Encounter)", "24–25 April 2026"],
  ["684890130", "2026-05-01-laws-of-kingdom-part-3", "The Laws of the Kingdom, Part 3", "1 May 2026"],
  ["695534063", "2026-05-08-kingdom-growth", "Kingdom Growth", "8 May 2026"],
  ["697793013", "2026-05-15-prophetic-dimensions", "Prophetic Dimensions", "15 May 2026"],
  ["705682084", "2026-05-22-pre-iec-prayer", "Pre-IEC Prayer", "22 May 2026"],
  ["714931489", "2026-06-05-rise-of-saviours", "Rise of Saviours", "5 June 2026"],
  ["720269887", "2026-06-12-reawakening-priests", "Reawakening the Priests", "12 June 2026"],
  ["742586751", "divine-service", "Divine Service", null],
  ["748499608", "divine-service-part-2", "Divine Service, Part 2", null],
  ["764863206", "2026-08-07-city-takers-anointing-part-2", "City Takers Anointing, Part 2", "7 August 2026"],
  ["772560514", "2026-08-14-family-life-prayers", "Family Life Prayers: Beauty for Ashes", "14 August 2026"],
  ["788414341", "2026-08-28-fervent-in-the-spirit", "Fervent in the Spirit (August Encounters)", "28–29 August 2026"],
  ["792109537", "2026-09-04-living-beyond-limit", "Living Beyond Limit", "4 September 2026"],
  ["814085396", "2026-09-18-enlarged-pre-epac", "Enlarged: Pre-EPAC Prayer Meeting", "18 September 2026"],
  ["EPAC2026", "2026-09-30-epac-26-sustaining-spiritual-watch", "EPAC'26: Sustaining Spiritual Watch", "30 September – 3 October 2026"],
];

const candidates = [];
for (const group of ["photos", "leader"]) {
  const dir = path.join(sourceDir, group);
  for (const file of await readdir(dir)) if (/\.(png|jpe?g)$/i.test(file)) candidates.push({ group, file });
}
for (const item of candidates) {
  const input = path.join(sourceDir, item.group, item.file);
  const base = item.file.replace(/\.(png|jpe?g)$/i, "");
  const folder = path.join(publicDir, item.group);
  await mkdir(folder, { recursive: true });
  const meta = await sharp(input).metadata();
  for (const width of [480, 768, 1280, 1920]) {
    if (!meta.width || width > meta.width * 1.15) continue;
    const resized = sharp(input).resize({ width });
    await Promise.all([
      resized.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(folder, `${base}-${width}.webp`)),
      resized.clone().avif({ quality: 48, effort: 5 }).toFile(path.join(folder, `${base}-${width}.avif`)),
    ]);
  }
}

const flyerDir = path.join(sourceDir, "flyers");
const files = (await readdir(flyerDir)).filter((name) => /\.jpg$/i.test(name) && !/ \(1\)\.jpg$/i.test(name));
const manifest = [];
for (const [prefix, slug, title, date] of flyerNames) {
  const file = files.find((name) => name.startsWith(prefix));
  if (!file) throw new Error(`Missing flyer matching ${prefix}`);
  const input = path.join(flyerDir, file);
  const output = path.join(publicDir, "flyers");
  await mkdir(output, { recursive: true });
  const base = `${slug}.webp`;
  await sharp(input).resize({ width: 1024, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(path.join(output, base));
  const thumbBase = slug + "-thumb.webp";
  let quality = 48;
  let thumb = await sharp(input).resize({ width: 480, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  while (thumb.length > 40 * 1024 && quality > 28) {
    quality -= 4;
    thumb = await sharp(input).resize({ width: 480, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  }
  if (thumb.length > 40 * 1024) throw new Error("Poster thumbnail exceeded 40KB: " + slug);
 await writeFile(path.join(output, thumbBase), thumb);
  manifest.push({ source: file, output: `/flyers/${base}`, thumbnail: `/flyers/${thumbBase}`, thumbnailBytes: thumb.length, title, date, alt: `Flyer: ${title}${date ? `, ${date}` : ""}`, status: "published" });
}
await writeFile(path.join(publicDir, "flyers.manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Optimized ${candidates.length} photos and ${manifest.length} flyers.`);
