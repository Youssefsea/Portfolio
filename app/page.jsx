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
  Zap,
  Smile,
  Star,
  Rocket
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
  { label: 'Backend', icon: Server, color: 'bg-amber-300 text-black', items: ['Node.js', 'Express.js', 'REST API Design', 'MVC', 'JWT Auth', 'HTTP-Only Cookies'] },
  { label: 'Databases', icon: Database, color: 'bg-cyan-300 text-black', items: ['PostgreSQL', 'MySQL', 'Redis (Locking)', 'Schema Design', 'Geospatial Queries', 'pgAdmin'] },
  { label: 'Frontend', icon: Code2, color: 'bg-pink-300 text-black', items: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RTL / Arabic UI'] },
  { label: 'AI & Integrations', icon: Sparkles, color: 'bg-purple-300 text-black', items: ['Google Gemini API', 'NLP', 'Web Speech API', 'Leaflet.js'] },
  { label: 'Tools & DevOps', icon: Cpu, color: 'bg-lime-300 text-black', items: ['Git', 'GitHub', 'Docker', 'AWS Basics', 'Postman', 'Cloudinary'] },
];

const PROJECTS = [
  {
    nameAr: 'ذاكر صح 🎓',
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
    bg: 'bg-emerald-300',
    badge: 'bg-emerald-400',
  },
  {
    nameAr: 'أكلي 🍔',
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
    bg: 'bg-amber-300',
    badge: 'bg-amber-400',
  },
  {
    nameAr: 'WealthWise AI 💰',
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
    bg: 'bg-purple-300',
    badge: 'bg-purple-400',
  },
];

const STATS = [
  { value: '3', label: 'shipped apps', color: 'bg-yellow-300' },
  { value: '30+', label: 'REST endpoints', color: 'bg-cyan-300' },
  { value: '3', label: 'roles per platform', color: 'bg-pink-300' },
  { value: '2027', label: 'graduating', color: 'bg-lime-300' },
];

const NAV_LINKS = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}

function CartoonParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <div className="absolute top-12 left-10 w-16 h-16 rounded-full bg-yellow-300 border-4 border-black animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-12 w-12 h-12 bg-pink-400 border-4 border-black rotate-12 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-cyan-300 border-4 border-black rounded-3xl -rotate-12 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-2/3 right-1/3 w-10 h-10 bg-lime-400 border-4 border-black rounded-full animate-ping" style={{ animationDuration: '5s' }} />
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
      const t = setTimeout(() => setCharIdx((c) => c + 1), 25);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, current]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 350);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const current = TERMINAL_LINES[lineIdx];

  return (
    <div className="bg-amber-300 border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden transform rotate-1 hover:rotate-0 transition-transform">
      <div className="flex items-center justify-between px-4 py-3 bg-black text-white font-black border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-black" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-black" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-black" />
        </div>
        <span className="text-xs font-mono tracking-widest text-yellow-300">YOUSSEF_SHELL_V2.EXE</span>
      </div>
      <div className="p-5 font-mono text-sm sm:text-base leading-relaxed bg-black text-lime-400 min-h-[220px]">
        {done.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className={l.prompt === '$' ? 'text-pink-400 font-bold' : 'text-cyan-300'}>{l.prompt}</span>
            <span className={l.prompt === '$' ? 'text-white' : 'text-yellow-300'}>{l.text}</span>
          </div>
        ))}
        {current && (
          <div className="flex gap-2">
            <span className={current.prompt === '$' ? 'text-pink-400 font-bold' : 'text-cyan-300'}>{current.prompt}</span>
            <span className={current.prompt === '$' ? 'text-white' : 'text-yellow-300'}>
              {current.text.slice(0, charIdx)}
            </span>
            <span className="inline-block w-2.5 h-5 bg-pink-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionBadge({ index, title }: { index: string; title: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-yellow-300 border-4 border-black px-5 py-2.5 rounded-2xl shadow-[5px_5px_0px_0px_#000] -rotate-1 hover:rotate-1 transition-transform">
      <span className="bg-black text-yellow-300 font-black text-lg px-3 py-0.5 rounded-xl">{index}</span>
      <h2 className="text-2xl sm:text-3xl font-black text-black capitalize tracking-tight">{title}</h2>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border-4 border-black ${project.bg} rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-block bg-black text-white text-xs font-black px-3 py-1 rounded-full mb-2 border-2 border-black">
            {project.nameAr}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">{project.name}</h3>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-black text-sm bg-white text-black border-3 border-black rounded-2xl px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          Live Demo <ExternalLink className="w-4 h-4 stroke-[3]" />
        </a>
      </div>
      <p className="text-black font-semibold text-base sm:text-lg mt-4 leading-relaxed">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-5">
        {project.stack.map((s) => (
          <span key={s} className="text-xs font-black bg-white text-black border-2 border-black rounded-xl px-3 py-1 shadow-[2px_2px_0px_0px_#000]">
            #{s}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-black text-xs sm:text-sm mt-6 bg-black text-white rounded-xl px-4 py-2 border-2 border-black hover:bg-zinc-800 transition-colors"
      >
        {open ? 'Hide Features' : 'Unfold Features 🎉'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="mt-4 space-y-2 border-t-4 border-black pt-4 bg-white/80 rounded-2xl p-4 border-2">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm font-bold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
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
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('youssefsea274@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBEA] text-black font-sans selection:bg-pink-400 selection:text-black overflow-x-hidden">
      <CartoonParticles />

      {/* Header */}
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <nav className="bg-white border-4 border-black rounded-3xl p-3 shadow-[6px_6px_0px_0px_#000] flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="font-black text-xl tracking-tight bg-yellow-300 border-2 border-black px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#000] hover:rotate-3 transition-transform"
          >
            ⚡ Youssef.dev
          </button>

          <div className="hidden md:flex items-center gap-3 font-black text-sm">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-3 py-1.5 rounded-xl border-2 border-transparent hover:border-black hover:bg-cyan-300 transition-all"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Youssefsea"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-300 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:bg-pink-400 transition-colors"
            >
              <FaGithub className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-yasser-97aa742b0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-cyan-300 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:bg-cyan-400 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 text-black" />
            </a>
          </div>

          <button className="md:hidden p-2 bg-yellow-300 border-2 border-black rounded-xl" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden mt-2 bg-white border-4 border-black rounded-3xl p-5 shadow-[6px_6px_0px_0px_#000] flex flex-col gap-3 font-black text-base">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-1 hover:text-pink-600">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4">
        <section id="hero" className="pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 bg-lime-300 border-3 border-black text-black font-black text-xs px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#000] mb-6 -rotate-2">
                <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black animate-ping" />
                AVAILABLE FOR REMOTE ROLES! 🚀
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-black leading-none mb-4 tracking-tight">
                Hey, I'm <br />
                <span className="bg-pink-400 border-4 border-black px-3 rounded-2xl shadow-[6px_6px_0px_0px_#000] inline-block rotate-1 mt-2">
                  Youssef Yasser
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-zinc-800 my-6 leading-relaxed bg-white border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                Fullstack developer studying CS at Menoufia University. I architect backends & craft pixel-perfect interactive experiences!
              </p>
              <div className="flex items-center gap-2 font-black text-sm text-black mb-8">
                <MapPin className="w-5 h-5 text-red-500 fill-red-500" /> Giza, Egypt
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo('projects')}
                  className="px-6 py-3 bg-cyan-300 text-black font-black text-base border-4 border-black rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Explore Projects 💥
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-6 py-3 bg-yellow-300 text-black font-black text-base border-4 border-black rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Say Hi! 📬
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <TerminalIntro />
          </Reveal>
        </section>

        {/* Stats Strip */}
        <section className="my-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className={`${s.color} border-4 border-black rounded-3xl p-5 text-center shadow-[6px_6px_0px_0px_#000] transform hover:-rotate-2 transition-transform`}
              >
                <div className="text-4xl sm:text-5xl font-black text-black">{s.value}</div>
                <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-black mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 scroll-mt-24">
          <Reveal>
            <SectionBadge index="01" title="About Me" />
          </Reveal>
          <Reveal delay={100}>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2 bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] space-y-4 font-bold text-black text-base sm:text-lg leading-relaxed">
                <p>
                  Junior Full Stack Web Developer with a proven track record of designing and shipping production-ready applications.
                  Successfully built an AI-powered fintech wallet handling ACID-compliant transactions and distributed locking, and a
                  geospatial food delivery platform featuring 30+ REST API endpoints.
                </p>
                <p className="bg-yellow-200 border-2 border-black p-3 rounded-xl">
                  Right now I'm building <span className="font-black underline">ذاكر صح</span>, an EdTech SaaS platform connecting students with learning centers across Egypt, and exploring AI-powered financial tools.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-pink-300 border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_#000]">
                  <GraduationCap className="w-8 h-8 stroke-[3] mb-2" />
                  <div className="text-xs font-black uppercase text-zinc-700">Education</div>
                  <div className="text-sm font-black text-black mt-1">
                    B.Sc. Computer Science<br />Menoufia University · 2023–2027
                  </div>
                </div>
                <div className="bg-lime-300 border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_#000]">
                  <Rocket className="w-8 h-8 stroke-[3] mb-2" />
                  <div className="text-xs font-black uppercase text-zinc-700">Primary Focus</div>
                  <div className="text-sm font-black text-black mt-1">Backend Architecture & Scalable Systems</div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Stack Section */}
        <section id="skills" className="py-16 scroll-mt-24">
          <Reveal>
            <SectionBadge index="02" title="Tech Stack" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {SKILL_GROUPS.map((g, i) => (
              <Reveal key={g.label} delay={i * 80}>
                <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#000] hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-2xl border-2 border-black ${g.color}`}>
                      <g.icon className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h3 className="font-black text-xl text-black">{g.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span key={item} className="text-xs font-black bg-zinc-100 text-black border-2 border-black rounded-xl px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 scroll-mt-24">
          <Reveal>
            <SectionBadge index="03" title="Featured Projects" />
          </Reveal>
          <div className="space-y-8 mt-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 scroll-mt-24">
          <Reveal>
            <SectionBadge index="04" title="Work Experience" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 bg-cyan-300 border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-6 h-6 stroke-[3]" />
                <h3 className="font-black text-2xl text-black">IT Intern — GUPCO</h3>
              </div>
              <p className="text-xs font-black bg-black text-yellow-300 inline-block px-3 py-1 rounded-lg">
                Gulf of Suez Petroleum Company · Egypt
              </p>
              <p className="text-black font-bold text-base mt-4 leading-relaxed">
                Selected for an IT internship at a major petroleum enterprise, working across backend development, database architecture, and enterprise infrastructure workflows.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 scroll-mt-24">
          <Reveal>
            <SectionBadge index="05" title="Get In Touch" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_0px_#000] grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-black text-black leading-tight mb-4">
                  Let's build something awesome together! ⚡
                </h3>
                <p className="font-bold text-zinc-700 leading-relaxed mb-6">
                  Open to remote roles and international internships. Got a backend challenge or fullstack project? My inbox is always open!
                </p>
                <div className="flex flex-col gap-3 font-black text-sm">
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-3 bg-yellow-300 border-3 border-black px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all w-fit"
                  >
                    <Mail className="w-5 h-5 stroke-[3]" />
                    youssefsea274@gmail.com
                    {copied ? <Check className="w-4 h-4 text-green-700 stroke-[4]" /> : <Copy className="w-4 h-4 stroke-[3]" />}
                  </button>
                  <a
                    href="tel:+201104699278"
                    className="flex items-center gap-3 bg-pink-300 border-3 border-black px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400 transition-all w-fit"
                  >
                    <Phone className="w-5 h-5 stroke-[3]" /> +20 110 469 9278
                  </a>
                </div>
              </div>

              <div className="bg-black text-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_#FFE600] font-mono text-sm leading-relaxed">
                <div className="text-pink-400 font-bold mb-2">// contact.json</div>
                <pre className="text-yellow-300 whitespace-pre-wrap">
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
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-black bg-white py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-black text-xs text-black">
          <span>© 2026 Youssef Yasser. Built with Next.js & Pure Pop Style! 🎈</span>
          <span className="bg-lime-300 border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#000]">
            STATUS: AVAILABLE FOR WORK
          </span>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 bg-yellow-300 border-4 border-black rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:bg-yellow-400 hover:-translate-y-1 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
        </button>
      )}
    </div>
  );
}
