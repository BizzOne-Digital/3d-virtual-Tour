import { business, credentials } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Credentials as a quiet row, not a badge wall.
 *
 * Zillow certification and Google Trusted status are worth stating once, at
 * the size a professional states them. Blown up into a banner they stop
 * reading as credentials and start reading as compensation.
 *
 * They are set as type rather than as the supplied badge lockup image, because
 * the only imagery this site carries is the studio's own property photography.
 * The certifications are claims, and a claim reads perfectly well as a word.
 */
export function Credentials() {
  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-24">
      <div className="shell grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-xl font-medium tracking-tight text-ivory md:text-2xl">
            {business.contactName}
          </p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
            {business.contactTitle}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
            {credentials.marks.map((mark) => (
              <li
                key={mark}
                className="label rounded-full border border-gold/40 px-4 py-2 text-gold"
              >
                {mark}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {credentials.claims.map((claim) => (
              <li
                key={claim}
                className="border-t border-line pt-4 text-sm leading-relaxed text-ivory/85"
              >
                {claim}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
