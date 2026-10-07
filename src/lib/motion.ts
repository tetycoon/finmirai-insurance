import type { CSSProperties } from "react";

export type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

/**
 * Props that mark an element for scroll-reveal (handled by the inline runtime in lib/motionScript.ts).
 *   <div {...reveal()} />            fade + slide up
 *   <div {...reveal(120, "zoom")} /> delayed, image settles from a slight zoom
 *
 * Keep revealed elements as wrappers — don't put them on elements that also have hover transforms,
 * because the reveal transition-delay would delay the hover too.
 * Content stays fully visible without JavaScript and for prefers-reduced-motion (see globals.css).
 */
export function reveal(delayMs = 0, variant: RevealVariant = "up") {
  return {
    "data-reveal": variant,
    style: { "--rd": `${delayMs}ms` } as CSSProperties,
    // The inline runtime may add data-revealed before React hydrates; that's expected.
    suppressHydrationWarning: true,
  };
}

/** Stagger delay for the i-th item in a list, capped so long lists don't feel slow. */
export function stagger(i: number, stepMs = 80, maxMs = 400) {
  return Math.min(i * stepMs, maxMs);
}
