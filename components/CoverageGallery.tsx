import Image from "next/image";
import { coverage } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * A room-by-room index of one shoot's output.
 *
 * Grouped by room rather than shown as one long grid, because the argument is
 * completeness, and completeness only reads if the viewer can see the
 * categories being ticked off. Cell counts match image counts, so no group
 * ends on a gap.
 */
export function CoverageGallery() {
  return (
    <section className="border-t border-line bg-surface/40 py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[14ch] text-display font-medium uppercase text-ivory">
              {coverage.title}
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
              {coverage.copy}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-14 lg:mt-20 lg:gap-16">
          {coverage.groups.map((group, i) => (
            <Reveal key={group.room} index={i % 3}>
              <h3 className="label border-t border-line pt-5 text-gold">{group.room}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
                {group.images.map((image) => (
                  <li
                    key={image.src}
                    className="relative aspect-4/3 overflow-hidden rounded-image bg-surface"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.05]"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
