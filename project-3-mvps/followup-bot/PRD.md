# Product Requirements Document: The Follow-up Bot 📞

## 1. Problem Statement
The "Zone of Danger" for patient safety is the 48 hours post-discharge. Patients are confused, medications are missed, and complications are ignored until they become emergencies (Readmissions).
**Strategic Alignment**: Extends Sword's care model beyond the clinic walls ("Combining AI with Human Empathy").

## 2. Target User
*   **Primary**: Discharged Patients (Post-ER, Post-Op).
*   **Secondary**: Case Managers (Nurses).

## 3. Top Principles
1.  **Passive Monitoring**: Don't wait for the patient to call. Reach out first.
2.  **Zero-Hallucination**: No creative responses. Use rigid scripts to avoid medical liability.
3.  **Human Escalation**: The bot's only job is to detect *when to call a human*.

## 4. Feature Requirements (MVP)

### 4.1. The Script Engine (State Machine)
*   **Requirement**: A pre-defined conversation flow.
*   **Example Flow**:
    1.  Bot: "Hi [Name], did you pick up your [Medication]?"
    2.  User: "No."
    3.  Bot: "Is there a problem? (Cost / Transport / Forget)"
    4.  User: "Cost."
    5.  Bot: "I'm flagging a social worker to call you."
*   **Tech**: XState or simple Switch/Case logic.

### 4.2. Risk Scoring
*   **Requirement**: Every answer impacts a background "Risk Score" (0-100).
*   **Logic**: `Response="Pain worsening" -> Score += 50`.
*   **Threshold**: If `Score > 60` -> Trigger Red Alert.

### 4.3. The Nurse Queue (Dashboard)
*   **Requirement**: A list of patients sorted by Risk Score.
*   **Goal**: Nurses prioritize the "Red Alerts", ignoring the "Green" (doing fine) patients.

## 5. Success Metrics
*   **Response Rate**: % of patients who reply to the SMS (Target: >30%).
*   **Catch Rate**: # of "Red Alerts" generated that results in a medication change or appointment.
