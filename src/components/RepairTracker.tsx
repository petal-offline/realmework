import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WalkInBookingRecord } from './BookingModal';
import { Search, CheckCircle2, Clock, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

interface SampleJobSheet {
  tokenCode: string;
  customerName: string;
  deviceModel: string;
  serviceSummary: string;
  admittedAt: string;
  estimatedReady: string;
  currentStepIndex: number; // 0 to 4
  technicianNote: string;
  warrantyStatus: string;
}

const DEMO_JOB_SHEETS: SampleJobSheet[] = [
  {
    tokenCode: 'JNK-F19-842',
    customerName: 'Rohan M.',
    deviceModel: 'Realme 13 Pro+ 5G',
    serviceSummary: '120Hz Curved AMOLED Display Assembly Replacement',
    admittedAt: 'Today, 11:15 AM',
    estimatedReady: '12:10 PM (55 Mins Turnaround)',
    currentStepIndex: 3,
    technicianNote:
      'Original factory display module bonded. Optical in-display fingerprint LUT calibration in progress on ESD Bench #2.',
    warrantyStatus: '90-Day Official Display Warranty Activated',
  },
  {
    tokenCode: 'JNK-F19-319',
    customerName: 'Aarav S.',
    deviceModel: 'Realme Buds Air 6 Pro',
    serviceSummary: '10–15 Min Express Right-Bud Charging & Pairing Fix',
    admittedAt: 'Today, 01:40 PM',
    estimatedReady: '01:52 PM (12 Mins Turnaround)',
    currentStepIndex: 4,
    technicianNote:
      'Ultrasonic pogo-pin de-oxidation completed and dual-bud firmware re-paired. Ready for handover at Counter #1.',
    warrantyStatus: 'Covered under Realme Audio Care',
  },
  {
    tokenCode: 'JNK-F19-504',
    customerName: 'Priya N.',
    deviceModel: 'Realme GT 6 5G',
    serviceSummary: 'Dual-Cell SuperVOOC Battery + Thermal Paste Refresh',
    admittedAt: 'Today, 03:05 PM',
    estimatedReady: '03:45 PM (40 Mins Turnaround)',
    currentStepIndex: 2,
    technicianNote:
      'Zero-cycle OEM dual-cell battery installed. Running 120W SuperVOOC current-stability telemetry check.',
    warrantyStatus: '180-Day Official Battery Warranty',
  },
];

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Counter Check-In',
    detail: 'Job sheet logged at Shop No. F19 reception',
  },
  {
    step: '02',
    title: 'ESD Telemetry Check',
    detail: '28-point hardware & moisture inspection',
  },
  {
    step: '03',
    title: 'OEM Component Fit',
    detail: 'Genuine serial-verified Realme part installation',
  },
  {
    step: '04',
    title: 'Optical & LUT Calibration',
    detail: 'Biometric sensor, touch & waterproof seal test',
  },
  {
    step: '05',
    title: 'Ready at Shop F19',
    detail: 'Quality passed · SMS pickup alert dispatched',
  },
];

interface RepairTrackerProps {
  userBookings: WalkInBookingRecord[];
  onBookNewSlot: () => void;
}

export const RepairTracker: React.FC<RepairTrackerProps> = ({
  userBookings,
  onBookNewSlot,
}) => {
  const [query, setQuery] = useState('JNK-F19-842');

  // Combine user's newly booked walk-in passes with sample live workshop jobs
  const convertedUserJobs: SampleJobSheet[] = userBookings.map((b) => ({
    tokenCode: b.tokenCode,
    customerName: b.customerName,
    deviceModel: b.deviceModel,
    serviceSummary: b.serviceSummary,
    admittedAt: `${b.date} · ${b.timeSlot}`,
    estimatedReady: `~${b.estimatedMinutes} Mins from Walk-In Check-In`,
    currentStepIndex: 0,
    technicianNote:
      'Priority walk-in slot reserved in Janakpuri Shop F19 queue. Present this token at the reception desk for zero-wait admission.',
    warrantyStatus: '90-Day Official Realme Warranty Reserved',
  }));

  const allJobs = [...convertedUserJobs, ...DEMO_JOB_SHEETS];

  const matchedJob =
    allJobs.find(
      (j) => j.tokenCode.toLowerCase() === query.trim().toLowerCase()
    ) || allJobs[0];

  return (
    <div className="rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
        <div>
          <p className="text-xs font-medium text-[#6E6E73]">
            Live Workshop Telemetry · Real-Time Job Sheet Lookup
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Track your live repair or walk-in token status.
          </h3>
          <p className="text-sm text-[#6E6E73] mt-2 max-w-2xl">
            Every device admitted at Janakpuri Shop No. F19 receives a live digital job
            code. Enter your token or tap a live workbench sample below to inspect the
            5-stage repair progress.
          </p>
        </div>

        {/* Search Input + Sample Token Quick-Tap Buttons */}
        <div className="w-full lg:w-auto flex flex-col gap-2.5">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Token (e.g. JNK-F19-842)"
              aria-label="Job sheet token lookup"
              className="w-full sm:w-72 min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5F7] border border-black/10 text-sm font-mono-tabular text-[#1D1D1F] focus:bg-white focus:border-[#0066CC] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] text-[#6E6E73] shrink-0 mr-1">
              Live Benches:
            </span>
            {allJobs.slice(0, 4).map((job) => {
              const isSelected = matchedJob.tokenCode === job.tokenCode;
              return (
                <button
                  key={job.tokenCode}
                  type="button"
                  onClick={() => setQuery(job.tokenCode)}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0066CC] text-white font-semibold'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED]'
                  }`}
                >
                  {job.tokenCode}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Job Sheet Telemetry Readout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={matchedJob.tokenCode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8 space-y-8"
        >
          {/* Job Metadata Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.05]">
              <span className="text-xs text-[#6E6E73] block">Job Token & Owner</span>
              <span className="font-mono-tabular text-base font-bold text-[#1D1D1F] mt-1 block">
                {matchedJob.tokenCode} · {matchedJob.customerName}
              </span>
            </div>

            <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.05]">
              <span className="text-xs text-[#6E6E73] block">Admitted Hardware</span>
              <span className="text-base font-bold text-[#1D1D1F] mt-1 block truncate">
                {matchedJob.deviceModel}
              </span>
            </div>

            <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.05]">
              <span className="text-xs text-[#6E6E73] block">Estimated Completion</span>
              <span className="font-mono-tabular text-sm font-semibold text-[#0066CC] mt-1 block">
                {matchedJob.estimatedReady}
              </span>
            </div>

            <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.05]">
              <span className="text-xs text-[#6E6E73] block">Official Protection</span>
              <span className="text-xs font-semibold text-emerald-700 mt-1.5 block">
                {matchedJob.warrantyStatus}
              </span>
            </div>
          </div>

          {/* 5-Stage Visual Progress Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {PIPELINE_STEPS.map((stage, idx) => {
              const isCompleted = idx < matchedJob.currentStepIndex;
              const isCurrent = idx === matchedJob.currentStepIndex;
              return (
                <div
                  key={stage.step}
                  className={`rounded-2xl p-4 border transition-all ${
                    isCurrent
                      ? 'bg-[#F5F9FF] border-[#0066CC] shadow-sm'
                      : isCompleted
                      ? 'bg-white border-emerald-500/30'
                      : 'bg-[#F5F5F7]/60 border-black/[0.06] opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-xs font-bold text-[#6E6E73]">
                      STAGE {stage.step}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        isCurrent
                          ? 'text-[#0066CC]'
                          : isCompleted
                          ? 'text-emerald-700'
                          : 'text-[#6E6E73]'
                      }`}
                    >
                      {isCurrent ? 'In Progress' : isCompleted ? 'Completed' : 'Queued'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1D1D1F] mt-2">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Senior Technician Bench Note & CTA */}
          <div className="rounded-2xl bg-[#141417] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#A1A1A6] font-mono-tabular">
                <span className="text-[#60A5FA] font-semibold">
                  LIVE BENCH TELEMETRY NOTE
                </span>
                <span aria-hidden="true">·</span>
                <span>{matchedJob.serviceSummary}</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                {matchedJob.technicianNote}
              </p>
            </div>

            <button
              type="button"
              onClick={onBookNewSlot}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-xs font-medium text-white transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <span>Book Your Own Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
