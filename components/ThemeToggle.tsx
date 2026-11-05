import React from "react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

/** LAB [DRK] / DESERT [LGT] segmented switch (kept from the previous build; restyled with code.md tokens). */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const base = "flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors";
  const lab = theme === "dark";
  return (
    <div role="group" aria-label="Theme" className="flex border border-line bg-lowest p-0.5">
      <button type="button" aria-pressed={lab} onClick={() => !lab && toggleTheme()} className={`${base} ${lab ? "bg-low text-g" : "text-mute hover:text-hi"}`}>
        <span className={`inline-block h-1.5 w-1.5 ${lab ? "bg-g shadow-[0_0_8px_#00ff66]" : "bg-line2"}`} />
        LAB<span className="hidden sm:inline"> [DRK]</span>
      </button>
      <button type="button" aria-pressed={!lab} onClick={() => lab && toggleTheme()} className={`${base} ${!lab ? "bg-a text-fg" : "text-mute hover:text-hi"}`}>
        DESERT<span className="hidden sm:inline"> [LGT]</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
