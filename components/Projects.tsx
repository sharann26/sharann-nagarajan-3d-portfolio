import React from "react";
import { PROJECTS } from "../constants";
import { Depth } from "./ui/Depth";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const KIND = { WEB: "WEB", MOBILE: "MOBILE", BOTH: "BOTH" } as const;

// accent per card as in code.md: c g a g c a (literal strings for Tailwind's scanner)
const ACC = [
  { label: "text-c", chip: "border-c/30 bg-c/10 text-c", hover: "hover:border-c", title: "group-hover:text-c", tag: "text-c" },
  { label: "text-g", chip: "border-g/30 bg-g/10 text-g", hover: "hover:border-g", title: "group-hover:text-g", tag: "text-g" },
  { label: "text-a", chip: "border-a/30 bg-a/10 text-a", hover: "hover:border-a", title: "group-hover:text-a", tag: "text-a" },
  { label: "text-g", chip: "border-g/30 bg-g/10 text-g", hover: "hover:border-g", title: "group-hover:text-g", tag: "text-g" },
  { label: "text-c", chip: "border-c/30 bg-c/10 text-c", hover: "hover:border-c", title: "group-hover:text-c", tag: "text-c" },
  { label: "text-a", chip: "border-a/30 bg-a/10 text-a", hover: "hover:border-a", title: "group-hover:text-a", tag: "text-a" },
];
// lg = 3 columns, md = 2 columns: each column drifts against its neighbour
const LG = [26, -26, 26];

const Projects: React.FC = () => (
  <Section id="projects" no="59" sym="Pr" eyebrow="ENGINEERING SHOWCASES" title="Featured Projects" ghost="PROJECTS" band>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p, i) => {
        const a = ACC[i % ACC.length];
        return (
          <Depth key={p.title} amps={[0, i % 2 ? -24 : 24, LG[i % 3]]} className={i === PROJECTS.length - 1 && PROJECTS.length % 2 ? "md:col-span-2 lg:col-span-1" : ""}>
            <Reveal delay={i % 3} className="h-full">
              <div className={`lab-panel group flex h-full flex-col justify-between p-6 transition-all ${a.hover}`}>
                <div>
                  <div className="mb-3 flex items-center justify-between font-mono text-xs">
                    <span className={`font-bold ${a.label}`}>
                      BATCH #{String(i + 1).padStart(2, "0")} // {KIND[p.icon]}
                    </span>
                    {p.category && <span className={`border px-2 py-0.5 text-[10px] font-bold ${a.chip}`}>{p.category.join(" ")}</span>}
                  </div>
                  <h3 className={`mb-2 font-headline text-xl font-bold text-hi transition-colors ${a.title}`}>{p.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-s3">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {p.tags.map((t) => (
                    <span key={t.name} className={`border border-line bg-low px-2 py-0.5 ${i < 2 ? a.tag : "text-s3"}`}>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Depth>
        );
      })}
    </div>
  </Section>
);

export default Projects;
