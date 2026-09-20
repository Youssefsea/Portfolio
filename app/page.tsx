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
import { FaGithub, FaLinkedin } from "react-icons/fa";

type Language = "en" | "ar";
type Theme = "light" | "dark";
type ColorName = "green" | "orange" | "purple" | "blue" | "pink" | "yellow";

const EMAIL = "youssefsea274@gmail.com";
const PHONE = "+20 110 469 9278";
const LINKEDIN = "https://www.linkedin.com/in/youssef-yasser-97aa742b0";
const GITHUB = "https://github.com/Youssefsea";
const CV_PATH = "/cvv.pdf";

const NAV_LINKS = [
  { id: "about", en: "about", ar: "من أنا" },
  { id: "skills", en: "stack", ar: "التقنيات" },
  { id: "projects", en: "projects", ar: "المشاريع" },
  { id: "experience", en: "experience", ar: "الخبرة" },
  { id: "contact", en: "contact", ar: "تواصل" },
] as const;

const TERMINAL_LINES = {
  en: [
    { prompt: "$", text: "whoami" },
    { prompt: ">", text: "Youssef Yasser" },
    { prompt: "$", text: "cat role.txt" },
    { prompt: ">", text: "Backend-first Fullstack Developer" },
    { prompt: "$", text: "status --current" },
    { prompt: ">", text: "building systems, not just screens" },
  ],
  ar: [
    { prompt: "$", text: "whoami" },
    { prompt: ">", text: "Youssef Yasser" },
    { prompt: "$", text: "cat role.txt" },
    { prompt: ">", text: "Fullstack Developer — Backend First" },
    { prompt: "$", text: "status --current" },
    { prompt: ">", text: "ببني أنظمة، مش مجرد شاشات" },
  ],
};

const SKILL_GROUPS = [
  {
    label: { en: "Backend", ar: "Backend" },
    icon: Server,
    color: "blue" as ColorName,
    items: ["Node.js", "Express.js", "REST API Design", "MVC", "JWT Auth", "HTTP-Only Cookies"],
  },
  {
    label: { en: "Databases", ar: "قواعد البيانات" },
    icon: Database,
    color: "purple" as ColorName,
    items: ["PostgreSQL", "MySQL", "Redis (Locking)", "Schema Design", "Geospatial Queries", "pgAdmin"],
  },
  {
    label: { en: "Frontend", ar: "Frontend" },
    icon: Code2,
    color: "pink" as ColorName,
    items: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "RTL / Arabic UI"],
  },
  {
    label: { en: "AI & Integrations", ar: "AI والتكاملات" },
    icon: Sparkles,
    color: "yellow" as ColorName,
    items: ["Google Gemini API", "NLP", "Web Speech API", "Leaflet.js"],
  },
  {
    label: { en: "Tools & DevOps", ar: "Tools و DevOps" },
    icon: Cpu,
    color: "orange" as ColorName,
    items: ["Git", "GitHub", "Docker", "AWS Basics", "Postman", "Cloudinary"],
  },
] as const;

const PROJECTS = [
  {
    nameAr: "ذاكر صح",
    name: { en: "EdTech SaaS Platform", ar: "منصة تعليمية SaaS" },
    description: {
      en: "An educational marketplace connecting students across Egypt with nearby learning centers and private tutors — with role-aware workflows and real booking logic.",
      ar: "منصة تعليمية بتربط الطلاب بالمراكز والمدرسين القريبين، مع أدوار مختلفة ومنطق حجز فعلي.",
    },
    highlights: {
      en: [
        "Three dedicated roles: Student, Center Admin, Teacher",
        "Geolocation-based discovery via OpenStreetMap",
        "Token-gated content streaming for paid video/files",
        "Automatic schedule-conflict detection on booking",
        "Super Admin panel with platform-wide analytics",
      ],
      ar: [
        "3 أدوار: طالب، Admin للمركز، ومدرس",
        "اكتشاف المراكز والمدرسين باستخدام الموقع الجغرافي",
        "حماية المحتوى المدفوع للفيديو والملفات",
        "منع تعارض مواعيد الحجز تلقائيًا",
        "لوحة Super Admin لمتابعة وتحليل المنصة",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "React"],
    link: "https://center-saas-front-83p8.vercel.app/",
    accent: "green" as ColorName,
    icon: "🎓",
  },
  {
    nameAr: "أكلي",
    name: { en: "Food Delivery Platform", ar: "منصة توصيل أكل" },
    description: {
      en: "A dual-sided delivery app for customers and restaurant vendors, built around live order tracking and real distance-based pricing.",
      ar: "منصة توصيل للعميل والمطعم، فيها تتبع للطلب وتسعير للتوصيل حسب المسافة الحقيقية.",
    },
    highlights: {
      en: [
        "Real-time order chat via Socket.IO, gated by payment",
        "GPS + Haversine distance & delivery-fee calculation",
        "Multi-restaurant smart cart",
        "Vodafone Cash / InstaPay proof-of-payment workflow",
        "Vendor dashboard with live sales analytics",
      ],
      ar: [
        "شات مباشر للطلب باستخدام Socket.IO بعد الدفع",
        "حساب المسافة ورسوم التوصيل بالـGPS وHaversine",
        "سلة واحدة تدعم أكثر من مطعم",
        "Workflow لإثبات الدفع بـVodafone Cash / InstaPay",
        "Dashboard للمطعم مع تحليلات المبيعات",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Socket.IO", "Leaflet"],
    link: "https://food-front-rho.vercel.app/",
    accent: "orange" as ColorName,
    icon: "🍔",
  },
  {
    nameAr: "WealthWise AI",
    name: { en: "Smart Financial Wallet", ar: "محفظة مالية ذكية" },
    description: {
      en: "An AI-powered wallet that turns spoken or typed Arabic into categorized, logged transactions.",
      ar: "محفظة مالية بتحول الكلام العربي المكتوب أو الصوتي لمعاملات مالية مصنفة ومسجلة تلقائيًا.",
    },
    highlights: {
      en: [
        "Gemini-powered Arabic natural-language transaction parsing",
        "SERIALIZABLE isolation + dual Redis locks for transfers",
        "Idempotency keys on money-moving endpoints",
        "Arabic voice input via the Web Speech API",
        "Budget tracking with AI advice personalized by city",
      ],
      ar: [
        "تحليل المعاملات العربية باستخدام Gemini",
        "SERIALIZABLE + Redis locks للتحويلات",
        "Idempotency keys لكل endpoint مالي حساس",
        "إدخال صوتي بالعربي باستخدام Web Speech API",
        "متابعة الميزانية ونصائح AI حسب المدينة",
      ],
    },
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Gemini AI"],
    link: "https://wallet-wep-react.vercel.app/",
    accent: "purple" as ColorName,
    icon: "💰",
  },
] as const;

const STATS = [
  { value: "3", en: "shipped apps", ar: "تطبيقات متنفذة" },
  { value: "30+", en: "REST endpoints", ar: "REST endpoints" },
  { value: "3", en: "core platform roles", ar: "أدوار أساسية" },
  { value: "2027", en: "graduating", ar: "سنة التخرج" },
] as const;

const COLOR_STYLES: Record<ColorName, { text: string; soft: string; border: string; iconBg: string }> = {
  green: { text: "text-green-600", soft: "bg-green-100", border: "border-green-300", iconBg: "bg-green-200" },
  orange: { text: "text-orange-600", soft: "bg-orange-100", border: "border-orange-300", iconBg: "bg-orange-200" },
  purple: { text: "text-purple-600", soft: "bg-purple-100", border: "border-purple-300", iconBg: "bg-purple-200" },
  blue: { text: "text-blue-600", soft: "bg-blue-100", border: "border-blue-300", iconBg: "bg-blue-200" },
  pink: { text: "text-pink-600", soft: "bg-pink-100", border: "border-pink-300", iconBg: "bg-pink-200" },
  yellow: { text: "text-yellow-700", soft: "bg-yellow-100", border: "border-yellow-300", iconBg: "bg-yellow-200" },
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
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

function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl animate-soft-float" />
      <div className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl animate-soft-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute left-[12%] top-[30%] h-64 w-64 rounded-full bg-yellow-200/30 blur-3xl animate-soft-float" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-purple-200/30 blur-3xl animate-soft-float" style={{ animationDelay: "2s" }} />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:32px_32px] dark-grid" />

      {Array.from({ length: 14 }).map((_, index) => (
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
    <div className="character-scene relative mx-auto h-[400px] w-full max-w-[440px]">
      <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 shadow-[0_20px_70px_rgba(59,130,246,0.14)]" />

      <div className="absolute left-1/2 top-[14%] h-[225px] w-[200px] -translate-x-1/2 rounded-[45%_45%_42%_42%] border-[6px] border-slate-900 bg-[#f4c7a1] shadow-[8px_10px_0_#0f172a]">
        <div className="absolute -left-5 top-8 h-20 w-9 rounded-full border-[5px] border-slate-900 bg-[#f4c7a1]" />
        <div className="absolute -right-5 top-8 h-20 w-9 rounded-full border-[5px] border-slate-900 bg-[#f4c7a1]" />
        <div className="absolute left-1/2 top-12 h-9 w-32 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="absolute left-4 top-2 h-20 w-14 rounded-[60%] bg-slate-900 rotate-[20deg]" />
        <div className="absolute right-4 top-1 h-24 w-16 rounded-[60%] bg-slate-900 -rotate-[18deg]" />
        <div className="absolute left-[31px] top-[98px] h-5 w-5 rounded-full bg-slate-900" />
        <div className="absolute right-[31px] top-[98px] h-5 w-5 rounded-full bg-slate-900" />
        <div className="absolute left-[26px] top-[87px] h-12 w-12 rounded-full border-4 border-slate-900" />
        <div className="absolute right-[26px] top-[87px] h-12 w-12 rounded-full border-4 border-slate-900" />
        <div className="absolute left-1/2 top-[106px] h-3 w-4 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="absolute bottom-[38px] left-1/2 h-9 w-20 -translate-x-1/2 rounded-b-full border-[5px] border-t-0 border-slate-900" />
        <div className="absolute bottom-[-18px] left-1/2 h-16 w-16 -translate-x-1/2 rounded-b-3xl border-[5px] border-slate-900 bg-blue-500" />
      </div>

      <div className="absolute left-1/2 top-[57%] h-[136px] w-[230px] -translate-x-1/2 rounded-[42px] border-[6px] border-slate-900 bg-blue-500 shadow-[10px_12px_0_#0f172a]" />
      <div className="absolute left-[25%] top-[63%] h-[92px] w-[62px] rounded-[26px] border-[6px] border-slate-900 bg-slate-800 rotate-[10deg]" />
      <div className="absolute right-[24%] top-[63%] h-[92px] w-[62px] rounded-[26px] border-[6px] border-slate-900 bg-slate-800 -rotate-[10deg]" />
      <div className="absolute bottom-2 left-[23%] h-16 w-28 rounded-full border-[6px] border-slate-900 bg-pink-400" />
      <div className="absolute bottom-2 right-[23%] h-16 w-28 rounded-full border-[6px] border-slate-900 bg-purple-400" />

      <div className="tech-bubble absolute -right-1 top-8 rotate-6"><span>⚡</span></div>
      <div className="tech-bubble absolute -left-3 top-32 -rotate-6"><span>💻</span></div>
      <div className="tech-bubble absolute -right-2 bottom-24 rotate-3"><span>🚀</span></div>

      <div className="absolute bottom-0 left-1/2 h-8 w-[240px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-xl" />
    </div>
  );
}

function TerminalIntro({ language }: { language: Language }) {
  const lines = TERMINAL_LINES[language];
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState<typeof lines>([]);

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
      }, 1800);
      return () => window.clearTimeout(restart);
    }

    const current = lines[lineIdx];

    if (charIdx < current.text.length) {
      const timeout = window.setTimeout(() => setCharIdx((value) => value + 1), 22);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setDone((value) => [...value, current]);
      setLineIdx((value) => value + 1);
      setCharIdx(0);
    }, 280);

    return () => window.clearTimeout(timeout);
  }, [lineIdx, charIdx, lines]);

  const current = lines[lineIdx];

  return (
    <div className="anime-window overflow-hidden rounded-3xl border-[4px] border-slate-900 bg-slate-950 shadow-[10px_12px_0_#0f172a]">
      <div className="flex items-center gap-2 border-b-[3px] border-slate-900 bg-slate-800 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-300" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-slate-400">youssef@portfolio: ~</span>
      </div>

      <div className="min-h-[250px] p-5 font-mono text-sm leading-7 sm:text-base">
        {done.map((line, index) => (
          <div key={`${line.text}-${index}`} className="flex gap-2">
            <span className={line.prompt === "$" ? "text-green-400" : "text-slate-500"}>{line.prompt}</span>
            <span className={line.prompt === "$" ? "text-white" : "text-slate-400"}>{line.text}</span>
          </div>
        ))}

        {current && (
          <div className="flex gap-2">
            <span className={current.prompt === "$" ? "text-green-400" : "text-slate-500"}>{current.prompt}</span>
            <span className={current.prompt === "$" ? "text-white" : "text-slate-400"}>{current.text.slice(0, charIdx)}</span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ number, title, emoji }: { number: string; title: string; emoji: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="sticker-number">{number}</span>
          <span className="text-xl">{emoji}</span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">{title}</h2>
      </div>
      <div className="hidden h-4 w-32 rounded-full border-2 border-slate-900 bg-yellow-300 rotate-2 dark:border-white sm:block" />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof GraduationCap; label: string; value: string }) {
  return (
    <div className="comic-mini-card">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="font-semibold leading-relaxed text-slate-800 dark:text-slate-200">{value}</div>
    </div>
  );
}

function SkillCard({ group, language }: { group: (typeof SKILL_GROUPS)[number]; language: Language }) {
  const Icon = group.icon;
  const colors = COLOR_STYLES[group.color];

  return (
    <div className="comic-card group h-full p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-slate-900 ${colors.iconBg} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>
        <h3 className="font-display text-xl font-black text-slate-900 dark:text-white">{group.label[language]}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span key={item} className={`skill-pill ${colors.soft} ${colors.border}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, language }: { project: (typeof PROJECTS)[number]; language: Language }) {
  const [open, setOpen] = useState(false);
  const styles = COLOR_STYLES[project.accent];

  return (
    <article className="comic-project-card group">
      <div className="absolute -right-2 -top-5 rotate-6 rounded-full border-[3px] border-slate-900 bg-yellow-300 px-4 py-2 font-display text-sm font-black shadow-[4px_4px_0_#0f172a] transition-transform duration-300 group-hover:rotate-12 dark:border-white">
        {project.icon}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border-2 border-slate-900 bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-[2px_2px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:text-white">
              {project.nameAr}
            </span>
          </div>

          <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">{project.name[language]}</h3>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{project.description[language]}</p>
        </div>

        <a href={project.link} target="_blank" rel="noopener noreferrer" className={`comic-button shrink-0 ${styles.iconBg}`}>
          {language === "en" ? "Live demo" : "تجربة المشروع"}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="stack-tag">{item}</span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-6 flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-4 py-2 font-display text-xs font-black text-slate-900 shadow-[3px_3px_0_#0f172a] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:text-white"
      >
        {open ? (language === "en" ? "hide details" : "إخفاء التفاصيل") : language === "en" ? "show details" : "عرض التفاصيل"}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <ul className="space-y-3 border-t-2 border-dashed border-slate-300 pt-5 dark:border-slate-700">
            {project.highlights[language].map((highlight) => (
              <li key={highlight} className="flex gap-3 leading-6 text-slate-600 dark:text-slate-300">
                <span className={`mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-slate-900 ${styles.iconBg} dark:border-white`} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ContactCard({ language }: { language: Language }) {
  return (
    <div className="comic-window overflow-hidden">
      <div className="flex items-center gap-2 border-b-[3px] border-slate-900 bg-slate-100 px-5 py-3 dark:border-white dark:bg-slate-800">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-300" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-slate-500 dark:text-slate-300">contact.json</span>
      </div>

      <pre className="overflow-x-auto p-6 font-mono text-xs leading-7 text-slate-600 dark:text-slate-300 sm:text-sm">
{`{
  "name": "Youssef Yasser",
  "role": "${language === "en" ? "Backend-First Fullstack Dev" : "Fullstack Developer — Backend First"}",
  "location": "Giza, Egypt",
  "available_for": [
    "remote roles",
    "internships"
  ],
  "cv": "/cvv.pdf"
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
    const savedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const savedLanguage = window.localStorage.getItem("portfolio-language") as Language | null;

    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    if (savedLanguage === "en" || savedLanguage === "ar") setLanguage(savedLanguage);
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
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

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
    const sections = NAV_LINKS
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.3, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable.
    }
  };

  const toggleLanguage = () => setLanguage((value) => (value === "en" ? "ar" : "en"));
  const toggleTheme = () => setTheme((value) => (value === "light" ? "dark" : "light"));

  const sectionTitles = {
    about: language === "en" ? "about" : "من أنا",
    skills: language === "en" ? "stack" : "التقنيات",
    projects: language === "en" ? "projects" : "المشاريع",
    experience: language === "en" ? "experience" : "الخبرة",
    contact: language === "en" ? "contact" : "تواصل",
  };

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-[#fffdf8] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white ${isArabic ? "font-arabic" : ""}`}>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fffdf8; }
        html[data-theme="dark"] body { background: #020617; }
        ::selection { background: #fde68a; color: #0f172a; }
        .font-arabic { font-family: Tahoma, Arial, sans-serif; }
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .65s ease, transform .65s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .animate-soft-float { animation: softFloat 7s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2.8s ease-in-out infinite; }
        @keyframes softFloat { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(0,-14px,0) scale(1.035); } }
        @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(.7); } 50% { opacity: .9; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .animate-soft-float, .animate-twinkle { animation: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        html[data-theme="dark"] .dark-grid {
          background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
        }
      `}</style>

      <FloatingBackground />

      <div className="fixed left-0 right-0 top-0 z-[100] h-1.5 bg-slate-900/10 dark:bg-white/10">
        <div className="h-full rounded-r-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500" style={{ width: `${scrollProgress}%`, transition: "width 120ms linear" }} />
      </div>

      <header className="fixed left-0 right-0 top-1.5 z-50 px-4 pt-3 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border-[3px] border-slate-900 bg-white/90 px-3 py-3 shadow-[6px_6px_0_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-white dark:bg-slate-900/90 dark:shadow-[6px_6px_0_rgba(255,255,255,0.06)] sm:px-5">
          <button type="button" onClick={() => scrollTo("hero")} className="group flex items-center gap-2 font-display text-lg font-black tracking-tight text-slate-950 dark:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-[2px] border-slate-900 bg-yellow-300 transition-transform group-hover:-rotate-6 dark:border-white">Y</span>
            <span className="hidden sm:inline">~/youssef</span>
          </button>

          <div className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((link) => (
              <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className={`nav-link ${activeSection === link.id ? "nav-link-active" : ""}`}>
                {link[language]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={toggleLanguage} className="top-action" aria-label="Toggle language">
              <Languages className="h-4 w-4" />
              <span>{language === "en" ? "AR" : "EN"}</span>
            </button>

            <button type="button" onClick={toggleTheme} className="top-action" aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="social-button hidden sm:flex" aria-label="GitHub">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-button hidden sm:flex" aria-label="LinkedIn">
              <FaLinkedin className="h-5 w-5" />
            </a>

            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="mobile-menu-button lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border-[3px] border-slate-900 bg-white shadow-[6px_6px_0_rgba(15,23,42,0.12)] dark:border-white dark:bg-slate-900">
            <div className="grid grid-cols-2 gap-2 p-3">
              {NAV_LINKS.map((link) => (
                <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className={`rounded-2xl px-4 py-3 text-left font-display text-sm font-black transition-colors ${activeSection === link.id ? "bg-yellow-200 text-slate-950" : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"}`}>
                  {link[language]}
                </button>
              ))}
            </div>
            <div className="flex gap-3 border-t-[3px] border-slate-900 p-3 dark:border-white sm:hidden">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="social-button"><FaGithub className="h-5 w-5" /></a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-button"><FaLinkedin className="h-5 w-5" /></a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section id="hero" className="mx-auto max-w-6xl scroll-mt-32 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-screen lg:pb-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-[3px] border-slate-900 bg-green-200 px-4 py-2 font-display text-xs font-black uppercase tracking-[0.12em] text-slate-900 shadow-[4px_4px_0_#0f172a] dark:border-white">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                  {language === "en" ? "open to remote work" : "متاح للشغل عن بُعد"}
                </div>

                <div className="relative inline-block">
                  <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-7xl">
                    Youssef
                    <br />
                    <span className="relative inline-block">
                      Yasser
                      <span className="absolute -bottom-2 left-0 right-0 h-4 -skew-x-12 rounded-full bg-yellow-300/80 sm:h-5" />
                    </span>
                  </h1>
                  <span className="absolute -right-6 -top-5 hidden rotate-12 rounded-2xl border-[3px] border-slate-900 bg-pink-300 px-3 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a] dark:border-white sm:block">HELLO!</span>
                </div>

                <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                  {language === "en"
                    ? "Backend-first Fullstack Developer studying Computer Science at Menoufia University. I design the systems under the hood — then build the interface on top."
                    : "Fullstack Developer بتركيز Backend، بدرس علوم حاسب في جامعة المنوفية. ببني الأنظمة من الداخل وبعدها بطلع الواجهة فوقها."}
                </p>

                <div className="mt-5 flex items-center gap-2 font-display text-sm font-bold text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  Giza, Egypt
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => scrollTo("projects")} className="comic-main-button bg-yellow-300">
                    {language === "en" ? "View Projects" : "شوف المشاريع"}
                    <ArrowDown className="h-5 w-5" />
                  </button>

                  <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="comic-main-button bg-white dark:bg-slate-900 dark:text-white">
                    {language === "en" ? "View CV" : "عرض الـCV"}
                    <Eye className="h-5 w-5" />
                  </a>

                  <a href={CV_PATH} download="Youssef-Yasser-CV.pdf" className="comic-main-button bg-green-200">
                    {language === "en" ? "Download CV" : "تحميل الـCV"}
                    <Download className="h-5 w-5" />
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hello Youssef - Portfolio")}`} className="hero-badge bg-blue-100 hover:-translate-y-0.5">
                    <Mail className="h-4 w-4" />
                    {language === "en" ? "Email me" : "ابعتلي Email"}
                  </a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hero-badge bg-pink-100 hover:-translate-y-0.5">
                    <FaLinkedin className="h-4 w-4" />
                    {language === "en" ? "Message on LinkedIn" : "كلمني على LinkedIn"}
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="hero-badge bg-purple-100"><span>⚙️</span>{language === "en" ? "Backend-first" : "Backend-first"}</div>
                  <div className="hero-badge bg-yellow-100"><span>🧠</span>{language === "en" ? "AI Integrations" : "AI Integrations"}</div>
                  <div className="hero-badge bg-green-100"><span>🚀</span>{language === "en" ? "Production-minded" : "Production-minded"}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-7">
                <CartoonCharacter />
                <TerminalIntro language={language} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-[28px] border-[3px] border-slate-900 bg-white shadow-[8px_8px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:shadow-[8px_8px_0_rgba(255,255,255,0.08)] sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div key={stat.label.en} className={`stat-card ${index !== STATS.length - 1 ? "border-b-[3px] border-slate-900 sm:border-b-0 sm:border-r-[3px] dark:border-white" : ""} ${index === 1 ? "bg-blue-50 dark:bg-blue-950/40" : index === 2 ? "bg-pink-50 dark:bg-pink-950/40" : index === 3 ? "bg-purple-50 dark:bg-purple-950/40" : "bg-green-50 dark:bg-green-950/40"}`}>
                  <div className="font-display text-4xl font-black text-slate-950 dark:text-white">{stat.value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{stat[language]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="about" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8">
          <Reveal><SectionTitle number="01" title={sectionTitles.about} emoji="👋" /></Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
            <Reveal delay={100}>
              <div className="comic-card p-7 sm:p-9">
                <div className="absolute -right-4 -top-5 rotate-[-7deg] rounded-xl border-[3px] border-slate-900 bg-pink-300 px-3 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a] dark:border-white">ABOUT ME</div>
                <div className="space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                  <p>
                    {language === "en"
                      ? "Junior Full Stack Web Developer focused on building real applications with strong backend logic, solid database design, and practical user interfaces. My strongest area is backend architecture, but I like owning the full path from API to UI."
                      : "Junior Full Stack Web Developer بتركيز قوي على بناء تطبيقات حقيقية فيها Backend منظم، Database Design كويس وواجهة عملية. أقوى جزء عندي هو الـBackend، لكن بحب أمسك الرحلة كاملة من الـAPI لحد الـUI."}
                  </p>
                  <p>
                    {language === "en" ? "Right now I'm building " : "حاليًا ببني "}
                    <span className="rounded-lg bg-yellow-200 px-2 py-1 font-bold text-slate-900">ذاكر صح</span>
                    {language === "en" ? ", an EdTech SaaS platform connecting students with learning centers across Egypt." : "، منصة EdTech SaaS بتربط الطلاب بالمراكز التعليمية والمدرسين."}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="space-y-4">
                <InfoCard icon={GraduationCap} label={language === "en" ? "Education" : "التعليم"} value={language === "en" ? "B.Sc. Computer Science, Menoufia University · 2023–2027" : "بكالوريوس علوم حاسب، جامعة المنوفية · 2023–2027"} />
                <InfoCard icon={Terminal} label={language === "en" ? "Focus" : "التركيز"} value="Backend-first Fullstack Development" />
                <InfoCard icon={Briefcase} label={language === "en" ? "Current Goal" : "الهدف الحالي"} value={language === "en" ? "Building production-grade backend-heavy systems." : "بناء أنظمة قوية Production مع تركيز على الـBackend."} />
                <div className="comic-mini-card flex flex-wrap gap-3">
                  <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="mini-action"><FileText className="h-4 w-4" />{language === "en" ? "View CV" : "عرض CV"}</a>
                  <a href={CV_PATH} download="Youssef-Yasser-CV.pdf" className="mini-action"><Download className="h-4 w-4" />{language === "en" ? "Download" : "تحميل"}</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8">
          <Reveal><SectionTitle number="02" title={sectionTitles.skills} emoji="🧰" /></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => <Reveal key={group.label.en} delay={index * 70}><SkillCard group={group} language={language} /></Reveal>)}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8">
          <Reveal><SectionTitle number="03" title={sectionTitles.projects} emoji="🚀" /></Reveal>
          <div className="space-y-8">
            {PROJECTS.map((project, index) => <Reveal key={project.name.en} delay={index * 100}><ProjectCard project={project} language={language} /></Reveal>)}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8">
          <Reveal><SectionTitle number="04" title={sectionTitles.experience} emoji="💼" /></Reveal>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[34px] border-[4px] border-slate-900 bg-blue-100 p-7 shadow-[10px_10px_0_#0f172a] dark:border-white dark:bg-blue-950/50 dark:shadow-[10px_10px_0_rgba(255,255,255,0.08)] sm:p-10">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[4px] border-slate-900 bg-yellow-300 dark:border-white" />
              <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full border-[4px] border-slate-900 bg-pink-300 dark:border-white" />
              <div className="relative z-10 flex gap-5">
                <div className="relative flex flex-col items-center pt-2">
                  <span className="h-6 w-6 rounded-full border-[4px] border-slate-900 bg-green-400 shadow-[3px_3px_0_#0f172a] dark:border-white" />
                  <span className="mt-2 w-[4px] flex-1 rounded-full bg-slate-900/20 dark:bg-white/15" />
                </div>
                <div>
                  <div className="mb-2 inline-flex rounded-full border-[2px] border-slate-900 bg-white px-3 py-1 font-display text-xs font-black shadow-[3px_3px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:text-white">Gulf of Suez Petroleum Company</div>
                  <h3 className="font-display text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">IT Intern — GUPCO</h3>
                  <p className="mt-2 font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">Egypt</p>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                    {language === "en"
                      ? "Selected for an IT internship at a major petroleum enterprise, working across backend development, database architecture, and enterprise infrastructure workflows."
                      : "تم اختياري لتدريب IT في شركة بترول كبيرة، مع exposure على Backend Development وDatabase Architecture وEnterprise Infrastructure workflows."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-24 sm:px-8">
          <Reveal><SectionTitle number="05" title={sectionTitles.contact} emoji="📬" /></Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal delay={100}>
              <div className="comic-card p-7 sm:p-9">
                <div className="mb-6 inline-flex rotate-[-3deg] rounded-xl border-[3px] border-slate-900 bg-green-300 px-4 py-2 font-display text-xs font-black shadow-[4px_4px_0_#0f172a] dark:border-white">LET&apos;S BUILD</div>
                <h3 className="max-w-xl font-display text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                  {language === "en" ? "Let's build something that runs in production." : "تعالى نبني حاجة شغالة فعلًا في Production."}
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {language === "en" ? "Open to remote roles and internships. If you have a backend-heavy problem — or just want to talk system design — my inbox is open." : "متاح لفرص Remote وInternships. لو عندك مشكلة Backend أو حابب نتكلم في System Design، ابعتلي."}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hello Youssef - Portfolio")}`} className="contact-action bg-blue-100">
                    <Mail className="h-5 w-5" />
                    {language === "en" ? "Send me an Email" : "ابعتلي Email"}
                  </a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-action bg-pink-100">
                    <FaLinkedin className="h-5 w-5" />
                    {language === "en" ? "Message on LinkedIn" : "كلمني على LinkedIn"}
                  </a>
                  <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="contact-action bg-yellow-100">
                    <Eye className="h-5 w-5" />
                    {language === "en" ? "View CV" : "شوف الـCV"}
                  </a>
                  <a href={CV_PATH} download="Youssef-Yasser-CV.pdf" className="contact-action bg-green-100">
                    <Download className="h-5 w-5" />
                    {language === "en" ? "Download CV" : "حمّل الـCV"}
                  </a>
                </div>

                <div className="mt-7 space-y-3">
                  <button type="button" onClick={copyEmail} className="contact-link">
                    <Mail className="h-5 w-5" />
                    {EMAIL}
                    {copied ? <Check className="ml-auto h-5 w-5 text-green-500" /> : <Copy className="ml-auto h-5 w-5 opacity-40" />}
                  </button>
                  <a href={`tel:${PHONE.replaceAll(" ", "")}`} className="contact-link"><Phone className="h-5 w-5" />{PHONE}</a>
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="contact-link"><FaGithub className="h-5 w-5" />github.com/Youssefsea</a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-link"><FaLinkedin className="h-5 w-5" />linkedin.com/in/youssef-yasser</a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}><ContactCard language={language} /></Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-5 pb-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[28px] border-[3px] border-slate-900 bg-white px-6 py-5 font-mono text-xs text-slate-500 shadow-[6px_6px_0_#0f172a] dark:border-white dark:bg-slate-900 dark:text-slate-400 dark:shadow-[6px_6px_0_rgba(255,255,255,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Youssef Yasser. Built with Next.js.</span>
          <span className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-200"><span className="h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400 dark:border-white" />status: available</span>
        </div>
      </footer>

      {showTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-slate-900 bg-yellow-300 text-slate-950 shadow-[5px_5px_0_#0f172a] transition-transform hover:-translate-y-1 hover:rotate-3 dark:border-white" aria-label="Back to top">
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
