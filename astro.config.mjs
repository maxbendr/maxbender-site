// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import site from "./content/site.json" with { type: "json" };

// https://astro.build/config
export default defineConfig({
  site: site.siteUrl,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
