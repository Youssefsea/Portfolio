"use client";

import { useEffect, useRef, useState } from "react";

type Language = "en" | "ar";
type Pose = "idle" | "about" | "skills" | "projects" | "experience" | "contact";

const SIZE = 168;
const HEIGHT = SIZE * 1.1;
const CONFETTI_COLORS = ["#fde047", "#34d399", "#60a5fa", "#f472b6", "#a78bfa"];

const BUBBLES: Record<Exclude<Pose, "idle">, { en: string; ar: string }> = {
  about: { en: "Welcome!", ar: "أهلًا بك!" },
  skills: { en: "My toolbox", ar: "أدواتي" },
  projects: { en: "Take a look", ar: "ألقِ نظرة" },
  experience: { en: "Always learning", ar: "أتعلم دائمًا" },
  contact: { en: "Let's talk!", ar: "لنتحدث!" },
};

function MascotSvg({ pose }: { pose: Pose }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className="mm-svg"
      data-pose={pose}
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id="mmHoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7aa2ff" />
          <stop offset="1" stopColor="#3f63e0" />
        </linearGradient>
        <linearGradient id="mmSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9d6b9" />
          <stop offset="1" stopColor="#e6a984" />
        </linearGradient>
        <linearGradient id="mmScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="209" rx="58" ry="8" fill="rgba(15,23,42,0.18)" />

      <g className="mm-bob">
        {/* hood + body */}
        <ellipse cx="100" cy="124" rx="36" ry="15" fill="#3f63e0" className="mm-s" />
        <path
          d="M42 206 C42 150 60 120 100 120 C140 120 158 150 158 206 Z"
          fill="url(#mmHoodie)"
          className="mm-s"
        />
        <path d="M92 130 L90 152" stroke="#dbeafe" strokeWidth="3" strokeLinecap="round" />
        <path d="M108 130 L110 152" stroke="#dbeafe" strokeWidth="3" strokeLinecap="round" />

        {/* laptop */}
        <rect x="66" y="164" width="68" height="40" rx="6" fill="url(#mmScreen)" className="mm-s" />
        <rect x="76" y="173" width="26" height="4" rx="2" fill="#34d399" />
        <rect x="76" y="182" width="40" height="4" rx="2" fill="#60a5fa" />
        <rect x="76" y="191" width="18" height="4" rx="2" fill="#f472b6" />

        {/* head */}
        <circle cx="59" cy="80" r="9" fill="url(#mmSkin)" className="mm-s" />
        <circle cx="141" cy="80" r="9" fill="url(#mmSkin)" className="mm-s" />
        <ellipse cx="100" cy="76" rx="41" ry="43" fill="url(#mmSkin)" className="mm-s" />
        <path
          d="M60 70 C58 36 84 26 104 28 C128 30 143 46 140 70 C128 56 112 50 96 52 C80 52 68 58 60 70 Z"
          fill="#172033"
        />
        <circle cx="76" cy="95" r="6" fill="#f9a8a8" opacity="0.45" />
        <circle cx="124" cy="95" r="6" fill="#f9a8a8" opacity="0.45" />

        {/* glasses + eyes */}
        <rect x="68" y="70" width="26" height="19" rx="6" fill="rgba(255,255,255,0.35)" className="mm-s" />
        <rect x="106" y="70" width="26" height="19" rx="6" fill="rgba(255,255,255,0.35)" className="mm-s" />
        <path d="M94 78 H106" className="mm-s" fill="none" />
        <circle cx="81" cy="79" r="3" fill="#0f172a" />
        <circle cx="119" cy="79" r="3" fill="#0f172a" />
        <path d="M89 99 Q100 110 111 99" className="mm-s mm-smile" fill="none" strokeLinecap="round" />
        <ellipse cx="100" cy="102" rx="7" ry="6" fill="#7f1d1d" className="mm-mouth-open" />

        {/* headphones */}
        <path d="M57 78 C52 24 148 24 143 78" className="mm-s" fill="none" strokeWidth="6" strokeLinecap="round" />
        <rect x="48" y="68" width="15" height="30" rx="7.5" fill="#fb7185" className="mm-s" />
        <rect x="137" y="68" width="15" height="30" rx="7.5" fill="#fb7185" className="mm-s" />

        {/* arms */}
        <g className="mm-arm mm-arm-l">
          <rect x="46" y="116" width="30" height="62" rx="15" fill="url(#mmHoodie)" className="mm-s" />
          <circle cx="61" cy="182" r="11" fill="url(#mmSkin)" className="mm-s" />
        </g>
        <g className="mm-arm mm-arm-r">
          <rect x="124" y="116" width="30" height="62" rx="15" fill="url(#mmHoodie)" className="mm-s" />
          <circle cx="139" cy="182" r="11" fill="url(#mmSkin)" className="mm-s" />
        </g>
      </g>
    </svg>
  );
}

function Confetti() {
  return (
    <div className="mm-confetti" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          style={
            {
              "--a": `${(i * 360) / 14}deg`,
              "--c": CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              "--d": `${70 + (i % 3) * 18}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function ScrollMascot({ language }: { language: Language }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const poseRef = useRef<Pose>("idle");

  const [enabled, setEnabled] = useState(false);
  const [pose, setPose] = useState<Pose>("idle");
  const [burst, setBurst] = useState(0);

  // Desktop / large tablets only. Smaller screens keep the hero mascot only.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const wrap = wrapRef.current;
    const tilt = tiltRef.current;

    if (!wrap || !tilt) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ease = reduced ? 1 : 0.1;

    let x = 0;
    let y = window.innerHeight;
    let s = 0.6;
    let opacity = 0;

    let targetX = x;
    let targetY = y;
    let targetS = s;
    let targetOpacity = 0;

    let lastScroll = window.scrollY;
    let tiltZ = 0;
    let pointerX = 0;
    let pointerY = 0;
    let first = true;
    let running = false;
    let raf = 0;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;

      let bestPose: Pose | null = null;
      let bestRect: DOMRect | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      const anchors = Array.from(
        document.querySelectorAll<HTMLElement>("[data-mascot-anchor]"),
      );

      for (const el of anchors) {
        const rect = el.getBoundingClientRect();

        if (rect.width === 0) continue;
        if (rect.bottom < vh * 0.12 || rect.top > vh * 0.78) continue;

        const distance = Math.abs(rect.top + rect.height / 2 - vh * 0.4);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestPose = el.dataset.mascotAnchor as Pose;
          bestRect = rect;
        }
      }

      let nextPose: Pose = "idle";

      if (bestPose && bestRect) {
        nextPose = bestPose;
        targetX = bestRect.left + bestRect.width / 2 - SIZE / 2;
        targetY = bestRect.top + bestRect.height / 2 - HEIGHT / 2;
        targetS = 1;
      } else {
        // Docked: small, bottom-left corner.
        targetX = 12;
        targetY = vh - HEIGHT * 0.6 - 14;
        targetS = 0.6;
      }

      // The big hero mascot owns the first screen.
      targetOpacity = heroBottom > vh * 0.3 || vw < 1024 ? 0 : 1;

      if (nextPose !== poseRef.current) {
        poseRef.current = nextPose;
        setPose(nextPose);

        if (nextPose === "contact" && !reduced) {
          setBurst((value) => value + 1);
        }
      }
    };

    const frame = () => {
      measure();

      const scrollY = window.scrollY;
      const velocity = scrollY - lastScroll;
      lastScroll = scrollY;

      const tiltTarget = reduced
        ? 0
        : Math.max(-10, Math.min(10, velocity * 0.35));

      tiltZ += (tiltTarget - tiltZ) * 0.15;

      if (first) {
        x = targetX;
        y = targetY + 80;
        first = false;
      }

      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      s += (targetS - s) * ease;
      opacity += (targetOpacity - opacity) * (reduced ? 1 : 0.12);

      wrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      wrap.style.opacity = String(opacity);

      const ry = reduced ? 0 : pointerX * 14;
      const rx = reduced ? 0 : -pointerY * 8;

      tilt.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${tiltZ * 0.6}deg)`;

      const settled =
        Math.abs(targetX - x) < 0.4 &&
        Math.abs(targetY - y) < 0.4 &&
        Math.abs(targetS - s) < 0.005 &&
        Math.abs(targetOpacity - opacity) < 0.01 &&
        Math.abs(tiltZ) < 0.1;

      if (settled) {
        running = false;
        return;
      }

      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (running) return;

      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };

    kick();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [enabled]);

  if (!enabled) return null;

  const bubble = pose === "idle" ? null : BUBBLES[pose][language];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="mascot-traveler pointer-events-none fixed left-0 top-0 z-[45] opacity-0"
      style={{
        width: SIZE,
        height: HEIGHT,
        transformOrigin: "top left",
        willChange: "transform, opacity",
      }}
    >
      {bubble && (
        <div key={pose} className="mm-bubble">
          {bubble}
        </div>
      )}

      <div className="mm-perspective">
        <div ref={tiltRef} className="mm-tilt">
          <MascotSvg pose={pose} />
        </div>
      </div>

      {pose === "contact" && <Confetti key={burst} />}
    </div>
  );
}