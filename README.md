# maxbender.com

Personal site for Max Bender. Astro + TypeScript + Tailwind, statically
generated, deployed on Vercel. All text lives in `/content` so it can be edited
without touching code.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
npm run check    # type and template check
npm run format   # prettier
npm run og       # regenerate public/og.png from content/site.json
```

Node 22.12 or newer.

## Editing content

Everything below is plain markdown or JSON. Change a file, commit, and Vercel
rebuilds. Anything marked `[PLACEHOLDER]` still needs real content.

| File                      | What it controls                                                                                                                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content/site.json`       | Name, positioning line, subline, email, social links (LinkedIn, Substack), contact form endpoint, analytics, `greetings` for the intro screen (one word per language, empty list turns it off) |
| `content/work/*.md`       | The "What I do" cards. One file per card, `order` sets the position                                                                                                                            |
| `content/projects/*.md`   | The "Building" cards. Name, tagline, stack, link, screenshot path                                                                                                                              |
| `content/posts/*.md`      | Articles. One file per article, filename is the URL slug                                                                                                                                       |
| `content/writing.json`    | Writing intro plus optional LinkedIn posts: title, one line summary, url, date                                                                                                                 |
| `content/travel.json`     | Map pins: city, country, lat, lng, note, optional url                                                                                                                                          |
| `content/background.json` | The timeline on the Background section                                                                                                                                                         |
| `content/mentoring.json`  | The Mentoring section: copy, photo path and the three cards                                                                                                                                    |
| `content/now.md`          | The `/now` page                                                                                                                                                                                |

Adding a card or a log entry means adding a file. Removing one means deleting
the file. No code changes needed.

### Writing an article

Create a Markdown file in `content/posts/`. The filename becomes the URL, so
`content/posts/why-pilots-stall.md` is published at `/writing/why-pilots-stall/`.

```md
---
title: Why corporate pilots stall in month four
subtitle: One line under the headline. Optional.
date: 2026-03-14
cover: /images/pilots.jpg # optional
coverAlt: Description of the cover image # optional
tags: # optional
  - open innovation
draft: false # true keeps it out of the production build
external: "" # a Substack URL lists the post here and sends readers there
---

Your article in plain Markdown. Headings, lists, quotes, links and images all
have styles already.
```

The article shows up at `/writing/`, the newest three appear in the Writing
section on the home page, every article is in the command palette, and
`/rss.xml` updates itself. Reading time is calculated from the word count.

### Using Substack instead

Two ways, they work together:

1. Put your Substack URL in `links.substack` in `content/site.json`. A
   "Subscribe on Substack" button appears in the Writing section, on `/writing/`,
   in the footer and in the command palette.
2. For each Substack article, add a short Markdown file in `content/posts/`
   with `title`, `date`, `subtitle` and `external: https://yourname.substack.com/p/slug`.
   It is listed with everything else but the link goes to Substack, so the site
   stays the index of your writing wherever it is hosted.

### Images and files

Drop files in `public/`:

- `public/images/max-portrait.jpg` for the hero portrait (`headshot` in `content/site.json`)
- `public/images/speaking.jpg` for the photo under "What I do"
- `public/images/mentoring.jpg` for the Mentoring photo (`image` in `content/mentoring.json`)
- `public/images/projects/<project>.png` for project screenshots, matching the
  `screenshot` path in the project's markdown file. If the file is missing, the
  card shows a placeholder tile instead of a broken image
- `public/og.png` is generated by `npm run og`

### Contact form

Set `contact.formEndpoint` in `content/site.json` to a Formspree endpoint
(`https://formspree.io/f/xxxxxxx`). Until then the form stays inert and tells
visitors to email instead. The email address is split in the markup and
reassembled in the browser, so scrapers do not get a plain address.

### Analytics

`analytics.provider` in `content/site.json`:

- `"none"` (default) loads nothing
- `"plausible"` loads the Plausible script, set `plausibleDomain` too
- `"vercel"` loads Vercel Web Analytics, enable it in the Vercel dashboard first

Both options are cookie free, so no cookie banner is needed.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New Project", import the repo. The framework is detected as
   Astro, build command `npm run build`, output `dist`.
3. Deploy. Every push to `main` ships to production, every branch gets a preview
   URL.
4. Add the custom domain under Project Settings, Domains, then point the DNS
   records Vercel shows you at it.
5. Update `siteUrl` in `content/site.json` so canonical URLs, the sitemap and
   Open Graph tags use the real domain.

## Structure

```
content/            all editable text
public/             images, favicon, og image
src/components/     one component per section
src/layouts/        page shell, head tags, theme script
src/pages/          index, now, 404
src/styles/         Tailwind theme and shared classes
scripts/            og image generator
```

## Notes

- Dark and light mode follow the system by default, the toggle overrides and
  stores the choice in `localStorage`.
- Ctrl+K (or Cmd+K) opens a command palette that jumps between sections.
- The travel map is rendered to static SVG at build time, so there is no map
  library and no tile requests at runtime.
