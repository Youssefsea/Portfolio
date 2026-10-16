"use client";

import { useEffect, useRef } from "react";
import Character, { type Pose } from "./Character";
import KineticText from "./Kinetictext";
import { observeVisibility } from "./Motion-utils";

const POSES: Record<string, Pose> = {
  about: "wave",
  skills: "point",
  projects: "point",
  experience: "code",
  contact: "cheer",
};

/**
 * The eyebrow ("01 / About", "02 / Stack" ...) decides the mascot pose.
 *  - desktop (>= 1024px): an empty anchor that the traveling mascot flies to
 *  - below 1024px: a small inline character floats beside the heading and the
 *    text wraps around it, so it can never cover content
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const raw = eyebrow.split("/")[1]?.trim().toLowerCase() ?? "";
  const anchor = raw === "stack" ? "skills" : raw;
  const inlineRef = useRef<HTMLDivElement | null>(null);

  // pause the character's animation while it is off screen
  useEffect(() => {
    const el = inlineRef.current;

    if (!el) return;

    return observeVisibility(el, (visible) => {
      el.dataset.paused = visible ? "false" : "true";
    });
  }, []);

  return (
    <div className="relative mb-12 flow-root">
      <div
        data-mascot-anchor={anchor}
        aria-hidden="true"
        className="pointer-events-none absolute end-0 top-0 hidden h-[210px] w-[210px] lg:block"
      />

      <div className="max-w-4xl lg:max-w-[min(56rem,calc(100%_-_230px))]">
        <div
          ref={inlineRef}
          aria-hidden="true"
          className="mm-inline pointer-events-none float-end ms-3 lg:hidden"
        >
          <Character pose={POSES[anchor] ?? "code"} />
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-0.5 w-12 bg-slate-600 dark:bg-slate-400" />

          <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300 sm:text-sm">
            {eyebrow}
          </span>
        </div>

        <h2 className="font-display text-[2.15rem] font-black leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          <KineticText key={title} text={title} />
        </h2>

        {description && (
          <p className="mt-5 max-w-3xl text-[1rem] font-medium leading-7 text-slate-800 dark:text-slate-100 sm:text-xl sm:leading-9">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}