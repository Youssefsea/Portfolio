"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gentle pointer-driven depth tilt. Mouse only; off with reduced motion.
 * The card's rectangle is measured once on pointer-enter (not on every move),
 * writes are batched into one rAF, and `will-change` exists only while hovered.
 */
export default function Tilt({
  children,
  max = 3,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const apply = () => {
    rafRef.current = 0;

    const element = ref.current;
    const rect = rectRef.current;

    if (!element || !rect) return;

    const px = (pointRef.current.x - rect.left) / rect.width - 0.5;
    const py = (pointRef.current.y - rect.top) / rect.height - 0.5;

    element.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const onEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    rectRef.current = element.getBoundingClientRect();
    element.classList.add("is-tilting");
  };

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;

    pointRef.current = { x: event.clientX, y: event.clientY };

    if (!rafRef.current) rafRef.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    rectRef.current = null;

    const element = ref.current;

    if (!element) return;

    element.style.transform = "";
    element.classList.remove("is-tilting");
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}