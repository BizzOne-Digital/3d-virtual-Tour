import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { pageHeroes, services, type Service } from "@/lib/content";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Services",
  description:
    "3D interactive virtual tours, real estate photography, aerial coverage and property marketing assets for realtors and home sellers.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | 3D Interactive Virtual Tours",
    description:
      "3D interactive virtual tours, real estate photography, aerial coverage and property marketing assets.",
    url: "/services",
  },
};

const detail: Record<string, string[]> = {
  "01": [
    "Navigable walkthrough of every principal room",
    "Floor-level orientation so buyers understand the layout",
    "Hosted link ready for the MLS and the listing page",
  ],
  "02": [
    "Exterior, interior and detail coverage",
    "Shot on the light the architecture actually needs",
    "Colour and perspective corrected, print and web ready",
  ],
  "03": [
    "Assets sized for MLS, social and print",
    "Consistent treatment across an agent portfolio",
    "Delivered as a single organised handover",
  ],
  "04": [
    "Aerial context for grounds, roofline and setting",
    "Scale and flow communicated before a showing",
    "Coverage planned around the property, not a package",
  ],
};

function ProofLink({ service }: { service: Service }) {
  if (!service.proof) return null;
  return (
    <a
      href={service.proof.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group label mt-10 inline-flex items-center gap-2 text-gold transition-colors duration-300 hover:text-gold-light"
    >
      {service.proof.label}
      <ArrowUpRight
        aria-hidden
        size={13}
        weight="bold"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

function SplitService({ service, reversed }: { service: Service; reversed?: boolean }) {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-16">
        <Reveal
          as="figure"
          className={`relative aspect-4/3 overflow-hidden rounded-image bg-surface lg:col-span-6 ${
            reversed ? "lg:order-2 lg:col-start-7" : ""
          }`}
        >
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : "lg:col-start-8"}`}>
          <Reveal index={1}>
            <p className="label text-gold">{service.number}</p>
            <h2 className="mt-6 max-w-[18ch] text-display-sm font-medium uppercase text-ivory">
              {service.title}
            </h2>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-muted">
              {service.description}
            </p>
            <ul className="mt-10 flex flex-col gap-4">
              {detail[service.number].map((line) => (
                <li key={line} className="flex gap-4 text-sm text-ivory/85">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
            <ProofLink service={service} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Band variant breaks the split rhythm so the page never reads as a zigzag. */
function BandService({ service }: { service: Service }) {
  return (
    <section className="py-20 md:py-28">
      <Reveal as="figure" className="relative aspect-4/3 w-full overflow-hidden bg-surface md:aspect-21/9">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink-deep/25" />
      </Reveal>

      <div className="shell mt-14 grid gap-10 lg:grid-cols-12 lg:gap-x-16">
        <Reveal className="lg:col-span-6">
          <p className="label text-gold">{service.number}</p>
          <h2 className="mt-6 max-w-[18ch] text-display-sm font-medium uppercase text-ivory">
            {service.title}
          </h2>
        </Reveal>
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <p className="max-w-[52ch] text-base leading-relaxed text-muted">
            {service.description}
          </p>
          <ul className="mt-10 flex flex-col gap-4">
            {detail[service.number].map((line) => (
              <li key={line} className="flex gap-4 text-sm text-ivory/85">
                <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Every angle. Every detail. Every experience."
        copy="Four disciplines that work together to present a property properly, from the first frame to the full interactive walkthrough."
        image={pageHeroes.services.src}
        alt={pageHeroes.services.alt}
      />

      <div className="border-t border-line">
        <SplitService service={services[0]} />
        <SplitService service={services[1]} reversed />
        <BandService service={services[2]} />
        <SplitService service={services[3]} />
      </div>

      <CTA
        title="Tell us about the property."
        copy="Send the address and the timeline. We will recommend the coverage the property actually needs."
      />
    </>
  );
}
