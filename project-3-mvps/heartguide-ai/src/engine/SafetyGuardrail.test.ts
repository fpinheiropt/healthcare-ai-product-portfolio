import { describe, it, expect } from 'vitest';
import { SafetyGuardrail } from './SafetyGuardrail';

describe('HeartGuide Safety Guardrail 🛡️', () => {

    it('should flag Chest Pain as CRITICAL', () => {
        const result = SafetyGuardrail.assessRisk({
            weightLbs: 150,
            previousWeightLbs: 150,
            shortnessOfBreathScore: 0,
            chestPain: true
        });
        expect(result.level).toBe('CRITICAL');
        expect(result.reason).toContain('chest pain');
    });

    it('should flag >3lbs weight gain as HIGH', () => {
        const result = SafetyGuardrail.assessRisk({
            weightLbs: 153.5,
            previousWeightLbs: 150,
            shortnessOfBreathScore: 2,
            chestPain: false
        });
        expect(result.level).toBe('HIGH');
        expect(result.reason).toContain('weight gain');
    });

    it('should flag severe SOB as CRITICAL', () => {
        const result = SafetyGuardrail.assessRisk({
            weightLbs: 150,
            previousWeightLbs: 150,
            shortnessOfBreathScore: 9,
            chestPain: false
        });
        expect(result.level).toBe('CRITICAL');
    });

    it('should return LOW for normal vitals', () => {
        const result = SafetyGuardrail.assessRisk({
            weightLbs: 150.5, // Small fluctuation
            previousWeightLbs: 150,
            shortnessOfBreathScore: 1,
            chestPain: false
        });
        expect(result.level).toBe('LOW');
    });
});
