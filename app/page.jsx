"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const TERMINAL_LINES = [
  { prompt: "$", text: "whoami" },
  { prompt: ">", text: "Youssef Yasser" },
  { prompt: "$", text: "my role.txt" },
  { prompt: ">", text: "Fullstack Developer" },
  { prompt: "$", text: "status --current" },
  { prompt: ">", text: "building an EdTech SaaS for Egypt" },
];

const SKILL_GROUPS = [
  {
    label: "Backend",
    icon: Server,
    color: "blue",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "MVC",
      "JWT Auth",
      "HTTP-Only Cookies",
    ],
  },
  {
    label: "Databases",
    icon: Database,
    color: "purple",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis (Locking)",
      "Schema Design",
      "Geospatial Queries",
      "pgAdmin",
    ],
  },
  {
    label: "Frontend",
    icon: Code2,
    color: "pink",
    items: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "RTL / Arabic UI",
    ],
  },
  {
    label: "AI & Integrations",
    icon: Sparkles,
    color: "yellow",
    items: [
      "Google Gemini API",
      "NLP",
      "Web Speech API",
      "Leaflet.js",
    ],
  },
  {
    label: "Tools & DevOps",
    icon: Cpu,
    color: "orange",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "AWS Basics",
      "Postman",
      "Cloudinary",
    ],
  },
];

const PROJECTS = [
  {
    nameAr: "ذاكر صح",
    name: "EdTech SaaS Platform",
    description:
      "A comprehensive educational marketplace connecting students across Egypt with nearby learning centers and private tutors — three dashboards, one platform.",
    highlights: [
      "Three dedicated roles: Student, Center Admin, Teacher",
      "Geolocation-based discovery via OpenStreetMap",
      "Token-gated content streaming for paid video/files",
      "Automatic schedule-conflict detection on booking",
      "Super Admin panel with platform-wide analytics",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "React"],
    link: "https://center-saas-front-83p8.vercel.app/",
    accent: "green",
    icon: "🎓",
  },
  {
    nameAr: "أكلي",
    name: "Food Delivery Platform",
    description:
      "A dual-sided delivery app for customers and restaurant vendors, built around live order tracking and real distance-based pricing.",
    highlights: [
      "Real-time order chat via Socket.IO, gated by payment",
      "GPS + Haversine distance & delivery-fee calculation",
      "Multi-restaurant smart cart",
      "Vodafone Cash / InstaPay proof-of-payment workflow",
      "Vendor dashboard with live sales analytics",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Socket.IO", "Leaflet"],
    link: "https://food-front-rho.vercel.app/",
    accent: "orange",
    icon: "🍔",
  },
  {
    nameAr: "WealthWise AI",
    name: "Smart Financial Wallet",
    description:
      'An AI-powered wallet that turns spoken or typed Arabic — "300 جنيه فراخ و150 عصير" — into categorized, logged transactions.',
    highlights: [
      "Gemini-powered Arabic natural-language transaction parsing",
      "SERIALIZABLE isolation + dual Redis locks for transfers",
      "Idempotency keys on every money-moving endpoint",
      "Arabic voice input via the Web Speech API",
      "Budget tracking with AI advice personalized by city",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Gemini AI"],
    link: "https://wallet-wep-react.vercel.app/",
    accent: "purple",
    icon: "💰",
  },
];

const STATS = [
  { value: "3", label: "shipped apps" },
  { value: "30+", label: "REST endpoints" },
  { value: "3", label: "roles per platform" },
  { value: "2027", label: "graduating" },
];

const NAV_LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

type ColorName = "green" | "orange" | "purple" | "blue" | "pink" | "yellow";

const COLOR_STYLES: Record<
  ColorName,
  {
    text: string;
    soft: string;
    border: string;
    iconBg: string;
  }
> = {
  green: {
    text: "text-green-500",
    soft: "bg-green-100",
    border: "border-green-300",
    iconBg: "bg-green-200",
  },
  orange: {
    text: "text-orange-500",
    soft: "bg-orange-100",
    border: "border-orange-300",
    iconBg: "bg-orange-200",
  },
  purple: {
    text: "text-purple-500",
    soft: "bg-purple-100",
    border: "border-purple-300",
    iconBg: "bg-purple-200",
  },
  blue: {
    text: "text-blue-500",
    soft: "bg-blue-100",
    border: "border-blue-300",
    iconBg: "bg-blue-200",
  },
  pink: {
    text: "text-pink-500",
    soft: "bg-pink-100",
    border: "border-pink-300",
    iconBg: "bg-pink-200",
  },
  yellow: {
    text: "text-yellow-500",
    soft: "bg-yellow-100",
    border: "border-yellow-300",
    iconBg: "bg-yellow-200",
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${
        visible ? "reveal-visible" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl animate-soft-float" />
      <div
        className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl animate-soft-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div
        className="absolute left-[12%] top-[30%] h-64 w-64 rounded-full bg-yellow-200/30 blur-3xl animate-soft-float"
        style={{ animationDelay: "0.8s" }}
      />

      <div
        className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-purple-200/30 blur-3xl animate-soft-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-twinkle"
          style={{
            left: `${(index * 17) % 100}%`,
            top: `${(index * 31) % 100}%`,
            animationDelay: `${(index % 7) * 0.45}s`,
          }}
        />
      ))}
    </div>
  );
}

function CartoonCharacter() {
  return (
    <div className="character-scene relative mx-auto h-[440px] w-full max-w-[460px]">
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 shadow-[0_20px_70px_rgba(59,130,246,0.14)]" />

      <div className="absolute left-1/2 top-[14%] h-[245px] w-[215px] -translate-x-1/2 rounded-[45%_45%_42%_42%] border-[6px] border-slate-900 bg-[#f4c7a1] shadow-[8px_10px_0_#0f172a]">
        <div className="absolute -left-5 top-8 h-20 w-9 rounded-full border-[5px] border-slate-900 bg-[#f4c7a1]" />
        <div className="absolute -right-5 top-8 h-20 w-9 rounded-full border-[5px] border-slate-900 bg-[#f4c7a1]" />

        <div className="absolute left-1/2 top-12 h-9 w-32 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="absolute left-4 top-2 h-20 w-14 rounded-[60%] bg-slate-900 rotate-[20deg]" />
        <div className="absolute right-4 top-1 h-24 w-16 rounded-[60%] bg-slate-900 -rotate-[18deg]" />

        <div className="absolute left-[34px] top-[104px] h-5 w-5 rounded-full bg-slate-900" />
        <div className="absolute right-[34px] top-[104px] h-5 w-5 rounded-full bg-slate-900" />

        <div className="absolute left-[28px] top-[93px] h-12 w-12 rounded-full border-4 border-slate-900" />
        <div className="absolute right-[28px] top-[93px] h-12 w-12 rounded-full border-4 border-slate-900" />
        <div className="absolute left-1/2 top-[111px] h-3 w-4 -translate-x-1/2 rounded-full bg-slate-900" />

        <div className="absolute bottom-[42px] left-1/2 h-9 w-20 -translate-x-1/2 rounded-b-full border-[5px] border-t-0 border-slate-900" />

        <div className="absolute bottom-[-20px] left-1/2 h-16 w-16 -translate-x-1/2 rounded-b-3xl border-[5px] border-slate-900 bg-blue-500" />
      </div>

      <div className="absolute left-1/2 top-[57%] h-[150px] w-[250px] -translate-x-1/2 rounded-[42px] border-[6px] border-slate-900 bg-blue-500 shadow-[10px_12px_0_#0f172a]" />

      <div className="absolute left-[26%] top-[63%] h-[100px] w-[68px] rounded-[26px] border-[6px] border-slate-900 bg-slate-800 rotate-[10deg]" />
      <div className="absolute right-[25%] top-[63%] h-[100px] w-[68px] rounded-[26px] border-[6px] border-slate-900 bg-slate-800 -rotate-[10deg]" />

      <div className="absolute bottom-2 left-[24%] h-16 w-28 rounded-full border-[6px] border-slate-900 bg-pink-400" />
      <div className="absolute bottom-2 right-[24%] h-16 w-28 rounded-full border-[6px] border-slate-900 bg-purple-400" />

      <div className="tech-bubble absolute -right-1 top-8 rotate-6">
        <span>⚡</span>
      </div>

      <div className="tech-bubble absolute -left-3 top-32 -rotate-6">
        <span>💻</span>
      </div>

      <div className="tech-bubble absolute -right-2 bottom-24 rotate-3">
        <span>🚀</span>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/10 blur-xl h-8 w-[260px]" />
    </div>
  );
}

function TerminalIntro() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState<typeof TERMINAL_LINES>([]);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return;

    const current = TERMINAL_LINES[lineIdx];

    if (charIdx < current.text.length) {
      const timeout = window.setTimeout(
        () => setCharIdx((value) => value + 1),
        24,
      );

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setDone((value) => [...value, current]);
      setLineIdx((value) => value + 1);
      setCharIdx(0);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [lineIdx, charIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="anime-window overflow-hidden rounded-3xl border-[4px] border-slate-900 bg-slate-950 shadow-[10px_12px_0_#0f172a]">
      <div className="flex items-center gap-2 border-b-[3px] border-slate-900 bg-slate-800 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-300" />
        <span className="h-3 w-3 rounded-full bg-green-400" />

        <span className="ml-3 font-mono text-xs text-slate-400">
          youssef@portfolio: ~
        </span>
      </div>

      <div className="min-h-[270px] p-5 font-mono text-sm leading-7 sm:text-base">
        {done.map((line, index) => (
          <div key={`${line.text}-${index}`} className="flex gap-2">
            <span
              className={
                line.prompt === "$" ? "text-green-400" : "text-slate-500"
              }
            >
              {line.prompt}
            </span>
            <span
              className={
                line.prompt === "$" ? "text-white" : "text-slate-400"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {current && (
          <div className="flex gap-2">
            <span
              className={
                current.prompt === "$"
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              {current.prompt}
            </span>

            <span
              className={
                current.prompt === "$"
                  ? "text-white"
                  : "text-slate-400"
              }
            >
              {current.text.slice(0, charIdx)}
            </span>

            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({
  number,
  title,
  emoji,
}: {
  number: string;
  title: string;
  emoji: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="sticker-number">{number}</span>
          <span className="text-xl">{emoji}</span>
        </div>

        <h2 className="font-display text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h2>
      </div>

      <div className="hidden h-4 w-32 rounded-full border-2 border-slate-900 bg-yellow-300 rotate-2 sm:block" />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
}) {
  return (
    <div className="comic-mini-card">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="font-semibold leading-relaxed text-slate-800">
        {value}
      </div>
    </div>
  );
}

function SkillCard({
  group,
}: {
  group: (typeof SKILL_GROUPS)[number];
}) {
  const Icon = group.icon;
  const colors = COLOR_STYLES[group.color as ColorName];

  return (
    <div className="comic-card group h-full p-6">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-slate-900 ${colors.iconBg} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
        >
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>

        <h3 className="font-display text-xl font-black text-slate-900">
          {group.label}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`skill-pill ${colors.soft} ${colors.border}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [open, setOpen] = useState(false);

  const styles =
    COLOR_STYLES[
      project.accent as keyof typeof COLOR_STYLES
    ];

  return (
    <article className="comic-project-card group">
      <div className="absolute -right-2 -top-5 rotate-6 rounded-full border-[3px] border-slate-900 bg-yellow-300 px-4 py-2 font-display text-sm font-black shadow-[4px_4px_0_#0f172a] transition-transform duration-300 group-hover:rotate-12">
        {project.icon}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border-2 border-slate-900 bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-[2px_2px_0_#0f172a]">
              {project.nameAr}
            </span>
          </div>

          <h3 className="font-display text-2xl font-black text-slate-950 sm:text-3xl">
            {project.name}
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            {project.description}
          </p>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`comic-button shrink-0 ${styles.iconBg}`}
        >
          Live demo
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="stack-tag">
            {item}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-6 flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-4 py-2 font-display text-xs font-black text-slate-900 shadow-[3px_3px_0_#0f172a] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0f172a]"
      >
        {open ? "hide details" : "show details"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          open
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-3 border-t-2 border-dashed border-slate-300 pt-5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 leading-6 text-slate-600"
              >
                <span
                  className={`mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-slate-900 ${styles.iconBg}`}
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ContactCard() {
  return (
    <div className="comic-window overflow-hidden">
      <div className="flex items-center gap-2 border-b-[3px] border-slate-900 bg-slate-100 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-300" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-slate-500">
          contact.json
        </span>
      </div>

      <pre className="overflow-x-auto p-6 font-mono text-xs leading-7 text-slate-600 sm:text-sm">
{`{
  "name": "Youssef Yasser",
  "role": "Backend-First Fullstack Dev",
  "location": "Giza, Egypt",
  "available_for": [
    "remote roles",
    "internships"
  ],
  "response_time": "< 24h"
}`}
      </pre>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;

      const scrollHeight =
        (doc.scrollHeight || document.body.scrollHeight) -
        doc.clientHeight;

      const progress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowTop(scrollTop > 500);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          )[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        "youssefsea274@gmail.com",
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard may be unavailable.
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fffdf8] text-slate-900">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #fffdf8;
        }

        ::selection {
          background: #fde68a;
          color: #0f172a;
        }
      `}</style>

      <FloatingBackground />

      <div className="fixed left-0 right-0 top-0 z-[100] h-1.5 bg-slate-900/10">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
          style={{
            width: `${scrollProgress}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <header className="fixed left-0 right-0 top-1.5 z-50 px-4 pt-3 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border-[3px] border-slate-900 bg-white/90 px-4 py-3 shadow-[6px_6px_0_rgba(15,23,42,0.12)] backdrop-blur-md sm:px-5">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2 font-display text-lg font-black tracking-tight text-slate-950"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-[2px] border-slate-900 bg-yellow-300 transition-transform group-hover:-rotate-6">
              Y
            </span>
            <span className="hidden sm:inline">~/youssef</span>
          </button>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${
                  activeSection === link.id
                    ? "nav-link-active"
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://github.com/Youssefsea"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="mobile-menu-button lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border-[3px] border-slate-900 bg-white shadow-[6px_6px_0_rgba(15,23,42,0.12)] lg:hidden">
            <div className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`rounded-2xl px-4 py-3 text-left font-display text-sm font-black transition-colors ${
                    activeSection === link.id
                      ? "bg-yellow-200 text-slate-950"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3 border-t-[3px] border-slate-900 p-3">
              <a
                href="https://github.com/Youssefsea"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section
          id="hero"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-screen lg:pb-12"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-[3px] border-slate-900 bg-green-200 px-4 py-2 font-display text-xs font-black uppercase tracking-[0.12em] text-slate-900 shadow-[4px_4px_0_#0f172a]">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                  open to remote work
                </div>

                <div className="relative inline-block">
                  <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-7xl">
                    Youssef
                    <br />
                    <span className="relative inline-block">
                      Yasser
                      <span className="absolute -bottom-2 left-0 right-0 h-4 -skew-x-12 rounded-full bg-yellow-300/80 sm:h-5" />
                    </span>
                  </h1>

                  <span className="absolute -right-6 -top-5 hidden rotate-12 rounded-2xl border-[3px] border-slate-900 bg-pink-300 px-3 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a] sm:block">
                    HELLO!
                  </span>
                </div>

                <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                  fullstack developer, studying Computer Science at
                  Menoufia University. I design the systems under the
                  hood — then build the interface on top.
                </p>

                <div className="mt-5 flex items-center gap-2 font-display text-sm font-bold text-slate-500">
                  <MapPin className="h-4 w-4" />
                  Giza, Egypt
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo("projects")}
                    className="comic-main-button bg-yellow-300"
                  >
                    View Projects
                    <ArrowDown className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollTo("contact")}
                    className="comic-main-button bg-white"
                  >
                    Get in Touch
                    <Sparkles className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <div className="hero-badge bg-blue-100">
                    <span>⚙️</span>
                    Backend-first
                  </div>
                  <div className="hero-badge bg-pink-100">
                    <span>🧠</span>
                    AI Integrations
                  </div>
                  <div className="hero-badge bg-green-100">
                    <span>🚀</span>
                    Production Ready
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-7">
                <CartoonCharacter />
                <TerminalIntro />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[28px] border-[3px] border-slate-900 bg-white shadow-[8px_8px_0_#0f172a] sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`stat-card ${
                    index !== STATS.length - 1
                      ? "border-b-[3px] border-slate-900 sm:border-b-0 sm:border-r-[3px]"
                      : ""
                  } ${
                    index === 1
                      ? "bg-blue-50"
                      : index === 2
                        ? "bg-pink-50"
                        : index === 3
                          ? "bg-purple-50"
                          : "bg-green-50"
                  }`}
                >
                  <div className="font-display text-4xl font-black text-slate-950">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle number="01" title="about" emoji="👋" />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
            <Reveal delay={100}>
              <div className="comic-card p-7 sm:p-9">
                <div className="absolute -right-4 -top-5 rotate-[-7deg] rounded-xl border-[3px] border-slate-900 bg-pink-300 px-3 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a]">
                  ABOUT ME
                </div>

                <div className="space-y-5 text-lg leading-8 text-slate-600">
                  <p>
                    Junior Full Stack Web Developer with a proven track
                    record of designing and shipping production-ready
                    applications. Successfully built an AI-powered
                    fintech wallet handling ACID-compliant transactions
                    and distributed locking, and a geospatial food
                    delivery platform featuring 30+ REST API endpoints.
                    Expertise in Node.js, Express.js, PostgreSQL, MySQL,
                    Redis, and TypeScript/JavaScript, with a focus on
                    backend architecture, database optimization, and
                    scalable system design.
                  </p>

                  <p>
                    Right now I'm building{" "}
                    <span className="rounded-lg bg-yellow-200 px-2 py-1 font-bold text-slate-900">
                      ذاكر صح
                    </span>
                    , an EdTech SaaS platform connecting students with
                    learning centers across Egypt, and exploring
                    AI-powered financial tools with natural-language
                    transaction parsing.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="space-y-4">
                <InfoCard
                  icon={GraduationCap}
                  label="Education"
                  value="B.Sc. Computer Science, Menoufia University · 2023–2027"
                />

                <InfoCard
                  icon={Terminal}
                  label="Focus"
                  value="Fullstack Development"
                />

                <InfoCard
                  icon={Briefcase}
                  label="Current Goal"
                  value="Building production-grade backend-heavy systems."
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle number="02" title="stack" emoji="🧰" />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 70}
              >
                <SkillCard group={group} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle number="03" title="projects" emoji="🚀" />
          </Reveal>

          <div className="space-y-8">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.name} delay={index * 100}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle number="04" title="experience" emoji="💼" />
          </Reveal>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[34px] border-[4px] border-slate-900 bg-blue-100 p-7 shadow-[10px_10px_0_#0f172a] sm:p-10">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[4px] border-slate-900 bg-yellow-300" />
              <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full border-[4px] border-slate-900 bg-pink-300" />

              <div className="relative z-10 flex gap-5">
                <div className="relative flex flex-col items-center pt-2">
                  <span className="h-6 w-6 rounded-full border-[4px] border-slate-900 bg-green-400 shadow-[3px_3px_0_#0f172a]" />
                  <span className="mt-2 w-[4px] flex-1 rounded-full bg-slate-900/20" />
                </div>

                <div>
                  <div className="mb-2 inline-flex rounded-full border-[2px] border-slate-900 bg-white px-3 py-1 font-display text-xs font-black shadow-[3px_3px_0_#0f172a]">
                    Gulf of Suez Petroleum Company
                  </div>

                  <h3 className="font-display text-2xl font-black text-slate-950 sm:text-3xl">
                    IT Intern — GUPCO
                  </h3>

                  <p className="mt-2 font-mono text-sm font-semibold text-slate-500">
                    Egypt
                  </p>

                  <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                    Selected for an IT internship at a major petroleum
                    enterprise, working across backend development,
                    database architecture, and enterprise infrastructure
                    workflows.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle number="05" title="contact" emoji="📬" />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal delay={100}>
              <div className="comic-card p-7 sm:p-9">
                <div className="mb-6 inline-flex rotate-[-3deg] rounded-xl border-[3px] border-slate-900 bg-green-300 px-4 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a]">
                  LET&apos;S BUILD
                </div>

                <h3 className="max-w-xl font-display text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  Let's build something that runs in production.
                </h3>

                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Open to remote roles and international internships.
                  If you have a backend-heavy problem — or just want to
                  talk system design — my inbox is open.
                </p>

                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="contact-link"
                  >
                    <Mail className="h-5 w-5" />
                    youssefsea274@gmail.com

                    {copied ? (
                      <Check className="ml-auto h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="ml-auto h-5 w-5 opacity-30 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>

                  <a
                    href="tel:+201104699278"
                    className="contact-link"
                  >
                    <Phone className="h-5 w-5" />
                    +20 110 469 9278
                  </a>

                  <a
                    href="https://github.com/Youssefsea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <FaGithub className="h-5 w-5" />
                    github.com/Youssefsea
                  </a>

                  <a
                    href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <FaLinkedin className="h-5 w-5" />
                    linkedin.com/in/youssef-yasser
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <ContactCard />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-5 pb-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[28px] border-[3px] border-slate-900 bg-white px-6 py-5 font-mono text-xs text-slate-500 shadow-[6px_6px_0_#0f172a] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 Youssef Yasser. Built with Next.js.
          </span>

          <span className="flex items-center gap-2 font-black text-slate-700">
            <span className="h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400" />
            status: available
          </span>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-slate-900 bg-yellow-300 text-slate-950 shadow-[5px_5px_0_#0f172a] transition-transform hover:-translate-y-1 hover:rotate-3"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
