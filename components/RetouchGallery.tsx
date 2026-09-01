import { cleanupPairs, twilightPair } from "@/lib/photos";
import { BeforeAfter } from "./BeforeAfter";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/**
 * Every genuine before and after from the shoot, on sliders.
 *
 * The twilight conversion leads at full width because it is the one change
 * that reads from across the room. The clean-up pairs follow smaller and in a
 * grid, which is the honest scale for them: the work is paver staining and
 * lawn wear, and a set of nine of those blown up would oversell what is
 * actually a tidy-up. Each carries a caption naming what changed, so nobody is
 * left dragging a handle looking for the difference.
 *
 * Both halves of every pair are the studio's own files of the same frame at
 * the same crop, which is what makes the comparison worth showing at all.
 */
export function RetouchGallery() {
  return (
    <section
      id="before-and-after"
      className="scroll-mt-28 border-t border-line py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Before and after</SectionLabel>
            <h2 className="mt-8 max-w-[16ch] text-display font-medium uppercase text-ivory">
              What happens after the shoot.
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
              Same frame, same crop, one difference. Drag any handle to see the
              retouching the studio applies to every shoot as standard: skies,
              twilight conversions, driveways, paving and lawns.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <div className="lg:mx-auto lg:max-w-4xl">
            <BeforeAfter
              before={twilightPair.before}
              after={twilightPair.after}
              beforeLabel={twilightPair.beforeLabel}
              afterLabel={twilightPair.afterLabel}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted">
              {twilightPair.caption}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {cleanupPairs.map((pair, i) => (
            <Reveal as="li" key={pair.id} index={i % 3}>
              <BeforeAfter
                before={pair.before}
                after={pair.after}
                beforeLabel={pair.beforeLabel}
                afterLabel={pair.afterLabel}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 31vw"
              />
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">
                {pair.caption}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
