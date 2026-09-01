import { cta } from "@/lib/content";
import { ActionLink } from "./ActionLink";
import { HeroVideo } from "./HeroVideo";

/**
 * Full-bleed hero. The film owns the viewport; the type sits in the lower-left
 * plate so the frame is never covered and the scrim is at its darkest exactly
 * where the copy lands.
 *
 * A server component with a CSS entrance: the hero is the LCP element, and
 * anything that keeps it at `opacity: 0` until React hydrates is a blank first
 * screen on the connections that can least afford one. Only the film's pause
 * control is a client island.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden border-b border-line">
      <HeroVideo />

      <div className="shell relative pt-[72px] pb-14 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <h1 className="rise col-span-1 max-w-[26ch] text-display font-medium uppercase text-ivory [animation-delay:60ms] lg:col-span-10">
            Showcase your property using all the technologies in Real Estate
            Marketing.
          </h1>

          <p className="rise col-span-1 max-w-[46ch] border-l border-gold/50 pl-5 text-base leading-relaxed text-ivory/90 [animation-delay:200ms] md:text-lg lg:col-span-5">
            Photography, aerial, 3D tours, floor plans, video and staging for
            Florida listings. All from one appointment.
          </p>

          <div className="rise col-span-1 flex flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:items-center lg:col-span-6 lg:col-start-7 lg:justify-end">
            <ActionLink href={cta.services.href}>{cta.services.label}</ActionLink>
            <ActionLink href={cta.portfolio.href} variant="outline" icon="none">
              {cta.portfolio.label}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
