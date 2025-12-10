# Docu-Flow 📝
**Smart Admission & Discharge Note Generator**

> *Reducing Clinician Burnout through Structured Automation*

## 🏥 The Problem
Clinicians spend up to 50% of their shift on "Pajama Time"—writing documentation after hours. The bureaucracy of Admission/Discharge notes steals time from patient care.

## 💡 The Solution: Guided Documentation
**Docu-Flow** is a "Smart Template" engine. Instead of staring at a blank page or writing from scratch, the doctor clicks through a structured flow of clinical choices. The system then *assembles* a perfect, professionally formatted note.

### "Mad Libs" for Medicine
*   **Inputs**:
    *   Diagnosis: `[Community Acquired Pneumonia]`
    *   Vitals: `[Stable]`
    *   Plan: `[Discharge Home]` + `[Oral Antibiotics]`
*   **Output (Instant)**:
    *"Patient is a 65yo male admitted for Community Acquired Pneumonia. Course was uncomplicated. Vitals are now stable. Patient is fit for discharge home on a course of Oral Antibiotics..."*

## 🛠️ Technical Implementation (Zero-API)
*   **Template Engine**: A robust String Interpolation library.
*   **Clinical Ontology**: A mapped dictionary connecting "Short Codes" (e.g., "CAP") to "Long Form Text" ("Community Acquired Pneumonia").
*   **Copy-to-Clipboard**: One-click integration with existing EHRs (simulating the "Paste" workflow).

## 🚀 Features (MVP)
1.  **Diagnosis Picker**: Autocomplete for common conditions.
2.  **Smart Phrases**: Context-aware text blocks that change based on patient age/gender.
3.  **The "Perfect Note" Preview**: Real-time rendering of the final document as selections are made.
