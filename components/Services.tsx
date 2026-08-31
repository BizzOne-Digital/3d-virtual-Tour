"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cta, services } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/**
 * Services as editorial rows against a single large frame, not a card grid.
 * Motivation for the crossfade: hovering a service answers "what does this look like"
 * immediately, which is the whole point of a visual-marketing company.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <section className="border-t border-line bg-surface/40">
      <div className="shell py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>What we do</SectionLabel>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-8 text-display font-medium uppercase text-ivory">
              Every angle. Every detail. Every experience.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-24">
          <ul className="border-t border-line">
            {services.map((service, i) => (
              <li key={service.number} className="border-b border-line">
                <Link
                  href={cta.services.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block py-8 lg:py-10"
                  aria-label={`${service.title}. See services.`}
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span
                      className={`label shrink-0 transition-colors duration-300 ${
                        active === i ? "text-gold" : "text-muted-dim"
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight uppercase text-ivory transition-colors duration-300 group-hover:text-gold md:text-3xl lg:text-[2rem]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-5 max-w-[56ch] pl-10 text-sm leading-relaxed text-muted md:pl-16 md:text-base">
                    {service.description}
                  </p>

                  {/* Mobile carries its own frame: the sticky desktop panel does not exist here. */}
                  <div className="relative mt-7 ml-10 aspect-16/10 overflow-hidden rounded-image md:ml-16 lg:hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>

                  <span
                    aria-hidden
                    className="mt-7 ml-10 block h-px w-full max-w-24 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 md:ml-16 lg:mt-8"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/3 overflow-hidden rounded-image bg-surface">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={current.number}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="label mt-6 text-muted-dim">{current.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
