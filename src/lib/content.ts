import { getCollection } from "astro:content";

import backgroundData from "../../content/background.json";
import orbitData from "../../content/orbit.json";
import siteData from "../../content/site.json";
import toolsData from "../../content/tools.json";
import travelData from "../../content/travel.json";
import writingData from "../../content/writing.json";

export type HeroSegment = { text: string; break?: boolean } | { image: string; alt: string };

export interface SiteContent {
  name: string;
  siteUrl: string;
  positioning: string;
  hero: HeroSegment[];
  headshotCutout: string;
  subline: string;
  description: string;
  email: string;
  headshot: string;
  headshotAlt: string;
  ogImage: string;
  links: { linkedin: string; github: string; substack: string };
  contact: { note: string; formEndpoint: string };
  analytics: { provider: "none" | "plausible" | "vercel"; plausibleDomain: string };
}

export interface WritingContent {
  intro: string;
  substackNote: string;
  posts: { title: string; summary: string; url: string; date: string }[];
}

export interface BackgroundContent {
  intro: string;
  timeline: {
    period: string;
    title: string;
    location: string;
    note: string;
  }[];
}

export interface Place {
  city: string;
  country: string;
  lat: number;
  lng: number;
  kind: string;
  note: string;
  items: string[];
  image: string;
  url: string;
}

export interface TravelContent {
  label: string;
  title: string;
  intro: string;
  places: Place[];
}

export type PlayerFont =
  "fraunces" | "instrument" | "unbounded" | "bricolage" | "dmserif" | "syne" | "spacegrotesk";

export interface Player {
  id: string;
  label: string;
  font: PlayerFont;
  lead: string;
  items: string[];
}

export interface OrbitContent {
  label: string;
  title: string;
  hint: string;
  players: Player[];
}

export interface ToolsContent {
  label: string;
  title: string;
  tools: { name: string; logo: string }[];
}

export const site = siteData as SiteContent;
export const writing = writingData as WritingContent;
export const background = backgroundData as BackgroundContent;
export const travel = travelData as TravelContent;
export const orbit = orbitData as OrbitContent;
export const tools = toolsData as ToolsContent;

/** Newest first, drafts dropped from the production build. */
export async function getPosts() {
  const entries = await getCollection(
    "posts",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Posts with an `external` URL live on Substack, the rest get a page here. */
export function postHref(post: { id: string; data: { external: string } }): string {
  return post.data.external || `/writing/${post.id}/`;
}

const postDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatPostDate(date: Date): string {
  return postDateFormat.format(date);
}

/** Rough minutes at 225 words per minute, which is close enough for a label. */
export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 225))} min read`;
}

/** Splits an email so it is never present as a single string in the markup. */
export function obfuscateEmail(email: string): { user: string; domain: string } {
  const [user = "", domain = ""] = email.split("@");
  return { user, domain };
}

export const sections = [
  { id: "work", label: "Work" },
  { id: "orbit", label: "Ecosystem" },
  { id: "tools", label: "Tools" },
  { id: "travel", label: "Travel" },
  { id: "background", label: "About" },
] as const;
