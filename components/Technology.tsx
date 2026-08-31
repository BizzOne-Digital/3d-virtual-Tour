import { experiencePillars, tours } from "@/lib/content";
import { TourEmbed } from "./TourEmbed";
import { Reveal } from "./Reveal";

/**
 * The section that has to prove the claim, so it carries the real product:
 * two live interactive tours running in the page rather than a photograph of
 * one. The pillars underneath describe exactly what the visitor just used.
 */
export function Technology() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 className="max-w-[14ch] text-display font-medium uppercase text-ivory">
                  Turn space into experience.
                </h2>
              </Reveal>
              <Reveal index={1}>
                <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
                  Buyers no longer decide from a set of static photographs. They
                  want to move through a space, understand its scale and see how
                  the light falls before they ever step inside.
                </p>
                <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
                  These are live tours. Open one and walk through it.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal index={1} className="lg:col-span-7">
            <TourEmbed tours={tours} />
          </Reveal>
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {experiencePillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} index={i} className="border-t border-line pt-6">
              <h3 className="label text-gold">{pillar.title}</h3>
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
                {pillar.copy}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
