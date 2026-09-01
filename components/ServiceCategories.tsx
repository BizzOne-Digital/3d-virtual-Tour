import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/services";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/**
 * The answer to "where are all my services".
 *
 * Five categories, named, counted, and with their contents listed inside the
 * tile rather than hidden behind it. A visitor should be able to read this one
 * section and know the whole offer without clicking anything.
 *
 * Five items, five cells: two wide on the first row, three on the second. The
 * grid is sized to the content rather than the content padded to the grid.
 */
const SPAN = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

const SIZES = [
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 46vw",
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 46vw",
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 31vw",
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 31vw",
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 31vw",
];

export function ServiceCategories() {
  return (
    <section className="border-t border-line bg-surface/40 py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>What we do</SectionLabel>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-8 text-display font-medium uppercase text-ivory">
              Everything you need to market a property.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-6">
          {categories.map((category, i) => (
            <Reveal
              as="article"
              key={category.id}
              index={i % 3}
              className={SPAN[i]}
            >
              <Link
                href={`/services#${category.id}`}
                className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-image bg-surface p-6 md:min-h-[26rem] md:p-8"
              >
                <Image
                  src={category.cover.src}
                  alt={category.cover.alt}
                  fill
                  sizes={SIZES[i]}
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-0 scrim-bottom" />

                <span className="relative">
                  <span className="flex items-baseline gap-3">
                    <h3 className="text-xl font-medium tracking-tight uppercase text-ivory transition-colors duration-300 group-hover:text-gold md:text-2xl">
                      {category.name}
                    </h3>
                    <span className="label tabular-nums text-gold/80">
                      {String(category.services.length).padStart(2, "0")}
                    </span>
                  </span>

                  <span className="mt-4 block max-w-[38ch] text-sm leading-relaxed text-ivory/75">
                    {category.services.map((s) => s.title).join(". ")}.
                  </span>

                  <span className="label mt-6 inline-flex items-center gap-2 text-gold">
                    See examples
                    <ArrowRight
                      aria-hidden
                      size={13}
                      weight="bold"
                      className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
