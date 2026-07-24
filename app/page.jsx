"use client";
import { useState, useEffect, useRef } from 'react';
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
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const TERMINAL_LINES = [
  { prompt: '$', text: 'whoami' },
  { prompt: '>', text: 'Youssef Yasser' },
  { prompt: '$', text: 'my role.txt' },
  { prompt: '>', text: 'Fullstack Developer' },
  { prompt: '$', text: 'status --current' },
  { prompt: '>', text: 'building an EdTech SaaS for Egypt' },
];

const SKILL_GROUPS = [
  { label: 'Backend', icon: Server, items: ['Node.js', 'Express.js', 'REST API Design', 'MVC', 'JWT Auth', 'HTTP-Only Cookies'] },
  { label: 'Databases', icon: Database, items: ['PostgreSQL', 'MySQL', 'Redis (Locking)', 'Schema Design', 'Geospatial Queries', 'pgAdmin'] },
  { label: 'Frontend', icon: Code2, items: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RTL / Arabic UI'] },
  { label: 'AI & Integrations', icon: Sparkles, items: ['Google Gemini API', 'NLP', 'Web Speech API', 'Leaflet.js'] },
  { label: 'Tools & DevOps', icon: Cpu, items: ['Git', 'GitHub', 'Docker', 'AWS Basics', 'Postman', 'Cloudinary'] },
];

const PROJECTS = [
  {
    nameAr: 'ذاكر صح',
    name: 'EdTech SaaS Platform',
    description: 'A comprehensive educational marketplace connecting students across Egypt with nearby learning centers and private tutors — three dashboards, one platform.',
    highlights: [
      'Three dedicated roles: Student, Center Admin, Teacher',
      'Geolocation-based discovery via OpenStreetMap',
      'Token-gated content streaming for paid video/files',
      'Automatic schedule-conflict detection on booking',
      'Super Admin panel with platform-wide analytics',
    ],
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'React'],
    link: 'https://center-saas-front-83p8.vercel.app/',
    accent: 'emerald',
  },
  {
    nameAr: 'أكلي',
    name: 'Food Delivery Platform',
    description: 'A dual-sided delivery app for customers and restaurant vendors, built around live order tracking and real distance-based pricing.',
    highlights: [
      'Real-time order chat via Socket.IO, gated by payment',
      'GPS + Haversine distance & delivery-fee calculation',
      'Multi-restaurant smart cart',
      'Vodafone Cash / InstaPay proof-of-payment workflow',
      'Vendor dashboard with live sales analytics',
    ],
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Leaflet'],
    link: 'https://food-front-rho.vercel.app/',
    accent: 'amber',
  },
  {
    nameAr: 'WealthWise AI',
    name: 'Smart Financial Wallet',
    description: 'An AI-powered wallet that turns spoken or typed Arabic — "300 جنيه فراخ و150 عصير" — into categorized, logged transactions.',
    highlights: [
      'Gemini-powered Arabic natural-language transaction parsing',
      'SERIALIZABLE isolation + dual Redis locks for transfers',
      'Idempotency keys on every money-moving endpoint',
      'Arabic voice input via the Web Speech API',
      'Budget tracking with AI advice personalized by city',
    ],
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'Gemini AI'],
    link: 'https://wallet-wep-react.vercel.app/',
    accent: 'indigo',
  },
];

const STATS = [
  { value: '3', label: 'shipped apps' },
  { value: '30+', label: 'REST endpoints' },
  { value: '3', label: 'roles per platform' },
  { value: '2027', label: 'graduating' },
];

const NAV_LINKS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'stack' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
];

const ACCENTS = {
  emerald: { text: 'text-emerald-400', hoverBorder: 'hover:border-emerald-700', chip: 'text-emerald-300 border-emerald-900 bg-emerald-950', dot: 'bg-emerald-400' },
  amber: { text: 'text-amber-400', hoverBorder: 'hover:border-amber-700', chip: 'text-amber-300 border-amber-900 bg-amber-950', dot: 'bg-amber-400' },
  indigo: { text: 'text-indigo-400', hoverBorder: 'hover:border-indigo-700', chip: 'text-indigo-300 border-indigo-900 bg-indigo-950', dot: 'bg-indigo-400' },
};

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, nodes, animId;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.max(24, Math.min(70, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      const linkDist = 140;

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.14 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(52, 211, 153, 0.55)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) animId = requestAnimationFrame(step);
    }

    init();
    step();
    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

function TerminalIntro() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return;
    const current = TERMINAL_LINES[lineIdx];
    if (charIdx < current.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, current]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 420);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 text-xs text-zinc-500 font-display">youssef@portfolio: ~</span>
      </div>
      <div className="p-5 font-display text-sm sm:text-base leading-relaxed min-h-[220px]">
        {done.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className={l.prompt === '$' ? 'text-emerald-400' : 'text-zinc-600'}>{l.prompt}</span>
            <span className={l.prompt === '$' ? 'text-zinc-200' : 'text-zinc-400'}>{l.text}</span>
          </div>
        ))}
        {current && (
          <div className="flex gap-2">
            <span className={current.prompt === '$' ? 'text-emerald-400' : 'text-zinc-600'}>{current.prompt}</span>
            <span className={current.prompt === '$' ? 'text-zinc-200' : 'text-zinc-400'}>
              {current.text.slice(0, charIdx)}
            </span>
            <span className="inline-block w-2 h-4 bg-emerald-400" style={{ animation: 'blink 1s step-start infinite' }} />
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalContact() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 text-xs text-zinc-500 font-display">contact.json</span>
      </div>
      <pre className="p-5 font-display text-xs sm:text-sm text-zinc-400 leading-relaxed overflow-x-auto">
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

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-baseline gap-3 font-display">
      <span className="text-emerald-400 text-sm">{index}</span>
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 capitalize">{title}</h2>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="border-l-2 border-zinc-800 pl-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500 font-display mb-1">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="text-sm text-zinc-300">{value}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const a = ACCENTS[project.accent];
  return (
    <div className={`border border-zinc-800 bg-zinc-950/60 rounded-lg p-6 transition-colors ${a.hoverBorder}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
            <span className="text-xs font-display text-zinc-500">{project.nameAr}</span>
          </div>
          <h3 className="font-display text-lg text-zinc-100 font-semibold">{project.name}</h3>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-xs font-display border rounded-full px-3 py-1.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${a.chip}`}
        >
          Live demo <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="text-zinc-400 mt-3 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map((s) => (
          <span key={s} className="text-xs font-display text-zinc-500 border border-zinc-800 rounded px-2 py-0.5">
            {s}
          </span>
        ))}
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-xs font-display mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded ${a.text}`}
      >
        {open ? 'hide details' : 'show details'}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5 border-t border-zinc-800 pt-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-zinc-400 flex gap-2">
              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${a.dot}`} />
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setShowTop(scrollTop > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('youssefsea274@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-200 font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
      `}</style>

      <NetworkBackground />

      <div className="fixed top-0 left-0 right-0 h-0.5 bg-zinc-900 z-50">
        <div
          className="h-full bg-emerald-400"
          style={{ width: `${scrollProgress}%`, transition: 'width 100ms linear' }}
        />
      </div>

      <header className="fixed top-0.5 left-0 right-0 z-40 backdrop-blur bg-black/70 border-b border-zinc-900">
        <nav className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-emerald-400 font-bold text-lg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            ~/youssef
          </button>

          <div className="hidden md:flex items-center gap-8 font-display text-sm">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded ${
                  activeSection === l.id ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/Youssefsea" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/youssef-yasser-97aa742b0" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <FaLinkedin  className="w-5 h-5" />
            </a>
          </div>

          <button className="md:hidden text-zinc-300" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-black px-5 py-4 flex flex-col gap-4 font-display text-sm">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-zinc-400">
                {l.label}
              </button>
            ))}
            <div className="flex gap-4 pt-2 border-t border-zinc-900">
              <a href="https://github.com/Youssefsea" target="_blank" rel="noopener noreferrer" className="text-zinc-500">
               <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/youssef-yasser-97aa742b0" target="_blank" rel="noopener noreferrer" className="text-zinc-500">
                <FaLinkedin  className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section id="hero" className="max-w-5xl mx-auto px-5 sm:px-8 pt-36 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-display text-emerald-400 border border-emerald-900 bg-emerald-950 px-3 py-1 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'blink 1.4s ease-in-out infinite' }} />
              open to remote work
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-zinc-50 leading-tight mb-4">
              Youssef Yasser
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-6 leading-relaxed">
              fullstack developer, studying Computer Science at Menoufia University. I design the systems under the hood — then build the interface on top.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 mb-8 font-display">
              <MapPin className="w-4 h-4" /> Giza, Egypt
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="px-5 py-2.5 bg-emerald-400 text-black font-display font-semibold text-sm rounded-md hover:bg-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2.5 border border-zinc-700 text-zinc-200 font-display font-semibold text-sm rounded-md hover:border-emerald-500 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Get in Touch
              </button>
            </div>
          </div>
          <TerminalIntro />
        </section>

        <section className="border-y border-zinc-900 bg-zinc-950/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">{s.value}</div>
                <div className="text-xs text-zinc-500 font-display mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="max-w-5xl mx-auto px-5 sm:px-8 py-24 scroll-mt-20">
          <Reveal>
            <SectionLabel index="01" title="about" />
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-3 gap-10 mt-8">
              <div className="md:col-span-2 space-y-4 text-zinc-400 leading-relaxed">
                <p>
                 Junior Full Stack Web Developer with a proven track record of designing and shipping production-ready applications. 
Successfully built an AI-powered fintech wallet handling ACID-compliant transactions and distributed locking, and a 
geospatial food delivery platform featuring 30+ REST API endpoints. Expertise in Node.js, Express.js, PostgreSQL, MySQL, 
Redis, and TypeScript/JavaScript, with a focus on backend architecture, database optimization, and scalable system design.
                </p>
                <p>
                  Right now I'm building <span className="text-zinc-200">ذاكر صح</span>, an EdTech SaaS platform connecting students with learning centers across Egypt, and exploring AI-powered financial tools with natural-language transaction parsing.
                </p>
              </div>
              <div className="space-y-4">
                <InfoRow icon={GraduationCap} label="Education" value="B.Sc. Computer Science, Menoufia University · 2023–2027" />
                <InfoRow icon={Terminal} label="Focus" value="Fullstack Development" />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="max-w-5xl mx-auto px-5 sm:px-8 py-24 border-t border-zinc-900 scroll-mt-20">
          <Reveal>
            <SectionLabel index="02" title="stack" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {SKILL_GROUPS.map((g, i) => (
              <Reveal key={g.label} delay={i * 80}>
                <div className="border border-zinc-800 bg-zinc-950/60 rounded-lg p-5 h-full hover:border-emerald-800 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <g.icon className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-display text-sm text-zinc-200">{g.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span key={item} className="text-xs font-display text-zinc-400 border border-zinc-800 bg-zinc-900 rounded px-2 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="max-w-5xl mx-auto px-5 sm:px-8 py-24 border-t border-zinc-900 scroll-mt-20">
          <Reveal>
            <SectionLabel index="03" title="projects" />
          </Reveal>
          <div className="space-y-6 mt-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="max-w-5xl mx-auto px-5 sm:px-8 py-24 border-t border-zinc-900 scroll-mt-20">
          <Reveal>
            <SectionLabel index="04" title="experience" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex gap-5">
              <div className="flex flex-col items-center pt-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="w-px flex-1 bg-zinc-800 mt-1.5" />
              </div>
              <div className="pb-2">
                <h3 className="font-display text-zinc-100 text-base">IT Intern — GUPCO</h3>
                <p className="text-xs text-zinc-500 font-display mt-1">Gulf of Suez Petroleum Company · Egypt</p>
                <p className="text-zinc-400 mt-3 leading-relaxed max-w-2xl">
                  Selected for an IT internship at a major petroleum enterprise, working across backend development, database architecture, and enterprise infrastructure workflows.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="max-w-5xl mx-auto px-5 sm:px-8 py-24 border-t border-zinc-900 scroll-mt-20">
          <Reveal>
            <SectionLabel index="05" title="contact" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-zinc-50 font-bold mb-4">
                  Let's build something that runs in production.
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Open to remote roles and international internships. If you have a backend-heavy problem — or just want to talk system design — my inbox is open.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-3 text-sm font-display text-zinc-300 hover:text-emerald-400 transition-colors group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  >
                    <Mail className="w-4 h-4" /> youssefsea274@gmail.com
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                  <a href="tel:+201104699278" className="flex items-center gap-3 text-sm font-display text-zinc-300 hover:text-emerald-400 transition-colors w-fit">
                    <Phone className="w-4 h-4" /> +20 110 469 9278
                  </a>
                  <a href="https://github.com/Youssefsea" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-display text-zinc-300 hover:text-emerald-400 transition-colors w-fit">
                    <FaGithub className="w-5 h-5" /> github.com/Youssefsea
                  </a>
                  <a href="https://www.linkedin.com/in/youssef-yasser-97aa742b0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-display text-zinc-300 hover:text-emerald-400 transition-colors w-fit">
                    <FaLinkedin className="w-5 h-5" /> linkedin.com/in/youssef-yasser
                  </a>
                </div>
              </div>
              <TerminalContact />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-8">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600 font-display">
          <span>© 2026 Youssef Yasser. Built with Next.js.</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> status: available
          </span>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 flex items-center justify-center hover:border-emerald-500 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
