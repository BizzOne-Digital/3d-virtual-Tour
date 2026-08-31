"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { cta, heroVideo } from "@/lib/content";
import { ActionLink } from "./ActionLink";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed hero. The property film owns the viewport; type sits in the
 * lower-left plate so the architecture is never covered.
 *
 * The film autoplays on every screen size. It runs 11.6s, past the WCAG 2.2.2
 * five-second threshold for auto-playing motion, so it carries a real pause
 * control instead of being suppressed.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  /* The control label follows the media element rather than the click, so a
     rejected play() (autoplay policy, no user gesture) cannot desync the UI. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    setPlaying(!video.paused);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {
        /* Autoplay policy refused it; the pause event keeps the label honest. */
      });
    } else {
      video.pause();
    }
  };

  // `initial` stays constant across server and client: a branched initial state
  // hydrates as a mismatch and strands the copy at opacity 0. Reduced motion
  // collapses the transition instead.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 1,
      delay: reduce ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-surface">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.src}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Silent film of a property, shown as background"
        />
        <div aria-hidden className="absolute inset-0 scrim-bottom" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-44 scrim-top" />
      </div>

      <div className="shell relative pt-[72px] pb-14 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <motion.h1
            {...rise(0.1)}
            className="col-span-1 text-hero font-medium uppercase text-ivory lg:col-span-11"
          >
            Showcase your property{" "}
            <br className="hidden md:inline" />
            using all the technologies{" "}
            <br className="hidden md:inline" />
            in real estate marketing
          </motion.h1>

          <motion.p
            {...rise(0.24)}
            className="col-span-1 max-w-[42ch] border-l border-gold/50 pl-5 text-base leading-relaxed text-ivory/85 md:text-lg lg:col-span-5"
          >
            Premium real estate photography and immersive property marketing
            experiences designed to make every listing stand out.
          </motion.p>

          <motion.div
            {...rise(0.34)}
            className="col-span-1 flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-6 lg:col-start-7 lg:justify-end"
          >
            <ActionLink href={cta.services.href}>{cta.services.label}</ActionLink>
            <ActionLink href={cta.portfolio.href} variant="outline" icon="none">
              {cta.portfolio.label}
            </ActionLink>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background film" : "Play background film"}
        className="absolute top-24 right-5 z-10 flex size-11 items-center justify-center rounded-full border border-ivory/25 bg-ink-deep/55 text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:right-10 xl:right-16"
      >
        {playing ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
      </button>
    </section>
  );
}
