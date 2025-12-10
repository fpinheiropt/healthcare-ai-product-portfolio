# The Follow-up Bot 📞
**Automated Post-Discharge Retention & Monitoring**

> *Extending the "Sword Intelligence" Care Model to the Home*

## 🏥 The Problem
The most dangerous time for a patient is the 48 hours *after* leaving a facility. Confusion about meds, worsening symptoms, and lack of follow-up lead to preventable readmissions (which cost health systems billions).

## 💡 The Solution: Scalable Compassion
**The Empathy Bot** is an automated "Check-In System" that maintains a lifeline with patients. It uses a clinically validated script to detect early warning signs without requiring human staff for every interaction.

### The "Human-in-the-Loop" Design
*   **The Check-In**: "Hi John, it's the HealthLine team. How is your pain on a scale of 1-10?"
*   **The Logic**:
    *   `Pain < 5`: "Glad to hear. Remember to take your meds." (Automated End).
    *   `Pain > 7`: "That sounds high. I'm connecting you to a nurse now." (**Human Escalation**).

## 🛠️ Technical Implementation (Zero-API)
*   **Chat Engine**: A Decision Tree Chatbot (scripted). It does *not* use LLMs (to avoid "medical advice" liability).
*   **Escalation Trigger**: Simple logic observers (`if sentiment == 'negative' OR value > threshold`).
*   **Dashboard**: A "Review Queue" for nurses showing only the flagged patients.

## 🚀 Features (MVP)
1.  **Script Builder**: Define the "Check-In" flow (Day 1, Day 3, Day 7).
2.  **Risk Scorer**: Auto-calculates a "Readmission Risk" score based on patient answers.
3.  **Nurse Alert System**: Visual indicators for patients needing immediate human contact.
