import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortfolioGrid } from "@/components/Portfolio";
import { CTA } from "@/components/CTA";
import { pageHeroes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected real estate photography, aerial coverage and 3D interactive virtual tour projects across Central Florida.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | 3D Interactive Virtual Tours",
    description:
      "Selected real estate photography, aerial coverage and 3D interactive virtual tour projects.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Properties, presented differently."
        copy="A selection of residential work across photography, aerial coverage and interactive walkthroughs."
        image={pageHeroes.portfolio.src}
        alt={pageHeroes.portfolio.alt}
      />

      <section className="shell border-t border-line py-24 md:py-32">
        <PortfolioGrid />
      </section>

      <CTA
        title="Your listing could be next."
        copy="Send the property details and we will put together the right coverage for it."
      />
    </>
  );
}
