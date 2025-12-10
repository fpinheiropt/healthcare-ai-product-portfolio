import { SimulationParams } from '../engine/CapacityEngine';
import { Users, LogOut, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControlPanelProps {
    params: SimulationParams;
    onChange: (key: keyof SimulationParams, value: any) => void;
    isSimulating: boolean;
}

export function ControlPanel({ params, onChange, isSimulating }: ControlPanelProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                Parameter Controls
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                        <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Inflow Rate (Patients/Hr)</span>
                        <span className="text-blue-600 font-bold">{params.inflowRate}</span>
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="1"
                        value={params.inflowRate}
                        onChange={(e) => onChange('inflowRate', parseInt(e.target.value))}
                        disabled={isSimulating}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                        <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Discharge Rate (Patients/Hr)</span>
                        <span className="text-emerald-600 font-bold">{params.dischargeRate}</span>
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="80"
                        step="1"
                        value={params.dischargeRate}
                        onChange={(e) => onChange('dischargeRate', parseInt(e.target.value))}
                        disabled={isSimulating}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                        <span className="flex items-center gap-2">Total Bed Capacity</span>
                        <span className="text-slate-900 font-bold">{params.totalBeds}</span>
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={params.totalBeds}
                        onChange={(e) => onChange('totalBeds', parseInt(e.target.value))}
                        disabled={isSimulating}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Network Resilience</h4>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-700">Obstetric/Ped Network</span>
                        <button
                            onClick={() => onChange('networkOpen', params.networkOpen ? 0 : 1)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${params.networkOpen ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${params.networkOpen ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {params.networkOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                                <span>Network Capacity</span>
                                <span className="text-blue-600 font-bold">{params.networkCapacity} slots/hr</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                value={params.networkCapacity}
                                onChange={(e) => onChange('networkCapacity', parseInt(e.target.value))}
                                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                Tip: If Inflow exceeds Discharge + Capacity, the Waiting Room Queue will explode, leading to collapse.
            </div>
        </div>
    );
}
