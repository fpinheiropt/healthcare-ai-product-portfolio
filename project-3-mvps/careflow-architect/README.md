# CareFlow Architect 🏗️
**No-Code Clinical Protocol Builder**

> *Scalable Tooling for the "Sword Intelligence" Platform*

## 🏥 The Problem
Hardcoding clinical logic into software is slow and dangerous. Engineers don't understand medicine, and doctors don't write code. This "Translation Gap" bottlenecks the deployment of AI care pathways.

## 💡 The Solution: Platform-Thinking
**CareFlow Architect** is a visual "Drag-and-Drop" workspace that empowers Medical Directors to design, test, and deploy triage protocols without waiting for engineering.

### The "Clinician-in-the-Loop" Design
*   **Visual Logic**: Nodes represent questions ("Does patient have fever?"). Edges represent answers ("Yes > 38°C").
*   **Safety Guardrails**: The system prevents "Dead Ends" (logic paths with no outcome) and "Circular Loops."
*   **Instant Deploy**: Once approved, the protocol generates a JSON definition that immediately powers the *Triage-Os* patient app.

## 🛠️ Technical Implementation (Zero-API)
*   **Canvas Engine**: React Flow (Node-based editor library).
*   **Validation Logic**: A Graph Traversal algorithm (BFS/DFS) that runs on save to check for connectivity and validity.
*   **Format**: Exports standardized JSON Schema compatible with FHIR/Clinical Guidelines.

## 🚀 Features (MVP)
1.  **Node Library**: Drag-and-drop "Symptom", "Logic Gate", "Diagnosis", and "Referral" nodes.
2.  **Safety Linter**: Real-time warnings (e.g., *Warning: 'Chest Pain' branch has no Red Flag check*).
3.  **Simulator**: "Test Run" button to play through the protocol instantly in a preview window.
