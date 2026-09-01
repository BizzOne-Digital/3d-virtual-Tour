"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "motion/react";
import { hero } from "@/lib/content";

/**
 * The hero film and its pause control.
 *
 * A client leaf so the rest of the hero can stay a server component: the type
 * and the CTAs are the part that has to paint without JavaScript, and they do.
 * Only this control needs a ref.
 *
 * The film runs 11.6s, past the five-second threshold in WCAG 2.2.2 for
 * auto-playing motion, so a real pause control is required rather than
 * optional. Under `prefers-reduced-motion` it does not play at all and the
 * poster stands in, with the control still there to start it deliberately.
 */
export function HeroVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* The control label follows the media element rather than the click, so a
     rejected play() (autoplay policy, no user gesture, reduced motion) cannot
     desync the button from what is actually on screen. */
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

  /* Reduced motion is a client-only fact, so the element ships with autoplay
     and is stopped here rather than branching the rendered attributes, which
     would hydrate as a mismatch. */
  useEffect(() => {
    if (reduce) videoRef.current?.pause();
  }, [reduce]);

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

  return (
    <div className="absolute inset-0 bg-surface">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={hero.video}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={hero.label}
      />

      {/* Two scrims, not one. The bottom carries the type; the top keeps the
          transparent header legible against the bright sky in frame. */}
      <div aria-hidden className="absolute inset-0 scrim-bottom" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 scrim-top" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background film" : "Play background film"}
        className="absolute top-24 right-5 z-10 flex size-11 items-center justify-center rounded-full border border-ivory/30 bg-ink-deep/60 text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:right-10 xl:right-16"
      >
        {playing ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
      </button>
    </div>
  );
}
