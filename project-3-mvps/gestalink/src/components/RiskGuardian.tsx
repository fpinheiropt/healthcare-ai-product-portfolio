import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, CheckCircle, Activity, HeartPulse } from 'lucide-react';
import { MaternalSafetyEngine, SYMPTOMS_LIST, type Symptom, type SymptomSeverity, type RiskAssessment } from '../engine/MaternalSafetyEngine';

export const RiskGuardian: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>(SYMPTOMS_LIST.map(s => ({ ...s, severity: 'none' })));
    const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

    useEffect(() => {
        const result = MaternalSafetyEngine.assessRisk(symptoms);
        setAssessment(result);
    }, [symptoms]);

    const handleSeverityChange = (id: string, severity: SymptomSeverity) => {
        setSymptoms(prev => prev.map(s => s.id === id ? { ...s, severity } : s));
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full">
            {/* Agent Header */}
            <div className={`p-6 border-b transition-colors duration-500 ${assessment?.color || 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                        <ShieldCheck className={`w-8 h-8 ${assessment?.riskLevel === 'high' ? 'text-red-500' : assessment?.riskLevel === 'moderate' ? 'text-orange-500' : 'text-green-500'}`} />
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-slate-900 border-none">GestaGuardian Agent</h2>
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-80">
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${assessment?.riskLevel === 'high' ? 'bg-red-400' : 'bg-green-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${assessment?.riskLevel === 'high' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                            </span>
                            Active Monitoring
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-0 lg:p-6 grid lg:grid-cols-2 gap-0 lg:gap-8">
                {/* Symptom Input (Left) */}
                <div className="p-6 lg:p-0 space-y-6">
                    <div className="mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Daily Symptom Check</h3>
                        <p className="text-slate-500 text-sm">Select severity for each indicator.</p>
                    </div>

                    <div className="space-y-4">
                        {symptoms.map((symptom) => (
                            <div key={symptom.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="font-bold text-slate-700">{symptom.label}</div>
                                        <div className="text-xs text-slate-500">{symptom.description}</div>
                                    </div>
                                    {symptom.severity !== 'none' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`w-2 h-2 rounded-full ${symptom.severity === 'severe' ? 'bg-red-500' : 'bg-orange-400'}`}
                                        />
                                    )}
                                </div>

                                <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                                    {(['none', 'mild', 'severe'] as const).map((sev) => (
                                        <button
                                            key={sev}
                                            onClick={() => handleSeverityChange(symptom.id, sev)}
                                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${symptom.severity === sev
                                                ? sev === 'none' ? 'bg-slate-100 text-slate-600'
                                                    : sev === 'mild' ? 'bg-orange-100 text-orange-700'
                                                        : 'bg-red-100 text-red-700'
                                                : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {sev.charAt(0).toUpperCase() + sev.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agent Analysis (Right) */}
                <div className="bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {assessment && (
                            <motion.div
                                key={assessment.riskLevel}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center"
                            >
                                <div className={`inline-flex p-4 rounded-full mb-6 ${assessment.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                                    assessment.riskLevel === 'moderate' ? 'bg-orange-100 text-orange-600' :
                                        'bg-green-100 text-green-600'
                                    }`}>
                                    {assessment.riskLevel === 'high' ? <AlertTriangle size={48} /> :
                                        assessment.riskLevel === 'moderate' ? <Activity size={48} /> :
                                            <CheckCircle size={48} />}
                                </div>

                                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
                                    {assessment.alertTitle}
                                </h3>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {assessment.alertMessage}
                                </p>

                                <div className={`p-4 rounded-xl text-sm font-medium ${assessment.color}`}>
                                    <strong>Agent Recommendation:</strong><br />
                                    {assessment.actionRequired}
                                </div>

                                {assessment.riskLevel === 'high' && (
                                    <button className="mt-6 w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 animate-pulse">
                                        <HeartPulse size={20} /> Contact Provider Now
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
