import Image from "next/image";
import { business, credentials } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Credentials as a quiet row, not a badge wall.
 *
 * Zillow certification and Google Trusted status are worth stating once, at
 * the size a professional states them. Blown up into a banner they stop
 * reading as credentials and start reading as compensation.
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
          <div className="relative mt-8 h-14 w-[13rem]">
            <Image
              src={credentials.badge.src}
              alt={credentials.badge.alt}
              fill
              loading="lazy"
              sizes="208px"
              className="object-contain object-left"
            />
          </div>
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
