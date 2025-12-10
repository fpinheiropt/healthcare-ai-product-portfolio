# Product Requirements Document: CareFlow Architect 🏗️

## 1. Problem Statement
Hardcoding clinical protocols into software is slow and risky. Doctors cannot directly update triage logic, leading to outdated care pathways.
**Strategic Alignment**: Enables the "Rapid scaling of AI-driven care" by decentralizing protocol creation.

## 2. Target User
*   **Primary**: Chief Medical Officers (CMOs) & Clinical Directors.
*   **Secondary**: Product Managers (validating logic).

## 3. Top Principles
1.  **Safety Guardrails**: The tool must physically prevent the creation of "Dangerous" flows (e.g., dead ends).
2.  **No-Code**: If it requires SQL or Python, it failed. It must be visual (Drag-and-Drop).
3.  **Governance**: Version control for Protocols (v1.0 vs v2.0).

## 4. Feature Requirements (MVP)

### 4.1. The Canvas (Visual Editor)
*   **Requirement**: A React Flow canvas where users drag nodes.
*   **Node Types**:
    *   `Question`: "Does patient have fever?"
    *   `Logic Branch`: "Yes / No / >38C".
    *   `Outcome`: "Refer to GP".
*   **Constraint**: Must support undo/redo.

### 4.2. Validation Engine (The Linter)
*   **Requirement**: Real-time checking of the graph structure.
*   **Safety Checks**:
    *   *Connectivity*: Are all nodes connected to a start?
    *   *Completeness*: Do all questions have answers?
    *   *Red Flags*: Does the protocol screen for danger signs?
*   **Outcome**: "Publish" button is disabled until Validation = Pass.

### 4.3. Simulation Mode
*   **Requirement**: "Test Drive" button that opens a chat window using the current draft protocol.
*   **Goal**: Allow doctors to verify the "Patient Experience" instantly.

## 5. Success Metrics
*   **Velocity**: Time to create a new protocol (Target: < 30 mins).
*   **Error Rate**: % of deployed protocols containing logic gaps (Target: 0%).
