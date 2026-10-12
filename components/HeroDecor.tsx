"use client";

/** Floating code symbols + scroll cue for the hero. Decorative only. */
export default function HeroDecor({ language }: { language: "en" | "ar" }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <span className="hero-sym hs-1">{"{ }"}</span>
        <span className="hero-sym hs-2">{"</>"}</span>
        <span className="hero-sym hs-3">{"=>"}</span>
        <span className="hero-sym hs-4">{";"}</span>
        <span className="hero-sym hs-5">{"[ ]"}</span>
      </div>

      <a
        href="#about"
        className="scroll-cue absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300 lg:flex"
      >
        <span>{language === "en" ? "Scroll to explore" : "مرر للاستكشاف"}</span>

        <span className="scroll-cue-mouse" aria-hidden="true">
          <span />
        </span>
      </a>
    </>
  );
}