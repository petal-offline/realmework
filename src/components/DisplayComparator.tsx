import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface DisplayComparatorProps {
  onBookScreenRepair: () => void;
}

export const DisplayComparator: React.FC<DisplayComparatorProps> = ({
  onBookScreenRepair,
}) => {
  const [sliderPos, setSliderPos] = useState(54);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(6, Math.min(clientX - rect.left, rect.width - 6));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
        <div>
          <p className="text-xs font-medium text-[#6E6E73] tracking-tight">
            01 · Optical Calibration Bench · Interactive Display Comparison
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Slide to inspect OEM AMOLED screen replacement.
          </h3>
          <p className="text-sm text-[#6E6E73] mt-2 max-w-2xl leading-relaxed">
            Every screen replacement at Janakpuri Shop No. F19 uses a sealed Realme
            factory display assembly—preserving 120Hz Pro-XDR refresh rate, in-display
            optical fingerprint unlock, and original waterproof perimeter sealing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSliderPos(14)}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-black/10 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            Inspect Cracked State
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(88)}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1D1D1F] text-xs font-medium text-white hover:bg-black/85 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            Inspect OEM Replacement
          </button>
        </div>
      </div>

      {/* Interactive Split Comparison Viewport */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleMove(e.clientX)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[300px] sm:h-[390px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-black/10 bg-[#0A0A0C] touch-pan-y"
      >
        {/* RIGHT SIDE (Full Width Base): Factory-Calibrated 120Hz OEM AMOLED */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071324] via-[#0B2545] to-[#0A0A0C] flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-[540px] h-[220px] sm:h-[250px] rounded-[26px] border-[3px] border-[#60A5FA]/50 bg-gradient-to-r from-[#0051A8] via-[#0071E3] to-[#38BDF8] p-5 sm:p-6 shadow-2xl flex flex-col justify-between text-white overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(circle at 75% 30%, rgba(255,255,255,0.45), transparent 55%)',
              }}
            />
            <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono-tabular">
              <span>REALME OEM PANEL · 120Hz LTPO</span>
              <span className="hidden sm:inline">100% DCI-P3 CALIBRATED</span>
            </div>

            <div className="relative z-10 my-auto">
              <p className="text-[11px] uppercase tracking-widest text-white/80 font-mono-tabular">
                After · Factory Assembly
              </p>
              <p className="text-xl sm:text-3xl font-bold tracking-tight mt-1">
                Zero-Gap Original Display
              </p>
              <p className="text-xs text-white/90 mt-1">
                In-Display Fingerprint Optical LUT Verified · Oleophobic Glass
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono-tabular border-t border-white/20 pt-2.5">
              <span>PEAK: 4500–6000 NITS</span>
              <span>240Hz TOUCH PASS</span>
            </div>
          </div>

          <div className="hidden sm:block absolute bottom-4 right-5 text-xs font-mono-tabular text-white/90 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
            After: Genuine OEM Display Assembly
          </div>
        </div>

        {/* LEFT SIDE (Clipped by sliderPos): Fractured / Damaged Digitizer */}
        <div
          className="absolute inset-0 bg-[#141416] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="relative w-full max-w-[540px] h-[220px] sm:h-[250px] rounded-[26px] border-[3px] border-neutral-600 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-5 sm:p-6 flex flex-col justify-between text-neutral-300 overflow-hidden">
            {/* Green OLED Line & Dead Subpixel Band Simulation */}
            <div className="pointer-events-none absolute inset-y-0 left-1/3 w-[2px] bg-emerald-400/75" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-8 bg-black/75" />

            {/* Spiderweb Fracture SVG Overlay */}
            <svg
              viewBox="0 0 540 250"
              className="pointer-events-none absolute inset-0 w-full h-full stroke-white/45"
              fill="none"
            >
              <path
                d="M90,20 L145,95 L40,140 M145,95 L260,60 L340,15 M145,95 L195,220 M145,95 L310,165 L450,210 M260,60 L310,165 L250,245"
                strokeWidth="1.6"
              />
              <path
                d="M145,95 L85,235 M145,95 L15,55 M260,60 L480,85"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
              <circle cx="145" cy="95" r="8" strokeWidth="1.5" />
              <circle cx="145" cy="95" r="22" strokeWidth="1" strokeDasharray="4 2" />
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono-tabular text-neutral-400">
              <span>IMPACT FRACTURE DETECTED</span>
              <span className="hidden sm:inline">TOUCH LOSS: 42%</span>
            </div>

            <div className="relative z-10 my-auto">
              <p className="text-[11px] uppercase tracking-widest text-amber-400 font-mono-tabular">
                Before · Damaged Glass & Panel
              </p>
              <p className="text-xl sm:text-3xl font-bold tracking-tight mt-1 text-white/85">
                Cracked Glass & OLED Bleed
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Compromised moisture seal · Unresponsive edge touch zones
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono-tabular border-t border-white/10 pt-2.5 text-neutral-400">
              <span>BIOMETRICS: BLOCKED</span>
              <span>REPLACEMENT: 45–60 MINS</span>
            </div>
          </div>

          <div className="hidden sm:block absolute bottom-4 left-5 text-xs font-mono-tabular text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
            Before: Fractured Digitizer & OLED
          </div>
        </div>

        {/* Vertical Drag Divider Line & 44px Touch Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#1D1D1F] shadow-xl flex items-center justify-center border border-black/10">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Dedicated Mobile-Friendly Precision Range Scrubber */}
      <div className="mt-4 flex items-center gap-3 px-1">
        <span className="text-[11px] font-mono-tabular text-[#6E6E73] whitespace-nowrap shrink-0">
          Cracked
        </span>
        <input
          type="range"
          min={5}
          max={95}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label="Comparison slider between cracked display and OEM replacement"
          className="w-full h-2 bg-[#E8E8ED] rounded-lg appearance-none cursor-pointer accent-[#0066CC]"
        />
        <span className="text-[11px] font-mono-tabular text-[#0066CC] font-semibold whitespace-nowrap shrink-0">
          OEM Calibrated ({100 - sliderPos}%)
        </span>
      </div>

      {/* Bottom Metric Strip & Action */}
      <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6E6E73]">
          <span className="font-semibold text-[#1D1D1F]">
            Same-Day Turnaround: 45–60 Mins
          </span>
          <span aria-hidden="true">·</span>
          <span>Original Mid-Frame Included</span>
          <span aria-hidden="true">·</span>
          <span>Zero Data Wipe Required</span>
        </div>

        <button
          type="button"
          onClick={onBookScreenRepair}
          className="min-h-[44px] px-5 py-3 rounded-xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-xs font-medium text-white transition-all whitespace-nowrap shrink-0"
        >
          Reserve Express Screen Replacement
        </button>
      </div>
    </div>
  );
};
