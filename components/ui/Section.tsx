import React, { useRef } from "react";
import { bucket, useScrub } from "../../lib/useScrub";
import { Reveal } from "./Reveal";
import { Tile } from "./Tile";

/**
 * code.md section frame (tile + mono eyebrow + headline + 1px rule) plus two scroll effects:
 *  - the rule fills green as the header travels up the screen
 *  - a giant outlined word slides sideways behind the section (alternating direction)
 */
export const Section: React.FC<{
  id: string;
  no: string;
  sym: string;
  eyebrow: string;
  title: string;
  ghost: string;
  dir?: 1 | -1;
  band?: boolean;
  right?: React.ReactNode;
  padClass?: string;
  children: React.ReactNode;
}> = ({ id, no, sym, eyebrow, title, ghost, dir = 1, band, right, padClass = "py-20", children }) => {
  const ghostRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const secRef = useScrub<HTMLElement>((_p, c) => {
    if (ghostRef.current) {
      const k = bucket() === 0 ? 0.1 : 0.2;
      ghostRef.current.style.translate = `${(c * dir * -k * window.innerWidth).toFixed(1)}px 0px`;
    }
  });
  const headRef = useScrub<HTMLDivElement>((p) => {
    if (fillRef.current) fillRef.current.style.scale = `${Math.min(1, p * 2.6).toFixed(3)} 1`;
  });

  return (
    <section
      id={id}
      ref={secRef}
      className={`relative overflow-x-clip ${padClass} ${band ? "border-y border-line bg-surf" : ""}`}
    >
      <div
        ref={ghostRef}
        aria-hidden
        className="plx pointer-events-none absolute left-0 top-6 z-0 select-none whitespace-nowrap font-headline text-[clamp(5rem,16vw,14rem)] font-black uppercase leading-none ghost-text opacity-70"
        style={{ paddingLeft: dir === 1 ? "6vw" : "30vw" }}
      >
        {ghost}
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={headRef} className="relative mb-12 flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-end">
          <div className="group flex items-center gap-3.5">
            <Tile no={no} sym={sym} />
            <div>
              <Reveal as="span" className="mb-0.5 block font-mono text-xs font-bold uppercase tracking-widest text-g">
                {eyebrow}
              </Reveal>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-hi sm:text-4xl">{title}</h2>
            </div>
          </div>
          {right}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div ref={fillRef} className="h-full origin-left bg-g" style={{ scale: "0 1" }} />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};
