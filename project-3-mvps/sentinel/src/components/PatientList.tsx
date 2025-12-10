import type { Patient } from '../engine/SimulationEngine';
import { Activity, Clock } from 'lucide-react';

interface Props {
    patients: Patient[];
}

export function PatientList({ patients }: Props) {
    const sorted = [...patients].sort((a, b) => b.riskScore - a.riskScore);

    return (
        <div className="space-y-3">
            {sorted.map(p => (
                <div
                    key={p.id}
                    className={`relative overflow-hidden rounded-lg border p-3 transition-all cursor-pointer ${p.riskScore > 80 ? 'bg-red-950/30 border-red-500/50 hover:bg-red-900/20' :
                        p.riskScore > 60 ? 'bg-amber-950/30 border-amber-500/50 hover:bg-amber-900/20' :
                            'bg-slate-800/40 border-slate-700 hover:bg-slate-800'
                        }`}
                >
                    {/* Status Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${p.riskScore > 80 ? 'bg-red-500 animate-pulse' :
                        p.riskScore > 60 ? 'bg-amber-500' :
                            'bg-emerald-500'
                        }`} />

                    <div className="pl-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-sm text-slate-200">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{p.id}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Activity className="w-3 h-3" />
                                <span className={p.riskScore > 80 ? "text-red-400 font-bold" : "text-slate-300"}>
                                    {Math.round(p.heartRate)} bpm
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span className="text-slate-300">04:12</span>
                            </div>
                        </div>

                        {/* Analysis Text */}
                        <div className="mt-2 pt-2 border-t border-slate-700/50 text-[10px] uppercase font-bold tracking-wide">
                            AI Insight:
                            <span className={`ml-1 ${p.status === 'collapsed' ? 'text-red-500' :
                                p.status === 'slumping' ? 'text-amber-500' :
                                    'text-emerald-500'
                                }`}>
                                {p.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
