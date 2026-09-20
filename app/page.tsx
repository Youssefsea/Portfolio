"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  Download,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Server,
  Sparkles,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type Language = "en" | "ar";
type Theme = "light" | "dark";
type ColorName = "green" | "blue" | "purple" | "orange" | "pink" | "yellow";

const EMAIL = "youssefsea274@gmail.com";
const PHONE = "+20 110 469 9278";
const LINKEDIN = "https://www.linkedin.com/in/youssef-yasser-97aa742b0";
const GITHUB = "https://github.com/Youssefsea";
const CV_PATH = "/public/cvv.pdf";

const NAV_LINKS = [
  { id: "about", en: "About", ar: "من أنا" },
  { id: "skills", en: "Stack", ar: "التقنيات" },
  { id: "projects", en: "Projects", ar: "المشاريع" },
  { id: "experience", en: "Experience", ar: "الخبرة" },
  { id: "contact", en: "Contact", ar: "تواصل" },
] as const;

const STATS = [
  { value: "3", en: "live projects", ar: "مشاريع حية" },
  { value: "30+", en: "REST endpoints", ar: "REST endpoints" },
  { value: "3", en: "platform roles", ar: "أدوار للمنصة" },
  { value: "2027", en: "graduation", ar: "سنة التخرج" },
] as const;

const TERMINAL_LINES = {
  en: [
    { prompt: "$", text: "whoami" },
    { prompt: ">", text: "Youssef Yasser" },
    { prompt: "$", text: "role --current" },
    { prompt: ">", text: "Backend-first Fullstack Developer" },
    { prompt: "$", text: "focus --now" },
    { prompt: ">", text: "APIs • Databases • Systems • UI" },
  ],
  ar: [
    { prompt: "$", text: "whoami" },
    { prompt: ">", text: "Youssef Yasser" },
    { prompt: "$", text: "role --current" },
    { prompt: ">", text: "Fullstack Developer — Backend First" },
    { prompt: "$", text: "focus --now" },
    { prompt: ">", text: "APIs • Databases • Systems • UI" },
  ],
} as const;

const SKILL_GROUPS: {
  label: { en: string; ar: string };
  icon: LucideIcon;
  color: ColorName;
  items: string[];
}[] = [
  {
    label: { en: "Backend", ar: "Backend" },
    icon: Server,
    color: "blue",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "MVC",
      "JWT Authentication",
      "HTTP-only Cookies",
    ],
  },
  {
    label: { en: "Databases", ar: "قواعد البيانات" },
    icon: Database,
    color: "purple",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Schema Design",
      "Geospatial Queries",
      "pgAdmin",
    ],
  },
  {
    label: { en: "Frontend", ar: "Frontend" },
    icon: Code2,
    color: "pink",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "RTL / Arabic UI",
    ],
  },
  {
    label: { en: "AI & Integrations", ar: "AI والتكاملات" },
    icon: Sparkles,
    color: "yellow",
    items: [
      "Gemini API",
      "NLP",
      "Web Speech API",
      "Leaflet.js",
      "Cloudinary",
    ],
  },
  {
    label: { en: "Tools & DevOps", ar: "الأدوات و DevOps" },
    icon: Cpu,
    color: "orange",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "AWS Basics",
      "Postman",
      "API Documentation",
    ],
  },
  {
    label: { en: "Engineering", ar: "هندسة البرمجيات" },
    icon: Terminal,
    color: "green",
    items: [
      "Transactions",
      "Idempotency",
      "Redis Locks",
      "Authentication",
      "Geospatial Logic",
      "Role-based Access",
    ],
  },
];

const PROJECTS = [
  {
    name: { en: "EdTech SaaS Platform", ar: "ذاكر صح — منصة تعليمية SaaS" },
    slug: "Zaker Sah",
    description: {
      en: "An educational platform connecting students, learning centers, and tutors with role-aware workflows, booking logic, and protected learning content.",
      ar: "منصة تعليمية بتربط الطلاب بالمراكز والمدرسين، مع نظام أدوار وحجوزات وحماية للمحتوى التعليمي.",
    },
    highlights: {
      en: [
        "Student, Center Admin, and Teacher roles",
        "Geolocation-based discovery",
        "Protected streaming for paid content",
        "Automatic schedule-conflict detection",
        "Super Admin dashboard and analytics",
      ],
      ar: [
        "أدوار للطالب والمركز والمدرس",
        "اكتشاف الأماكن والمدرسين حسب الموقع",
        "حماية المحتوى المدفوع",
        "منع تعارض مواعيد الحجز",
        "لوحة Super Admin وتحليلات",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "React"],
    link: "https://center-saas-front-83p8.vercel.app/",
    accent: "green" as ColorName,
    number: "01",
  },
  {
    name: { en: "Food Delivery Platform", ar: "أكلي — منصة توصيل أكل" },
    slug: "Akli",
    description: {
      en: "A customer-and-vendor food delivery platform built around order flows, location-aware delivery pricing, and real-time communication.",
      ar: "منصة توصيل للعميل والمطعم، فيها إدارة طلبات وتسعير حسب المسافة وشات مباشر.",
    },
    highlights: {
      en: [
        "Customer and vendor workflows",
        "GPS + Haversine delivery calculation",
        "Multi-restaurant cart logic",
        "Vodafone Cash / InstaPay payment proof flow",
        "Real-time order communication",
      ],
      ar: [
        "Workflow منفصل للعميل والمطعم",
        "حساب المسافة والتوصيل بالـGPS وHaversine",
        "سلة تدعم أكتر من مطعم",
        "إثبات دفع Vodafone Cash / InstaPay",
        "تواصل مباشر أثناء الطلب",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Socket.IO", "Leaflet"],
    link: "https://food-front-rho.vercel.app/",
    accent: "orange" as ColorName,
    number: "02",
  },
  {
    name: { en: "WealthWise AI", ar: "WealthWise AI — محفظة مالية" },
    slug: "Finance",
    description: {
      en: "An AI-assisted wallet that converts typed or spoken Arabic into structured financial transactions while protecting money-moving operations.",
      ar: "محفظة مالية بتحول الكلام العربي لمعاملات مالية منظمة مع حماية للعمليات الحساسة.",
    },
    highlights: {
      en: [
        "Gemini-powered Arabic transaction parsing",
        "SERIALIZABLE isolation for sensitive operations",
        "Redis locks for concurrency control",
        "Idempotency keys on money-moving endpoints",
        "Arabic voice input via Web Speech API",
      ],
      ar: [
        "تحليل المعاملات العربية باستخدام Gemini",
        "SERIALIZABLE للعمليات الحساسة",
        "Redis locks للتحكم في الـconcurrency",
        "Idempotency keys للعمليات المالية",
        "إدخال صوتي عربي باستخدام Web Speech API",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Gemini AI"],
    link: "https://wallet-wep-react.vercel.app/",
    accent: "purple" as ColorName,
    number: "03",
  },
];

const COLOR_STYLES: Record<
  ColorName,
  {
    text: string;
    soft: string;
    border: string;
    bg: string;
    dot: string;
  }
> = {
  green: {
    text: "text-emerald-600 dark:text-emerald-400",
    soft: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-900",
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    dot: "bg-emerald-400",
  },
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    soft: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-900",
    bg: "bg-blue-100 dark:bg-blue-950/50",
    dot: "bg-blue-400",
  },
  purple: {
    text: "text-violet-600 dark:text-violet-400",
    soft: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-900",
    bg: "bg-violet-100 dark:bg-violet-950/50",
    dot: "bg-violet-400",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    soft: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-900",
    bg: "bg-orange-100 dark:bg-orange-950/50",
    dot: "bg-orange-400",
  },
  pink: {
    text: "text-pink-600 dark:text-pink-400",
    soft: "bg-pink-50 dark:bg-pink-950/40",
    border: "border-pink-200 dark:border-pink-900",
    bg: "bg-pink-100 dark:bg-pink-950/50",
    dot: "bg-pink-400",
  },
  yellow: {
    text: "text-amber-600 dark:text-amber-400",
    soft: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-900",
    bg: "bg-amber-100 dark:bg-amber-950/50",
    dot: "bg-amber-400",
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
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
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-slate-400 dark:bg-slate-600" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {eyebrow}
        </span>
      </div>

      <h2 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function TerminalPanel({ language }: { language: Language }) {
  const lines = TERMINAL_LINES[language];
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState<(typeof lines)[number][]>([]);

  useEffect(() => {
    setLineIdx(0);
    setCharIdx(0);
    setDone([]);
  }, [language]);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const restart = window.setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
        setDone([]);
      }, 2200);

      return () => window.clearTimeout(restart);
    }

    const current = lines[lineIdx];

    if (charIdx < current.text.length) {
      const timer = window.setTimeout(() => {
        setCharIdx((value) => value + 1);
      }, 24);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setDone((value) => [...value, current]);
      setLineIdx((value) => value + 1);
      setCharIdx(0);
    }, 260);

    return () => window.clearTimeout(timer);
  }, [lineIdx, charIdx, lines]);

  const current = lines[lineIdx];

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-[#09111f] shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <span className="font-mono text-[11px] text-slate-500">
          youssef@portfolio
        </span>
      </div>

      <div className="min-h-[240px] p-5 font-mono text-sm leading-8 sm:min-h-[280px] sm:p-7 sm:text-[15px]">
        {done.map((line, index) => (
          <div key={`${line.text}-${index}`} className="flex gap-3">
            <span
              className={
                line.prompt === "$" ? "text-emerald-400" : "text-slate-500"
              }
            >
              {line.prompt}
            </span>
            <span
              className={
                line.prompt === "$" ? "text-slate-100" : "text-slate-400"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {current && (
          <div className="flex gap-3">
            <span
              className={
                current.prompt === "$" ? "text-emerald-400" : "text-slate-500"
              }
            >
              {current.prompt}
            </span>
            <span
              className={
                current.prompt === "$" ? "text-slate-100" : "text-slate-400"
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

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -right-4 -top-5 h-24 w-24 rounded-full bg-emerald-200/70 blur-2xl dark:bg-emerald-500/10" />
      <div className="absolute -bottom-8 -left-3 h-28 w-28 rounded-full bg-blue-200/70 blur-2xl dark:bg-blue-500/10" />

      <div className="relative rounded-[32px] border border-slate-200/90 bg-white/90 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                YY
              </div>

              <div>
                <div className="text-sm font-bold text-slate-950 dark:text-white">
                  Youssef Yasser
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Fullstack Developer
                </div>
              </div>
            </div>

            <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400 sm:block">
              AVAILABLE
            </div>
          </div>

          <div className="grid gap-3 py-5 sm:grid-cols-2">
            {[
              ["Backend", "Node.js · Express"],
              ["Database", "PostgreSQL · Redis"],
              ["Frontend", "Next.js · React"],
              ["Engineering", "Auth · Transactions"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {label}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-400">
                current-focus.ts
              </span>
              <span className="text-[11px] text-emerald-400">● active</span>
            </div>

            <div className="font-mono text-xs leading-7 sm:text-sm">
              <div>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-blue-300">focus</span> ={" "}
                <span className="text-amber-300">{"{"}</span>
              </div>
              <div className="pl-5">
                <span className="text-slate-400">backend:</span>{" "}
                <span className="text-emerald-300">true</span>,
              </div>
              <div className="pl-5">
                <span className="text-slate-400">systems:</span>{" "}
                <span className="text-emerald-300">true</span>,
              </div>
              <div className="pl-5">
                <span className="text-slate-400">clean-ui:</span>{" "}
                <span className="text-emerald-300">true</span>,
              </div>
              <div>
                <span className="text-amber-300">{"}"}</span>;
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 left-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Code2 className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              building
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Real systems, not just screens.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCard({
  group,
  language,
}: {
  group: (typeof SKILL_GROUPS)[number];
  language: Language;
}) {
  const Icon = group.icon;
  const style = COLOR_STYLES[group.color];

  return (
    <article className="group rounded-[26px] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${style.bg}`}
          >
            <Icon className={`h-5 w-5 ${style.text}`} />
          </div>

          <h3 className="font-display text-xl font-black text-slate-950 dark:text-white">
            {group.label[language]}
          </h3>
        </div>

        <span
          className={`mt-2 h-2.5 w-2.5 rounded-full ${style.dot} opacity-70`}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${style.soft} ${style.border} ${style.text}`}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  language,
}: {
  project: (typeof PROJECTS)[number];
  language: Language;
}) {
  const [open, setOpen] = useState(false);
  const style = COLOR_STYLES[project.accent];

  return (
    <article className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
      <div
        className={`absolute inset-x-0 top-0 h-1 ${style.dot}`}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-400">
              {project.number}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${style.soft} ${style.border} ${style.text}`}
            >
              {project.slug}
            </span>
          </div>

          <h3 className="font-display text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {project.name[language]}
          </h3>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            {project.description[language]}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          {language === "en" ? "Open project" : "فتح المشروع"}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-7 border-t border-slate-200 pt-5 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          aria-expanded={open}
        >
          {open
            ? language === "en"
              ? "Hide implementation details"
              : "إخفاء تفاصيل التنفيذ"
            : language === "en"
              ? "View implementation details"
              : "عرض تفاصيل التنفيذ"}

          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
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
            <div className="grid gap-3 sm:grid-cols-2">
              {project.highlights[language].map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                  />
                  <span className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <div className="mt-3 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}

function ContactCode({ language }: { language: Language }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#09111f] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <span className="font-mono text-[11px] text-slate-500">
          contact.json
        </span>
      </div>

      <pre className="overflow-x-auto p-6 font-mono text-xs leading-8 text-slate-300 sm:text-sm">
{`{
  "name": "Youssef Yasser",
  "role": "${
    language === "en"
      ? "Backend-first Fullstack Developer"
      : "Fullstack Developer — Backend First"
  }",
  "location": "Giza, Egypt",
  "open_to": ["junior roles", "internships"],
  "github": "github.com/Youssefsea",
  "linkedin": "linkedin.com/in/youssef-yasser"
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
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  const isArabic = language === "ar";

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(
      "portfolio-theme",
    ) as Theme | null;

    const savedLanguage = window.localStorage.getItem(
      "portfolio-language",
    ) as Language | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedLanguage === "en" || savedLanguage === "ar") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    window.localStorage.setItem("portfolio-language", language);
  }, [isArabic, language]);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight =
        (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;

      const progress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowTop(scrollTop > 600);

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
    ).filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-24% 0px -60% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard can be unavailable in some environments.
    }
  };

  const sectionContent = {
    about: {
      en: {
        title: "A backend-first developer who also ships the UI.",
        description:
          "I like working from the system outward: architecture, APIs, data, authentication, then the interface users actually touch.",
      },
      ar: {
        title: "مطور Fullstack بتركيز Backend وبيطلع الواجهة كمان.",
        description:
          "بحب أبدأ من جوه السيستم: architecture وAPIs وdatabase وauthentication، وبعدها أبني الواجهة اللي المستخدم بيتعامل معاها.",
      },
    },
    skills: {
      en: {
        title: "The stack I actually build with.",
        description:
          "A practical stack focused on backend engineering, databases, modern React applications, and real application logic.",
      },
      ar: {
        title: "الـstack اللي بستخدمه فعليًا.",
        description:
          "Stack عملي مركز على الـbackend والـdatabases وتطبيقات React الحديثة والـapplication logic الحقيقي.",
      },
    },
    projects: {
      en: {
        title: "Projects built around real logic.",
        description:
          "Not landing-page demos. These projects focus on authentication, transactions, booking, geolocation, payments, and data flows.",
      },
      ar: {
        title: "مشاريع مبنية على logic حقيقي.",
        description:
          "مش مجرد landing pages؛ المشاريع هنا فيها authentication وtransactions وbooking وgeolocation وpayment flows.",
      },
    },
    experience: {
      en: {
        title: "Experience that got me closer to real systems.",
        description:
          "My practical experience so far includes an IT internship and hands-on application development across backend and fullstack projects.",
      },
      ar: {
        title: "خبرة عملية قربتني من السيستم الحقيقي.",
        description:
          "خبرتي العملية حاليًا تشمل تدريب IT بجانب بناء مشاريع Fullstack وBackend بشكل مستمر.",
      },
    },
    contact: {
      en: {
        title: "Let's talk about the work.",
        description:
          "Open to junior opportunities, internships, and serious software projects.",
      },
      ar: {
        title: "خلينا نتكلم عن الشغل.",
        description:
          "متاح لفرص Junior وInternships والمشاريع البرمجية الجادة.",
      },
    },
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-[#f7f8f5] text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white ${
        isArabic ? "font-arabic" : ""
      }`}
    >
      <style jsx global>{`
        :root {
          --header-height: 88px;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7f8f5;
        }

        html[data-theme="dark"] body {
          background: #050816;
        }

        ::selection {
          background: #a7f3d0;
          color: #0f172a;
        }

        .font-arabic {
          font-family:
            Tahoma,
            Arial,
            sans-serif;
        }

        .font-display {
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .site-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(15, 23, 42, 0.035) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
        }

        html[data-theme="dark"] .site-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.65s ease,
            transform 0.65s ease;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          position: relative;
          padding: 8px 0;
          font-size: 13px;
          font-weight: 700;
          color: rgb(100 116 139);
          transition: color 0.2s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          border-radius: 999px;
          background: rgb(15 23 42);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }

        .nav-link:hover {
          color: rgb(15 23 42);
        }

        .nav-link-active {
          color: rgb(15 23 42);
        }

        .nav-link-active::after {
          transform: scaleX(1);
        }

        html[data-theme="dark"] .nav-link {
          color: rgb(148 163 184);
        }

        html[data-theme="dark"] .nav-link:hover,
        html[data-theme="dark"] .nav-link-active {
          color: white;
        }

        html[data-theme="dark"] .nav-link::after {
          background: white;
        }

        .top-action,
        .social-button,
        .mobile-menu-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgb(226 232 240);
          background: white;
          color: rgb(51 65 85);
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .top-action {
          min-height: 38px;
          gap: 7px;
          border-radius: 12px;
          padding: 0 11px;
          font-size: 11px;
          font-weight: 800;
        }

        .social-button,
        .mobile-menu-button {
          height: 38px;
          width: 38px;
          border-radius: 12px;
        }

        .top-action:hover,
        .social-button:hover,
        .mobile-menu-button:hover {
          transform: translateY(-1px);
          border-color: rgb(203 213 225);
          background: rgb(248 250 252);
        }

        html[data-theme="dark"] .top-action,
        html[data-theme="dark"] .social-button,
        html[data-theme="dark"] .mobile-menu-button {
          border-color: rgb(51 65 85);
          background: rgb(15 23 42);
          color: rgb(226 232 240);
        }

        html[data-theme="dark"] .top-action:hover,
        html[data-theme="dark"] .social-button:hover,
        html[data-theme="dark"] .mobile-menu-button:hover {
          border-color: rgb(71 85 105);
          background: rgb(30 41 59);
        }

        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 18px;
          margin-left: 3px;
          vertical-align: middle;
          background: rgb(52 211 153);
          animation: terminalBlink 1s steps(2, start) infinite;
        }

        @keyframes terminalBlink {
          50% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .terminal-cursor {
            animation: none !important;
          }
        }
      `}</style>

      <div className="site-grid pointer-events-none fixed inset-0 z-0 opacity-70" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-slate-900/5 dark:bg-white/5">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500"
          style={{
            width: `${scrollProgress}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/90 bg-white/85 px-3 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-[0_10px_35px_rgba(0,0,0,0.22)] sm:px-5">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
              YY
            </span>

            <span className="hidden text-sm font-black tracking-tight text-slate-950 dark:text-white sm:inline">
              Youssef Yasser
            </span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${
                  activeSection === link.id ? "nav-link-active" : ""
                }`}
              >
                {link[language]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setLanguage((value) => (value === "en" ? "ar" : "en"))
              }
              className="top-action"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span>{language === "en" ? "AR" : "EN"}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setTheme((value) => (value === "light" ? "dark" : "light"))
              }
              className="top-action px-2.5"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button hidden sm:inline-flex"
              aria-label="GitHub"
            >
              <FaGithub className="h-4.5 w-4.5" />
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button hidden sm:inline-flex"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4.5 w-4.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="mobile-menu-button lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950">
            <div className="grid grid-cols-2 gap-1 p-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    activeSection === link.id
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  } ${isArabic ? "text-right" : "text-left"}`}
                >
                  {link[language]}
                </button>
              ))}
            </div>

            <div className="flex gap-2 border-t border-slate-200 p-2 dark:border-slate-800 sm:hidden">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <FaGithub className="h-4.5 w-4.5" />
              </a>

              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <FaLinkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section
          id="hero"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-24 pt-36 sm:px-8 sm:pt-40 lg:min-h-screen lg:pb-20"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr]">
            <Reveal>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]" />
                  {language === "en"
                    ? "Open to junior roles & internships"
                    : "متاح لفرص Junior و Internships"}
                </div>

                <h1 className="max-w-4xl font-display text-5xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-7xl lg:text-[5.6rem] lg:leading-[0.95]">
                  Youssef
                  <br />
                  <span className="bg-gradient-to-r from-slate-950 via-blue-700 to-violet-600 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-violet-300">
                    Yasser.
                  </span>
                </h1>

                <div className="mt-6 max-w-2xl">
                  <p className="text-xl font-semibold leading-9 text-slate-800 dark:text-slate-200 sm:text-2xl">
                    {language === "en"
                      ? "Backend-first Fullstack Developer."
                      : "Fullstack Developer بتركيز Backend."}
                  </p>

                  <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                    {language === "en"
                      ? "Computer Science student at Menoufia University building real web applications with APIs, databases, authentication, business logic, and modern React interfaces."
                      : "طالب علوم حاسب في جامعة المنوفية، ببني تطبيقات Web حقيقية فيها APIs وDatabases وAuthentication وBusiness Logic وواجهات React حديثة."}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  Giza, Egypt
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo("projects")}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,23,42,0.16)] transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                  >
                    {language === "en" ? "View projects" : "شوف المشاريع"}
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition-transform hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {language === "en" ? "View CV" : "عرض الـCV"}
                    <Eye className="h-4 w-4" />
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-700 transition-transform hover:-translate-y-0.5 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
                  >
                    {language === "en" ? "Download CV" : "تحميل الـCV"}
                    <Download className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    "Backend-first",
                    "TypeScript",
                    "PostgreSQL",
                    "Next.js",
                    "AI Integrations",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="space-y-8">
                <HeroVisual />
                <TerminalPanel language={language} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-8 sm:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[26px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={`${stat.value}-${stat.en}`}
                  className={`px-5 py-6 sm:px-7 ${
                    index < 2
                      ? "border-b border-slate-200 sm:border-b-0"
                      : ""
                  } ${
                    index % 2 === 0
                      ? "border-r border-slate-200 sm:border-r"
                      : ""
                  } ${
                    index === 3
                      ? "sm:border-r-0"
                      : ""
                  } dark:border-slate-800`}
                >
                  <div className="font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {stat[language]}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="01 / About"
              title={sectionContent.about[language].title}
              description={sectionContent.about[language].description}
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal delay={80}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900/80 sm:p-9">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <Terminal className="h-5 w-5" />
                  </span>

                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    {language === "en"
                      ? "How I work"
                      : "أنا بشتغل إزاي"}
                  </span>
                </div>

                <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                  <p>
                    {language === "en"
                      ? "I enjoy building applications where the backend is more than a CRUD layer: authentication, business rules, transactions, concurrency, location logic, and integrations."
                      : "بحب أبني تطبيقات يكون فيها الـbackend أكتر من مجرد CRUD: authentication وbusiness rules وtransactions وconcurrency وlocation logic وintegrations."}
                  </p>

                  <p>
                    {language === "en"
                      ? "My strongest area is backend engineering, while my fullstack experience lets me carry the same feature from API design to database to the final UI."
                      : "أقوى جزء عندي هو الـbackend، لكن خبرتي في الـfullstack بتخليني أقدر أمسك نفس الـfeature من تصميم الـAPI للـdatabase لحد الـUI."}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-4">
                <InfoCard
                  icon={GraduationCap}
                  label={language === "en" ? "Education" : "التعليم"}
                  value={
                    language === "en"
                      ? "B.Sc. Computer Science — Menoufia University · Expected 2027"
                      : "بكالوريوس علوم حاسب — جامعة المنوفية · متوقع التخرج 2027"
                  }
                />

                <InfoCard
                  icon={Terminal}
                  label={language === "en" ? "Focus" : "التركيز"}
                  value="Backend-first Fullstack Development"
                />

                <InfoCard
                  icon={Briefcase}
                  label={language === "en" ? "Target" : "الهدف"}
                  value={
                    language === "en"
                      ? "Junior Backend / Fullstack roles"
                      : "فرص Junior Backend / Fullstack"
                  }
                />

                <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950"
                  >
                    <FileText className="h-4 w-4" />
                    {language === "en" ? "View CV" : "عرض CV"}
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <Download className="h-4 w-4" />
                    {language === "en" ? "Download" : "تحميل"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="02 / Stack"
              title={sectionContent.skills[language].title}
              description={sectionContent.skills[language].description}
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal key={group.label.en} delay={index * 60}>
                <SkillCard group={group} language={language} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="03 / Projects"
              title={sectionContent.projects[language].title}
              description={sectionContent.projects[language].description}
            />
          </Reveal>

          <div className="space-y-7">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.name.en} delay={index * 90}>
                <ProjectCard project={project} language={language} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="04 / Experience"
              title={sectionContent.experience[language].title}
              description={sectionContent.experience[language].description}
            />
          </Reveal>

          <Reveal delay={100}>
            <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80">
              <div className="grid lg:grid-cols-[220px_1fr]">
                <div className="border-b border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-950/60 lg:border-b-0 lg:border-r">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    <Briefcase className="h-6 w-6" />
                  </div>

                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Internship
                  </div>

                  <div className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Egypt
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                    Gulf of Suez Petroleum Company
                  </div>

                  <h3 className="font-display text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                    IT Intern — GUPCO
                  </h3>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                    {language === "en"
                      ? "Practical exposure to IT workflows inside a large enterprise environment, alongside continued hands-on work in backend development, databases, and fullstack applications."
                      : "تعرض عملي لبيئة IT داخل مؤسسة كبيرة، بجانب الاستمرار في بناء مشاريع Backend وDatabases وFullstack بشكل عملي."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Backend",
                      "Databases",
                      "IT Operations",
                      "Enterprise Environment",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="05 / Contact"
              title={sectionContent.contact[language].title}
              description={sectionContent.contact[language].description}
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal delay={100}>
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900/80 sm:p-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-950 dark:text-white">
                      {language === "en" ? "Get in touch" : "تواصل معايا"}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {EMAIL}
                    </div>
                  </div>
                </div>

                <h3 className="mt-7 max-w-xl font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {language === "en"
                    ? "Have a role, project, or backend-heavy problem?"
                    : "عندك شغل أو مشروع أو مشكلة Backend؟"}
                </h3>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                  {language === "en"
                    ? "Email is the fastest way to reach me. You can also find my work and profile below."
                    : "الإيميل أسرع طريقة للتواصل معايا، وتقدر كمان تشوف شغلي وحساباتي من الروابط اللي تحت."}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      "Hello Youssef - Portfolio",
                    )}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                  >
                    <Mail className="h-4 w-4" />
                    {language === "en" ? "Send Email" : "ابعت Email"}
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <FaLinkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>

                <div className="mt-8 space-y-2.5">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="truncate">{EMAIL}</span>
                    {copied ? (
                      <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Copy className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
                    )}
                  </button>

                  <a
                    href={`tel:${PHONE.replaceAll(" ", "")}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                    {PHONE}
                  </a>

                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <FaGithub className="h-4 w-4 shrink-0 text-slate-400" />
                    github.com/Youssefsea
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={170}>
              <ContactCode language={language} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-5 pb-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Youssef Yasser</span>

          <div className="flex items-center gap-2 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {language === "en" ? "Open to opportunities" : "متاح للفرص"}
          </div>
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
          className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition-transform hover:-translate-y-1 dark:bg-white dark:text-slate-950 sm:right-7"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}