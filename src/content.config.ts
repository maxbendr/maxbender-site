import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/work" }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/projects" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.string().default("building"),
    stack: z.array(z.string()).default([]),
    link: z.string().default(""),
    screenshot: z.string().optional(),
    order: z.number().default(99),
  }),
});

const buildlog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/buildlog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "now.md", base: "./content" }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    location: z.string().optional(),
  }),
});

export const collections = { work, projects, buildlog, pages };
