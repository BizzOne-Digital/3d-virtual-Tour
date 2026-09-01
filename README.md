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
components/               Header, Footer, Hero, PageHero, Intro,
                          ServiceCategories, SeeItInAction, ServiceBlock,
                          ServiceIndex, ServiceExample, BeforeAfter, Pricing,
                          Technology, FilmBand, FeaturedProperty, Portfolio,
                          CoverageGallery, WhyUs, Credentials, CTA,
                          ContactForm, SectionLabel, ActionLink, Reveal
lib/content.ts            business details, copy, imagery, portfolio
lib/services.ts           the service catalogue and published pricing
```

## Editing content

Everything a non-developer would want to change lives in two files. Components
read from them, so copy and imagery changes never touch layout code.

**`lib/services.ts`** is the service catalogue, and it is where most edits will
happen. Each service is one object answering three questions in a fixed order:
what it is (`summary`), why it matters (`value`), and what it looks like
(`example`). Categories group them; the services page and the homepage overview
both render straight off this array, as does the jump nav and every count shown
on the site. To add a service, add an object. To reorder, move it. To
re-illustrate it, change one `img(...)` line.

The `example` field is a tagged union, so a service can prove itself in
whichever way suits it without any layout work:

| `kind` | Renders as |
| --- | --- |
| `gallery` | Contact-sheet grid, lead frame full width |
| `before-after` | Draggable comparison slider |
| `image` | One frame, contained, with an optional caption |
| `tour` | A live interactive tour, running in the page |
| `film` | A YouTube facade that plays in place |
| `checklist` | The deliverable set as type, for process work |
| `experience` | A card opening a live tour on its host platform, in a new tab |

The two live tours (`experiences` in `lib/content.ts`) are the Matterport 3D
walkthrough and the 360 aerial tour of 470 S Ramona Ave, Lake Alfred. They open
in a new tab rather than in an iframe: both hosts put the viewer through their
own loader and neither is served for embedding at the URL the studio hands out,
so an inline frame risks rendering a challenge page. They appear on the home
page, the services page (on `matterport` and `aerial-360`) and the portfolio.

`pricing` at the bottom of the same file holds the published rates. Every figure
appears exactly once.

**`lib/content.ts`** holds the business details, navigation, CTA labels, hero,
the live tours and films, the homepage proof strip, the portfolio, the
room-by-room coverage index and the page heroes.

### The imagery rule

Every photograph on this site is the studio's own work on a real Florida
property. That is a constraint worth keeping. The site this replaced was built
on stock: its hero poster was a German baroque palace captioned as a Winter
Haven farmhouse, the real-estate-photography example was the Jaipur City Palace,
and a Lakeland "residential interior" was the Royal Opera House in Muscat. The
client's note that started this rebuild read "a lot of photos / Mansions not a
Florida home. Where are all my services and examples of them?" and it was
correct on both counts.

Before adding an image, the test is: does this show what the studio does for a
client? If not, it does not belong here, however good it looks.

## Media

All photography lives in `public/Images`. The studio's delivered shoot sits in
seven folders there, and **`lib/photos.ts` is the single mapping from those
folders to the services they illustrate** — read the header comment in that file
first, it documents what each folder is and which pairs go together. Everything
else (`lib/content.ts`, `lib/services.ts`) imports from it rather than naming
paths, so re-illustrating a service is a one-line edit.

| Folder | Contents | Renders as |
| --- | --- | --- |
| `HDR/` | 38 bracketed interiors | Real Estate Photography, HDR Photography, coverage index |
| `Exterior/` | 43 exteriors | Real Estate Photography, coverage index, page heroes |
| `Aerial/` | 6 drone frames | Aerial and Drone Photography |
| `Aerial Cleanup/` | the same 6, retouched | De-cluttering sliders (the "after") |
| `Exterior Cleanup/` | 7 exteriors, retouched | De-cluttering sliders (the "after") |
| `Twilight/` | `Aerial (3)` taken to dusk | Virtual Twilight slider (the "after") |
| `Aerial Borderline/` | `Aerial (1)` with lot lines | Aerial gallery, homepage proof strip |

Paths in `lib/photos.ts` are left **unencoded**: the folders contain spaces and
the filenames contain parentheses, and `next/image` encodes `src` itself when it
builds the optimiser URL. Pre-encoding sends `%2520` to the server and 404s.

The loose files at the root of `public/Images` are the studio's own service
graphics and poster stills. Nothing is loaded from a remote host. Filenames
carry their role, so a placement is findable by grep:

| Prefix | Contents |
| --- | --- |
| `ext-*` | Exteriors: elevations, pool, lanai, patio, garage |
| `int-*` | Interiors, by room: kitchen, living, dining, bed, bath |
| `ex-*` | Service examples: the frame that proves one service |
| `film-*` | Poster stills for the YouTube listing films |
| `tour-*` | Poster stills for the live interactive tours |
| `badge-*` | Zillow Certified and Google Trusted marks |

### Media notes

**1. Source resolution.** The studio's frames are web-resolution listing
photography: most are 1296x864, the largest exterior is 1296 wide. The layouts
are built around that on purpose. Nothing is full-bleed at desktop, because
stretching a 1296px frame across a 2560px viewport makes good photography look
soft. If higher-resolution originals turn up, keep the filenames and drop them
in; the layouts will take the extra detail without a code change.

**2. The hero film.** `hero.mp4` plays full-bleed behind the hero type, muted
and looping, with `hero-poster.jpg` (a frame from the film itself) painting
first. It runs 11.6s, past the WCAG 2.2.2 five-second threshold for
auto-playing motion, so it carries a real pause control rather than an optional
one, and it does not autoplay at all under `prefers-reduced-motion`.

Two things to know about the file:

- **It is watermarked licensed stock, and its subject is a Norwegian barn.** The
  supplier watermark sits across the centre of frame, and the clip is a red
  timber barn on a mountain slope, not a Florida property. Every other image on
  this site is the studio's own work. Replacing this one is a one-line change to
  `hero.video` in `lib/content.ts` plus a new poster frame:

  ```bash
  ffmpeg -ss 0.4 -i public/Images/hero.mp4 -frames:v 1 -vf scale=1920:-2 -q:v 6 public/Images/hero-poster.jpg
  ```

- **It is 15MB.** The `moov` atom has been moved to the front of the file
  (`-movflags +faststart`), so playback starts after roughly 4.5KB instead of
  buffering most of the file, and the server answers with range requests. That
  fixes *when* playback starts, not how much data a visitor pulls. Cutting it to
  eight seconds at 3Mbps lands it under 4MB with no visible loss at this scale:

  ```bash
  ffmpeg -i public/Images/hero.mp4 -t 8 -b:v 3M -an -movflags +faststart public/Images/hero-small.mp4
  ```

**3. The before/after pairs are genuine.** Every slider on the site puts two
files of the *same frame at the same crop* against each other: the staging
sample, the correction pair, the twilight conversion
(`Aerial/Aerial (3).jpg` -> `Twilight/Aerial (3).jpg`) and the nine clean-up
pairs, which match their originals by filename across `Exterior` /
`Exterior Cleanup` and `Aerial` / `Aerial Cleanup`.

Four delivered clean-up files are **pixel-identical to their originals** and are
deliberately not shown as comparisons, because a slider that reveals nothing is
worse than no slider: `Exterior Cleanup/Exterior (44).jpg`,
`Exterior Cleanup/Exterior (46).jpg`, `Aerial Cleanup/Aerial (5).jpg` and
`Aerial Cleanup/Aerial (6).jpg`. Their originals still render in full in the
coverage index. If corrected versions of those four arrive, drop them in under
the same names and add them to `cleanupPairs` in `lib/photos.ts`.

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
- Every text pair passes WCAG AA. 132 distinct text and background combinations
  were measured across all five pages with zero failures. The lowest body-text
  ratio is 5.3:1; the one 4.4:1 pair is a 30px display numeral, where the
  requirement is 3:1. The primary CTA is 8.1:1
- Scroll reveals are CSS, driven by `animation-timeline: view()`. Content is
  visible by default and the reveal is an enhancement, so nothing on the page
  depends on JavaScript to be readable
- All motion respects `prefers-reduced-motion`
