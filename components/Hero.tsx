import { Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import React, { useRef } from "react";
import { CONTACT_INFO } from "../constants";
import { bucket, useScrub } from "../lib/useScrub";
import AvatarCanvas from "./AvatarCanvas";
import { Reveal } from "./ui/Reveal";

const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp.replace("+", "")}`;
const fill =
  "border border-c bg-c text-fg shadow-[2px_2px_0px_#000] hover:bg-hovbg hover:text-hovfg";

/**
 * Hero parallax (scrubbed over the hero's own height, p: 0 → 1):
 *   headline line 1 slides left, line 2 slides right (the words pull apart)
 *   quote + buttons rise faster than the page, the specimen card lags behind and tilts,
 *   the portrait zooms inside its frame.
 */
const Hero: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  const btns = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const ref = useScrub<HTMLElement>(
    (p) => {
      const k = [0.35, 0.7, 1][bucket()];
      if (l1.current) {
        l1.current.style.translate = `${(-p * 220 * k).toFixed(1)}px 0px`;
        l1.current.style.opacity = String(1 - p * 0.7);
      }
      if (l2.current) {
        l2.current.style.translate = `${(p * 220 * k).toFixed(1)}px 0px`;
        l2.current.style.opacity = String(1 - p * 0.7);
      }
      if (quote.current)
        quote.current.style.translate = `0px ${(-p * 60 * k).toFixed(1)}px`;
      if (btns.current)
        btns.current.style.translate = `0px ${(-p * 110 * k).toFixed(1)}px`;
      if (card.current) {
        card.current.style.translate = `0px ${(p * 130 * k).toFixed(1)}px`;
        card.current.style.rotate = `${(p * 3 * k).toFixed(2)}deg`;
      }
      if (img.current) img.current.style.scale = String(1 + p * 0.14);
    },
    { range: "exit" },
  );

  return (
    <section
      id="overview"
      ref={ref}
      className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-8">
          <h1 className="mb-6 font-headline text-5xl font-black uppercase leading-[0.92] tracking-tighter text-hi sm:text-6xl md:text-7xl lg:text-8xl">
            <div ref={l1}>
              <Reveal as="span" className="inline-block pb-1">
                I AM THE ONE
              </Reveal>
            </div>
            <div ref={l2}>
              <Reveal
                as="span"
                delay={2}
                className="mt-1 inline-block border-b-4 border-a pb-1 text-g sm:mt-2 sm:border-b-[6px]"
              >
                WHO CODES.
              </Reveal>
            </div>
          </h1>

          <div ref={quote}>
            <Reveal
              delay={3}
              className="relative mb-6 border border-l-4 border-line border-l-g bg-surf p-6 shadow-2xl sm:p-7"
            >
              <p className="mb-4 font-mono text-base leading-relaxed text-txt sm:text-lg">
                "You clearly do not know who you are speaking to. When a change
                detection cycle runs and a component loses its reference, you
                think my application crashes? No. I am the one who builds the
                zone that triggers the updates."
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-mono text-xs">
                <div className="font-bold uppercase tracking-widest text-mute">
                  SPEC: ZERO-LAG INTERFACES
                </div>
                <div className="bg-g px-3 py-1 text-[11px] font-black uppercase tracking-wider text-fg">
                  PURITY CERTIFIED
                </div>
              </div>
            </Reveal>
          </div>

          <div ref={btns}>
            <Reveal delay={4}>
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 font-headline text-xs font-black uppercase tracking-wider transition-all ${fill}`}
                >
                  <Phone size={16} strokeWidth={2.5} /> CALL ME
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-g bg-g px-4 py-3.5 font-headline text-xs font-black uppercase tracking-wider text-fg shadow-[2px_2px_0px_#000] transition-all hover:bg-hovbg hover:text-hovfg"
                >
                  <MessageCircle size={16} strokeWidth={2.5} /> WHATSAPP
                </a>
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-line bg-low px-4 py-3.5 font-headline text-xs font-bold uppercase tracking-wider text-hi transition-all hover:border-g hover:text-g"
                >
                  <Linkedin size={16} /> LINKEDIN
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center justify-center gap-2 border border-line bg-low px-4 py-3.5 font-headline text-xs font-bold uppercase tracking-wider text-hi transition-all hover:border-g hover:text-g"
                >
                  <Mail size={16} /> EMAIL
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-xs text-mute">
                <div className="flex items-center gap-2 text-txt">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-g" />{" "}
                  Sharann • SDE 3 @ IQVIA
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div ref={card} className="relative lg:col-span-4">
          <Reveal from="scale" delay={2}>
            <AvatarCanvas theme={theme} imgRef={img} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
