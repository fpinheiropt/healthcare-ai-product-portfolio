// Oncology Staging Logic (Mock - Breast Cancer AJCC 8th Ed. Simulation)

export type TNMValue = string;

export interface StagingResult {
    stage: string;
    description: string;
    treatment: string[];
    color: string;
}

export const TNM_OPTIONS = {
    T: [
        { value: 'TX', label: 'TX: Primary tumor cannot be assessed' },
        { value: 'T0', label: 'T0: No evidence of primary tumor' },
        { value: 'Tis', label: 'Tis: Carcinoma in situ' },
        { value: 'T1', label: 'T1: Tumor ≤ 20 mm' },
        { value: 'T2', label: 'T2: Tumor > 20 mm but ≤ 50 mm' },
        { value: 'T3', label: 'T3: Tumor > 50 mm' },
        { value: 'T4', label: 'T4: Direct extension to chest wall/skin' },
    ],
    N: [
        { value: 'NX', label: 'NX: Regional lymph nodes cannot be assessed' },
        { value: 'N0', label: 'N0: No regional lymph node metastasis' },
        { value: 'N1', label: 'N1: Metastasis to movable ipsilateral level I, II axillary LN' },
        { value: 'N2', label: 'N2: Metastasis to ipsilateral level I, II axillary LN (fixed)' },
        { value: 'N3', label: 'N3: Metastasis to infraclavicular LN' },
    ],
    M: [
        { value: 'M0', label: 'M0: No clinical or radiographic evidence of distant metastases' },
        { value: 'M1', label: 'M1: Distant Histological or Clinical Metastases' },
    ]
};

export class OncologyStagingEngine {

    static calculateStage(t: TNMValue, n: TNMValue, m: TNMValue): StagingResult {
        // Mock Implementation of AJCC Staging Logic

        // M1 is always Stage IV
        if (m === 'M1') {
            return {
                stage: 'Stage IV',
                description: 'Distant Metastasis Detected.',
                treatment: ['Systemic Therapy (Chemotherapy, Hormone Therapy)', 'Palliative Care', 'Clinical Trials'],
                color: 'bg-red-100 text-red-800 border-red-200'
            };
        }

        // T4 (Any N) -> Stage IIIB or IIIC
        if (t === 'T4') {
            if (n === 'N3') {
                return {
                    stage: 'Stage IIIC',
                    description: 'Advanced local tumor with significant nodal involvement.',
                    treatment: ['Neoadjuvant Chemotherapy', 'Surgery', 'Radiation'],
                    color: 'bg-orange-100 text-orange-800 border-orange-200'
                };
            }
            return {
                stage: 'Stage IIIB',
                description: 'Locally advanced tumor extending to chest wall or skin.',
                treatment: ['Neoadjuvant Chemotherapy', 'Surgery', 'Radiation'],
                color: 'bg-orange-100 text-orange-800 border-orange-200'
            };
        }

        // N3 (Any T) -> Stage IIIC
        if (n === 'N3') {
            return {
                stage: 'Stage IIIC',
                description: 'Advanced nodal involvement (Infraclavicular/Supraclavicular).',
                treatment: ['Neoadjuvant Chemotherapy', 'Surgery', 'Radiation'],
                color: 'bg-orange-100 text-orange-800 border-orange-200'
            };
        }

        // Stage III (T3 with N1/N2 or T0-T2 with N2)
        if ((t === 'T3' && n !== 'N0') || (n === 'N2')) {
            return {
                stage: 'Stage IIIA',
                description: 'Large tumor with nodes OR Fixed axillary nodes.',
                treatment: ['Surgery', 'Chemotherapy', 'Radiation'],
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
            };
        }

        // Stage IIB (T3 N0 or T2 N1)
        if ((t === 'T3' && n === 'N0') || (t === 'T2' && n === 'N1')) {
            return {
                stage: 'Stage IIB',
                description: 'Large tumor without nodes OR Medium tumor with limited nodes.',
                treatment: ['Surgery', 'Adjuvant Therapy'],
                color: 'bg-blue-100 text-blue-800 border-blue-200'
            };
        }

        // Stage IIA (T0-T1 N1 or T2 N0)
        if (((t === 'T0' || t === 'T1') && n === 'N1') || (t === 'T2' && n === 'N0')) {
            return {
                stage: 'Stage IIA',
                description: 'Small tumor with nodes OR Medium tumor without nodes.',
                treatment: ['Surgery', 'Sentinel Node Biopsy', 'Consider Genomic Testing'],
                color: 'bg-blue-100 text-blue-800 border-blue-200'
            };
        }

        // Stage I (T1 N0)
        if (t === 'T1' && n === 'N0') {
            return {
                stage: 'Stage I',
                description: 'Early invasive cancer. Small tumor, no nodes.',
                treatment: ['Surgery (Lumpectomy/Mastectomy)', 'Radiation (if Lumpectomy)', 'Endocrine Therapy (if HR+)'],
                color: 'bg-green-100 text-green-800 border-green-200'
            };
        }

        // Stage 0 (Tis N0)
        if (t === 'Tis') {
            return {
                stage: 'Stage 0',
                description: 'Carcinoma In Situ (Non-invasive).',
                treatment: ['Surgery', 'Radiation (likely)'],
                color: 'bg-green-50 text-green-900 border-green-200'
            };
        }

        // Default / Fallback
        return {
            stage: 'Indeterminate',
            description: 'Combination requires further clinical workup.',
            treatment: ['Re-evaluate pathology'],
            color: 'bg-slate-100 text-slate-600 border-slate-200'
        };
    }
}
