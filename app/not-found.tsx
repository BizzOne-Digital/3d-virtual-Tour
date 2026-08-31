import { ActionLink } from "@/components/ActionLink";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[100dvh] flex-col justify-center py-32">
      <p className="label text-gold">Page not found</p>
      <h1 className="mt-8 max-w-[18ch] text-display font-medium uppercase text-ivory">
        This page has moved on.
      </h1>
      <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
        The link may be out of date. The portfolio is the best place to start.
      </p>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <ActionLink href="/portfolio">View Portfolio</ActionLink>
        <ActionLink href="/" variant="outline" icon="none">
          Back home
        </ActionLink>
      </div>
    </section>
  );
}
