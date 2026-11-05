import { useEffect, useRef } from "react";
import { ScrubFn, ScrubOpts, registerScrub } from "./scrub";

/** Returns a ref for the TRACK element (the non-moving wrapper whose position drives progress). */
export function useScrub<T extends HTMLElement = HTMLDivElement>(fn: ScrubFn, opts: ScrubOpts = {}) {
  const ref = useRef<T>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (!ref.current) return;
    return registerScrub(ref.current, (p, c, m) => fnRef.current(p, c, m), opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.range, opts.smooth]);
  return ref;
}

/** viewport bucket used to tone motion down on small screens (0 = phone, 1 = tablet, 2 = desktop) */
export const bucket = () => (window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 1 : 2);
