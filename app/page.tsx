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
  Download,
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
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiGoogle,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Language = "en" | "ar";
type Theme = "light" | "dark";
type ColorName = "green" | "blue" | "purple" | "orange" | "pink" | "yellow";

type SkillItem = {
  name: string;
  icon: IconType;
};

const EMAIL = "youssefsea274@gmail.com";
const PHONE = "+20 110 469 9278";
const LINKEDIN = "https://www.linkedin.com/in/youssef-yasser-97aa742b0";
const GITHUB = "https://github.com/Youssefsea";
const CV_PATH = "/cvv.pdf";

const NAV_LINKS = [
  { id: "about", en: "About", ar: "نبذة عني" },
  { id: "skills", en: "Stack", ar: "التقنيات" },
  { id: "projects", en: "Projects", ar: "المشاريع" },
  { id: "experience", en: "Experience", ar: "الخبرة" },
  { id: "contact", en: "Contact", ar: "تواصل" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]["id"];

const STATS = [
  { value: "3", en: "live projects", ar: "مشاريع منشورة" },
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
  color: ColorName;
  items: SkillItem[];
}[] = [
  {
    label: { en: "Backend", ar: "Backend" },
    color: "blue",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST API Design", icon: Server as unknown as IconType },
      { name: "JWT Authentication", icon: Code2 as unknown as IconType },
    ],
  },
  {
    label: { en: "Databases", ar: "قواعد البيانات" },
    color: "purple",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Schema Design", icon: Code2 as unknown as IconType },
    ],
  },
  {
    label: { en: "Frontend", ar: "Frontend" },
    color: "pink",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    label: {
      en: "AI & Integrations",
      ar: "الذكاء الاصطناعي والتكاملات",
    },
    color: "yellow",
    items: [
      { name: "Gemini API", icon: SiGoogle },
      { name: "NLP", icon: Sparkles as unknown as IconType },
      { name: "Web Speech API", icon: Terminal as unknown as IconType },
      { name: "Cloudinary", icon: Code2 as unknown as IconType },
    ],
  },
  {
    label: { en: "Tools & DevOps", ar: "الأدوات و DevOps" },
    color: "orange",
    items: [
      { name: "Git / GitHub", icon: FaGithub },
      { name: "Docker", icon: SiDocker },
      { name: "AWS Basics", icon: Code2 as unknown as IconType },
      { name: "Postman", icon: SiPostman },
    ],
  },
  {
    label: { en: "Engineering", ar: "هندسة البرمجيات" },
    color: "green",
    items: [
      { name: "Transactions", icon: Code2 as unknown as IconType },
      { name: "Idempotency", icon: Check as unknown as IconType },
      { name: "Redis Locks", icon: SiRedis },
      { name: "Role-based Access", icon: Code2 as unknown as IconType },
    ],
  },
];

const PROJECTS = [
  {
    name: {
      en: "EdTech SaaS Platform",
      ar: "ذاكر صح — منصة تعليمية SaaS",
    },
    slug: "Zaker Sah",
    description: {
      en: "An educational platform connecting students, learning centers, and tutors with role-aware workflows, booking logic, and protected learning content.",
      ar: "منصة تعليمية تربط الطلاب بالمراكز التعليمية والمدرسين، مع نظام أدوار، وإدارة للحجوزات، وحماية للمحتوى التعليمي.",
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
        "أدوار للطالب وإدارة المركز والمدرس",
        "اكتشاف المراكز والمدرسين بناءً على الموقع الجغرافي",
        "حماية المحتوى التعليمي المدفوع",
        "اكتشاف تعارض مواعيد الحجز تلقائيًا",
        "لوحة Super Admin وتحليلات المنصة",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "React"],
    link: "https://center-saas-front-83p8.vercel.app/",
    accent: "green" as ColorName,
    number: "01",
  },
  {
    name: {
      en: "Food Delivery Platform",
      ar: "أكلي — منصة توصيل الطعام",
    },
    slug: "Akli",
    description: {
      en: "A customer-and-vendor food delivery platform built around order flows, location-aware delivery pricing, and real-time communication.",
      ar: "منصة لتوصيل الطعام للعميل والمطعم، تعتمد على إدارة الطلبات، وحساب رسوم التوصيل حسب المسافة، والتواصل الفوري.",
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
        "حساب المسافة ورسوم التوصيل باستخدام GPS وHaversine",
        "سلة تدعم الطلب من أكثر من مطعم",
        "Workflow لإثبات الدفع عبر Vodafone Cash وInstaPay",
        "تواصل فوري أثناء الطلب",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Socket.IO", "Leaflet"],
    link: "https://food-front-rho.vercel.app/",
    accent: "orange" as ColorName,
    number: "02",
  },
  {
    name: {
      en: "WealthWise AI",
      ar: "WealthWise AI — محفظة مالية ذكية",
    },
    slug: "Finance",
    description: {
      en: "An AI-assisted wallet that converts typed or spoken Arabic into structured financial transactions while protecting sensitive money-moving operations.",
      ar: "محفظة مالية ذكية تحول الإدخال النصي أو الصوتي باللغة العربية إلى معاملات مالية منظمة، مع حماية للعمليات الحساسة.",
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
        "Redis Locks للتحكم في التزامن",
        "Idempotency Keys للعمليات المالية",
        "إدخال صوتي باللغة العربية عبر Web Speech API",
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
    text: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-50 dark:bg-emerald-950/50",
    border: "border-emerald-300 dark:border-emerald-800",
    bg: "bg-emerald-100 dark:bg-emerald-950/70",
    dot: "bg-emerald-400",
  },
  blue: {
    text: "text-blue-700 dark:text-blue-300",
    soft: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-300 dark:border-blue-800",
    bg: "bg-blue-100 dark:bg-blue-950/70",
    dot: "bg-blue-400",
  },
  purple: {
    text: "text-violet-700 dark:text-violet-300",
    soft: "bg-violet-50 dark:bg-violet-950/50",
    border: "border-violet-300 dark:border-violet-800",
    bg: "bg-violet-100 dark:bg-violet-950/70",
    dot: "bg-violet-400",
  },
  orange: {
    text: "text-orange-700 dark:text-orange-300",
    soft: "bg-orange-50 dark:bg-orange-950/50",
    border: "border-orange-300 dark:border-orange-800",
    bg: "bg-orange-100 dark:bg-orange-950/70",
    dot: "bg-orange-400",
  },
  pink: {
    text: "text-pink-700 dark:text-pink-300",
    soft: "bg-pink-50 dark:bg-pink-950/50",
    border: "border-pink-300 dark:border-pink-800",
    bg: "bg-pink-100 dark:bg-pink-950/70",
    dot: "bg-pink-400",
  },
  yellow: {
    text: "text-amber-700 dark:text-amber-300",
    soft: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-300 dark:border-amber-800",
    bg: "bg-amber-100 dark:bg-amber-950/70",
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
    <div className="mb-12 max-w-4xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-0.5 w-12 bg-slate-600 dark:bg-slate-400" />

        <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300 sm:text-sm">
          {eyebrow}
        </span>
      </div>

      <h2 className="font-display text-[2.15rem] font-black leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-3xl text-[1rem] font-medium leading-7 text-slate-800 dark:text-slate-100 sm:text-xl sm:leading-9">
          {description}
        </p>
      )}
    </div>
  );
}

function AnimatedMascot() {
  return (
    <div className="mascot-scene relative mx-auto h-[430px] w-full max-w-[500px]">
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

      <div className="mascot-float">
        <div className="mascot-shadow" />

        <div className="mascot-body">
          <div className="mascot-hoodie">
            <div className="hoodie-string hoodie-string-left" />
            <div className="hoodie-string hoodie-string-right" />
            <div className="hoodie-pocket" />
          </div>

          <div className="mascot-neck" />

          <div className="mascot-head">
            <div className="mascot-hair" />

            <div className="mascot-ear mascot-ear-left" />
            <div className="mascot-ear mascot-ear-right" />

            <div className="mascot-face">
              <div className="mascot-glasses glasses-left" />
              <div className="mascot-glasses glasses-right" />
              <div className="glasses-bridge" />

              <span className="mascot-eye eye-left" />
              <span className="mascot-eye eye-right" />

              <span className="mascot-nose" />
              <span className="mascot-mouth" />
            </div>
          </div>

          <div className="mascot-arm arm-left" />
          <div className="mascot-arm arm-right" />

          <div className="mascot-laptop">
            <div className="laptop-screen">
              <div className="laptop-topbar">
                <span />
                <span />
                <span />
              </div>

              <div className="laptop-code">
                <span className="code-line short" />
                <span className="code-line medium" />
                <span className="code-line long" />
                <span className="code-line medium" />
                <span className="code-line short" />
              </div>
            </div>

            <div className="laptop-base" />
          </div>
        </div>
      </div>
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
    <div className="terminal-panel overflow-hidden rounded-[28px]">
      <div className="flex items-center justify-between gap-3 border-b border-white/25 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <span className="truncate font-mono text-[10px] font-semibold text-slate-300 sm:text-xs">
          youssef@portfolio
        </span>
      </div>

      <div className="min-h-[210px] p-4 font-mono text-[11px] leading-7 sm:min-h-[240px] sm:p-7 sm:text-base sm:leading-8">
        {done.map((line, index) => (
          <div key={`${line.text}-${index}`} className="flex gap-2 sm:gap-3">
            <span
              className={
                line.prompt === "$" ? "text-emerald-400" : "text-slate-300"
              }
            >
              {line.prompt}
            </span>

            <span
              className={
                line.prompt === "$" ? "text-white" : "text-slate-200"
              }
            >
              {line.text}
            </span>
          </div>
        ))}

        {current && (
          <div className="flex gap-2 sm:gap-3">
            <span
              className={
                current.prompt === "$"
                  ? "text-emerald-400"
                  : "text-slate-300"
              }
            >
              {current.prompt}
            </span>

            <span
              className={
                current.prompt === "$" ? "text-white" : "text-slate-200"
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

function SkillCard({
  group,
  language,
}: {
  group: (typeof SKILL_GROUPS)[number];
  language: Language;
}) {
  const style = COLOR_STYLES[group.color];

  return (
    <article className="skill-card group">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${style.bg}`}
          >
            <span className={`font-display text-sm font-black ${style.text}`}>
              {group.label.en === "Backend"
                ? "</>"
                : group.label.en === "Databases"
                  ? "DB"
                  : group.label.en === "Frontend"
                    ? "UI"
                    : group.label.en === "AI & Integrations"
                      ? "AI"
                      : group.label.en === "Tools & DevOps"
                        ? "DEV"
                        : "SYS"}
            </span>
          </div>

          <h3 className="break-words font-display text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
            {group.label[language]}
          </h3>
        </div>

        <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${style.dot}`} />
      </div>

      <div className="space-y-2.5">
        {group.items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-950/85"
            >
              <span className={`shrink-0 ${style.text}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>

              <span className="min-w-0 break-words text-[14px] font-bold text-slate-900 dark:text-slate-100 sm:text-[15px]">
                {item.name}
              </span>
            </div>
          );
        })}
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
    <article className="project-card">
      <div className={`project-top-line ${style.dot}`} />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8 lg:items-start">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold text-slate-600 dark:text-slate-400">
              {project.number}
            </span>

            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] sm:text-xs ${style.soft} ${style.border} ${style.text}`}
            >
              {project.slug}
            </span>
          </div>

          <h3 className="break-words font-display text-[1.8rem] font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {project.name[language]}
          </h3>

          <p className="mt-4 max-w-4xl break-words text-[1rem] font-medium leading-7 text-slate-800 dark:text-slate-100 sm:text-xl sm:leading-9">
            {project.description[language]}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-300 bg-slate-100 px-2.5 py-1.5 text-[12px] font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:px-3 sm:text-sm"
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition-all hover:-translate-y-1 dark:border-white dark:bg-white dark:text-slate-950 sm:w-auto"
        >
          {language === "en" ? "Open project" : "فتح المشروع"}
          <ArrowDown className="h-4 w-4 rotate-[-45deg]" />
        </a>
      </div>

      <div className="mt-7 border-t-2 border-slate-300 pt-5 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex max-w-full items-center gap-2 text-left text-[14px] font-black text-slate-900 dark:text-white"
          aria-expanded={open}
        >
          <span className="break-words">
            {open
              ? language === "en"
                ? "Hide implementation details"
                : "إخفاء تفاصيل التنفيذ"
              : language === "en"
                ? "View implementation details"
                : "عرض تفاصيل التنفيذ"}
          </span>

          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
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
            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              {project.highlights[language].map((highlight) => (
                <div
                  key={highlight}
                  className="flex min-w-0 gap-3 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/70"
                >
                  <span
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`}
                  />

                  <span className="min-w-0 break-words text-[14px] font-medium leading-7 text-slate-800 dark:text-slate-100">
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
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="info-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          {icon}
        </span>

        <span className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300 sm:text-xs">
          {label}
        </span>
      </div>

      <div className="mt-4 break-words text-[14px] font-bold leading-7 text-slate-900 dark:text-slate-100 sm:text-base">
        {value}
      </div>
    </div>
  );
}

function NTICertificateCard({ language }: { language: Language }) {
  return (
    <article className="certificate-card">
      <div className="certificate-decoration certificate-decoration-one" />
      <div className="certificate-decoration certificate-decoration-two" />

      <div className="relative z-10">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-xs font-black text-slate-950 shadow-lg sm:h-14 sm:w-14 sm:text-sm">
              NTI
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-900 dark:text-emerald-100 sm:text-xs">
                {language === "en"
                  ? "Professional Certificate"
                  : "شهادة تدريبية"}
              </div>

              <h3 className="mt-1 break-words font-display text-lg font-black leading-tight text-slate-950 dark:text-white sm:text-2xl">
                MEAN-Stack Web Development
              </h3>
            </div>
          </div>

          <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[10px] font-black text-slate-900 backdrop-blur dark:border-slate-600 dark:bg-slate-900/70 dark:text-white sm:text-xs">
            NTI
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300 sm:text-xs">
              Instructor
            </div>

            <div className="mt-1.5 break-words text-sm font-bold text-slate-950 dark:text-white">
              Prof. Ahmed Khattab
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300 sm:text-xs">
              Role
            </div>

            <div className="mt-1.5 break-words text-sm font-bold text-slate-950 dark:text-white">
              NTI Director
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300 sm:text-xs">
              Duration
            </div>

            <div className="mt-1.5 break-words text-sm font-bold text-slate-950 dark:text-white">
              28 June — 23 July 2026
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300 sm:text-xs">
              Total
            </div>

            <div className="mt-1.5 text-sm font-bold text-slate-950 dark:text-white">
              120 Hours
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100 sm:text-sm">
            Technical — 90 hrs
          </span>

          <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100 sm:text-sm">
            Freelancing — 30 hrs
          </span>
        </div>
      </div>
    </article>
  );
}

function ContactCode({ language }: { language: Language }) {
  return (
    <div className="terminal-panel min-w-0 overflow-hidden rounded-[24px] sm:rounded-[28px]">
      <div className="flex items-center justify-between gap-3 border-b border-white/25 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <span className="truncate font-mono text-[10px] font-semibold text-slate-300 sm:text-xs">
          contact.json
        </span>
      </div>

      <pre className="contact-code-pre m-0 overflow-hidden p-4 font-mono text-[11px] leading-[1.9] text-slate-100 sm:p-6 sm:text-[15px] sm:leading-9">
{`{
  "name": "Youssef Yasser",
  "role": "${
    language === "en"
      ? "Backend-first Fullstack Developer"
      : "Fullstack Developer — Backend First"
  }",
  "location": "Giza, Egypt",
  "open_to": [
    "Junior roles",
    "Internships"
  ],
  "github": "github.com/Youssefsea",
  "linkedin": "linkedin.com/in/youssef-yasser"
}`}
      </pre>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  const isArabic = language === "ar";

  const headerRef = useRef<HTMLElement | null>(null);
  const autoScrollTargetRef = useRef<SectionId | null>(null);
  const autoScrollTimerRef = useRef<number | null>(null);

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
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    window.localStorage.setItem("portfolio-language", language);
  }, [language, isArabic]);

  useEffect(() => {
    let rafId = 0;

    const getScrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const getActivationLine = () => {
      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 82;

      return Math.max(104, headerBottom + 24);
    };

    const getCurrentSection = (): SectionId => {
      const line = getActivationLine();
      let closestSection: SectionId = NAV_LINKS[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= line && rect.bottom >= line) {
          return link.id;
        }

        const distance = Math.abs(rect.top - line);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = link.id;
        }
      }

      const scrollY = getScrollY();
      const doc = document.documentElement;

      if (window.innerHeight + scrollY >= doc.scrollHeight - 8) {
        return NAV_LINKS[NAV_LINKS.length - 1].id;
      }

      return closestSection;
    };

    const update = () => {
      if (autoScrollTargetRef.current) {
        const target = document.getElementById(
          autoScrollTargetRef.current,
        );

        if (target) {
          const targetTop = target.getBoundingClientRect().top;
          const line = getActivationLine();

          if (Math.abs(targetTop - line) <= 34) {
            const reached = autoScrollTargetRef.current;

            autoScrollTargetRef.current = null;

            if (autoScrollTimerRef.current !== null) {
              window.clearTimeout(autoScrollTimerRef.current);
              autoScrollTimerRef.current = null;
            }

            setActiveSection(reached);
            return;
          }

          setActiveSection(autoScrollTargetRef.current);
          return;
        }

        autoScrollTargetRef.current = null;
      }

      setActiveSection((previous) => {
        const current = getCurrentSection();
        return previous === current ? previous : current;
      });
    };

    const schedule = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(update);
    };

    const cancelLock = () => {
      if (!autoScrollTargetRef.current) return;

      autoScrollTargetRef.current = null;

      if (autoScrollTimerRef.current !== null) {
        window.clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }

      schedule();
    };

    update();

    window.addEventListener("scroll", schedule, {
      passive: true,
    });

    window.addEventListener("resize", schedule);

    window.addEventListener("wheel", cancelLock, {
      passive: true,
    });

    window.addEventListener("touchstart", cancelLock, {
      passive: true,
    });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (autoScrollTimerRef.current !== null) {
        window.clearTimeout(autoScrollTimerRef.current);
      }

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", cancelLock);
      window.removeEventListener("touchstart", cancelLock);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;

      const scrollHeight =
        (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;

      const progress =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
          : 0;

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

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: SectionId | "hero") => {
    setMenuOpen(false);

    if (autoScrollTimerRef.current !== null) {
      window.clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }

    if (id === "hero") {
      autoScrollTargetRef.current = null;
      setActiveSection("about");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    autoScrollTargetRef.current = id;
    setActiveSection(id);

    const scrollY = window.scrollY;
    const headerHeight =
      headerRef.current?.getBoundingClientRect().height ?? 74;

    const targetTop =
      section.getBoundingClientRect().top +
      scrollY -
      headerHeight -
      22;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    autoScrollTimerRef.current = window.setTimeout(() => {
      const target = autoScrollTargetRef.current;

      autoScrollTargetRef.current = null;
      autoScrollTimerRef.current = null;

      if (target) {
        setActiveSection(target);
      }
    }, 1600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard may be unavailable.
    }
  };

  const sectionContent = {
    about: {
      en: {
        title: "Backend-first development with a fullstack mindset.",
        description:
          "I enjoy building from the system outward: architecture, APIs, data, authentication, business logic, and finally the interface users interact with.",
      },
      ar: {
        title: "تطوير يركز على الـBackend بعقلية Fullstack.",
        description:
          "أحب بناء التطبيقات بدءًا من النظام الداخلي: الـArchitecture والـAPIs والبيانات والـAuthentication والـBusiness Logic، ثم بناء الواجهة التي يتعامل معها المستخدم.",
      },
    },
    skills: {
      en: {
        title: "The technologies I use to build.",
        description:
          "A practical stack centered around backend engineering, databases, modern React applications, integrations, and application reliability.",
      },
      ar: {
        title: "التقنيات التي أستخدمها في البناء.",
        description:
          "Stack عملي يركز على هندسة الـBackend وقواعد البيانات وتطبيقات React الحديثة والتكاملات والمنطق البرمجي.",
      },
    },
    projects: {
      en: {
        title: "Projects built around real application logic.",
        description:
          "These projects go beyond static interfaces and focus on authentication, transactions, bookings, geolocation, payments, concurrency, and data flows.",
      },
      ar: {
        title: "مشاريع مبنية على منطق تطبيقي حقيقي.",
        description:
          "هذه المشاريع تتجاوز الواجهات الثابتة، وتركز على الـAuthentication والـTransactions والحجوزات والموقع الجغرافي والمدفوعات والتزامن وتدفقات البيانات.",
      },
    },
    experience: {
      en: {
        title: "Experience, training, and continuous hands-on work.",
        description:
          "My practical background includes an IT internship, professional training, and continuous development of backend-heavy fullstack applications.",
      },
      ar: {
        title: "الخبرة والتدريب والعمل العملي المستمر.",
        description:
          "تشمل خبرتي العملية تدريبًا في مجال الـIT، وتدريبًا مهنيًا متخصصًا، إلى جانب تطوير تطبيقات Fullstack تركز على الـBackend.",
      },
    },
    contact: {
      en: {
        title: "Let's talk about the work.",
        description:
          "Open to junior opportunities, internships, and serious software projects.",
      },
      ar: {
        title: "لنتحدث عن العمل.",
        description:
          "متاح لفرص Junior وInternships والمشاريع البرمجية الجادة.",
      },
    },
  };

  return (
    <div
      className={`portfolio-root relative min-h-screen overflow-x-hidden text-slate-950 transition-colors duration-500 dark:text-white ${
        isArabic ? "font-arabic" : ""
      }`}
    >
      <div className="page-grid pointer-events-none fixed inset-0 z-0 opacity-80" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1.5 bg-slate-900/10 dark:bg-white/10">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500"
          style={{
            width: `${scrollProgress}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-4"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-[18px] border-2 border-slate-900 bg-white/95 px-2.5 py-2.5 shadow-[4px_5px_0_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-200 dark:bg-slate-950/95 dark:shadow-[4px_5px_0_rgba(255,255,255,0.1)] sm:rounded-[22px] sm:px-5 sm:py-3">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex min-w-0 items-center gap-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 bg-yellow-300 text-xs font-black text-slate-950 dark:border-slate-200 sm:text-sm">
              YY
            </span>

            <span className="hidden min-w-0 truncate font-display text-sm font-black tracking-tight text-slate-950 dark:text-white sm:inline">
              Youssef Yasser
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${
                  activeSection === link.id ? "nav-link-active" : ""
                }`}
                aria-current={
                  activeSection === link.id ? "location" : undefined
                }
              >
                {link[language]}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() =>
                setLanguage((value) => (value === "en" ? "ar" : "en"))
              }
              className="theme-button !h-9 !w-auto px-2.5 sm:!h-10 sm:px-3"
              aria-label="Toggle language"
              title={language === "en" ? "العربية" : "English"}
            >
              <Languages className="h-4 w-4 sm:h-4.5 sm:w-4.5" />

              <span className="ml-1 text-[10px] font-black sm:text-xs">
                {language === "en" ? "AR" : "EN"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setTheme((value) => (value === "light" ? "dark" : "light"))
              }
              className="theme-button !h-9 !w-9 sm:!h-10 sm:!w-10"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              )}
            </button>

            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button hidden sm:inline-flex"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button hidden sm:inline-flex"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="mobile-menu-button !h-9 !w-9 lg:hidden sm:!h-10 sm:!w-10"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[18px] border-2 border-slate-900 bg-white shadow-[4px_5px_0_rgba(15,23,42,0.12)] dark:border-slate-200 dark:bg-slate-950 dark:shadow-[4px_5px_0_rgba(255,255,255,0.1)] sm:rounded-[22px]">
            <div className="grid grid-cols-2 gap-2 p-2.5 sm:p-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`rounded-xl border-2 px-3 py-3 text-[13px] font-black transition-colors sm:px-4 sm:text-sm ${
                    activeSection === link.id
                      ? "border-slate-900 bg-yellow-200 text-slate-950 dark:border-white dark:bg-slate-800 dark:text-white"
                      : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  } ${isArabic ? "text-right" : "text-left"}`}
                >
                  {link[language]}
                </button>
              ))}
            </div>

            <div className="flex gap-2 border-t-2 border-slate-900 p-2.5 dark:border-slate-700 sm:hidden">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="LinkedIn"
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
          className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:min-h-screen lg:pt-40"
        >
          <div className="grid min-w-0 items-center gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <Reveal>
              <div className="min-w-0">
                <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border-2 border-slate-900 bg-emerald-200 px-3.5 py-2 text-[11px] font-black text-slate-950 shadow-[3px_3px_0_#0f172a] dark:border-slate-200 dark:bg-emerald-400 sm:mb-6 sm:px-4 sm:py-2.5 sm:text-sm sm:shadow-[4px_4px_0_#0f172a]">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />

                  <span className="break-words">
                    {language === "en"
                      ? "Open to junior roles & internships"
                      : "متاح لفرص Junior وInternships"}
                  </span>
                </div>

                <h1 className="font-display text-[3.15rem] font-black leading-[0.94] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-7xl lg:text-[5.7rem]">
                  Youssef
                  <br />

                  <span className="relative inline-block">
                    Yasser
                    <span className="absolute -bottom-1.5 left-0 h-2.5 w-full -rotate-2 rounded-full bg-yellow-300/80 sm:-bottom-2 sm:h-4" />
                  </span>

                  <span className="relative">.</span>
                </h1>

                <div className="mt-6 max-w-3xl">
                  <p className="font-display text-[1.28rem] font-bold leading-8 text-slate-950 dark:text-white sm:text-3xl sm:leading-10">
                    {language === "en"
                      ? "Backend-first Fullstack Developer."
                      : "مطور Fullstack بتركيز أساسي على الـBackend."}
                  </p>

                  <p className="mt-4 text-[15px] font-medium leading-7 text-slate-800 dark:text-slate-100 sm:mt-5 sm:text-xl sm:leading-9">
                    {language === "en"
                      ? "Computer Science student at Menoufia University building practical web applications with APIs, databases, authentication, business logic, and modern React interfaces."
                      : "طالب علوم حاسب في جامعة المنوفية، أعمل على بناء تطبيقات ويب عملية تشمل الـAPIs وقواعد البيانات والـAuthentication والـBusiness Logic وواجهات React الحديثة."}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[13px] font-bold text-slate-700 dark:text-slate-200 sm:mt-7 sm:text-[15px]">
                  <MapPin className="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" />
                  Giza, Egypt
                </div>

                <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo("projects")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-yellow-300 px-5 py-3.5 text-[14px] font-black text-slate-950 shadow-[4px_4px_0_#0f172a] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_#0f172a] dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.16)] sm:w-auto sm:text-[15px] sm:shadow-[5px_5px_0_#0f172a]"
                  >
                    {language === "en" ? "View projects" : "عرض المشاريع"}
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-5 py-3.5 text-[14px] font-black text-slate-950 shadow-[4px_4px_0_#0f172a] transition-all hover:-translate-y-1 dark:border-slate-200 dark:bg-slate-900 dark:text-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.16)] sm:w-auto sm:text-[15px] sm:shadow-[5px_5px_0_#0f172a]"
                  >
                    {language === "en"
                      ? "View resume"
                      : "عرض السيرة الذاتية"}
                    <Eye className="h-4 w-4" />
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-emerald-200 px-5 py-3.5 text-[14px] font-black text-slate-950 shadow-[4px_4px_0_#0f172a] transition-all hover:-translate-y-1 dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.16)] sm:w-auto sm:text-[15px] sm:shadow-[5px_5px_0_#0f172a]"
                  >
                    {language === "en"
                      ? "Download resume"
                      : "تحميل السيرة الذاتية"}
                    <Download className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Backend-first",
                    "TypeScript",
                    "PostgreSQL",
                    "Next.js",
                    "NTI Certified",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border-2 border-slate-900 bg-white px-3 py-1.5 text-[11px] font-black text-slate-800 shadow-[2px_2px_0_rgba(15,23,42,0.15)] dark:border-slate-200 dark:bg-slate-900 dark:text-slate-100 sm:px-3.5 sm:py-2 sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="min-w-0 space-y-5 sm:space-y-7">
                <AnimatedMascot />
                <TerminalPanel language={language} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-8 sm:pb-10">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[22px] border-2 border-slate-900 bg-white shadow-[5px_6px_0_rgba(15,23,42,0.13)] dark:border-slate-200 dark:bg-slate-900 dark:shadow-[5px_6px_0_rgba(255,255,255,0.09)] sm:grid-cols-4 sm:rounded-[28px]">
              {STATS.map((stat, index) => (
                <div
                  key={`${stat.value}-${stat.en}`}
                  className={`min-w-0 px-4 py-6 sm:px-8 sm:py-8 ${
                    index < 2
                      ? "border-b-2 border-slate-900 sm:border-b-0"
                      : ""
                  } ${
                    index % 2 === 0
                      ? "border-r-2 border-slate-900"
                      : ""
                  } ${index === 1 ? "sm:border-r-2" : ""} ${
                    index === 3 ? "sm:border-r-0" : ""
                  } dark:border-slate-200`}
                >
                  <div className="font-display text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">
                    {stat.value}
                  </div>

                  <div className="mt-1.5 break-words text-[10px] font-black uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300 sm:mt-2 sm:text-sm">
                    {stat[language]}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow="01 / About"
              title={sectionContent.about[language].title}
              description={sectionContent.about[language].description}
            />
          </Reveal>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <Reveal delay={80}>
              <div className="min-w-0 rounded-[24px] border-2 border-slate-900 bg-white p-5 shadow-[5px_6px_0_rgba(15,23,42,0.1)] dark:border-slate-200 dark:bg-slate-900 dark:shadow-[5px_6px_0_rgba(255,255,255,0.08)] sm:rounded-[30px] sm:p-9">
                <div className="mb-6 flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 font-display text-sm font-black text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 sm:h-12 sm:w-12">
                    {"{ }"}
                  </div>

                  <div className="min-w-0">
                    <div className="break-words text-[14px] font-black text-slate-950 dark:text-white sm:text-[15px]">
                      {language === "en"
                        ? "How I approach development"
                        : "منهجي في التطوير"}
                    </div>

                    <div className="mt-1 text-[12px] font-semibold text-slate-700 dark:text-slate-300 sm:text-sm">
                      Architecture → API → Data → UI
                    </div>
                  </div>
                </div>

                <div className="space-y-5 text-[15px] font-medium leading-8 text-slate-800 dark:text-slate-100 sm:space-y-6 sm:text-xl sm:leading-9">
                  <p>
                    {language === "en"
                      ? "I focus on building applications where the backend is more than a simple CRUD layer. I care about authentication, business rules, transactions, concurrency, location logic, and integrations."
                      : "أركز على بناء تطبيقات يتجاوز فيها الـBackend فكرة CRUD التقليدية، مع الاهتمام بالـAuthentication وقواعد العمل والـTransactions والتزامن والمنطق الجغرافي والتكاملات."}
                  </p>

                  <p>
                    {language === "en"
                      ? "My strongest area is backend engineering, while my fullstack experience allows me to carry a feature from API design and database structure all the way to the final interface."
                      : "أقوى جوانب خبرتي هو تطوير الـBackend، بينما تساعدني خبرتي في الـFullstack على تنفيذ الميزة نفسها بدءًا من تصميم الـAPI وهيكلة قاعدة البيانات وحتى الواجهة النهائية."}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "APIs",
                    "Databases",
                    "Authentication",
                    "Transactions",
                    "Business Logic",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[11px] font-black text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:px-3.5 sm:py-2 sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="min-w-0">
                <div className="space-y-3 sm:space-y-4">
                  <InfoCard
                    icon={<GraduationCap className="h-4.5 w-4.5" />}
                    label={language === "en" ? "Education" : "التعليم"}
                    value={
                      language === "en"
                        ? "B.Sc. Computer Science — Menoufia University · Expected 2027"
                        : "بكالوريوس علوم الحاسب — جامعة المنوفية · متوقع التخرج عام 2027"
                    }
                  />

                  <InfoCard
                    icon={<Terminal className="h-4.5 w-4.5" />}
                    label={language === "en" ? "Focus" : "التركيز"}
                    value="Backend-first Fullstack Development"
                  />

                  <InfoCard
                    icon={<Briefcase className="h-4.5 w-4.5" />}
                    label={language === "en" ? "Target" : "الهدف"}
                    value={
                      language === "en"
                        ? "Junior Backend / Junior Fullstack roles"
                        : "فرص Junior Backend وJunior Fullstack"
                    }
                  />
                </div>

                <NTICertificateCard language={language} />

                <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-slate-200 dark:bg-slate-900 dark:text-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.12)] sm:w-auto"
                  >
                    <FileText className="h-4.5 w-4.5" />
                    {language === "en"
                      ? "View resume"
                      : "عرض السيرة الذاتية"}
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-yellow-200 px-4 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.12)] sm:w-auto"
                  >
                    <Download className="h-4.5 w-4.5" />
                    {language === "en"
                      ? "Download resume"
                      : "تحميل السيرة الذاتية"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow="02 / Stack"
              title={sectionContent.skills[language].title}
              description={sectionContent.skills[language].description}
            />
          </Reveal>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal key={group.label.en} delay={index * 65}>
                <SkillCard group={group} language={language} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow="03 / Projects"
              title={sectionContent.projects[language].title}
              description={sectionContent.projects[language].description}
            />
          </Reveal>

          <div className="min-w-0 space-y-5 sm:space-y-7">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.name.en} delay={index * 90}>
                <ProjectCard project={project} language={language} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow="04 / Experience"
              title={sectionContent.experience[language].title}
              description={sectionContent.experience[language].description}
            />
          </Reveal>

          <Reveal delay={100}>
            <article className="overflow-hidden rounded-[24px] border-2 border-slate-900 bg-white shadow-[5px_6px_0_rgba(15,23,42,0.1)] dark:border-slate-200 dark:bg-slate-900 dark:shadow-[5px_6px_0_rgba(255,255,255,0.08)] sm:rounded-[30px]">
              <div className="grid lg:grid-cols-[230px_1fr]">
                <div className="border-b-2 border-slate-900 bg-blue-50 p-5 dark:border-slate-700 dark:bg-blue-950/50 sm:p-7 lg:border-b-0 lg:border-r-2">
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border-2 border-slate-900 bg-blue-200 text-sm font-black text-slate-950 dark:border-slate-200 dark:bg-blue-400">
                    IT
                  </div>

                  <div className="text-xs font-black uppercase tracking-[0.14em] text-blue-800 dark:text-blue-200">
                    Internship
                  </div>

                  <div className="mt-2 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                    Egypt
                  </div>
                </div>

                <div className="min-w-0 p-5 sm:p-9">
                  <div className="mb-3 break-words text-xs font-black uppercase tracking-[0.12em] text-blue-800 dark:text-blue-200 sm:text-sm">
                    Gulf of Suez Petroleum Company
                  </div>

                  <h3 className="break-words font-display text-[1.8rem] font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                    IT Intern — GUPCO
                  </h3>

                  <p className="mt-4 break-words text-[15px] font-medium leading-8 text-slate-800 dark:text-slate-100 sm:mt-5 sm:text-xl sm:leading-9">
                    {language === "en"
                      ? "Practical exposure to IT workflows inside a large enterprise environment, alongside continued hands-on work in backend development, databases, and fullstack applications."
                      : "خبرة عملية داخل بيئة مؤسسية كبيرة في مجال الـIT، بالتوازي مع العمل المستمر على تطوير الـBackend وقواعد البيانات وتطبيقات الـFullstack."}
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
                        className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:px-3.5 sm:py-2 sm:text-sm"
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
          className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow="05 / Contact"
              title={sectionContent.contact[language].title}
              description={sectionContent.contact[language].description}
            />
          </Reveal>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <Reveal delay={100}>
              <div className="min-w-0 rounded-[24px] border-2 border-slate-900 bg-white p-5 shadow-[5px_6px_0_rgba(15,23,42,0.1)] dark:border-slate-200 dark:bg-slate-900 dark:shadow-[5px_6px_0_rgba(255,255,255,0.08)] sm:rounded-[30px] sm:p-9">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-900 bg-emerald-200 text-emerald-800 dark:border-slate-200 dark:bg-emerald-400 dark:text-slate-950 sm:h-12 sm:w-12">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[14px] font-black text-slate-950 dark:text-white sm:text-[15px]">
                      {language === "en" ? "Get in touch" : "تواصل معي"}
                    </div>

                    <div className="mt-1 break-all text-xs font-semibold text-slate-700 dark:text-slate-300 sm:text-sm">
                      {EMAIL}
                    </div>
                  </div>
                </div>

                <h3 className="mt-7 break-words font-display text-[2rem] font-black leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:mt-8 sm:text-5xl">
                  {language === "en"
                    ? "Have a role, project, or backend-heavy problem?"
                    : "هل لديك فرصة عمل أو مشروع أو مشكلة تقنية ترتبط بالـBackend؟"}
                </h3>

                <p className="mt-4 break-words text-[15px] font-medium leading-8 text-slate-800 dark:text-slate-100 sm:mt-5 sm:text-xl sm:leading-9">
                  {language === "en"
                    ? "Email is the fastest way to reach me. You can also find my work and professional profiles below."
                    : "البريد الإلكتروني هو أسرع وسيلة للتواصل معي، ويمكنك أيضًا الوصول إلى أعمالي وحساباتي المهنية من الروابط التالية."}
                </p>

                <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      "Hello Youssef - Portfolio",
                    )}`}
                    className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-950 px-4 py-3.5 text-[14px] font-black text-white shadow-[4px_4px_0_#0f172a] dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.12)]"
                  >
                    <Mail className="h-4.5 w-4.5 shrink-0" />
                    <span>
                      {language === "en"
                        ? "Send Email"
                        : "إرسال بريد إلكتروني"}
                    </span>
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-pink-200 px-4 py-3.5 text-[14px] font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.12)]"
                  >
                    <FaLinkedin className="h-4.5 w-4.5 shrink-0" />
                    LinkedIn
                  </a>
                </div>

                <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex min-w-0 w-full items-center gap-3 rounded-xl border-2 border-slate-300 bg-slate-50 px-3.5 py-3.5 text-[13px] font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:px-4 sm:text-[15px]"
                  >
                    <Mail className="h-4.5 w-4.5 shrink-0 text-slate-600 dark:text-slate-300" />

                    <span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap">
                      {EMAIL}
                    </span>

                    {copied ? (
                      <Check className="ml-auto h-4.5 w-4.5 shrink-0 text-emerald-500" />
                    ) : (
                      <Copy className="ml-auto h-4.5 w-4.5 shrink-0 text-slate-600 dark:text-slate-300" />
                    )}
                  </button>

                  <a
                    href={`tel:${PHONE.replaceAll(" ", "")}`}
                    className="flex min-w-0 w-full items-center gap-3 rounded-xl border-2 border-slate-300 bg-slate-50 px-3.5 py-3.5 text-[13px] font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:px-4 sm:text-[15px]"
                  >
                    <Phone className="h-4.5 w-4.5 shrink-0 text-slate-600 dark:text-slate-300" />
                    <span className="min-w-0 break-words">{PHONE}</span>
                  </a>

                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 w-full items-center gap-3 rounded-xl border-2 border-slate-300 bg-slate-50 px-3.5 py-3.5 text-[13px] font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:px-4 sm:text-[15px]"
                  >
                    <FaGithub className="h-4.5 w-4.5 shrink-0 text-slate-600 dark:text-slate-300" />
                    <span className="min-w-0 break-all">
                      github.com/Youssefsea
                    </span>
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 w-full items-center gap-3 rounded-xl border-2 border-slate-300 bg-slate-50 px-3.5 py-3.5 text-[13px] font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:px-4 sm:text-[15px]"
                  >
                    <FaLinkedin className="h-4.5 w-4.5 shrink-0 text-slate-600 dark:text-slate-300" />
                    <span className="min-w-0 break-all">
                      linkedin.com/in/youssef-yasser
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="min-w-0">
                <ContactCode language={language} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-4 pb-5 sm:px-8 sm:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[18px] border-2 border-slate-900 bg-white px-4 py-4 text-xs text-slate-700 shadow-[4px_5px_0_rgba(15,23,42,0.08)] dark:border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[4px_5px_0_rgba(255,255,255,0.07)] sm:flex-row sm:items-center sm:justify-between sm:rounded-[22px] sm:px-5 sm:py-5 sm:text-sm">
          <span className="font-semibold">© 2026 Youssef Yasser</span>

          <div className="flex items-center gap-2 font-black text-slate-900 dark:text-slate-100">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            {language === "en"
              ? "Open to opportunities"
              : "متاح للفرص"}
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={() => {
            autoScrollTargetRef.current = null;

            if (autoScrollTimerRef.current !== null) {
              window.clearTimeout(autoScrollTimerRef.current);
              autoScrollTimerRef.current = null;
            }

            setActiveSection("about");

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-900 bg-yellow-300 text-slate-950 shadow-[4px_4px_0_#0f172a] transition-transform hover:-translate-y-1 hover:rotate-3 dark:border-slate-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.12)] sm:bottom-6 sm:right-7 sm:h-12 sm:w-12 sm:rounded-2xl sm:shadow-[5px_5px_0_#0f172a]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}