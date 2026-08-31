"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Cube } from "@phosphor-icons/react/dist/ssr";
import type { Tour } from "@/lib/content";

/**
 * Live interactive tours, running inside the page.
 *
 * The poster is a real frame from the tour itself, and the viewer only mounts
 * on click: a Matterport scene is heavy, and two of them on first load would
 * cost more than the rest of the site combined. Switching tours after launch
 * swaps the iframe rather than tearing the section down.
 */
export function TourEmbed({ tours }: { tours: Tour[] }) {
  const [index, setIndex] = useState(0);
  const [launched, setLaunched] = useState(false);
  const tour = tours[index];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line pb-5">
        {tours.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={active}
              className={`group relative label transition-colors duration-300 ${
                active ? "text-gold" : "text-muted hover:text-ivory"
              }`}
            >
              {item.name}
              <span
                aria-hidden
                className={`absolute -bottom-5 left-0 h-px w-full origin-left bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-image bg-surface md:aspect-16/9">
        {launched ? (
          <iframe
            key={tour.slug}
            className="absolute inset-0 h-full w-full"
            src={tour.url}
            title={`Interactive virtual tour: ${tour.name}`}
            allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; vr"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLaunched(true)}
            aria-label={`Open the interactive tour: ${tour.name}`}
            className="group absolute inset-0 h-full w-full cursor-pointer text-left"
          >
            <Image
              src={tour.poster}
              alt={tour.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span aria-hidden className="absolute inset-0 scrim-bottom" />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8"
            >
              <span className="block">
                <span className="label block text-gold">{tour.subject}</span>
                <span className="mt-3 block text-xl font-medium tracking-tight uppercase text-ivory md:text-2xl">
                  {tour.name}
                </span>
              </span>
              <span className="label inline-flex items-center gap-3 rounded-full border border-ivory/30 bg-ink-deep/55 px-5 py-3 text-ivory backdrop-blur-sm transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <Cube size={14} weight="bold" />
                Open interactive tour
              </span>
            </span>
          </button>
        )}
      </div>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="label text-muted-dim">{tour.subject}</span>
        <a
          href={tour.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group label inline-flex items-center gap-2 text-gold transition-colors duration-300 hover:text-gold-light"
        >
          Open in a new tab
          <ArrowUpRight
            aria-hidden
            size={13}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </p>
    </div>
  );
}
