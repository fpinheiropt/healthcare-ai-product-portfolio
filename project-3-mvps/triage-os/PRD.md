# Product Requirements Document: HealthLine AI (Triage-Os) 🚑

## 1. Problem Statement
National health lines are overwhelmed. Human operators cannot scale during surges. Inconsistent triage leads to patient safety risks from under-triage and resource wastage from over-triage.
**Strategic Alignment**: Aligns with Sword Health's goal to build an "AI Driven Front Door" for 10M citizens.

## 2. Target User
*   **Primary**: Citizens with acute symptoms seeking guidance.
*   **Secondary**: Ministry of Health Administrators (monitoring flow).

## 3. Top Principles
1.  **Safety First**: Zero tolerance for missing life-threatening conditions ("Red Flags").
2.  **Determinism**: No "Black Box" AI. All decisions must trace back to clinical protocols (ESI).
3.  **Speed**: Triage outcome in < 2 minutes.

## 4. Feature Requirements (MVP)

### 4.1. Symptom Intake (Chat UI)
*   **Requirement**: User inputs "I have a headache" -> System maps to `ChiefComplaint: Headache`.
*   **Constraint**: Use keyword matching/fuzzy logic (No LLM).
*   **Acceptance Criteria**: Correctly identifies 10 top common complaints (Chest Pain, Abdominal Pain, Fever, etc.).

### 4.2. Red Flag Exclusion (Safety Layer)
*   **Requirement**: Before any detailed questions, screen for Red Flags.
*   **Logic**: If `Complaint == Headache`, Ask: "Is this the worst headache of your life?" (Subarachnoid Hemorrhage check).
*   **Outcome**: If Yes -> Stop Triage -> "Call 911/112".

### 4.3. Acuity Scoring (The Engine)
*   **Requirement**: Calculate ESI Level (1-5).
*   **Logic**:
    *   ESI 1: Unstable (911).
    *   ESI 2: High Risk (ER Now).
    *   ESI 3: Resource Intense (Urgent Care).
    *   ESI 4/5: Non-Urgent (GP/Self-Care).

## 5. Success Metrics
*   **Safety**: 100% sensitivity for Red Flag conditions in test scenarios.
*   **Deflection**: % of cases safely routed away from ER (Target: >40%).
*   **Completion**: % of users finishing the triage flow (Target: >90%).
