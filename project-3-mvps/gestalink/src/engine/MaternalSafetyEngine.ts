// Maternal Safety Agent Logic (Preeclampsia Focus)

export type SymptomSeverity = 'none' | 'mild' | 'severe';

export interface Symptom {
    id: string;
    label: string;
    description: string;
    severity: SymptomSeverity;
}

export interface RiskAssessment {
    riskLevel: 'low' | 'moderate' | 'high';
    alertTitle: string;
    alertMessage: string;
    actionRequired: string;
    color: string;
}

export const SYMPTOMS_LIST: Omit<Symptom, 'severity'>[] = [
    { id: 'headache', label: 'Severe Headache', description: 'Headache that won’t go away, even after medication' },
    { id: 'vision', label: 'Vision Changes', description: 'Blurriness, flashing lights, or seeing spots' },
    { id: 'swelling', label: 'Sudden Swelling', description: 'Edema in face, hands, or feet (not improved by rest)' },
    { id: 'pain', label: 'Upper Abdominal Pain', description: 'Pain under ribs on the right side' },
    { id: 'breath', label: 'Shortness of Breath', description: 'Difficulty breathing or gasping for air' }
];

export class MaternalSafetyEngine {

    static assessRisk(symptoms: Symptom[]): RiskAssessment {
        // "Agent" Logic: Deterministic rules for safety

        const severeSymptoms = symptoms.filter(s => s.severity === 'severe');
        const mildSymptoms = symptoms.filter(s => s.severity === 'mild');

        // High Risk Rule: Any Severe Symptom
        if (severeSymptoms.length > 0) {
            return {
                riskLevel: 'high',
                alertTitle: 'Immediate Care Required',
                alertMessage: `I've detected symptoms consistent with Preeclampsia or potentially serious complications.`,
                actionRequired: 'Please contact your provider or go to the Triage Unit immediately.',
                color: 'bg-red-50 text-red-900 border-red-200'
            };
        }

        // Moderate Risk Rule: Multiple Mild Symptoms
        if (mildSymptoms.length >= 2) {
            return {
                riskLevel: 'moderate',
                alertTitle: 'Consultation Recommended',
                alertMessage: `You're reporting multiple mild symptoms. While common, these warrant a check-in.`,
                actionRequired: 'Call the nurse line or message your provider today.',
                color: 'bg-orange-50 text-orange-900 border-orange-200'
            };
        }

        // Low Risk
        return {
            riskLevel: 'low',
            alertTitle: 'Monitoring Normal',
            alertMessage: 'No concerning patterns detected. Continue monitoring daily.',
            actionRequired: 'Keep tracking your vitals. Next scan in 24h.',
            color: 'bg-green-50 text-green-900 border-green-200'
        };
    }
}
