// BreathEasy Safety Guardrail 🛡️
// Deterministic logic to flag environmental triggers

export interface EnvironmentData {
    aqi: number; // 0-500
    pollenCount: number; // 0-12.0
    humidity: number; // 0-100%
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'HAZARDOUS';

export class TriggerSafety {

    static assessRisk(env: EnvironmentData): { level: RiskLevel; reason: string } {
        // Rule 1: AQI > 150 is HAZARDOUS
        if (env.aqi >= 150) {
            return { level: 'HAZARDOUS', reason: 'Unhealthy air quality (AQI > 150). Avoid outdoor activity.' };
        }

        // Rule 2: AQI > 100 is HIGH
        if (env.aqi >= 100) {
            return { level: 'HIGH', reason: 'Poor air quality for sensitive groups.' };
        }

        // Rule 3: High Pollen
        if (env.pollenCount >= 8.0) {
            return { level: 'MODERATE', reason: 'High pollen count detected.' };
        }

        // Default
        return { level: 'LOW', reason: 'Conditions optimal.' };
    }
}
