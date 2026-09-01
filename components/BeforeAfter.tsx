"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Photo } from "@/lib/services";

/**
 * Draggable before/after comparison.
 *
 * The handle is a real `<input type="range">` laid over the frame at zero
 * opacity. That is deliberate: it buys pointer drag, touch drag, keyboard
 * arrows, and a value announced to assistive tech, none of which a `div` with
 * pointer handlers gets for free.
 *
 * The position is written straight to a CSS custom property on the frame.
 * Holding it in React state would re-render the tree on every pixel of a drag
 * and stutter on a phone, which is the one device this has to feel good on.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "aspect-3/2",
  priority = false,
}: {
  before: Photo;
  after: Photo;
  beforeLabel?: string;
  afterLabel?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const id = useId();

  const move = (value: string) => frame.current?.style.setProperty("--pos", `${value}%`);

  return (
    <figure className={className}>
      <div
        ref={frame}
        style={{ "--pos": "50%" } as React.CSSProperties}
        className="group relative h-full w-full overflow-hidden rounded-image bg-surface select-none"
      >
        {/* Underneath: the untouched frame. */}
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          draggable={false}
        />

        {/* On top: the finished frame, revealed from the handle rightward. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 0 var(--pos))" }}
        >
          <Image
            src={after.src}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Divider. Purely decorative: the range input below is the control. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-gold"
          style={{ left: "var(--pos)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-ink-deep/80 backdrop-blur-sm transition-transform duration-300 ease-editorial group-hover:scale-110">
            <span aria-hidden className="flex items-center text-gold">
              <CaretLeft size={12} weight="bold" />
              <CaretRight size={12} weight="bold" />
            </span>
          </div>
        </div>

        <span className="label pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-ink-deep/75 px-3 py-1.5 text-ivory backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="label pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-gold px-3 py-1.5 text-ink">
          {afterLabel}
        </span>

        <label htmlFor={id} className="sr-only">
          {`Reveal the ${afterLabel.toLowerCase()} frame. Left shows ${beforeLabel.toLowerCase()}, right shows ${afterLabel.toLowerCase()}.`}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          onInput={(e) => move(e.currentTarget.value)}
          aria-valuetext={`${afterLabel} revealed from the handle to the right edge`}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>

      <figcaption className="label mt-4 text-muted-dim">
        Drag to compare. {beforeLabel} on the left, {afterLabel} on the right.
      </figcaption>
    </figure>
  );
}
