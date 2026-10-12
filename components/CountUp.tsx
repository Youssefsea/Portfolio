"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up once, the first time it scrolls into view. Values that look like
 * years (>= 1000) are shown as-is. The true value is always the initial text,
 * so the final number is correct even if JS animation never runs.
 */
export default function CountUp({
  value,
  duration = 1100,
}: {
  value: string;
  duration?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : Number.NaN;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    const element = ref.current;

    if (!element || Number.isNaN(target) || target >= 1000) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        observer.disconnect();

        const begin = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - begin) / duration);
          const eased = 1 - Math.pow(1 - t, 3);

          setText(`${Math.round(target * eased)}${suffix}`);

          if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, duration]);

  return (
    <span ref={ref} aria-label={value}>
      {text}
    </span>
  );
}