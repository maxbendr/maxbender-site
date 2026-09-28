import type { APIRoute } from "astro";

import { getPosts, postHref, site } from "../lib/content";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const GET: APIRoute = async ({ site: astroSite }) => {
  const origin = (astroSite ?? new URL(site.siteUrl)).href.replace(/\/$/, "");
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const href = postHref(post);
      const url = href.startsWith("http") ? href : `${origin}${href}`;
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.subtitle || post.data.title)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} - Writing</title>
    <link>${origin}/writing/</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
