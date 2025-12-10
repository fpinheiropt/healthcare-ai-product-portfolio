export type PatientStatus = 'stable' | 'fidgeting' | 'slumping' | 'collapsed';

export interface Patient {
    id: string;
    x: number; // 0-100% of width
    y: number; // 0-100% of height
    status: PatientStatus;
    riskScore: number; // 0-100
    heartRate: number;
    lastMovement: number; // Timestamp
    name: string; // Mock name
}

// Mock names
const NAMES = ["Maria S.", "Joao P.", "Ana M.", "Carlos R.", "Luisa T."];

export class SimulationEngine {
    private patients: Patient[] = [];

    constructor(count: number = 5) {
        this.patients = Array.from({ length: count }, (_, i) => this.createPatient(i));
    }

    private createPatient(index: number): Patient {
        return {
            id: `pat-${index}`,
            x: 10 + Math.random() * 80,
            y: 20 + Math.random() * 60,
            status: 'stable',
            riskScore: 10 + Math.random() * 20,
            heartRate: 60 + Math.random() * 40,
            lastMovement: Date.now(),
            name: NAMES[index % NAMES.length]
        };
    }

    public getPatients() {
        return this.patients;
    }

    public tick() {
        this.patients = this.patients.map(p => this.updatePatient(p));
    }

    private updatePatient(p: Patient): Patient {
        // Random status degradation logic
        const roll = Math.random();
        let newStatus = p.status;
        let newRisk = p.riskScore;

        // Simulate "Silent Hypoxia" drift
        if (roll > 0.98) {
            newRisk += 5;
        }

        // Status Logic
        if (newRisk > 80) newStatus = 'collapsed';
        else if (newRisk > 60) newStatus = 'slumping';
        else if (newRisk > 40) newStatus = 'fidgeting';
        else newStatus = 'stable';

        return {
            ...p,
            status: newStatus,
            riskScore: Math.min(100, newRisk),
            heartRate: p.heartRate + (Math.random() - 0.5) * 2
        };
    }
}
