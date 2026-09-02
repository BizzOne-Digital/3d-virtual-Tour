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
  cleanupPairs,
  hdrSelection,
  key,
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
  /**
   * One frame, shown large. For services whose output is a single artefact.
   * `aspect` overrides the default 3:2 frame where the artefact is not
   * landscape - a portrait floor plan contained in a wide box is a sliver.
   * `maxWidth` caps the frame where the source file is smaller than the column
   * it lands in: stretching a 640px export across 1130px upscales it to mush
   * and gives the block more weight than its content earns.
   */
  | { kind: "image"; image: Photo; caption?: string; aspect?: string; maxWidth?: string }
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
          "High-quality interior and exterior photography designed to showcase a property at its best and help listings stand out online.",
        value:
          "Buyers scroll past listings in under a second. Professional coverage is what earns the second look, on the MLS, on Zillow and in the feed.",
        price: "Packages from $155",
        /* One frame, not a contact sheet: the same lead frame the homepage
           uses for this service, so the two pages agree. */
        example: {
          kind: "image",
          image: key.kitchen,
          caption: "One frame from a standard listing shoot. The package delivers 50.",
        },
      },
      {
        id: "hdr-photography",
        title: "HDR Photography",
        summary:
          "Multiple exposures are professionally blended together to create bright, detailed images with balanced windows, interiors, highlights, and shadows.",
        value:
          "A camera cannot hold a bright Florida window and a shaded interior in one exposure. HDR is how a room looks the way it looked when you stood in it.",
        /* Every frame here is a room shot against its own glass: the pool wall,
           the lanai sliders, the window over the vanity. That is where the
           blend does visible work, so that is what the example shows. */
        example: {
          kind: "image",
          image: hdrSelection[0],
          caption: "A room shot against its own glass, which is where the exposure blend does visible work.",
        },
      },
      {
        id: "aerial-drone",
        title: "Aerial and Drone Photography",
        summary:
          "Professional aerial images that showcase the property, lot, neighborhood, nearby amenities, golf courses, waterfront, and surrounding area from a unique perspective.",
        value:
          "In Florida the setting is often the product. Aerial coverage shows the pool, the lake frontage and the community that a ground-level photograph cannot.",
        price: "From $135",
        alsoIncludes: ["Overhead and oblique coverage", "Lot boundary overlay"],
        /* Ends on the boundary overlay: the same overhead frame with the lot
           lines drawn on, which is the one aerial deliverable an agent has to
           be shown to know it exists. */
        example: {
          kind: "image",
          image: key.overhead,
          caption: "Straight down: the shape of the lot and how it sits among its neighbours.",
        },
      },
      {
        id: "golf-private-events",
        title: "Golf and Private Events",
        summary:
          "Professional photography and video coverage for golf tournaments, corporate outings, private parties, special events, and other memorable occasions.",
        value:
          "The day happens once. Coverage on the day is what the club, the sponsor and the host have to market the next one with.",
        /* The supplied event set, as one frame: the tee shot, the crew on the
           course, the gallery at the green, the aerial of the club and the
           reception after. 1536x1024 is exactly 3:2, so it needs no aspect
           override. */
        example: {
          kind: "image",
          image: img(
            "golf.png",
            "Golf and private event coverage: a golfer driving at sunset before a gallery, a videographer working the course, a dressed dinner table, a crowd at the green, a champagne toast, an aerial of the clubhouse and a tray of filled flutes",
          ),
          caption:
            "Coverage across the whole day: the play, the gallery, the course from the air and the reception after.",
        },
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
          "Immersive, interactive property tours that allow buyers to virtually walk through a home from anywhere, using a phone, computer, or tablet.",
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
          kind: "image",
          image: img(
            "3dimage.png",
            "A 3D dollhouse model of a house with the roof lifted off, every room furnished and visible at once",
          ),
          /* The file is portrait, 722x908. The frame is set to that exact ratio
             so `object-contain` has nothing to letterbox, and capped narrow
             because this block renders in the full-width stacked variant: a
             portrait image stretched across the whole column sits marooned in
             the middle of a very wide box. */
          aspect: "aspect-722/908",
          maxWidth: "max-w-sm",
          caption: "The whole house in one model. Rotate, tilt and click into any room at floor level.",
        },
      },
      {
        id: "floor-plans",
        title: "2D Interactive Floor Plans",
        summary:
          "Floor plans give buyers a better understanding of the layout, room relationships, and overall flow.",
        value:
          "Room dimensions and flow are the first thing a serious buyer asks for and the last thing most listings provide.",
        included: true,
        example: {
          kind: "image",
          image: img(
            "ex-floorplan-2d.jpg",
            "Overhead floor plan of a two-bedroom home drawn to scale and fully furnished, with the terrace, kitchen, bathrooms and closets laid out",
          ),
          aspect: "aspect-1400/2018",
          caption: "Every floor drawn to scale from the 3D capture, furnished, with fixtures and openings marked.",
        },
      },
      {
        id: "virtual-reality",
        title: "Virtual Reality",
        summary:
          "Immersive, interactive property tours that allow buyers to virtually walk through a home from anywhere, using a compatible VR headset.",
        value:
          "For relocating and overseas buyers, a headset walkthrough is the closest thing to a showing without a flight.",
        included: true,
        example: {
          kind: "image",
          image: img(
            "ex-vr-headset.jpg",
            "A virtual reality headset with a property interior showing through both lenses, beside a cardboard viewer",
          ),
          aspect: "aspect-1600/900",
          caption: "The same capture in a headset. Works on standard headsets and a phone viewer, with no app to install.",
        },
      },
      {
        id: "aerial-360",
        title: "360 Aerial Virtual Tours",
        summary:
          "An interactive 360° experience that allows potential buyers to look around the property and explore different areas at their own pace, with zoom-in and zoom-out capabilities.",
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
          "Professional property videos help tell the story of the home.",
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
          "A professionally produced property video branded with the agent's name and information, ready to share on Facebook, Instagram, YouTube, and other social media platforms.",
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
          kind: "image",
          image: img(
            "ex-property-website.jpg",
            "A single property website: agent logo bar, a header video over the address, and a panel of property details beside the description",
          ),
          aspect: "aspect-1200/1380",
          caption: "Header video, gallery, tour, floor plan and details behind one address, branded to the agent.",
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
        /* The studio's own staging pair: one frame, empty and furnished, same
           camera position and same light. Both versions are delivered. */
        example: {
          kind: "before-after",
          before: img(
            "ex-staging-before.jpg",
            "An empty open-plan living and dining room with bare wood floors, looking through to the kitchen and the sliding doors",
          ),
          after: img(
            "ex-staging-after.jpg",
            "The same room virtually staged with a dining table and chairs, a grey sofa, a rug, a coffee table and framed art",
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
          "A daytime exterior photograph is professionally transformed into a beautiful twilight-style image, creating a dramatic evening presentation without requiring a separate sunset photography appointment.",
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
          "Small distracting objects can be digitally removed from photographs to help rooms appear cleaner, more organized, and ready for presentation.",
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
      {
        id: "blue-skies",
        title: "Blue Skies",
        summary:
          "Dull, gray, or overcast skies can be professionally enhanced or replaced with attractive blue skies to improve the overall appearance of exterior photographs.",
        value:
          "Florida weather does not book around a listing. The exteriors go out under a good sky whatever the day of the shoot gave you.",
        included: true,
        /* A delivered exterior rather than a slider: the studio's before and
           after files are ground-plane retouching, so pairing this frame with
           one of them would show a cleaned driveway and call it a sky. */
        example: {
          kind: "image",
          image: key.elevation,
          caption:
            "The sky as delivered. Applied to every exterior frame during processing, at no extra cost and with no reshoot.",
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
          kind: "image",
          image: img(
            "ex-open-house.jpg",
            "A 24 Hour Open House yard sign carrying a property web address, set beside a photograph of the house it points to",
          ),
          aspect: "aspect-1600/1236",
          caption: "One address on the yard sign. The tour, the video and the photographs sit behind it, open at midnight.",
        },
      },
      {
        id: "mls-data-entry",
        title: "MLS Data Entry",
        summary:
          "Assistance entering property information and media into the MLS, helping save agents valuable time when preparing their listings.",
        value:
          "The listing goes live complete and correct, and the agent gets the evening back.",
        /* The supplied set, as one frame: the listing being keyed in against the
           photo grid, the media it pulls from, the floor plan and the draft on
           screen. 1536x1024 is exactly 3:2, so it needs no aspect override. */
        example: {
          kind: "image",
          image: img(
            "mls.png",
            "MLS data entry: a listing being keyed into a form beside its photograph grid, with the interiors, a camera reviewing a frame, a twilight exterior, a floor plan and the draft open on a laptop",
          ),
          caption:
            "Details keyed in from your sheet, photographs ordered, tour, floor plan and video attached, draft back to you before it goes live.",
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
