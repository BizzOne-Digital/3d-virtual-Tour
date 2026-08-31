import { business, cta } from "@/lib/content";
import { ActionLink } from "./ActionLink";
import { Reveal } from "./Reveal";

/**
 * Closing band. One intent, one label, contact details in plain type.
 */
export function CTA({
  title = "Ready when your next listing is.",
  copy = "Tell us about the property and we will recommend the right coverage for it.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[16ch] text-display font-medium uppercase text-ivory">
                {title}
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
                {copy}
              </p>
            </Reveal>
          </div>

          <Reveal index={2} className="lg:col-span-5 lg:justify-self-end">
            <ActionLink href={cta.primary.href}>{cta.primary.label}</ActionLink>
            <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6">
              <a
                href={`mailto:${business.email}`}
                className="text-sm text-muted transition-colors duration-300 hover:text-gold"
              >
                {business.email}
              </a>
              <a
                href={business.phoneHref}
                className="text-sm text-muted transition-colors duration-300 hover:text-gold"
              >
                {business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
