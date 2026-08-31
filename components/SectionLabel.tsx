/**
 * Rationed eyebrow. Used at most twice on any page, never as a section counter.
 * The gold hairline is the only decoration it carries.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-4 text-gold">
      <span aria-hidden className="h-px w-10 bg-gold/60" />
      {children}
    </p>
  );
}
