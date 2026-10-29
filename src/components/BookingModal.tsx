import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Copy, Check } from 'lucide-react';
import { BUSINESS_INFO, DEVICE_MODELS, REPAIR_SERVICES } from '../data/serviceData';
import { SelectedRepairQuote } from './RepairEstimator';

export interface WalkInBookingRecord {
  tokenCode: string;
  customerName: string;
  phoneNumber: string;
  deviceModel: string;
  serviceSummary: string;
  estimatedINR: number;
  estimatedMinutes: number;
  date: string;
  timeSlot: string;
  notes: string;
  createdAt: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledQuote: SelectedRepairQuote | null;
  onConfirmBooking: (booking: WalkInBookingRecord) => void;
}

const TIME_SLOTS = [
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '12:00 PM – 01:00 PM',
  '02:00 PM – 03:00 PM',
  '03:00 PM – 04:00 PM',
  '04:00 PM – 05:00 PM',
  '05:00 PM – 06:00 PM',
  '06:00 PM – 07:00 PM',
];

interface UpcomingDateOption {
  isoDate: string;
  dayShort: string;
  dayNum: string;
  monthShort: string;
}

const getUpcomingOpenDates = (): UpcomingDateOption[] => {
  const options: UpcomingDateOption[] = [];
  const cursor = new Date();
  while (options.length < 6) {
    // Skip Sundays (day 0) because Janakpuri Service Center is closed on Sundays
    if (cursor.getDay() !== 0) {
      const isoDate = cursor.toISOString().split('T')[0];
      const dayShort = cursor.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = String(cursor.getDate()).padStart(2, '0');
      const monthShort = cursor.toLocaleDateString('en-US', { month: 'short' });
      options.push({ isoDate, dayShort, dayNum, monthShort });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return options;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledQuote,
  onConfirmBooking,
}) => {
  const openDates = getUpcomingOpenDates();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_MODELS[0].name);
  const [selectedServiceText, setSelectedServiceText] = useState(
    'Factory-Calibrated Screen Replacement'
  );
  const [selectedDate, setSelectedDate] = useState(openDates[0].isoDate);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedRecord, setConfirmedRecord] = useState<WalkInBookingRecord | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    if (prefilledQuote) {
      setSelectedDevice(prefilledQuote.model.name);
      setSelectedServiceText(prefilledQuote.services.map((s) => s.shortTitle).join(' + '));
    }
    setConfirmedRecord(null);
    setErrorMessage(null);
    setCopiedToken(false);
  }, [prefilledQuote, isOpen]);

  const isSundaySelected = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getDay() === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (customerName.trim().length < 2) {
      setErrorMessage('Please enter your full name for the service desk job sheet.');
      return;
    }

    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for SMS token updates.');
      return;
    }

    if (isSundaySelected(selectedDate)) {
      setErrorMessage(
        'Realme Service Center Janakpuri is closed on Sundays. Please choose Monday through Saturday (10:00 AM – 7:00 PM).'
      );
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const tokenCode = `JNK-F19-${randomNum}`;

    const record: WalkInBookingRecord = {
      tokenCode,
      customerName: customerName.trim(),
      phoneNumber: cleanedPhone.slice(-10),
      deviceModel: selectedDevice,
      serviceSummary: selectedServiceText,
      estimatedINR: prefilledQuote ? prefilledQuote.totalINR : 1499,
      estimatedMinutes: prefilledQuote ? prefilledQuote.estimatedMinutes : 30,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: notes.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedRecord(record);
    onConfirmBooking(record);
  };

  const handleCopyTokenDetails = () => {
    if (!confirmedRecord) return;
    const summaryText = `Realme Care Janakpuri Walk-In Pass\nToken: ${confirmedRecord.tokenCode}\nDevice: ${confirmedRecord.deviceModel} (${confirmedRecord.serviceSummary})\nSlot: ${confirmedRecord.date} at ${confirmedRecord.timeSlot}\nLocation: ${BUSINESS_INFO.fullAddress}`;
    navigator.clipboard?.writeText(summaryText);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="relative w-full max-w-xl rounded-t-3xl sm:rounded-3xl bg-white border border-black/10 p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            {/* Mobile Bottom Sheet Grab Handle */}
            <div className="sm:hidden w-10 h-1.5 bg-black/15 rounded-full mx-auto mb-4" />

            {/* Close Button (44px Touch Target) */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] active:scale-95 flex items-center justify-center text-[#1D1D1F] transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!confirmedRecord ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pr-12">
                  <p className="text-xs text-[#6E6E73]">
                    Priority Walk-In Desk · Shop No F19, DDA Building, Janakpuri
                  </p>
                  <h3
                    id="booking-modal-title"
                    className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mt-1 tracking-tight"
                  >
                    Reserve Zero-Wait Service Slot
                  </h3>
                </div>

                {/* Pre-filled Hardware Quote Banner */}
                <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#1D1D1F]">{selectedDevice}</p>
                    <p className="text-xs text-[#6E6E73] mt-0.5">{selectedServiceText}</p>
                  </div>
                  {prefilledQuote && (
                    <div className="text-right font-mono-tabular">
                      <span className="text-sm font-bold text-[#0066CC]">
                        ₹{prefilledQuote.totalINR.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[11px] text-[#6E6E73]">
                        ~{prefilledQuote.estimatedMinutes} mins est.
                      </span>
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full min-h-[44px] rounded-xl border border-black/15 px-3.5 py-2.5 text-sm text-[#1D1D1F] focus:border-[#0066CC] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 98100 12345"
                      className="w-full min-h-[44px] rounded-xl border border-black/15 px-3.5 py-2.5 text-sm text-[#1D1D1F] font-mono-tabular focus:border-[#0066CC] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Mobile-Friendly Quick Horizontal Date Scroller (Excludes Sundays automatically) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-[#1D1D1F]">
                      Select Walk-In Day (Mon – Sat · Sunday Closed) *
                    </label>
                    <span className="text-[11px] font-mono-tabular text-[#6E6E73]">
                      {selectedDate}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {openDates.map((d) => {
                      const isActive = selectedDate === d.isoDate;
                      return (
                        <button
                          key={d.isoDate}
                          type="button"
                          onClick={() => setSelectedDate(d.isoDate)}
                          className={`min-h-[54px] rounded-xl border p-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                            isActive
                              ? 'bg-[#0066CC] border-[#0066CC] text-white shadow-sm'
                              : 'bg-[#F5F5F7] border-black/[0.06] text-[#1D1D1F] hover:bg-[#E8E8ED]'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-medium ${
                              isActive ? 'text-white/85' : 'text-[#6E6E73]'
                            }`}
                          >
                            {d.dayShort}
                          </span>
                          <span className="font-mono-tabular text-sm font-bold mt-0.5">
                            {d.dayNum} {d.monthShort}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                      Time Window (10 AM – 7 PM) *
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full min-h-[44px] rounded-xl border border-black/15 px-3.5 py-2.5 text-sm text-[#1D1D1F] font-mono-tabular bg-white focus:border-[#0066CC] focus:outline-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                      Device Model
                    </label>
                    <select
                      value={selectedDevice}
                      onChange={(e) => setSelectedDevice(e.target.value)}
                      className="w-full min-h-[44px] rounded-xl border border-black/15 px-3.5 py-2.5 text-sm text-[#1D1D1F] bg-white focus:border-[#0066CC] focus:outline-none"
                    >
                      {DEVICE_MODELS.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                    Issue Details or Warranty Status (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Right airbud not charging / Screen cracked on bottom corner"
                    className="w-full min-h-[44px] rounded-xl border border-black/15 px-3.5 py-2.5 text-sm text-[#1D1D1F] focus:border-[#0066CC] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl border border-black/10 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.04] transition-colors whitespace-nowrap shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-xs font-medium text-white transition-all whitespace-nowrap shrink-0"
                  >
                    Generate Express Walk-In Token
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      Priority Walk-In Slot Confirmed
                    </p>
                    <h3 className="text-xl font-bold text-[#1D1D1F] font-mono-tabular">
                      Token {confirmedRecord.tokenCode}
                    </h3>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F5F5F7] border border-black/[0.08] p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                    <span className="text-[#6E6E73]">Customer</span>
                    <span className="font-semibold text-[#1D1D1F]">
                      {confirmedRecord.customerName} · +91 {confirmedRecord.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                    <span className="text-[#6E6E73]">Device & Service</span>
                    <span className="font-semibold text-[#1D1D1F] text-right">
                      {confirmedRecord.deviceModel} ({confirmedRecord.serviceSummary})
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                    <span className="text-[#6E6E73]">Appointment Slot</span>
                    <span className="font-mono-tabular font-semibold text-[#0066CC]">
                      {confirmedRecord.date} · {confirmedRecord.timeSlot}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#6E6E73] shrink-0">Service Counter</span>
                    <span className="text-right text-[#1D1D1F] font-medium">
                      {BUSINESS_INFO.fullAddress}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyTokenDetails}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-black/15 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      {copiedToken ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pass Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#6E6E73]" />
                          <span>Copy Pass Details</span>
                        </>
                      )}
                    </button>

                    <a
                      href={BUSINESS_INFO.googleMapsShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-black/15 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.03] transition-colors flex items-center justify-center whitespace-nowrap shrink-0"
                    >
                      Google Maps
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1D1D1F] text-xs font-medium text-white hover:bg-black/85 transition-colors whitespace-nowrap shrink-0"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
