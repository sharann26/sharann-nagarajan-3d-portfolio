import React, { useEffect, useLayoutEffect, useRef } from "react";
import { observeOnce } from "../../lib/useReveal";

/**
 * Animates the leading integer of a string ("7+" → 0…7 then "+"). The string
 * itself still comes from calculateExperience(); this only animates its display.
 */
export const CountUp: React.FC<{ value: string; className?: string; ms?: number }> = ({
  value,
  className = "",
  ms = 1400,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const m = /^(\d+)(.*)$/.exec(value);
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (m && !reduce && ref.current) ref.current.textContent = `0${m[2]}`;
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || reduce) return;
    const end = parseInt(m[1], 10);
    return observeOnce(el, () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / ms);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = `${Math.round(end * eased)}${m[2]}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};
