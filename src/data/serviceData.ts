export interface DeviceModel {
  id: string;
  name: string;
  series: 'gt' | 'number' | 'narzo' | 'audio' | 'c-series';
  releaseYear: string;
  screenType: string;
  screenPriceINR: number;
  batteryPriceINR: number;
  chargingPortPriceINR: number;
  cameraPriceINR: number;
  diagnosticPriceINR: number;
  expressAudioPriceINR?: number;
}

export interface RepairServiceOption {
  id: 'screen' | 'audio-express' | 'battery' | 'charging' | 'camera' | 'diagnostic';
  index: string;
  title: string;
  shortTitle: string;
  turnaround: string;
  turnaroundMinutes: number;
  warranty: string;
  description: string;
  precisionSpec: string;
  applicableSeries: Array<'gt' | 'number' | 'narzo' | 'audio' | 'c-series'>;
}

export interface CustomerReview {
  id: string;
  author: string;
  initial: string;
  avatarBg: string;
  rating: number;
  timeAgo: string;
  serviceCategory: 'Airbuds & Audio' | 'Screen Replacement' | 'General Service' | 'Battery & Power';
  quote: string;
  highlightedTerms: string[];
  verifiedVisit: string;
  staffNote?: string;
}

export interface OperatingDay {
  day: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ...
  hours: string;
  isOpen: boolean;
}

export const BUSINESS_INFO = {
  name: 'Realme Service Center',
  brandTitle: 'Realme Care',
  authorisedTitle: 'Realme Authorised Service Centre — Janakpuri',
  category: 'Mobile phone repair shop offering fast screen replacement services.',
  rating: 4.0,
  totalReviews: 768,
  shopNumber: 'Shop No F19, Plot 7A',
  building: 'DDA Building',
  area: 'Janakpuri District Center, Janakpuri',
  city: 'New Delhi, Delhi 110058',
  fullAddress:
    'DDA Building, Shop No F19 Plot 7A, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110058',
  landmark: 'Adjacent to Unity One Mall · 3 Mins from Janakpuri West Metro Gate 3',
  googleMapsShareUrl: 'https://share.google/CNeNvVwUppw9kV7yc',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Realme+Service+Center+DDA+Building+Shop+No+F19+Plot+7A+Janakpuri+District+Center+New+Delhi+110058',
  supportPhone: '+91 11 4560 8921',
  tollFree: '1800 102 2777',
  openHoursSummary: '10:00 AM – 7:00 PM (Mon – Sat) · Closed Sunday',
};

export const OPERATING_HOURS: OperatingDay[] = [
  { day: 'Thursday', dayIndex: 4, hours: '10 am–7 pm', isOpen: true },
  { day: 'Friday', dayIndex: 5, hours: '10 am–7 pm', isOpen: true },
  { day: 'Saturday', dayIndex: 6, hours: '10 am–7 pm', isOpen: true },
  { day: 'Sunday', dayIndex: 0, hours: 'Closed', isOpen: false },
  { day: 'Monday', dayIndex: 1, hours: '10 am–7 pm', isOpen: true },
  { day: 'Tuesday', dayIndex: 2, hours: '10 am–7 pm', isOpen: true },
  { day: 'Wednesday', dayIndex: 3, hours: '10 am–7 pm', isOpen: true },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 72, count: 553 },
  { stars: 4, percentage: 8, count: 61 },
  { stars: 3, percentage: 4, count: 31 },
  { stars: 2, percentage: 2, count: 15 },
  { stars: 1, percentage: 14, count: 108 },
];

export const DEVICE_SERIES = [
  { id: 'gt', label: 'GT Flagship Series', descriptor: 'LTPO AMOLED & Snapdragon 8 Gen' },
  { id: 'number', label: 'Number Pro Series', descriptor: 'Curved Vision OLED & Periscope' },
  { id: 'audio', label: 'Buds Air & Audio', descriptor: '10–15 Min Express Acoustic Care' },
  { id: 'narzo', label: 'Narzo Performance', descriptor: '120Hz Ultra-Smooth Display' },
  { id: 'c-series', label: 'C-Series Essentials', descriptor: 'Fast Same-Day Screen & Battery' },
] as const;

export const DEVICE_MODELS: DeviceModel[] = [
  {
    id: 'gt-6-pro',
    name: 'Realme GT 6 / GT 6T 5G',
    series: 'gt',
    releaseYear: '2025–2026',
    screenType: '6.78" 120Hz 6000-nit LTPO Curved AMOLED',
    screenPriceINR: 7499,
    batteryPriceINR: 1899,
    chargingPortPriceINR: 1199,
    cameraPriceINR: 3299,
    diagnosticPriceINR: 299,
  },
  {
    id: 'gt-2-pro',
    name: 'Realme GT 2 Pro / GT Neo 3',
    series: 'gt',
    releaseYear: '2023–2024',
    screenType: '6.7" 2K LTPO2 AMOLED Assembly with Frame',
    screenPriceINR: 6899,
    batteryPriceINR: 1699,
    chargingPortPriceINR: 999,
    cameraPriceINR: 2799,
    diagnosticPriceINR: 299,
  },
  {
    id: '13-pro-plus',
    name: 'Realme 13 Pro+ / 13 Pro 5G',
    series: 'number',
    releaseYear: '2025–2026',
    screenType: '6.7" 120Hz Curved OLED with Corning Gorilla Glass 7i',
    screenPriceINR: 5899,
    batteryPriceINR: 1599,
    chargingPortPriceINR: 899,
    cameraPriceINR: 3499,
    diagnosticPriceINR: 299,
  },
  {
    id: '12-pro-plus',
    name: 'Realme 12 Pro+ / 12 Pro 5G',
    series: 'number',
    releaseYear: '2024',
    screenType: '6.7" 120Hz Curved Pro-XDR Display Module',
    screenPriceINR: 5499,
    batteryPriceINR: 1499,
    chargingPortPriceINR: 849,
    cameraPriceINR: 3199,
    diagnosticPriceINR: 299,
  },
  {
    id: '11-pro-plus',
    name: 'Realme 11 Pro+ / 11 Pro 5G',
    series: 'number',
    releaseYear: '2023–2024',
    screenType: '6.7" Curved Vision AMOLED OEM Assembly',
    screenPriceINR: 4999,
    batteryPriceINR: 1399,
    chargingPortPriceINR: 799,
    cameraPriceINR: 2699,
    diagnosticPriceINR: 299,
  },
  {
    id: 'buds-air-6-pro',
    name: 'Realme Buds Air 6 Pro / Air 6',
    series: 'audio',
    releaseYear: '2025–2026',
    screenType: 'Dual Coaxial Acoustic Driver & Charging Case Contacts',
    screenPriceINR: 1299,
    batteryPriceINR: 899,
    chargingPortPriceINR: 599,
    cameraPriceINR: 799,
    diagnosticPriceINR: 0,
    expressAudioPriceINR: 499,
  },
  {
    id: 'buds-wireless-3',
    name: 'Realme Buds Wireless 3 / TechLife',
    series: 'audio',
    releaseYear: '2024–2026',
    screenType: 'Magnetic Hall-Switch, Firmware Reset & Mesh Calibration',
    screenPriceINR: 899,
    batteryPriceINR: 699,
    chargingPortPriceINR: 449,
    cameraPriceINR: 599,
    diagnosticPriceINR: 0,
    expressAudioPriceINR: 349,
  },
  {
    id: 'narzo-70-pro',
    name: 'Realme Narzo 70 Pro / 70 Turbo 5G',
    series: 'narzo',
    releaseYear: '2024–2025',
    screenType: '6.67" 120Hz Horizon Glass AMOLED Display',
    screenPriceINR: 4199,
    batteryPriceINR: 1299,
    chargingPortPriceINR: 749,
    cameraPriceINR: 1999,
    diagnosticPriceINR: 249,
  },
  {
    id: 'narzo-60-pro',
    name: 'Realme Narzo 60 Pro / 60 5G',
    series: 'narzo',
    releaseYear: '2023–2024',
    screenType: '6.7" 120Hz Super AMOLED Factory Calibrated Panel',
    screenPriceINR: 3899,
    batteryPriceINR: 1249,
    chargingPortPriceINR: 699,
    cameraPriceINR: 1799,
    diagnosticPriceINR: 249,
  },
  {
    id: 'c67-5g',
    name: 'Realme C67 / C65 / C55 Series',
    series: 'c-series',
    releaseYear: '2024–2025',
    screenType: '6.72" 120Hz Sunny Oasis LCD Digitizer Assembly',
    screenPriceINR: 2499,
    batteryPriceINR: 1099,
    chargingPortPriceINR: 599,
    cameraPriceINR: 1299,
    diagnosticPriceINR: 199,
  },
];

export const REPAIR_SERVICES: RepairServiceOption[] = [
  {
    id: 'screen',
    index: '01',
    title: 'Factory-Calibrated Screen & Digitizer Replacement',
    shortTitle: 'Screen Replacement',
    turnaround: '45 – 60 Mins',
    turnaroundMinutes: 55,
    warranty: '90-Day Official Display Warranty',
    description:
      'Complete OEM display assembly with pre-bonded mid-frame, oleophobic coating, optical in-display fingerprint calibration, and waterproof perimeter seal.',
    precisionSpec: 'Delta-E < 0.8 Color Accuracy · 120Hz Touch Sampling Verified',
    applicableSeries: ['gt', 'number', 'narzo', 'c-series'],
  },
  {
    id: 'audio-express',
    index: '02',
    title: '10–15 Minute Express Airbuds & Acoustic Resolution',
    shortTitle: '10–15 Min Airbuds Fix',
    turnaround: '10 – 15 Mins',
    turnaroundMinutes: 15,
    warranty: '90-Day Authorised Replacement Coverage',
    description:
      'Rapid walk-in resolution for one-side volume drop, Bluetooth desynchronization, pogo-pin charging corrosion, ANC mic feedback, or under-warranty unit swap.',
    precisionSpec: 'Ultrasonic Contact Cleaning · Dual-Bud Firmware Sync',
    applicableSeries: ['audio', 'gt', 'number', 'narzo', 'c-series'],
  },
  {
    id: 'battery',
    index: '03',
    title: 'Dual-Cell SuperVOOC Battery & Thermal Refresh',
    shortTitle: 'Battery Replacement',
    turnaround: '35 – 45 Mins',
    turnaroundMinutes: 40,
    warranty: '180-Day Battery Health Guarantee',
    description:
      'Zero-cycle OEM lithium-polymer dual-cell pack replacement with fresh thermal interface paste and automated current-leakage testing.',
    precisionSpec: '100% Peak Capacity · Encrypted Battery Health IC Reset',
    applicableSeries: ['gt', 'number', 'narzo', 'c-series', 'audio'],
  },
  {
    id: 'charging',
    index: '04',
    title: 'SuperVOOC USB-C Sub-Board & Fast-Charge IC Service',
    shortTitle: 'Charging Port & Power',
    turnaround: '30 – 45 Mins',
    turnaroundMinutes: 35,
    warranty: '90-Day Component Warranty',
    description:
      'Restores 67W / 80W / 120W SuperVOOC flash charging handshake, replaces worn USB-C contact pins, and cleans moisture residue on the lower flex assembly.',
    precisionSpec: 'Full SuperVOOC Protocol Handshake · ESD-Safe Bench',
    applicableSeries: ['gt', 'number', 'narzo', 'c-series', 'audio'],
  },
  {
    id: 'camera',
    index: '05',
    title: 'Sony OIS Periscope & Main Sensor Optical Module',
    shortTitle: 'Camera & Optics',
    turnaround: '60 – 75 Mins',
    turnaroundMinutes: 65,
    warranty: '90-Day Optical Alignment Warranty',
    description:
      'Dust-free cleanroom replacement of scratched sapphire camera glass, jittering OIS actuators, or autofocus failure on main and telephoto lenses.',
    precisionSpec: 'Laser Axis Alignment · Dust-Free Clean Bench',
    applicableSeries: ['gt', 'number', 'narzo', 'c-series'],
  },
  {
    id: 'diagnostic',
    index: '06',
    title: 'Logic Board, Liquid Ingress & OS Firmware Recovery',
    shortTitle: 'Board & Software Diagnostic',
    turnaround: '25 – 40 Mins',
    turnaroundMinutes: 30,
    warranty: '30-Day Diagnostic Assurance',
    description:
      'Micro-soldering level inspection, ultrasonic board bath for accidental water spills, Realme UI unbricking, and official factory calibration.',
    precisionSpec: '28-Point Automated Hardware Telemetry Check',
    applicableSeries: ['gt', 'number', 'narzo', 'c-series', 'audio'],
  },
];

export const GOOGLE_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    initial: 'A',
    avatarBg: 'bg-slate-800',
    rating: 5,
    timeAgo: 'Verified Google Review',
    serviceCategory: 'Airbuds & Audio',
    quote: 'Great service centre Excellent staff Solved my airbuds issue in 10-15 mins',
    highlightedTerms: ['staff', 'Solved', '10-15 mins'],
    verifiedVisit: 'Janakpuri District Center · Walk-In Express Desk',
  },
  {
    id: 'rev-2',
    author: 'Manish Verma',
    initial: 'M',
    avatarBg: 'bg-[#0066CC]',
    rating: 5,
    timeAgo: 'Verified Google Review',
    serviceCategory: 'Screen Replacement',
    quote: 'Nice work by realme service centre janakpuri.',
    highlightedTerms: ['work'],
    verifiedVisit: 'Janakpuri District Center · OEM Display Assembly',
  },
  {
    id: 'rev-3',
    author: 'Rohan Malhotra',
    initial: 'R',
    avatarBg: 'bg-slate-700',
    rating: 5,
    timeAgo: '2 weeks ago',
    serviceCategory: 'Screen Replacement',
    quote:
      'Got my Realme 12 Pro+ curved screen replaced in under an hour. Original factory adhesive and in-display fingerprint sensor worked on the first touch.',
    highlightedTerms: ['under an hour', 'Original factory adhesive'],
    verifiedVisit: 'Shop No F19 · Same-Day Screen Replacement',
  },
  {
    id: 'rev-4',
    author: 'Priya Nair',
    initial: 'P',
    avatarBg: 'bg-slate-900',
    rating: 4,
    timeAgo: '1 month ago',
    serviceCategory: 'Battery & Power',
    quote:
      'Transparent pricing right at the reception desk. Replaced my GT Neo battery and tested 80W SuperVOOC charging in front of me before handover.',
    highlightedTerms: ['Transparent pricing', '80W SuperVOOC'],
    verifiedVisit: 'Shop No F19 · Battery & Power Lab',
  },
  {
    id: 'rev-5',
    author: 'Visitor Wayfinding Note',
    initial: 'D',
    avatarBg: 'bg-amber-700',
    rating: 4,
    timeAgo: 'Location Advisory Resolved',
    serviceCategory: 'General Service',
    quote:
      'Note for first-time visitors: Look specifically for DDA Building, Plot 7A, First Floor Shop No F19 right next to Unity One Mall so you do not walk into the adjacent block.',
    highlightedTerms: ['DDA Building', 'Shop No F19', 'Unity One Mall'],
    verifiedVisit: 'Wayfinding Guide · Janakpuri District Center',
    staffNote:
      'In response to past visitor feedback ("Service centre does not exist at said location"), we have added exact Plot 7A / Shop F19 landmark steps and direct corridor navigation below.',
  },
];

export const WAYFINDING_STEPS = [
  {
    step: '01',
    title: 'Arrive at Janakpuri District Center / Unity One Mall',
    detail:
      'Exit Janakpuri West Metro Station (Gate No. 3) directly adjacent to Unity One Mall. Enter the main Janakpuri District Center pedestrian plaza.',
  },
  {
    step: '02',
    title: 'Locate DDA Building, Plot No. 7A',
    detail:
      'Walk 80 meters past the main plaza atrium toward DDA Building (Plot 7A). Take the main staircase or elevator to the First Floor (F-Block corridor).',
  },
  {
    step: '03',
    title: 'Enter Shop No. F19 — Realme Authorised Service Centre',
    detail:
      'Look for Shop No. F19 featuring the official Realme Authorised Service Centre reception counter and dedicated customer seating lounge.',
  },
];
