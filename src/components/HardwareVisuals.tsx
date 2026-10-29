import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface HeroHardwareVisualProps {
  onSelectService: (serviceId: 'screen' | 'audio-express' | 'battery') => void;
}

export const HeroHardwareStudioVisual: React.FC<HeroHardwareVisualProps> = ({
  onSelectService,
}) => {
  const [isExploded, setIsExploded] = useState(true);
  const [activeLayer, setActiveLayer] = useState<'glass' | 'oled' | 'chassis'>('oled');

  const layerSpecs = {
    glass: {
      code: '01',
      shortLabel: '01. Gorilla Glass Shield',
      title: 'Corning Gorilla Glass & Oleophobic Optical Shield',
      spec: '0.55mm chemically strengthened aluminosilicate glass · Dust-free optical OCA lamination',
      metric: '9H Surface Hardness · Factory Hydrophobic Seal',
      badge: 'OCA VACUUM BONDED',
    },
    oled: {
      code: '02',
      shortLabel: '02. 120Hz LTPO AMOLED',
      title: '120Hz Pro-XDR AMOLED Panel & Optical Biometrics',
      spec: '10-bit factory color LUT calibration · Integrated under-display fingerprint scanner flex',
      metric: 'Delta-E < 0.8 Accuracy · 2160Hz PWM Dimming',
      badge: 'BIOMETRIC LUT SYNCED',
    },
    chassis: {
      code: '03',
      shortLabel: '03. CNC Frame & Power',
      title: 'Brushed Titanium-Alloy Frame & Dual-Cell SuperVOOC Bay',
      spec: 'Pre-applied IP65 perimeter waterproof seal · Copper vapor chamber thermal dissipation',
      metric: '45–60 Min Complete Assembly Turnaround',
      badge: 'IP65 SEAL INCLUDED',
    },
  };

  return (
    <div className="relative h-full w-full rounded-3xl bg-[#0A0A0C] border border-white/10 p-5 sm:p-8 flex flex-col justify-between overflow-hidden text-white select-none shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
      {/* Animated Studio Ambient Glow */}
      <motion.div
        animate={{
          opacity: [0.75, 1, 0.75],
          scale: [0.98, 1.03, 0.98],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 55% 40%, rgba(0, 113, 227, 0.28) 0%, rgba(56, 189, 248, 0.08) 42%, transparent 72%)',
        }}
      />

      {/* Top Studio Header & 21st.dev Sliding Mode Switch */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-[11px] sm:text-xs text-[#86868B] font-mono-tabular">
            JANAKPURI CLEANBENCH · INTERACTIVE CAD ARCHITECTURE
          </p>
          <h3 className="text-base sm:text-lg font-semibold text-white mt-0.5 tracking-tight">
            Tap any hardware layer to inspect OEM tolerances
          </h3>
        </div>

        {/* 44px Touch-Friendly Segmented Switch */}
        <div className="flex items-center gap-1 rounded-xl bg-white/[0.07] p-1 border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsExploded(true)}
            className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isExploded ? 'text-white' : 'text-[#A1A1A6] hover:text-white'
            }`}
          >
            {isExploded && (
              <motion.div
                layoutId="heroExplodeToggle"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-lg bg-[#0066CC]"
              />
            )}
            <span className="relative z-10">Exploded View</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExploded(false)}
            className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              !isExploded ? 'text-white' : 'text-[#A1A1A6] hover:text-white'
            }`}
          >
            {!isExploded && (
              <motion.div
                layoutId="heroExplodeToggle"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-lg bg-[#0066CC]"
              />
            )}
            <span className="relative z-10">Sealed Assembly</span>
          </button>
        </div>
      </div>

      {/* Center Interactive 3-Layer Hardware Stack */}
      <div className="relative z-10 my-4 sm:my-6 flex flex-col xl:flex-row items-center justify-between gap-6">
        {/* Isometric Hardware SVG Stage with Continuous Floating Physics */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full xl:w-7/12 h-[230px] sm:h-[270px] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 500 300"
            className="w-full h-full max-h-[270px] overflow-visible"
            aria-label="Interactive 3-layer exploded smartphone display and chassis architecture"
          >
            <defs>
              <linearGradient id="titaniumFrame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#323238" />
                <stop offset="50%" stopColor="#1D1D22" />
                <stop offset="100%" stopColor="#101014" />
              </linearGradient>
              <linearGradient id="amoledGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0077ED" stopOpacity="0.95" />
                <stop offset="52%" stopColor="#00458B" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#081426" stopOpacity="0.96" />
              </linearGradient>
              <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
                <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Vertical Alignment Axis */}
            <g stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" strokeWidth="1">
              <line x1="250" y1="18" x2="250" y2="282" />
              <line x1="95" y1="155" x2="405" y2="155" />
            </g>

            {/* LAYER 3 (Bottom): CNC Titanium Mid-Frame & Dual-Cell Battery */}
            <motion.g
              initial={false}
              animate={{
                y: isExploded ? 52 : 4,
                scale: activeLayer === 'chassis' ? 1.03 : 1,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={() => setActiveLayer('chassis')}
              className="cursor-pointer"
            >
              <polygon
                points="250,115 405,175 250,235 95,175"
                fill="url(#titaniumFrame)"
                stroke={activeLayer === 'chassis' ? '#38BDF8' : 'rgba(255,255,255,0.28)'}
                strokeWidth={activeLayer === 'chassis' ? '2.2' : '1.2'}
              />
              {/* 3D Machined Sidewalls */}
              <polygon
                points="95,175 250,235 250,250 95,190"
                fill="#18181C"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.8"
              />
              <polygon
                points="405,175 250,235 250,250 405,190"
                fill="#101014"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.8"
              />
              {/* Dual-Cell SuperVOOC Battery & Vapor Chamber */}
              <polygon
                points="245,134 335,169 255,201 165,166"
                fill="#0284C7"
                fillOpacity="0.28"
                stroke="#38BDF8"
                strokeWidth="1.2"
              />
              <polygon
                points="205,178 255,198 225,210 175,190"
                fill="#D97706"
                fillOpacity="0.4"
                stroke="#FBBF24"
                strokeWidth="1"
              />
            </motion.g>

            {/* LAYER 2 (Middle): 120Hz LTPO AMOLED Display Module */}
            <motion.g
              initial={false}
              animate={{
                y: 0,
                scale: activeLayer === 'oled' ? 1.04 : 1,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={() => setActiveLayer('oled')}
              className="cursor-pointer"
            >
              <polygon
                points="250,95 405,155 250,215 95,155"
                fill="url(#amoledGlow)"
                stroke={activeLayer === 'oled' ? '#60A5FA' : 'rgba(255,255,255,0.38)'}
                strokeWidth={activeLayer === 'oled' ? '2.2' : '1.2'}
              />
              {/* Optical In-Display Fingerprint Sensor Target */}
              <ellipse
                cx="215"
                cy="168"
                rx="18"
                ry="10"
                fill="rgba(96, 165, 250, 0.15)"
                stroke="#93C5FD"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
              <circle cx="215" cy="168" r="3.5" fill="#FFFFFF" />
              {/* Internal Display Flex Ribbon */}
              <polyline
                points="280,140 315,154 295,164"
                fill="none"
                stroke="#93C5FD"
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />
            </motion.g>

            {/* LAYER 1 (Top): Corning Gorilla Glass + Oleophobic Shield */}
            <motion.g
              initial={false}
              animate={{
                y: isExploded ? -52 : -4,
                scale: activeLayer === 'glass' ? 1.03 : 1,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={() => setActiveLayer('glass')}
              className="cursor-pointer"
            >
              <polygon
                points="250,75 405,135 250,195 95,135"
                fill="url(#glassSheen)"
                stroke={activeLayer === 'glass' ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}
                strokeWidth={activeLayer === 'glass' ? '2.2' : '1.2'}
              />
              {/* Specular Highlight Line */}
              <line
                x1="150"
                y1="118"
                x2="265"
                y2="92"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Micro-Acoustic Earpiece Slit */}
              <line
                x1="302"
                y1="104"
                x2="326"
                y2="113"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* Interactive Layer Selector Cards (Minimum 44px Touch Height) */}
        <div className="w-full xl:w-5/12 flex flex-col gap-2.5">
          {(['glass', 'oled', 'chassis'] as const).map((layerKey) => {
            const isSelected = activeLayer === layerKey;
            const info = layerSpecs[layerKey];
            return (
              <button
                key={layerKey}
                type="button"
                onClick={() => setActiveLayer(layerKey)}
                className={`w-full min-h-[52px] text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 active:scale-[0.99] ${
                  isSelected
                    ? 'bg-white/[0.11] border-[#0071E3] text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-[#A1A1A6] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold tracking-tight text-white">
                    {info.shortLabel}
                  </span>
                  <span className="font-mono-tabular text-[10px] tracking-wider text-[#60A5FA]">
                    {info.badge}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-[#D1D1D6] mt-2 leading-relaxed">
                        {info.spec}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Quick-Action Hardware Strip */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-[#A1A1A6]">
          <span className="text-white font-medium">{layerSpecs[activeLayer].metric}</span>
          <span className="mx-2 text-white/30">·</span>
          <span>90-Day Official Realme Warranty</span>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectService('screen')}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-xs font-medium text-white transition-all whitespace-nowrap shrink-0 flex items-center justify-center"
          >
            Price Screen Repair
          </button>
          <button
            type="button"
            onClick={() => onSelectService('audio-express')}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-xs font-medium text-white transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-1"
          >
            <span>15-Min Airbuds Fix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const AirbudsAcousticVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'acoustic' | 'contacts'>('acoustic');

  return (
    <div className="rounded-2xl bg-[#0A0A0C] border border-white/10 p-4 sm:p-5 text-white">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-xs text-[#A1A1A6] truncate">
          Express Desk · Buds Air & Wireless
        </span>
        <div className="flex items-center gap-1 bg-white/[0.07] p-1 rounded-xl border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setMode('acoustic')}
            className={`min-h-[32px] px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              mode === 'acoustic' ? 'bg-[#0066CC] text-white' : 'text-[#86868B] hover:text-white'
            }`}
          >
            11mm Driver
          </button>
          <button
            type="button"
            onClick={() => setMode('contacts')}
            className={`min-h-[32px] px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              mode === 'contacts' ? 'bg-[#0066CC] text-white' : 'text-[#86868B] hover:text-white'
            }`}
          >
            Pogo Pins
          </button>
        </div>
      </div>

      {/* Precision SVG Cutaway of Wireless Earbud */}
      <div className="relative h-44 flex items-center justify-center bg-[#121216] rounded-xl border border-white/[0.06] overflow-hidden px-3">
        <svg viewBox="0 0 360 150" className="w-full h-full max-h-40">
          {/* Animated Acoustic Wave Rings */}
          {mode === 'acoustic' && (
            <g stroke="#0071E3" fill="none">
              <circle cx="115" cy="72" r="30" strokeOpacity="0.55" strokeWidth="1.5" />
              <circle
                cx="115"
                cy="72"
                r="46"
                strokeOpacity="0.3"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx="115" cy="72" r="62" strokeOpacity="0.15" strokeWidth="1" />
            </g>
          )}

          {/* Earbud Housing Silhouette */}
          <path
            d="M85,52 C85,34 115,28 142,38 C164,46 175,62 175,85 L175,126 C175,133 163,137 155,132 L155,88 C135,94 112,92 95,80 C87,74 85,63 85,52 Z"
            fill="#1E1E24"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          {/* Silicone Ear Tip */}
          <ellipse
            cx="76"
            cy="64"
            rx="14"
            ry="22"
            fill="#27272F"
            stroke="#60A5FA"
            strokeWidth="1.2"
          />
          {/* Coaxial Dual Driver Coil */}
          <circle
            cx="122"
            cy="64"
            r="16"
            fill={mode === 'acoustic' ? 'rgba(0,113,227,0.4)' : 'rgba(255,255,255,0.08)'}
            stroke="#60A5FA"
            strokeWidth="1.5"
          />
          <circle cx="122" cy="64" r="6" fill="#60A5FA" />

          {/* Gold Charging Pogo Contacts at Bottom of Stem */}
          <rect
            x="157"
            y="122"
            width="16"
            height="8"
            rx="3"
            fill={mode === 'contacts' ? '#F59E0B' : '#A1A1A6'}
          />
          {mode === 'contacts' && (
            <circle
              cx="165"
              cy="126"
              r="16"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
          )}

          {/* Technical Callouts */}
          <line
            x1="138"
            y1="56"
            x2="200"
            y2="42"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
          <text x="205" y="45" fill="#FFFFFF" fontSize="10.5" fontFamily="JetBrains Mono">
            Coaxial Titanium Driver
          </text>

          <line
            x1="173"
            y1="126"
            x2="200"
            y2="118"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
          <text x="205" y="121" fill="#60A5FA" fontSize="10.5" fontFamily="JetBrains Mono">
            Ultrasonic Pogo Clean
          </text>
        </svg>
      </div>

      <p className="text-xs text-[#A1A1A6] mt-3 leading-relaxed">
        {mode === 'acoustic'
          ? 'Fixes one-side low volume, ANC mic static, and L/R Bluetooth desynchronization in 10–15 minutes.'
          : 'Ultrasonic isopropyl bath removes sweat oxidation from charging pins so both buds charge at 100%.'}
      </p>
    </div>
  );
};
