import React, { useEffect, useRef } from "react";
import { registerScrub } from "../../lib/scrub";

/**
 * Fixed depth stack behind everything (z-0, pointer-events none). Slowest → fastest:
 *   dot grid  ·  two blurred glows (code.md)  ·  three outlined element glyphs drifting up at different speeds
 * Glyphs wrap around the viewport (modulo), so they keep drifting for the whole page length.
 */
const GLYPHS = [
  { t: "Sh", sx: "left-[4%]", size: "text-[16rem]", speed: 0.1, spin: 0.012, base: 0.55 },
  { t: "Na", sx: "right-[3%]", size: "text-[12rem]", speed: 0.18, spin: -0.02, base: 0.15 },
  { t: "{ }", sx: "left-[46%]", size: "text-[9rem]", speed: 0.3, spin: 0.03, base: 0.85 },
];

export const Backdrop: React.FC = () => {
  const dots = useRef<HTMLDivElement>(null);
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const glyph = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    return registerScrub(
      root,
      (_p, _c, m) => {
        const { y, vh } = m;
        if (dots.current) dots.current.style.translate = `0px ${-(y * 0.06) % 32}px`;
        if (blobA.current) blobA.current.style.translate = `${Math.sin(y / 900) * 90}px ${Math.cos(y / 1300) * 120}px`;
        if (blobB.current) blobB.current.style.translate = `${Math.cos(y / 1100) * -110}px ${Math.sin(y / 800) * 90}px`;
        const span = vh + 520;
        GLYPHS.forEach((g, i) => {
          const el = glyph.current[i];
          if (!el) return;
          const pos = (((g.base * span - y * g.speed) % span) + span) % span - 260;
          el.style.translate = `0px ${pos.toFixed(1)}px`;
          el.style.rotate = `${(y * g.spin).toFixed(2)}deg`;
        });
      },
      { range: "always", smooth: 12 },
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={dots}
        className="plx absolute -inset-x-2 -top-10 bottom-[-40px] opacity-60 [background-image:radial-gradient(rgb(var(--line))_1px,transparent_1.2px)] [background-size:32px_32px]"
      />
      <div ref={blobA} className="plx absolute right-1/4 top-0 h-[500px] w-[500px] bg-g/[0.05] blur-[140px] dark:bg-g/[0.025]" />
      <div ref={blobB} className="plx absolute bottom-1/3 left-10 h-[450px] w-[450px] bg-a/[0.07] blur-[150px] dark:bg-a/[0.02]" />
      {GLYPHS.map((g, i) => (
        <div
          key={g.t}
          ref={(el) => { glyph.current[i] = el; }}
          className={`plx absolute top-0 ${g.sx} ${g.size} select-none font-headline font-black leading-none ghost-text opacity-60`}
        >
          {g.t}
        </div>
      ))}
    </div>
  );
};
