import { categories } from "@/lib/services";

/**
 * Jump nav for the catalogue. Eighteen services is a long page, and a visitor
 * who arrived wanting drone coverage should not have to scroll past staging to
 * find it.
 *
 * Plain anchors, no JavaScript, no scroll-spy: the cost of tracking an active
 * section here is real and the benefit is decorative. It sticks under the site
 * header so it stays reachable the whole way down.
 */
export function ServiceIndex() {
  return (
    <nav
      aria-label="Service categories"
      className="sticky top-[72px] z-30 border-y border-line bg-ink-deep/92 backdrop-blur-md lg:top-[76px]"
    >
      <div className="shell flex gap-x-8 gap-y-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="group label flex shrink-0 items-baseline gap-2 whitespace-nowrap text-muted transition-colors duration-300 hover:text-gold"
          >
            {category.name}
            <span className="text-[0.625rem] tabular-nums text-muted-dim transition-colors duration-300 group-hover:text-gold/80">
              {category.services.length}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
