import Image from "next/image";
import { experiences, films, tours } from "@/lib/content";
import type { Example } from "@/lib/services";
import { BeforeAfter } from "./BeforeAfter";
import { ExperienceCard } from "./ExperienceCard";
import { TourEmbed } from "./TourEmbed";
import { VideoEmbed } from "./VideoEmbed";

/**
 * Renders whatever a service uses to prove itself.
 *
 * A server component on purpose: only the three interactive kinds pull client
 * JavaScript, and they already own that boundary themselves. A gallery or a
 * still costs nothing at runtime.
 *
 * Adding a new kind of proof means adding a branch here and a variant to
 * `Example` in lib/services.ts. Nothing else in the tree needs to know.
 */
export function ServiceExample({
  example,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  example: Example;
  sizes?: string;
  priority?: boolean;
}) {
  switch (example.kind) {
    case "before-after":
      return (
        <BeforeAfter
          before={example.before}
          after={example.after}
          beforeLabel={example.beforeLabel}
          afterLabel={example.afterLabel}
          sizes={sizes}
          priority={priority}
        />
      );

    case "gallery":
      return <Gallery images={example.images} sizes={sizes} priority={priority} />;

    case "image":
      return (
        <figure>
          <div className="relative aspect-3/2 overflow-hidden rounded-image bg-surface">
            <Image
              src={example.image.src}
              alt={example.image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-contain"
            />
          </div>
          {example.caption ? (
            <figcaption className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted">
              {example.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "tour": {
      const tour = tours.find((t) => t.slug === example.slug);
      if (!tour) return null;
      return <TourEmbed tours={[tour]} />;
    }

    case "experience": {
      const experience = experiences.find((e) => e.slug === example.slug);
      if (!experience) return null;
      return (
        <ExperienceCard experience={experience} sizes={sizes} priority={priority} />
      );
    }

    case "checklist":
      return (
        <div className="rounded-image border border-line bg-surface/50 p-7 md:p-10">
          <h4 className="label text-gold">{example.title}</h4>
          <ol className="mt-7 flex flex-col">
            {example.steps.map((step, i) => (
              <li
                key={step}
                className="flex gap-5 border-t border-line py-4 text-sm leading-relaxed text-ivory/85 md:text-base"
              >
                <span className="shrink-0 tabular-nums text-gold/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      );

    case "film": {
      const film = films[example.film];
      return (
        <figure>
          <VideoEmbed
            id={film.id}
            title={film.title}
            poster={film.poster}
            posterAlt={film.posterAlt}
            start={film.start}
            sizes={sizes}
            className="aspect-video"
          />
          <figcaption className="label mt-4 flex flex-wrap items-baseline gap-x-4 text-muted-dim">
            {film.title}
            <span className="text-muted">{film.duration}</span>
          </figcaption>
        </figure>
      );
    }
  }
}

/**
 * Contact-sheet grid. The lead frame carries the section; the rest read as
 * evidence that the coverage is complete rather than as six equal tiles.
 * Cell count always matches image count, so the grid never shows a hole.
 */
function Gallery({
  images,
  sizes,
  priority,
}: {
  images: { src: string; alt: string }[];
  sizes: string;
  priority: boolean;
}) {
  const [lead, ...rest] = images;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      <figure className="relative col-span-2 aspect-3/2 overflow-hidden rounded-image bg-surface">
        <Image
          src={lead.src}
          alt={lead.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </figure>

      {rest.map((image) => (
        <figure
          key={image.src}
          className="relative aspect-4/3 overflow-hidden rounded-image bg-surface"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.04]"
          />
        </figure>
      ))}
    </div>
  );
}
