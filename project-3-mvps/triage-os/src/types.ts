export type TriageLevel = 'ESI-1' | 'ESI-2' | 'ESI-3' | 'ESI-4' | 'ESI-5';

export interface RedFlagQuestion {
    id: string;
    text: string;
    triggerAnswer: 'yes' | 'no'; // Answer that triggers the red flag (usually 'yes')
    outcomeLevel: TriageLevel;
}

export interface ScoringRule {
    minScore: number;
    maxScore: number;
    level: TriageLevel;
}

export interface Protocol {
    id: string;
    name: string;
    keywords: string[];
    redFlags: RedFlagQuestion[];
    acuityQuestion: string; // e.g. "Rate your pain 0-10"
    scoringRules: ScoringRule[];
}

export interface TriageResult {
    level: TriageLevel;
    disposition: string;
    color: string;
}
