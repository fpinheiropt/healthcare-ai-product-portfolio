import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    ShieldAlert,
    CheckCircle,
    ArrowRight,
    Zap
} from 'lucide-react';

interface RoutineProps {
    id: string;
    agentId: string;
    message: string;
    timestamp: string;
    type: 'alert' | 'action' | 'info';
    details?: {
        signal: string;
        action: string;
        outcome: string;
    }
}

export const IntelligenceCard: React.FC<RoutineProps> = ({ agentId, timestamp, details, type }) => {
    // Determine color scheme based on agent type/action
    const isAlert = type === 'alert' || type === 'action';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg mb-3 group hover:border-teal-500/30 transition-colors"
        >
            {/* Left Accent Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${agentId === 'surge-commander' ? 'bg-amber-500' :
                agentId === 'heartguide' || agentId === 'SYSTEM ALERT' ? 'bg-rose-500' :
                    'bg-teal-500'
                }`} />

            <div className="p-3 pl-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-md ${agentId === 'surge-commander' ? 'bg-amber-900/20 text-amber-500' :
                            agentId === 'heartguide' || agentId === 'SYSTEM ALERT' ? 'bg-rose-900/20 text-rose-500' :
                                'bg-teal-900/20 text-teal-400'
                            }`}>
                            <Zap size={12} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{agentId}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{timestamp}</span>
                </div>

                {/* Content Grid */}
                {details ? (
                    <div className="space-y-2">
                        {/* Signal */}
                        <div className="flex items-start gap-2">
                            <ShieldAlert size={14} className="text-amber-500 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase">Signal Detected</div>
                                <div className="text-xs font-medium text-slate-200 leading-tight">{details.signal}</div>
                            </div>
                        </div>

                        {/* Connection Line */}
                        <div className="ml-1.5 w-0.5 h-2 bg-slate-800" />

                        {/* Action */}
                        <div className="flex items-start gap-2">
                            <Activity size={14} className="text-blue-500 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase">AI Intervention</div>
                                <div className="text-xs font-medium text-blue-200 leading-tight">{details.action}</div>
                            </div>
                        </div>

                        {/* Connection Line */}
                        <div className="ml-1.5 w-0.5 h-2 bg-slate-800" />

                        {/* Outcome */}
                        <div className="flex items-start gap-2 bg-teal-900/10 p-1.5 rounded-lg border border-teal-900/20">
                            <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-xs font-bold text-emerald-400 leading-tight">{details.outcome}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-slate-400 italic">Processing neural stream...</div>
                )}
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-white/0 pointer-events-none opacity-0 group-hover:opacity-100 animate-scan" style={{ backgroundSize: '100% 200%' }} />
        </motion.div>
    );
};
