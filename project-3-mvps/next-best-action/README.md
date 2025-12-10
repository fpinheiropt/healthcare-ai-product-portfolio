# Next-Best-Action Navigator 🧭
**Operational Logistics & Care Coordination Engine**

> *Optimizing the "Last Mile" of Patient Triage*

## 🏥 The Problem
Knowing a patient needs an X-Ray is only half the battle. If you send them to an ER with a 6-hour wait time, outcomes suffer. Clinical Triage must be paired with **Operational Reality**.

## 💡 The Solution: Logistics Intelligence
**Next-Best-Action** is the "Air Traffic Control" layer that sits between the Triage Engine and the Physical Network. It accepts a clinical requirement (e.g., "Need Urgent X-Ray") and finds the optimal resource.

### The Innovation: "Load Balancing" for Healthcare
*   **Clinical Input**: "Urgent Care capable of Chest X-Ray."
*   **Operational Constraints**: "Travel time < 30 mins" AND "Wait time < 1 hour."
*   **Result**: "Route specific patient to *Northside Clinic* (4 miles away, 15 min wait)" instead of *Central ER* (2 miles away, 4 hour wait).

## 🛠️ Technical Implementation (Zero-API)
*   **Geo-Logic**: Uses the Haversine formula to calculate distances between Patient Lat/Long and Facility locations.
*   **Optimization Algorithm**: A weighted scoring function:
    `Score = (Distance * 0.3) + (WaitTime * 0.7)`
    (Prioritizes speed of care over travel distance).
*   **Mock Data**: A simulated database of local clinics with live "Wait Time" signals.

## 🚀 Features (MVP)
1.  **Resource Map**: Visualization of available clinics and their current status.
2.  **Smart Routing**: "Best Option" recommendation engine based on user constraints.
3.  **Digital "Referral Ticket"**: Generates a QR code carrying the patient's triage data to the destination (smoothing the handoff).
