"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
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

const PortfolioWorld = dynamic(() => import("../components/PortfolioWorld"), {
  ssr: false,
  loading: () => <div className="world-loading" aria-hidden="true" />,
});

const PROJECTS = [
  {
    number: "01",
    nameAr: "ذاكر صح",
    name: "EdTech SaaS Platform",
    type: "EDTECH / SAAS",
    description:
      "A multi-role education platform connecting students with nearby learning centers and tutors across Egypt.",
    highlights: [
      "Student, Center Admin and Teacher dashboards",
      "Geolocation discovery with OpenStreetMap",
      "Paid-content access and booking conflict detection",
      "Super Admin analytics and platform controls",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Redis"],
    link: "https://center-saas-front-83p8.vercel.app/",
    tone: "green",
  },
  {
    number: "02",
    nameAr: "أكلي",
    name: "Food Delivery Platform",
    type: "REALTIME / GEO",
    description:
      "A dual-sided delivery platform built around location-aware pricing, live ordering and vendor operations.",
    highlights: [
      "GPS + Haversine delivery-distance calculation",
      "Multi-restaurant smart cart",
      "Payment-proof workflow for Vodafone Cash / InstaPay",
      "Live order chat and vendor analytics",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Socket.IO"],
    link: "https://food-front-rho.vercel.app/",
    tone: "orange",
  },
  {
    number: "03",
    nameAr: "WealthWise AI",
    name: "Smart Financial Wallet",
    type: "AI / FINTECH",
    description:
      "An Arabic-first wallet that turns typed or spoken spending into categorized transactions and budget insights.",
    highlights: [
      "Gemini-powered Arabic transaction parsing",
      "SERIALIZABLE transactions + Redis locking",
      "Idempotency keys on money-moving endpoints",
      "Arabic voice input with Web Speech API",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Gemini"],
    link: "https://wallet-wep-react.vercel.app/",
    tone: "purple",
  },
];

const SKILLS = [
  {
    title: "Frontend",
    icon: Code2,
    body: "React, Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, RTL UI.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    icon: Server,
    body: "Node.js, Express, REST APIs, MVC architecture, JWT, HTTP-only cookies.",
    tags: ["Node.js", "Express", "REST"],
  },
  {
    title: "Data",
    icon: Database,
    body: "PostgreSQL, MySQL, Redis locking, schema design, transactions and geospatial queries.",
    tags: ["Postgres", "Redis", "SQL"],
  },
  {
    title: "AI + Integrations",
    icon: Sparkles,
    body: "Gemini API, Arabic NLP, Web Speech API, Leaflet and practical AI product integrations.",
    tags: ["Gemini", "NLP", "Integrations"],
  },
  {
    title: "Cloud + DevOps",
    icon: Cpu,
    body: "Git, GitHub, Docker, AWS basics, Postman and Cloudinary for production workflows.",
    tags: ["Docker", "AWS", "Postman"],
  },
  {
    title: "Architecture",
    icon: Layers,
    body: "Backend-first thinking: auth, concurrency, idempotency, caching, APIs and data integrity.",
    tags: ["ACID", "Caching", "API Design"],
  },
];

const EXPERIENCE = [
  {
    year: "2026",
    role: "IT Intern",
    company: "Gulf of Suez Petroleum Company",
    description:
      "Selected for an IT internship, working around software, databases and enterprise technology workflows.",
  },
];

const NAV = [
  ["about", "ABOUT"],
  ["skills", "STACK"],
  ["projects", "WORK"],
  ["experience", "EXPERIENCE"],
  ["contact", "CONTACT"],
] as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useWorldGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = "connection" in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

    if (reduced || saveData) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const delay = mobile ? 900 : 450;
    const timer = window.setTimeout(() => setEnabled(true), delay);
    return () => window.clearTimeout(timer);
  }, []);

  return enabled;
}

function SplitText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={className} aria-label={children}>
      {children.split(" ").map((word, index) => (
        <span className="split-word" key={`${word}-${index}`}>
          {word}
          {index < children.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title, number }: { kicker: string; title: string; number: string }) {
  return (
    <div className="section-heading">
      <span className="section-kicker">{number} / {kicker}</span>
      <h2>
        <SplitText>{title}</SplitText>
      </h2>
    </div>
  );
}

function ArchitectureStrip() {
  return (
    <div className="architecture-strip">
      <div className="architecture-label">FULLSTACK LOOP</div>
      <div className="architecture-flow">
        <span>UI</span>
        <ArrowRight />
        <span>API</span>
        <ArrowRight />
        <span>DB</span>
        <ArrowRight />
        <span>AI</span>
      </div>
      <div className="architecture-status"><span /> ONLINE</div>
    </div>
  );
}

function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const current = PROJECTS[index];

  const next = () => setIndex((value) => (value + 1) % PROJECTS.length);
  const prev = () => setIndex((value) => (value - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <div className="project-system">
      <div className="project-topbar">
        <div>
          <span className="muted-label">SELECTED SYSTEM</span>
          <strong>{current.type}</strong>
        </div>
        <div className="project-controls">
          <button onClick={prev} aria-label="Previous project"><ChevronLeft /></button>
          <span>{current.number} / 0{PROJECTS.length}</span>
          <button onClick={next} aria-label="Next project"><ChevronRight /></button>
        </div>
      </div>

      <div className="project-main">
        <div className={`project-orb orb-${current.tone}`}>
          <div className="orb-grid" />
          <div className="orb-core" />
          <span>{current.number}</span>
        </div>

        <div className="project-copy">
          <div className="project-name-row">
            <span>{current.nameAr}</span>
            <a href={current.link} target="_blank" rel="noopener noreferrer">
              LIVE DEMO <ExternalLink />
            </a>
          </div>
          <h3>{current.name}</h3>
          <p>{current.description}</p>

          <div className="project-highlights">
            {current.highlights.map((item) => (
              <div key={item}>
                <Check />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="project-stack">
            {current.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>

      <div className="project-dots">
        {PROJECTS.map((project, projectIndex) => (
          <button
            key={project.name}
            className={projectIndex === index ? "active" : ""}
            aria-label={`Go to project ${projectIndex + 1}`}
            onClick={() => setIndex(projectIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function ContactData() {
  const [copied, setCopied] = useState(false);
  const email = "youssefsea274@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard is not guaranteed in every browser context.
    }
  };

  return (
    <div className="contact-panel">
      <div className="contact-json">
        <span>{`{`}</span>
        <span className="indent">&quot;name&quot;: &quot;Youssef Yasser&quot;,</span>
        <span className="indent">&quot;role&quot;: &quot;Backend-First Fullstack Developer&quot;,</span>
        <span className="indent">&quot;location&quot;: &quot;Giza, Egypt&quot;,</span>
        <span className="indent">&quot;status&quot;: &quot;open_to_work&quot;</span>
        <span>{`}`}</span>
      </div>

      <div className="contact-links">
        <button onClick={copyEmail}>
          <Mail />
          <span>{email}</span>
          {copied ? <Check className="push" /> : <Copy className="push" />}
        </button>
        <a href="tel:+201104699278"><Phone /><span>+20 110 469 9278</span></a>
        <a href="https://github.com/Youssefsea" target="_blank" rel="noopener noreferrer"><FaGithub /><span>github.com/Youssefsea</span></a>
        <a href="https://www.linkedin.com/in/youssef-yasser-97aa742b0" target="_blank" rel="noopener noreferrer"><FaLinkedin /><span>linkedin.com/in/youssef-yasser</span></a>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const reducedMotion = useReducedMotion();
  const worldEnabled = useWorldGate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!cursorRef.current || !cursorRingRef.current) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRingRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setScrollProgress((window.scrollY / max) * 100);
      setShowTop(window.scrollY > 700);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = ["hero", ...NAV.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.05, 0.2, 0.45, 0.7] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const sectionLabel = useMemo(() => {
    const labels: Record<string, string> = {
      hero: "SPAWN POINT",
      about: "IDENTITY",
      skills: "STACK LOADOUT",
      projects: "PROJECT SYSTEMS",
      experience: "FIELD LOG",
      contact: "EXIT TERMINAL",
    };
    return labels[activeSection] ?? "SPAWN POINT";
  }, [activeSection]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="portfolio-root">
      <style jsx global>{`
        :root { color-scheme: dark; }
        html { scroll-behavior: smooth; background: #070b13; }
        body { margin: 0; background: #070b13; color: #eef4ff; }
        * { box-sizing: border-box; }
        ::selection { background: #7ea3ff; color: #08101c; }

        .portfolio-root {
          min-height: 100vh;
          overflow-x: clip;
          background:
            radial-gradient(circle at 50% -10%, rgba(79,124,255,.18), transparent 34%),
            radial-gradient(circle at 90% 38%, rgba(132,90,255,.11), transparent 28%),
            linear-gradient(180deg, #070b13 0%, #0a101a 38%, #070c14 100%);
          position: relative;
        }

        .portfolio-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: .25;
          background-image:
            linear-gradient(rgba(120,145,190,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,145,190,.055) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .scroll-progress { position: fixed; inset: 0 0 auto; height: 2px; z-index: 100; background: rgba(255,255,255,.06); }
        .scroll-progress > div { height: 100%; background: linear-gradient(90deg,#6d8dff,#7ce1c0,#ffd67a); box-shadow: 0 0 18px rgba(110,150,255,.7); }

        .site-nav {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          z-index: 80;
          padding: 18px 22px;
          pointer-events: none;
        }
        .nav-inner {
          pointer-events: auto;
          max-width: 1220px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 18px;
          background: rgba(7,11,19,.72);
          border: 1px solid rgba(170,195,255,.15);
          border-radius: 999px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 50px rgba(0,0,0,.28);
        }
        .brand { font: 800 15px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: -.02em; color: white; text-decoration: none; }
        .brand span { color: #79a2ff; }
        .nav-links { display: flex; align-items: center; gap: 26px; }
        .nav-links button, .nav-social a { color: #9ba7bf; background: none; border: 0; font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .16em; cursor: pointer; transition: color .25s ease, transform .25s ease; }
        .nav-links button:hover, .nav-links .active { color: #ffffff; transform: translateY(-1px); }
        .nav-social { display: flex; gap: 10px; }
        .nav-social a { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid rgba(170,195,255,.12); border-radius: 50%; }
        .nav-social svg { width: 15px; height: 15px; }
        .menu-btn { display: none; }

        .world-shell { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
        .portfolio-world { position: absolute; inset: 0; pointer-events: none; }
        .portfolio-world-canvas { width: 100%; height: 100%; display: block; opacity: .94; }
        .world-loading {
          position: absolute; right: 7vw; top: 38%; width: min(28vw,320px); height: min(28vw,320px); border-radius: 50%;
          background: radial-gradient(circle, rgba(82,121,255,.14), transparent 62%);
          filter: blur(10px);
        }
        .world-hud {
          position: fixed; z-index: 8; left: 26px; bottom: 24px;
          padding: 12px 14px; border: 1px solid rgba(178,202,255,.14); background: rgba(8,13,23,.54); backdrop-filter: blur(14px);
          font: 700 9px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .16em; color: #9aa9c6;
          border-radius: 12px; box-shadow: 0 14px 30px rgba(0,0,0,.18);
        }
        .world-hud strong { display: block; margin-top: 4px; color: #f2f6ff; font-size: 11px; }
        .world-hud span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #72e1b4; margin-right: 6px; box-shadow: 0 0 10px #72e1b4; }

        main { position: relative; z-index: 4; }
        .section-shell { width: min(1220px, calc(100% - 44px)); margin: 0 auto; }
        .hero { min-height: 100svh; display: grid; align-items: end; padding: 150px 0 110px; position: relative; }
        .hero-copy { max-width: 760px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .18em; color: #91a0bb; text-transform: uppercase; }
        .eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: #72d7b2; box-shadow: 0 0 14px rgba(114,215,178,.8); }
        .hero h1 { margin: 20px 0 18px; font: 900 clamp(4.8rem, 11vw, 10rem)/.82 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: -.075em; color: #f5f8ff; max-width: 900px; }
        .hero h1 .muted { color: #6d7891; }
        .hero p { margin: 0; max-width: 720px; font: 500 clamp(16px, 2vw, 22px)/1.65 Inter, ui-sans-serif, system-ui, sans-serif; color: #aeb9cc; }
        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
        .primary-cta, .ghost-cta { min-height: 48px; padding: 0 18px; border-radius: 12px; display: inline-flex; align-items: center; gap: 10px; font: 800 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .14em; text-decoration: none; cursor: pointer; }
        .primary-cta { border: 1px solid #7ea3ff; background: #7ea3ff; color: #07101d; box-shadow: 0 12px 30px rgba(84,121,255,.22); }
        .ghost-cta { border: 1px solid rgba(177,198,246,.17); background: rgba(255,255,255,.025); color: #eef4ff; }
        .primary-cta svg, .ghost-cta svg { width: 15px; height: 15px; }
        .hero-meta { display: flex; flex-wrap: wrap; gap: 8px 14px; margin-top: 28px; font: 700 9px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .1em; color: #758199; }
        .hero-meta span { display: inline-flex; align-items: center; gap: 6px; }
        .hero-meta svg { width: 13px; height: 13px; }
        .scroll-cue { position: absolute; right: 0; bottom: 38px; font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .2em; color: #63708a; display: flex; align-items: center; gap: 9px; }
        .scroll-cue span { width: 28px; height: 1px; background: #516078; }

        .architecture-strip { margin-top: 70px; display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center; padding: 16px 18px; border: 1px solid rgba(172,195,250,.13); background: rgba(12,18,30,.5); border-radius: 16px; backdrop-filter: blur(12px); }
        .architecture-label, .architecture-status, .muted-label, .section-kicker { font: 700 8px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .16em; color: #74819a; }
        .architecture-flow { display: flex; align-items: center; justify-content: center; gap: 12px; font: 800 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: #e8effd; }
        .architecture-flow span { padding: 9px 11px; border: 1px solid rgba(144,177,255,.16); border-radius: 9px; background: rgba(121,161,255,.04); }
        .architecture-flow svg { width: 13px; height: 13px; color: #6687d6; }
        .architecture-status { color: #79d6b1; white-space: nowrap; }
        .architecture-status span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #79d6b1; margin-right: 6px; box-shadow: 0 0 10px rgba(121,214,177,.6); }

        .section { padding: 150px 0; }
        .section-heading { margin-bottom: 50px; }
        .section-heading h2 { margin: 12px 0 0; font: 900 clamp(3.2rem, 7vw, 7rem)/.88 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: -.06em; color: #f2f5fb; }
        .split-word { display: inline-block; }
        .reveal .split-word { transform: translateY(26px); opacity: 0; transition: transform .75s cubic-bezier(.18,.85,.18,1), opacity .75s ease; }
        .reveal.is-visible .split-word { transform: translateY(0); opacity: 1; }
        .reveal.is-visible .split-word:nth-child(2) { transition-delay: .03s; }
        .reveal.is-visible .split-word:nth-child(3) { transition-delay: .06s; }
        .reveal.is-visible .split-word:nth-child(4) { transition-delay: .09s; }
        .reveal.is-visible .split-word:nth-child(5) { transition-delay: .12s; }

        .about-grid { display: grid; grid-template-columns: 1.3fr .7fr; gap: 80px; align-items: start; }
        .about-lead { font: 600 clamp(23px, 3.2vw, 42px)/1.16 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: -.035em; color: #eaf0fb; max-width: 850px; }
        .about-copy { margin-top: 28px; max-width: 760px; font: 500 16px/1.9 Inter, ui-sans-serif, system-ui, sans-serif; color: #8794ab; }
        .data-box { border: 1px solid rgba(170,193,246,.13); border-radius: 18px; background: rgba(14,21,34,.66); overflow: hidden; box-shadow: 0 22px 60px rgba(0,0,0,.15); }
        .data-box-top { display:flex; align-items:center; justify-content:space-between; padding: 12px 14px; border-bottom: 1px solid rgba(170,193,246,.1); font: 700 8px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .16em; color: #68758e; }
        .data-box-body { padding: 20px; display: grid; gap: 14px; }
        .data-row { display:flex; justify-content:space-between; gap:16px; align-items: baseline; font: 700 10px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
        .data-row span:first-child { color:#65728a; text-transform:uppercase; letter-spacing:.13em; }
        .data-row span:last-child { color:#dce5f7; text-align:right; }

        .skill-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:14px; }
        .skill-card { padding: 24px; min-height: 230px; border:1px solid rgba(170,193,246,.11); border-radius: 18px; background: linear-gradient(180deg, rgba(19,28,44,.84), rgba(11,17,28,.78)); position:relative; overflow:hidden; }
        .skill-card::after { content:""; position:absolute; inset:auto -30% -65% 35%; height:140px; background:radial-gradient(circle, rgba(103,144,255,.16), transparent 70%); pointer-events:none; }
        .skill-icon { width: 42px; height:42px; display:grid; place-items:center; border:1px solid rgba(155,187,255,.14); border-radius:12px; background: rgba(106,148,255,.06); color:#89aaff; }
        .skill-icon svg { width:19px; height:19px; }
        .skill-card h3 { margin: 18px 0 10px; font:800 20px/1 Inter, ui-sans-serif, system-ui,sans-serif; letter-spacing:-.03em; }
        .skill-card p { margin:0; font:500 13px/1.75 Inter, ui-sans-serif,system-ui,sans-serif; color:#8c98ad; }
        .skill-tags { display:flex; flex-wrap:wrap; gap:7px; margin-top:18px; }
        .skill-tags span { padding:6px 8px; border:1px solid rgba(149,180,246,.1); border-radius:7px; font:700 8px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:.08em; color:#aebbd0; }

        .project-system { border:1px solid rgba(170,193,246,.13); border-radius: 24px; overflow:hidden; background:rgba(11,16,27,.82); box-shadow:0 32px 80px rgba(0,0,0,.18); }
        .project-topbar { display:flex; align-items:center; justify-content:space-between; gap:20px; padding: 16px 20px; border-bottom:1px solid rgba(170,193,246,.1); }
        .project-topbar strong { display:block; margin-top:5px; font:800 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:.08em; color:#edf2fb; }
        .project-controls { display:flex; align-items:center; gap:10px; font:700 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color:#67748b; }
        .project-controls button { width:34px; height:34px; display:grid; place-items:center; border:1px solid rgba(170,193,246,.12); border-radius:10px; background:rgba(255,255,255,.02); color:#d7e0f1; cursor:pointer; }
        .project-controls svg { width:15px; height:15px; }
        .project-main { display:grid; grid-template-columns: .75fr 1.25fr; gap: 40px; padding: 46px; align-items:center; }
        .project-orb { width:min(28vw, 310px); aspect-ratio:1; justify-self:center; border-radius:50%; display:grid; place-items:center; position:relative; overflow:hidden; border:1px solid rgba(180,200,250,.1); background:radial-gradient(circle at 50% 45%, rgba(120,160,255,.1), rgba(10,14,24,.9) 62%); box-shadow:inset 0 0 80px rgba(90,130,250,.06), 0 0 60px rgba(90,130,250,.07); }
        .orb-orange { box-shadow: inset 0 0 80px rgba(255,180,93,.07), 0 0 60px rgba(255,180,93,.05); }
        .orb-purple { box-shadow: inset 0 0 80px rgba(160,110,255,.07), 0 0 60px rgba(160,110,255,.05); }
        .orb-green { box-shadow: inset 0 0 80px rgba(80,220,170,.07), 0 0 60px rgba(80,220,170,.05); }
        .orb-grid { position:absolute; inset:-25%; border-radius:50%; background:linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size:26px 26px; transform:perspective(220px) rotateX(58deg) translateY(20px); }
        .orb-core { width:38%; aspect-ratio:1; border-radius:34%; background:linear-gradient(145deg, rgba(122,162,255,.3), rgba(255,255,255,.03)); border:1px solid rgba(175,200,255,.15); box-shadow:0 0 70px rgba(102,143,255,.16); transform:rotate(45deg); }
        .project-orb span { position:absolute; bottom:17%; right:17%; font:800 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color:#7e90af; }
        .project-name-row { display:flex; justify-content:space-between; gap:20px; align-items:center; }
        .project-name-row > span { font:700 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color:#8d9ab1; letter-spacing:.15em; }
        .project-name-row a { display:inline-flex; align-items:center; gap:6px; color:#a8c0ff; text-decoration:none; font:800 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:.12em; }
        .project-name-row a svg { width:12px; height:12px; }
        .project-copy h3 { margin: 14px 0 12px; font:900 clamp(2.3rem,4.5vw,4.5rem)/.95 Inter, ui-sans-serif,system-ui,sans-serif; letter-spacing:-.055em; }
        .project-copy > p { margin:0; max-width:650px; font:500 15px/1.8 Inter,ui-sans-serif,system-ui,sans-serif; color:#8d99ae; }
        .project-highlights { display:grid; gap:11px; margin-top:25px; }
        .project-highlights > div { display:flex; gap:10px; align-items:flex-start; font:500 12px/1.55 Inter,ui-sans-serif,system-ui,sans-serif; color:#9faac0; }
        .project-highlights svg { width:14px; height:14px; color:#6fd1ad; flex:none; margin-top:2px; }
        .project-stack { display:flex; flex-wrap:wrap; gap:7px; margin-top:25px; }
        .project-stack span { padding:7px 9px; border:1px solid rgba(160,187,246,.1); border-radius:7px; font:700 8px/1 ui-monospace,SFMono-Regular,Menlo,monospace; color:#8491a8; }
        .project-dots { display:flex; justify-content:center; gap:7px; padding: 0 0 22px; }
        .project-dots button { width:32px; height:3px; border:0; border-radius:999px; background:#263146; cursor:pointer; }
        .project-dots button.active { background:#7ea3ff; }

        .experience-layout { display:grid; grid-template-columns: 170px 1fr; gap:50px; }
        .experience-index { font:800 9px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace; color:#6f7c95; letter-spacing:.14em; }
        .experience-track { display:grid; gap:12px; }
        .experience-item { display:grid; grid-template-columns:110px 1fr; gap:20px; padding:22px 0; border-top:1px solid rgba(170,193,246,.1); }
        .experience-year { color:#7891c6; font:800 9px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.1em; }
        .experience-item h3 { margin:0; font:800 24px/1.1 Inter,ui-sans-serif,system-ui,sans-serif; letter-spacing:-.04em; }
        .experience-item h4 { margin:6px 0 12px; color:#7e8ba1; font:700 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; text-transform:uppercase; letter-spacing:.1em; }
        .experience-item p { margin:0; max-width:710px; color:#8d99ae; font:500 14px/1.75 Inter,ui-sans-serif,system-ui,sans-serif; }

        .contact-grid { display:grid; grid-template-columns: .95fr 1.05fr; gap:16px; }
        .contact-panel { border:1px solid rgba(170,193,246,.13); border-radius:20px; overflow:hidden; background:rgba(12,18,30,.74); }
        .contact-json { padding:28px; display:grid; gap:7px; font:700 12px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace; color:#75829b; border-bottom:1px solid rgba(170,193,246,.1); }
        .contact-json .indent { padding-left:22px; color:#bcc8dc; }
        .contact-links { padding:18px; display:grid; gap:9px; }
        .contact-links a, .contact-links button { width:100%; min-height:48px; padding:0 14px; border:1px solid rgba(170,193,246,.09); border-radius:11px; display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.018); color:#dce4f3; text-decoration:none; font:700 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; cursor:pointer; }
        .contact-links svg { width:15px; height:15px; color:#7f9fe9; flex:none; }
        .contact-links .push { margin-left:auto; }
        .contact-hero { border:1px solid rgba(170,193,246,.13); border-radius:20px; min-height:100%; padding:32px; background:radial-gradient(circle at 85% 20%, rgba(110,150,255,.1), transparent 35%), rgba(12,18,30,.64); display:flex; flex-direction:column; justify-content:space-between; }
        .contact-hero h3 { margin:0; max-width:700px; font:900 clamp(3rem,6vw,6.6rem)/.88 Inter,ui-sans-serif,system-ui,sans-serif; letter-spacing:-.065em; }
        .contact-hero p { max-width:640px; margin:24px 0 0; color:#8997af; font:500 15px/1.8 Inter,ui-sans-serif,system-ui,sans-serif; }
        .contact-hero-bottom { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; margin-top:40px; }
        .availability { display:inline-flex; align-items:center; gap:8px; color:#77d7b1; font:800 9px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.14em; }
        .availability span { width:7px; height:7px; border-radius:50%; background:#77d7b1; box-shadow:0 0 10px rgba(119,215,177,.65); }
        .download-link { display:inline-flex; align-items:center; gap:8px; color:#b7c5df; text-decoration:none; font:800 9px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.14em; }
        .download-link svg { width:14px; height:14px; }

        footer { position:relative; z-index:5; padding: 0 0 35px; }
        .footer-inner { width:min(1220px,calc(100% - 44px)); margin:0 auto; display:flex; justify-content:space-between; gap:20px; padding-top:20px; border-top:1px solid rgba(170,193,246,.09); color:#59667c; font:700 8px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.12em; text-transform:uppercase; }

        .top-btn { position:fixed; right:20px; bottom:20px; width:46px; height:46px; z-index:60; display:grid; place-items:center; border:1px solid rgba(170,193,246,.14); border-radius:50%; background:rgba(9,14,24,.75); color:#e4ebf9; backdrop-filter:blur(14px); cursor:pointer; }
        .top-btn svg { width:17px; height:17px; }
        .custom-cursor, .custom-cursor-ring { position:fixed; top:0; left:0; pointer-events:none; z-index:200; border-radius:50%; transform:translate3d(-100px,-100px,0); transition: opacity .25s ease, width .2s ease, height .2s ease; }
        .custom-cursor { width:6px; height:6px; margin:-3px; background:#eef4ff; box-shadow:0 0 20px rgba(126,163,255,.8); }
        .custom-cursor-ring { width:34px; height:34px; margin:-17px; border:1px solid rgba(145,172,234,.55); }

        @media (max-width: 980px) {
          .nav-links { gap:16px; }
          .nav-social { display:none; }
          .about-grid, .contact-grid { grid-template-columns:1fr; }
          .skill-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .project-main { grid-template-columns:1fr; padding:32px; }
          .project-orb { width:min(48vw,290px); }
          .experience-layout { grid-template-columns:1fr; gap:24px; }
        }

        @media (max-width: 760px) {
          .site-nav { padding:12px 12px; }
          .nav-inner { height:58px; padding:0 14px; }
          .nav-links { display:none; position:absolute; top:68px; left:12px; right:12px; padding:10px; border-radius:18px; background:rgba(7,11,19,.96); border:1px solid rgba(170,193,246,.13); box-shadow:0 18px 50px rgba(0,0,0,.35); }
          .nav-links.open { display:grid; }
          .nav-links button { padding:12px 10px; text-align:left; }
          .menu-btn { display:grid; place-items:center; width:38px; height:38px; border:1px solid rgba(170,193,246,.12); border-radius:11px; background:transparent; color:#dce5f6; }
          .menu-btn svg { width:17px; height:17px; }
          .section-shell, .footer-inner { width:min(100% - 28px, 1220px); }
          .hero { padding:132px 0 72px; min-height:100svh; }
          .hero h1 { font-size: clamp(4.4rem, 19vw, 7rem); }
          .hero p { font-size:16px; max-width:620px; }
          .hero-copy { position:relative; z-index:3; }
          .architecture-strip { grid-template-columns:1fr; gap:12px; margin-top:42px; padding:14px; }
          .architecture-flow { justify-content:flex-start; overflow:auto; padding-bottom:2px; }
          .architecture-status { display:none; }
          .section { padding:108px 0; }
          .section-heading { margin-bottom:34px; }
          .section-heading h2 { font-size: clamp(3rem, 13vw, 5.5rem); }
          .about-lead { font-size:27px; }
          .about-copy { font-size:14px; }
          .skill-grid { grid-template-columns:1fr; }
          .skill-card { min-height:200px; }
          .project-main { padding:20px; gap:28px; }
          .project-orb { width:min(66vw,250px); }
          .project-copy h3 { font-size: clamp(2.3rem, 11vw, 4rem); }
          .project-name-row { align-items:flex-start; flex-direction:column; gap:10px; }
          .experience-item { grid-template-columns:1fr; gap:8px; }
          .contact-hero { min-height:360px; padding:24px; }
          .contact-hero h3 { font-size: clamp(2.7rem, 15vw, 5rem); }
          .world-hud { left:12px; bottom:12px; }
          .scroll-cue { display:none; }
          .custom-cursor, .custom-cursor-ring { display:none; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior:auto; }
          *, *::before, *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
          .portfolio-world-canvas { opacity:.35; }
        }
      `}</style>

      <div className="scroll-progress"><div style={{ width: `${scrollProgress}%` }} /></div>

      <div className="world-shell">
        {worldEnabled && <PortfolioWorld reducedMotion={reducedMotion} />}
      </div>

      <div className="world-hud">
        <span /> WORLD ACTIVE
        <strong>{sectionLabel}</strong>
      </div>

      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorRingRef} className="custom-cursor-ring" />

      <header className="site-nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo("hero")} aria-label="Go to top">
            Y<span>/</span>Y
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={activeSection === id ? "active" : ""}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="nav-social">
            <a href="https://github.com/Youssefsea" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/youssef-yasser-97aa742b0" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="section-shell">
            <div className="hero-copy">
              <div className="eyebrow"><i /> BACKEND-FIRST FULLSTACK DEVELOPER</div>
              <h1>
                <span>Youssef</span>{" "}
                <span className="muted">Yasser.</span>
              </h1>
              <p>
                I build the systems underneath the interface — APIs, databases, auth, realtime flows and AI integrations — then turn them into products people can actually use.
              </p>

              <div className="hero-cta-row">
                <button className="primary-cta" onClick={() => scrollTo("projects")}>EXPLORE WORK <ArrowDown /></button>
                <button className="ghost-cta" onClick={() => scrollTo("contact")}>OPEN CONNECTION <ArrowRight /></button>
              </div>

              <div className="hero-meta">
                <span><MapPin /> GIZA, EGYPT</span>
                <span>•</span>
                <span><GraduationCap /> B.SC. COMPUTER SCIENCE / 2027</span>
                <span>•</span>
                <span>REMOTE / INTERNSHIPS</span>
              </div>

              <ArchitectureStrip />
            </div>

            <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-shell">
            <Reveal>
              <SectionHeading number="01" kicker="ABOUT" title="I build from the inside out." />
            </Reveal>

            <div className="about-grid">
              <Reveal delay={90}>
                <div className="about-lead">
                  Junior Full Stack Web Developer with a backend-first mindset, building practical systems around data integrity, concurrency, authentication and product UX.
                </div>
                <p className="about-copy">
                  I&apos;m studying Computer Science at Menoufia University while shipping projects across education, delivery and personal finance. My favorite part is where clean API design meets a product that feels fast and obvious to use.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="data-box">
                  <div className="data-box-top"><span>PROFILE.SYS</span><span>ONLINE</span></div>
                  <div className="data-box-body">
                    <div className="data-row"><span>Role</span><span>Fullstack / Backend-first</span></div>
                    <div className="data-row"><span>Education</span><span>Menoufia University</span></div>
                    <div className="data-row"><span>Grad</span><span>2027</span></div>
                    <div className="data-row"><span>Location</span><span>Giza, Egypt</span></div>
                    <div className="data-row"><span>Focus</span><span>Production systems</span></div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-shell">
            <Reveal>
              <SectionHeading number="02" kicker="STACK" title="My loadout." />
            </Reveal>

            <div className="skill-grid">
              {SKILLS.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Reveal key={skill.title} delay={index * 50}>
                    <article className="skill-card">
                      <div className="skill-icon"><Icon /></div>
                      <h3>{skill.title}</h3>
                      <p>{skill.body}</p>
                      <div className="skill-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-shell">
            <Reveal>
              <SectionHeading number="03" kicker="WORK" title="Project systems." />
            </Reveal>
            <Reveal delay={100}>
              <ProjectCarousel />
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-shell">
            <Reveal>
              <SectionHeading number="04" kicker="EXPERIENCE" title="Field log." />
            </Reveal>
            <div className="experience-layout">
              <Reveal delay={70}>
                <div className="experience-index">CAREER TRACE<br />2026 → NOW</div>
              </Reveal>
              <div className="experience-track">
                {EXPERIENCE.map((item, index) => (
                  <Reveal key={`${item.company}-${item.year}`} delay={index * 80}>
                    <article className="experience-item">
                      <div className="experience-year">{item.year}</div>
                      <div>
                        <h3>{item.role}</h3>
                        <h4>{item.company}</h4>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-shell">
            <Reveal>
              <SectionHeading number="05" kicker="CONTACT" title="Open connection." />
            </Reveal>

            <div className="contact-grid">
              <Reveal delay={70}>
                <ContactData />
              </Reveal>
              <Reveal delay={130}>
                <div className="contact-hero">
                  <div>
                    <span className="muted-label">FINAL TERMINAL</span>
                    <h3>Let&apos;s build something real.</h3>
                    <p>
                      Open to junior fullstack/backend roles, internships and serious product work. For a backend-heavy problem or a system-design conversation, the terminal is open.
                    </p>
                  </div>
                  <div className="contact-hero-bottom">
                    <span className="availability"><span /> AVAILABLE</span>
                    <a className="download-link" href="mailto:youssefsea274@gmail.com"><Mail /> START A CONVERSATION</a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <span>© 2026 Youssef Yasser — Next.js + Three.js</span>
          <span>Built for the web, not for a template.</span>
        </div>
      </footer>

      {showTop && (
        <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })} aria-label="Back to top">
          <ArrowUp />
        </button>
      )}
    </div>
  );
}
