import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import type { Service } from "@/lib/services";
import { Reveal } from "./Reveal";
import { ServiceExample } from "./ServiceExample";

/**
 * One service, in the order a realtor asks: what it is, why it matters, what
 * it looks like.
 *
 * Three variants rather than one, because eighteen services rendered in a
 * single alternating rhythm reads as a zigzag by the third screen. The caller
 * cycles them; `stacked` is the one that breaks the split pattern, so it lands
 * every third block and on the examples that need the full column width.
 */
export function ServiceBlock({
  service,
  index,
  variant,
}: {
  service: Service;
  index: number;
  variant: "split" | "split-reversed" | "stacked";
}) {
  const number = String(index + 1).padStart(2, "0");

  if (variant === "stacked") {
    return (
      <article id={service.id} className="scroll-mt-28 py-16 md:py-20">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Heading number={number} title={service.title} />
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
              {service.summary}
            </p>
          </Reveal>
          <Reveal index={1} className="lg:col-span-4 lg:col-start-9">
            <Why value={service.value} />
            <Meta service={service} />
          </Reveal>
        </div>

        <Reveal index={1} className="mt-12">
          <ServiceExample example={service.example} sizes="(max-width: 1024px) 100vw, 88vw" />
        </Reveal>
      </article>
    );
  }

  const reversed = variant === "split-reversed";

  return (
    <article id={service.id} className="scroll-mt-28 py-16 md:py-20">
      <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal
          className={`lg:col-span-6 ${reversed ? "lg:order-2 lg:col-start-7" : ""}`}
        >
          <ServiceExample example={service.example} />
        </Reveal>

        <Reveal
          index={1}
          className={`lg:col-span-5 ${reversed ? "lg:order-1" : "lg:col-start-8"}`}
        >
          <Heading number={number} title={service.title} />
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            {service.summary}
          </p>
          <Why value={service.value} />
          <Meta service={service} />
        </Reveal>
      </div>
    </article>
  );
}

function Heading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="text-sm font-medium tabular-nums text-gold/80">{number}</span>
      <h3 className="max-w-[22ch] text-2xl font-medium tracking-tight uppercase text-ivory md:text-3xl">
        {title}
      </h3>
    </div>
  );
}

/** The "why do I need this" half. Set apart, because it is the half that sells. */
function Why({ value }: { value: string }) {
  return (
    <p className="mt-8 max-w-[52ch] border-l border-gold/50 pl-5 text-base leading-relaxed text-ivory/90">
      {value}
    </p>
  );
}

function Meta({ service }: { service: Service }) {
  if (!service.price && !service.included && !service.proof && !service.alsoIncludes) {
    return null;
  }

  return (
    <>
      {service.alsoIncludes ? (
        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
          {service.alsoIncludes.map((line) => (
            <li
              key={line}
              className="label rounded-full border border-line-strong px-4 py-2 text-muted"
            >
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {service.included ? (
          <span className="label inline-flex items-center gap-2 text-gold">
            <Check aria-hidden size={13} weight="bold" />
            Included as standard
          </span>
        ) : null}

        {service.price ? <span className="label text-muted">{service.price}</span> : null}

        {service.proof ? (
          <a
            href={service.proof.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group label inline-flex items-center gap-2 text-gold transition-colors duration-300 hover:text-gold-light"
          >
            {service.proof.label}
            <ArrowUpRight
              aria-hidden
              size={13}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        ) : null}
      </div>
    </>
  );
}
