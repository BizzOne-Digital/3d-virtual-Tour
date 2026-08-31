import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "outline" | "quiet";

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full label transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px";

const variants: Record<Variant, string> = {
  // Gold on navy: 8.4:1 against the ink text it carries.
  primary:
    "bg-gold px-7 py-4 text-ink hover:bg-gold-light focus-visible:bg-gold-light",
  outline:
    "border border-line-strong px-7 py-4 text-ivory hover:border-gold hover:text-gold",
  quiet: "text-gold hover:text-gold-light",
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon = "right",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: "right" | "up-right" | "none";
}) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon !== "none" ? (
        <Icon
          aria-hidden
          size={14}
          weight="bold"
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        />
      ) : null}
    </Link>
  );
}

/** Editorial text link with a hairline that draws in from the left on hover. */
export function UnderlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 label text-ivory transition-colors duration-300 hover:text-gold ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        size={13}
        weight="bold"
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </Link>
  );
}
