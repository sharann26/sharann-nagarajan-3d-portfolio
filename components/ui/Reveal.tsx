import React, { useEffect, useRef } from "react";
import { observeOnce } from "../../lib/useReveal";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  /** stagger step (each unit = 90 ms) */
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
}

/** Fade-in-up (or left/right/scale) when scrolled into view. Pure CSS transition. */
export const Reveal: React.FC<RevealProps> = ({
  as: Tag = "div",
  delay = 0,
  from = "up",
  className = "",
  style,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => el.classList.add("is-in"));
  }, []);
  const T = Tag as any;
  return (
    <T
      ref={ref}
      data-from={from === "up" ? undefined : from}
      className={`reveal ${className}`}
      style={{ ...style, ["--d" as any]: delay }}
      {...rest}
    >
      {children}
    </T>
  );
};

/** Headline that slides up word by word. `lines` keeps explicit line breaks. */
export const RevealWords: React.FC<{
  lines: string[];
  className?: string;
  lineClassName?: (i: number) => string;
  wordClassName?: string;
  baseDelayMs?: number;
}> = ({ lines, className = "", lineClassName, wordClassName = "", baseDelayMs = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => el.classList.add("is-in"));
  }, []);
  let n = 0;
  return (
    <span ref={ref} className={className} style={{ ["--base" as any]: `${baseDelayMs}ms` }}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${lineClassName?.(li) ?? ""}`}>
          {line.split(" ").map((w, wi) => (
            <span key={wi} className="rw-mask mr-[0.22em] last:mr-0">
              <span className={`rw-word ${wordClassName}`} style={{ ["--i" as any]: n++ }}>
                {w}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
