/**
 * Single source of truth for site copy and imagery.
 * Edit here to change the site; components stay untouched.
 */

export const business = {
  name: "3D Interactive Virtual Tours",
  shortName: "3D IVT",
  positioning: "Real Estate Visual Marketing",
  contactName: "James",
  email: "james@3divt.com",
  phone: "8636043662",
  phoneDisplay: "863 604 3662",
  phoneHref: "tel:+18636043662",
  serviceArea: "Central Florida",
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
  primary: { label: "Request a Tour", href: "/contact" },
  services: { label: "Explore Services", href: "/services" },
  portfolio: { label: "View Portfolio", href: "/portfolio" },
} as const;

/**
 * Local photography, served from `public/Images`.
 * Every entry is one line to change when higher-resolution files arrive.
 */
const photo = (file: string) => `/Images/${file}`;

/** Hero background. 1920x1080, 11.6s, silent. */
export const heroVideo = {
  src: photo("hvideo.mp4"),
  /** Still shown on mobile and before the video has data. */
  poster: photo("h3.jpg"),
  posterAlt:
    "White farmhouse with a lit timber porch photographed at dusk from the front lawn",
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

export const introImage = {
  src: photo("h16.jpg"),
  alt: "Victorian mansion with turrets and ornamental woodwork photographed from the lawn",
};

export type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Optional proof link, used where a live example exists. */
  proof?: { label: string; href: string };
};

export const services: Service[] = [
  {
    number: "01",
    title: "3D Interactive Virtual Tours",
    description:
      "Immersive digital property experiences that let prospective buyers explore a property remotely, room by room, at their own pace.",
    image: photo("h11.jpg"),
    alt: "A-frame lakeside house with full-height glazing and a furnished terrace",
    proof: {
      label: "Open a live tour",
      href: "https://tours.3divt.com/virtual-tour/air-force-1/skinned/",
    },
  },
  {
    number: "02",
    title: "Real Estate Photography",
    description:
      "Professional property photography built to capture architecture, interiors, fine detail and the atmosphere of a home at its best hour.",
    image: photo("h7.jpg"),
    alt: "Victorian townhouse with bay windows and a brick entrance stair",
  },
  {
    number: "03",
    title: "Property Marketing",
    description:
      "Visual assets prepared for the way listings are actually consumed, so agents can present a property consistently across every channel.",
    image: photo("h2.jpg"),
    alt: "White brick single-storey home with a covered terrace, rattan chairs and potted planting",
  },
  {
    number: "04",
    title: "Immersive Property Experiences",
    description:
      "Technology-driven presentation that gives a buyer a genuine understanding of scale, light and flow before they schedule a showing.",
    image: photo("h5.jpg"),
    alt: "Modern flat-roofed villa with a swimming pool and lawn overlooking the coast",
  },
];

export const experiencePillars = [
  { title: "Immersive", copy: "Explore properties from anywhere, on any device." },
  { title: "Interactive", copy: "Buyers control how they move through a home." },
  { title: "Visual", copy: "Architecture and interiors presented at their best." },
  { title: "Memorable", copy: "Listings that hold attention after the scroll." },
];

export const technologyImage = {
  src: photo("h13.jpg"),
  alt: "Two-storey glass and steel residence at dusk with every interior room lit and visible",
};

export const featuredProperty = {
  headline: "A different way to see home.",
  copy: "A modern coastal residence documented across photography, aerial coverage and a full interactive walkthrough.",
  location: "Palm Terrace, Winter Haven",
  discipline: "Photography, Aerial, Virtual Tour",
  ctaLabel: "Explore experience",
  image: photo("h10.jpg"),
  alt: "Contemporary two-storey beach house lit at dusk, framed by mature palms",
};

export type Project = {
  slug: string;
  property: string;
  location: string;
  type: string;
  discipline: string;
  image: string;
  alt: string;
  /** "film" entries play in place; the default is a still frame. */
  kind?: "photo" | "film";
  film?: keyof typeof films;
  /** Overrides the grid frame's proportion when the asset demands it. */
  aspect?: string;
};

export const portfolio: Project[] = [
  {
    slug: "23-oakwood-rd",
    property: "23 Oakwood Rd",
    location: "Winter Haven",
    type: "Listing Film",
    discipline: "Film, Photography",
    kind: "film",
    film: "oakwood",
    aspect: "aspect-16/9",
    image: photo("film-oakwood.jpg"),
    alt: "Opening frame of the listing film for 23 Oakwood Road, Winter Haven",
  },
  {
    slug: "pinecrest-retreat",
    property: "Pinecrest Retreat",
    location: "Lake Wales",
    type: "Luxury Residential",
    discipline: "Photography, Virtual Tour",
    image: photo("h17.jpg"),
    alt: "A-frame chalet in a pine forest with a wraparound deck and warm interior light",
  },
  {
    slug: "the-magnolia",
    property: "The Magnolia",
    location: "Lakeland",
    type: "Residential Interiors",
    discipline: "Interior Photography",
    image: photo("h8.jpg"),
    alt: "Minimal living room with a pale sectional sofa, timber floor and sheer curtains",
  },
  {
    slug: "ridgeline-house",
    property: "Ridgeline House",
    location: "Bartow",
    type: "Modern Architecture",
    discipline: "Photography, Aerial",
    aspect: "aspect-16/10",
    image: photo("h9.jpg"),
    alt: "Twin-gabled modern house in brick and render with full-height glazing onto a garden",
  },
  {
    slug: "2112-embry-ave",
    property: "2112 Embry Ave",
    location: "Haines City",
    type: "Listing Film",
    discipline: "Film, Photography",
    kind: "film",
    film: "embry",
    aspect: "aspect-16/9",
    image: photo("film-embry.jpg"),
    alt: "Opening frame of the listing film for 2112 Embry Avenue, Haines City",
  },
  {
    slug: "terrace-house",
    property: "Terrace House",
    location: "Lakeland",
    type: "Property Showcase",
    discipline: "Photography, Virtual Tour",
    image: photo("h18.jpg"),
    alt: "Timber-clad multi-level residence with planted balconies behind a slatted screen",
  },
  {
    slug: "fairview-farmhouse",
    property: "Fairview Farmhouse",
    location: "Winter Haven",
    type: "Luxury Residential",
    discipline: "Photography, Aerial, Virtual Tour",
    aspect: "aspect-21/9",
    image: photo("h3.jpg"),
    alt: "White farmhouse with a steep slate roof and lit timber porch at dusk",
  },
];

/** Page hero photography. */
export const pageHeroes = {
  services: {
    src: photo("h15.jpg"),
    alt: "Tile-roofed bungalow with a lit veranda and a stone path across the lawn at dusk",
  },
  about: {
    src: photo("h14.jpg"),
    alt: "Tudor manor house in brick and timber framing set behind a broad lawn",
  },
  aboutBand: {
    src: photo("h13.jpg"),
    alt: "Two-storey glass and steel residence at dusk with every interior room lit and visible",
  },
  portfolio: {
    src: photo("h5.jpg"),
    alt: "Modern villa with a swimming pool and lawn overlooking the coast",
  },
};

export const valueProps = [
  {
    number: "01",
    title: "Capture attention",
    copy: "A listing gets a fraction of a second in a feed. The first frame decides whether it gets a second one.",
  },
  {
    number: "02",
    title: "Create confidence",
    copy: "Buyers who understand a layout before they arrive walk in ready to talk, not ready to orient themselves.",
  },
  {
    number: "03",
    title: "Sell the experience",
    copy: "Photography shows a property. An interactive tour lets someone stand inside it and decide how it feels.",
  },
];

export const approach = [
  {
    number: "01",
    title: "Understand the property",
    copy: "We walk the home first and identify what makes it worth photographing, then plan coverage and timing around it.",
  },
  {
    number: "02",
    title: "Capture the architecture",
    copy: "Composition, light and detail shot at the right hour, with the discipline architectural photography demands.",
  },
  {
    number: "03",
    title: "Build the visual experience",
    copy: "Stills, aerial coverage and interactive walkthroughs assembled into one coherent presentation of the property.",
  },
  {
    number: "04",
    title: "Deliver marketing-ready assets",
    copy: "Files sized and formatted for the MLS, for print, for social and for the listing agent site. Ready to publish.",
  },
];

export const serviceOptions = [
  "3D Interactive Virtual Tour",
  "Real Estate Photography",
  "Aerial Photography",
  "Property Marketing Assets",
  "Full Listing Package",
  "Not sure yet",
];

export const siteUrl = "https://3divt.com";
