"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Word-by-word masked reveal. Splits by words only (never letters) so Arabic
 * letter joining is preserved. The real text stays available to screen readers.
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
  const [on, setOn] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`kinetic ${on ? "kinetic-on" : ""} ${className}`}>
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