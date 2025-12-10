import type { Protocol, TriageLevel } from '../types';

export const protocols: Protocol[] = [
    {
        id: 'chest_pain',
        name: 'Chest Pain',
        keywords: ['chest', 'heart', 'pressure', 'tightness', 'sternum'],
        redFlags: [
            { id: 'cp_1', text: 'Is the pain radiating to your left arm or jaw?', triggerAnswer: 'yes', outcomeLevel: 'ESI-1' },
            { id: 'cp_2', text: 'Are you sweating profusely or short of breath?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' },
            { id: 'cp_3', text: 'Does it feel like a heavy elephant sitting on your chest?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' }
        ],
        acuityQuestion: 'On a scale of 0-10, how severe is the pain?',
        scoringRules: [
            { minScore: 7, maxScore: 10, level: 'ESI-2' },
            { minScore: 4, maxScore: 6, level: 'ESI-3' },
            { minScore: 0, maxScore: 3, level: 'ESI-4' }
        ]
    },
    {
        id: 'headache',
        name: 'Headache',
        keywords: ['head', 'headache', 'migraine', 'temple'],
        redFlags: [
            { id: 'ha_1', text: 'Is this the "worst headache of your life" (thunderclap)?', triggerAnswer: 'yes', outcomeLevel: 'ESI-1' },
            { id: 'ha_2', text: 'Do you have a stiff neck or fever?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' },
            { id: 'ha_3', text: 'Did you recently faint or lose consciousness?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' }
        ],
        acuityQuestion: 'Rate the pain intensity (0-10):',
        scoringRules: [
            { minScore: 8, maxScore: 10, level: 'ESI-2' },
            { minScore: 5, maxScore: 7, level: 'ESI-3' },
            { minScore: 0, maxScore: 4, level: 'ESI-4' }
        ]
    },
    {
        id: 'abdominal_pain',
        name: 'Abdominal Pain',
        keywords: ['stomach', 'belly', 'abdomen', 'tummy', 'gut'],
        redFlags: [
            { id: 'abd_1', text: 'Is your abdomen rigid or hard to the touch?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' },
            { id: 'abd_2', text: 'Are you vomiting blood or looking very pale?', triggerAnswer: 'yes', outcomeLevel: 'ESI-1' },
            { id: 'abd_3', text: 'Do you have a known history of aortic aneurysm?', triggerAnswer: 'yes', outcomeLevel: 'ESI-2' }
        ],
        acuityQuestion: 'Rate your pain (0-10):',
        scoringRules: [
            { minScore: 7, maxScore: 10, level: 'ESI-3' }, // Abdominal pain is often ESI-3 unless unstable
            { minScore: 4, maxScore: 6, level: 'ESI-3' },
            { minScore: 0, maxScore: 3, level: 'ESI-4' }
        ]
    }
];

export const getDisposition = (level: TriageLevel): { text: string; color: string } => {
    switch (level) {
        case 'ESI-1': return { text: 'IMMEDIATE RESUSCITATION - Call 911', color: 'bg-red-600' };
        case 'ESI-2': return { text: 'EMERGENT - ER within 10 mins', color: 'bg-orange-500' };
        case 'ESI-3': return { text: 'URGENT - ER within 1 hour', color: 'bg-yellow-500' };
        case 'ESI-4': return { text: 'LESS URGENT - Urgent Care / Clinic', color: 'bg-green-500' };
        case 'ESI-5': return { text: 'NON-URGENT - Telehealth / Home Care', color: 'bg-blue-500' };
        default: return { text: 'Assessment Required', color: 'bg-slate-500' };
    }
};

export class TriageEngine {
    matchProtocol(input: string): Protocol | null {
        const lowerInput = input.toLowerCase();
        for (const p of protocols) {
            if (p.keywords.some(k => lowerInput.includes(k))) return p;
        }
        return null;
    }

    calculateAcuity(score: number, protocol: Protocol): TriageLevel {
        for (const rule of protocol.scoringRules) {
            if (score >= rule.minScore && score <= rule.maxScore) return rule.level;
        }
        return 'ESI-4'; // Fallback
    }
}
