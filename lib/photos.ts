/**
 * The photograph library: the studio's delivered work, mapped to the service
 * that produced it.
 *
 * Everything here comes out of `public/Images`, from the seven folders the
 * studio supplied. Those folder names are the studio's own filing and describe
 * a workflow rather than a taxonomy, so the mapping is stated once, here,
 * instead of being re-guessed at every call site:
 *
 *   Images/HDR                 38 bracketed interiors, blended by hand.
 *                              -> Real Estate Photography, HDR Photography,
 *                                 the room-by-room coverage index
 *   Images/Exterior            43 exteriors: elevations, approach, pool,
 *                              lanai, grounds.
 *                              -> Real Estate Photography, coverage index
 *   Images/Aerial               6 drone frames of the house and the lot.
 *                              -> Aerial and Drone Photography
 *   Images/Aerial Cleanup       the same 6 frames, retouched.
 *                              -> De-cluttering and clean-up (the "after")
 *   Images/Exterior Cleanup     7 exteriors, retouched. Filenames match their
 *                              originals in Images/Exterior.
 *                              -> De-cluttering and clean-up (the "after")
 *   Images/Twilight             Aerial (3), converted to dusk. Its daytime
 *                              original is Images/Aerial/Aerial (3).jpg.
 *                              -> Virtual Twilight (the "after")
 *   Images/Aerial Borderline    Aerial (1) with the lot boundary drawn on.
 *                              -> Aerial and Drone Photography (lot lines)
 *
 * Three of those folders only mean anything in pairs, and the pairing is by
 * filename: `Exterior Cleanup/Exterior (36).jpg` is the retouched version of
 * `Exterior/Exterior (36).jpg`, and `Twilight/Aerial (3).jpg` is the dusk
 * conversion of `Aerial/Aerial (3).jpg`. Same frame, same crop, one difference.
 * That is what makes the before/after sliders on this site honest rather than
 * two photographs of similar-looking rooms.
 *
 * Paths are left unencoded on purpose. The folders contain spaces and the
 * filenames contain parentheses; `next/image` encodes `src` itself when it
 * builds the optimiser URL, so pre-encoding here would send `%2520` to the
 * server and 404.
 */

export type Photo = { src: string; alt: string };

/** A named set of frames. Shape matches what the coverage gallery renders. */
export type PhotoGroup = { room: string; images: Photo[] };

const frame = (folder: string, file: string, alt: string): Photo => ({
  src: `/Images/${folder}/${file}`,
  alt,
});

const hdr = (n: number, alt: string, suffix = "-HDR") =>
  frame("HDR", `HDR (${n})${suffix}.jpg`, alt);

const ext = (n: number, alt: string) => frame("Exterior", `Exterior (${n}).jpg`, alt);

const aerial = (n: number, alt: string) => frame("Aerial", `Aerial (${n}).jpg`, alt);

/* ------------------------------------------------------------------ *
 * Images/HDR - the interiors, by room
 *
 * All 38 frames, grouped the way a buyer reads a house rather than the way the
 * files happen to sort. The whole set renders in the coverage index, because
 * the argument that section makes is completeness, and completeness does not
 * survive a curated selection.
 * ------------------------------------------------------------------ */

export const interiorGroups: PhotoGroup[] = [
  {
    room: "Kitchens",
    images: [
      hdr(16, "White kitchen with a marble-topped island, glass pendant lights and blue walls"),
      hdr(21, "Kitchen island and range wall in white cabinetry with a tiled backsplash"),
      hdr(26, "Kitchen with a counter-depth refrigerator, breakfast stools at the island and pendant lighting"),
      hdr(11, "Open kitchen looking through to the living space beneath a vaulted ceiling"),
      hdr(1, "Entry hall opening onto the kitchen counter, with wood-look flooring and a runner"),
    ],
  },
  {
    room: "Living spaces",
    images: [
      hdr(186, "Living room with a stacked stone fireplace wall, open through to the kitchen"),
      hdr(46, "Living room with a curved sectional facing a mounted television and the kitchen island"),
      hdr(91, "Living room with a stone fireplace, mounted television and round mirrors either side"),
      hdr(31, "Living room with a stone fireplace and sofa, open to the hallway beyond"),
      hdr(36, "Living room in blue and grey with sofas arranged around a patterned rug"),
      hdr(41, "Living room with a stone column, sectional seating and the kitchen behind"),
      hdr(56, "Living space looking through a wide opening to the screened pool deck", "-HDR-2"),
    ],
  },
  {
    room: "Dining",
    images: [
      hdr(116, "Dining table with a plaid runner set between the kitchen island and the windows"),
      hdr(121, "Dining area and kitchen seen together, table dressed and television mounted beyond"),
      hdr(51, "Long timber dining table beneath shuttered windows and framed prints"),
      hdr(66, "Vaulted kitchen and dining space opening onto the pool deck"),
    ],
  },
  {
    room: "Bedrooms",
    images: [
      hdr(106, "Bedroom with a timber bed, striped coverlet and a shuttered window"),
      hdr(96, "Bedroom with a timber bed frame, striped bedding and framed prints above the headboard"),
      hdr(141, "Bedroom in blue with a padded headboard, bench seat and mounted television"),
      hdr(161, "Bedroom with a white headboard, framed prints and a ceiling fan"),
      hdr(166, "Bedroom with framed prints above the bed, upholstered ottomans and a ceiling fan"),
      hdr(86, "Bedroom with a grey bed, bookshelf and windows to the garden"),
      hdr(76, "Bedroom with plantation shutters, a grey bed and a mirrored corner"),
      hdr(71, "Child's bedroom with a fitted bookcase wall, red ottoman and grey bed"),
      hdr(171, "Bedroom opening through sliding doors onto the screened pool deck"),
      hdr(181, "Child's room with a full glass wall onto the pool and a wall-mounted air handler"),
    ],
  },
  {
    room: "Bathrooms",
    images: [
      hdr(146, "Walk-in shower in large-format marble tile with a bench seat and glass screen"),
      hdr(151, "Double vanity in white with a glass shower and a view through to the bedroom"),
      hdr(101, "Bathroom with a tub and shower combination and a stone-topped vanity"),
      hdr(81, "Bathroom with a tub, shower curtain and vanity beneath framed art"),
      hdr(131, "Powder room with a vanity, framed art and blue walls"),
      hdr(176, "Bathroom looking through to a child's bedroom, television mounted on the wall"),
    ],
  },
  {
    room: "Studies, laundry and storage",
    images: [
      hdr(6, "Study with a fitted bookcase wall, desk and shuttered window"),
      hdr(111, "Home office with a desk, built-in shelving and framed art on blue walls"),
      hdr(126, "Laundry room with a side-by-side washer and dryer beneath fitted cabinetry"),
      hdr(136, "Hallway with a bedroom on one side and the laundry room on the other"),
      hdr(156, "Walk-in closet fitted out with hanging rails and shelving"),
    ],
  },
  {
    room: "Indoor to outdoor",
    images: [
      hdr(61, "Interior looking out across the pool deck through the screen enclosure"),
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Images/Exterior - the outside, in the order a visitor arrives
 * ------------------------------------------------------------------ */

export const exteriorGroups: PhotoGroup[] = [
  {
    room: "Elevations",
    images: [
      ext(39, "Front elevation of a single-storey Florida home in sage and stone, set back across a mown lawn"),
      ext(42, "Front of the house framed by live oaks, with palms and mulched planting beds"),
      ext(47, "Front elevation seen across the lawn beneath mature oaks on a clear day"),
      ext(41, "Front of the house under the canopy of a large live oak"),
      ext(40, "Front elevation with palms, planting beds and open lawn out to the street"),
      ext(44, "The house set back on its lot, lawn and mature oaks in the foreground"),
      ext(34, "The property seen across the neighbouring lawn through the oaks"),
    ],
  },
  {
    room: "Approach and entry",
    images: [
      ext(46, "Covered front entry with stone piers, painted rocking chairs and a paver walk"),
      ext(38, "Front porch in stone and siding with two rocking chairs beside the door"),
      ext(45, "Paver driveway curving up to the house past a stone mailbox pier"),
      ext(36, "Paver driveway running to a side-load garage beside the planting beds"),
      ext(1, "Brick entrance wall and gated approach to the Sequoyah Ridge community"),
    ],
  },
  {
    room: "Pool and spa",
    images: [
      ext(14, "Screened pool and raised tile spa on travertine, with the house beyond"),
      ext(24, "Pool and spa under a full screen enclosure, loungers set out on the deck"),
      ext(18, "Screened pool holding the reflection of the sky and the roofline"),
      ext(9, "Pool and spa inside the screen enclosure, seen from the corner of the deck"),
      ext(19, "Pool deck with loungers and open sliding doors to the living space"),
      ext(2, "Pool inside the screen enclosure with painted Adirondack chairs on the deck"),
      ext(16, "Wide view of the screened pool with the house along one side"),
      ext(28, "Pool beside the stone chimney and gable of the rear elevation"),
      ext(27, "Pool deck looking through open sliders into the interior"),
      ext(8, "Full width of the lanai and pool inside the screen enclosure"),
    ],
  },
  {
    room: "Lanai and outdoor kitchen",
    images: [
      ext(10, "Summer kitchen on the lanai with a grill, teak dining table and travertine floor"),
      ext(11, "Vaulted outdoor kitchen and dining area opening onto the pool"),
      ext(7, "Summer kitchen and dining table set under the lanai roof"),
      ext(6, "Outdoor dining table laid under the covered lanai beside the pool"),
      ext(5, "Covered lanai with navy outdoor sofas, a television and sliders to the interior"),
      ext(3, "Outdoor sitting area in navy and wicker under the lanai roof"),
      ext(4, "Covered lanai seating group in travertine with a mounted television"),
      ext(23, "Outdoor seating group in navy and wicker under the covered lanai"),
      ext(12, "Covered outdoor room in travertine with fitted cabinetry and the spa beyond"),
      ext(13, "Covered outdoor room open to the pool deck through full-height glass"),
    ],
  },
  {
    room: "Grounds",
    images: [
      ext(29, "Travertine path and stone grill island in the rear garden, framed by palms"),
      ext(31, "Rear elevation across the lawn, with palms and planting out to the boundary"),
      ext(33, "Rear lawn under oaks and palms, screen enclosure to one side"),
      ext(35, "Rear of the house seen across the lawn, screen enclosure in profile"),
      ext(30, "Paved path and gate leading back to the lanai through the planting"),
      ext(32, "Side lawn with palms and mature planting along the property line"),
    ],
  },
  {
    room: "Details",
    images: [
      ext(20, "Stacked stone pier and travertine detail beside the lanai"),
      ext(21, "Stacked stone wall in mixed slate tones"),
      ext(22, "Outdoor shower in stacked stone off the pool deck"),
      ext(25, "Pool bath and cabana room with a wall-mounted television"),
      ext(26, "Outdoor half bath with a basin and window"),
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Images/Aerial and Images/Aerial Borderline
 * ------------------------------------------------------------------ */

/** Straight down: the shape of the lot and how it sits among its neighbours. */
export const overheadAerial = aerial(
  1,
  "Overhead drone frame of the property showing the roof, the lawn, the pool cage and the cul-de-sac",
);

/** The same overhead frame with the boundary drawn on. */
export const lotLineAerial = frame(
  "Aerial Borderline",
  "Aerial (1).jpg",
  "The same overhead drone frame with the lot boundary drawn on as a white outline",
);

/** The daytime original that the twilight conversion is made from. */
export const frontAerialDay = aerial(
  3,
  "Front elevation of the house photographed from the air in daylight",
);

export const aerialGroup: PhotoGroup = {
  room: "From the air",
  images: [
    overheadAerial,
    aerial(2, "Low aerial of the front elevation, the paver drive and the mature oaks on the lot"),
    frontAerialDay,
    aerial(4, "Aerial three-quarter view of the house, the drive and the planted front garden"),
    aerial(5, "Aerial of the front of the house across the lawn and the street"),
    aerial(6, "Aerial along the elevation showing the roofline, the drive and the tree canopy"),
    lotLineAerial,
  ],
};

/* ------------------------------------------------------------------ *
 * The retouching pairs
 * ------------------------------------------------------------------ */

export type Pair = {
  id: string;
  before: Photo;
  after: Photo;
  beforeLabel: string;
  afterLabel: string;
  /** What actually changed between the two files. */
  caption: string;
};

/** Images/Twilight. A midday aerial taken to dusk, with the lights on. */
export const twilightPair: Pair = {
  id: "twilight-front",
  before: frontAerialDay,
  after: frame(
    "Twilight",
    "Aerial (3).jpg",
    "The same aerial frame converted to twilight, with a violet sky and the house and landscape lighting lit",
  ),
  beforeLabel: "Shot at midday",
  afterLabel: "Virtual twilight",
  caption: "Sky turned, windows warmed, landscape and soffit lighting brought up.",
};

/**
 * Images/Exterior Cleanup and Images/Aerial Cleanup, paired with their
 * originals by filename.
 *
 * Nine pairs, not thirteen. Four of the delivered clean-up files - Exterior
 * (44), Exterior (46), Aerial (5) and Aerial (6) - are pixel-identical to the
 * frames they were exported from, so there is nothing to drag a slider across
 * and they are left out rather than shown as a comparison that shows nothing.
 * Their originals still render in full in the coverage index.
 *
 * The work in the rest is retouching of the ground plane: paver staining,
 * tyre marks and shadow mottling lifted so the drive and paths read clean.
 * The captions say so, because a slider that promises a transformation and
 * delivers a tidied driveway is worse than one that says what it did.
 */
const cleanup = (
  id: string,
  before: Photo,
  folder: "Exterior Cleanup" | "Aerial Cleanup",
  file: string,
  afterAlt: string,
  caption: string,
): Pair => ({
  id,
  before,
  after: frame(folder, file, afterAlt),
  beforeLabel: "As photographed",
  afterLabel: "Cleaned up",
  caption,
});

export const cleanupPairs: Pair[] = [
  cleanup(
    "drive-mailbox",
    ext(45, "Paver driveway curving to the house past a stone mailbox pier, the pavers mottled and stained"),
    "Exterior Cleanup",
    "Exterior (45).jpg",
    "The same driveway with the staining lifted and the paver colour evened out",
    "The heaviest retouch in the set: staining across the full width of the drive taken back to an even paver colour.",
  ),
  cleanup(
    "drive-garage",
    ext(36, "Paver driveway running to the garage, with staining and tyre marks across the pavers"),
    "Exterior Cleanup",
    "Exterior (36).jpg",
    "The same driveway cleaned, with the marks in front of the garage removed",
    "Tyre marks and stains in front of the garage removed, paving evened out.",
  ),
  cleanup(
    "aerial-front-garden",
    aerial(3, "Aerial of the front elevation with marks across the drive and the paths"),
    "Aerial Cleanup",
    "Aerial (3).jpg",
    "The same aerial frame with the drive and paths cleaned",
    "Drive, paths and edging cleaned up from the air, where every mark reads at once.",
  ),
  cleanup(
    "aerial-drive",
    aerial(4, "Aerial three-quarter view with staining visible on the drive and paving"),
    "Aerial Cleanup",
    "Aerial (4).jpg",
    "The same aerial frame with the drive cleaned and the marks taken out",
    "Staining across the drive and the parking apron lifted.",
  ),
  cleanup(
    "rear-lawn",
    ext(35, "Rear of the house across the lawn, with wear and marks in the grass and paving"),
    "Exterior Cleanup",
    "Exterior (35).jpg",
    "The same rear view with the lawn and paving evened out",
    "Wear across the rear lawn and paving evened out.",
  ),
  cleanup(
    "aerial-approach",
    aerial(2, "Low aerial of the front elevation and the paver drive, marks visible on the paving"),
    "Aerial Cleanup",
    "Aerial (2).jpg",
    "The same low aerial with the drive and forecourt cleaned",
    "Forecourt and drive cleaned in the approach frame.",
  ),
  cleanup(
    "aerial-overhead",
    aerial(1, "Overhead frame of the property with marks across the lawn and the drive"),
    "Aerial Cleanup",
    "Aerial (1).jpg",
    "The same overhead frame with the lawn and drive tidied",
    "Marks on the lawn beside the drive taken out of the overhead frame.",
  ),
  cleanup(
    "elevation-front",
    ext(39, "Front elevation across the lawn, with marks on the path and the grass"),
    "Exterior Cleanup",
    "Exterior (39).jpg",
    "The same front elevation with the path and lawn cleaned",
    "Path and lawn cleaned in the lead elevation frame.",
  ),
  cleanup(
    "elevation-oaks",
    ext(47, "Front elevation beneath the oaks, with marks across the grass"),
    "Exterior Cleanup",
    "Exterior (47).jpg",
    "The same elevation with the lawn evened out",
    "Lawn evened out under the oaks.",
  ),
];

/** Every genuine before and after the studio delivered, twilight first. */
export const retouchPairs: Pair[] = [twilightPair, ...cleanupPairs];

/* ------------------------------------------------------------------ *
 * Selections
 *
 * Short, deliberately ordered picks for the places that show a handful of
 * frames rather than a whole shoot: the service examples and the homepage.
 * ------------------------------------------------------------------ */

const pick = (group: PhotoGroup, ...i: number[]) => i.map((n) => group.images[n]);

const g = (groups: PhotoGroup[], room: string) => {
  const found = groups.find((x) => x.room === room);
  if (!found) throw new Error(`Unknown photo group: ${room}`);
  return found;
};

const kitchens = g(interiorGroups, "Kitchens");
const living = g(interiorGroups, "Living spaces");
const bedrooms = g(interiorGroups, "Bedrooms");
const bathrooms = g(interiorGroups, "Bathrooms");
const dining = g(interiorGroups, "Dining");
const elevations = g(exteriorGroups, "Elevations");
const pool = g(exteriorGroups, "Pool and spa");
const lanai = g(exteriorGroups, "Lanai and outdoor kitchen");
const approach = g(exteriorGroups, "Approach and entry");

/** Six frames that stand for a full shoot: outside, in, and the pool. */
export const photographySelection: Photo[] = [
  ...pick(elevations, 0),
  ...pick(kitchens, 0),
  ...pick(living, 0),
  ...pick(pool, 0),
  ...pick(bedrooms, 0),
  ...pick(lanai, 0),
];

/** The frames where the exposure blend is doing the visible work: windows. */
export const hdrSelection: Photo[] = [
  ...pick(living, 6),
  ...pick(kitchens, 1),
  ...pick(dining, 3),
  ...pick(bathrooms, 1),
  ...pick(bedrooms, 8),
  ...pick(interiorGroups[6], 0),
];

/** Aerial coverage, lead frame first, lot lines last. */
export const aerialSelection: Photo[] = aerialGroup.images;

/** Single frames used where one photograph has to carry a section. */
export const key = {
  elevation: elevations.images[0],
  entry: approach.images[0],
  pool: pool.images[0],
  lanai: lanai.images[0],
  kitchen: kitchens.images[0],
  living: living.images[0],
  dining: dining.images[0],
  bedroom: bedrooms.images[0],
  bathroom: bathrooms.images[0],
  overhead: overheadAerial,
  lotLines: lotLineAerial,
  twilight: twilightPair.after,
} as const;
