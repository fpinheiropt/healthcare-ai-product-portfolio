import { motion } from 'framer-motion';
import { Trash2, Recycle, Biohazard } from 'lucide-react';
import { SustainabilityEngine } from '../engine/SustainabilityEngine';

export const WasteTracker: React.FC = () => {
    const data = SustainabilityEngine.getWasteMetrics();
    const recycling = data.find(d => d.category === 'Recycling')?.weightKg || 0;
    const co2Saved = SustainabilityEngine.calculateCarbonSaved(recycling);

    const total = data.reduce((acc, curr) => acc + curr.weightKg, 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Trash2 className="text-emerald-600" /> Real-Time Waste Diversion
            </h2>

            <div className="space-y-6">
                {data.map((item, idx) => {
                    const percentage = Math.round((item.weightKg / total) * 100);
                    return (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold text-slate-700">
                                <span className="flex items-center gap-2">
                                    {item.category === 'Recycling' && <Recycle size={14} className="text-blue-500" />}
                                    {item.category === 'Biohazard' && <Biohazard size={14} className="text-red-500" />}
                                    {item.category === 'Landfill' && <Trash2 size={14} className="text-slate-500" />}
                                    {item.category}
                                </span>
                                <span>{item.weightKg} kg ({percentage}%)</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, delay: idx * 0.2 }}
                                    className={`h-full rounded-full ${item.category === 'Recycling' ? 'bg-blue-500' :
                                        item.category === 'Biohazard' ? 'bg-red-500' :
                                            'bg-slate-400'
                                        }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                    <Recycle size={24} />
                </div>
                <div>
                    <div className="text-xs font-bold text-emerald-600 uppercase">Impact Today</div>
                    <div className="text-2xl font-bold text-slate-900">{co2Saved} kg <span className="text-sm font-normal text-slate-500">CO2e Saved</span></div>
                </div>
            </div>
        </div>
    );
};
