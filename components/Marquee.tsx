import React, { useEffect, useRef } from "react";
import { useScrub } from "../lib/useScrub";

const WORDS = ["ANGULAR", "TYPESCRIPT", "RXJS", "NGRX", "REACT", "IONIC", "NODE.JS", "TAILWIND", "ZERO-LAG"];

/**
 * Two giant ticker rows that run on SCROLL, not on time: they travel in opposite directions and
 * skew with scroll velocity (fast flick = lean). Seamless: position wraps on one copy's width.
 */
const Row: React.FC<{ solid?: boolean; setRef: (el: HTMLDivElement | null) => void; copy: React.RefObject<HTMLDivElement | null> }> = ({ solid, setRef, copy }) => {
  const item = (k: number) => (
    <div key={k} ref={k === 0 ? copy : undefined} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`px-6 font-headline text-6xl font-black leading-none tracking-tighter md:text-8xl ${solid ? "text-g" : "outline-text"}`}>{w}</span>
          <span className="text-3xl text-a md:text-5xl">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div ref={setRef} className="flex w-max will-change-transform">
      {[0, 1, 2].map(item)}
    </div>
  );
};

const Marquee: React.FC = () => {
  const r1 = useRef<HTMLDivElement | null>(null);
  const r2 = useRef<HTMLDivElement | null>(null);
  const copy = useRef<HTMLDivElement | null>(null);
  const w = useRef(1800);

  useEffect(() => {
    const m = () => copy.current && (w.current = copy.current.offsetWidth || 1800);
    m();
    const ro = new ResizeObserver(m);
    if (copy.current) ro.observe(copy.current);
    return () => ro.disconnect();
  }, []);

  const ref = useScrub<HTMLDivElement>((_p, _c, m) => {
    const x = (m.y * 0.45) % w.current;
    const skew = Math.max(-9, Math.min(9, m.vel * 3.2));
    if (r1.current) r1.current.style.transform = `translate3d(${-x}px,0,0) skewX(${skew}deg)`;
    if (r2.current) r2.current.style.transform = `translate3d(${x - w.current}px,0,0) skewX(${skew}deg)`;
  });

  return (
    <div ref={ref} aria-hidden className="relative z-10 overflow-hidden border-y border-line bg-surf/80 py-6 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <Row setRef={(el) => (r1.current = el)} copy={copy} />
        <Row solid setRef={(el) => (r2.current = el)} copy={{ current: null }} />
      </div>
    </div>
  );
};

export default Marquee;
