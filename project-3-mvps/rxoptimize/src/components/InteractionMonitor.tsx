import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { PharmacistAgentEngine, type Interaction } from '../engine/PharmacistAgentEngine';

interface Props {
    activeDrugs: string[];
}

export const InteractionMonitor: React.FC<Props> = ({ activeDrugs }) => {
    const [interactions, setInteractions] = useState<Interaction[]>([]);

    useEffect(() => {
        const results = PharmacistAgentEngine.checkInteractions(activeDrugs);
        setInteractions(results);
    }, [activeDrugs]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 border-b transition-colors duration-300 ${interactions.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${interactions.length > 0 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        {interactions.length > 0 ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">Safety Agent</h2>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-70">
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${interactions.length > 0 ? 'bg-amber-400' : 'bg-green-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${interactions.length > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                            </span>
                            {interactions.length > 0 ? `${interactions.length} Interactions Detected` : 'Monitoring Active'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
                <AnimatePresence mode="popLayout">
                    {interactions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50"
                        >
                            <ShieldCheck size={64} className="text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">No Interactions Detected</h3>
                            <p className="text-sm text-slate-400">Regimen appears safe based on current rules.</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {interactions.map((interaction, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`p-4 rounded-xl border-l-4 shadow-sm bg-white ${interaction.severity === 'contraindicated' ? 'border-l-red-500' :
                                        interaction.severity === 'major' ? 'border-l-orange-500' :
                                            'border-l-yellow-500'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${interaction.severity === 'contraindicated' ? 'bg-red-100 text-red-700' :
                                            interaction.severity === 'major' ? 'bg-orange-100 text-orange-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {interaction.severity} Severity
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{interaction.alertTitle}</h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{interaction.alertMessage}</p>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                                            <FileText size={12} /> CLINICAL MANAGEMENT
                                        </div>
                                        <p className="text-sm text-slate-700 font-medium">{interaction.clinicalManagement}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
