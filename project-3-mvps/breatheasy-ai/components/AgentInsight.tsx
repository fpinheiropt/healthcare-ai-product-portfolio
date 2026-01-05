import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentInsightProps {
    aqi: number;
    pollenLevel: string;
    pollenDetail?: string; // e.g. "(Grass)"
    isIndoors: boolean;
}

const AgentInsight: React.FC<AgentInsightProps> = ({ aqi, pollenLevel, pollenDetail, isIndoors }) => {

    const getInsight = () => {
        if (aqi > 150) {
            return {
                type: 'critical',
                message: "Hazardous Air Quality Detected.",
                action: "AQI is 150+. I strongly recommend canceling outdoor runs. Use your rescue inhaler if wheezing occurs."
            };
        }
        if (aqi > 100 || pollenLevel === 'High') {
            return {
                type: 'warning',
                message: `Environmental Triggers are High.`,
                action: `Pollen count is elevated ${pollenDetail || ''}. Keep windows closed and run the air purifier.`
            };
        }

        return {
            type: 'success',
            message: "Air Quality is Optimal.",
            action: "Conditions are perfect for your planned 5K run. Enjoy the fresh air!"
        };
    };

    const insight = getInsight();
    const isCritical = insight.type === 'critical';
    const isWarning = insight.type === 'warning';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative overflow-hidden rounded-2xl p-5 border shadow-sm ${isCritical ? 'bg-red-50 border-red-100' :
                isWarning ? 'bg-orange-50 border-orange-100' :
                    'bg-teal-50 border-teal-100'
                }`}
        >
            <div className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${isCritical ? 'bg-red-500 text-white' :
                    isWarning ? 'bg-orange-500 text-white' :
                        'bg-teal-600 text-white'
                    }`}>
                    <Sparkles size={20} fill="currentColor" className={isCritical ? "animate-ping" : ""} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isCritical ? 'text-red-600' :
                            isWarning ? 'text-orange-600' :
                                'text-teal-600'
                            }`}>
                            Neural Care Specialist
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                    </div>
                    <p className="font-bold text-slate-800 text-base leading-tight mb-1">
                        {insight.message}
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
