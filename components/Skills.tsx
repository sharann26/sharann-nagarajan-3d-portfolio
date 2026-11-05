import React from "react";
import { SKILL_CATEGORIES } from "../constants";
import { Depth } from "./ui/Depth";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

// chamber accents from code.md: A g � B g (featured) � C a � D c
const CH = [
  {
    dot: "bg-g",
    txt: "text-g",
    hover: "hover:border-g",
    border: "border-line",
    head: "border-line",
    extra: "",
  },
  {
    dot: "bg-s2",
    txt: "text-s2",
    hover: "hover:border-s2",
    border: "border-s2/40",
    head: "border-s2/30",
    extra: "shadow-[0_0_20px_rgba(255,75,75,0.06)]",
  },
  {
    dot: "bg-a",
    txt: "text-a",
    hover: "hover:border-a",
    border: "border-line",
    head: "border-line",
    extra: "",
  },
  {
    dot: "bg-c",
    txt: "text-c",
    hover: "hover:border-c",
    border: "border-line",
    head: "border-line",
    extra: "",
  },
];
const brand = (icon: string) => /\/([0-9a-fA-F]{6})$/.exec(icon)?.[1];
const CH_HEX = ["#00ff66", "#b91c1c", "#f5a623", "#00e5ff"];

const Skills: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => (
  <Section
    id="stack"
    no="52"
    sym="Te"
    eyebrow="TECHNICAL ARSENAL"
    title="Skills"
    ghost="SKILLS"
    dir={-1}
  >
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {SKILL_CATEGORIES.map((cat, ci) => {
        const c = CH[ci] ?? CH[0];
        const tools = ci === 3;
        return (
          <Depth
            key={cat.title}
            amps={[0, ci % 2 ? -20 : 20, ci % 2 ? -26 : 26]}
          >
            <Reveal delay={ci % 2} className="h-full">
              <div
                className={`lab-panel group flex h-full flex-col p-5 transition-all ${c.hover} ${c.border} ${c.extra}`}
              >
                <div
                  className={`mb-4 flex items-center justify-between border-b pb-3 font-mono text-xs ${c.head}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 ${c.dot}`} />
                    <span className={`font-bold tracking-wider ${c.txt}`}>
                      CHAMBER {String.fromCharCode(65 + ci)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-mute">
                    {cat.title}
                  </span>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((s) => {
                    const hv =
                      s.hover ??
                      (brand(s.icon) ? `#${brand(s.icon)}` : CH_HEX[ci]);
                    const icon =
                      theme === "dark" ? s.icon_dark || s.icon : s.icon;
                    return (
                      <div
                        key={s.name}
                        style={{ ["--hv" as any]: hv }}
                        className={`sk-item flex items-center justify-between gap-2 border border-line bg-lowest transition-all ${tools ? "p-2.5" : "p-3"}`}
                      >
                        <div className="min-w-0 truncate">
                          <div
                            className={`sk-name truncate font-headline font-bold text-hi transition-colors ${tools ? "text-xs" : "text-sm"}`}
                          >
                            {s.name}
                          </div>
                        </div>
                        <img
                          src={icon}
                          alt=""
                          loading="lazy"
                          className={`shrink-0 object-contain ${tools ? "h-4 w-4" : "h-5 w-5"}`}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).style.visibility =
                              "hidden")
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </Depth>
        );
      })}
    </div>
  </Section>
);

export default Skills;
