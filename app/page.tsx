import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { FilmBand } from "@/components/FilmBand";
import { Services } from "@/components/Services";
import { Technology } from "@/components/Technology";
import { FeaturedProperty } from "@/components/FeaturedProperty";
import { PortfolioSection } from "@/components/PortfolioSection";
import { WhyUs } from "@/components/WhyUs";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FilmBand />
      <Services />
      <Technology />
      <FeaturedProperty />
      <PortfolioSection />
      <WhyUs />
      <CTA />
    </>
  );
}
