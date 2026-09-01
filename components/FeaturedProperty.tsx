import Image from "next/image";
import { cta, featuredProperty as fp } from "@/lib/content";
import { UnderlineLink } from "./ActionLink";
import { Reveal } from "./Reveal";

/**
 * Magazine cover. One property, one photograph, one line of type.
 * Deliberately the quietest section on the page in terms of copy volume.
 */
export function FeaturedProperty() {
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden lg:min-h-[100dvh]">
      <div className="absolute inset-0 bg-surface">
        <Image
          src={fp.image}
          alt={fp.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 scrim-bottom" />
      </div>

      <div className="shell relative pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[16ch] text-display font-medium uppercase text-ivory">
                {fp.headline}
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-ivory/85">
                {fp.copy}
              </p>
            </Reveal>
            <Reveal index={2}>
              <div className="mt-10">
                <UnderlineLink href={cta.services.href}>
                  {fp.ctaLabel}
                </UnderlineLink>
              </div>
            </Reveal>
          </div>

          <Reveal
            index={2}
            className="lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:text-right"
          >
            <dl className="border-t border-gold/40 pt-6">
              <dt className="label text-muted-dim">Location</dt>
              <dd className="mt-2 text-sm text-ivory">{fp.location}</dd>
              <dt className="label mt-6 text-muted-dim">Delivered</dt>
              <dd className="mt-2 text-sm text-ivory">{fp.discipline}</dd>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
