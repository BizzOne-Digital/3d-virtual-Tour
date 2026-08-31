import { cta, portfolio } from "@/lib/content";
import { PortfolioGrid } from "./Portfolio";
import { SectionLabel } from "./SectionLabel";
import { UnderlineLink } from "./ActionLink";
import { Reveal } from "./Reveal";

export function PortfolioSection() {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-8 text-display font-medium uppercase text-ivory">
              Properties, presented differently.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24">
          <PortfolioGrid projects={portfolio.slice(0, 4)} />
        </div>

        <div className="mt-20 border-t border-line pt-8">
          <UnderlineLink href={cta.portfolio.href}>{cta.portfolio.label}</UnderlineLink>
        </div>
      </div>
    </section>
  );
}
