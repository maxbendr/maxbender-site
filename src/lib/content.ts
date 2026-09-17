import backgroundData from "../../content/background.json";
import likesData from "../../content/likes.json";
import siteData from "../../content/site.json";
import travelData from "../../content/travel.json";
import writingData from "../../content/writing.json";

export interface SiteContent {
  name: string;
  siteUrl: string;
  positioning: string;
  subline: string;
  description: string;
  email: string;
  cvUrl: string;
  headshot: string;
  ogImage: string;
  links: { linkedin: string; spotify: string; github: string };
  contact: { note: string; formEndpoint: string };
  analytics: { provider: "none" | "plausible" | "vercel"; plausibleDomain: string };
}

export interface WritingContent {
  intro: string;
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
  note: string;
  url: string;
}

export interface TravelContent {
  intro: string;
  places: Place[];
}

export interface LikesContent {
  intro: string;
  items: { title: string; body: string }[];
  spotify: {
    playlistEmbedUrl: string;
    playlistTitle: string;
    nowPlayingNote: string;
  };
}

export const site = siteData as SiteContent;
export const writing = writingData as WritingContent;
export const background = backgroundData as BackgroundContent;
export const travel = travelData as TravelContent;
export const likes = likesData as LikesContent;

/** Splits an email so it is never present as a single string in the markup. */
export function obfuscateEmail(email: string): { user: string; domain: string } {
  const [user = "", domain = ""] = email.split("@");
  return { user, domain };
}

export const sections = [
  { id: "work", label: "What I do" },
  { id: "building", label: "Building" },
  { id: "writing", label: "Writing" },
  { id: "travel", label: "Travel" },
  { id: "background", label: "Background" },
  { id: "likes", label: "What I like" },
  { id: "contact", label: "Contact" },
] as const;
