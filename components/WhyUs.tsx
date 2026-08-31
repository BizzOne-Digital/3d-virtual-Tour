import { valueProps } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Value proposition. The statement holds the left column while the three
 * benefits run as hairline rows on the right, so nothing reads as a card trio.
 */
export function WhyUs() {
  return (
    <section className="border-t border-line bg-surface/40 py-24 md:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="max-w-[12ch] text-display font-medium uppercase text-ivory">
                More than photography.
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
                We combine professional real estate photography with immersive
                technology to create property marketing experiences that help
                listings get noticed, understood and remembered.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {valueProps.map((item, i) => (
            <Reveal
              as="li"
              key={item.number}
              index={i}
              className="border-t border-line py-10 lg:py-12"
            >
              <div className="flex items-start gap-6 md:gap-10">
                <span className="text-3xl font-medium tracking-tight text-gold/70 md:text-4xl">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight uppercase text-ivory md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
                    {item.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
