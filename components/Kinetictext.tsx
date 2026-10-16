"use client";

import { useEffect, useRef } from "react";
import { observeOnce } from "./Motion-utils";

/**
 * Word-by-word masked reveal. Splits by words only (never letters) so Arabic
 * letter joining is preserved. The real text stays available to screen readers.
 * Uses one shared IntersectionObserver and toggles a class directly, so
 * revealing a heading never re-renders React.
 */
export default function KineticText({
  text,
  className = "",
  stagger = 55,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return observeOnce(
      element,
      () => element.classList.add("kinetic-on"),
      { threshold: 0.25 },
    );
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`kinetic ${className}`}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="kinetic-mask">
              <span
                className="kinetic-word"
                style={{ transitionDelay: `${index * stagger}ms` }}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}