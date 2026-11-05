import React, { useRef } from "react";
import { bucket, useScrub } from "../../lib/useScrub";

/**
 * Depth lane: the card drifts vertically against the scroll, so neighbouring columns
 * slide past each other (alternate signs per column). amps = [phone, tablet, desktop] in px.
 * Same-column cards share one amplitude, so cards never collide.
 */
export const Depth: React.FC<{ amps: [number, number, number]; className?: string; children: React.ReactNode }> = ({
  amps,
  className = "",
  children,
}) => {
  const inner = useRef<HTMLDivElement>(null);
  const ref = useScrub((_p, c) => {
    if (inner.current) inner.current.style.translate = `0px ${(c * amps[bucket()]).toFixed(1)}px`;
  });
  return (
    <div ref={ref} className={className}>
      <div ref={inner} className="h-full">
        {children}
      </div>
    </div>
  );
};
