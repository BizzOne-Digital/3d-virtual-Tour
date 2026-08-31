import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Interior-page opening. Shorter than the home hero on purpose: these pages
 * are read, not entered.
 */
export function PageHero({
  title,
  copy,
  image,
  alt,
}: {
  title: string;
  copy?: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative flex min-h-[74vh] flex-col justify-end overflow-hidden lg:min-h-[80vh]">
      <div className="absolute inset-0 bg-surface">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 scrim-bottom" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-44 scrim-top" />
      </div>

      <div className="shell relative pt-[72px] pb-14 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <h1 className="max-w-[20ch] text-display font-medium uppercase text-ivory">
              {title}
            </h1>
          </Reveal>
          {copy ? (
            <Reveal index={1} className="lg:col-span-6">
              <p className="max-w-[46ch] border-l border-gold/50 pl-5 text-base leading-relaxed text-ivory/85 md:text-lg">
                {copy}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
