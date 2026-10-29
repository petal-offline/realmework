import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DEVICE_SERIES,
  DEVICE_MODELS,
  REPAIR_SERVICES,
  DeviceModel,
  RepairServiceOption,
} from '../data/serviceData';
import { Check, ArrowRight } from 'lucide-react';

export interface SelectedRepairQuote {
  model: DeviceModel;
  services: RepairServiceOption[];
  totalINR: number;
  estimatedMinutes: number;
}

interface RepairEstimatorProps {
  selectedSeries: 'gt' | 'number' | 'narzo' | 'audio' | 'c-series';
  onSelectSeries: (series: 'gt' | 'number' | 'narzo' | 'audio' | 'c-series') => void;
  selectedModelId: string;
  onSelectModelId: (modelId: string) => void;
  selectedServiceIds: Array<RepairServiceOption['id']>;
  onToggleServiceId: (serviceId: RepairServiceOption['id']) => void;
  onBookQuote: (quote: SelectedRepairQuote) => void;
}

export const getServicePriceForModel = (
  model: DeviceModel,
  serviceId: RepairServiceOption['id']
): number => {
  switch (serviceId) {
    case 'screen':
      return model.screenPriceINR;
    case 'audio-express':
      return model.expressAudioPriceINR ?? 399;
    case 'battery':
      return model.batteryPriceINR;
    case 'charging':
      return model.chargingPortPriceINR;
    case 'camera':
      return model.cameraPriceINR;
    case 'diagnostic':
      return model.diagnosticPriceINR;
  }
};

export const RepairEstimator: React.FC<RepairEstimatorProps> = ({
  selectedSeries,
  onSelectSeries,
  selectedModelId,
  onSelectModelId,
  selectedServiceIds,
  onToggleServiceId,
  onBookQuote,
}) => {
  const seriesModels = DEVICE_MODELS.filter((m) => m.series === selectedSeries);
  const currentModel =
    DEVICE_MODELS.find((m) => m.id === selectedModelId) ||
    seriesModels[0] ||
    DEVICE_MODELS[0];

  const availableServices = REPAIR_SERVICES.filter((s) =>
    s.applicableSeries.includes(currentModel.series)
  );

  const activeServices = availableServices.filter((s) =>
    selectedServiceIds.includes(s.id)
  );
  const effectiveServices =
    activeServices.length > 0 ? activeServices : [availableServices[0]];

  const totalINR = effectiveServices.reduce(
    (sum, s) => sum + getServicePriceForModel(currentModel, s.id),
    0
  );

  const estimatedMinutes = effectiveServices.reduce(
    (maxMin, s) => Math.max(maxMin, s.turnaroundMinutes),
    15
  );

  const handleBookClick = () => {
    onBookQuote({
      model: currentModel,
      services: effectiveServices,
      totalINR,
      estimatedMinutes,
    });
  };

  return (
    <div className="rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      {/* Step 1: 21st.dev Sliding Segmented Device Family Selector (Horizontal Snap on Mobile) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3.5">
          <span className="text-xs font-semibold text-[#1D1D1F] tracking-tight">
            Step 01 · Select Hardware Series (Swipe Horizontally on Mobile)
          </span>
          <span className="text-xs text-[#6E6E73]">
            Official Realme India Spare Parts Tariff · Inclusive of GST
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar snap-x snap-mandatory p-1.5 rounded-2xl bg-[#F5F5F7] border border-black/[0.06]">
          {DEVICE_SERIES.map((series) => {
            const isActive = selectedSeries === series.id;
            return (
              <button
                key={series.id}
                type="button"
                onClick={() => onSelectSeries(series.id)}
                className={`relative snap-start min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#1D1D1F] font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSeriesPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-black/[0.06]"
                  />
                )}
                <span className="relative z-10">{series.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Workspace: Left = Model + Fault Selection, Right = Live Itemized Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          {/* Step 2: Specific Device Model */}
          <div>
            <span className="block text-xs font-semibold text-[#1D1D1F] tracking-tight mb-3">
              Step 02 · Tap Your Specific Device Model
            </span>
            <motion.div
              key={selectedSeries}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {seriesModels.map((model) => {
                const isSelected = currentModel.id === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => onSelectModelId(model.id)}
                    className={`min-h-[68px] text-left p-4 rounded-2xl border transition-all duration-150 active:scale-[0.99] ${
                      isSelected
                        ? 'bg-[#F5F9FF] border-[#0066CC] text-[#1D1D1F] shadow-sm'
                        : 'bg-[#F5F5F7]/70 border-black/[0.07] text-[#1D1D1F] hover:bg-[#F5F5F7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold tracking-tight">
                        {model.name}
                      </span>
                      <span className="font-mono-tabular text-xs text-[#6E6E73]">
                        {model.releaseYear}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6E73] mt-1.5 line-clamp-1">
                      {model.screenType}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Step 3: Select Repair Services */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-[#1D1D1F] tracking-tight">
                Step 03 · Select Required Service (Multi-Select Supported)
              </span>
              <span className="text-xs text-[#0066CC] font-medium font-mono-tabular">
                {effectiveServices.length} selected
              </span>
            </div>

            <div className="space-y-3">
              {availableServices.map((service) => {
                const isChecked = effectiveServices.some((s) => s.id === service.id);
                const priceINR = getServicePriceForModel(currentModel, service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onToggleServiceId(service.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 active:scale-[0.995] flex items-start justify-between gap-3 sm:gap-4 ${
                      isChecked
                        ? 'bg-[#F5F9FF] border-[#0066CC] shadow-sm'
                        : 'bg-white border-black/[0.08] hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-[#0066CC] border-[#0066CC] text-white'
                            : 'border-black/20 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <span className="text-sm font-semibold text-[#1D1D1F] block">
                          {service.index}. {service.title}
                        </span>
                        <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[#6E6E73] mt-2 font-mono-tabular">
                          <span className="text-[#1D1D1F] font-medium">
                            Turnaround: {service.turnaround}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service.warranty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono-tabular text-base font-bold text-[#1D1D1F]">
                        {priceINR === 0 ? 'Free' : `₹${priceINR.toLocaleString('en-IN')}`}
                      </span>
                      <span className="block text-[11px] text-[#6E6E73] mt-0.5">
                        OEM + Labor
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Apple Store Style Live Care Quote Summary */}
        <div
          id="quote-summary-card"
          className="lg:col-span-5 rounded-3xl bg-[#F5F5F7] border border-black/[0.08] p-6 sm:p-8 lg:sticky lg:top-24"
        >
          <div className="border-b border-black/[0.08] pb-5">
            <p className="text-xs text-[#6E6E73]">
              Authorised Service Estimate · Shop No. F19, Janakpuri
            </p>
            <h4 className="text-xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
              {currentModel.name}
            </h4>
            <p className="text-xs text-[#6E6E73] mt-1">{currentModel.screenType}</p>
          </div>

          {/* Line Items */}
          <div className="py-5 space-y-3.5 border-b border-black/[0.08]">
            {effectiveServices.map((srv) => {
              const cost = getServicePriceForModel(currentModel, srv.id);
              return (
                <div key={srv.id} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium text-[#1D1D1F]">{srv.shortTitle}</p>
                    <p className="text-xs text-[#6E6E73] mt-0.5">{srv.precisionSpec}</p>
                  </div>
                  <span className="font-mono-tabular font-semibold text-[#1D1D1F] shrink-0">
                    {cost === 0 ? '₹0' : `₹${cost.toLocaleString('en-IN')}`}
                  </span>
                </div>
              );
            })}

            <div className="flex items-center justify-between text-xs text-[#6E6E73] pt-2">
              <span>ESD Cleanbench Calibration & Diagnostics</span>
              <span className="font-mono-tabular text-[#1D1D1F] font-medium">
                Included (₹0)
              </span>
            </div>
          </div>

          {/* Animated Total & Turnaround */}
          <div className="py-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#6E6E73] block">
                  Estimated Total (Incl. GST)
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  In-Stock at Janakpuri F19 Inventory
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalINR}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono-tabular text-3xl font-bold text-[#1D1D1F] tracking-tight"
                >
                  ₹{totalINR.toLocaleString('en-IN')}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-black/[0.06] space-y-2 text-xs text-[#6E6E73]">
              <div className="flex items-center justify-between">
                <span>Estimated Desk Turnaround</span>
                <span className="font-mono-tabular font-semibold text-[#1D1D1F]">
                  ~{estimatedMinutes} Minutes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Official Realme Warranty</span>
                <span className="font-mono-tabular font-medium text-[#1D1D1F]">
                  90 Days Nationwide
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Walk-In Hours (Mon – Sat)</span>
                <span className="font-mono-tabular font-medium text-[#1D1D1F]">
                  10:00 AM – 7:00 PM
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookClick}
              className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl bg-[#0066CC] hover:bg-[#0071E3] active:scale-[0.98] text-white text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-md shadow-[#0066CC]/15"
            >
              <span>Reserve Priority Walk-In Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-[#6E6E73] text-center">
              No advance online payment required. Pay at Shop No. F19 counter after
              inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
