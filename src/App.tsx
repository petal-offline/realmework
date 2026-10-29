/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BUSINESS_INFO,
  OPERATING_HOURS,
  RATING_DISTRIBUTION,
  GOOGLE_REVIEWS,
  WAYFINDING_STEPS,
  DEVICE_MODELS,
  REPAIR_SERVICES,
  RepairServiceOption,
} from './data/serviceData';
import { SpotlightCard } from './components/SpotlightCard';
import {
  HeroHardwareStudioVisual,
  AirbudsAcousticVisualizer,
} from './components/HardwareVisuals';
import { DisplayComparator } from './components/DisplayComparator';
import {
  RepairEstimator,
  SelectedRepairQuote,
  getServicePriceForModel,
} from './components/RepairEstimator';
import { RepairTracker } from './components/RepairTracker';
import { BookingModal, WalkInBookingRecord } from './components/BookingModal';
import {
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Phone,
  MapPin,
  Star,
  ChevronRight,
  ChevronDown,
  Trash2,
  Wrench,
  Calculator,
  Activity,
  CalendarPlus,
} from 'lucide-react';

const STORAGE_KEY_BOOKINGS = 'realme_janakpuri_bookings_v1';

const SERVICE_FAQS = [
  {
    q: 'Will my photos or personal data be wiped during a screen or battery replacement?',
    a: 'No. At Janakpuri Shop No. F19, screen replacements, battery swaps, and charging port repairs are performed without factory-resetting your device. We use Realme UI Maintenance Mode so your personal data stays encrypted and untouched.',
  },
  {
    q: 'How does the 10–15 minute Airbuds & audio express resolution work?',
    a: 'Walk in with your Realme Buds Air, Buds T-Series, or Wireless neckband along with your charging case. Our express audio desk performs ultrasonic pogo-pin de-oxidation, acoustic mesh cleaning, L/R firmware re-pairing, or an instant under-warranty unit swap in 10–15 minutes.',
  },
  {
    q: 'Exactly how do I find Shop No. F19 inside Janakpuri District Center?',
    a: 'Exit Janakpuri West Metro Station (Gate 3) right next to Unity One Mall. Walk 80 meters into the Janakpuri District Center plaza to DDA Building, Plot No. 7A. Take the stairs or lift to the First Floor (F-Block corridor) and enter Shop No. F19.',
  },
  {
    q: 'Do I need to pay online to reserve a Priority Walk-In Slot?',
    a: 'Never. Generating a Priority Walk-In Token on this website is 100% free and reserves your place in the Shop No. F19 counter queue. You only pay at the reception desk after your device inspection or repair is complete.',
  },
];

export default function App() {
  // Estimator state
  const [selectedSeries, setSelectedSeries] = useState<
    'gt' | 'number' | 'narzo' | 'audio' | 'c-series'
  >('number');
  const [selectedModelId, setSelectedModelId] = useState<string>('13-pro-plus');
  const [selectedServiceIds, setSelectedServiceIds] = useState<
    Array<RepairServiceOption['id']>
  >(['screen']);

  // Review filter & FAQ state
  const [reviewFilter, setReviewFilter] = useState<string>('All');
  const [showOriginalGoogleListing, setShowOriginalGoogleListing] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeMobileSection, setActiveMobileSection] = useState<string>('capabilities');

  // Copy address feedback
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  // Facility image load fallback state
  const [facilityImgError, setFacilityImgError] = useState<boolean>(false);
  const [reviewImgError, setReviewImgError] = useState<boolean>(false);
  const [hoursImgError, setHoursImgError] = useState<boolean>(false);

  // Booking Modal & Active Pass state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [prefilledQuote, setPrefilledQuote] = useState<SelectedRepairQuote | null>(null);
  const [activeBookings, setActiveBookings] = useState<WalkInBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(activeBookings));
    } catch {
      // Ignore storage quota errors
    }
  }, [activeBookings]);

  const handleSelectSeries = (series: 'gt' | 'number' | 'narzo' | 'audio' | 'c-series') => {
    setSelectedSeries(series);
    const firstModelInSeries = DEVICE_MODELS.find((m) => m.series === series);
    if (firstModelInSeries) {
      setSelectedModelId(firstModelInSeries.id);
    }
    if (series === 'audio') {
      setSelectedServiceIds(['audio-express']);
    } else if (selectedServiceIds.includes('audio-express') && selectedServiceIds.length === 1) {
      setSelectedServiceIds(['screen']);
    }
  };

  const handleToggleServiceId = (serviceId: RepairServiceOption['id']) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.length > 1 ? prev.filter((id) => id !== serviceId) : prev;
      }
      return [...prev, serviceId];
    });
  };

  const scrollToSection = (id: string) => {
    setActiveMobileSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickConfigure = (
    series: 'gt' | 'number' | 'narzo' | 'audio' | 'c-series',
    serviceId: RepairServiceOption['id']
  ) => {
    handleSelectSeries(series);
    setSelectedServiceIds([serviceId]);
    scrollToSection('estimator');
  };

  const handleOpenBookingWithDefault = () => {
    const model =
      DEVICE_MODELS.find((m) => m.id === selectedModelId) || DEVICE_MODELS[0];
    const services = REPAIR_SERVICES.filter((s) => selectedServiceIds.includes(s.id));
    const effectiveServices = services.length > 0 ? services : [REPAIR_SERVICES[0]];
    const totalINR = effectiveServices.reduce(
      (sum, s) => sum + getServicePriceForModel(model, s.id),
      0
    );
    const estimatedMinutes = effectiveServices.reduce(
      (maxM, s) => Math.max(maxM, s.turnaroundMinutes),
      15
    );
    setPrefilledQuote({
      model,
      services: effectiveServices,
      totalINR,
      estimatedMinutes,
    });
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (record: WalkInBookingRecord) => {
    setActiveBookings((prev) => [record, ...prev]);
  };

  const handleCancelBooking = (tokenCode: string) => {
    setActiveBookings((prev) => prev.filter((b) => b.tokenCode !== tokenCode));
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(BUSINESS_INFO.fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const currentDayIndex = new Date().getDay();
  const currentHour = new Date().getHours();
  const isCurrentlyOpen =
    currentDayIndex !== 0 && currentHour >= 10 && currentHour < 19;

  const filteredReviews =
    reviewFilter === 'All'
      ? GOOGLE_REVIEWS
      : GOOGLE_REVIEWS.filter((r) => r.serviceCategory === reviewFilter);

  return (
    <div id="top" className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pb-20 md:pb-0">
      {/* STRICT 3-ZONE TOP BAR CONTRACT (Sticky on desktop, static on mobile so mobile sticky dock stays < 8% viewport height) */}
      <header className="md:sticky md:top-0 z-40 bg-[#F5F5F7]/85 backdrop-blur-xl border-b border-black/[0.08]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-6 py-3.5 sm:py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-[#1D1D1F] whitespace-nowrap shrink-0"
          >
            {BUSINESS_INFO.brandTitle}
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E6E73]">
            <a
              href="#capabilities"
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#estimator"
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
            >
              Estimator
            </a>
            <a
              href="#tracker"
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
            >
              Track Job
            </a>
            <a
              href="#reviews"
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#location"
              className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
            >
              Location
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleOpenBookingWithDefault}
              className="min-h-[40px] px-4 py-2 text-xs font-medium text-white bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              Book Walk-In
            </button>
          </div>
        </div>
      </header>

      {/* ACTIVE WALK-IN DIGITAL PASS BANNER (Visible when user books a token) */}
      <AnimatePresence>
        {activeBookings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1D1D1F] text-white border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono-tabular font-semibold text-[#60A5FA]">
                  ACTIVE PASS: {activeBookings[0].tokenCode}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeBookings[0].deviceModel} ({activeBookings[0].serviceSummary})
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular text-[#D1D1D6]">
                  {activeBookings[0].date} at {activeBookings[0].timeSlot}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A1A1A6]">Shop No F19, DDA Building, Janakpuri</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('tracker')}
                  className="text-[#60A5FA] hover:underline font-medium whitespace-nowrap shrink-0"
                >
                  Inspect Live Status
                </button>
                <button
                  type="button"
                  onClick={() => handleCancelBooking(activeBookings[0].tokenCode)}
                  className="text-[#A1A1A6] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION — APPLE HARDWARE KEYNOTE SPLIT + FULL-WIDTH KPI BAR */}
        <section className="pt-6 pb-14 sm:pt-14 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* 2-Column Hero Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Left Column: Editorial Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                <div>
                  {/* Unboxed clean regional & authorised metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#6E6E73]">
                    <span className="text-[#0066CC] font-semibold">
                      Authorised Service Centre
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Janakpuri District Center</span>
                    <span aria-hidden="true">·</span>
                    <span>Shop No F19</span>
                  </div>

                  <h1
                    className="mt-4 sm:mt-5 font-bold text-[#1D1D1F] tracking-tight leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.1rem, 3.6vw, 3.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Precision hardware repair. Engineered for same-day return.
                  </h1>

                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                    Official Realme mobile phone and audio care studio in West Delhi.
                    Factory-calibrated AMOLED screen replacements in 45–60 minutes,
                    10–15 minute express airbuds resolution, and genuine OEM components
                    backed by a 90-day nationwide warranty.
                  </p>
                </div>

                <div className="mt-7 sm:mt-8 pt-6 border-t border-black/[0.06] space-y-4">
                  <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('estimator')}
                      className="min-h-[48px] px-5 py-3 rounded-2xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-white text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-md shadow-[#0066CC]/15"
                    >
                      <span>Calculate Repair Estimate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={BUSINESS_INFO.googleMapsShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] px-5 py-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#E8E8ED] active:scale-[0.98] text-[#1D1D1F] text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Directions to Shop F19</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6E6E73]" />
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#6E6E73] font-mono-tabular">
                    <span className="font-medium text-[#1D1D1F]">
                      {isCurrentlyOpen
                        ? 'Open Today · 10:00 AM – 7:00 PM'
                        : 'Hours: Mon–Sat 10:00 AM – 7:00 PM (Sun Closed)'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>DDA Building, Plot 7A</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Interactive Apple-Style Hardware Exploded Visualizer */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex"
              >
                <HeroHardwareStudioVisual
                  onSelectService={(serviceId) => {
                    if (serviceId === 'audio-express') {
                      handleQuickConfigure('audio', 'audio-express');
                    } else {
                      handleQuickConfigure('number', serviceId);
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Bar Below Hero Split (2x2 on mobile for compact scanning) */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <SpotlightCard enableTilt={false} className="p-4 sm:p-5">
                <p className="text-[11px] sm:text-xs text-[#6E6E73]">
                  Verified Google Rating
                </p>
                <div className="mt-1.5 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                    4.0 ★
                  </span>
                  <span className="font-mono-tabular text-[11px] sm:text-xs text-[#6E6E73]">
                    (768)
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#6E6E73] mt-1 truncate">
                  Janakpuri District Center
                </p>
              </SpotlightCard>

              <SpotlightCard enableTilt={false} className="p-4 sm:p-5">
                <p className="text-[11px] sm:text-xs text-[#6E6E73]">
                  Express Audio Desk
                </p>
                <p className="mt-1.5 font-mono-tabular text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                  10–15 Mins
                </p>
                <p className="text-[11px] sm:text-xs text-[#6E6E73] mt-1 truncate">
                  Buds pairing & pogo fix
                </p>
              </SpotlightCard>

              <SpotlightCard enableTilt={false} className="p-4 sm:p-5">
                <p className="text-[11px] sm:text-xs text-[#6E6E73]">
                  OEM Screen Assembly
                </p>
                <p className="mt-1.5 font-mono-tabular text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                  45–60 Mins
                </p>
                <p className="text-[11px] sm:text-xs text-[#6E6E73] mt-1 truncate">
                  Factory frame & biometric
                </p>
              </SpotlightCard>

              <SpotlightCard enableTilt={false} className="p-4 sm:p-5">
                <p className="text-[11px] sm:text-xs text-[#6E6E73]">
                  Counter Schedule
                </p>
                <p className="mt-1.5 font-mono-tabular text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                  10 AM–7 PM
                </p>
                <p className="text-[11px] sm:text-xs text-[#6E6E73] mt-1 truncate">
                  Mon–Sat · Closed Sun
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* 2. ASYMMETRIC 21ST.DEV BENTO HARDWARE CAPABILITIES GRID */}
        <section
          id="capabilities"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0A0A0C] text-white border-y border-white/10"
        >
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl mb-10 sm:mb-12"
            >
              <p className="text-xs text-[#86868B] font-medium">
                Authorised Engineering Capabilities · Genuine Spare Parts
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-white mt-2 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Built like a cleanroom. Operated at walk-in speed.
              </h2>
              <p className="text-sm text-[#A1A1A6] mt-3 leading-relaxed">
                Every device admitted at Shop No. F19 undergoes ESD-safe workbench
                diagnostics, laser optical alignment, and genuine Realme spare part
                serial verification.
              </p>
            </motion.div>

            {/* Asymmetric Bento Grid: 2-col span + 1-col span */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Card 01 (col-span-2): Fast Screen Replacement */}
              <SpotlightCard
                dark
                className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1A6]">
                    <span>01. Primary Specialisation · Fast Screen Replacement</span>
                    <span className="font-mono-tabular text-[#60A5FA]">
                      Turnaround: 45–60 Mins
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 tracking-tight">
                    Original Pro-XDR & Curved AMOLED Display Assemblies
                  </h3>

                  <p className="text-sm text-[#A1A1A6] mt-2.5 max-w-2xl leading-relaxed">
                    Unlike third-party glass-only refits that trap dust or disable biometric
                    unlock, our authorised bench installs complete factory-sealed display
                    modules with pre-calibrated optical fingerprint sensors and fresh IP65
                    perimeter adhesive.
                  </p>

                  {/* Spec Matrix inside Card 01 */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <span className="text-xs text-[#86868B] block">Color Calibration</span>
                      <span className="font-mono-tabular text-sm font-semibold text-white mt-0.5 block">
                        10-Bit Factory LUT
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#86868B] block">Biometric Sensor</span>
                      <span className="font-mono-tabular text-sm font-semibold text-white mt-0.5 block">
                        Optical Re-Pairing Included
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#86868B] block">Supported Lines</span>
                      <span className="font-mono-tabular text-sm font-semibold text-white mt-0.5 block">
                        GT · Number Pro · Narzo · C
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#A1A1A6]">
                    Starts at ₹2,499 for C-Series · ₹4,999+ for Curved OLED Pro Series
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickConfigure('number', 'screen')}
                    className="min-h-[40px] text-xs font-medium text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Configure Screen Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>

              {/* Card 02 (col-span-1): 10-15 Min Airbuds Express */}
              <SpotlightCard dark className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1A6]">
                    <span>02. Express Audio Care</span>
                    <span className="font-mono-tabular text-emerald-400">10–15 Mins</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight">
                    Rapid Airbuds & TWS Acoustic Desk
                  </h3>
                  <p className="text-xs text-[#A1A1A6] mt-2 leading-relaxed">
                    Highlighted by Janakpuri customers for resolving Buds Air and Buds
                    Wireless pairing, charging pin oxidation, and acoustic mesh blockage on
                    the spot in 10–15 minutes.
                  </p>

                  <div className="mt-5">
                    <AirbudsAcousticVisualizer />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#86868B] font-mono-tabular">
                    Warranty Swap Eligible
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickConfigure('audio', 'audio-express')}
                    className="min-h-[40px] text-xs font-medium text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Book 15-Min Audio Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>

              {/* Card 03 (col-span-1): SuperVOOC Battery & Thermal */}
              <SpotlightCard dark className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1A6]">
                    <span>03. Power Architecture</span>
                    <span className="font-mono-tabular text-[#60A5FA]">35–45 Mins</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight">
                    Dual-Cell SuperVOOC Battery & USB-C Sub-Board
                  </h3>
                  <p className="text-xs text-[#A1A1A6] mt-2 leading-relaxed">
                    Restores full 67W, 80W, and 120W SuperVOOC flash-charging speed with
                    fresh zero-cycle lithium cells and encrypted battery health IC reset.
                  </p>

                  <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-2.5 font-mono-tabular text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#86868B]">Cycle Count Reset</span>
                      <span className="text-white">000 Cycles (Factory)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#86868B]">Peak Charge Rate</span>
                      <span className="text-emerald-400">Up to 120W Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#86868B]">Battery Warranty</span>
                      <span className="text-white">180 Days Official</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#86868B] font-mono-tabular">
                    From ₹1,099 Incl. Labor
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickConfigure('gt', 'battery')}
                    className="min-h-[40px] text-xs font-medium text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Estimate Battery Cost</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>

              {/* Card 04 (col-span-2): Logic Board, Camera OIS & Ultrasonic Cleaning */}
              <SpotlightCard
                dark
                className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1A6]">
                    <span>04. Micro-Diagnostics & Optical Lab</span>
                    <span className="font-mono-tabular text-[#60A5FA]">
                      28-Point Telemetry Verification
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 tracking-tight">
                    Sony Periscope OIS Calibration, Liquid Ingress Recovery & Firmware Unbrick
                  </h3>

                  <p className="text-sm text-[#A1A1A6] mt-2.5 max-w-2xl leading-relaxed">
                    Whether your phone suffered accidental water exposure, camera focus
                    jitter, or an interrupted Realme UI OTA update, our senior technicians
                    perform non-destructive board recovery and official EDL firmware flashing
                    at Shop No. F19.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A1A1A6] font-mono-tabular">
                    <span>Ultrasonic Corrosion Bath</span>
                    <span aria-hidden="true">·</span>
                    <span>Laser Camera Axis Alignment</span>
                    <span aria-hidden="true">·</span>
                    <span>Official Realme UI Flashing</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickConfigure('number', 'diagnostic')}
                    className="min-h-[40px] text-xs font-medium text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Book Diagnostic Inspection</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE DISPLAY CALIBRATION LAB */}
        <section id="display-lab" className="py-16 sm:py-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="max-w-[1200px] mx-auto"
          >
            <DisplayComparator
              onBookScreenRepair={() => handleQuickConfigure('number', 'screen')}
            />
          </motion.div>
        </section>

        {/* 4. INTERACTIVE REPAIR PRICE & TURNAROUND ESTIMATOR */}
        <section id="estimator" className="pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl mb-8 sm:mb-10"
            >
              <p className="text-xs font-medium text-[#6E6E73]">
                02 · Transparent Spare Parts Calculator · Instant Turnaround Estimate
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] mt-1.5 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Configure your device repair and lock in a walk-in slot.
              </h2>
              <p className="text-sm text-[#6E6E73] mt-2.5 leading-relaxed">
                Select your Realme smartphone or audio model below to view itemized OEM
                component pricing, exact turnaround time at our Janakpuri counter, and
                reserve a priority walk-in appointment.
              </p>
            </motion.div>

            <RepairEstimator
              selectedSeries={selectedSeries}
              onSelectSeries={handleSelectSeries}
              selectedModelId={selectedModelId}
              onSelectModelId={setSelectedModelId}
              selectedServiceIds={selectedServiceIds}
              onToggleServiceId={handleToggleServiceId}
              onBookQuote={(quote) => {
                setPrefilledQuote(quote);
                setIsBookingOpen(true);
              }}
            />
          </div>
        </section>

        {/* 5. LIVE WORKSHOP REPAIR STATUS & JOB-SHEET TRACKER */}
        <section id="tracker" className="pb-16 sm:pb-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="max-w-[1200px] mx-auto"
          >
            <RepairTracker
              userBookings={activeBookings}
              onBookNewSlot={handleOpenBookingWithDefault}
            />
          </motion.div>
        </section>

        {/* 6. GOOGLE REVIEW SUMMARY & VERIFIED CUSTOMER PROOF (4.0 ★ · 768 REVIEWS) */}
        <section
          id="reviews"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-y border-black/[0.08]"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <p className="text-xs font-medium text-[#6E6E73]">
                  03 · Verified Customer Proof · Google Review Summary
                </p>
                <h2
                  className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] mt-1.5 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Rated 4.0 ★ across 768 Google reviews in Janakpuri.
                </h2>
              </div>

              {/* Interactive Filter Controls (Horizontal Scroll on Mobile, 44px Hitbox) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 bg-[#F5F5F7] rounded-2xl border border-black/[0.06]">
                {(
                  ['All', 'Airbuds & Audio', 'Screen Replacement', 'Battery & Power'] as const
                ).map((category) => {
                  const isActive = reviewFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setReviewFilter(category)}
                      className={`relative min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-[#1D1D1F] font-semibold'
                          : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeReviewCategory"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-xl bg-white shadow-sm border border-black/[0.06]"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating Histogram Summary Card + Reviews Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Authentic Google Review Summary Histogram */}
              <div className="lg:col-span-4 rounded-3xl bg-[#F5F5F7] border border-black/[0.08] p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-black/[0.08] pb-5">
                  <div>
                    <p className="text-xs text-[#6E6E73]">Google Review Summary</p>
                    <h3 className="text-lg font-bold text-[#1D1D1F] mt-0.5">
                      Realme Service Center
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-tabular text-4xl font-bold text-[#1D1D1F]">
                      {BUSINESS_INFO.rating.toFixed(1)}
                    </span>
                    <div className="flex items-center justify-end gap-0.5 text-amber-500 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 text-black/20" />
                    </div>
                    <span className="font-mono-tabular text-xs text-[#6E6E73] block mt-0.5">
                      ({BUSINESS_INFO.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Animated 5-Star Distribution Bars */}
                <div className="py-5 space-y-2.5 border-b border-black/[0.08]">
                  {RATING_DISTRIBUTION.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="font-mono-tabular w-3 text-[#1D1D1F] font-medium">
                        {row.stars}
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-black/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          className="h-full rounded-full bg-amber-400"
                        />
                      </div>
                      <span className="font-mono-tabular w-9 text-right text-[#6E6E73]">
                        {row.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 space-y-3">
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {BUSINESS_INFO.category}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowOriginalGoogleListing((prev) => !prev)}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white hover:bg-black/[0.03] active:scale-[0.98] border border-black/10 text-xs font-medium text-[#1D1D1F] transition-all whitespace-nowrap shrink-0"
                  >
                    {showOriginalGoogleListing
                      ? 'Hide Google Listing Captures'
                      : 'Inspect Original Google Captures'}
                  </button>
                </div>
              </div>

              {/* Right Column: Customer Review Cards */}
              <div className="lg:col-span-8 space-y-4">
                {filteredReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-[#F5F5F7]/70 border border-black/[0.08] p-5 sm:p-6 transition-colors hover:bg-[#F5F5F7]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                        >
                          {rev.initial}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#1D1D1F]">
                            {rev.author}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#6E6E73]">
                            <span>{rev.verifiedVisit}</span>
                            <span aria-hidden="true">·</span>
                            <span>{rev.timeAgo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-mono-tabular text-xs font-semibold text-[#1D1D1F]">
                        <span>{rev.rating}.0</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                    </div>

                    <blockquote className="mt-4 text-sm sm:text-base font-medium text-[#1D1D1F] leading-relaxed">
                      "{rev.quote}"
                    </blockquote>

                    {rev.staffNote && (
                      <div className="mt-4 pt-3.5 border-t border-black/[0.08] text-xs text-[#6E6E73]">
                        <span className="font-semibold text-[#1D1D1F]">
                          Janakpuri Desk Wayfinding Response:{' '}
                        </span>
                        {rev.staffNote}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Expandable Original Google Captures Drawer */}
                <AnimatePresence>
                  {showOriginalGoogleListing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-3xl bg-[#F5F5F7] border border-black/10 p-5 sm:p-6 space-y-4 overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#1D1D1F]">
                          Verified Google Maps Listing & Operating Schedule Captures
                        </h4>
                        <button
                          type="button"
                          onClick={() => setShowOriginalGoogleListing(false)}
                          className="min-h-[36px] px-2 text-xs text-[#0066CC] hover:underline"
                        >
                          Close
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#1D1D1F]">
                          {!reviewImgError ? (
                            <img
                              src="/assets/aistudio/image_1882cb93.png"
                              alt="Google Review Summary 4.0 stars from 768 reviews for Realme Service Center Janakpuri"
                              referrerPolicy="no-referrer"
                              onError={() => setReviewImgError(true)}
                              className="w-full h-56 object-contain bg-[#202124] p-2"
                            />
                          ) : (
                            <div className="h-56 flex items-center justify-center p-6 text-xs text-white/70 text-center">
                              Google Review Summary · 4.0 ★ (768 Reviews)
                            </div>
                          )}
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#1D1D1F]">
                          {!hoursImgError ? (
                            <img
                              src="/assets/aistudio/image_ec24e539.png"
                              alt="Realme Service Center Janakpuri operating hours Monday to Saturday 10 am to 7 pm, Sunday Closed"
                              referrerPolicy="no-referrer"
                              onError={() => setHoursImgError(true)}
                              className="w-full h-56 object-contain bg-[#202124] p-2"
                            />
                          ) : (
                            <div className="h-56 flex items-center justify-center p-6 text-xs text-white/70 text-center">
                              Mon–Sat 10 am–7 pm · Sunday Closed
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 7. JANAKPURI DISTRICT CENTER STUDIO, REAL FACILITY PHOTOS & LANDMARK WAYFINDING */}
        <section id="location" className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <p className="text-xs font-medium text-[#6E6E73]">
                04 · Visit the Studio · Exact DDA Building Wayfinding
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#1D1D1F] mt-1.5 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Shop No. F19, Plot 7A, Janakpuri District Center.
              </h2>
              <p className="text-sm text-[#6E6E73] mt-2.5 leading-relaxed">
                Located right beside Unity One Mall in New Delhi (110058). Use our
                three-step corridor guide below to walk straight to the Authorised Service
                Centre counter on the first floor of the DDA Building.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Left Column (7 cols): Real Uploaded Facility Photo + Landmark Steps */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-semibold text-[#1D1D1F]">
                        Inside Realme Authorised Service Centre — Janakpuri
                      </span>
                      <p className="text-xs text-[#6E6E73]">
                        Reception Desk & Customer Lounge · Shop No F19, DDA Building
                      </p>
                    </div>
                    <a
                      href={BUSINESS_INFO.googleMapsShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[36px] text-xs font-medium text-[#0066CC] hover:underline flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Real Facility Photography from User Attachment */}
                  <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-[#141417]">
                    {!facilityImgError ? (
                      <div className="relative h-[260px] sm:h-[340px] w-full overflow-hidden">
                        <img
                          src="/assets/aistudio/image_b15e0d26.png"
                          alt="Realme Authorised Service Centre Janakpuri reception counter and customer waiting lounge at Shop No F19 DDA Building"
                          referrerPolicy="no-referrer"
                          onError={() => setFacilityImgError(true)}
                          className="w-full h-full object-cover object-[center_32%]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
                          <div>
                            <p className="text-[11px] sm:text-xs text-white/80 font-mono-tabular">
                              VERIFIED FACILITY PHOTOGRAPH · SHOP NO F19
                            </p>
                            <p className="text-sm font-semibold mt-0.5">
                              DDA Building, Plot 7A, Janakpuri District Center
                            </p>
                          </div>
                          <span className="text-xs font-mono-tabular text-white/90 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                            Near Unity One Mall
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[280px] flex flex-col items-center justify-center p-8 text-center text-white">
                        <MapPin className="w-8 h-8 text-[#60A5FA] mb-2" />
                        <p className="text-base font-semibold">
                          {BUSINESS_INFO.authorisedTitle}
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          {BUSINESS_INFO.fullAddress}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3-Step Exact Wayfinding Guide */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-semibold text-[#1D1D1F] tracking-tight">
                    Step-by-Step Arrival Guide (Zero Confusion Inside District Center)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {WAYFINDING_STEPS.map((item) => (
                      <div
                        key={item.step}
                        className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06]"
                      >
                        <span className="font-mono-tabular text-xs font-bold text-[#0066CC]">
                          Step {item.step}
                        </span>
                        <h4 className="text-xs font-semibold text-[#1D1D1F] mt-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Full Address, Actions & Operating Hours Table */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <div>
                  <p className="text-xs text-[#6E6E73]">
                    Official Address & Operating Hours
                  </p>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                    {BUSINESS_INFO.name} — Janakpuri
                  </h3>

                  {/* Full Address Box with Copy Handler */}
                  <div className="mt-4 rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06]">
                    <p className="text-sm font-medium text-[#1D1D1F] leading-snug">
                      {BUSINESS_INFO.fullAddress}
                    </p>
                    <p className="text-xs text-[#6E6E73] mt-1.5">
                      {BUSINESS_INFO.landmark}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-black/[0.06] grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="min-h-[42px] px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#6E6E73]" />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`tel:${BUSINESS_INFO.supportPhone.replace(/\s+/g, '')}`}
                        className="min-h-[42px] px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#6E6E73]" />
                        <span className="font-mono-tabular">Call Desk</span>
                      </a>
                    </div>
                  </div>

                  {/* Exact Operating Hours Schedule (Thursday -> Wednesday matching screenshot) */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#1D1D1F]">
                        Weekly Service Desk Schedule
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isCurrentlyOpen ? 'text-emerald-700' : 'text-[#6E6E73]'
                        }`}
                      >
                        {isCurrentlyOpen
                          ? 'Open Now · Closes 7 pm'
                          : 'Opens 10 am (Mon–Sat)'}
                      </span>
                    </div>

                    <div className="divide-y divide-black/[0.06] rounded-2xl border border-black/[0.08] overflow-hidden">
                      {OPERATING_HOURS.map((item) => {
                        const isToday = item.dayIndex === currentDayIndex;
                        return (
                          <div
                            key={item.day}
                            className={`flex items-center justify-between px-4 py-2.5 text-xs ${
                              isToday ? 'bg-[#F5F9FF] font-semibold' : 'bg-white'
                            }`}
                          >
                            <span className="text-[#1D1D1F]">
                              {item.day} {isToday ? '(Today)' : ''}
                            </span>
                            <span
                              className={`font-mono-tabular ${
                                item.isOpen ? 'text-[#1D1D1F]' : 'text-red-600 font-medium'
                              }`}
                            >
                              {item.hours}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Primary Directions & Booking CTA Footer */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={BUSINESS_INFO.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-[#1D1D1F] hover:bg-black/85 active:scale-[0.98] text-white text-xs font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Open Official Google Maps Pin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleOpenBookingWithDefault}
                    className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-white text-xs font-medium transition-all whitespace-nowrap shrink-0"
                  >
                    Book Priority Walk-In Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERVICE CENTER FAQ ACCORDION */}
        <section className="pb-20 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-medium text-[#6E6E73]">
                05 · Walk-In Assurance & Warranty FAQ
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                Common questions before visiting Shop No. F19.
              </h2>
            </div>

            <div className="divide-y divide-black/[0.08]">
              {SERVICE_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.q} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full min-h-[44px] flex items-center justify-between gap-4 text-left"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#1D1D1F]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#6E6E73] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0066CC]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#6E6E73] pt-2 pb-1 leading-relaxed max-w-3xl">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* QUIET APPLE-STYLE FOOTER */}
      <footer className="bg-white border-t border-black/[0.08] py-12 px-5 sm:px-6 text-xs text-[#6E6E73]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
            <div>
              <span className="text-sm font-bold text-[#1D1D1F]">
                {BUSINESS_INFO.authorisedTitle}
              </span>
              <p className="mt-1">{BUSINESS_INFO.fullAddress}</p>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <a href="#capabilities" className="hover:text-[#1D1D1F] transition-colors">
                Services
              </a>
              <a href="#display-lab" className="hover:text-[#1D1D1F] transition-colors">
                Display Lab
              </a>
              <a href="#estimator" className="hover:text-[#1D1D1F] transition-colors">
                Repair Estimator
              </a>
              <a href="#tracker" className="hover:text-[#1D1D1F] transition-colors">
                Track Job
              </a>
              <a href="#reviews" className="hover:text-[#1D1D1F] transition-colors">
                Google Reviews (4.0 ★)
              </a>
              <a
                href={BUSINESS_INFO.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D1D1F] transition-colors"
              >
                Google Maps
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p>
              Authorised Walk-In Hours: Monday – Saturday, 10:00 AM – 7:00 PM · Closed Sunday.
            </p>
            <p className="font-mono-tabular">
              Shop No F19 · Plot 7A · DDA Building · New Delhi 110058
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE THUMB-ZONE BOTTOM NAVIGATION DOCK (Strictly md:hidden, 56px height = <8% mobile viewport cap) */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/90 backdrop-blur-xl border-t border-black/10 grid grid-cols-5 items-center px-1"
      >
        <button
          type="button"
          onClick={() => scrollToSection('capabilities')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform ${
            activeMobileSection === 'capabilities' ? 'text-[#0066CC]' : 'text-[#6E6E73]'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Services</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('estimator')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform ${
            activeMobileSection === 'estimator' ? 'text-[#0066CC]' : 'text-[#6E6E73]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Estimate</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('tracker')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform ${
            activeMobileSection === 'tracker' ? 'text-[#0066CC]' : 'text-[#6E6E73]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Track Job</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('location')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform ${
            activeMobileSection === 'location' ? 'text-[#0066CC]' : 'text-[#6E6E73]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Shop F19</span>
        </button>

        <button
          type="button"
          onClick={handleOpenBookingWithDefault}
          className="min-h-[44px] mx-1 rounded-xl bg-[#0066CC] text-white flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform shadow-sm"
        >
          <CalendarPlus className="w-4 h-4" />
          <span className="text-[10px] font-semibold tracking-tight">Book</span>
        </button>
      </nav>

      {/* PRIORITY WALK-IN BOOKING MODAL / MOBILE BOTTOM SHEET */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledQuote={prefilledQuote}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
