import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentInsightProps {
    riskScore: number;
    weightChange: number; // lbs change in last 48h
    symptomCount: number;
}

const AgentInsight: React.FC<AgentInsightProps> = ({ riskScore, weightChange, symptomCount }) => {

    // Deterministic Logic for "Agent Voice"
    const getInsight = () => {
        if (riskScore > 50) {
            if (weightChange > 2) {
                return {
                    type: 'critical',
                    message: "I've detected a fluid drift.",
                    action: "Your weight is up +2lbs. Let's swap dinner for a low-sodium option and rest tonight."
                };
            }
            if (symptomCount > 3) {
                return {
                    type: 'critical',
                    message: "Your symptoms vary from baseline.",
                    action: "Please complete a full check-in so I can update your care team."
                };
            }
            return {
                type: 'warning',
                message: "Your heart load is elevated.",
                action: "Avoid strenuous activity this afternoon. I'll check back in 4 hours."
            };
        }

        return {
            type: 'success',
            message: "You are optimally compensated.",
            action: "Great job keeping your sodium low. Keep this up to stay out of the hospital!"
        };
    };

    const insight = getInsight();
    const isCritical = insight.type === 'critical';
    const isWarning = insight.type === 'warning';

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-2xl p-5 border ${isCritical ? 'bg-red-50 border-red-100' :
                isWarning ? 'bg-amber-50 border-amber-100' :
                    'bg-indigo-50 border-indigo-100'
                }`}
        >
            <div className="flex gap-4">
                {/* Agent Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${isCritical ? 'bg-red-500 text-white' :
                    isWarning ? 'bg-amber-500 text-white' :
                        'bg-indigo-600 text-white'
                    }`}>
                    <Sparkles size={20} fill="currentColor" className="animate-pulse" />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-teal-100 rounded-lg">
                                <Sparkles className="w-4 h-4 text-teal-600" />
                            </div>
                            <span className="text-xs font-bold text-teal-600 tracking-wider">NEURAL CARE SPECIALIST</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                    </div>
                    <p className="font-bold text-slate-900 text-lg leading-tight mb-1">
                        "{insight.message}"
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {insight.action}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AgentInsight;
