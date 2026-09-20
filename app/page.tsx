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

/*
  IMPORTANT:
  Put the PDF here:
  public/cvv.pdf

  Then use:
  /cvv.pdf
*/
const CV_PATH = "/cvv.pdf";

const NAV_LINKS = [
  { id: "about", en: "About", ar: "نبذة عني" },
  { id: "skills", en: "Stack", ar: "التقنيات" },
  { id: "projects", en: "Projects", ar: "المشاريع" },
  { id: "experience", en: "Experience", ar: "الخبرة" },
  { id: "contact", en: "Contact", ar: "تواصل" },
] as const;

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
    label: { en: "AI & Integrations", ar: "الذكاء الاصطناعي والتكاملات" },
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
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
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

      <div className="min-h-[220px] p-5 font-mono text-sm leading-8 sm:p-7 sm:text-[15px]">
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
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div
            className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${style.bg}`}
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

          <h3 className="font-display text-xl font-black text-slate-950 dark:text-white">
            {group.label[language]}
          </h3>
        </div>

        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      </div>

      <div className="space-y-2">
        {group.items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 transition-transform duration-200 group-hover:translate-x-0.5 dark:border-slate-800 dark:bg-slate-950/70"
            >
              <span className={`shrink-0 ${style.text}`}>
                <Icon className="h-4 w-4" />
              </span>

              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
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

      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
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

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
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
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-white dark:text-slate-950"
        >
          {language === "en" ? "Open project" : "فتح المشروع"}
          <ArrowDown className="h-4 w-4 rotate-[-45deg]" />
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
            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              {project.highlights[language].map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
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
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {icon}
        </span>

        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </span>
      </div>

      <div className="mt-4 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
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
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-lg dark:bg-slate-100">
              NTI
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                {language === "en"
                  ? "Professional Certificate"
                  : "شهادة تدريبية"}
              </div>

              <h3 className="mt-1 font-display text-xl font-black text-slate-950 dark:text-white">
                MEAN-Stack Web Development
              </h3>
            </div>
          </div>

          <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
            NTI
          </span>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Instructor
            </div>

            <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              Prof. Ahmed Khattab
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Role
            </div>

            <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              NTI Director
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Duration
            </div>

            <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              28 June — 23 July 2026
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Total
            </div>

            <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              120 Hours
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            Technical — 90 hrs
          </span>

          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            Freelancing — 30 hrs
          </span>
        </div>
      </div>
    </article>
  );
}

function ContactCode({ language }: { language: Language }) {
  return (
    <div className="terminal-panel overflow-hidden rounded-[28px]">
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
  }, [language, isArabic]);

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
        rootMargin: "-22% 0px -60% 0px",
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
      className={`portfolio-root relative min-h-screen overflow-x-hidden text-slate-900 transition-colors duration-500 dark:text-white ${
        isArabic ? "font-arabic" : ""
      }`}
    >
      <style jsx global>{`
        :root {
          color-scheme: light;
        }

        html[data-theme="dark"] {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        ::selection {
          background: #fde68a;
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

        .portfolio-root {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 9% 9%,
              rgba(251, 191, 36, 0.11),
              transparent 22%
            ),
            radial-gradient(
              circle at 90% 12%,
              rgba(96, 165, 250, 0.11),
              transparent 22%
            ),
            radial-gradient(
              circle at 70% 72%,
              rgba(244, 114, 182, 0.08),
              transparent 20%
            ),
            #fffaf2;
        }

        html[data-theme="dark"] .portfolio-root {
          background:
            radial-gradient(
              circle at 8% 8%,
              rgba(16, 185, 129, 0.08),
              transparent 22%
            ),
            radial-gradient(
              circle at 90% 12%,
              rgba(59, 130, 246, 0.08),
              transparent 22%
            ),
            radial-gradient(
              circle at 70% 72%,
              rgba(139, 92, 246, 0.07),
              transparent 22%
            ),
            #060b16;
        }

        .page-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(15, 23, 42, 0.035) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }

        html[data-theme="dark"] .page-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            );
        }

        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          position: relative;
          padding: 7px 0;
          color: rgb(100 116 139);
          font-size: 13px;
          font-weight: 800;
          transition: color 0.2s ease;
        }

        .nav-link::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          content: "";
          border-radius: 99px;
          background: currentColor;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover,
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

        .theme-button,
        .social-button,
        .mobile-menu-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgb(15 23 42);
          background: white;
          color: rgb(15 23 42);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .theme-button {
          height: 40px;
          width: 40px;
          border-radius: 14px;
          box-shadow: 3px 3px 0 rgb(15 23 42);
        }

        .social-button,
        .mobile-menu-button {
          height: 40px;
          width: 40px;
          border-radius: 14px;
        }

        .theme-button:hover,
        .social-button:hover,
        .mobile-menu-button:hover {
          transform: translateY(-2px) rotate(-2deg);
        }

        html[data-theme="dark"] .theme-button,
        html[data-theme="dark"] .social-button,
        html[data-theme="dark"] .mobile-menu-button {
          border-color: white;
          background: #111827;
          color: white;
          box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.18);
        }

        .terminal-panel {
          border: 3px solid #0f172a;
          background: #07111f;
          box-shadow: 8px 10px 0 #0f172a;
        }

        html[data-theme="dark"] .terminal-panel {
          border-color: white;
          box-shadow: 8px 10px 0 rgba(255, 255, 255, 0.1);
        }

        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 18px;
          margin-left: 3px;
          vertical-align: middle;
          background: #34d399;
          animation: cursorBlink 0.9s steps(2, start) infinite;
        }

        @keyframes cursorBlink {
          50% {
            opacity: 0;
          }
        }

        /* Cartoon scene */

        .mascot-scene {
          isolation: isolate;
        }

        .mascot-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(25px);
        }

        .mascot-glow-one {
          top: 20px;
          right: 35px;
          width: 170px;
          height: 170px;
          background: rgba(96, 165, 250, 0.24);
        }

        .mascot-glow-two {
          bottom: 70px;
          left: 10px;
          width: 180px;
          height: 180px;
          background: rgba(244, 114, 182, 0.2);
        }

        html[data-theme="dark"] .mascot-glow-one {
          background: rgba(59, 130, 246, 0.13);
        }

        html[data-theme="dark"] .mascot-glow-two {
          background: rgba(168, 85, 247, 0.12);
        }

        .mascot-float {
          position: absolute;
          inset: 34px 0 auto;
          height: 360px;
          animation: mascotFloat 4.5s ease-in-out infinite;
        }

        .mascot-shadow {
          position: absolute;
          left: 50%;
          bottom: 8px;
          width: 240px;
          height: 28px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.13);
          filter: blur(14px);
        }

        .mascot-body {
          position: absolute;
          left: 50%;
          bottom: 28px;
          width: 280px;
          height: 300px;
          transform: translateX(-50%);
        }

        .mascot-head {
          position: absolute;
          left: 50%;
          top: 5px;
          width: 152px;
          height: 150px;
          transform: translateX(-50%);
          border: 5px solid #0f172a;
          border-radius: 48% 48% 45% 45%;
          background: #f2c5a5;
          box-shadow: 7px 8px 0 #0f172a;
          z-index: 4;
        }

        html[data-theme="dark"] .mascot-head {
          border-color: white;
          box-shadow: 7px 8px 0 rgba(255, 255, 255, 0.12);
        }

        .mascot-hair {
          position: absolute;
          left: 12px;
          right: 12px;
          top: -9px;
          height: 52px;
          border-radius: 45px 45px 30px 30px;
          background: #172033;
          transform: rotate(-2deg);
        }

        .mascot-ear {
          position: absolute;
          top: 58px;
          width: 22px;
          height: 42px;
          border: 4px solid #0f172a;
          border-radius: 50%;
          background: #f2c5a5;
          z-index: -1;
        }

        .mascot-ear-left {
          left: -18px;
        }

        .mascot-ear-right {
          right: -18px;
        }

        html[data-theme="dark"] .mascot-ear {
          border-color: white;
        }

        .mascot-face {
          position: absolute;
          inset: 38px 20px 20px;
        }

        .mascot-glasses {
          position: absolute;
          top: 4px;
          width: 43px;
          height: 31px;
          border: 4px solid #0f172a;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.24);
        }

        html[data-theme="dark"] .mascot-glasses {
          border-color: white;
        }

        .glasses-left {
          left: 0;
        }

        .glasses-right {
          right: 0;
        }

        .glasses-bridge {
          position: absolute;
          top: 14px;
          left: 50%;
          width: 15px;
          height: 4px;
          transform: translateX(-50%);
          background: #0f172a;
        }

        html[data-theme="dark"] .glasses-bridge {
          background: white;
        }

        .mascot-eye {
          position: absolute;
          top: 15px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0f172a;
        }

        .eye-left {
          left: 19px;
        }

        .eye-right {
          right: 19px;
        }

        .mascot-nose {
          position: absolute;
          left: 50%;
          top: 48px;
          width: 8px;
          height: 13px;
          transform: translateX(-50%);
          border-left: 3px solid #c48765;
          border-bottom: 3px solid #c48765;
          border-radius: 0 0 0 6px;
        }

        .mascot-mouth {
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 25px;
          height: 10px;
          transform: translateX(-50%);
          border-bottom: 3px solid #0f172a;
          border-radius: 0 0 30px 30px;
        }

        .mascot-neck {
          position: absolute;
          left: 50%;
          top: 134px;
          width: 48px;
          height: 42px;
          transform: translateX(-50%);
          border: 5px solid #0f172a;
          background: #f2c5a5;
          z-index: 2;
        }

        html[data-theme="dark"] .mascot-neck {
          border-color: white;
        }

        .mascot-hoodie {
          position: absolute;
          left: 50%;
          bottom: 12px;
          width: 230px;
          height: 170px;
          transform: translateX(-50%);
          border: 5px solid #0f172a;
          border-radius: 55px 55px 30px 30px;
          background: #4f7cff;
          box-shadow: 8px 9px 0 #0f172a;
          z-index: 1;
        }

        html[data-theme="dark"] .mascot-hoodie {
          border-color: white;
          box-shadow: 8px 9px 0 rgba(255, 255, 255, 0.1);
          background: #315ec9;
        }

        .hoodie-string {
          position: absolute;
          top: 37px;
          width: 5px;
          height: 43px;
          border-radius: 999px;
          background: #dbeafe;
        }

        .hoodie-string-left {
          left: 83px;
          transform: rotate(4deg);
        }

        .hoodie-string-right {
          right: 83px;
          transform: rotate(-4deg);
        }

        .hoodie-pocket {
          position: absolute;
          left: 50%;
          bottom: 20px;
          width: 100px;
          height: 38px;
          transform: translateX(-50%);
          border: 4px solid rgba(255, 255, 255, 0.75);
          border-top: 0;
          border-radius: 0 0 24px 24px;
        }

        .mascot-arm {
          position: absolute;
          bottom: 72px;
          width: 64px;
          height: 95px;
          border: 5px solid #0f172a;
          border-radius: 28px;
          background: #4f7cff;
          z-index: 2;
        }

        html[data-theme="dark"] .mascot-arm {
          border-color: white;
          background: #315ec9;
        }

        .arm-left {
          left: 7px;
          transform: rotate(20deg);
        }

        .arm-right {
          right: 7px;
          transform: rotate(-20deg);
        }

        .mascot-laptop {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 210px;
          transform: translateX(-50%);
          z-index: 6;
        }

        .laptop-screen {
          height: 115px;
          border: 5px solid #0f172a;
          border-bottom: 0;
          border-radius: 16px 16px 5px 5px;
          background: #111827;
          overflow: hidden;
        }

        html[data-theme="dark"] .laptop-screen {
          border-color: white;
        }

        .laptop-topbar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 9px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .laptop-topbar span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .laptop-topbar span:nth-child(1) {
          background: #fb7185;
        }

        .laptop-topbar span:nth-child(2) {
          background: #facc15;
        }

        .laptop-topbar span:nth-child(3) {
          background: #34d399;
        }

        .laptop-code {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 15px;
        }

        .code-line {
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(90deg, #34d399, #60a5fa);
          opacity: 0.9;
        }

        .code-line.short {
          width: 45%;
        }

        .code-line.medium {
          width: 68%;
        }

        .code-line.long {
          width: 90%;
        }

        .laptop-base {
          width: 225px;
          height: 14px;
          margin-left: -7px;
          border-radius: 0 0 15px 15px;
          background: #cbd5e1;
          border: 4px solid #0f172a;
        }

        html[data-theme="dark"] .laptop-base {
          background: #475569;
          border-color: white;
        }

        .floating-code-badge {
          position: absolute;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border: 3px solid #0f172a;
          border-radius: 18px;
          font-family: ui-monospace, monospace;
          font-size: 15px;
          font-weight: 900;
          box-shadow: 5px 6px 0 #0f172a;
          animation: stickerFloat 4s ease-in-out infinite;
        }

        html[data-theme="dark"] .floating-code-badge {
          border-color: white;
          box-shadow: 5px 6px 0 rgba(255, 255, 255, 0.1);
        }

        .badge-api {
          top: 45px;
          left: 26px;
          background: #fde68a;
          transform: rotate(-8deg);
        }

        .badge-db {
          right: 24px;
          top: 130px;
          background: #bfdbfe;
          transform: rotate(8deg);
          animation-delay: 0.7s;
        }

        .badge-ui {
          bottom: 52px;
          left: 55px;
          background: #fbcfe8;
          transform: rotate(-5deg);
          animation-delay: 1.2s;
        }

        @keyframes mascotFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-11px);
          }
        }

        @keyframes stickerFloat {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -8px;
          }
        }

        /* Cards */

        .skill-card,
        .project-card,
        .info-card {
          border: 2px solid rgb(226 232 240);
          background: rgba(255, 255, 255, 0.9);
          border-radius: 28px;
        }

        .skill-card {
          padding: 24px;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgb(203 213 225);
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.09);
        }

        .project-card {
          position: relative;
          overflow: hidden;
          padding: 28px;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.06);
        }

        .project-top-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
        }

        .info-card {
          padding: 20px;
        }

        .certificate-card {
          position: relative;
          overflow: hidden;
          margin-top: 18px;
          padding: 26px;
          border: 3px solid #0f172a;
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(251, 191, 36, 0.25),
              transparent 30%
            ),
            linear-gradient(135deg, #d1fae5, #dbeafe 50%, #fce7f3);
          box-shadow: 8px 9px 0 #0f172a;
        }

        .certificate-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .certificate-decoration-one {
          top: -50px;
          right: -40px;
          width: 150px;
          height: 150px;
          border: 20px solid rgba(255, 255, 255, 0.3);
        }

        .certificate-decoration-two {
          bottom: -70px;
          left: -50px;
          width: 160px;
          height: 160px;
          border: 18px solid rgba(255, 255, 255, 0.22);
        }

        html[data-theme="dark"] .skill-card,
        html[data-theme="dark"] .project-card,
        html[data-theme="dark"] .info-card {
          border-color: rgb(30 41 59);
          background: rgba(15, 23, 42, 0.88);
        }

        html[data-theme="dark"] .skill-card:hover {
          border-color: rgb(51 65 85);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
        }

        html[data-theme="dark"] .project-card {
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.18);
        }

        html[data-theme="dark"] .certificate-card {
          border-color: white;
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(16, 185, 129, 0.15),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              rgba(6, 78, 59, 0.9),
              rgba(30, 58, 138, 0.8)
            );
          box-shadow: 8px 9px 0 rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 640px) {
          .mascot-scene {
            height: 390px;
            transform: scale(0.88);
            transform-origin: top center;
            margin-bottom: -45px;
          }

          .project-card {
            padding: 22px;
          }

          .certificate-card {
            padding: 22px;
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

          .mascot-float,
          .floating-code-badge,
          .terminal-cursor {
            animation: none !important;
          }
        }
      `}</style>

      <div className="page-grid pointer-events-none fixed inset-0 z-0 opacity-70" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-slate-900/10 dark:bg-white/10">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500"
          style={{
            width: `${scrollProgress}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[22px] border-2 border-slate-900 bg-white/92 px-3 py-3 shadow-[6px_7px_0_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white dark:bg-slate-950/90 dark:shadow-[6px_7px_0_rgba(255,255,255,0.08)] sm:px-5">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-900 bg-yellow-300 text-sm font-black text-slate-950 dark:border-white">
              YY
            </span>

            <span className="hidden font-display text-sm font-black tracking-tight text-slate-950 dark:text-white sm:inline">
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
              className="theme-button !h-10 !w-auto px-3"
              aria-label="Toggle language"
              title={language === "en" ? "العربية" : "English"}
            >
              <Languages className="h-4 w-4" />
              <span className="ml-1 text-[11px] font-black">
                {language === "en" ? "AR" : "EN"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setTheme((value) => (value === "light" ? "dark" : "light"))
              }
              className="theme-button"
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
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[22px] border-2 border-slate-900 bg-white shadow-[6px_7px_0_rgba(15,23,42,0.1)] dark:border-white dark:bg-slate-950 dark:shadow-[6px_7px_0_rgba(255,255,255,0.08)]">
            <div className="grid grid-cols-2 gap-2 p-3">
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

            <div className="flex gap-2 border-t-2 border-slate-900 p-3 dark:border-white sm:hidden">
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
          className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:min-h-screen"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-emerald-200 px-4 py-2 text-xs font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-white dark:bg-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-700" />

                  {language === "en"
                    ? "Open to junior roles & internships"
                    : "متاح لفرص Junior وInternships"}
                </div>

                <h1 className="font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-7xl lg:text-[5.7rem]">
                  Youssef
                  <br />
                  <span className="relative inline-block">
                    Yasser
                    <span className="absolute -bottom-2 left-0 h-3 w-full -rotate-2 rounded-full bg-yellow-300/80 sm:h-4" />
                  </span>
                  <span className="relative">.</span>
                </h1>

                <div className="mt-7 max-w-2xl">
                  <p className="font-display text-xl font-bold leading-9 text-slate-900 dark:text-white sm:text-2xl">
                    {language === "en"
                      ? "Backend-first Fullstack Developer."
                      : "مطور Fullstack بتركيز أساسي على الـBackend."}
                  </p>

                  <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                    {language === "en"
                      ? "Computer Science student at Menoufia University building practical web applications with APIs, databases, authentication, business logic, and modern React interfaces."
                      : "طالب علوم حاسب في جامعة المنوفية، أعمل على بناء تطبيقات ويب عملية تشمل الـAPIs وقواعد البيانات والـAuthentication والـBusiness Logic وواجهات React الحديثة."}
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
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-yellow-300 px-5 py-3.5 text-sm font-black text-slate-950 shadow-[5px_5px_0_#0f172a] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_#0f172a] dark:border-white dark:shadow-[5px_5px_0_rgba(255,255,255,0.12)]"
                  >
                    {language === "en" ? "View projects" : "عرض المشاريع"}
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-[5px_5px_0_#0f172a] transition-all hover:-translate-y-1 dark:border-white dark:bg-slate-900 dark:text-white dark:shadow-[5px_5px_0_rgba(255,255,255,0.12)]"
                  >
                    {language === "en"
                      ? "View resume"
                      : "عرض السيرة الذاتية"}
                    <Eye className="h-4 w-4" />
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-emerald-200 px-5 py-3.5 text-sm font-black text-slate-950 shadow-[5px_5px_0_#0f172a] transition-all hover:-translate-y-1 dark:border-white dark:shadow-[5px_5px_0_rgba(255,255,255,0.12)]"
                  >
                    {language === "en"
                      ? "Download resume"
                      : "تحميل السيرة الذاتية"}
                    <Download className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    "Backend-first",
                    "TypeScript",
                    "PostgreSQL",
                    "Next.js",
                    "NTI Certified",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border-2 border-slate-900 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-[2px_2px_0_rgba(15,23,42,0.15)] dark:border-white dark:bg-slate-900 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-7">
                <AnimatedMascot />
                <TerminalPanel language={language} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[28px] border-2 border-slate-900 bg-white shadow-[7px_8px_0_rgba(15,23,42,0.12)] dark:border-white dark:bg-slate-900 dark:shadow-[7px_8px_0_rgba(255,255,255,0.08)] sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={`${stat.value}-${stat.en}`}
                  className={`px-5 py-7 sm:px-7 ${
                    index < 2
                      ? "border-b-2 border-slate-900 sm:border-b-0"
                      : ""
                  } ${
                    index % 2 === 0
                      ? "border-r-2 border-slate-900"
                      : ""
                  } ${
                    index === 1
                      ? "sm:border-r-2"
                      : ""
                  } ${
                    index === 3
                      ? "sm:border-r-0"
                      : ""
                  } dark:border-white`}
                >
                  <div className="font-display text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
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

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal delay={80}>
              <div className="rounded-[30px] border-2 border-slate-900 bg-white p-7 shadow-[7px_8px_0_rgba(15,23,42,0.1)] dark:border-white dark:bg-slate-900 dark:shadow-[7px_8px_0_rgba(255,255,255,0.06)] sm:p-9">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 font-display text-xs font-black text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    {"{ }"}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-950 dark:text-white">
                      {language === "en"
                        ? "How I approach development"
                        : "منهجي في التطوير"}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Architecture → API → Data → UI
                    </div>
                  </div>
                </div>

                <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
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
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div>
                <div className="space-y-4">
                  <InfoCard
                    icon={<GraduationCap className="h-4 w-4" />}
                    label={language === "en" ? "Education" : "التعليم"}
                    value={
                      language === "en"
                        ? "B.Sc. Computer Science — Menoufia University · Expected 2027"
                        : "بكالوريوس علوم الحاسب — جامعة المنوفية · متوقع التخرج عام 2027"
                    }
                  />

                  <InfoCard
                    icon={<Terminal className="h-4 w-4" />}
                    label={language === "en" ? "Focus" : "التركيز"}
                    value="Backend-first Fullstack Development"
                  />

                  <InfoCard
                    icon={<Briefcase className="h-4 w-4" />}
                    label={language === "en" ? "Target" : "الهدف"}
                    value={
                      language === "en"
                        ? "Junior Backend / Junior Fullstack roles"
                        : "فرص Junior Backend وJunior Fullstack"
                    }
                  />
                </div>

                <NTICertificateCard language={language} />

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-4 py-3 text-xs font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:text-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.1)]"
                  >
                    <FileText className="h-4 w-4" />
                    {language === "en"
                      ? "View resume"
                      : "عرض السيرة الذاتية"}
                  </a>

                  <a
                    href={CV_PATH}
                    download="Youssef-Yasser-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-yellow-200 px-4 py-3 text-xs font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.1)]"
                  >
                    <Download className="h-4 w-4" />
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
              <Reveal key={group.label.en} delay={index * 65}>
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
            <article className="overflow-hidden rounded-[30px] border-2 border-slate-900 bg-white shadow-[7px_8px_0_rgba(15,23,42,0.1)] dark:border-white dark:bg-slate-900 dark:shadow-[7px_8px_0_rgba(255,255,255,0.06)]">
              <div className="grid lg:grid-cols-[230px_1fr]">
                <div className="border-b-2 border-slate-900 bg-blue-50 p-7 dark:border-white dark:bg-blue-950/40 lg:border-b-0 lg:border-r-2">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-900 bg-blue-200 text-xs font-black text-slate-950 dark:border-white dark:bg-blue-400">
                    IT
                  </div>

                  <div className="text-xs font-black uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                    Internship
                  </div>

                  <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Egypt
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                    Gulf of Suez Petroleum Company
                  </div>

                  <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
                    IT Intern — GUPCO
                  </h3>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
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
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
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
              <div className="rounded-[30px] border-2 border-slate-900 bg-white p-7 shadow-[7px_8px_0_rgba(15,23,42,0.1)] dark:border-white dark:bg-slate-900 dark:shadow-[7px_8px_0_rgba(255,255,255,0.06)] sm:p-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-slate-900 bg-emerald-200 text-emerald-800 dark:border-white dark:bg-emerald-400 dark:text-slate-950">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-sm font-black text-slate-950 dark:text-white">
                      {language === "en"
                        ? "Get in touch"
                        : "تواصل معي"}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {EMAIL}
                    </div>
                  </div>
                </div>

                <h3 className="mt-7 max-w-xl font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {language === "en"
                    ? "Have a role, project, or backend-heavy problem?"
                    : "هل لديك فرصة عمل أو مشروع أو مشكلة تقنية ترتبط بالـBackend؟"}
                </h3>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                  {language === "en"
                    ? "Email is the fastest way to reach me. You can also find my work and professional profiles below."
                    : "البريد الإلكتروني هو أسرع وسيلة للتواصل معي، ويمكنك أيضًا الوصول إلى أعمالي وحساباتي المهنية من الروابط التالية."}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      "Hello Youssef - Portfolio",
                    )}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-950 px-4 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_#0f172a] dark:border-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.1)]"
                  >
                    <Mail className="h-4 w-4" />
                    {language === "en"
                      ? "Send Email"
                      : "إرسال بريد إلكتروني"}
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-pink-200 px-4 py-3.5 text-sm font-black text-slate-950 shadow-[4px_4px_0_#0f172a] dark:border-white dark:shadow-[4px_4px_0_rgba(255,255,255,0.1)]"
                  >
                    <FaLinkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>

                <div className="mt-8 space-y-2.5">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex w-full items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
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
                    className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                    {PHONE}
                  </a>

                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <FaGithub className="h-4 w-4 shrink-0 text-slate-400" />
                    github.com/Youssefsea
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <FaLinkedin className="h-4 w-4 shrink-0 text-slate-400" />
                    linkedin.com/in/youssef-yasser
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
        <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[22px] border-2 border-slate-900 bg-white px-5 py-4 text-xs text-slate-500 shadow-[5px_6px_0_rgba(15,23,42,0.08)] dark:border-white dark:bg-slate-900 dark:text-slate-400 dark:shadow-[5px_6px_0_rgba(255,255,255,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Youssef Yasser</span>

          <div className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-200">
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
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-2xl border-2 border-slate-900 bg-yellow-300 text-slate-950 shadow-[5px_5px_0_#0f172a] transition-transform hover:-translate-y-1 hover:rotate-3 dark:border-white dark:shadow-[5px_5px_0_rgba(255,255,255,0.1)] sm:right-7"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}