import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { approach, business, pageHeroes } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "3D Interactive Virtual Tours is a real estate photography and visual marketing studio built around architectural detail and immersive property presentation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | 3D Interactive Virtual Tours",
    description:
      "A real estate photography and visual marketing studio built around architectural detail and immersive property presentation.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We make properties impossible to ignore."
        copy="A photography and technology studio working with realtors and homeowners across Central Florida."
        image={pageHeroes.about.src}
        alt={pageHeroes.about.alt}
      />

      <section className="shell border-t border-line py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[16ch] text-display-sm font-medium uppercase text-ivory">
              A property is only as strong as the way it is presented.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <p className="max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                {business.name} is a real estate photography and visual marketing
                studio. We photograph architecture and interiors, cover properties
                from the air, and build interactive walkthroughs that let a buyer
                move through a home before they arrive.
              </p>
              <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                The work exists to do one job. Help realtors market a listing with
                confidence, and help homeowners present a home the way it deserves
                to be seen. That means paying attention to the details a camera
                usually flattens: how a room holds light, how a plan actually flows,
                how a facade sits in its setting.
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
              <p className="text-2xl font-medium tracking-tight text-gold/70">{step.number}</p>
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
        title="Work with us on your next listing."
        copy="Photography, aerial coverage and interactive tours, delivered ready to publish."
      />
    </>
  );
}
