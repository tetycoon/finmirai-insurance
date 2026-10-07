"use client";

import { useEffect, useState } from "react";

/**
 * Vertically cycling word (e.g. "family → health → vehicle…").
 * The list is sized by its widest word so surrounding text never shifts. A clone of the first word
 * is appended so the loop scrolls forward seamlessly, then snaps back without animation.
 * Screen readers get the full list once; motion stops entirely for prefers-reduced-motion.
 */
export function WordRotator({ words, interval = 2200, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(t);
  }, [interval]);

  useEffect(() => {
    if (index === words.length) {
      // Showing the clone of word 0: wait for the slide to finish, then jump back invisibly.
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 550);
      return () => clearTimeout(t);
    }
    if (!animate) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [index, animate, words.length]);

  return (
    <span className={`relative inline-flex h-[1.3em] overflow-hidden align-top ${className}`}>
      <span
        aria-hidden
        className={`flex flex-col ${animate ? "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]" : ""}`}
        style={{ transform: `translateY(-${index * 1.3}em)` }}
      >
        {[...words, words[0]].map((w, k) => (
          <span key={`${w}-${k}`} className="block h-[1.3em] whitespace-nowrap leading-[1.3em]">
            {w}
          </span>
        ))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
