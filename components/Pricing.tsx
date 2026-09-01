import { Check } from "@phosphor-icons/react/dist/ssr";
import { pricing } from "@/lib/services";
import { business } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Published rates, as rows rather than a card trio. Three pricing cards side
 * by side is the shape that invites a comparison the studio does not want:
 * these are not competing tiers, they are three sizes of the same visit.
 *
 * Every figure lives in `pricing` in lib/services.ts, so a rate change is one
 * line and never touches this file.
 */
export function Pricing() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[14ch] text-display font-medium uppercase text-ivory">
              What it costs
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
              {pricing.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line lg:mt-20">
          {pricing.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              index={i}
              className="grid items-baseline gap-x-12 gap-y-6 border-b border-line py-10 md:grid-cols-12 md:py-12"
            >
              <div className="md:col-span-4">
                <p className="text-4xl font-medium tracking-tight tabular-nums text-gold md:text-5xl">
                  {tier.price}
                </p>
                <h3 className="mt-4 text-lg font-medium tracking-tight uppercase text-ivory">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-muted-dim">{tier.for}</p>
              </div>

              <ul className="flex flex-col gap-3 md:col-span-7 md:col-start-6">
                {tier.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-ivory/85 md:text-base">
                    <Check
                      aria-hidden
                      size={14}
                      weight="bold"
                      className="mt-1 shrink-0 text-gold/70"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal index={1}>
          <ul className="mt-10 flex flex-col gap-2.5">
            {pricing.notes.map((note) => (
              <li key={note} className="text-sm leading-relaxed text-muted-dim">
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-dim">{business.serviceRadius}.</p>
        </Reveal>
      </div>
    </section>
  );
}
