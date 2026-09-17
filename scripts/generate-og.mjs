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

const headline = wrap(site.positioning, 34).slice(0, 3);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0d0c0b"/>
  <circle cx="1080" cy="120" r="220" fill="#ff6a3d" opacity="0.14"/>
  <text x="80" y="140" fill="#ff6a3d" font-family="monospace" font-size="26" letter-spacing="6">${escape(
    site.name.toUpperCase(),
  )}</text>
  ${headline
    .map(
      (line, index) =>
        `<text x="80" y="${280 + index * 78}" fill="#f4f2ef" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="600">${escape(
          line,
        )}</text>`,
    )
    .join("\n  ")}
  <text x="80" y="550" fill="#a49e96" font-family="Helvetica, Arial, sans-serif" font-size="30">${escape(
    site.subline,
  )}</text>
</svg>`;

const out = fileURLToPath(new URL("public/og.png", root));
await sharp(Buffer.from(svg)).png().toFile(out);
writeFileSync(fileURLToPath(new URL("public/og.svg", root)), svg);
console.log(`Wrote ${out}`);
