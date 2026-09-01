import { experiences } from "@/lib/content";
import { ExperienceCard } from "./ExperienceCard";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/**
 * The two live tours, side by side.
 *
 * Deliberately not two matching tiles: the 3D walkthrough takes the wider
 * column and the aerial tour sits lower and narrower beside it, so the pair
 * reads as an editorial spread rather than a feature grid. On tablet and below
 * they stack in the same order.
 */
export function InteractiveExperiences({
  title = "Open a real one.",
  copy = "Two live tours of Florida properties, running on the platforms that host them. Both open in a new tab.",
  label = "Interactive experiences",
}: {
  title?: string;
  copy?: string;
  label?: string;
}) {
  const [primary, secondary] = experiences;

  return (
    <section
      id="interactive-experiences"
      className="scroll-mt-28 border-t border-line py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="mt-8 max-w-[14ch] text-display font-medium uppercase text-ivory">
              {title}
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
              {copy}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <ExperienceCard
              experience={primary}
              aspect="aspect-16/10"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:mt-16">
            <ExperienceCard
              experience={secondary}
              aspect="aspect-4/3"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
