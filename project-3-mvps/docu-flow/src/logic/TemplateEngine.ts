export interface NoteState {
    patientAge: string;
    patientGender: 'Male' | 'Female' | '';
    patientNotes: string; // [NEW]

    chiefComplaint: string;
    chiefComplaintNotes: string; // [NEW]

    // [NEW SECTION]
    hpi: string[];
    hpiNotes: string;

    // [NEW SECTION]
    physicalExam: string[];
    physicalExamNotes: string;

    // [NEW SECTION]
    diagnosticExams: string[];
    diagnosticExamsNotes: string;

    vitals: 'Stable' | 'Unstable' | 'Requires critical care' | '';
    vitalsNotes: string; // [NEW]

    plan: string[];
    planNotes: string; // [NEW]
}

export const INITIAL_NOTE_STATE: NoteState = {
    patientAge: '',
    patientGender: 'Male',
    patientNotes: '',
    chiefComplaint: '',
    chiefComplaintNotes: '',
    hpi: [],
    hpiNotes: '',
    physicalExam: [],
    physicalExamNotes: '',
    diagnosticExams: [],
    diagnosticExamsNotes: '',
    vitals: 'Stable',
    vitalsNotes: '',
    plan: [],
    planNotes: ''
};

export const TemplateEngine = {
    generate: (state: NoteState): string => {
        const {
            patientAge, patientGender, patientNotes,
            chiefComplaint, chiefComplaintNotes,
            hpi, hpiNotes,
            physicalExam, physicalExamNotes,
            diagnosticExams, diagnosticExamsNotes,
            vitals, vitalsNotes,
            plan, planNotes
        } = state;

        // 1. Header & ID
        let text = `ADMISSION NOTE\n`;
        text += `PATIENT: ${patientAge}-year-old ${patientGender}\n`;
        if (patientNotes) text += `NOTE: ${patientNotes}\n`;

        text += `CHIEF COMPLAINT: ${chiefComplaint || '[Not specified]'}\n`;
        if (chiefComplaintNotes) text += `NOTE: ${chiefComplaintNotes}\n`;
        text += `\n`;

        // 2. HPI
        text += `HISTORY OF PRESENT ILLNESS:\n`;
        text += `Patient presents with ${chiefComplaint || 'symptoms'}. `;
        if (hpi.length > 0) text += `Reports ${hpi.join(', ')}. `;
        if (hpiNotes) text += `\n${hpiNotes}`;
        text += `\n\n`;

        // 3. Physical Exam & Vitals
        text += `PHYSICAL EXAM & VITALS:\n`;
        text += `Vitals are currently ${vitals.toLowerCase()}. `;
        if (physicalExam.length > 0) text += `Exam reveals: ${physicalExam.join(', ')}. `;
        if (vitalsNotes) text += `Vitals Note: ${vitalsNotes}. `;
        if (physicalExamNotes) text += `\n${physicalExamNotes}`;
        text += `\n\n`;

        // 4. Diagnostic Exams
        text += `DIAGNOSTIC DATA:\n`;
        if (diagnosticExams.length > 0) text += `Key findings: ${diagnosticExams.join(', ')}. `;
        if (diagnosticExamsNotes) text += `${diagnosticExamsNotes}`;
        if (diagnosticExams.length === 0 && !diagnosticExamsNotes) text += `Pending evaluation.`;
        text += `\n\n`;

        // 5. Plan
        text += `ASSESSMENT & PLAN:\n`;
        if (plan.length > 0) {
            text += plan.map(p => `- ${p}`).join('\n');
        } else {
            text += "- Continue current management";
        }
        if (planNotes) text += `\nNOTE: ${planNotes}`;
        text += `\n`;

        return text;
    }
};
