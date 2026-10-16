"use client";

import Character from "./Character";

/** Compact waving character at the top of the hero on tablet + phone (< 1024px). */
export default function HeroInlineMascot() {
  return (
    <div
      aria-hidden="true"
      className="mm-inline pointer-events-none float-end ms-2 lg:hidden"
    >
      <Character pose="wave" />
    </div>
  );
}