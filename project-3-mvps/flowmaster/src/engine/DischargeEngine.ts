
import { PatientFlow } from '../data/mock-flow-data';

export interface PredictionResult {
    predictedDischargeDate: string;
    confidence: number; // 0-1
    bottlenecks: string[];
    status: 'On Track' | 'Delayed' | 'Critical Delay';
    delayDays: number;
}

// Mock Random Forest Logic
export const predictDischarge = (patient: PatientFlow): PredictionResult => {
    let delayDays = 0;
    const bottlenecks: string[] = [];

    // 1. Clinical Stability Weighing
    if (patient.medicalStability < 80) {
        delayDays += 2;
        bottlenecks.push('Clinical Instability');
    }

    // 2. Social Issues (Heavy Weight)
    if (patient.socialIssues.length > 0) {
        delayDays += patient.socialIssues.length * 3; // 3 days per social issue
        bottlenecks.push(...patient.socialIssues);
    }

    // 3. Pending Consults
    if (patient.pendingConsults.length > 0) {
        delayDays += 1;
        bottlenecks.push(`Pending: ${patient.pendingConsults.join(', ')}`);
    }

    // Calculate Dates
    const target = new Date(patient.targetDischargeDate);
    const predicted = new Date(target);
    predicted.setDate(target.getDate() + delayDays);

    // Determine Status
    let status: PredictionResult['status'] = 'On Track';
    if (delayDays >= 4) status = 'Critical Delay';
    else if (delayDays >= 1) status = 'Delayed';

    // Confidence Calculation (Inverse to complexity)
    const confidence = Math.max(0.4, 0.95 - (delayDays * 0.05));

    return {
        predictedDischargeDate: predicted.toISOString(),
        confidence,
        bottlenecks,
        status,
        delayDays
    };
};
