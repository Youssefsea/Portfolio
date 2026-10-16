"use client";

import { useEffect, useRef } from "react";
import { observeOnce, usePrefersReducedMotion } from "./Motion-utils";

/**
 * Counts up once, the first time it scrolls into view. Years (>= 1000) and
 * non-numeric values are shown as-is. The true value is the server-rendered
 * text, and it is restored when the animation ends, so the final number is
 * always correct. The text node is updated directly (no React state).
 */
export default function CountUp({
  value,
  duration = 1100,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    const node = element?.firstChild as Text | null;
    const match = value.match(/^(\d+)(.*)$/);

    if (!element || !node || !match || reduced) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    if (target >= 1000) return;

    let raf = 0;

    node.nodeValue = `0${suffix}`;

    const stopObserving = observeOnce(
      element,
      () => {
        const begin = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - begin) / duration);
          const eased = 1 - Math.pow(1 - t, 3);

          node.nodeValue =
            t < 1 ? `${Math.round(target * eased)}${suffix}` : value;

          if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    return () => {
      stopObserving();
      cancelAnimationFrame(raf);
      node.nodeValue = value;
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} aria-label={value}>
      {value}
    </span>
  );
}