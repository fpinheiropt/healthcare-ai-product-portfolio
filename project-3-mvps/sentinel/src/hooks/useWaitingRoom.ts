import { useState, useEffect, useRef } from 'react';
import { SimulationEngine } from '../engine/SimulationEngine';
import type { Patient } from '../engine/SimulationEngine';

export function useWaitingRoom() {
    const engine = useRef(new SimulationEngine(6));
    const [patients, setPatients] = useState<Patient[]>(engine.current.getPatients());
    // const [alerts, setAlerts] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            engine.current.tick();
            const currentPatients = engine.current.getPatients();
            setPatients([...currentPatients]); // Trigger re-render

            // Check for critical alerts
            const critical = currentPatients.filter(p => p.status === 'collapsed' || p.status === 'slumping');
            if (critical.length > 0) {
                // Simple alert logic (dedupe in real app)
                // setAlerts(critical.map(p => `CRITICAL: ${p.name} is ${p.status}`));
            }

        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return { patients };
}
