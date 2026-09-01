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

/** Credentials, stated plainly. Not a banner. */
export const credentials = {
  badge: {
    src: "/Images/badge-zillow-google.jpg",
    alt: "Zillow Certified Photographer and Google Street View Trusted Photographer badges",
  },
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

export const introImage = {
  src: photo("ext-pool-palms.jpg"),
  alt: "Screened pool and spa behind a Florida home, framed by palms and tropical planting",
};

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
    image: photo("int-kitchen-coffered.jpg"),
    alt: "Kitchen with a coffered ceiling, granite island and stainless appliances",
    href: "/services#real-estate-photography",
  },
  {
    service: "3D Dollhouse",
    caption: "The whole house from above, roof removed",
    image: photo("ex-dollhouse.jpg"),
    alt: "Dollhouse view of a captured home showing every furnished room and how they connect",
    href: "/services#dollhouse",
    aspect: "aspect-16/9",
  },
  {
    service: "Aerial and Drone",
    caption: "The lot, the water and the community from the air",
    image: photo("ex-drone.jpg"),
    alt: "Camera drone in flight above a property, framed by palm fronds",
    href: "/services#aerial-drone",
  },
  {
    service: "2D Floor Plans",
    caption: "Every room labelled and dimensioned",
    image: photo("ex-floorplan-2d.jpg"),
    alt: "Furnished floor plan with labelled rooms, fixtures and dimensions",
    href: "/services#floor-plans",
    aspect: "aspect-4/5",
  },
  {
    service: "Single Property Website",
    caption: "One address carrying every asset",
    image: photo("ex-property-website.jpg"),
    alt: "Single-property website with a header video, photo grid, property details and contact form",
    href: "/services#property-website",
    aspect: "aspect-4/5",
  },
  {
    service: "3D Matterport Tours",
    caption: "Dollhouse, floor plan and headset views in one interface",
    image: photo("ex-matterport-ui.jpg"),
    alt: "Matterport tour interface showing a 3D model of a home with navigation controls",
    href: "/services#matterport",
    aspect: "aspect-16/9",
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
  image: photo("ext-backyard-lanai.jpg"),
  alt: "Rear of a Florida home with a covered lanai, lawn and flowering shrubs under an open sky",
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
    slug: "oakwood-film",
    service: "Property Video",
    property: "23 Oakwood Rd",
    location: "Winter Haven",
    result: "Branded and unbranded cuts from one shoot",
    kind: "film",
    film: "oakwood",
    aspect: "aspect-16/9",
    image: photo("film-oakwood.jpg"),
    alt: "Opening frame of the listing film for 23 Oakwood Road, Winter Haven",
  },
  {
    slug: "interior-photography",
    service: "Real Estate Photography",
    property: "Family home",
    location: "Polk County",
    result: "50 HDR frames, delivered next morning",
    image: photo("int-living-fireplace.jpg"),
    alt: "Living room with a corner fireplace, sectional sofa and tiled floor",
  },
  {
    slug: "virtual-staging",
    service: "Virtual Staging",
    property: "New construction",
    location: "Central Florida",
    result: "Empty rooms furnished digitally",
    image: photo("ex-staging-after.jpg"),
    alt: "Open-plan living and dining room furnished digitally with a dining set, sofa and rug",
  },
  {
    slug: "dollhouse-model",
    service: "3D Dollhouse",
    property: "Four-bedroom home",
    location: "Central Florida",
    result: "Full 3D model with roof removed",
    image: photo("ex-dollhouse.jpg"),
    alt: "Dollhouse view of a captured home showing every furnished room and how they connect",
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
    image: photo("film-embry.jpg"),
    alt: "Opening frame of the listing film for 2112 Embry Avenue, Haines City",
  },
  {
    slug: "floor-plan",
    service: "2D Floor Plan",
    property: "Two-storey home",
    location: "Central Florida",
    result: "Labelled plan for both floors",
    image: photo("ex-floorplan-2d.jpg"),
    alt: "Furnished two-storey floor plan with labelled rooms, fixtures and dimensions",
    aspect: "aspect-4/5",
  },
  {
    slug: "exterior-aerial",
    service: "Photography and Aerial",
    property: "Single-storey home",
    location: "Polk County",
    result: "Ground and aerial coverage of the lot",
    aspect: "aspect-21/9",
    image: photo("ext-ranch-garage.jpg"),
    alt: "Single-storey Florida home with a three-car garage, palm and front lawn on a clear day",
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
  copy: "A standard shoot returns around fifty frames. Not fifty angles of the front elevation: every room a buyer will ask about, shot so the listing does not run out of answers.",
  groups: [
    {
      room: "Kitchens and dining",
      images: [
        { src: photo("int-kitchen-clock.jpg"), alt: "Kitchen with a granite island, breakfast bar and stainless double oven" },
        { src: photo("int-kitchen-red.jpg"), alt: "Kitchen and eating area with timber cabinetry and a tiled floor" },
        { src: photo("int-kitchen-white.jpg"), alt: "White kitchen with a central island, breakfast stools and skylight" },
        { src: photo("int-dining-formal.jpg"), alt: "Formal dining room with a tray ceiling, chandelier and plantation shutters" },
      ],
    },
    {
      room: "Living spaces",
      images: [
        { src: photo("int-living-formal.jpg"), alt: "Two-storey living room with an arched window, chandelier and staircase" },
        { src: photo("int-living-neutral.jpg"), alt: "Living room with a fireplace, sectional sofa and view through to the entry" },
        { src: photo("int-living-sunroom.jpg"), alt: "Sun room with wicker seating, a media wall and windows on three sides" },
      ],
    },
    {
      room: "Bedrooms",
      images: [
        { src: photo("int-bed-fan.jpg"), alt: "Primary bedroom with a timber bed frame, ceiling fan and wood floor" },
        { src: photo("int-bed-guest.jpg"), alt: "Guest bedroom with a white bed, armchair and plantation shutters" },
        { src: photo("int-bed-pastel.jpg"), alt: "Bedroom with pale walls, a ceiling fan and shuttered windows" },
        { src: photo("int-bed-kids.jpg"), alt: "Child's bedroom with a canopy bed, dressing table and pink walls" },
        { src: photo("int-bed-boys.jpg"), alt: "Child's bedroom with a single bed, shutters and a desk area" },
      ],
    },
    {
      room: "Bathrooms",
      images: [
        { src: photo("int-bath-double.jpg"), alt: "Bathroom with a corner tub, walk-in shower and double vanity" },
        { src: photo("int-bath-tub.jpg"), alt: "Bathroom with a garden tub, glass shower and tiled surround" },
        { src: photo("int-bath-vanity.jpg"), alt: "Bathroom vanity in granite with a mirror and view through to the bedroom" },
      ],
    },
  ],
};

/** Page hero photography. Studio work only. */
export const pageHeroes = {
  services: {
    src: photo("int-living-bright.jpg"),
    alt: "Living room with a wall of windows looking onto a screened lanai and garden",
  },
  about: {
    src: photo("ext-colonial-porch.jpg"),
    alt: "Two-storey home with a covered front porch and dormer windows behind mature trees",
  },
  aboutBand: {
    src: photo("ext-patio-pavers.jpg"),
    alt: "Paver patio with seating under a covered porch and mature tropical planting",
  },
  portfolio: {
    src: photo("int-dining-shutters.jpg"),
    alt: "Dining room with plantation shutters, a long table and polished tile floor",
  },
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
