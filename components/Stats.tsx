import React from "react";
import { CAREER_START_LABEL, STATS } from "../constants";
import { CountUp } from "./ui/CountUp";
import { Depth } from "./ui/Depth";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

// literal class strings so Tailwind's scanner sees them
const HOVER = ["group-hover:text-g", "group-hover:text-c", "group-hover:text-a", "group-hover:text-g"];

const Stats: React.FC = () => (
  <Section
    id="telemetry"
    no="16"
    sym="S"
    eyebrow="STATS"
    title="At a Glance"
    ghost="STATS"
    band
    right={
      <div className="flex items-center gap-2 pb-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-a" />
        {/* date text is derived from START_DATE in constants.tsx */}
        <span className="hidden font-mono text-[11px] uppercase text-mute sm:inline">SYNTHESIS COMMENCED {CAREER_START_LABEL}</span>
      </div>
    }
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Depth key={s.label} amps={[0, i % 2 ? -18 : 18, i % 2 ? -22 : 22]}>
          <Reveal delay={i} className="h-full">
            <div className="lab-panel group flex h-full flex-col justify-between p-6">
              <div>
                <div className={`mb-2 font-headline text-4xl font-bold tracking-tight text-hi transition-colors sm:text-5xl ${HOVER[i]}`}>
                  {/* "8+" comes from calculateExperience(); CountUp only animates its display */}
                  <CountUp value={s.value} />
                  {i === 0 && " Years"}
                </div>
                <div className="mb-1 font-headline text-sm font-semibold text-s2">{i === 0 ? "Industrial Experience" : s.label}</div>
                <p className="font-mono text-xs leading-relaxed text-s4">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        </Depth>
      ))}
    </div>
  </Section>
);

export default Stats;
