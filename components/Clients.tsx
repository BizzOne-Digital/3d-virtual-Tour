import Image from "next/image";
import { clients } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * The client logo wave.
 *
 * One row that travels right to left without stopping, each logo on an ivory
 * disc and the discs riding a sine curve so the band undulates as it passes.
 * The motion, the loop and the edge mask live in `.brand-wave` in globals.css;
 * this file owns the geometry.
 *
 * Nothing here scrolls. The row is clipped, not scrollable, and the only thing
 * that moves it is the animation - see the note on the reduced-motion override
 * in globals.css.
 *
 * The discs are ivory so every mark reads on one consistent ground. That is
 * also why Chick-fil-A is served from the recoloured file: the supplied artwork
 * is a white knockout and would have been invisible on a light disc. No mark is
 * tinted at render time; the recolour is a real file, in the real brand red.
 *
 * Sizing runs off one knob. `--chip` is the disc diameter and each logo's `fit`
 * is its height as a fraction of it, derived from the aspect ratio so every
 * logo inscribes the same diagonal. Change `--chip` at a breakpoint and the
 * discs, the logos and the wave all rescale together.
 */

/**
 * Vertical offset, in units of `--wave`. Returns to 0 at `i = n`, so the
 * duplicated half of the track meets the first half without a step.
 */
const wave = (i: number, n: number) => Math.sin((2 * Math.PI * i) / n).toFixed(3);

function Logo({
  client,
  index,
  decorative = false,
}: {
  client: (typeof clients)[number];
  index: number;
  /** The looped second pass: same pixels, already announced once. */
  decorative?: boolean;
}) {
  return (
    <li
      className="shrink-0 px-3 sm:px-4"
      style={{ transform: `translateY(calc(var(--wave) * ${wave(index, clients.length)}))` }}
      aria-hidden={decorative || undefined}
    >
      <span className="flex size-[var(--chip)] items-center justify-center rounded-full bg-ivory shadow-[0_1px_0_0_rgb(255_255_255/0.10)_inset]">
        <Image
          src={`/brands/trimmed/${client.file}`}
          alt={decorative ? "" : client.name}
          width={client.w}
          height={client.h}
          sizes="200px"
          style={{ height: `calc(var(--chip) * ${client.fit})`, width: "auto" }}
          className="max-w-none"
        />
      </span>
    </li>
  );
}

export function Clients() {
  return (
    <section className="overflow-hidden border-t border-line py-16 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="label text-gold">Clients</p>
          <h2 className="mt-5 max-w-[24ch] text-2xl font-medium tracking-tight uppercase text-ivory md:text-3xl">
            Trusted by well known brands
          </h2>
        </Reveal>
      </div>

      {/* Full bleed on purpose: the row has to run past both edges for the
          travel to read as continuous rather than as a widget in a box. */}
      <Reveal
        index={1}
        className="brand-wave mt-12 [--chip:4.5rem] [--wave:0.5rem] md:mt-16 md:[--chip:6.5rem] md:[--wave:0.9rem]"
      >
        <ul className="brand-wave-track flex w-max items-center py-4">
          {clients.map((client, i) => (
            <Logo key={client.file} client={client} index={i} />
          ))}
          {clients.map((client, i) => (
            <Logo
              key={`${client.file}-loop`}
              client={client}
              index={i + clients.length}
              decorative
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
