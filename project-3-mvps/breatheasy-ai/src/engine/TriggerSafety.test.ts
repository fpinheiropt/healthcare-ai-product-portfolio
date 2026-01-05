import { describe, it, expect } from 'vitest';
import { TriggerSafety } from './TriggerSafety';

describe('BreathEasy Safety Guardrail 🌬️', () => {

    it('should flag AQI > 150 as HAZARDOUS', () => {
        const result = TriggerSafety.assessRisk({
            aqi: 155,
            pollenCount: 2.0,
            humidity: 50
        });
        expect(result.level).toBe('HAZARDOUS');
        expect(result.reason).toContain('Unhealthy air');
    });

    it('should flag AQI > 100 as HIGH', () => {
        const result = TriggerSafety.assessRisk({
            aqi: 105,
            pollenCount: 2.0,
            humidity: 50
        });
        expect(result.level).toBe('HIGH');
    });

    it('should flag Pollen > 8.0 as MODERATE', () => {
        const result = TriggerSafety.assessRisk({
            aqi: 40,
            pollenCount: 9.5,
            humidity: 50
        });
        expect(result.level).toBe('MODERATE');
    });

    it('should return LOW for clean air', () => {
        const result = TriggerSafety.assessRisk({
            aqi: 35, // Good
            pollenCount: 1.5,
            humidity: 45
        });
        expect(result.level).toBe('LOW');
    });
});
