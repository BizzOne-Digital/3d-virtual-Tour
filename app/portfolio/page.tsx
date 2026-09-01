import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortfolioGrid } from "@/components/Portfolio";
import { CTA } from "@/components/CTA";
import { CoverageGallery } from "@/components/CoverageGallery";
import { InteractiveExperiences } from "@/components/InteractiveExperiences";
import { RetouchGallery } from "@/components/RetouchGallery";
import { pageHeroes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Worked examples by service: photography, aerial coverage, 3D dollhouse models, floor plans, virtual staging and listing video for Florida properties.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | 3D Interactive Virtual Tours",
    description:
      "Worked examples by service: photography, aerial, 3D tours, floor plans, staging and video.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Work, by the service that produced it."
        copy="Each piece below names what was commissioned and what the agent received. Every frame is our own work on a Florida property."
        image={pageHeroes.portfolio.src}
        alt={pageHeroes.portfolio.alt}
      />

      <section className="shell border-t border-line py-24 md:py-32">
        <PortfolioGrid />
      </section>

      <InteractiveExperiences
        label="Interactive experiences"
        title="Tours you can open now."
        copy="Two published tours of Florida properties. The 3D walkthrough runs on Matterport, the aerial tour on 360aerialtours.com, and both open in a new tab."
      />

      <RetouchGallery />

      <CoverageGallery />

      <CTA
        title="Your listing could be next."
        copy="Send the address and the square footage. We will come back with the coverage it needs and what it costs."
      />
    </>
  );
}
