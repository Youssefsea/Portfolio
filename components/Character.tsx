"use client";

import { useId } from "react";

export type Pose = "code" | "wave" | "point" | "cheer";

/**
 * The portfolio mascot: a young developer in a hoodie, headphones and round
 * glasses, working on a laptop. One illustration, four poses (driven by CSS
 * from the `data-pose` attribute so changing pose never redraws the face).
 *
 * Gradient ids are unique per instance, so several characters on one page
 * never collide.
 */
export default function Character({
  pose = "code",
  className = "",
}: {
  pose?: Pose;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const u = (name: string) => `url(#${uid}-${name})`;

  return (
    <svg
      viewBox="0 0 240 280"
      className={`mm-svg ${className}`}
      data-pose={pose}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-hoodie`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#8190ff" />
          <stop offset="1" stopColor="#4a52e8" />
        </linearGradient>
        <linearGradient id={`${uid}-skin`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#fddcbd" />
          <stop offset="1" stopColor="#f1b48b" />
        </linearGradient>
        <linearGradient id={`${uid}-hair`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b3a99" />
          <stop offset="1" stopColor="#241a52" />
        </linearGradient>
        <linearGradient id={`${uid}-lid`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f5ff" />
          <stop offset="1" stopColor="#c3bdf5" />
        </linearGradient>
        <linearGradient id={`${uid}-cup`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="120" cy="271" rx="74" ry="8" fill="#1b2440" opacity="0.14" />

      <g className="mm-bob">
        {/* hood sitting behind the head */}
        <path
          d="M72 166 C66 130 94 118 120 118 C146 118 174 130 168 166 Z"
          fill="#3a40d6"
          className="mm-o"
        />

        {/* neck */}
        <rect x="104" y="130" width="32" height="34" rx="10" fill={u("skin")} className="mm-o" />
        <path d="M106 148 Q120 160 134 148 L134 160 L106 160 Z" fill="#d38b63" opacity="0.4" />

        {/* torso */}
        <path
          d="M58 270 C56 218 60 184 82 168 C96 158 108 156 120 156 C132 156 144 158 158 168 C180 184 184 218 182 270 Z"
          fill={u("hoodie")}
          className="mm-o"
        />
        <path
          d="M158 168 C180 184 184 218 182 270 L150 270 C158 230 158 194 150 164 Z"
          fill="#1c1f7a"
          opacity="0.2"
        />
        {/* hoodie folds */}
        <path d="M86 214 C90 228 88 242 82 256" fill="none" stroke="#1c1f7a" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        <path d="M154 216 C150 230 152 244 158 258" fill="none" stroke="#1c1f7a" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
        {/* drawstrings */}
        <path d="M109 166 C107 178 109 188 107 196" fill="none" stroke="#eef2ff" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M131 166 C133 178 131 188 133 196" fill="none" stroke="#eef2ff" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="107" cy="198" r="3.4" fill="#eef2ff" className="mm-o2" />
        <circle cx="133" cy="198" r="3.4" fill="#eef2ff" className="mm-o2" />
        {/* collar */}
        <ellipse cx="120" cy="160" rx="31" ry="10" fill="#3a40d6" className="mm-o" />

        {/* laptop (we see the lid from behind) */}
        <rect x="66" y="241" width="108" height="11" rx="5.5" fill="#aab2ea" className="mm-o" />
        <rect x="78" y="189" width="84" height="56" rx="9" fill={u("lid")} className="mm-o" />
        <rect x="83" y="194" width="74" height="46" rx="6" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="2" />
        <circle cx="120" cy="217" r="12" fill="#fde047" className="mm-o2" />
        <path
          d="M115 212 l-6 6 6 6 M125 212 l6 6 -6 6 M122 210 l-4 16"
          fill="none"
          stroke="#1b2440"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="92" cy="201" r="2.6" fill="#34d399" />
        <circle cx="101" cy="201" r="2.6" fill="#f472b6" />

        {/* ---------- head ---------- */}
        <ellipse cx="66" cy="106" rx="9" ry="12" fill={u("skin")} className="mm-o" />
        <ellipse cx="174" cy="106" rx="9" ry="12" fill={u("skin")} className="mm-o" />
        <path
          d="M120 46 C86 46 66 70 66 98 C66 126 88 146 120 146 C152 146 174 126 174 98 C174 70 154 46 120 46 Z"
          fill={u("skin")}
          className="mm-o"
        />
        <ellipse cx="120" cy="141" rx="28" ry="5" fill="#d38b63" opacity="0.22" />
        <ellipse cx="82" cy="125" rx="9" ry="5.5" fill="#ff8fa3" opacity="0.45" />
        <ellipse cx="158" cy="125" rx="9" ry="5.5" fill="#ff8fa3" opacity="0.45" />

        {/* eyes */}
        <g className="mm-eyes-open">
          {[96, 144].map((cx) => (
            <g key={cx}>
              <ellipse cx={cx} cy="108" rx="9.5" ry="10.5" fill="#ffffff" />
              <g className="mm-pupil">
                <circle cx={cx} cy="109" r="6.6" fill="#2a1f55" />
                <circle cx={cx} cy="109" r="3.2" fill="#100e2a" />
                <circle cx={cx + 2.6} cy="105.6" r="2.3" fill="#ffffff" />
                <circle cx={cx - 2.4} cy="112" r="1.1" fill="#ffffff" />
              </g>
              <path
                d={`M${cx - 10} 104 Q${cx} 95 ${cx + 10} 104`}
                fill="none"
                stroke="#1b2440"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
        <g className="mm-eyes-happy">
          {[96, 144].map((cx) => (
            <path
              key={cx}
              d={`M${cx - 9} 111 Q${cx} 98 ${cx + 9} 111`}
              fill="none"
              stroke="#1b2440"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* glasses */}
        {[96, 144].map((cx) => (
          <g key={cx}>
            <rect x={cx - 17} y="93" width="34" height="30" rx="12" fill="#bfe9ff" fillOpacity="0.2" stroke="#10a5a0" strokeWidth="3.5" />
            <path d={`M${cx - 10} 99 L${cx - 4} 99`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
        <path d="M113 106 Q120 101 127 106" fill="none" stroke="#10a5a0" strokeWidth="3.2" strokeLinecap="round" />

        {/* brows, nose, mouth */}
        <g className="mm-brows">
          <path d="M82 89 Q95 82 108 87" fill="none" stroke="#241a52" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M132 87 Q145 82 158 89" fill="none" stroke="#241a52" strokeWidth="4.5" strokeLinecap="round" />
        </g>
        <path d="M120 119 q3 4 -1 6" fill="none" stroke="#c98660" strokeWidth="2.2" strokeLinecap="round" />
        <path className="mm-smile" d="M107 129 Q120 142 133 129" fill="none" stroke="#1b2440" strokeWidth="3.6" strokeLinecap="round" />
        <g className="mm-mouth-open">
          <path d="M105 127 Q120 154 135 127 Q120 132 105 127 Z" fill="#7f1636" stroke="#1b2440" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="120" cy="140" rx="7.5" ry="4" fill="#ff7a93" />
        </g>

        {/* hair */}
        <path
          d="M64 98 C56 62 88 40 122 40 C158 40 186 62 176 100 C170 84 164 76 154 72 C146 68 138 66 130 70 C124 80 108 86 92 82 C82 82 72 88 64 98 Z"
          fill={u("hair")}
          className="mm-o"
        />
        <path d="M92 52 C108 45 130 45 148 54" fill="none" stroke="#8d7bf0" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

        {/* headphones */}
        <path d="M60 102 C56 22 184 22 180 102" fill="none" stroke="#1b2440" strokeWidth="12" strokeLinecap="round" />
        <path d="M60 102 C56 22 184 22 180 102" fill="none" stroke="#8b6bff" strokeWidth="7" strokeLinecap="round" />
        <path d="M70 80 C76 44 106 34 130 34" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        {[62, 178].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="108" rx="15" ry="25" fill={u("cup")} className="mm-o" />
            <ellipse cx={cx} cy="108" rx="7.5" ry="16" fill="#0ea5e9" opacity="0.45" />
            <ellipse cx={cx + (cx < 120 ? -5 : 5)} cy="96" rx="3" ry="8" fill="#ffffff" opacity="0.6" />
          </g>
        ))}

        {/* ---------- arms (drawn last so hands rest on the laptop) ---------- */}
        <g className="mm-arm mm-arm-l">
          <g className="mm-wag">
            <rect x="65" y="160" width="26" height="58" rx="13" fill={u("hoodie")} className="mm-o" />
            <path d="M72 178 C76 186 76 194 72 200" fill="none" stroke="#1c1f7a" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
            <rect x="64" y="205" width="28" height="13" rx="6.5" fill="#3a40d6" className="mm-o" />
            <rect className="mm-finger mm-o" x="73" y="226" width="10" height="20" rx="5" fill={u("skin")} />
            <circle cx="78" cy="225" r="11" fill={u("skin")} className="mm-o" />
            <ellipse cx="88" cy="223" rx="4" ry="6.5" fill={u("skin")} className="mm-o2" transform="rotate(-20 88 223)" />
          </g>
        </g>
        <g className="mm-arm mm-arm-r">
          <g className="mm-wag">
            <rect x="149" y="160" width="26" height="58" rx="13" fill={u("hoodie")} className="mm-o" />
            <path d="M168 178 C164 186 164 194 168 200" fill="none" stroke="#1c1f7a" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
            <rect x="148" y="205" width="28" height="13" rx="6.5" fill="#3a40d6" className="mm-o" />
            <circle cx="162" cy="225" r="11" fill={u("skin")} className="mm-o" />
            <ellipse cx="152" cy="223" rx="4" ry="6.5" fill={u("skin")} className="mm-o2" transform="rotate(20 152 223)" />
          </g>
        </g>
      </g>
    </svg>
  );
}