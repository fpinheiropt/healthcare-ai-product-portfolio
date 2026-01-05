
import { useState, useEffect, useRef } from 'react';
import { Patient, Vitals, calculateNEWS2, INITIAL_PATIENTS } from '../data/mock-patients';

export const useVitalSimulation = () => {
    const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
    const [isRunning, setIsRunning] = useState(true);

    // Use ref to keep track of current patients without dependency loop
    const patientsRef = useRef(patients);
    patientsRef.current = patients;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setPatients(prevPatients =>
                prevPatients.map(patient => {
                    const newVitals = driftVitals(patient.vitals, patient.diagnosis);
                    const newScore = calculateNEWS2(newVitals);

                    return {
                        ...patient,
                        vitals: newVitals,
                        news2Score: newScore,
                        trend: [...patient.trend.slice(1), newScore]
                    };
                })
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [isRunning]);

    return { patients, isRunning, setIsRunning };
};

// Helper: Introduce small random fluctuations
const driftVitals = (vitals: Vitals, diagnosis: string): Vitals => {
    const drift = (val: number, range: number) => val + (Math.random() * range * 2 - range);

    // Specific logic for scenarios (e.g., Sepsis gets worse)
    let o2Trend = 0;
    if (diagnosis.includes('Sepsis')) o2Trend = -0.1; // Slow desaturation

    return {
        ...vitals,
        hr: Math.round(Math.max(40, Math.min(180, drift(vitals.hr, 1)))),
        bpSys: Math.round(drift(vitals.bpSys, 1)),
        bpDia: Math.round(drift(vitals.bpDia, 1)),
        o2Sat: Math.round(Math.max(70, Math.min(100, drift(vitals.o2Sat, 0.5) + o2Trend))),
        temp: parseFloat(Math.max(34, Math.min(42, drift(vitals.temp, 0.05))).toFixed(1)),
        rr: vitals.rr, // Respiration usually stable unless moving
        consciousness: vitals.consciousness // Consciousness doesn't jump randomly
    };
};
