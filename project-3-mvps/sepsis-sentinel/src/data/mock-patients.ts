
export interface Vitals {
    hr: number;
    bpSys: number;
    bpDia: number;
    rr: number; // Respiratory Rate
    o2Sat: number;
    temp: number;
    consciousness: 'Alert' | 'Voice' | 'Pain' | 'Unresponsive';
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    diagnosis: string;
    bed: string;
    vitals: Vitals;
    news2Score: number;
    trend: number[]; // Last 10 scores for sparkline
}

export const calculateNEWS2 = (vitals: Vitals): number => {
    let score = 0;

    // Respiration Rate
    if (vitals.rr <= 8 || vitals.rr >= 25) score += 3;
    else if (vitals.rr >= 21) score += 2;
    else if (vitals.rr >= 9 && vitals.rr <= 11) score += 1;

    // Oxygen Saturation
    if (vitals.o2Sat <= 91) score += 3;
    else if (vitals.o2Sat <= 93) score += 2;
    else if (vitals.o2Sat <= 95) score += 1;

    // Systolic BP
    if (vitals.bpSys <= 90) score += 3;
    else if (vitals.bpSys >= 220) score += 3;
    else if (vitals.bpSys <= 100) score += 2;
    else if (vitals.bpSys <= 110) score += 1;

    // Pulse
    if (vitals.hr <= 40 || vitals.hr >= 131) score += 3;
    else if (vitals.hr >= 111) score += 2;
    else if (vitals.hr <= 50 || (vitals.hr >= 91 && vitals.hr <= 110)) score += 1;

    // Consciousness
    if (vitals.consciousness !== 'Alert') score += 3;

    // Temperature
    if (vitals.temp <= 35.0) score += 3;
    else if (vitals.temp >= 39.1) score += 2;
    else if (vitals.temp <= 36.0 || (vitals.temp >= 38.1 && vitals.temp <= 39.0)) score += 1;

    return score;
};

export const INITIAL_PATIENTS: Patient[] = [
    {
        id: 'p1',
        name: 'Maria Silva',
        age: 72,
        diagnosis: 'Pneumonia',
        bed: '01',
        vitals: { hr: 88, bpSys: 125, bpDia: 80, rr: 18, o2Sat: 96, temp: 37.5, consciousness: 'Alert' },
        news2Score: 0,
        trend: [0, 0, 1, 0, 0]
    },
    {
        id: 'p2',
        name: 'Joao Santos',
        age: 65,
        diagnosis: 'Post-Op Abdominal',
        bed: '02',
        vitals: { hr: 95, bpSys: 110, bpDia: 70, rr: 20, o2Sat: 94, temp: 37.8, consciousness: 'Alert' },
        news2Score: 2, // HR (1) + BP (1)
        trend: [1, 1, 2, 2, 2]
    },
    {
        id: 'p3',
        name: 'Ana Pereira',
        age: 81,
        diagnosis: 'UTI / Sepsis',
        bed: '03',
        vitals: { hr: 115, bpSys: 95, bpDia: 60, rr: 24, o2Sat: 90, temp: 38.9, consciousness: 'Voice' },
        news2Score: 13, // HR(2)+BP(2)+RR(2)+O2(3)+Temp(1)+Cons(3) -> High Risk
        trend: [4, 6, 8, 10, 13]
    },
    {
        id: 'p4',
        name: 'Carlos Ferreira',
        age: 55,
        diagnosis: 'COPD Exacerbation',
        bed: '04',
        vitals: { hr: 90, bpSys: 130, bpDia: 85, rr: 22, o2Sat: 92, temp: 36.8, consciousness: 'Alert' },
        news2Score: 4, // RR(2) + O2(2)
        trend: [3, 4, 3, 4, 4]
    },
    {
        id: 'p5',
        name: 'Sofia Costa',
        age: 29,
        diagnosis: 'Pyelonephritis',
        bed: '05',
        vitals: { hr: 105, bpSys: 115, bpDia: 75, rr: 16, o2Sat: 98, temp: 39.2, consciousness: 'Alert' },
        news2Score: 3, // HR(1) + Temp(2)
        trend: [2, 3, 2, 3, 3]
    },
    {
        id: 'p6',
        name: 'Manuel Rodrigues',
        age: 88,
        diagnosis: 'Heart Failure',
        bed: '06',
        vitals: { hr: 65, bpSys: 105, bpDia: 65, rr: 19, o2Sat: 95, temp: 36.5, consciousness: 'Alert' },
        news2Score: 2, // BP(1) + O2(1)
        trend: [1, 2, 1, 2, 2]
    }
];
