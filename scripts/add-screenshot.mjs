#!/usr/bin/env node
/**
 * Convert a real project screenshot to WebP under ~300 KB in /public/work/<slug>/.
 *
 *   node scripts/add-screenshot.mjs <slug> <input-image> [name]
 *   e.g. node scripts/add-screenshot.mjs permis-connect ~/Desktop/permis.png home
 *
 * Prints the `screenshot` object to paste into src/data/projects.ts.
 * Uses `sharp`, which Next.js already installs for image optimisation.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const MAX_BYTES = 300 * 1024;
const MAX_WIDTH = 1600;

const [slug, input, name = "home"] = process.argv.slice(2);
if (!slug || !input || !/^[a-z0-9-]+$/.test(slug) || !/^[a-z0-9-]+$/.test(name)) {
  console.error("Usage: node scripts/add-screenshot.mjs <slug> <input-image> [name]");
  process.exit(1);
}

const outDir = path.join("public", "work", slug);
const outFile = path.join(outDir, `${name}.webp`);
await mkdir(outDir, { recursive: true });

let width = MAX_WIDTH;
let quality = 82;
let info;
for (let attempt = 0; attempt < 12; attempt++) {
  info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outFile);
  if ((await stat(outFile)).size <= MAX_BYTES) break;
  if (quality > 60) quality -= 6;
  else width = Math.round(width * 0.85);
}

const size = (await stat(outFile)).size;
console.log(`Wrote ${outFile} (${info.width}x${info.height}, ${Math.round(size / 1024)} KB)`);
if (size > MAX_BYTES) console.warn("Warning: still over 300 KB.");
console.log(`
screenshot: {
  src: "/work/${slug}/${name}.webp",
  width: ${info.width},
  height: ${info.height},
  alt: "TODO: describe the screen, e.g. \\"Permis Connect marketplace home page\\"",
},`);
