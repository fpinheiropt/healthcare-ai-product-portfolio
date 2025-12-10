# Product Requirements Document: Docu-Flow 📝

## 1. Problem Statement
Documentation is the #1 cause of clinician burnout. Doctors spend more time typing than treating. LLMs are promising but risky (hallucinations).
**Strategic Alignment**: "Reducing routine workload" for professionals (Direct quote from news).

## 2. Target User
*   **Primary**: Hospitalists / ER Doctors / Residents.
*   **Context**: Busy wards, needing to write Admission/Discharge notes fast.

## 3. Top Principles
1.  **Structure > Freedom**: Don't let them free-text. Force structured choices to ensure quality.
2.  **Instant Preview**: Show the result immediately to build trust.
3.  **One-Click Output**: Must paste easily into Epic/Cerner.

## 4. Feature Requirements (MVP)

### 4.1. The Input Grid
*   **Requirement**: Clickable buttons/dropdowns for key clinical data points.
*   **Sections**: `Presenting Complaint`, `Course in Hospital`, `Vitals`, `Discharge Plan`.
*   **Smart Defaults**: "Normal" buttons that pre-fill standard values (e.g., "Afebrile, Hemodynamically Stable").

### 4.2. Template Engine (String Interpolator)
*   **Requirement**: Convert selections into prose.
*   **Logic**:
    `If (Antibiotics == 'Augmentin') -> Text += "Patient will complete a 7-day course of Augmentin 875mg BID."`
*   **Constraint**: No "Generative" guessing. Only pre-approved text blocks.

### 4.3. Copy-to-Clipboard
*   **Requirement**: A giant "Copy" button that formats the text as Rich Text (RTF) or Markdown for easy pasting.

## 5. Success Metrics
*   **Time to Note**: Seconds to complete a standard Discharge Note (Target: < 45 seconds).
*   **Quality**: 0% spelling/grammar errors (inherent to templates).
