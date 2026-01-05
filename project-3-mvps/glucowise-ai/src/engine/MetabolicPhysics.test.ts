import { describe, it, expect } from 'vitest';
import { MetabolicPhysics } from './MetabolicPhysics';

describe('GlucoWise Safety Engine 🩸', () => {

    it('should flag pre-meal > 250 as SEVERE', () => {
        const result = MetabolicPhysics.predictSpikeRisk({
            carbsGrams: 10,
            proteinGrams: 10,
            fiberGrams: 0,
            preMealGlucose: 260
        });
        expect(result.level).toBe('SEVERE_SPIKE');
        expect(result.reason).toContain('hyperglycemia');
    });

    it('should flag >75g carbs as SEVERE (low fiber)', () => {
        const result = MetabolicPhysics.predictSpikeRisk({
            carbsGrams: 80,
            proteinGrams: 5,
            fiberGrams: 2,
            preMealGlucose: 100
        });
        expect(result.level).toBe('SEVERE_SPIKE');
    });

    it('should downgrade spike to MODERATE if fiber is high', () => {
        const result = MetabolicPhysics.predictSpikeRisk({
            carbsGrams: 80,
            proteinGrams: 5,
            fiberGrams: 12, // High fiber
            preMealGlucose: 100
        });
        expect(result.level).toBe('MODERATE_SPIKE');
        expect(result.reason).toContain('buffered by fiber');
    });

    it('should return STABLE for low carbs', () => {
        const result = MetabolicPhysics.predictSpikeRisk({
            carbsGrams: 20,
            proteinGrams: 20,
            fiberGrams: 5,
            preMealGlucose: 100
        });
        expect(result.level).toBe('STABLE');
    });
});
