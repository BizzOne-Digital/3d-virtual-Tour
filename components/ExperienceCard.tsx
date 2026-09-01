import Image from "next/image";
import { ArrowUpRight, Compass, Cube } from "@phosphor-icons/react/dist/ssr";
import type { Experience } from "@/lib/content";

/**
 * One interactive tour, presented as the thing it is: a door to a live
 * experience hosted somewhere else.
 *
 * The whole card is a single anchor, so the target is the size of the card
 * rather than the size of the CTA, and the CTA inside it is a `span` styled as
 * a pill rather than a nested link, which would be invalid and would give
 * assistive tech two overlapping targets for one destination.
 *
 * It opens in a new tab because the destination is a full-screen viewer on
 * another domain: sending someone out of the site and leaving them to find
 * their way back is worse than a new tab, and `rel="noopener noreferrer"`
 * keeps the opener out of the destination's reach.
 *
 * The frame behind it is the studio's own photography, and the card names the
 * platform the tour runs on, so the still is never mistaken for the tour.
 */
const ICONS = {
  "matterport-3d": Cube,
  "aerial-360": Compass,
} as const;

export function ExperienceCard({
  experience,
  aspect = "aspect-16/10",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  experience: Experience;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const Icon = ICONS[experience.slug];

  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      /* Without this the link's accessible name is every word in the card:
         the photograph's alt, the heading, the paragraph and the two
         definition pairs, read out in full on every tab stop. The label names
         the destination instead, and the card's text stays where it is for
         sighted readers and for search. */
      aria-label={`${experience.kicker} on ${experience.platform}${
        experience.location ? `, ${experience.location}` : ""
      }. Opens in a new tab.`}
      className="group flex h-full flex-col overflow-hidden rounded-image border border-line bg-surface/50 transition-colors duration-500 hover:border-gold/60 focus-visible:border-gold/60"
    >
      <div className={`relative ${aspect} overflow-hidden bg-surface`}>
        <Image
          src={experience.poster}
          alt={experience.posterAlt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute inset-0 scrim-bottom" />

        <span className="label absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink-deep/70 px-4 py-2 text-gold backdrop-blur-sm">
          <Icon aria-hidden size={13} weight="bold" />
          Live tour
        </span>

        <span className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <span className="label block text-gold">{experience.kicker}</span>
          <span className="mt-3 block max-w-[18ch] text-xl font-medium tracking-tight uppercase text-ivory md:text-2xl">
            {experience.title}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-7">
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted md:text-base">
          {experience.copy}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
          <div>
            <dt className="label text-muted-dim">Runs on</dt>
            <dd className="mt-2 text-sm text-ivory">{experience.platform}</dd>
          </div>
          {experience.location ? (
            <div>
              <dt className="label text-muted-dim">Property</dt>
              <dd className="mt-2 text-sm text-ivory">{experience.location}</dd>
            </div>
          ) : null}
        </dl>

        <span className="label mt-7 inline-flex items-center justify-center gap-3 self-start rounded-full bg-gold px-7 py-4 text-ink transition-colors duration-300 group-hover:bg-gold-light">
          {experience.ctaLabel}
          <ArrowUpRight
            aria-hidden
            size={14}
            weight="bold"
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  );
}
