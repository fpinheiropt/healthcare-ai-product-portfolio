import type { NoteState } from '../logic/TemplateEngine';
import { User, Activity, AlertCircle, ChevronDown, Check, FileText } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NoteBuilderProps {
    state: NoteState;
    onChange: (updates: Partial<NoteState>) => void;
}

export function NoteBuilder({ state, onChange }: NoteBuilderProps) {
    const [openSection, setOpenSection] = useState<string | null>('patient');

    const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

    return (
        <div className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto pb-40">
            {/* 1. Patient Info */}
            <Section title="Patient Demographics" icon={<User />} isOpen={openSection === 'patient'} warning={!state.patientAge} onToggle={() => toggleSection('patient')}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="e.g. 65"
                                value={state.patientAge}
                                onChange={(e) => onChange({ patientAge: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Gender</label>
                            <div className="flex gap-2">
                                {['Male', 'Female'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => onChange({ patientGender: g as 'Male' | 'Female' })}
                                        className={clsx(
                                            "flex-1 py-2 rounded-lg font-medium transition-all text-sm",
                                            state.patientGender === g ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        )}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <NotesField value={state.patientNotes} onChange={(v: string) => onChange({ patientNotes: v })} placeholder="Add specific patient details..." />
                </div>
            </Section>

            {/* 2. Chief Complaint */}
            <Section title="Chief Complaint" icon={<AlertCircle />} isOpen={openSection === 'cc'} warning={!state.chiefComplaint} onToggle={() => toggleSection('cc')}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {['Chest Pain', 'Shortness of Breath', 'Abdominal Pain', 'Fever', 'Headache', 'Dizziness'].map(cc => (
                            <button
                                key={cc}
                                onClick={() => onChange({ chiefComplaint: cc })}
                                className={clsx(
                                    "p-2 text-xs font-medium rounded-lg border text-left transition-all",
                                    state.chiefComplaint === cc ? "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500" : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                                )}
                            >
                                {cc}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.chiefComplaintNotes} onChange={(v: string) => onChange({ chiefComplaintNotes: v })} placeholder="Elaborate on the primary symptom..." />
                </div>
            </Section>

            {/* 3. History of Present Illness (HPI) [NEW] */}
            <Section title="History of Present Illness" icon={<Activity />} isOpen={openSection === 'hpi'} warning={state.hpi.length === 0 && !state.hpiNotes} onToggle={() => toggleSection('hpi')}>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {['Sudden Onset', 'Gradual Worsening', 'Radiating Pain', 'Relieved by Rest', 'Associated Nausea', 'Fever > 38C'].map(item => (
                            <button
                                key={item}
                                onClick={() => {
                                    const newHpi = state.hpi.includes(item) ? state.hpi.filter(i => i !== item) : [...state.hpi, item];
                                    onChange({ hpi: newHpi });
                                }}
                                className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold border transition-all",
                                    state.hpi.includes(item) ? "bg-indigo-100 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.hpiNotes} onChange={(v: string) => onChange({ hpiNotes: v })} placeholder="Narrative history (OLDCARTS)..." rows={4} />
                </div>
            </Section>

            {/* 4. Physical Exam [NEW] */}
            <Section title="Physical Exam" icon={<User />} isOpen={openSection === 'pe'} warning={state.physicalExam.length === 0 && !state.physicalExamNotes} onToggle={() => toggleSection('pe')}>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {['Alert & Oriented', 'Regular Rate/Rhythm', 'Clear Lungs', 'Soft Abdomen', 'No Edema', 'Normal Strength', 'GCS 15'].map(item => (
                            <button
                                key={item}
                                onClick={() => {
                                    const newPe = state.physicalExam.includes(item) ? state.physicalExam.filter(i => i !== item) : [...state.physicalExam, item];
                                    onChange({ physicalExam: newPe });
                                }}
                                className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold border transition-all",
                                    state.physicalExam.includes(item) ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.physicalExamNotes} onChange={(v: string) => onChange({ physicalExamNotes: v })} placeholder="Detailed physical findings..." rows={4} />
                </div>
            </Section>

            {/* 5. Diagnostic Exams [NEW] */}
            <Section title="Diagnostic Results" icon={<FileText />} isOpen={openSection === 'dx'} warning={!state.diagnosticExamsNotes} onToggle={() => toggleSection('dx')}>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {['ECG: NSR', 'CXR: Clear', 'Trop: Negative', 'COVID: Negative', 'Lactate: Normal'].map(item => (
                            <button
                                key={item}
                                onClick={() => {
                                    const newDx = state.diagnosticExams.includes(item) ? state.diagnosticExams.filter(i => i !== item) : [...state.diagnosticExams, item];
                                    onChange({ diagnosticExams: newDx });
                                }}
                                className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold border transition-all",
                                    state.diagnosticExams.includes(item) ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-500 hover:border-blue-300"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.diagnosticExamsNotes} onChange={(v: string) => onChange({ diagnosticExamsNotes: v })} placeholder="Labs, Imaging, and other results..." rows={3} />
                </div>
            </Section>

            {/* 6. Vitals */}
            <Section title="Clinical Stability (Vitals)" icon={<Activity />} isOpen={openSection === 'vitals'} warning={false} onToggle={() => toggleSection('vitals')}>
                <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                        {['Stable', 'Unstable', 'Requires critical care'].map((v) => (
                            <button
                                key={v}
                                onClick={() => onChange({ vitals: v as any })}
                                className={clsx(
                                    "p-3 rounded-lg text-left flex items-center justify-between transition-all text-sm font-bold",
                                    state.vitals === v
                                        ? v === 'Stable' ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-red-100 text-red-800 border-red-200"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                {v}
                                {state.vitals === v && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.vitalsNotes} onChange={(v: string) => onChange({ vitalsNotes: v })} placeholder="Specific vitals (BP, HR, RR, SpO2)..." />
                </div>
            </Section>

            {/* 7. Plan */}
            <Section title="Assessment & Plan" icon={<FileText />} isOpen={openSection === 'plan'} warning={state.plan.length === 0} onToggle={() => toggleSection('plan')}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        {['Discharge Home', 'Admit to Ward', 'Consult Cardiology', 'Start Antibiotics', 'Schedule Follow-up'].map((p) => (
                            <button
                                key={p}
                                onClick={() => {
                                    const newPlan = state.plan.includes(p)
                                        ? state.plan.filter(i => i !== p)
                                        : [...state.plan, p];
                                    onChange({ plan: newPlan });
                                }}
                                className={clsx(
                                    "w-full p-2 text-sm rounded-lg border text-left flex items-center gap-2 transition-all",
                                    state.plan.includes(p) ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold" : "bg-white border-slate-200 text-slate-600"
                                )}
                            >
                                <div className={clsx("w-4 h-4 rounded border flex items-center justify-center", state.plan.includes(p) ? "bg-indigo-600 border-indigo-600" : "border-slate-300")}>
                                    {state.plan.includes(p) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                {p}
                            </button>
                        ))}
                    </div>
                    <NotesField value={state.planNotes} onChange={(v: string) => onChange({ planNotes: v })} placeholder="Detailed medical decision making..." rows={6} />
                </div>
            </Section>
        </div>
    );
}

function NotesField({ value, onChange, placeholder, rows = 2 }: any) {
    return (
        <div className="relative">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400"
            />
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-300 font-bold">
                MD NOTES
            </div>
        </div>
    );
}

// [IMPROVED SECTION COMPONENT]
function Section({ title, icon, isOpen, warning, onToggle, children }: any) {
    return (
        <div className={clsx(
            "border rounded-xl bg-white overflow-hidden transition-all duration-300",
            isOpen ? "border-indigo-500 shadow-lg ring-1 ring-indigo-500/10" : "border-slate-200 shadow-sm hover:border-indigo-300"
        )}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={clsx("p-2 rounded-lg transition-colors", isOpen ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500")}>
                        {icon}
                    </div>
                    <div className="text-left">
                        <span className={clsx("block font-bold text-sm transition-colors", isOpen ? "text-indigo-900" : "text-slate-800")}>{title}</span>
                        {warning && !isOpen && <span className="text-[10px] text-amber-500 font-bold tracking-wide uppercase">Action Required</span>}
                    </div>
                </div>
                <div className={clsx("p-1 rounded-full transition-all", isOpen ? "bg-indigo-50 text-indigo-600 rotate-180" : "text-slate-400")}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="max-h-[50vh] overflow-y-auto p-5 border-t border-indigo-50 bg-slate-50/50 custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
