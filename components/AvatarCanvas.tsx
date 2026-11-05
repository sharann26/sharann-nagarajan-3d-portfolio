import React from "react";

interface AvatarCanvasProps {
  theme: "dark" | "light";
  /** hero scroll effect hooks (optional) */
  imgRef?: React.Ref<HTMLImageElement>;
}

/** SPECIMEN panel from code.md. The portrait swaps with the active theme (dark/light asset). */
const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ theme, imgRef }) => {
  // Use a professional image with themed variants (you can replace these with actual image paths)
  const PROFILE_IMAGE = `images/profile-${theme}.png`;

  const corner = "absolute h-3 w-3 border-g";
  return (
    <div className="crosshair-corner relative">
      <div className="lab-panel p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-g" />
            <span className="font-bold tracking-wider text-hi">
              SPECIMEN // SHARANN
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase text-mute">
            {theme === "dark" ? "LAB [DRK]" : "DESERT [LGT]"}
          </span>
        </div>

        <div className="group relative overflow-hidden border border-line2 bg-lowest">
          <img
            ref={imgRef}
            src={PROFILE_IMAGE}
            alt="Portrait of Sharann - Software Architect"
            className="hover-gray h-full w-full object-cover object-top contrast-[1.15] transition-all duration-700 group-hover:scale-105 group-hover:grayscale"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-lowest via-transparent to-transparent opacity-70"
          />
          <span
            aria-hidden
            className={`${corner} left-2 top-2 border-l-2 border-t-2`}
          />
          <span
            aria-hidden
            className={`${corner} right-2 top-2 border-r-2 border-t-2`}
          />
          <span
            aria-hidden
            className={`${corner} bottom-2 left-2 border-b-2 border-l-2`}
          />
          <span
            aria-hidden
            className={`${corner} bottom-2 right-2 border-b-2 border-r-2`}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between border border-line bg-surf/90 p-2.5 font-mono backdrop-blur-md">
            <div>
              <div className="font-headline text-xs font-bold tracking-wide text-hi">
                Sharann Nagarajan
              </div>
              <div className="text-[10px] text-g">SDE 3 @ IQVIA</div>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-a">
              Chennai, India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCanvas;
