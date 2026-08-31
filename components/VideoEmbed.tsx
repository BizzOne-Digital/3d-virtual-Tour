"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";

/**
 * YouTube facade. The poster is a local still, and the player only mounts on
 * click, so YouTube's script payload never touches first load. Every frame on
 * the site would otherwise pull roughly a megabyte of third-party JavaScript.
 */
export function VideoEmbed({
  id,
  title,
  poster,
  posterAlt,
  start,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  id: string;
  title: string;
  poster: string;
  posterAlt: string;
  /** Seconds to skip, for films with a slow first beat. */
  start?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);

  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white` +
    (start ? `&start=${start}` : "");

  return (
    <div className={`relative overflow-hidden rounded-image bg-surface ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play film: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-ink-deep/35 transition-colors duration-500 group-hover:bg-ink-deep/25" />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex size-16 items-center justify-center rounded-full border border-gold/70 bg-ink-deep/60 text-gold backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:size-20">
              <Play size={22} weight="fill" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
