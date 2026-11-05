import React from "react";

/** Periodic-element tile from code.md (atomic no. + symbol). Fills on hover of any `.group` ancestor. */
export const Tile: React.FC<{ no: string; sym: string; big?: boolean; className?: string }> = ({ no, sym, big, className = "" }) => (
  <div
    aria-hidden
    className={`relative flex shrink-0 flex-col justify-between border border-g bg-lowest text-g transition-all group-hover:bg-g group-hover:text-fg ${big ? "h-12 w-12 p-2" : "h-9 w-9 p-1"} ${className}`}
  >
    <span className="font-mono text-[7px] font-bold leading-none">{no}</span>
    <span className="text-center font-mono text-sm font-black leading-none">{sym}</span>
  </div>
);
