/**
 * Renders public/og.png from content/site.json.
 * Run it again after changing the name or the positioning line: npm run og
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const site = JSON.parse(readFileSync(new URL("content/site.json", root), "utf8"));

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Naive wrap that is good enough for a two line headline. */
function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ` ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

const headline = wrap(site.positioning, 22).slice(0, 4);

const photo = await sharp(fileURLToPath(new URL("public/images/places/lisbon.jpg", root)))
  .resize(460, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82 })
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f3f3f1"/>
  <circle cx="620" cy="560" r="260" fill="#2b4bff" opacity="0.08"/>
  <text x="80" y="140" fill="#2b4bff" font-family="monospace" font-size="26" letter-spacing="6">${escape(
    site.name.toUpperCase(),
  )}</text>
  ${headline
    .map(
      (line, index) =>
        `<text x="80" y="${250 + index * 72}" fill="#141413" font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="600">${escape(
          line,
        )}</text>`,
    )
    .join("\n  ")}
  ${wrap(site.subline, 42)
    .slice(0, 2)
    .map(
      (line, index) =>
        `<text x="80" y="${540 + index * 32}" fill="#6b6b66" font-family="Helvetica, Arial, sans-serif" font-size="24">${escape(line)}</text>`,
    )
    .join("\n  ")}
</svg>`;

const out = fileURLToPath(new URL("public/og.png", root));
await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 740, top: 0 }])
  .png()
  .toFile(out);
writeFileSync(fileURLToPath(new URL("public/og.svg", root)), svg);
console.log(`Wrote ${out}`);
