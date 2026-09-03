"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  Terminal,
  Database,
  Server,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowUp,
  MapPin,
  Copy,
  Check,
  Rocket,
  Star,
  Zap,
  Heart,
  Coffee,
  Github,
  Linkedin,
  CircleDot,
} from "lucide-react";

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
    emoji: "📚",
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
    emoji: "🍔",
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
    emoji: "💰",
  },
];

const STATS = [
  { value: "3", label: "shipped apps", icon: Rocket },
  { value: "30+", label: "REST endpoints", icon: Zap },
  { value: "3", label: "roles per platform", icon: Star },
  { value: "2027", label: "graduating", icon: GraduationCap },
];

const NAV_LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

const COLOR_STYLES = {
  green: {
    card: "border-[#50d890]",
    shadow: "shadow-[7px_7px_0_#50d890]",
    icon: "bg-[#50d890]",
    badge: "bg-[#dfffea] text-[#157447]",
    hover: "group-hover:bg-[#50d890]",
  },
  orange: {
    card: "border-[#ff9f43]",
    shadow: "shadow-[7px_7px_0_#ff9f43]",
    icon: "bg-[#ff9f43]",
    badge: "bg-[#fff0dd] text-[#a84e00]",
    hover: "group-hover:bg-[#ff9f43]",
  },
  purple: {
    card: "border-[#9b7cff]",
    shadow: "shadow-[7px_7px_0_#9b7cff]",
    icon: "bg-[#9b7cff]",
    badge: "bg-[#eee9ff] text-[#5b42a9]",
    hover: "group-hover:bg-[#9b7cff]",
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
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
        threshold: 0.1,
      }
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

function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-[5%] top-[18%] cartoon-star animate-float-slow">
        <Star size={28} fill="currentColor" />
      </div>

      <div className="absolute right-[8%] top-[23%] text-[#ff9f43] animate-float">
        <Zap size={35} fill="currentColor" />
      </div>

      <div className="absolute left-[8%] bottom-[22%] text-[#9b7cff] animate-wiggle">
        <Sparkles size={35} />
      </div>

      <div className="absolute right-[12%] bottom-[17%] text-[#50d890] animate-float-slow">
        <Heart size={30} fill="currentColor" />
      </div>

      <span className="absolute left-[24%] top-[31%] doodle-dot" />
      <span className="absolute right-[22%] top-[42%] doodle-dot doodle-dot-purple" />
      <span className="absolute left-[14%] bottom-[29%] doodle-dot doodle-dot-orange" />

      <div className="absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-[#50d890]/25 blur-3xl" />
      <div className="absolute -right-24 top-[40%] h-80 w-80 rounded-full bg-[#9b7cff]/20 blur-3xl" />
      <div className="absolute left-[40%] bottom-[-150px] h-80 w-80 rounded-full bg-[#ff9f43]/20 blur-3xl" />
    </div>
  );
}

function CartoonBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#171717] bg-white px-4 py-2 text-sm font-black text-[#171717] shadow-[4px_4px_0_#171717] transition-transform hover:-translate-y-1">
      <span className="status-dot" />
      open to remote work
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
      const timeout = setTimeout(() => {
        setCharIdx((value) => value + 1);
      }, 22);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDone((value) => [...value, current]);
      setLineIdx((value) => value + 1);
      setCharIdx(0);
    }, 350);

    return () => clearTimeout(timeout);
  }, [lineIdx, charIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="relative">
      <div className="absolute -right-4 -top-5 z-10 rotate-6 rounded-full border-[3px] border-[#171717] bg-[#ffe66d] px-4 py-2 font-black shadow-[4px_4px_0_#171717]">
        <span className="mr-1">✨</span>
        dev mode
      </div>

      <div className="cartoon-window overflow-hidden rounded-[28px] border-[4px] border-[#171717] bg-[#202020]">
        <div className="flex items-center gap-2 border-b-[3px] border-[#171717] bg-[#343434] px-5 py-4">
          <span className="window-dot bg-[#ff6b6b]" />
          <span className="window-dot bg-[#ffe66d]" />
          <span className="window-dot bg-[#50d890]" />

          <span className="ml-3 text-xs font-bold text-zinc-400">
            youssef@portfolio ~
          </span>
        </div>

        <div className="min-h-[285px] p-6 font-mono text-sm leading-8 text-zinc-100 sm:text-base">
          {done.map((line, index) => (
            <div key={index} className="flex gap-3">
              <span
                className={
                  line.prompt === "$"
                    ? "font-bold text-[#50d890]"
                    : "font-bold text-[#ff9f43]"
                }
              >
                {line.prompt}
              </span>

              <span>{line.text}</span>
            </div>
          ))}

          {current && (
            <div className="flex gap-3">
              <span
                className={
                  current.prompt === "$"
                    ? "font-bold text-[#50d890]"
                    : "font-bold text-[#ff9f43]"
                }
              >
                {current.prompt}
              </span>

              <span>{current.text.slice(0, charIdx)}</span>

              <span className="cursor-blink inline-block h-5 w-2.5 bg-[#ffe66d]" />
            </div>
          )}

          {lineIdx >= TERMINAL_LINES.length && (
            <div className="mt-3 flex items-center gap-2 text-[#50d890]">
              <CircleDot size={15} />
              system online
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  emoji,
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 rotate-[-7deg] items-center justify-center rounded-2xl border-[3px] border-[#171717] bg-[#ffe66d] text-2xl shadow-[5px_5px_0_#171717]">
          {emoji}
        </div>

        <div>
          <div className="mb-1 font-mono text-xs font-black text-[#6f6f6f]">
            {index}
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#171717] sm:text-5xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="hidden items-center gap-1 sm:flex">
        <span className="h-2 w-2 rounded-full bg-[#171717]" />
        <span className="h-2 w-8 rounded-full bg-[#171717]" />
        <span className="h-2 w-2 rounded-full bg-[#171717]" />
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-4 rounded-2xl border-[3px] border-[#171717] bg-white p-4 shadow-[5px_5px_0_#171717] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dfffea] text-[#157447]">
        <Icon size={19} />
      </div>

      <div>
        <div className="mb-1 text-xs font-black uppercase tracking-wider text-[#777]">
          {label}
        </div>

        <div className="text-sm font-bold leading-6 text-[#292929]">
          {value}
        </div>
      </div>
    </div>
  );
}

function SkillCard({
  group,
  index,
}) {
  const Icon = group.icon;

  const backgrounds = {
    blue: "bg-[#dff1ff]",
    purple: "bg-[#eee9ff]",
    pink: "bg-[#ffe2f0]",
    yellow: "bg-[#fff2b9]",
    orange: "bg-[#ffe7d1]",
  };

  return (
    <Reveal delay={index * 80}>
      <div className="cartoon-card group relative h-full overflow-hidden rounded-[25px] border-[3px] border-[#171717] bg-white p-5 shadow-[6px_6px_0_#171717] transition-all duration-300 hover:-translate-y-2 hover:rotate-[0.7deg]">
        <div
          className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-70 ${
            backgrounds[group.color as keyof typeof backgrounds]
          }`}
        />

        <div className="relative mb-5 flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-[#171717] ${
              backgrounds[group.color as keyof typeof backgrounds]
            } shadow-[3px_3px_0_#171717] transition-transform duration-300 group-hover:rotate-[-8deg]`}
          >
            <Icon size={21} />
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#888]">
              toolbox
            </div>

            <h3 className="text-lg font-black text-[#171717]">
              {group.label}
            </h3>
          </div>
        </div>

        <div className="relative flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span
              key={item}
              className="rounded-xl border-2 border-[#252525] bg-[#f8f8f8] px-3 py-1.5 text-xs font-bold text-[#383838] transition-all duration-200 hover:-translate-y-1 hover:bg-[#171717] hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({
  project,
  index,
}) {
  const [open, setOpen] = useState(false);
  const style = COLOR_STYLES[project.accent as keyof typeof COLOR_STYLES];

  return (
    <Reveal delay={index * 100}>
      <article
        className={`group relative overflow-hidden rounded-[32px] border-[4px] border-[#171717] bg-white p-5 ${style.shadow} transition-all duration-300 hover:-translate-y-2 sm:p-7`}
      >
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#f8f8f8]" />

        <div className="absolute right-5 top-5 text-4xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          {project.emoji}
        </div>

        <div className="relative flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`inline-flex rounded-full border-2 border-[#171717] px-3 py-1 text-xs font-black ${style.badge}`}
              >
                {project.nameAr}
              </span>

              <span className="text-xs font-black text-[#999]">
                PROJECT {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="max-w-xl text-2xl font-black text-[#171717] sm:text-3xl">
              {project.name}
            </h3>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-[#171717] bg-[#171717] px-4 py-2.5 text-sm font-black text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-[#171717]"
          >
            Live demo
            <ExternalLink size={16} />
          </a>
        </div>

        <p className="relative mt-5 max-w-3xl text-sm font-semibold leading-7 text-[#616161] sm:text-base">
          {project.description}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-xl border-2 border-[#252525] bg-[#f8f8f8] px-3 py-1.5 text-xs font-black text-[#383838]"
            >
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className={`relative mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-[#171717] px-4 py-2 text-sm font-black text-[#171717] transition-all hover:-translate-y-1 ${style.badge}`}
        >
          {open ? "hide details" : "show details"}

          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ${
            open
              ? "mt-5 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-3 border-t-[3px] border-dashed border-[#d1d1d1] pt-5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#535353]"
                >
                  <span
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${style.icon}`}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function TerminalContact() {
  return (
    <div className="cartoon-window overflow-hidden rounded-[28px] border-[4px] border-[#171717] bg-[#202020] shadow-[7px_7px_0_#171717]">
      <div className="flex items-center gap-2 border-b-[3px] border-[#171717] bg-[#343434] px-5 py-4">
        <span className="window-dot bg-[#ff6b6b]" />
        <span className="window-dot bg-[#ffe66d]" />
        <span className="window-dot bg-[#50d890]" />

        <span className="ml-3 text-xs font-bold text-zinc-400">
          contact.json
        </span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-xs leading-7 text-zinc-300 sm:text-sm">
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
    const onScroll = () => {
      const doc = document.documentElement;

      const scrollTop =
        doc.scrollTop || document.body.scrollTop;

      const scrollHeight =
        (doc.scrollHeight || document.body.scrollHeight) -
        doc.clientHeight;

      setScrollProgress(
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 100
          : 0
      );

      setShowTop(scrollTop > 500);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
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
        "youssefsea274@gmail.com"
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf0] text-[#171717]">
      <FloatingDecorations />

      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-[100] h-2 bg-[#171717]/10">
        <div
          className="h-full bg-[#50d890] transition-[width] duration-150"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-2 z-50 px-3 pt-3">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[24px] border-[3px] border-[#171717] bg-white/95 px-4 py-3 shadow-[5px_5px_0_#171717] backdrop-blur-md sm:px-6">
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2 font-black tracking-tight"
          >
            <span className="flex h-9 w-9 rotate-[-7deg] items-center justify-center rounded-xl border-2 border-[#171717] bg-[#ffe66d] text-lg shadow-[2px_2px_0_#171717] transition-transform group-hover:rotate-6">
              Y
            </span>

            <span className="hidden sm:block">
              ~/youssef
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`rounded-xl px-4 py-2 text-sm font-black transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-[#171717] text-white shadow-[3px_3px_0_#50d890]"
                    : "text-[#666] hover:-translate-y-1 hover:bg-[#f4f4f4] hover:text-[#171717]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://github.com/Youssefsea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#171717] bg-[#f7f7f7] transition-all hover:-translate-y-1 hover:rotate-[-6deg] hover:bg-[#171717] hover:text-white"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#171717] bg-[#f7f7f7] transition-all hover:-translate-y-1 hover:rotate-[6deg] hover:bg-[#171717] hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#171717] bg-[#ffe66d] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-[24px] border-[3px] border-[#171717] bg-white p-4 shadow-[5px_5px_0_#171717] md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="rounded-xl px-4 py-3 text-left font-black text-[#444] transition-colors hover:bg-[#ffe66d] hover:text-[#171717]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2 border-t-2 border-dashed border-[#ddd] pt-3">
              <a
                href="https://github.com/Youssefsea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#171717]"
              >
                <Github size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#171717]"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section
          id="hero"
          className="grid min-h-screen items-center gap-14 pb-16 pt-36 lg:grid-cols-[1.05fr_.95fr]"
        >
          <div>
            <Reveal>
              <CartoonBadge />
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8">
                <div className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#888]">
                  Hey, I&apos;m
                </div>

                <h1 className="text-[clamp(3.4rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.06em] text-[#171717]">
                  Youssef
                  <br />
                  <span className="relative inline-block text-[#50d890]">
                    Yasser
                    <svg
                      className="absolute -bottom-4 left-0 w-full"
                      viewBox="0 0 280 24"
                      fill="none"
                    >
                      <path
                        d="M4 16C65 5 167 7 273 15"
                        stroke="#171717"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-[#5d5d5d] sm:text-xl">
                fullstack developer, studying Computer Science
                at Menoufia University. I design the systems
                under the hood — then build the interface on
                top.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-5 flex items-center gap-2 font-bold text-[#666]">
                <MapPin
                  size={18}
                  className="text-[#ff9f43]"
                />
                Giza, Egypt
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="group inline-flex items-center gap-2 rounded-2xl border-[3px] border-[#171717] bg-[#50d890] px-6 py-3.5 font-black shadow-[5px_5px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717]"
                >
                  View Projects
                  <Rocket
                    size={18}
                    className="transition-transform group-hover:-translate-y-1 group-hover:rotate-[-8deg]"
                  />
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-[#171717] bg-white px-6 py-3.5 font-black shadow-[5px_5px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:bg-[#ffe66d]"
                >
                  Get in Touch
                  <Heart size={18} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="sticker sticker-yellow">
                  backend-first
                </span>
                <span className="sticker sticker-green">
                  systems
                </span>
                <span className="sticker sticker-purple">
                  AI curious
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="relative">
              <div className="absolute -left-8 top-8 hidden rotate-[-12deg] rounded-2xl border-[3px] border-[#171717] bg-[#ff9f43] px-4 py-3 font-black shadow-[4px_4px_0_#171717] sm:block">
                ship it! 🚀
              </div>

              <div className="absolute -bottom-5 -right-2 z-10 rotate-[8deg] rounded-2xl border-[3px] border-[#171717] bg-[#ffe66d] px-4 py-3 font-black shadow-[4px_4px_0_#171717]">
                <Coffee size={15} className="mr-1 inline" />
                powered by coffee
              </div>

              <TerminalIntro />
            </div>
          </Reveal>
        </section>

        {/* STATS */}
        <Reveal>
          <section className="relative mb-28">
            <div className="grid grid-cols-2 overflow-hidden rounded-[30px] border-[4px] border-[#171717] bg-[#171717] shadow-[8px_8px_0_#50d890] sm:grid-cols-4">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`group relative p-5 text-center sm:p-7 ${
                      index > 0
                        ? "border-t-2 border-white/10 sm:border-l-2 sm:border-t-0"
                        : ""
                    }`}
                  >
                    <Icon
                      size={18}
                      className="mx-auto mb-3 text-[#ffe66d] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12"
                    />

                    <div className="text-3xl font-black text-white sm:text-4xl">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-xs font-bold text-zinc-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* ABOUT */}
        <section
          id="about"
          className="scroll-mt-32 py-24"
        >
          <Reveal>
            <SectionHeading
              index="01"
              title="about"
              emoji="👋"
            />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_.8fr]">
            <Reveal delay={100}>
              <div className="relative rounded-[32px] border-[4px] border-[#171717] bg-white p-6 shadow-[8px_8px_0_#171717] sm:p-8">
                <div className="absolute -right-3 -top-5 rotate-[8deg] rounded-xl border-2 border-[#171717] bg-[#ffe66d] px-3 py-1 text-xs font-black shadow-[3px_3px_0_#171717]">
                  about me
                </div>

                <div className="space-y-5 text-base font-semibold leading-8 text-[#5d5d5d]">
                  <p>
                    Junior Full Stack Web Developer with a proven
                    track record of designing and shipping
                    production-ready applications. Successfully
                    built an AI-powered fintech wallet handling
                    ACID-compliant transactions and distributed
                    locking, and a geospatial food delivery
                    platform featuring 30+ REST API endpoints.
                    Expertise in Node.js, Express.js, PostgreSQL,
                    MySQL, Redis, and TypeScript/JavaScript, with
                    a focus on backend architecture, database
                    optimization, and scalable system design.
                  </p>

                  <p>
                    Right now I&apos;m building{" "}
                    <span className="rounded-lg bg-[#dfffea] px-2 py-1 font-black text-[#157447]">
                      ذاكر صح
                    </span>
                    , an EdTech SaaS platform connecting students
                    with learning centers across Egypt, and
                    exploring AI-powered financial tools with
                    natural-language transaction parsing.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="space-y-5">
                <InfoRow
                  icon={GraduationCap}
                  label="Education"
                  value="B.Sc. Computer Science, Menoufia University · 2023–2027"
                />

                <InfoRow
                  icon={Terminal}
                  label="Focus"
                  value="Fullstack Development"
                />

                <div className="rounded-[28px] border-[3px] border-[#171717] bg-[#ffe66d] p-6 shadow-[6px_6px_0_#171717]">
                  <div className="mb-3 flex items-center gap-2 font-black">
                    <Sparkles size={18} />
                    current mission
                  </div>

                  <p className="font-bold leading-7">
                    Build useful products, solve hard backend
                    problems, and make the UI actually fun to use.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="scroll-mt-32 border-t-[3px] border-dashed border-[#d5d5d5] py-24"
        >
          <Reveal>
            <SectionHeading
              index="02"
              title="stack"
              emoji="🧰"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => (
              <SkillCard
                key={group.label}
                group={group}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-32 border-t-[3px] border-dashed border-[#d5d5d5] py-24"
        >
          <Reveal>
            <SectionHeading
              index="03"
              title="projects"
              emoji="🚀"
            />
          </Reveal>

          <div className="mt-10 space-y-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className="scroll-mt-32 border-t-[3px] border-dashed border-[#d5d5d5] py-24"
        >
          <Reveal>
            <SectionHeading
              index="04"
              title="experience"
              emoji="💼"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mt-12">
              <div className="absolute left-[23px] top-0 h-full w-[4px] rounded-full bg-[#171717]" />

              <div className="relative flex gap-6">
                <div className="relative z-10 flex h-12 w-12 shrink-0 rotate-[-8deg] items-center justify-center rounded-2xl border-[3px] border-[#171717] bg-[#50d890] shadow-[4px_4px_0_#171717]">
                  <Briefcase size={21} />
                </div>

                <div className="w-full rounded-[30px] border-[4px] border-[#171717] bg-white p-6 shadow-[7px_7px_0_#171717] sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 inline-flex rounded-full border-2 border-[#171717] bg-[#dfffea] px-3 py-1 text-xs font-black text-[#157447]">
                        IT INTERN
                      </div>

                      <h3 className="text-xl font-black text-[#171717] sm:text-2xl">
                        IT Intern — GUPCO
                      </h3>

                      <p className="mt-1 text-sm font-bold text-[#888]">
                        Gulf of Suez Petroleum Company · Egypt
                      </p>
                    </div>

                    <div className="rotate-3 rounded-xl border-2 border-[#171717] bg-[#ffe66d] px-3 py-2 text-xs font-black">
                      selected
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-[#5d5d5d] sm:text-base">
                    Selected for an IT internship at a major
                    petroleum enterprise, working across backend
                    development, database architecture, and
                    enterprise infrastructure workflows.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-32 border-t-[3px] border-dashed border-[#d5d5d5] py-24"
        >
          <Reveal>
            <SectionHeading
              index="05"
              title="contact"
              emoji="📮"
            />
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <Reveal delay={100}>
              <div className="rounded-[32px] border-[4px] border-[#171717] bg-[#50d890] p-6 shadow-[8px_8px_0_#171717] sm:p-8">
                <div className="mb-3 text-sm font-black uppercase tracking-wider text-[#276f4c]">
                  let&apos;s talk
                </div>

                <h3 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-[#171717] sm:text-5xl">
                  Let&apos;s build something that runs in production.
                </h3>

                <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-[#285b42]">
                  Open to remote roles and international
                  internships. If you have a backend-heavy problem —
                  or just want to talk system design — my inbox is
                  open.
                </p>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={copyEmail}
                    className="group flex w-full items-center gap-3 rounded-2xl border-[3px] border-[#171717] bg-white px-4 py-3 text-left text-sm font-black text-[#171717] transition-all hover:-translate-y-1 hover:bg-[#ffe66d]"
                  >
                    <Mail size={18} />

                    <span className="min-w-0 flex-1 truncate">
                      youssefsea274@gmail.com
                    </span>

                    {copied ? (
                      <Check
                        size={17}
                        className="text-[#157447]"
                      />
                    ) : (
                      <Copy
                        size={16}
                        className="opacity-50 transition-opacity group-hover:opacity-100"
                      />
                    )}
                  </button>

                  <a
                    href="tel:+201104699278"
                    className="flex items-center gap-3 rounded-2xl border-[3px] border-[#171717] bg-white px-4 py-3 text-sm font-black text-[#171717] transition-all hover:-translate-y-1 hover:bg-[#ffe66d]"
                  >
                    <Phone size={18} />
                    +20 110 469 9278
                  </a>

                  <a
                    href="https://github.com/Youssefsea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border-[3px] border-[#171717] bg-white px-4 py-3 text-sm font-black text-[#171717] transition-all hover:-translate-y-1 hover:bg-[#ffe66d]"
                  >
                    <Github size={18} />
                    github.com/Youssefsea
                  </a>

                  <a
                    href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border-[3px] border-[#171717] bg-white px-4 py-3 text-sm font-black text-[#171717] transition-all hover:-translate-y-1 hover:bg-[#ffe66d]"
                  >
                    <Linkedin size={18} />
                    linkedin.com/in/youssef-yasser
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <TerminalContact />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t-[3px] border-[#171717] bg-[#171717] px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-xs font-bold text-zinc-400">
            © 2026 Youssef Yasser. Built with Next.js.
          </span>

          <span className="flex items-center gap-2 text-xs font-bold text-zinc-400">
            <span className="status-dot" />
            status: available
          </span>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-[#171717] bg-[#ffe66d] text-[#171717] shadow-[4px_4px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:rotate-[-6deg]"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
