import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const source = path.join(root, "assets-src/brand/RCNEkitiLogo.png");
const output = path.join(root, "public/brand");
await mkdir(output, { recursive: true });

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const distance = Math.hypot(r, g - 10, b - 50);
  if (distance <= 40) {
    data[i] = 244;
    data[i + 1] = 238;
    data[i + 2] = 230;
  }
}
const light = sharp(source).trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 });
await Promise.all([
  sharp(data, { raw: info }).png().toFile(path.join(output, "logo-dark-bg.png")),
  sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(output, "logo-dark-bg.webp")),
  light.png().toFile(path.join(output, "logo-light-bg.png")),
]);

const mark = await sharp(source).extract({ left: 60, top: 80, width: 250, height: 615 }).png().toBuffer();
const padded = await sharp(mark).resize(192, 192, { fit: "contain", background: { r: 0, g: 10, b: 50, alpha: 0 } }).png().toBuffer();
await Promise.all([
  sharp(padded).png().toFile(path.join(root, "public/icon.png")),
  sharp(padded).png().toFile(path.join(root, "public/favicon.png")),
  sharp(padded).resize(192, 192).png().toFile(path.join(root, "public/icon-192.png")),
  sharp(padded).resize(512, 512).png().toFile(path.join(root, "public/icon-512.png")),
  sharp(padded).resize(180, 180).png().toFile(path.join(root, "public/apple-touch-icon.png")),
]);
const previewLogo = await sharp(path.join(output, "logo-dark-bg.png")).resize({ width: 1020 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 700, channels: 3, background: "#00061f" } })
  .composite([{ input: previewLogo, left: 90, top: 35 }])
  .png()
  .toFile(path.join(output, "logo-dark-bg-preview.png"));
console.log("Prepared RCN Ekiti logo variants and app icons.");
