import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Certifications from "./components/Certifications";
import ChatBot from "./components/ChatBot";
import ContactBanner from "./components/ContactBanner";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import ThemeToggle from "./components/ThemeToggle";
import { Backdrop } from "./components/ui/Backdrop";
import { Tile } from "./components/ui/Tile";
import { CHATBOT_ENABLED, CONTACT_INFO, STATS } from "./constants";

type Theme = "dark" | "light";

// ids follow code.md
const NAV = [
  { name: "STATS", id: "telemetry" },
  { name: "EXPERIENCE", id: "experience" },
  { name: "PROJECTS", id: "projects" },
  { name: "SKILLS", id: "stack" },
  { name: "CERTIFICATES", id: "credentials" },
  { name: "CONTACT", id: "contact" },
];

const App: React.FC = () => {
  // default: LAB (dark). A visitor's choice is remembered; storage can throw, so it is guarded.
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem("theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("");

  // MotionValue-driven progress bar: no React re-render on scroll.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode: theme still works for this visit */
    }
  }, [theme]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShowTop(window.scrollY > 400);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const years = STATS[0]?.value ?? "";

  const navLink = (n: { name: string; id: string }) => (
    <a
      key={n.id}
      href={`#${n.id}`}
      onClick={(e) => {
        e.preventDefault();
        go(n.id);
      }}
      className={`shrink-0 border px-3 py-1.5 font-mono text-xs transition-all hover:border-line2 hover:bg-low hover:text-g ${active === n.id ? "border-line2 bg-low text-g" : "border-transparent text-soft"}`}
    >
      {n.name}
    </a>
  );

  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent text-txt">
      <Backdrop />

      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-g"
        style={{ scaleX }}
      />

      {/* status strip */}
      <div className="relative z-50 flex w-full items-center justify-between border-b border-line bg-surf px-4 py-1 font-mono text-[10px] text-mute">
        <div className="flex items-center gap-3">
          <span className="font-bold text-g">STATUS: ONLINE</span>
          <span>//</span>
          <span>LOC: CHENNAI, IN</span>
        </div>
        <span className="font-bold text-a">[EXP: {years} YRS]</span>
      </div>

      {/* header */}
      <header className="sticky top-0 z-40 border-b border-line bg-surf/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <Tile no="16" sym="S" />
            <div className="flex flex-col">
              <span className="font-headline text-base font-black tracking-tight text-hi transition-colors group-hover:text-g">
                Sharann Nagarajan
              </span>
              <span className="font-mono text-[10px] text-mute">
                SOFTWARE ENGINEER
              </span>
            </div>
          </a>

          <nav className="hidden items-center xl:flex" aria-label="Sections">
            {NAV.map(navLink)}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden items-center gap-1.5 border border-g bg-g px-4 py-2 font-headline text-xs font-black uppercase tracking-wider text-fg shadow-[2px_2px_0px_#000] transition-all hover:bg-hovbg hover:text-hovfg sm:flex"
            >
              HIRE ME <ArrowUpRight size={14} strokeWidth={3} />
            </a>
          </div>
        </div>
        <nav
          className="custom-scrollbar border-t border-line xl:hidden"
          aria-label="Sections"
        >
          <div className="custom-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-1.5 sm:px-6">
            {NAV.map(navLink)}
          </div>
        </nav>
      </header>

      <main className="relative z-10 pb-12 pt-0" role="main">
        <Hero theme={theme} />
        <Marquee />
        <Stats />
        <ExperienceTimeline />
        <Projects />
        <Skills theme={theme} />
        <Certifications />
        <ContactBanner />
      </main>

      <footer className="relative z-10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 bg-g" />
              <span className="font-headline text-sm font-bold text-hi">
                SHARANN NAGARAJAN
              </span>
              <span className="text-mute">//</span>
              <span className="text-g font-mono">SOFTWARE ENGINEER</span>
            </div>
            <div className="font-mono text-[11px] text-mute">
              PHONE &amp; WA: +91 82489 47601 • EMAIL:{" "}
              {CONTACT_INFO.email.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col gap-1 font-mono text-[11px] text-mute md:items-end">
            <div>
              © {new Date().getFullYear()} Sharann. All Rights Reserved.
            </div>
            <div className="text-g">BUILT WITH PASSION.</div>
          </div>
        </div>
      </footer>

      <ChatBot theme={theme} />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 z-[90] border border-g bg-g p-3 text-fg shadow-[2px_2px_0px_#000] transition-[transform,opacity] duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${CHATBOT_ENABLED ? "right-24" : "right-5"} ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default App;
