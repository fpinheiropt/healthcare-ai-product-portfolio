import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, AlertTriangle } from 'lucide-react';
import { SustainabilityEngine, type EnergyMetric } from '../engine/SustainabilityEngine';

export const EnergyMonitor: React.FC = () => {
    const [metrics, setMetrics] = useState<EnergyMetric[]>([]);

    useEffect(() => {
        setMetrics(SustainabilityEngine.getEnergySpikes());
    }, []);

    const maxKwh = Math.max(...metrics.map(m => m.kwh), 1000);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 flex flex-col h-full">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="text-amber-500" /> Energy Consumption (HVAC)
            </h2>

            <div className="flex-1 flex items-end gap-2 h-48 mb-4 border-b border-l border-slate-200 p-2">
                {metrics.map((metric, idx) => {
                    const heightPercent = (metric.kwh / maxKwh) * 100;
                    return (
                        <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`w-full rounded-t-sm transition-all ${metric.isPeak ? 'bg-amber-500 group-hover:bg-amber-600' : 'bg-emerald-300 group-hover:bg-emerald-400'
                                    }`}
                            />
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-1 rounded whitespace-nowrap z-10">
                                {metric.hour}:00 - {Math.round(metric.kwh)} kWh
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
            </div>

            <div className="mt-8">
                {metrics.some(m => m.isPeak) ? (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="text-amber-600 shrink-0" size={20} />
                        <div>
                            <h4 className="font-bold text-amber-800 text-sm">Peak Demand Alert</h4>
                            <p className="text-xs text-amber-700 mt-1">
                                Detected high Load between 12:00-16:00. <br />
                                <strong>Recommendation:</strong> Pre-cool operative suites before 11:00 AM to leverage off-peak rates.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                        <Activity className="text-emerald-600 shrink-0" size={20} />
                        <span className="text-sm font-bold text-emerald-800">Grid Optimization Active. No Anomalies.</span>
                    </div>
                )}
            </div>
        </div>
    );
};
