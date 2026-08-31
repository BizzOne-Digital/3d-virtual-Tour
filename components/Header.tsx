"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { business, cta, nav } from "@/lib/content";
import { ActionLink } from "./ActionLink";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Motivation: the header must stay legible once it leaves the hero photograph.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const { style } = document.body;
    style.overflow = open ? "hidden" : "";
    return () => {
      style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || open
            ? "border-b border-line bg-ink-deep/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-8 lg:h-[76px]">
          <Link
            href="/"
            className="shrink-0 transition-colors duration-300 hover:text-gold"
            aria-label={`${business.name} home`}
          >
            <span className="label hidden lg:inline">{business.name}</span>
            <span className="label lg:hidden" aria-hidden>
              {business.shortName}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative label transition-colors duration-300 ${
                    active ? "text-gold" : "text-muted hover:text-ivory"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapper carries the breakpoint: passing `hidden` into ActionLink
                would collide with its own `inline-flex` display utility. */}
            <div className="hidden md:block">
              <ActionLink href={cta.primary.href} className="py-3" icon="none">
                {cta.primary.label}
              </ActionLink>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 flex size-11 items-center justify-center text-ivory transition-colors duration-300 hover:text-gold lg:hidden"
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-line bg-ink-deep lg:hidden"
        >
          <nav aria-label="Mobile" className="shell flex flex-col divide-y divide-line">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-baseline justify-between py-6 text-display-sm tracking-tight ${
                  isActive(item.href) ? "text-gold" : "text-ivory"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="shell mt-10 pb-16">
            <ActionLink href={cta.primary.href} className="w-full">
              {cta.primary.label}
            </ActionLink>
            <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted">
              <a href={`mailto:${business.email}`} className="hover:text-gold">
                {business.email}
              </a>
              <a href={business.phoneHref} className="hover:text-gold">
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
