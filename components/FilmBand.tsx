import { films } from "@/lib/content";
import { VideoEmbed } from "./VideoEmbed";
import { Reveal } from "./Reveal";

/**
 * The studio film, near the top of the page where it does the most work.
 * Layout family used nowhere else: statement on the left shoulder, one wide
 * frame breaking past the text column.
 */
export function FilmBand() {
  const film = films.brand;

  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <h2 className="max-w-[15ch] text-display font-medium uppercase text-ivory">
              Watch the difference.
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:col-start-8 lg:pb-3">
            <p className="max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
              Under a minute on how we photograph a property and build the
              experience around it.
            </p>
          </Reveal>
        </div>

        <Reveal index={1}>
          <VideoEmbed
            id={film.id}
            title={film.title}
            poster={film.poster}
            posterAlt={film.posterAlt}
            start={film.start}
            sizes="(max-width: 1024px) 100vw, 90vw"
            className="mt-12 aspect-video md:mt-16"
          />
        </Reveal>
      </div>
    </section>
  );
}
