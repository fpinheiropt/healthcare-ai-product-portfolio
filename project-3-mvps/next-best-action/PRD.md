# Product Requirements Document: Next-Best-Action Navigator 🧭

## 1. Problem Statement
Clinical triage is useless if the recommended facility is full. Patients are often sent to the closest ER, even if it has a 6-hour wait, causing overcrowding and poor experience.
**Strategic Alignment**: "Directing citizens more efficiently to the right services" (Direct quote from news).

## 2. Target User
*   **Primary**: Triage Nurses / Care Coordinators (Booking appointments).
*   **Secondary**: Automated Patients (Self-Booking).

## 3. Top Principles
1.  **Network Awareness**: Decisions must account for "Live Capacity" (wait times).
2.  **Patient Centric**: Balance "Distance" vs. "Time to See Doctor."
3.  **Closed Loop**: Don't just recommend; enable the handoff.

## 4. Feature Requirements (MVP)

### 4.1. The Resource Map (Geo/Ops Data)
*   **Requirement**: Database of simulated facilities (ERs, Clinics, Urgent Cares).
*   **Attributes**: `Lat/Long`, `Capabilities` (X-Ray, Labs), `Current_Wait_Time` (Live Signal).

### 4.2. Recommendation Engine (The Algo)
*   **Requirement**: Input -> `Patient Location` + `Clinical Need` (e.g., Stitches).
*   **Logic**:
    `Score = (Travel_Time_Minutes * 0.5) + (Wait_Time_Minutes * 1.5)`
    (We weight Wait Time higher because sitting in a waiting room is worse than driving).
*   **Output**: Top 3 Options ranked by Score.

### 4.3. Digital Referral Ticket
*   **Requirement**: Generate a "Pass" for the patient.
*   **Content**: QR Code containing: `Triage_ID`, `Recommended_Facility`, `Time_Stamp`.
*   **Goal**: Patient shows this at the door to skip admission questions.

## 5. Success Metrics
*   **Load  Balancing**: Reduction in Wait Time Variance across the network.
*   **Compliance**: % of patients who actually go to the recommended facility.
