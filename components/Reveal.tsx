import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger position among siblings. Shifts the scroll range, not a delay. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "figure" | "article" | "ol" | "ul";
};

/**
 * Scroll settle used for section entrances.
 *
 * A server component: the animation lives entirely in the `.reveal` class in
 * globals.css, driven by the browser's own view timeline. See the comment
 * there for why this is not a Motion component. The short version is that a
 * JS-driven `initial: { opacity: 0 }` gets server-rendered, so the page shipped
 * blank and stayed blank until hydration.
 *
 * The API is unchanged from the Motion version, so callers did not have to
 * move.
 */
export function Reveal({ children, index = 0, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={className ? `reveal ${className}` : "reveal"}
      style={index ? ({ "--i": index } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
