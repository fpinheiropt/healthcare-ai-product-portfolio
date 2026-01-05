
export interface Node {
    id: string;
    type: 'ward' | 'er' | 'radiology' | 'lab' | 'pharmacy';
    x: number;
    y: number;
    label: string;
}

export interface Porter {
    id: string;
    name: string;
    status: 'idle' | 'busy';
    currentLocation: { x: number; y: number };
    assignedJobId: string | null;
    route: Node[]; // List of nodes to visit
}

export interface Job {
    id: string;
    description: string;
    startNodeId: string;
    endNodeId: string;
    priority: 'routine' | 'urgent' | 'stat';
    status: 'pending' | 'assigned' | 'completed';
    timestamp: number;
}

// Mock Hospital Layout (Grid 100x100)
export const HOSPITAL_NODES: Node[] = [
    { id: 'ER', type: 'er', x: 10, y: 10, label: 'Emergency' },
    { id: 'RAD', type: 'radiology', x: 80, y: 20, label: 'Radiology' },
    { id: 'ICU', type: 'ward', x: 50, y: 15, label: 'ICU' },
    { id: 'W1', type: 'ward', x: 20, y: 60, label: 'Ward 1' },
    { id: 'W2', type: 'ward', x: 50, y: 60, label: 'Ward 2' },
    { id: 'W3', type: 'ward', x: 80, y: 60, label: 'Ward 3' },
    { id: 'LAB', type: 'lab', x: 90, y: 90, label: 'Pathology' },
    { id: 'PHARM', type: 'pharmacy', x: 20, y: 90, label: 'Pharmacy' },
];

export const INITIAL_PORTERS: Porter[] = [
    { id: 'P1', name: 'Porter Joe', status: 'idle', currentLocation: { x: 50, y: 50 }, assignedJobId: null, route: [] },
    { id: 'P2', name: 'Porter Sarah', status: 'idle', currentLocation: { x: 50, y: 50 }, assignedJobId: null, route: [] },
    { id: 'P3', name: 'Porter Mike', status: 'idle', currentLocation: { x: 50, y: 50 }, assignedJobId: null, route: [] },
];

// Simple Euclidean Distance
const getDistance = (n1: Node | { x: number, y: number }, n2: Node | { x: number, y: number }) => {
    return Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
};

export const LogisticsEngine = {
    // Naive TSP / Nearest Neighbor simulation
    optimizeRoute: (porterLocation: { x: number, y: number }, jobs: Job[]): string[] => {
        // Logic: Find closest start node, then end, then next closest...
        // For MVP, we just return a simple path: Start -> End for the highest priority job
        if (jobs.length === 0) return [];

        // Sort by priority
        const sortedJobs = [...jobs].sort((a, b) => {
            const priorityMap = { 'stat': 3, 'urgent': 2, 'routine': 1 };
            return priorityMap[b.priority] - priorityMap[a.priority];
        });

        const topJob = sortedJobs[0];
        return [topJob.startNodeId, topJob.endNodeId];
    },

    getNode: (id: string) => HOSPITAL_NODES.find(n => n.id === id)
};
