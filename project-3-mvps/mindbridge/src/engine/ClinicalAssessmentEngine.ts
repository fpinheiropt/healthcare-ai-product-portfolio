// Clinical Logic for Mental Health Triage (PHQ-9 & GAD-7)

export interface Question {
    id: string;
    text: string;
    options: {
        label: string;
        value: number;
    }[];
}

export interface AssessmentResult {
    score: number;
    severity: string;
    recommendation: string;
    color: string;
}

// PHQ-9 (Patient Health Questionnaire-9) - Depression Screening
export const PHQ9_QUESTIONS: Question[] = [
    {
        id: 'q1',
        text: "Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q2',
        text: "How often have you been bothered by feeling down, depressed, or hopeless?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q3',
        text: "Trouble falling or staying asleep, or sleeping too much?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q4',
        text: "Feeling tired or having little energy?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q5',
        text: "Poor appetite or overeating?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q6',
        text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q7',
        text: "Trouble concentrating on things, such as reading the newspaper or watching television?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q8',
        text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    },
    {
        id: 'q9',
        text: "Thoughts that you would be better off dead or of hurting yourself in some way?",
        options: [
            { label: 'Not at all', value: 0 },
            { label: 'Several days', value: 1 },
            { label: 'More than half the days', value: 2 },
            { label: 'Nearly every day', value: 3 }
        ]
    }
];

export class ClinicalAssessmentEngine {

    static calculatePHQ9(answers: number[]): AssessmentResult {
        const score = answers.reduce((a, b) => a + b, 0);
        let severity = 'None-Minimal';
        let recommendation = 'No action necessary. Maintain healthy lifestyle.';
        let color = 'bg-green-100 text-green-800 border-green-200';

        if (score >= 20) {
            severity = 'Severe Depression';
            recommendation = 'Immediate assessment by a specialist is typically recommended.';
            color = 'bg-red-100 text-red-800 border-red-200';
        } else if (score >= 15) {
            severity = 'Moderately Severe Depression';
            recommendation = 'Active treatment with pharmacotherapy and/or psychotherapy is recommended.';
            color = 'bg-orange-100 text-orange-800 border-orange-200';
        } else if (score >= 10) {
            severity = 'Moderate Depression';
            recommendation = 'Treatment plan should be considered; counseling or pharmacotherapy.';
            color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        } else if (score >= 5) {
            severity = 'Mild Depression';
            recommendation = 'Watchful waiting; repeat PHQ-9 at follow-up.';
            color = 'bg-blue-100 text-blue-800 border-blue-200';
        }

        return { score, severity, recommendation, color };
    }
}
