import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ServiceIndex } from "@/components/ServiceIndex";
import { Pricing } from "@/components/Pricing";
import { pageHeroes } from "@/lib/content";
import { allServices, categories, includedServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Real estate photography, HDR, aerial and drone, 3D Matterport tours, dollhouse models, floor plans, virtual reality, property video, virtual staging and single property websites for Florida listings.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | 3D Interactive Virtual Tours",
    description:
      "Photography, aerial coverage, 3D tours, floor plans, video, staging and property websites, with a worked example of every one.",
    url: "/services",
  },
};

/**
 * The catalogue. Three block variants cycle inside each category so eighteen
 * services never settle into a zigzag, and `stacked` lands on the examples
 * that want the full column.
 */
const VARIANTS = ["split", "split-reversed", "stacked"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Every asset your listing needs."
        copy={`${allServices.length} services, each with a worked example. ${includedServices.length} of them are included with every shoot at no extra cost.`}
        image={pageHeroes.services.src}
        alt={pageHeroes.services.alt}
      />

      <ServiceIndex />

      {categories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`scroll-mt-32 ${categoryIndex % 2 === 1 ? "bg-surface/40" : ""}`}
        >
          <div className="shell border-t border-line pt-20 md:pt-28">
            <Reveal>
              <div className="flex items-baseline gap-6">
                <h2 className="text-display font-medium uppercase text-ivory">
                  {category.name}
                </h2>
                <span className="label shrink-0 tabular-nums text-gold/80">
                  {String(category.services.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                {category.intro}
              </p>
            </Reveal>

            <div className="mt-6 divide-y divide-line">
              {category.services.map((service, i) => (
                <ServiceBlock
                  key={service.id}
                  service={service}
                  index={i}
                  variant={VARIANTS[i % VARIANTS.length]}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Pricing />

      <CTA
        title="Send the address."
        copy="Tell us the property, the square footage and when it lists. We will come back with the coverage it needs and what it costs."
      />
    </>
  );
}
