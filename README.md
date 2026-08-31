# 3D Interactive Virtual Tours

Marketing site and portfolio for 3D Interactive Virtual Tours. Next.js App Router,
TypeScript, Tailwind CSS v4, Motion.

```bash
npm install
npm run dev
```

## Structure

```
app/
  layout.tsx              root metadata, fonts, header and footer
  page.tsx                home
  services/page.tsx
  about/page.tsx
  portfolio/page.tsx
  contact/page.tsx
  api/contact/route.ts    form endpoint (delivery not wired, see below)
  opengraph-image.tsx     share card
  sitemap.ts  robots.ts  not-found.tsx
components/               Header, Footer, Hero, PageHero, Intro, Services,
                          Technology, FeaturedProperty, Portfolio,
                          PortfolioSection, WhyUs, CTA, ContactForm,
                          SectionLabel, ActionLink, Reveal
lib/content.ts            all copy, contact details and image references
```

## Editing content

Everything a non-developer would want to change lives in `lib/content.ts`:
business details, navigation, CTA labels, services, portfolio projects, value
props and the approach steps. Components read from it, so copy changes do not
touch layout code.

## Media

All photography and the hero film live in `public/Images` and are referenced from
`lib/content.ts` through the `photo()` helper. Nothing is loaded from a remote
host.

| File | Placement |
| --- | --- |
| `hvideo.mp4` | Home hero background (1920x1080, 11.6s, silent, desktop only) |
| `h3.jpg` | Hero poster and mobile hero still, plus Fairview Farmhouse |
| `h16.jpg` | Home introduction frame |
| `h11.jpg` | Service 01, virtual tours |
| `h7.jpg` | Service 02, photography |
| `h2.jpg` | Service 03, property marketing |
| `h5.jpg` | Service 04, immersive experiences, and portfolio page hero |
| `h13.jpg` | Technology band |
| `h10.jpg` | Featured property |
| `h17.jpg` | Pinecrest Retreat |
| `h1.jpg` | Cantilever House |
| `h6.jpg` | Willow Porch Cottage |
| `h9.jpg` | Ridgeline House and About page band |
| `h8.jpg` | The Magnolia, the one interior in the set |
| `h18.jpg` | Terrace House |
| `h4.jpg` | Belvedere Villa |
| `h15.jpg` | Services page hero |
| `h14.jpg` | About page hero |
| `h12.jpg` | Unused. At 225x225 it is too small for any frame on the site. |

### Media notes

**1. Still resolution.** The video is full HD, but the stills top out at 734x418
and several are near 250px. Next.js will not upscale, so full-bleed desktop
bands are filled with an image roughly a third of the width they need and look
soft on a large screen. The layouts are built for 2400px originals. Re-export
the same photographs at 2400px on the long edge, keep the filenames, and the
site sharpens with no code change.

**2. Video faststart is done.** The hero film had its `moov` atom at the end of
the file, so a browser had to buffer most of 15MB before showing a frame. It has
been remuxed in place: `moov` now sits at byte 40, so a player has the index
after ~4.5KB. The byte count is unchanged and nothing was re-encoded.

- `hvideo.mp4` is the faststart version, in use by the site.
- `hvideo-original.mp4` is your untouched original, kept as a backup.
- `scripts/faststart.py` does the remux with no ffmpeg dependency. If you ever
  replace the film, run it again:

```bash
python scripts/faststart.py public/Images/hvideo.mp4 public/Images/hvideo-fast.mp4
```

**Still 15MB, though.** Faststart fixes when playback starts, not how much data
the visitor pulls, and the film now autoplays on phones too. Cutting it to 6 to
8 seconds at around 3Mbps would land under 4MB. That needs a real encoder:

```bash
ffmpeg -i public/Images/hvideo-original.mp4 -t 8 -b:v 3M -an -movflags +faststart public/Images/hvideo.mp4
```

ffmpeg is not installed on this machine. `winget install Gyan.FFmpeg` adds it.

## One thing to do before launch

**Wire up form delivery.** `app/api/contact/route.ts` validates submissions and
returns 200, but nothing is sent yet. Add one of: Resend, SMTP via nodemailer,
or a CRM/Zapier webhook. The TODO in that file lists the env vars. Until it is
wired, form submissions are lost.

## Design system

Tokens live in `app/globals.css` under `@theme`. One locked dark theme.

- Ground `#07111f`, surface `#0d1b2a`
- Gold `#c9a45c` and `#e2c98a`, used only for accents, active states, hairlines and the primary CTA
- Ivory `#f4f0e8` for type, muted blue-grays for supporting copy
- Geist via `next/font`, uppercase display headings, uppercase labels at 0.12em
- Radius rule: 12px on image containers, full pill on interactive controls, no radius on inputs (hairline underline only)
- Every text pair passes WCAG AA (lowest measured 4.6:1, primary CTA 8.1:1)
- All motion respects `prefers-reduced-motion`
