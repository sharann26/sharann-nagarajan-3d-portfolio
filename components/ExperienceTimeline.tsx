import React, { useEffect, useRef } from "react";
import { EXPERIENCES } from "../constants";
import { useScrub } from "../lib/useScrub";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

// colour per entry, as in code.md (literal strings for Tailwind's scanner)
const ACC = [
  {
    node: "border-sky text-sky",
    dot: "bg-sky",
    role: "group-hover:text-sky",
    co: "text-sky",
    chip: "border-sky/40 bg-sky/10 font-bold text-sky",
    bullet: "text-sky",
  },
  {
    node: "border-ib text-ib",
    dot: "bg-ib",
    role: "group-hover:text-ibt",
    co: "text-ibt",
    chip: "border-ib/40 bg-ib/10 font-bold text-ibt",
    bullet: "text-ibt",
  },
  {
    node: "border-pu text-pu",
    dot: "bg-pu",
    role: "group-hover:text-put",
    co: "text-put",
    chip: "border-line bg-low font-semibold text-s3",
    bullet: "text-put",
  },
  {
    node: "border-a text-a",
    dot: "bg-a",
    role: "group-hover:text-a",
    co: "text-a",
    chip: "border-line bg-low font-semibold text-s3",
    bullet: "text-a",
  },
];

const range = (d: string) => d.replace(/\s-\s/, " � ").toUpperCase();

/**
 * Left-line timeline (code.md). Parallax: a green fill draws down the line as you scroll,
 * and each node ignites (glow) the moment the fill reaches it.
 */
const ExperienceTimeline: React.FC = () => {
  const fill = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const tops = useRef<number[]>([]);

  useEffect(() => {
    const m = () =>
      (tops.current = nodes.current.map((n) =>
        n ? (n.parentElement as HTMLElement).offsetTop + n.offsetTop : 0,
      ));
    m();
    const ro = new ResizeObserver(m);
    nodes.current.forEach(
      (n) => n?.parentElement && ro.observe(n.parentElement),
    );
    window.addEventListener("resize", m);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", m);
    };
  }, []);

  const ref = useScrub<HTMLDivElement>((_p, _c, m) => {
    const reach = Math.max(0, Math.min(m.h, m.y + m.vh * 0.55 - m.top));
    if (fill.current)
      fill.current.style.scale = `1 ${(reach / Math.max(1, m.h)).toFixed(4)}`;
    nodes.current.forEach((n, i) => {
      if (!n) return;
      const on = reach >= (tops.current[i] ?? 0) + 8 ? "1" : "0";
      if (n.dataset.on !== on) n.dataset.on = on;
    });
  });

  return (
    <Section
      id="experience"
      no="74"
      sym="W"
      eyebrow="PROFESSIONAL ODYSSEY"
      title="Work Experience"
      ghost="EXPERIENCE"
      dir={-1}
    >
      <div
        ref={ref}
        className="relative ml-4 space-y-12 border-l-2 border-line pl-6 sm:ml-8 sm:pl-10"
      >
        <div aria-hidden className="absolute -left-[2px] top-0 h-full w-[2px]">
          <div
            ref={fill}
            className="h-full origin-top bg-g"
            style={{ scale: "1 0" }}
          />
        </div>

        {EXPERIENCES.map((e, i) => {
          const a = ACC[i] ?? ACC[3];
          const current = /present/i.test(e.date);
          return (
            <div key={e.id} className="group relative">
              <div
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                className={`tl-node absolute -left-[31px] top-2 flex h-4 w-4 items-center justify-center border-2 bg-lowest sm:-left-[47px] ${a.node}`}
              >
                <div
                  className={`h-1.5 w-1.5 ${a.dot} ${current ? "animate-ping" : ""}`}
                />
              </div>

              <Reveal from="left">
                <div className="lab-panel p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`border px-2.5 py-1 font-mono text-xs ${a.chip}`}
                      >
                        {e.date}
                      </span>
                      {current && (
                        <span className="border border-line bg-low px-2.5 py-1 font-mono text-xs text-s3">
                          CURRENT APPOINTMENT
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-s4">
                      {e.location}
                    </span>
                  </div>
                  <h3
                    className={`mb-1 font-headline text-2xl font-bold text-hi transition-colors ${a.role}`}
                  >
                    {e.title}
                  </h3>
                  <div
                    className={`mb-4 font-mono text-sm font-semibold ${a.co}`}
                  >
                    {e.company}
                  </div>
                  <ul className="mb-6 space-y-2.5">
                    {e.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-sm leading-relaxed text-s3"
                      >
                        <span className={`mt-0.5 font-bold ${a.bullet}`}>
                          &bull;
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {e.tags && (
                    <div className="flex flex-wrap gap-2 border-t border-line pt-4 font-mono text-xs">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-line bg-low px-2.5 py-1 text-s3"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ExperienceTimeline;
