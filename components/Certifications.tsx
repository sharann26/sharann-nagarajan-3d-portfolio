import { BadgeCheck, ExternalLink } from "lucide-react";
import React from "react";
import { CERTIFICATIONS } from "../constants";
import { Depth } from "./ui/Depth";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

// accent per card from code.md: g a g c
const ACC = [
  { hover: "hover:border-g", txt: "text-g", title: "group-hover:text-g" },
  { hover: "hover:border-a", txt: "text-a", title: "group-hover:text-a" },
  { hover: "hover:border-g", txt: "text-g", title: "group-hover:text-g" },
  { hover: "hover:border-c", txt: "text-c", title: "group-hover:text-c" },
];

const Certifications: React.FC = () => (
  <Section
    id="credentials"
    no="58"
    sym="Ce"
    eyebrow="VERIFIED EXCELLENCE"
    title="Certifications"
    ghost="CERTIFIED"
    band
    right={<div className="font-mono text-xs text-mute">OFFICIAL COURSERA &amp; CREDLY DIRECT VERIFICATION REGISTRY</div>}
  >
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CERTIFICATIONS.map((c, i) => {
        const a = ACC[i % ACC.length];
        const body = (
          <>
            <div>
              <div className="mb-4 flex items-center justify-between font-mono text-xs">
                <span className={`font-bold ${a.txt}`}>
                  {c.issuer.toUpperCase()} // {c.date}
                </span>
                <BadgeCheck size={18} className={a.txt} aria-label="verified" />
              </div>
              <h3 className={`mb-2 font-headline text-lg font-bold text-hi transition-colors ${a.title}`}>{c.title}</h3>
              <div className="mb-6 font-mono text-xs text-s4">
                {c.subtitle}
                <br />
                <span className="text-mute">ID: {c.credentialId}</span>
              </div>
            </div>
            <div className={`flex items-center justify-between border-t border-line pt-4 font-mono text-xs ${a.txt}`}>
              Verify on {c.verifyOn}
              <ExternalLink size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </>
        );
        const cls = `lab-panel group flex h-full flex-col justify-between p-6 transition-all ${a.hover}`;
        return (
          <Depth key={c.title} amps={[0, i % 2 ? -18 : 18, i % 2 ? -24 : 24]}>
            <Reveal delay={i % 2} className="h-full">
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.title}, certified by ${c.issuer}, ${c.date}. Opens the official validation page in a new tab.`}
                  className={`${cls} cursor-pointer`}
                >
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          </Depth>
        );
      })}
    </div>
  </Section>
);

export default Certifications;
