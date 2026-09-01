/**
 * Single source of truth for site copy and imagery.
 * Edit here to change the site; components stay untouched.
 *
 * The service catalogue lives in `lib/services.ts`, because it is the largest
 * and most frequently edited body of content on the site and deserves its own
 * file.
 *
 * Every photograph referenced here is the studio's own work on a real Florida
 * property. That is a rule, not a coincidence: an image that does not show
 * what this studio does for a client does not belong on this site.
 */

import {
  aerialGroup,
  cleanupPairs,
  exteriorGroups,
  hdrSelection,
  interiorGroups,
  key,
  twilightPair,
} from "./photos";

/** The retouched frame from the lead clean-up pair. */
const cleanupAfter = cleanupPairs[0].after;

export const business = {
  name: "3D Interactive Virtual Tours",
  shortName: "3D IVT",
  positioning: "Real Estate Visual Marketing",
  contactName: "James Aguilar",
  contactTitle: "Zillow Certified and Google Trusted Real Estate Photographer",
  email: "james@3divt.com",
  phone: "8636043662",
  phoneDisplay: "863 604 3662",
  phoneHref: "tel:+18636043662",
  serviceArea: "Winter Haven and Central Florida",
  /** The radius the published pricing assumes. */
  serviceRadius: "Within 25 miles of Winter Haven, Polk County",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

/** One CTA label per intent, reused everywhere on the site. */
export const cta = {
  primary: { label: "Request a Quote", href: "/contact" },
  services: { label: "Explore Services", href: "/services" },
  portfolio: { label: "View Examples", href: "/portfolio" },
} as const;

/**
 * Credentials, stated plainly. Not a banner.
 *
 * `marks` replaces the supplied Zillow/Google badge lockup: the site carries
 * only the studio's own property photography, and a certification reads as
 * well set in type as it does as a logo.
 */
export const credentials = {
  marks: ["Zillow Certified", "Google Street View Trusted"],
  claims: [
    "Zillow Certified Photographer",
    "Google Street View Trusted",
    "Licensed drone operation",
    "Delivery in 18 hours or same day",
  ],
} as const;

const photo = (file: string) => `/Images/${file}`;

/**
 * Hero film, played full-bleed behind the page heading.
 *
 * The poster is a real frame from the film itself, so the first paint matches
 * what the video cuts to rather than flashing a different subject. The film is
 * silent and decorative, which is why it carries a poster and a pause control
 * instead of captions.
 *
 * Note for whoever maintains this: the current file is licensed stock and
 * carries a visible supplier watermark, and its subject is a Norwegian barn
 * rather than a Florida property. Replacing it with the studio's own footage is
 * a one-line change here. See the media notes in README.md.
 */
export const hero = {
  video: photo("hero.mp4"),
  poster: photo("hero-poster.jpg"),
  posterAlt:
    "Opening frame of the hero film, a timber barn on a grass slope beneath a clouded mountain",
  /** Announced to assistive tech in place of the decorative motion. */
  label: "Silent background film, shown behind the page heading",
};

/**
 * The studio's own films, hosted on YouTube. Posters are local stills so the
 * page never waits on a third party to paint.
 */
export type Film = {
  id: string;
  title: string;
  subject: string;
  poster: string;
  posterAlt: string;
  /** Real runtime, read from the source video. */
  duration: string;
  start?: number;
};

export const films: Record<"brand" | "oakwood" | "embry", Film> = {
  brand: {
    id: "noLfuPU9MnA",
    title: "3D Interactive Virtual Tours",
    subject: "Studio film",
    poster: photo("film-brand.jpg"),
    posterAlt: "Opening frame of the 3D Interactive Virtual Tours studio film",
    duration: "0:55",
    start: 2,
  },
  oakwood: {
    id: "IFUq1AfhIuM",
    title: "23 Oakwood Rd, Winter Haven",
    subject: "Listing film",
    poster: photo("film-oakwood.jpg"),
    posterAlt: "Opening frame of the listing film for 23 Oakwood Road, Winter Haven",
    duration: "1:33",
  },
  embry: {
    id: "UbhVibIpgQQ",
    title: "2112 Embry Ave, Haines City",
    subject: "Listing film",
    poster: photo("film-embry.jpg"),
    posterAlt: "Opening frame of the listing film for 2112 Embry Avenue, Haines City",
    duration: "1:05",
  },
};

/**
 * Live interactive tours, embedded from tours.3divt.com. Posters are real
 * frames pulled from each tour.
 */
export type Tour = {
  slug: string;
  name: string;
  subject: string;
  url: string;
  poster: string;
  alt: string;
};

export const tours: Tour[] = [
  {
    slug: "air-force-1",
    name: "Air Force One",
    subject: "Presidential aircraft interior",
    url: "https://tours.3divt.com/virtual-tour/air-force-1/skinned/",
    poster: photo("tour-airforce1.jpg"),
    alt: "Interior of Air Force One looking through the crew door toward the flight deck",
  },
  {
    slug: "microsoft-3divt",
    name: "Microsoft feature",
    subject: "Historic aircraft interior",
    url: "https://tours.3divt.com/virtual-tour/microsoft-3divt/skinned/",
    poster: photo("tour-microsoft.jpg"),
    alt: "Interior of a historic bomber showing the flight deck between rows of oxygen tanks",
  },
];

/**
 * The two interactive experiences the studio publishes for a real Florida
 * listing, hosted by the platforms that run them.
 *
 * These open in a new tab rather than in an iframe. Both providers put the
 * viewer through their own loader, and neither is served for embedding at the
 * URL the studio hands out, so a card that opens the real thing is both more
 * honest and cheaper than an inline frame that may render a challenge page.
 * The poster is the studio's own photography of a Florida property, and the
 * card says which platform it opens, so nothing here implies the frame is the
 * tour.
 */
export type Experience = {
  slug: "matterport-3d" | "aerial-360";
  /** Small type above the title. Names the discipline. */
  kicker: string;
  title: string;
  /** What the viewer gets when they open it. */
  copy: string;
  /** The platform running it, stated plainly on the card. */
  platform: string;
  /** Where the tour actually is. Opened in a new tab, unmodified. */
  url: string;
  ctaLabel: string;
  poster: string;
  posterAlt: string;
  /** Address, where the studio publishes one for the tour. */
  location?: string;
};

export const experiences: Experience[] = [
  {
    slug: "matterport-3d",
    kicker: "3D Interactive Virtual Tour",
    title: "Walk the property in 3D",
    copy: "A measured 3D capture the buyer moves through room by room, with the dollhouse and floor-plan views alongside it. Open on a phone, a laptop or a headset, at any hour.",
    platform: "Matterport",
    url: "https://my.matterport.com/models/jwWfXqk1q8Z?cta_origin=model_listing_results",
    ctaLabel: "Explore 3D Virtual Tour",
    poster: interiorGroups[1].images[1].src,
    posterAlt: interiorGroups[1].images[1].alt,
  },
  {
    slug: "aerial-360",
    kicker: "360 Interactive Aerial Virtual Tour",
    title: "See the whole property from above",
    copy: "An interactive aerial position over the property that pans, tilts and zooms, so a buyer can read the lot, the roofline, the street and everything around it.",
    platform: "360aerialtours.com",
    location: "470 S Ramona Ave, Lake Alfred",
    url: "https://www.360aerialtours.com/James-Aguilar/470-S-Ramona-Ave-Lake-Alfred.html",
    ctaLabel: "Explore Aerial Tour",
    poster: key.overhead.src,
    posterAlt: key.overhead.alt,
  },
];

export const introImage = key.entry;

/**
 * Homepage proof strip. One frame per discipline, so the section answers
 * "what do I actually get" before the visitor reaches the services page.
 * Each entry names the service it demonstrates, which is the whole point.
 */
export type Proof = {
  service: string;
  caption: string;
  image: string;
  alt: string;
  /** Anchors into the services page. Matches a `Service.id`. */
  href: string;
  /** Overrides the frame proportion where the asset demands it. */
  aspect?: string;
};

export const proofs: Proof[] = [
  {
    service: "Real Estate Photography",
    caption: "Interior and exterior coverage of the whole property",
    image: key.kitchen.src,
    alt: key.kitchen.alt,
    href: "/services#real-estate-photography",
  },
  {
    service: "HDR Photography",
    caption: "Windows that keep their view, rooms that keep their detail",
    image: hdrSelection[0].src,
    alt: hdrSelection[0].alt,
    href: "/services#hdr-photography",
    aspect: "aspect-16/9",
  },
  {
    service: "Aerial and Drone",
    caption: "The lot, the water and the community from the air",
    image: key.overhead.src,
    alt: key.overhead.alt,
    href: "/services#aerial-drone",
  },
  {
    service: "Outdoor Living",
    caption: "The pool, the lanai and the summer kitchen",
    image: key.pool.src,
    alt: key.pool.alt,
    href: "/services#real-estate-photography",
    aspect: "aspect-4/5",
  },
  {
    service: "De-cluttering and Clean-up",
    caption: "Drives and paving cleaned after the shoot",
    image: cleanupAfter.src,
    alt: cleanupAfter.alt,
    href: "/services#decluttering",
    aspect: "aspect-4/5",
  },
  {
    service: "Virtual Twilight",
    caption: "A midday exterior taken to dusk, lights on",
    image: key.twilight.src,
    alt: key.twilight.alt,
    href: "/services#virtual-twilight",
    aspect: "aspect-3/2",
  },
  {
    service: "Lot Line Overlay",
    caption: "The boundary drawn on the overhead frame",
    image: key.lotLines.src,
    alt: key.lotLines.alt,
    href: "/services#aerial-drone",
    aspect: "aspect-3/2",
  },
];

export const experiencePillars = [
  { title: "Open at midnight", copy: "The tour does not keep office hours, and neither does the buyer." },
  { title: "Any device", copy: "Phone, laptop, tablet or headset. No app, no download." },
  { title: "Understood, not just seen", copy: "Buyers arrive knowing the layout instead of learning it." },
  { title: "Fewer wasted showings", copy: "The people who book have already walked the house once." },
];

export const featuredProperty = {
  headline: "Shot Tuesday. Live Wednesday.",
  copy: "The photographs, the aerial coverage, the tour, the dollhouse, the floor plan and the video all come from the same appointment, so they land together rather than trickling in across a week.",
  location: "Winter Haven, Polk County",
  discipline: "In 18 hours, or the same day",
  ctaLabel: "See the full service list",
  image: key.pool.src,
  alt: key.pool.alt,
};

/**
 * Portfolio entries lead with the service, not the address. A realtor
 * browsing this page is deciding what to buy, not admiring a house.
 */
export type Project = {
  slug: string;
  /** The service this piece of work demonstrates. Leads the caption. */
  service: string;
  property: string;
  location: string;
  /** What the client actually received. */
  result: string;
  /** Required for stills. Film entries play in place and carry no frame. */
  image?: string;
  alt?: string;
  /** "film" entries play in place; the default is a still frame. */
  kind?: "photo" | "film";
  film?: keyof typeof films;
  /** Overrides the grid frame's proportion when the asset demands it. */
  aspect?: string;
};

export const portfolio: Project[] = [
  {
    slug: "oakwood-film",
    service: "Property Video",
    property: "23 Oakwood Rd",
    location: "Winter Haven",
    result: "Branded and unbranded cuts from one shoot",
    kind: "film",
    film: "oakwood",
    aspect: "aspect-16/9",
  },
  {
    slug: "interior-photography",
    service: "Real Estate Photography",
    property: "Family home",
    location: "Polk County",
    result: "50 HDR frames, delivered next morning",
    image: key.living.src,
    alt: key.living.alt,
  },
  {
    slug: "outdoor-living",
    service: "Outdoor Living Coverage",
    property: "Pool home",
    location: "Polk County",
    result: "Pool, spa, lanai and summer kitchen",
    image: key.pool.src,
    alt: key.pool.alt,
  },
  {
    slug: "lot-lines",
    service: "Lot Line Overlay",
    property: "Cul-de-sac lot",
    location: "Polk County",
    result: "Boundary drawn on the overhead frame",
    image: key.lotLines.src,
    alt: key.lotLines.alt,
    aspect: "aspect-16/9",
  },
  {
    slug: "embry-film",
    service: "Unbranded MLS Video",
    property: "2112 Embry Ave",
    location: "Haines City",
    result: "MLS-compliant cut, no agent branding",
    kind: "film",
    film: "embry",
    aspect: "aspect-16/9",
  },
  {
    slug: "decluttering",
    service: "De-cluttering and Clean-up",
    property: "Paver driveway",
    location: "Polk County",
    result: "Staining and marks lifted in post",
    image: cleanupAfter.src,
    alt: cleanupAfter.alt,
    aspect: "aspect-4/5",
  },
  {
    slug: "exterior-aerial",
    service: "Photography and Aerial",
    property: "Single-storey home",
    location: "Polk County",
    result: "Ground and aerial coverage of the lot",
    aspect: "aspect-21/9",
    image: aerialGroup.images[1].src,
    alt: aerialGroup.images[1].alt,
  },
  {
    slug: "virtual-twilight",
    service: "Virtual Twilight",
    property: "Single-storey home",
    location: "Polk County",
    result: "Midday aerial converted to dusk",
    image: twilightPair.after.src,
    alt: twilightPair.after.alt,
    aspect: "aspect-3/2",
  },
];

/**
 * What one shoot actually delivers, room by room.
 *
 * The packages quote "50 photographs". That number means nothing to an agent
 * until they see what fifty photographs of a single house covers, which is the
 * job this section does. Every frame is studio work on a Florida property.
 */
export const coverage = {
  title: "What full coverage looks like",
  copy: "One property, one appointment, every frame delivered. Not fifty angles of the front elevation: every room and every corner of the lot a buyer will ask about, shot so the listing does not run out of answers.",
  /* The whole shoot, straight off the folders in public/Images: the HDR
     interiors room by room, the exteriors in the order a visitor arrives, and
     the aerial coverage last. The argument this section makes is completeness,
     which a curated selection cannot make on its own behalf. */
  groups: [...interiorGroups, ...exteriorGroups, aerialGroup],
};

/** Page hero photography. Studio work only. */
export const pageHeroes = {
  services: key.living,
  about: key.elevation,
  aboutBand: key.lanai,
  portfolio: key.dining,
};

export const valueProps = [
  {
    number: "01",
    title: "Get the click",
    copy: "A listing gets a fraction of a second in a feed. The first frame decides whether it gets a second one.",
  },
  {
    number: "02",
    title: "Answer the questions",
    copy: "Layout, dimensions, light and setting. A buyer who has those already is a buyer who books a showing.",
  },
  {
    number: "03",
    title: "Win the next listing",
    copy: "Sellers choose the agent whose listings look like this. The marketing is the pitch.",
  },
];

export const approach = [
  {
    number: "01",
    title: "One visit",
    copy: "Photography, aerial coverage and the 3D capture happen in a single appointment, planned around the light and the property.",
  },
  {
    number: "02",
    title: "Processed by hand",
    copy: "Exposures blended, colour corrected, skies and driveways cleaned, clutter removed. Standard on every shoot.",
  },
  {
    number: "03",
    title: "Assembled",
    copy: "Tour, dollhouse, floor plan, video and property page built from the same capture, so everything agrees with everything else.",
  },
  {
    number: "04",
    title: "Delivered ready",
    copy: "Sized for the MLS, for print, for social and for the listing page. In 18 hours or the same day.",
  },
];

/** Drives the enquiry form. Mirrors the service catalogue. */
export const serviceOptions = [
  "Photography package",
  "Full package with aerial and 3D tour",
  "3D tour and floor plan only",
  "Aerial and drone only",
  "Virtual staging",
  "Property video",
  "Single property website",
  "Not sure yet",
];

export const siteUrl = "https://3divt.com";
