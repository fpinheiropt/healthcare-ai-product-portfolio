// HeartGuide Safety Guardrail 🛡️
// Deterministic logic to catch critical risks BEFORE LLM inference.

export interface VitalsInput {
    weightLbs: number;
    previousWeightLbs: number;
    shortnessOfBreathScore: number; // 0-10
    chestPain: boolean;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export class SafetyGuardrail {

    static assessRisk(vitals: VitalsInput): { level: RiskLevel; reason: string } {
        // Rule 1: Chest Pain is always CRITICAL
        if (vitals.chestPain) {
            return { level: 'CRITICAL', reason: 'Patient reported chest pain.' };
        }

        // Rule 2: Weight Gain > 3 lbs is HIGH risk
        const weightGain = vitals.weightLbs - vitals.previousWeightLbs;
        if (weightGain >= 3.0) {
            return { level: 'HIGH', reason: `Sudden weight gain of ${weightGain.toFixed(1)} lbs.` };
        }

        // Rule 3: Shortness of Breath (SOB) Logic
        if (vitals.shortnessOfBreathScore >= 8) {
            return { level: 'CRITICAL', reason: 'Severe Shortness of Breath reported (>=8/10).' };
        }
        if (vitals.shortnessOfBreathScore >= 5) {
            return { level: 'MODERATE', reason: 'Moderate Shortness of Breath reported.' };
        }

        // Default
        return { level: 'LOW', reason: 'Vitals within normal variance.' };
    }
}
