import Link from "next/link";
import { business, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="max-w-md text-display-sm tracking-tight text-ivory">
              {business.name}
            </p>
            <p className="label mt-6 text-gold">{business.positioning}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="flex flex-col gap-4 not-italic">
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
            <span className="text-sm text-muted-dim">{business.serviceArea}</span>
          </address>
        </div>

        <p className="label mt-20 border-t border-line pt-8 text-muted-dim">
          &copy; 2026 {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
