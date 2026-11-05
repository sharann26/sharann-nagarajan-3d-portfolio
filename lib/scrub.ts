/**
 * Scroll-scrub engine: ONE passive scroll listener + ONE rAF loop for every scroll-linked effect.
 *
 *  - React never sees scroll (no setState / re-render): the React equivalent of NgZone.runOutsideAngular.
 *  - Page geometry is measured on load/resize only, never inside the frame loop (no layout thrash).
 *  - Effects write individual CSS props (translate / scale / rotate / opacity): compositor-only.
 *  - Progress is eased (frame-rate independent) so motion glides instead of snapping to the wheel.
 *  - Off-screen effects are skipped; the loop sleeps when everything has settled.
 *  - prefers-reduced-motion: nothing registers, every element stays at its natural position.
 */
export type ScrubRange = "through" | "exit" | "always";
export interface ScrubMetrics { y: number; vh: number; top: number; h: number; vel: number }
export type ScrubFn = (p: number, c: number, m: ScrubMetrics) => void;
export interface ScrubOpts { range?: ScrubRange; smooth?: number }

interface S { track: HTMLElement; fn: ScrubFn; range: ScrubRange; smooth: number; top: number; h: number; cur: number; seen: boolean }

const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)");
const set = new Set<S>();
let raf = 0, listening = false, vh = 0, lastY = 0, lastT = 0, vel = 0, queued = false;

const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function measure() {
  queued = false;
  vh = window.innerHeight;
  const y = window.scrollY;
  for (const s of set) {
    const r = s.track.getBoundingClientRect();
    s.top = r.top + y;
    s.h = r.height;
  }
  wake();
}
function queueMeasure() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(measure);
}

function frame(t: number) {
  raf = 0;
  const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
  lastT = t;
  const y = window.scrollY;
  vel += (((y - lastY) / Math.max(dt * 1000, 1)) - vel) * (1 - Math.exp(-dt * 9)); // px/ms, smoothed
  lastY = y;
  let moving = Math.abs(vel) > 0.02;

  for (const s of set) {
    let p: number, inRange: boolean;
    if (s.range === "always") { p = 0; inRange = true; }
    else if (s.range === "exit") { p = clamp((y - s.top) / Math.max(1, s.h)); inRange = y < s.top + s.h + vh; }
    else { p = clamp((y + vh - s.top) / (vh + s.h)); inRange = y + vh > s.top - 120 && y < s.top + s.h + 120; }

    if (!inRange) { s.cur = p; s.seen = false; continue; }
    if (!s.seen) { s.cur = p; s.seen = true; } // enter without gliding from a stale value
    const d = p - s.cur;
    if (Math.abs(d) > 0.0004) { s.cur += d * (1 - Math.exp(-dt * s.smooth)); moving = true; } else s.cur = p;
    s.fn(s.cur, s.cur * 2 - 1, { y, vh, top: s.top, h: s.h, vel });
  }
  if (moving) raf = requestAnimationFrame(frame);
}
function wake() {
  if (!raf && set.size) { lastT = performance.now(); raf = requestAnimationFrame(frame); }
}
function start() {
  if (listening) return;
  listening = true;
  lastY = window.scrollY;
  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", queueMeasure, { passive: true });
  window.addEventListener("load", queueMeasure);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(queueMeasure).observe(document.body);
}

export function registerScrub(track: HTMLElement, fn: ScrubFn, opts: ScrubOpts = {}): () => void {
  if (typeof window === "undefined" || reduce?.matches) return () => {};
  start();
  const s: S = { track, fn, range: opts.range ?? "through", smooth: opts.smooth ?? 12, top: 0, h: 0, cur: 0, seen: false };
  set.add(s);
  queueMeasure();
  return () => { set.delete(s); };
}
