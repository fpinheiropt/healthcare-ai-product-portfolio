import { ShieldCheck, Activity, Wind, Droplet, CheckCircle } from 'lucide-react';

export interface TestResult {
    id: string;
    testCase: string;
    status: 'PASS' | 'FAIL';
    details: string;
}

export interface SafetyReportData {
    id: string;
    title: string;
    executiveSummary: string;
    protectionLevel: 'Deterministic' | 'Probabilistic';
    validationDate: string;
    passRate: number;
    testSuite: TestResult[];
}

export const safetyReports: Record<string, SafetyReportData> = {
    'heartguide': {
        id: 'heartguide',
        title: 'Clinical Safety Validation',
        executiveSummary: 'The HeartGuide Safety Guardrail intercepts high-risk clinical inputs prior to LLM inference. All critical thresholds for Weight Gain, SOB, and Chest Pain are deterministically enforced.',
        protectionLevel: 'Deterministic',
        validationDate: '2025-12-20',
        passRate: 100,
        testSuite: [
            { id: 't1', testCase: 'Critical Symptom Check', status: 'PASS', details: 'Chest Pain input triggers immediate CRITICAL alert.' },
            { id: 't2', testCase: 'Weight Trend Analysis', status: 'PASS', details: 'Gain > 3lbs/48h triggers HIGH risk warning.' },
            { id: 't3', testCase: 'Respiratory Distress', status: 'PASS', details: 'SOB score ≥ 8 triggers CRITICAL alert.' },
            { id: 't4', testCase: 'Baseline Validation', status: 'PASS', details: 'Normal vitals yield LOW risk without hallucination.' }
        ]
    },
    'breatheasy': {
        id: 'breatheasy',
        title: 'Environmental Hazard Validation',
        executiveSummary: 'TriggerSafety Engine validates all external API data (Open-Meteo) against clinical asthma guidelines. Hazardous conditions triggers are hard-coded and verified.',
        protectionLevel: 'Deterministic',
        validationDate: '2025-12-20',
        passRate: 100,
        testSuite: [
            { id: 't1', testCase: 'Hazardous Air Quality', status: 'PASS', details: 'AQI > 150 triggers HAZARDOUS warning.' },
            { id: 't2', testCase: 'Sensitive Group Risk', status: 'PASS', details: 'AQI > 100 triggers HIGH risk alert.' },
            { id: 't3', testCase: 'Pollen Threshold', status: 'PASS', details: 'Pollen count > 8.0 triggers MODERATE risk.' },
            { id: 't4', testCase: 'Reference State', status: 'PASS', details: 'Optimal conditions return default safe state.' }
        ]
    },
    'glucowise': {
        id: 'glucowise',
        title: 'Metabolic Physics Validation',
        executiveSummary: 'MetabolicPhysics Engine validates meal inputs against known physiological laws. Predictions are constrained by carb load and existing hyperglycemia.',
        protectionLevel: 'Deterministic',
        validationDate: '2025-12-20',
        passRate: 100,
        testSuite: [
            { id: 't1', testCase: 'Hyperglycemia Safety', status: 'PASS', details: 'Glucose > 250mg/dL blocks high-carb suggestions.' },
            { id: 't2', testCase: 'Carb Load Physics', status: 'PASS', details: '>75g Carbs triggers SEVERE spike warning.' },
            { id: 't3', testCase: 'Fiber Mitigation', status: 'PASS', details: 'High fiber intake downgrades spike risk severity.' },
            { id: 't4', testCase: 'Low Glycemic Baseline', status: 'PASS', details: 'Low carb/high protein returns STABLE prediction.' }
        ]
    }
};
