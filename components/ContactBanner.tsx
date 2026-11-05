import React from "react";
import { CONTACT_INFO } from "../constants";
import { useScrub } from "../lib/useScrub";
import { Reveal } from "./ui/Reveal";

// "+918248947601" -> "+91 82489 47601"
const prettyPhone = (p: string) =>
  `${p.slice(0, 3)} ${p.slice(3, 8)} ${p.slice(8)}`;

/** Yellow "Better Call Sharann" banner from code.md. It lands with a slight rotate + scale as it scrolls in. */
const ContactBanner: React.FC = () => {
  const card = React.useRef<HTMLDivElement>(null);
  const ref = useScrub<HTMLElement>((p) => {
    const k = Math.min(1, p * 2.2);
    if (card.current) {
      card.current.style.scale = (0.9 + 0.1 * k).toFixed(3);
      card.current.style.rotate = `${(-2.5 * (1 - k)).toFixed(2)}deg`;
    }
  });
  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6"
    >
      <Reveal>
        <div
          ref={card}
          className="relative flex flex-col items-center justify-between gap-8 overflow-hidden border-4 border-[#F8D12C] bg-[#120F0A] p-6 text-[#F4EFE0] shadow-[8px_8px_0px_#E11D2E] sm:p-8 md:flex-row"
        >
          {/* hazard-yellow sun-burst behind the lettering */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#F8D12C]/10 blur-3xl"
          />

          <div className="relative flex items-center gap-4 sm:gap-6">
            <div className="relative flex h-12 w-12 shrink-0 flex-col justify-between border-2 border-red-600 bg-[#0e0e0e] p-2 text-[#F8D12C] shadow-2xl">
              <span className="-mt-1 font-mono text-[9px] font-bold leading-none text-red-500">
                35
              </span>
              <span className="text-center text-lg leading-none">Br</span>
            </div>
            <div>
              {/* two-line lockup: small yellow "Better Call" over a big red "Sharann!" */}
              <h2 className="mb-3 flex items-center gap-3 sm:gap-4">
                <span className="flex flex-col leading-none">
                  <span className="-rotate-3 self-start pl-1 font-script1 text-3xl tracking-wide text-[#F8D12C] sm:text-4xl md:text-5xl">
                    Better Call
                  </span>
                  <span
                    className="-mt-1 -rotate-3 font-brush text-6xl text-[#FF3B3B] sm:text-7xl md:text-8xl"
                    style={{
                      WebkitTextStroke: "2.5px #FF3B3B",
                      textShadow: "3px 3px 0 #7A0F16",
                      paintOrder: "stroke fill",
                    }}
                  >
                    Sharann
                  </span>
                </span>
              </h2>
              <p className="text-sm font-medium leading-relaxed text-[#F4EFE0] sm:text-base">
                Angular app throwing expression errors? RxJS memory leaks
                crashing your node processes? Complex micro-frontends stalling?
                You don't need a regular coder...{" "}
                <span className="mt-1 inline-block bg-[#F8D12C] px-2 py-0.5 font-black uppercase italic tracking-wide text-black">
                  You need a criminally good Angular &amp; Frontend Architect.
                </span>
              </p>
            </div>
          </div>
          <div className="relative flex w-full shrink-0 items-center justify-end gap-3 md:w-auto">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-black bg-[#F8D12C] px-6 py-4 font-headline text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#E11D2E] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white md:w-auto"
            >
              <span className="text-sm font-black tracking-widest">
                {prettyPhone(CONTACT_INFO.phone)}
              </span>
              <span className="font-mono text-[9px] font-bold tracking-widest">
                CALL: 24/7 EMERGENCY REFACTORING
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactBanner;
