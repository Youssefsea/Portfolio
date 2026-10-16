"use client";

import Character from "./Character";

/** The big hero illustration: the mascot waving, with floating tech badges. */
export default function HeroMascot() {
  return (
    <div className="hm-scene relative mx-auto w-full max-w-[500px]" aria-hidden="true">
      <div className="mascot-glow mascot-glow-one" />
      <div className="mascot-glow mascot-glow-two" />

      <div className="floating-code-badge badge-api">
        <span>API</span>
      </div>

      <div className="floating-code-badge badge-db">
        <span>DB</span>
      </div>

      <div className="floating-code-badge badge-ui">
        <span>UI</span>
      </div>

      <div className="hm-stage">
        <Character pose="wave" />
      </div>
    </div>
  );
}