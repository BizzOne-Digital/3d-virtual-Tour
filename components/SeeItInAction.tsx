import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { proofs } from "@/lib/content";
import { categories } from "@/lib/services";
import { BeforeAfter } from "./BeforeAfter";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

/**
 * The two services whose whole value is the change they make to a frame.
 * Twilight leads over the general enhancement block because both sides of that
 * pair are the studio's own files of the same frame, so the drag shows a real
 * conversion rather than a correction you have to be told about.
 */
const SLIDERS = ["virtual-staging", "virtual-twilight"] as const;

function slider(id: string) {
  const service = categories
    .flatMap((c) => c.services)
    .find((s) => s.id === id);
  return service?.example.kind === "before-after" ? { service, example: service.example } : null;
}

/**
 * The section the client asked for by name. Two halves, both proof:
 *
 * The sliders come first because a transformation you drag with your thumb is
 * the fastest argument on the page. The frame strip follows, one frame per
 * discipline, each captioned with the service it demonstrates rather than the
 * address it was shot at, because a realtor reading this is choosing what to
 * buy.
 */
export function SeeItInAction() {
  const sliders = SLIDERS.map(slider).filter(Boolean) as NonNullable<
    ReturnType<typeof slider>
  >[];

  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Examples</SectionLabel>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-8 text-display font-medium uppercase text-ivory">
              See what we do.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {sliders.map(({ service, example }, i) => (
            <Reveal key={service.id} index={i}>
              <BeforeAfter
                before={example.before}
                after={example.after}
                beforeLabel={example.beforeLabel}
                afterLabel={example.afterLabel}
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              <h3 className="mt-6 text-lg font-medium tracking-tight uppercase text-ivory">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
            </Reveal>
          ))}
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
          {proofs.map((proof, i) => (
            <Reveal as="li" key={proof.service} index={i % 3}>
              <Link href={proof.href} className="group block">
                <div
                  className={`relative overflow-hidden rounded-image bg-surface ${
                    proof.aspect ?? "aspect-4/3"
                  }`}
                >
                  <Image
                    src={proof.image}
                    alt={proof.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 31vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 border-t border-line pt-4 transition-colors duration-500 group-hover:border-gold/60">
                  <h3 className="flex items-baseline justify-between gap-4 text-base font-medium tracking-tight uppercase text-ivory transition-colors duration-300 group-hover:text-gold">
                    {proof.service}
                    <ArrowRight
                      aria-hidden
                      size={13}
                      weight="bold"
                      className="shrink-0 text-gold/60 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                    />
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted">
                    {proof.caption}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
