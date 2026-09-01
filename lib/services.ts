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

import {
  aerialSelection,
  cleanupPairs,
  hdrSelection,
  key,
  photographySelection,
  twilightPair,
  type Photo,
} from "./photos";

export type { Photo };

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
   * A live tour hosted by the platform that runs it, opened in a new tab.
   * `slug` indexes `experiences` in content.ts.
   */
  | { kind: "experience"; slug: "matterport-3d" | "aerial-360" }
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
    cover: key.kitchen,
    services: [
      {
        id: "real-estate-photography",
        title: "Real Estate Photography",
        summary:
          "Full interior and exterior coverage of the property: living spaces, kitchen, bedrooms, bathrooms, outdoor areas and the details that sell the house.",
        value:
          "Buyers scroll past listings in under a second. Professional coverage is what earns the second look, on the MLS, on Zillow and in the feed.",
        price: "Packages from $155",
        example: { kind: "gallery", images: photographySelection },
      },
      {
        id: "hdr-photography",
        title: "HDR Photography",
        summary:
          "Several exposures of the same frame, blended by hand so the window keeps its view and the room keeps its detail.",
        value:
          "A camera cannot hold a bright Florida window and a shaded interior in one exposure. HDR is how a room looks the way it looked when you stood in it.",
        /* Every frame here is a room shot against its own glass: the pool wall,
           the lanai sliders, the window over the vanity. That is where the
           blend does visible work, so that is what the example shows. */
        example: { kind: "gallery", images: hdrSelection },
      },
      {
        id: "aerial-drone",
        title: "Aerial and Drone Photography",
        summary:
          "The lot, the roofline, the water, the golf course and the street the house actually sits on, shot from the air.",
        value:
          "In Florida the setting is often the product. Aerial coverage shows the pool, the lake frontage and the community that a ground-level photograph cannot.",
        price: "From $135",
        alsoIncludes: ["Overhead and oblique coverage", "Lot boundary overlay"],
        /* Ends on the boundary overlay: the same overhead frame with the lot
           lines drawn on, which is the one aerial deliverable an agent has to
           be shown to know it exists. */
        example: { kind: "gallery", images: aerialSelection },
      },
    ],
  },

  {
    id: "immersive",
    name: "3D and Virtual Tours",
    intro:
      "The part of the listing a buyer can walk through. Open on any phone, at any hour, from anywhere.",
    cover: key.living,
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
        proof: {
          label: "Explore 3D Virtual Tour",
          href: "https://my.matterport.com/models/jwWfXqk1q8Z?cta_origin=model_listing_results",
        },
        example: { kind: "experience", slug: "matterport-3d" },
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
          kind: "checklist",
          title: "What the dollhouse gives you",
          steps: [
            "The whole house in one 3D model, roof lifted off",
            "Every room furnished as it was on the day of capture",
            "Rotate, tilt and zoom to read how the rooms connect",
            "Click any room to drop into it at floor level",
            "Generated from the 3D capture, so it costs no extra shoot",
          ],
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
          kind: "checklist",
          title: "What the plan shows",
          steps: [
            "Every floor drawn to scale from the 3D capture",
            "Rooms labelled and dimensioned",
            "Fixtures, doors and window positions marked",
            "Furnished 2D and 3D cutaway versions",
            "Delivered sized for the MLS and for print",
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
          kind: "checklist",
          title: "How the headset version works",
          steps: [
            "The same capture, converted for VR at no extra cost",
            "Works on Meta Quest and other standard headsets",
            "The buyer stands in the room at full scale",
            "No app to install and no file to send",
            "Useful for relocating and overseas buyers who cannot fly in",
          ],
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
        proof: {
          label: "Explore Aerial Tour",
          href: "https://www.360aerialtours.com/James-Aguilar/470-S-Ramona-Ave-Lake-Alfred.html",
        },
        example: { kind: "experience", slug: "aerial-360" },
      },
    ],
  },

  {
    id: "video",
    name: "Video and Marketing",
    intro:
      "The assets that carry the listing off the MLS and into a feed, an inbox and a shareable link.",
    cover: key.lanai,
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
        /* The studio film, which is the branded social cut in its own right. */
        example: { kind: "film", film: "brand" },
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
          kind: "checklist",
          title: "What the page carries",
          steps: [
            "Header video and the full photograph gallery",
            "The 3D tour, the dollhouse and the floor plan embedded",
            "Property details, features and neighbourhood information",
            "Enquiry form routed to the agent",
            "Branded version for marketing, unbranded version for the MLS",
          ],
        },
      },
    ],
  },

  {
    id: "enhancement",
    name: "Property Enhancement",
    intro:
      "What happens to the photographs after the shoot. The difference between a room and a room a buyer can picture themselves in.",
    cover: key.twilight,
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
          kind: "checklist",
          title: "How a room gets staged",
          steps: [
            "You pick the rooms and the style from the delivered photographs",
            "Furniture matched to the room's scale, light direction and shadows",
            "Sofas, tables, rugs, artwork and soft furnishing added to the frame",
            "Staged and unstaged versions of every frame delivered",
            "Priced per image, so you stage the three rooms that matter",
          ],
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
        /* Blue skies, clean-up and twilight each have their own block below.
           What is left here is the colour and exposure correction that carries
           no separate name. */
        alsoIncludes: ["Colour correction", "Exposure balancing", "Lens distortion correction"],
        /* The second clean-up pair rather than the first: the drive frame is
           already carrying the de-cluttering block further down, and the aerial
           shows the correction working across a whole lot rather than one
           surface. */
        example: {
          kind: "before-after",
          before: cleanupPairs[1].before,
          after: cleanupPairs[1].after,
          beforeLabel: cleanupPairs[1].beforeLabel,
          afterLabel: cleanupPairs[1].afterLabel,
        },
      },
      {
        id: "virtual-twilight",
        title: "Virtual Twilight",
        summary:
          "A daytime exterior taken to dusk: the sky turned, the windows warmed and the landscape lighting brought up.",
        value:
          "Twilight frames are the ones buyers stop on, and this one costs no second visit, no waiting on a sunset and no callout after dark.",
        included: true,
        example: {
          kind: "before-after",
          before: twilightPair.before,
          after: twilightPair.after,
          beforeLabel: twilightPair.beforeLabel,
          afterLabel: twilightPair.afterLabel,
        },
      },
      {
        id: "decluttering",
        title: "De-cluttering and Clean-up",
        summary:
          "Bins, hoses, cars and clutter taken out of frame, driveways and paving cleaned, tyre marks and stains lifted.",
        value:
          "The property shows the way the seller wishes it had looked on the day, without a pressure washer or a second appointment.",
        included: true,
        alsoIncludes: ["Blue sky replacement", "Driveway and paving clean-up", "Minor de-cluttering"],
        /* Both pairs are the studio's own before and after files of the same
           frame, which is why they sit on a slider rather than side by side. */
        example: {
          kind: "before-after",
          before: cleanupPairs[0].before,
          after: cleanupPairs[0].after,
          beforeLabel: cleanupPairs[0].beforeLabel,
          afterLabel: cleanupPairs[0].afterLabel,
        },
      },
    ],
  },

  {
    id: "listing-support",
    name: "Listing Support",
    intro:
      "The unglamorous half of getting a listing live, handled so the agent can be somewhere else.",
    cover: key.entry,
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
          kind: "checklist",
          title: "What goes behind the address",
          steps: [
            "One address printed on the yard sign and in the listing",
            "The 3D tour, the video and the photographs behind it",
            "Open at midnight, on a phone, with nothing to install",
            "Branded and unbranded versions of the same page",
            "Live from the moment the listing goes up",
          ],
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
