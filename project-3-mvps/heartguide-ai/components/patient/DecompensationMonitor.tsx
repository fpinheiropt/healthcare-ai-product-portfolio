import React, { useState, useEffect } from 'react';
import { Activity, Scale, HeartPulse, Info, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface DecompensationMonitorProps {
    baselineWeight: number;
    currentWeight: number;
    symptomScore: number; // 1-10
}

export const DecompensationMonitor: React.FC<DecompensationMonitorProps> = ({
    baselineWeight,
    currentWeight,
    symptomScore
}) => {
    // Simulated Hemodynamics (User input for simulation)
    const [systolicBP, setSystolicBP] = useState(120);

    // Clinical Logic State
    const [riskLevel, setRiskLevel] = useState<'Stable' | 'Watchlist' | 'Critical'>('Stable');
    const [activeFactors, setActiveFactors] = useState<string[]>([]);

    useEffect(() => {
        calculateRisk();
    }, [currentWeight, symptomScore, systolicBP]);

    const calculateRisk = () => {
        let score = 0;
        let factors = [];

        // 1. Weight Logic (>2kg or ~4.4lbs gain, but let's use +3lbs for sensitivity in demo)
        const weightGain = currentWeight - baselineWeight;
        if (weightGain > 3) {
            score += 1;
            factors.push("Rapid Weight Gain");
        }

        // 2. Symptom Logic (Dyspnea > 3/10)
        if (symptomScore > 3) {
            score += 2; // Higher weight for symptoms (Clinical Validation)
            factors.push("Significant Symptoms");
        }

        // 3. Hemodynamics Logic (BP > 160 or < 90)
        if (systolicBP > 160 || systolicBP < 90) {
            score += 1;
            factors.push("Abnormal BP");
        }

        setActiveFactors(factors);

        if (score === 0) setRiskLevel('Stable');
        else if (score < 3) setRiskLevel('Watchlist'); // e.g., Weight gain ONLY (1) or BP ONLY (1)
        else setRiskLevel('Critical'); // e.g., Weight (1) + Symptoms (2) = 3
    };

    const getStatusColor = () => {
        switch (riskLevel) {
            case 'Stable': return 'text-emerald-400';
            case 'Watchlist': return 'text-amber-400';
            case 'Critical': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mt-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <HeartPulse size={18} className="text-teal-200" />
                    <span className="text-sm font-bold text-teal-50">Clinical Triangulation</span>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${riskLevel === 'Stable' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' :
                        riskLevel === 'Watchlist' ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' :
                            'bg-red-500/20 border-red-500/50 text-red-200 animate-pulse'
                    }`}>
                    {riskLevel}
                </div>
            </div>

            {/* Simulation Controls */}
            <div className="space-y-4 mb-4">
                {/* Visualizing Inputs */}
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className={`p-2 rounded-lg border ${currentWeight - baselineWeight > 3 ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/10'}`}>
                        <Scale className="w-4 h-4 mx-auto mb-1 text-slate-300" />
                        <div className="text-[10px] text-slate-400">Weight</div>
                        <div className="text-xs font-bold text-white">{(currentWeight - baselineWeight).toFixed(1)} lbs</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${symptomScore > 3 ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/10'}`}>
                        <Activity className="w-4 h-4 mx-auto mb-1 text-slate-300" />
                        <div className="text-[10px] text-slate-400">Symptoms</div>
                        <div className="text-xs font-bold text-white">{symptomScore}/10</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${systolicBP > 160 || systolicBP < 90 ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/10'}`}>
                        <HeartPulse className="w-4 h-4 mx-auto mb-1 text-slate-300" />
                        <div className="text-[10px] text-slate-400">BP (Sys)</div>
                        <div className="text-xs font-bold text-white">{systolicBP}</div>
                    </div>
                </div>

                {/* BP Slider (Simulation Requirement) */}
                <div>
                    <div className="flex justify-between text-xs text-teal-100 mb-1.5 ">
                        <span>Simulate Blood Pressure</span>
                    </div>
                    <input
                        type="range"
                        min={80}
                        max={180}
                        step={1}
                        value={systolicBP}
                        onChange={(e) => setSystolicBP(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-teal-900/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                </div>
            </div>

            {/* Clinical Insight Message */}
            <div className="bg-black/20 rounded-lg p-3 text-xs leading-relaxed border border-white/5">
                {riskLevel === 'Stable' && (
                    <p className="text-slate-300 flex gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Parameters within normal limits. Continue standard monitoring.</span>
                    </p>
                )}
                {riskLevel === 'Watchlist' && (
                    <p className="text-amber-200 flex gap-2">
                        <Info className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                            <strong>False Positive Prevention:</strong> {activeFactors.join(", ")} detected, but clinical picture is incomplete. Monitor for 24h.
                        </span>
                    </p>
                )}
                {riskLevel === 'Critical' && (
                    <p className="text-red-200 flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>
                            <strong>Decompensation Alert:</strong> Multi-factor convergence ({activeFactors.join(" + ")}). High validation.
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};
