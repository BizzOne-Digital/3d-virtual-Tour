/**
 * The service catalogue: the spine of the site.
 *
 * Every service answers the same three questions in the same order, because
 * that is the order a realtor asks them:
 *
 *   what is it      -> `title` and `summary`
 *   why do I need it-> `value`
 *   what does it look like -> `example`
 *
 * Adding, reordering or re-illustrating a service is an edit to this file only.
 * No component needs to change. Swapping an image is a one-line edit; swapping
 * an example for a different *kind* of example is a two-line edit.
 *
 * Names, prices and inclusions are taken from the studio's own material at
 * 3divt.com. Nothing here is invented. Where a figure is not published, the
 * service carries no price rather than a guess.
 */

export type Photo = { src: string; alt: string };

const img = (file: string, alt: string): Photo => ({ src: `/Images/${file}`, alt });

/**
 * How a service proves itself. The renderer switches on `kind`, so a service
 * can change from a still to a slider to a live tour without touching layout.
 */
export type Example =
  /** Several frames of real work. Reads as a body of evidence. */
  | { kind: "gallery"; images: Photo[] }
  /** Two states of the same room or frame, on a draggable slider. */
  | { kind: "before-after"; before: Photo; after: Photo; beforeLabel: string; afterLabel: string }
  /** One frame, shown large. For services whose output is a single artefact. */
  | { kind: "image"; image: Photo; caption?: string }
  /** A tour that runs inside the page. `slug` indexes `tours` in content.ts. */
  | { kind: "tour"; slug: string }
  /** A film that plays in place. `film` indexes `films` in content.ts. */
  | { kind: "film"; film: "brand" | "oakwood" | "embry" }
  /**
   * The deliverable itself, set as type. For work whose output is a process
   * rather than a picture: publishing a screenshot of a real listing would mean
   * publishing a real client's data, and a stock photograph of a camera would
   * demonstrate nothing.
   */
  | { kind: "checklist"; title: string; steps: string[] };

export type Service = {
  /** Stable id. Used for anchors, so changing it changes a URL. */
  id: string;
  title: string;
  /** What it is. One sentence, no jargon. */
  summary: string;
  /** Why a realtor would buy it. One sentence, in their terms. */
  value: string;
  example: Example;
  /** Shown as a price line where the studio publishes one. */
  price?: string;
  /** Marks the value-added services the studio includes at no extra cost. */
  included?: boolean;
  /**
   * Named sub-treatments that ship under this service. Used where several
   * small jobs share one worked example rather than each needing its own
   * block, which is what keeps the catalogue from turning into forty entries.
   */
  alsoIncludes?: string[];
  /** Optional live proof, opened in a new tab. */
  proof?: { label: string; href: string };
};

export type ServiceCategory = {
  id: string;
  /** Short name, used in navigation and the homepage overview. */
  name: string;
  /** One line on what the whole category is for. */
  intro: string;
  /** The image that stands for this category on the homepage. */
  cover: Photo;
  services: Service[];
};

export const categories: ServiceCategory[] = [
  {
    id: "photography",
    name: "Photography",
    intro:
      "The images every other asset is built from. Shot for the way a listing is actually read: small, fast, on a phone.",
    cover: img(
      "int-kitchen-coffered.jpg",
      "Kitchen with a coffered ceiling, granite island and stainless appliances",
    ),
    services: [
      {
        id: "real-estate-photography",
        title: "Real Estate Photography",
        summary:
          "Full interior and exterior coverage of the property: living spaces, kitchen, bedrooms, bathrooms, outdoor areas and the details that sell the house.",
        value:
          "Buyers scroll past listings in under a second. Professional coverage is what earns the second look, on the MLS, on Zillow and in the feed.",
        price: "Packages from $155",
        example: {
          kind: "gallery",
          images: [
            img("int-kitchen-island.jpg", "Kitchen island under pendant lights, open to a dining area"),
            img("int-living-bright.jpg", "Living room with a wall of windows onto a screened lanai"),
            img("int-bed-primary.jpg", "Primary bedroom with a tray ceiling and plantation shutters"),
            img("int-bath-spa.jpg", "Bathroom with a corner soaking tub, double vanity and walk-in shower"),
            img("ext-ranch-garage.jpg", "Single-storey Florida home with a three-car garage and front lawn"),
            img("ext-patio-pavers.jpg", "Paver patio with seating under a covered porch and mature planting"),
          ],
        },
      },
      {
        id: "hdr-photography",
        title: "HDR Photography",
        summary:
          "Several exposures of the same frame, blended by hand so the window keeps its view and the room keeps its detail.",
        value:
          "A camera cannot hold a bright Florida window and a shaded interior in one exposure. HDR is how a room looks the way it looked when you stood in it.",
        example: {
          kind: "before-after",
          before: img(
            "ex-enhanced-before.jpg",
            "Kitchen photographed with a heavy colour cast, dark cabinetry and flat window light",
          ),
          after: img(
            "ex-enhanced-after.jpg",
            "The same kitchen with balanced colour, recovered window detail and even exposure across the room",
          ),
          beforeLabel: "Straight out of camera",
          afterLabel: "Processed",
        },
      },
      {
        id: "aerial-drone",
        title: "Aerial and Drone Photography",
        summary:
          "The lot, the roofline, the water, the golf course and the street the house actually sits on, shot from the air.",
        value:
          "In Florida the setting is often the product. Aerial coverage shows the pool, the lake frontage and the community that a ground-level photograph cannot.",
        price: "From $135",
        example: {
          kind: "image",
          image: img("ex-drone.jpg", "Camera drone in flight above a property, framed by palm fronds"),
          caption: "Licensed drone coverage of the lot, the roofline and the surrounding community.",
        },
      },
    ],
  },

  {
    id: "immersive",
    name: "3D and Virtual Tours",
    intro:
      "The part of the listing a buyer can walk through. Open on any phone, at any hour, from anywhere.",
    cover: img("ex-dollhouse.jpg", "Three-dimensional dollhouse model of a house with the roof removed"),
    services: [
      {
        id: "interactive-virtual-tours",
        title: "3D Interactive Virtual Tours",
        summary:
          "A navigable model of the property that a buyer moves through room by room, on a phone, a laptop, a tablet or a headset.",
        value:
          "The listing stays open at midnight, and an out-of-state buyer can walk the house before they book a flight. Fewer wasted showings, better-prepared visits.",
        proof: {
          label: "Open a live tour",
          href: "https://tours.3divt.com/virtual-tour/air-force-1/skinned/",
        },
        example: { kind: "tour", slug: "air-force-1" },
      },
      {
        id: "matterport",
        title: "3D Matterport Tours",
        summary:
          "The property captured as a measured 3D space, with the navigation, floor-level and dollhouse views a buyer expects.",
        value:
          "A buyer who understands the layout before the showing arrives ready to talk about the house rather than orient themselves in it.",
        price: "Additional $25 per 500 sq ft above 2,500 sq ft",
        example: {
          kind: "image",
          image: img(
            "ex-matterport-ui.jpg",
            "Matterport tour interface showing a 3D model of a home with dollhouse, floor plan and view controls",
          ),
          caption: "The tour interface: dollhouse, floor plan, measurement and headset views in one place.",
        },
      },
      {
        id: "dollhouse",
        title: "3D Dollhouse Models",
        summary:
          "The whole house seen from above with the roof lifted off, every room and its furniture in place.",
        value:
          "One image answers the question a gallery of rooms never does: how the house actually fits together.",
        included: true,
        example: {
          kind: "image",
          image: img(
            "ex-dollhouse.jpg",
            "Dollhouse view of a captured home, roof removed, showing every furnished room and how they connect",
          ),
          caption: "Roof off, every room in place. Included with every 3D tour.",
        },
      },
      {
        id: "floor-plans",
        title: "2D Interactive Floor Plans",
        summary:
          "A dimensioned, labelled plan of every floor, generated from the same capture as the tour.",
        value:
          "Room dimensions and flow are the first thing a serious buyer asks for and the last thing most listings provide.",
        included: true,
        example: {
          kind: "gallery",
          images: [
            img(
              "ex-floorplan-2d.jpg",
              "Furnished two-storey floor plan with labelled rooms, fixtures and dimensions",
            ),
            img(
              "ex-floorplan-3d.jpg",
              "Three-dimensional cutaway floor plan showing furniture and room layout from above",
            ),
          ],
        },
      },
      {
        id: "virtual-reality",
        title: "Virtual Reality",
        summary:
          "The same tour converted for a headset, so the buyer stands inside the property at full scale.",
        value:
          "For relocating and overseas buyers, a headset walkthrough is the closest thing to a showing without a flight.",
        included: true,
        example: {
          kind: "image",
          image: img(
            "ex-vr-headset.jpg",
            "Virtual reality headset displaying a property interior, captioned walk around, feel it, experience it",
          ),
          caption: "Every tour converts to a headset-ready experience at no extra cost.",
        },
      },
      {
        id: "aerial-360",
        title: "360 Aerial Virtual Tours",
        summary:
          "An interactive aerial position above the property that the viewer can pan, tilt and zoom through the neighbourhood.",
        value:
          "Shows the buyer what is around the house: the lake, the course, the school run, the drive to the interstate.",
        price: "Included in the full package",
        example: {
          kind: "image",
          image: img(
            "ex-open-house.jpg",
            "Composite of a drone, a headset and a Florida home advertising a round-the-clock open house",
          ),
          caption: "Aerial capture feeding a 360 tour the buyer explores from the air.",
        },
      },
    ],
  },

  {
    id: "video",
    name: "Video and Marketing",
    intro:
      "The assets that carry the listing off the MLS and into a feed, an inbox and a shareable link.",
    cover: img("ex-property-website.jpg", "Single-property website showing photos, video and a contact form"),
    services: [
      {
        id: "property-videos",
        title: "Property Videos",
        summary:
          "A cut of the property that moves: interior, exterior and aerial footage assembled into one piece.",
        value:
          "Video is the format the platforms push hardest. One good cut works on the listing page, in an email and on a reel.",
        price: "Up to 120 seconds, included",
        example: { kind: "film", film: "oakwood" },
      },
      {
        id: "mls-videos",
        title: "Unbranded MLS Videos",
        summary:
          "The same footage delivered without agent branding, in the format the MLS requires.",
        value: "Meets MLS rules on branding without a second shoot or a second invoice.",
        included: true,
        example: { kind: "film", film: "embry" },
      },
      {
        id: "social-videos",
        title: "Branded Social Media Videos",
        summary:
          "A cut carrying the agent's name and contact details, sized for Facebook, Instagram and YouTube.",
        value:
          "The listing markets the property. This markets the agent, on the platforms where the next seller is watching.",
        included: true,
        example: {
          kind: "image",
          image: img(
            "ex-360-video.jpg",
            "Thumbnail of a 360 degree walkthrough video of a living room in 4K",
          ),
          caption: "Delivered branded for social and unbranded for the MLS, from the same shoot.",
        },
      },
      {
        id: "property-website",
        title: "Single Property Websites",
        summary:
          "A dedicated page for the property carrying the photography, the video, the tour, the floor plan and the agent's details.",
        value:
          "One link for the sign, the postcard, the email and the ad, instead of five. Branded and unbranded versions of the same page.",
        price: "Custom branding and URL from $30",
        alsoIncludes: [
          "Branded and unbranded versions",
          "Custom domain",
          "Sized for Zillow, Realtor.com and social",
        ],
        example: {
          kind: "image",
          image: img(
            "ex-property-website.jpg",
            "Single-property website with a header video, photo grid, property details and a contact form",
          ),
          caption: "A branded address for the listing, and an unbranded one for the MLS.",
        },
      },
    ],
  },

  {
    id: "enhancement",
    name: "Property Enhancement",
    intro:
      "What happens to the photographs after the shoot. The difference between a room and a room a buyer can picture themselves in.",
    cover: img("ex-staging-after.jpg", "Empty living and dining space furnished digitally with a table, sofa and rug"),
    services: [
      {
        id: "virtual-staging",
        title: "Virtual Staging",
        summary:
          "Empty rooms furnished digitally, matched to the light and the lines of the actual space.",
        value:
          "A gallery of empty rooms with white walls loses buyers. Staging lets them see the house furnished without renting a stick of furniture.",
        price: "From $10 per image",
        example: {
          kind: "before-after",
          before: img(
            "ex-staging-before.jpg",
            "Empty open-plan living and dining room with bare floors, a staircase and sliding doors to the yard",
          ),
          after: img(
            "ex-staging-after.jpg",
            "The same room digitally furnished with a dining set, sofa, rug, television and artwork",
          ),
          beforeLabel: "As photographed",
          afterLabel: "Virtually staged",
        },
      },
      {
        id: "photo-enhancement",
        title: "Photo Enhancement",
        summary:
          "Clutter removed, grey skies replaced, driveways cleaned, daytime exteriors converted to twilight. Most of it applied to every shoot as standard.",
        value:
          "The house shows the way the seller wishes it had looked on the day, without a second appointment, a pressure washer or a sunset callout.",
        included: true,
        alsoIncludes: [
          "Blue sky replacement",
          "Driveway and lawn clean-up",
          "Minor de-cluttering",
          "Virtual twilight conversion",
        ],
        example: {
          kind: "before-after",
          before: img(
            "ex-enhanced-before.jpg",
            "Kitchen with a heavy colour cast, dark flooring and cluttered surfaces",
          ),
          after: img(
            "ex-enhanced-after.jpg",
            "The same kitchen corrected and cleaned up, with brighter flooring, clear surfaces and balanced light",
          ),
          beforeLabel: "Before",
          afterLabel: "After",
        },
      },
    ],
  },

  {
    id: "listing-support",
    name: "Listing Support",
    intro:
      "The unglamorous half of getting a listing live, handled so the agent can be somewhere else.",
    cover: img("ext-porch-two-story.jpg", "Two-storey Florida home with double front porches and a mature front lawn"),
    services: [
      {
        id: "open-house",
        title: "24 Hour Open House",
        summary:
          "The tour, the video and the property page published behind one address, on the sign and in the listing.",
        value:
          "The house is open every evening and every weekend, including the ones the agent has already committed to another listing.",
        price: "MLS listing setup from $9",
        example: {
          kind: "image",
          image: img(
            "ex-open-house.jpg",
            "Yard sign outside a Florida home advertising a 24 hour open house with a dedicated property address",
          ),
        },
      },
      {
        id: "mls-data-entry",
        title: "MLS Data Entry",
        summary:
          "Property details and media entered into the MLS, checked against the sheet before the listing goes live.",
        value:
          "The listing goes live complete and correct, and the agent gets the evening back.",
        example: {
          kind: "checklist",
          title: "What gets handled",
          steps: [
            "Property details entered from your listing sheet",
            "Photographs uploaded, ordered and captioned",
            "Tour, floor plan and video links attached",
            "Room dimensions checked against the floor plan",
            "Draft returned for your approval before it goes live",
          ],
        },
      },
    ],
  },
];

/** Flat view of the catalogue, for counts and lookups. */
export const allServices: Service[] = categories.flatMap((c) => c.services);

/** Everything the studio includes at no extra cost. Read off the catalogue. */
export const includedServices = allServices.filter((s) => s.included);

/**
 * Pricing as published by the studio. Kept as data so a figure can be changed
 * in one place. `note` carries the conditions rather than burying them.
 */
export const pricing = {
  intro:
    "Priced per property, by size and travel. These are the studio's published rates; the quote confirms them against the address.",
  tiers: [
    {
      name: "Introductory",
      price: "$89",
      for: "First shoot with a new agent",
      includes: ["Up to 10 HDR photographs", "Next-day delivery before 10am"],
    },
    {
      name: "Photography",
      price: "$155",
      for: "The standard listing package",
      includes: [
        "50 HD and HDR photographs",
        "Video up to 120 seconds",
        "Blue skies and clean driveways",
        "Minor de-cluttering",
      ],
    },
    {
      name: "Full package",
      price: "$255",
      for: "Photography, air and tour together",
      includes: [
        "Everything in the photography package",
        "Aerial and drone coverage",
        "360 aerial virtual tour",
      ],
    },
  ],
  notes: [
    "Aerial coverage from $135. Introductory aerial rate $39.",
    "Matterport tours add $25 per 500 sq ft above 2,500 sq ft.",
    "Delivery in 18 hours or same day, excluding weekends.",
    "Travel beyond 25 miles of Winter Haven adds $25.",
  ],
} as const;
