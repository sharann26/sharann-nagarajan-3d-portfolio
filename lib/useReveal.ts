/**
 * One shared IntersectionObserver for every reveal on the page.
 * Adds `.is-in` once, then unobserves: zero per-scroll work afterwards.
 */
const cbs = new WeakMap<Element, () => void>();
let io: IntersectionObserver | null = null;

function getIO() {
  if (io || typeof IntersectionObserver === "undefined") return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        cbs.get(e.target)?.();
        cbs.delete(e.target);
        io!.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
  );
  return io;
}

export function observeOnce(el: Element, onIn: () => void): () => void {
  const obs = getIO();
  if (!obs) {
    onIn();
    return () => {};
  }
  cbs.set(el, onIn);
  obs.observe(el);
  return () => {
    cbs.delete(el);
    obs.unobserve(el);
  };
}
