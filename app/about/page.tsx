import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { approach, business, pageHeroes } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "James Aguilar is a Zillow Certified and Google Trusted real estate photographer serving Winter Haven and Central Florida with photography, aerial, 3D tours and listing marketing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | 3D Interactive Virtual Tours",
    description:
      "Zillow Certified and Google Trusted real estate photography for Winter Haven and Central Florida.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A working photographer, not a stock library."
        copy="Zillow Certified and Google Trusted, shooting listings for realtors and sellers across Winter Haven and Central Florida."
        image={pageHeroes.about.src}
        alt={pageHeroes.about.alt}
      />

      <section className="shell border-t border-line py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[16ch] text-display-sm font-medium uppercase text-ivory">
              Every image on this site is a house we photographed.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <p className="max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                {business.name} is run by {business.contactName}, a {business.contactTitle.toLowerCase()}
                {" "}working out of Winter Haven. The properties here are ordinary
                Florida listings: three-bedroom homes, pool houses, condos, new
                construction. They are the listings realtors actually have to sell.
              </p>
              <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                The offer is deliberately wide. An agent should be able to book one
                appointment and walk away with the photographs, the aerial coverage,
                the 3D tour, the dollhouse, the floor plan, the video and the
                property page, instead of chasing five suppliers and hoping the
                assets match.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal as="figure" className="relative aspect-4/3 w-full overflow-hidden bg-surface md:aspect-21/9">
        <Image
          src={pageHeroes.aboutBand.src}
          alt={pageHeroes.aboutBand.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Reveal>

      <section className="shell py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-[14ch] text-display font-medium uppercase text-ivory">
            Our approach
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:mt-20">
          {approach.map((step, i) => (
            <Reveal as="li" key={step.number} index={i} className="border-t border-line pt-7">
              <p className="text-2xl font-medium tracking-tight text-gold/80">{step.number}</p>
              <h3 className="mt-5 text-xl font-medium tracking-tight uppercase text-ivory">
                {step.title}
              </h3>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-muted md:text-base">
                {step.copy}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CTA
        title="Book your next listing."
        copy="Photography, aerial coverage, 3D tours and video, delivered in 18 hours or the same day."
      />
    </>
  );
}
