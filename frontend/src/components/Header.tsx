import { useRef, useEffect } from "react";

interface HeaderProps {
  version: string;
  hasUpdate: boolean;
  releaseDate?: string | null;
}

export function Header({}: HeaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap    = wrapperRef.current;
    const halo    = haloRef.current;
    const shimmer = shimmerRef.current;
    if (!wrap || !halo) return;

    function onMouseMove(e: MouseEvent) {
      if (!wrap || !halo) return;
      const r  = wrap.getBoundingClientRect();
      const x  = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const y  = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);

      // CSS transition on the element handles all smoothing — no RAF needed
      halo.style.transform = `translate(${x * 18}px, ${y * 10}px)`;

      if (shimmer) {
        const sx = 50 + x * 30;
        const sy = 50 + y * 30;
        shimmer.style.background = `radial-gradient(ellipse 55% 45% at ${sx}% ${sy}%, rgba(200,140,255,0.12) 0%, transparent 68%)`;
      }
    }

    function onMouseEnter() {
      if (halo) halo.style.opacity = "1";
    }

    function onMouseLeave() {
      if (halo) {
        halo.style.transform = "translate(0px, 0px)";
        halo.style.opacity   = "0";
      }
      if (shimmer) shimmer.style.background = "none";
    }

    wrap.addEventListener("mousemove",  onMouseMove);
    wrap.addEventListener("mouseenter", onMouseEnter);
    wrap.addEventListener("mouseleave", onMouseLeave);
    return () => {
      wrap.removeEventListener("mousemove",  onMouseMove);
      wrap.removeEventListener("mouseenter", onMouseEnter);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const conic = "conic-gradient(from var(--glow-angle), #f97316, #a855f7, #3b82f6, #22c55e, #f97316)";
  const spin  = "spin-glow 4s linear infinite";

  return (
    <div className="relative pt-2 pb-16 select-none flex items-center justify-center">
      {/* 3D Glowing Brand Container */}
      <div
        ref={wrapperRef}
        className="relative inline-flex group transition-transform duration-500 ease-out hover:scale-110"
      >
        {/* Drop shadow below */}
        <div
          className="absolute bottom-[-14px] left-[20%] right-[20%] h-[10px] rounded-full pointer-events-none opacity-30 group-hover:opacity-55 group-hover:bottom-[-22px] group-hover:left-[14%] group-hover:right-[14%] transition-all duration-500"
          style={{ background: conic, animation: spin, filter: "blur(10px)" }}
        />

        {/* Always-on tight ring glow */}
        <div
          className="absolute inset-[-4px] rounded-full pointer-events-none opacity-65"
          style={{ background: conic, animation: spin, filter: "blur(6px)" }}
        />

        {/* Mouse-tracking halo — CSS transition = compositor thread = zero jank */}
        <div
          ref={haloRef}
          className="absolute inset-[-6px] rounded-full pointer-events-none"
          style={{
            background:  conic,
            animation:   spin,
            filter:      "blur(14px)",
            opacity:     0,
            transform:   "translate(0px, 0px)",
            transition:  "transform 0.5s cubic-bezier(0.22, 0.68, 0, 1.2), opacity 0.35s ease",
            willChange:  "transform",
          }}
        />

        {/* Gradient border */}
        <div className="relative p-[2.5px] rounded-full" style={{ background: conic, animation: spin }}>
          <button
            className="relative flex items-center justify-center rounded-full bg-black px-8 py-[14px] cursor-pointer overflow-hidden"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {/* Top gloss */}
            <span
              className="absolute inset-x-[10%] top-0 h-[1px] rounded-full opacity-20 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
              aria-hidden="true"
            />

            {/* Inner shimmer — tracks mouse softly */}
            <span
              ref={shimmerRef}
              className="absolute inset-0 rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Brand Text */}
            <span
              className="relative z-10 text-white font-extrabold uppercase tracking-[0.2em] text-[13px] inline-block whitespace-nowrap"
              style={{
                animation: "text-3d-float 7s ease-in-out infinite",
                textShadow: [
                  "1px 1px 0px rgba(120,60,220,0.5)",
                  "2px 2px 0px rgba(100,40,200,0.35)",
                  "3px 3px 0px rgba(80,20,170,0.22)",
                  "4px 4px 6px rgba(60,10,140,0.14)",
                  "0 0 18px rgba(255,255,255,0.4)",
                  "0 0 36px rgba(180,100,255,0.18)",
                ].join(", "),
              }}
            >
              MH - DOW X (TRÌNH TẢI HÀNG LOẠT / BATCH DOWNLOADER)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}








