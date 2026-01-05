import { motion } from 'framer-motion';
import { HeartPulse, Brain, Stethoscope, ArrowRight } from 'lucide-react';
import { MTS_PROTOCOLS, Flowchart } from '../data/mts-protocols';
import clsx from 'clsx';

interface SymptomTriageProps {
    onSelect: (flowchart: Flowchart) => void;
}

const ICON_MAP: Record<string, any> = {
    HeartPulse,
    Brain,
    Stethoscope
};

export default function SymptomTriage({ onSelect }: SymptomTriageProps) {
    return (
        <div className="h-full flex flex-col p-8 bg-slate-50">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Presenting Complaint</h2>
                <p className="text-xl text-slate-500">Please select the main symptom or reason for your visit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full flex-1 content-center">
                {MTS_PROTOCOLS.map((protocol) => {
                    const Icon = ICON_MAP[protocol.iconName] || Stethoscope;
                    return (
                        <motion.button
                            key={protocol.id}
                            onClick={() => onSelect(protocol)}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-500 hover:ring-4 hover:ring-blue-50 transition-all h-80 group"
                        >
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Icon className="w-12 h-12" strokeWidth={1.5} />
                            </div>
                            <span className="text-3xl font-bold text-slate-800 tracking-tight mb-2">{protocol.title}</span>
                            <div className="flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Start Triage <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="text-center mt-8">
                <button className="text-slate-400 font-medium hover:text-slate-600 underline">
                    My symptom is not listed here
                </button>
            </div>
        </div>
    );
}
