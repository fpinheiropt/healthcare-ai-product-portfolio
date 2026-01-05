
export interface PatientFlow {
    id: string;
    name: string;
    age: number;
    diagnosis: string; // "Pneumonia", "Stroke", "Hip Fracture"
    admissionDate: string; // ISO
    medicalStability: number; // 0-100%
    socialIssues: string[]; // "Lives Alone", "Stairs at home"
    pendingConsults: string[]; // "Cardiology", "PT"
    targetDischargeDate: string; // Original DRG estimate
}

export const MOCK_FLOW_PATIENTS: PatientFlow[] = [
    {
        id: 'f1',
        name: 'Antonio Sousa',
        age: 82,
        diagnosis: 'Hip Fracture (Post-Op)',
        admissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        medicalStability: 95,
        socialIssues: ['Needs Rehab Placement', 'Lives Alone'],
        pendingConsults: ['Physiotherapy'],
        targetDischargeDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'f2',
        name: 'Maria Lima',
        age: 68,
        diagnosis: 'COPD Exacerbation',
        admissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        medicalStability: 85,
        socialIssues: [],
        pendingConsults: [],
        targetDischargeDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'f3',
        name: 'Jose Ferreira',
        age: 75,
        diagnosis: 'Stroke (Ischemic)',
        admissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        medicalStability: 70,
        socialIssues: ['Waiting for Family Meeting'],
        pendingConsults: ['Neurology', 'Speech Therapy'],
        targetDischargeDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'f4',
        name: 'Ana Costa',
        age: 45,
        diagnosis: 'Pyelonephritis',
        admissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        medicalStability: 98,
        socialIssues: [],
        pendingConsults: [],
        targetDischargeDate: new Date(Date.now()).toISOString() // Should go today
    },
    {
        id: 'f5',
        name: 'Manuel Rocha',
        age: 88,
        diagnosis: 'Heart Failure',
        admissionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        medicalStability: 60,
        socialIssues: ['No caregiver'],
        pendingConsults: ['Cardiology'],
        targetDischargeDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    }
];
