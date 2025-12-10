export interface SimulationState {
    time: number;
    inflow: number;
    occupiedBeds: number;
    waitingRoomQueue: number;
    discharged: number;
    collapsed: boolean;
    networkDiverted: number; // Patients successfully sent to other units
}

export interface SimulationParams {
    inflowRate: number;    // Patients per hour
    dischargeRate: number; // Patients per hour
    totalBeds: number;     // Max capacity
    nurseRatio: number;    // Efficiency modifier (1.0 = normal)
    networkOpen: boolean;  // Are other hospitals accepting patients?
    networkCapacity: number; // Slots available in the network
}

// Deterministic Poisson-like generator for step fluctuations
const getFluctuatingInflow = (baseRate: number, time: number) => {
    // Adds a sine wave to simulate "rush hour" peaks
    const fluctuation = Math.sin(time / 4) * (baseRate * 0.5);
    return Math.max(0, Math.floor(baseRate + fluctuation));
};

export class CapacityEngine {
    static getInitialState(): SimulationState {
        return {
            time: 0,
            inflow: 0,
            occupiedBeds: 50, // Start half full
            waitingRoomQueue: 0,
            discharged: 0,
            collapsed: false,
            networkDiverted: 0
        };
    }

    static nextStep(currentState: SimulationState, params: SimulationParams): SimulationState {
        // 1. Calculate new arrivals (Inflow)
        const newArrivals = getFluctuatingInflow(params.inflowRate, currentState.time);

        // 2. Process Discharges (Outflow)
        // Discharges are limited by occupied beds and the nurse ratio efficiency
        const potentialDischarges = Math.floor(params.dischargeRate * params.nurseRatio);
        const actualDischarges = Math.min(currentState.occupiedBeds, potentialDischarges);

        // 3. Update Bed Occupancy (before new admissions)
        let newOccupiedBeds = currentState.occupiedBeds - actualDischarges;

        // 4. Process Queue & New Admissions
        // Patients waiting + new arrivals try to get beds
        const totalDemandingBeds = currentState.waitingRoomQueue + newArrivals;
        const availableBeds = params.totalBeds - newOccupiedBeds;

        const admitted = Math.min(totalDemandingBeds, availableBeds);

        newOccupiedBeds += admitted;

        // 5. Network Diversion (Ghost Referral Prevention)
        // If local is full, try to send to network IF network is OPEN
        let remainingPatients = totalDemandingBeds - admitted;
        let diverted = 0;

        if (remainingPatients > 0 && params.networkOpen) {
            // Can divert up to network capacity per hour
            diverted = Math.min(remainingPatients, params.networkCapacity);
            remainingPatients -= diverted;
        }

        // 6. Update Queue (Overflow)
        const newQueue = remainingPatients;

        // 7. Check for System Collapse
        // Collapse defined as Queue > 2x Total Beds (Unsafe)
        const isCollapsed = newQueue > (params.totalBeds * 2);

        return {
            time: currentState.time + 1,
            inflow: newArrivals,
            occupiedBeds: newOccupiedBeds,
            waitingRoomQueue: newQueue,
            discharged: currentState.discharged + actualDischarges,
            collapsed: isCollapsed,
            networkDiverted: currentState.networkDiverted + diverted
        };
    }

    // Run a 24-hour forecast based on current params
    static runForecast(startState: SimulationState, params: SimulationParams, hours = 24): SimulationState[] {
        const history: SimulationState[] = [];
        let state = { ...startState };

        for (let i = 0; i < hours; i++) {
            state = this.nextStep(state, params);
            history.push(state);
        }

        return history;
    }
}
