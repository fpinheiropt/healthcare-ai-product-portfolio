export type MTSPriority = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

export interface Discriminator {
    id: string;
    question: string;
    priority: MTSPriority;
}

export interface Flowchart {
    id: string;
    title: string;
    iconName: string; // Using string to avoid icon import issues in data file
    discriminators: Discriminator[];
}

export const MTS_PROTOCOLS: Flowchart[] = [
    {
        id: 'chest_pain',
        title: 'Chest Pain',
        iconName: 'HeartPulse',
        discriminators: [
            { id: 'cp_1', question: 'Signs of Shock? (Pale, Sweaty, Confused)', priority: 'red' },
            { id: 'cp_2', question: 'Airway Compromise? (Stridor, Drooling)', priority: 'red' },
            { id: 'cp_3', question: 'Cardiac Pain? (Heaviness, Radiation arm/jaw)', priority: 'orange' },
            { id: 'cp_4', question: 'Severe Pain (7-10/10)?', priority: 'orange' },
            { id: 'cp_5', question: 'Pleuritic Pain? (Worse with breathing)', priority: 'yellow' },
            { id: 'cp_6', question: 'Local Tenderness? (Hurts when touched)', priority: 'green' }
        ]
    },
    {
        id: 'headache',
        title: 'Headache',
        iconName: 'Brain',
        discriminators: [
            { id: 'ha_1', question: 'Airway Compromise?', priority: 'red' },
            { id: 'ha_2', question: 'Reduced Consciousness (GCS < 14)?', priority: 'red' },
            { id: 'ha_3', question: 'Sudden Onset / "Thunderclap"?', priority: 'orange' },
            { id: 'ha_4', question: 'Meningism? (Stiff Neck, Photophobia)', priority: 'orange' },
            { id: 'ha_5', question: 'Hitory of Trauma/Injury?', priority: 'yellow' },
            { id: 'ha_6', question: 'Recent fever?', priority: 'yellow' },
            { id: 'ha_7', question: 'Vomiting?', priority: 'green' }
        ]
    },
    {
        id: 'abdominal_pain',
        title: 'Abdominal Pain',
        iconName: 'Stethoscope',
        discriminators: [
            { id: 'ap_1', question: 'Signs of Shock?', priority: 'red' },
            { id: 'ap_2', question: 'Active Bleeding (Vomit/Stool)?', priority: 'orange' },
            { id: 'ap_3', question: 'Severe Pain (7-10/10)?', priority: 'orange' },
            { id: 'ap_4', question: 'Persistent Vomiting?', priority: 'yellow' },
            { id: 'ap_5', question: 'Recent Trauma?', priority: 'yellow' },
            { id: 'ap_6', question: 'Previous similar episodes?', priority: 'green' }
        ]
    }
];

export const PRIORITY_CONFIG: Record<MTSPriority, { color: string, time: number, label: string }> = {
    red: { color: 'bg-red-600', time: 0, label: 'IMMEDIATE' },
    orange: { color: 'bg-orange-500', time: 10, label: 'VERY URGENT' },
    yellow: { color: 'bg-yellow-400 text-black', time: 60, label: 'URGENT' },
    green: { color: 'bg-emerald-500', time: 120, label: 'STANDARD' },
    blue: { color: 'bg-blue-500', time: 240, label: 'NON-URGENT' }
};
