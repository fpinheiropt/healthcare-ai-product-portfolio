# HeartGuide AI - Product Requirements Document (PRD)

## Document Information
- **Prepared by**: Francisco Pinheiro
- **Date**: 29/11/2025
- **Version**: 1.0
- **Status**: Draft

## 1. Executive Summary
Heart Failure (HF) is a leading cause of hospital readmissions, with ~25% of patients readmitted within 30 days of discharge. **HeartGuide AI** is a remote patient monitoring (RPM) and clinical decision support system designed to reduce these readmissions. By combining a patient-facing mobile app for daily vitals/symptom tracking with a provider-facing AI dashboard, HeartGuide AI enables early detection of decompensation, allowing care teams to intervene *before* hospitalization is required.

## 2. Product Overview
- **Vision**: To become the standard of care for post-discharge heart failure management, bridging the gap between hospital and home.
- **Target Users**:
    - **Patients**: Post-discharge HF patients (NYHA Class II-III), typically 65+ years old.
    - **Providers**: Cardiologists, HF Nurse Navigators, and Case Managers.
- **Key Differentiators**:
    - **AI-Driven Risk Stratification**: Dynamic risk scoring based on real-time data, not just static EMR history.
    - **User-Centric Design**: Simplified interface for elderly patients (big buttons, voice logging).
    - **Actionable Insights**: "Smart Alerts" that suggest specific interventions (e.g., "Increase diuretic dosage").

## 3. Business Objectives
- **Clinical Outcome**: Reduce 30-day HF readmission rate by 20% within 6 months of pilot.
- **Engagement**: Achieve 80% daily adherence to weight and symptom logging among active patients.
- **Operational**: Reduce nursing time spent on "false alarm" calls by 40% through AI filtering.

## 4. User Stories & Requirements

### 4.1 User Roles
- **Patient (Maria)**: 72yo, lives alone, anxious about her condition, not tech-savvy.
- **Cardiologist (Dr. Sarah)**: Busy, manages 200+ patients, needs to know who to call *now*.

### 4.2 Functional Requirements

#### Patient Mobile App
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PA-01** | As Maria, I want to easily log my weight and symptoms daily so my doctor knows how I'm doing. | **Must Have** | - Big, high-contrast buttons.<br>- < 3 clicks to complete log.<br>- Confirmation message upon success. |
| **PA-02** | As Maria, I want to see my medication list and get reminders so I don't miss a dose. | **Must Have** | - Push notifications at scheduled times.<br>- "Taken" checkbox for tracking. |
| **PA-03** | As Maria, I want to see a simple "Heart Score" so I know if I'm stable. | **Should Have** | - Green/Yellow/Red status indicator.<br>- Simple advice (e.g., "Great job, keep it up!"). |

#### Provider Dashboard
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PD-01** | As Dr. Sarah, I want to see a ranked list of high-risk patients so I can prioritize my rounds. | **Must Have** | - List sorted by AI Risk Score (High to Low).<br>- Visual flags for "Critical" status. |
| **PD-02** | As Dr. Sarah, I want to view a patient's trend over the last 7 days to identify deterioration. | **Must Have** | - Interactive charts for Weight, BP, and Symptom Score.<br>- Overlay of medication changes. |
| **PD-03** | As Dr. Sarah, I want to receive alerts only when a patient truly needs attention to avoid alert fatigue. | **Must Have** | - Configurable thresholds.<br>- AI suppression of minor fluctuations. |

### 4.3 Non-Functional Requirements
- **Compliance**: HIPAA compliant data storage and transmission (encryption at rest and in transit).
- **Accessibility**: WCAG 2.1 AA standards (large text, screen reader support).
- **Performance**: Dashboard loads < 2s; Real-time alerts delivered < 1 min.

## 5. Technical Specifications
- **Frontend**: React Native (Patient App), React + Tailwind CSS (Provider Dashboard).
- **Backend**: Node.js / Python (FastAPI).
- **AI Engine**:
    - **Model**: XGBoost Classifier trained on MIMIC-III and proprietary pilot data.
    - **Features**: $\Delta$Weight (3-day), Dyspnea Score, Fatigue Score, Medication Adherence, BNP levels (if available).
    - **Explainability**: SHAP values to show *why* a patient is high risk (e.g., "+3 lbs weight gain").

## 6. User Experience (UX)
- **Patient App**: "Morning Routine" flow. App opens directly to the check-in screen. No navigation required for primary task.
- **Provider Dashboard**: "Command Center" view. Dark mode option for radiologists/cardiologists working in dim rooms.

## 7. Success Metrics
- **Primary KPI**: 30-Day Readmission Rate (Target: <18%).
- **Secondary KPIs**:
    - Patient Adherence Rate (Target: >85%).
    - System Usability Scale (SUS) Score (Target: >80).
    - False Positive Alert Rate (Target: <10%).

## 8. Risks & Mitigations
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Low Patient Adherence** | High | Medium | Gamification (streaks), automated SMS reminders, caregiver notifications. |
| **AI False Negatives** | Critical | Low | "Safety net" rules: Any weight gain >3lbs in 24h triggers alert regardless of AI score. |
| **Data Privacy Breach** | Critical | Low | End-to-end encryption, regular penetration testing, strict access controls. |

## 9. Roadmap
- **Phase 1 (MVP)**: Manual logging, basic rule-based alerts. (Completed)
- **Phase 2 (Pilot)**: AI Risk Scoring, EHR Integration (Epic/Cerner). (Current)
- **Phase 3 (Scale)**: Wearable integration (Apple Watch/Fitbit), Telemedicine video calls.
