import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ServiceCategories } from "@/components/ServiceCategories";
import { SeeItInAction } from "@/components/SeeItInAction";
import { Technology } from "@/components/Technology";
import { FilmBand } from "@/components/FilmBand";
import { FeaturedProperty } from "@/components/FeaturedProperty";
import { WhyUs } from "@/components/WhyUs";
import { Credentials } from "@/components/Credentials";
import { CTA } from "@/components/CTA";

/**
 * Home reads in the order a realtor decides in:
 * what we do, see an example, try the live product, why it matters, who we are.
 * The services overview sits directly under the hero because "where are all my
 * services" is the first question this page has to answer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServiceCategories />
      <SeeItInAction />
      <Technology />
      <FilmBand />
      <FeaturedProperty />
      <WhyUs />
      <Credentials />
      <CTA />
    </>
  );
}
