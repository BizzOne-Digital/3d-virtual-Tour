"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index, in case several siblings reveal in sequence. */
  index?: number;
  /** Vertical travel in px. Kept small: this is a settle, not an entrance show. */
  distance?: number;
  className?: string;
  as?: "div" | "li" | "section" | "figure" | "article";
};

/**
 * Scroll settle used for section entrances.
 * Motivation: sequences content so a section reads top-down on arrival.
 * Collapses to static under prefers-reduced-motion.
 */
export function Reveal({
  children,
  index = 0,
  distance = 20,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      /* `initial` must not depend on the reduced-motion hook: the server cannot
         know the user preference, and a branched initial state hydrates as a
         mismatch that React refuses to patch, leaving content invisible.
         Reduced motion is honored by collapsing the transition instead. */
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 0.75,
        delay: reduce ? 0 : index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}
