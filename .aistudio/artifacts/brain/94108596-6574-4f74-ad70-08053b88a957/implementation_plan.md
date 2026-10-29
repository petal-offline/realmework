# Realme Authorised Service Center — Janakpuri Flagship Care Experience

An Apple-inspired hardware care and precision repair web application for the Realme Authorised Service Center at Janakpuri District Center, New Delhi, combining studio-grade product photography, 21st.dev-style interactive UI components, an instant repair price & turnaround estimator, and priority walk-in slot booking.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product and design choices incorporate your answers from Phase 1 and establish the blueprint for the build:

- **Confirmed Decision 1 — Bespoke Apple-Inspired Color Palette**: Instead of Realme's yellow branding, we will craft a bespoke **Cupertino Titanium & Precision Cobalt** palette—featuring an alabaster & frosted silver light canvas (`#F5F5F7` / `#FFFFFF`), deep obsidian dark hardware showcase sections (`#0A0A0C`), brushed titanium borders, and a refined Sapphire Cobalt primary action accent (`#0066CC`).
- **Confirmed Decision 2 — Interactive Core Workflows**: We will build a full **Interactive Repair Price & Turnaround Estimator** (covering screen replacement, earbuds/TWS 15-minute express service, battery replacement, motherboard & camera diagnostics across device series) and a **Priority Walk-In Appointment & Slot Booking Modal** synchronized with the center's real operating hours (Mon–Sat, 10:00 AM – 7:00 PM; Sunday Closed).
- **Confirmed Decision 3 — Hybrid Visual Asset Strategy**: We will generate bespoke Apple-style studio hardware and precision repair photography via `generate_image` while also integrating the real Janakpuri Authorised Service Center facility photos in a dedicated "Inside the Janakpuri Studio & Directions" section.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms a local authorised mobile repair center into a flagship Apple Care–caliber digital experience. Visitors can inspect genuine OEM component tolerances, calculate real-time repair costs and turnaround times (highlighting the center's signature 10–15 minute earbuds service and fast screen replacements), read verified Google reviews (4.0 ★ across 768 reviews), locate Shop No. F19 in the DDA Building at Janakpuri District Center, and reserve a zero-wait walk-in service slot.
- **Target Audience / Persona**: Smartphone and audio hardware owners in West Delhi (Janakpuri, District Center, Unity One Mall corridor) seeking trustworthy, transparent, same-day authorised repairs using genuine OEM parts.
- **Key Value**: Eliminates uncertainty around repair pricing, parts authenticity, wait times, and exact shop navigation inside the DDA Building complex.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & Express Triage Flow**: Users land on a full-viewport Apple-style hardware showcase introducing the Janakpuri Authorised Center, with immediate access to either launch the **Priority Walk-In Booking Modal** or scroll directly into the **Interactive Repair Estimator**.
2. **Interactive Repair Price & Turnaround Estimator**:
   - Step 1: Select Device Category (*Smartphones — GT / Number / Narzo / C Series*, *Buds & Audio — Air / Wireless / TechLife*, *Tablets & Wearables*).
   - Step 2: Select Issue (*Cracked / unresponsive AMOLED display*, *Airbuds pairing / charging / single-bud fix — 10–15 Min Express*, *Battery health degradation*, *Fast-charging port / SuperVOOC module*, *Camera lens or water damage diagnostic*).
   - Step 3: View dynamic breakdown of OEM part cost, labor transparency, warranty coverage (90-day official service warranty), and estimated completion time, with a 1-click **"Book This Repair Slot"** transfer that pre-fills the booking modal.
3. **Asymmetric 21st.dev Bento Hardware Capabilities Grid**: Interactive spotlight cards with spring physics, subtle mouse-tracking radial luminance, and tabular specifications detailing genuine display assemblies, micro-acoustic earbuds repair, and ESD-safe diagnostic benches.
4. **Verified Google Review & Facility Proof Showcase**: Displays the real **4.0 ★ (768 Google Reviews)** rating distribution bar chart, verbatim customer reviews (including the 10–15 minute airbuds resolution highlight), and an interactive **Janakpuri District Center Locator** featuring the real uploaded shop photography (`Shop No F19, Plot 7A, DDA Building, near Unity One Mall`) to solve local wayfinding clearly.

### Visual Identity & Theme
- **Aesthetic Direction**: Cupertino Hardware Editorial meets 21st.dev Interactive Precision. Generous whitespace, crisp `1px` hairline borders, optical glassmorphism (`backdrop-blur-xl`), and alternating high-key alabaster (`#F5F5F7`) and deep anodized obsidian (`#0A0A0C`) sections.
- **Color Palette & Mood (60-30-10 Discipline)**:
  - **60% Dominant Neutral Canvas**: Apple Alabaster (`#F5F5F7`) and pure studio white (`#FFFFFF`) for primary reading and estimator workspaces; Deep Anodized Obsidian (`#0A0A0C`) for the exploded hardware engineering showcase.
  - **30% Structural Surfaces**: Brushed Titanium (`#E8E8ED` light / `#1D1D1F` dark), slate secondary prose (`#6E6E73`), and subtle hairline dividers (`rgba(0,0,0,0.08)`).
  - **10% Accent Budget**: Cupertino Cobalt (`#0066CC` hover `#0071E3`) for primary interactive CTAs, active segmented controls, and focus rings, paired with semantic Emerald (`#16A34A`) paired with explicit text labels for live open/slot availability.
- **Typography & Hierarchy (2+1 Font Rule)**:
  - *Display / Headlines*: `Plus Jakarta Sans` (SemiBold/Bold `600`/`700`, tight tracking `-0.03em`, `text-wrap: balance`, hero scale `clamp(2.5rem, 4.5vw, 4rem)`).
  - *Body Prose*: `DM Sans` (`400`/`500`, clean geometric legibility at `15px–16px`).
  - *Metrics, Pricing & Operating Hours*: `JetBrains Mono` with `tabular-nums` for repair estimates, review counts (`768`), ratings (`4.0`), and time slots (`10:00 AM – 7:00 PM`).
- **Component Styling & Layout**:
  - Strict compliance with the **Top Bar Contract**: 1-line brand wordmark (`Realme Care · Janakpuri`), 4 single-line nav links (`Services`, `Estimator`, `Reviews`, `Location`), and 1 primary CTA button (`Book Walk-In`).
  - **Zero-Pill Discipline**: All static metadata (model compatibility, repair duration, warranty terms, address details) rendered as clean unboxed typography separated by `·` or `/`. Interactive segmented controls use tactile 21st.dev sliding tab indicators.

### Interactive Feedback & Motion
- **21st.dev Component Patterns**:
  - **Interactive Spotlight Bento Cards**: Radial cursor-tracked subtle surface illumination on service cards using compositor-safe transforms and opacity.
  - **Animated Segmented Controls**: Smooth `motion/react` layout transitions when switching device lines and fault categories in the estimator.
  - **Interactive Before/After Display Calibration Slider**: Allows users to drag and inspect cracked glass vs. factory-calibrated OEM AMOLED replacement clarity.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Wayfinding Clarity for DDA Building Shop No. F19**
  - *Chosen Approach*: Dedicate a high-clarity "Find Us at Janakpuri District Center" split section combining the real uploaded facility photographs with step-by-step landmark directions from Unity One Mall and Janakpuri West Metro Station, plus one-click Google Maps directions (`https://share.google/CNeNvVwUppw9kV7yc`).
  - *Why*: One of the Google reviews noted difficulty locating the shop inside the complex; making Shop No. F19, Plot 7A unmistakable directly improves customer visits.
- **Decision 2: Pre-Filled Estimator-to-Booking Handshake**
  - *Chosen Approach*: Clicking "Reserve Express Slot for This Repair" inside the Interactive Price Estimator automatically opens the Booking Modal with the selected device model, issue, estimated price, and turnaround time pre-populated.
  - *Why*: Eliminates redundant form entry and creates a cohesive, functional application flow.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       App Shell (src/App.tsx)                           │
│   Shared State: selectedRepairConfig, isBookingOpen, bookedAppointments │
└───────────────┬─────────────────────────┬───────────────────────────────┘
                │                         │
    ┌───────────▼───────────┐ ┌───────────▼───────────────────────────────┐
    │   Top Bar Navigation  │ │     Priority Walk-In Booking Modal        │
    │   (3-Zone Contract)   │ │  (Pre-filled from Estimator, Slot Picker, │
    └───────────┬───────────┘ │   Mon–Sat 10am–7pm Validation & Receipt)  │
                │             └───────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Main Apple-Style Editorial Flow                      │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Hero Showcase Split                                                  │
│    ├─ Studio Hardware Macro Visual (Generated 16:9 Asset)               │
│    └─ Full-Width KPI Bar (4.0★ / 768 Reviews · 10-15m Audio · OEM Parts)│
├─────────────────────────────────────────────────────────────────────────┤
│ 2. 21st.dev Spotlight Bento Grid (Core Repair Capabilities)             │
│    ├─ 01. Express Screen Replacement (Interactive Display Slider)       │
│    ├─ 02. 15-Minute Airbuds & Acoustic Lab                              │
│    └─ 03. SuperVOOC Power, Battery & Logic Board Diagnostics            │
├─────────────────────────────────────────────────────────────────────────┤
│ 3. Interactive Repair Price & Turnaround Estimator                      │
│    ├─ Device Series Segmented Control (GT / Number / Narzo / Audio)     │
│    ├─ Issue Selector Grid with Live OEM Part & Labor Breakdown          │
│    └─ "Book This Repair" Action ──► Triggers Pre-Filled Booking Modal   │
├─────────────────────────────────────────────────────────────────────────┤
│ 4. Google Review Summary & Customer Proof (4.0 ★ · 768 Reviews)         │
│    ├─ 5-Star Histogram Distribution (Exact Match to Google Summary)     │
│    └─ Filterable Verified Review Cards & Search                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 5. Janakpuri District Center Studio & Landmark Wayfinding               │
│    ├─ Real Facility Gallery (/assets/aistudio/image_b15e0d26.png)       │
│    ├─ Live Open/Closed Schedule Table (Mon–Sat 10am–7pm, Sun Closed)    │
│    └─ Direct Google Maps Share Link & Interactive Directions Card       │
└─────────────────────────────────────────────────────────────────────────┘
```

### Interactive Component & State Mapping
- **Repair Estimator State**: Tracks `deviceFamily`, `deviceModel`, and `selectedFaults[]`, computing real-time `estimatedCostINR`, `turnaroundMinutes`, and `warrantyDays` with instant tabular number updates.
- **Interactive Display Comparison Slider**: Tracks pointer/touch drag position (`0%` to `100%`) to reveal factory AMOLED replacement vs. shattered glass assembly.
- **Walk-In Appointment Modal & Persistence**: Validates customer name, 10-digit Indian mobile number, preferred date (auto-blocking Sundays per the center's real schedule), and 1-hour time window (`10:00 AM` through `6:00 PM`). Stores confirmed bookings in `localStorage` so users can view their generated Digital Service Token and appointment pass immediately on the page.
