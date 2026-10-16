"use client";

import { useEffect, useRef } from "react";
import Character, { type Pose } from "./Character";
import { subscribeScroll, usePrefersReducedMotion } from "./Motion-utils";

type Language = "en" | "ar";
type Anchor = "about" | "skills" | "projects" | "experience" | "contact";

const W = 150;
const H = 175;
const CONFETTI = ["#fde047", "#34d399", "#60a5fa", "#f472b6", "#a78bfa"];

const POSES: Record<Anchor, Pose> = {
  about: "wave",
  skills: "point",
  projects: "point",
  experience: "code",
  contact: "cheer",
};

const BUBBLES: Record<Anchor, { en: string; ar: string }> = {
  about: { en: "Welcome!", ar: "أهلًا بك!" },
  skills: { en: "My toolbox", ar: "أدواتي" },
  projects: { en: "Take a look", ar: "ألقِ نظرة" },
  experience: { en: "Always learning", ar: "أتعلم دائمًا" },
  contact: { en: "Let's talk!", ar: "لنتحدث!" },
};

type Spot = { name: Anchor; x: number; y: number };

/** Layout position of an element in the document, ignoring CSS transforms. */
function docPosition(el: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;

  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

function restart(el: HTMLElement, className: string) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

/**
 * Desktop traveling mascot (>= 1024px). On smaller screens each section title
 * shows its own inline character instead (see SectionTitle).
 *
 * Performance rules this file follows:
 *  - no React state during scroll: everything is written straight to the DOM
 *  - anchor positions are measured ONCE (and on resize / content change),
 *    never per frame, so scrolling causes no layout reads
 *  - one shared passive scroll listener; the rAF loop sleeps when settled
 */
export default function ScrollMascot({ language }: { language: Language }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const burstRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<Language>(language);
  const shownRef = useRef<Anchor | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    languageRef.current = language;

    if (shownRef.current && bubbleRef.current) {
      bubbleRef.current.textContent = BUBBLES[shownRef.current][language];
    }
  }, [language]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    const bubble = bubbleRef.current;
    const burst = burstRef.current;

    if (!wrap || !tilt || !bubble || !burst) return;

    const svg = tilt.firstElementChild as SVGElement | null;
    const query = window.matchMedia("(min-width: 1024px)");

    let spots: Spot[] = [];
    let heroBottom = 0;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    let x = 0;
    let y = 0;
    let s = 0.85;
    let o = 0;
    let tiltZ = 0;
    let lastScroll = window.scrollY;
    let current = -1;
    let visible = false;
    let raf = 0;
    let measureRaf = 0;
    let running = false;
    let unsubscribe: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const ease = reduced ? 1 : 0.14;

    const measure = () => {
      measureRaf = 0;

      vw = window.innerWidth;
      vh = window.innerHeight;

      spots = Array.from(
        document.querySelectorAll<HTMLElement>("[data-mascot-anchor]"),
      )
        .filter((el) => el.offsetWidth > 0)
        .map((el) => ({
          name: el.dataset.mascotAnchor as Anchor,
          ...docPosition(el),
        }));

      const hero = document.getElementById("hero");

      heroBottom = hero ? docPosition(hero).y + hero.offsetHeight / 2 : 0;

      kick();
    };

    const scheduleMeasure = () => {
      if (!measureRaf) measureRaf = requestAnimationFrame(measure);
    };

    const show = (name: Anchor) => {
      shownRef.current = name;

      if (svg) svg.dataset.pose = POSES[name];

      bubble.textContent = BUBBLES[name][languageRef.current];

      if (!reduced) {
        restart(bubble, "mm-bubble-in");

        if (name === "contact") restart(burst, "go");
      }
    };

    const frame = () => {
      raf = 0;

      const scroll = window.scrollY;
      const velocity = scroll - lastScroll;

      lastScroll = scroll;

      let tx = x;
      let ty = y;
      let target = 0;

      if (spots.length > 0) {
        const focus = scroll + vh * 0.4;
        let best = 0;
        let bestDistance = Infinity;

        for (let i = 0; i < spots.length; i++) {
          const distance = Math.abs(spots[i].y - focus);

          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        }

        // hysteresis: keep the current spot unless another one is clearly closer
        if (
          current >= 0 &&
          current < spots.length &&
          best !== current &&
          Math.abs(spots[current].y - focus) - bestDistance < 90
        ) {
          best = current;
        }

        current = best;

        const spot = spots[current];
        const viewportY = spot.y - scroll;
        const low = Math.max(vh * 0.2, 180);
        const high = vh * 0.8;
        const margin = visible ? 36 : 0;
        const inBand =
          viewportY > low - margin && viewportY < high + margin;
        const heroGone = heroBottom - scroll < vh * 0.3;

        visible = inBand && heroGone;
        target = visible ? 1 : 0;

        tx = Math.min(Math.max(spot.x - W / 2, 8), vw - W - 8);
        ty = viewportY - H / 2;

        // appearing: place it at the new spot while invisible (no flying across)
        if (target === 1 && o < 0.03) {
          x = tx;
          y = ty + (reduced ? 0 : 26);
        }

        // pose + bubble always follow the spot it is currently at
        if (target === 1 && shownRef.current !== spot.name) show(spot.name);
      }

      const targetScale = target === 1 ? 1 : 0.86;
      const tiltTarget = reduced ? 0 : Math.max(-9, Math.min(9, velocity * 0.3));

      x += (tx - x) * ease;
      y += (ty - y) * ease;
      s += (targetScale - s) * ease;
      o += (target - o) * (reduced ? 1 : 0.16);
      tiltZ += (tiltTarget - tiltZ) * 0.18;

      wrap.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
      wrap.style.opacity = o.toFixed(3);
      tilt.style.transform = `rotate(${tiltZ.toFixed(2)}deg)`;

      const settled =
        Math.abs(tx - x) < 0.3 &&
        Math.abs(ty - y) < 0.3 &&
        Math.abs(targetScale - s) < 0.004 &&
        Math.abs(target - o) < 0.01 &&
        Math.abs(tiltZ) < 0.1;

      if (settled) {
        o = target;
        wrap.style.opacity = String(target);
        running = false;
        return;
      }

      raf = requestAnimationFrame(frame);
    };

    function kick() {
      if (running || !query.matches) return;

      running = true;
      raf = requestAnimationFrame(frame);
    }

    const start = () => {
      if (unsubscribe) return;

      scheduleMeasure();
      unsubscribe = subscribeScroll(kick);
      window.addEventListener("resize", scheduleMeasure);
      window.addEventListener("load", scheduleMeasure);

      resizeObserver = new ResizeObserver(scheduleMeasure);
      resizeObserver.observe(document.documentElement);

      void document.fonts?.ready.then(scheduleMeasure);
    };

    const stop = () => {
      unsubscribe?.();
      unsubscribe = null;
      resizeObserver?.disconnect();
      resizeObserver = null;
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("load", scheduleMeasure);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(measureRaf);
      raf = 0;
      measureRaf = 0;
      running = false;
      o = 0;
      wrap.style.opacity = "0";
    };

    const onQuery = () => (query.matches ? start() : stop());

    onQuery();
    query.addEventListener("change", onQuery);

    return () => {
      query.removeEventListener("change", onQuery);
      stop();
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="mascot-traveler pointer-events-none fixed left-0 top-0 z-[45] hidden lg:block"
      style={{ width: W, height: H, opacity: 0, transformOrigin: "50% 50%" }}
    >
      <div ref={bubbleRef} className="mm-bubble" />

      <div ref={tiltRef} className="mm-tilt">
        <Character pose="wave" />
      </div>

      <div ref={burstRef} className="mm-confetti">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={
              {
                "--a": `${(i * 360) / 14}deg`,
                "--c": CONFETTI[i % CONFETTI.length],
                "--d": `${70 + (i % 3) * 18}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}