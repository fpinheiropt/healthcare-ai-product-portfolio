// EcoWard Sustainability Engine

export interface WasteData {
    category: 'Recycling' | 'Biohazard' | 'Landfill';
    weightKg: number;
    timestamp: Date;
}

export interface EnergyMetric {
    hour: number; // 0-23
    kwh: number;
    isPeak: boolean;
}

export class SustainabilityEngine {

    // Simulate Daily Waste Output
    static getWasteMetrics(): WasteData[] {
        return [
            { category: 'Recycling', weightKg: 450, timestamp: new Date() },
            { category: 'Biohazard', weightKg: 120, timestamp: new Date() },
            { category: 'Landfill', weightKg: 85, timestamp: new Date() }
        ];
    }

    // Simulate Energy Spikes (Mocking HVAC load)
    static getEnergySpikes(): EnergyMetric[] {
        const metrics: EnergyMetric[] = [];
        for (let i = 8; i <= 20; i++) {
            const baseLoad = 500;
            const spike = (i >= 12 && i <= 16) ? 300 : 0; // Peak hours 12-4 PM
            metrics.push({
                hour: i,
                kwh: baseLoad + spike + Math.random() * 50,
                isPeak: (baseLoad + spike) > 700
            });
        }
        return metrics;
    }

    static calculateCarbonSaved(recyclingKg: number): number {
        // Mock: 1kg recycling saves ~1.5kg CO2e vs landfill
        return Math.round(recyclingKg * 1.5);
    }
}
