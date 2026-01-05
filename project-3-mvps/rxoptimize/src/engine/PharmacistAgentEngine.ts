// Pharmacist Agent Logic (Interaction Checker)

export interface Drug {
    id: string;
    name: string;
    class: string;
}

export interface Interaction {
    severity: 'contraindicated' | 'major' | 'moderate';
    drugs: [string, string]; // Drug IDs
    alertTitle: string;
    alertMessage: string;
    clinicalManagement: string;
}

// Mock Database of Drugs
export const DRUG_DATABASE: Drug[] = [
    { id: 'warfarin', name: 'Warfarin', class: 'Anticoagulant' },
    { id: 'aspirin', name: 'Aspirin', class: 'Antiplatelet' },
    { id: 'ibuprofen', name: 'Ibuprofen', class: 'NSAID' },
    { id: 'lisinopril', name: 'Lisinopril', class: 'ACE Inhibitor' },
    { id: 'spironolactone', name: 'Spironolactone', class: 'Diuretic' },
    { id: 'sertraline', name: 'Sertraline', class: 'SSRI' },
    { id: 'tramadol', name: 'Tramadol', class: 'Opioid' }
];

export class PharmacistAgentEngine {

    static checkInteractions(activeDrugIds: string[]): Interaction[] {
        const interactions: Interaction[] = [];
        const has = (id: string) => activeDrugIds.includes(id);

        // Rule 1: Warfarin + NSAIDs (Bleeding Risk)
        if (has('warfarin') && (has('aspirin') || has('ibuprofen'))) {
            interactions.push({
                severity: 'major',
                drugs: ['warfarin', has('aspirin') ? 'aspirin' : 'ibuprofen'],
                alertTitle: 'High Bleeding Risk',
                alertMessage: 'Concurrent use of Anticoagulants and NSAIDs/Antiplatelets significantly increases hemorrhage risk.',
                clinicalManagement: 'Consider stopping NSAID. Monitor INR closely if Aspirin is strict indication.'
            });
        }

        // Rule 2: ACE Inhibitor + Potassium-Sparing Diuretic (Hyperkalemia)
        if (has('lisinopril') && has('spironolactone')) {
            interactions.push({
                severity: 'moderate',
                drugs: ['lisinopril', 'spironolactone'],
                alertTitle: 'Risk of Hyperkalemia',
                alertMessage: 'Combination of ACE Inhibitors and Spironolactone may elevate serum potassium.',
                clinicalManagement: 'Monitor serum electrolytes (Potassium) and renal function regularly.'
            });
        }

        // Rule 3: SSRI + Tramadol (Serotonin Syndrome)
        if (has('sertraline') && has('tramadol')) {
            interactions.push({
                severity: 'major',
                drugs: ['sertraline', 'tramadol'],
                alertTitle: 'Serotonin Syndrome Risk',
                alertMessage: 'Concomitant use increases risk of serotonin syndrome (CNS toxicity).',
                clinicalManagement: 'Use lowest effective dose. Monitor for agitation, tremor, or rigidity.'
            });
        }

        return interactions;
    }
}
