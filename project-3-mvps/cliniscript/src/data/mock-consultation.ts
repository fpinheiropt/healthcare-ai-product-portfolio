export interface DialogueLine {
    speaker: 'Doctor' | 'Patient';
    text: string;
    delay: number; // Delay before this line starts
}

export const CONSULTATION_SCRIPT: DialogueLine[] = [
    { speaker: 'Doctor', text: "Good morning, Maria. How have you been feeling since we started the new blood pressure medication?", delay: 500 },
    { speaker: 'Patient', text: "Well, doctor, the headaches are gone, which is great.", delay: 3000 },
    { speaker: 'Patient', text: "But I've been feeling a bit dizzy when I stand up too quickly.", delay: 5000 },
    { speaker: 'Doctor', text: "I see. Does that happen every time, or just occasionally?", delay: 8000 },
    { speaker: 'Patient', text: "Mostly in the mornings. And I've noticed my ankles are a bit swollen by the end of the day.", delay: 11000 },
    { speaker: 'Doctor', text: "Okay, let's check your pressure right now. It looks like it's 115 over 75.", delay: 15000 },
    { speaker: 'Doctor', text: "That is a bit on the lower side. The dizziness might be orthostatic hypotension.", delay: 19000 },
    { speaker: 'Doctor', text: "I think we should reduce the dosage of the Amlodipine to 5mg.", delay: 23000 },
    { speaker: 'Patient', text: "That sounds good. Will that help with the ankle swelling too?", delay: 26000 },
    { speaker: 'Doctor', text: "Yes, that is a common side effect of Amlodipine. Lowering the dose should help both.", delay: 29000 }
];

export const MAX_SCRIPT_DURATION = 33000; // Total duration roughly

export const GENERATED_SOAP = {
    subjective: "Patient returns for hypertension management follow-up. Reports resolution of headaches. Complains of new orthostatic dizziness, particularly in morning, and mild bilateral ankle edema.",
    objective: "BP: 115/75 mmHg. Heart Rate: 72 bpm. Lungs: Clear. Extremities: 1+ pitting edema bilaterally.",
    assessment: "1. Hypertension - currently well-controlled, possibly over-treated.\n2. Med Side Effects - Symptomatic orthostatic hypotension and peripheral edema likely secondary to Amlodipine.",
    plan: "1. Decrease Amlodipine from 10mg to 5mg daily.\n2. Monitor BP at home.\n3. Follow up in 4 weeks."
};
