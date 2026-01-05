
import React from 'react';
import { useVitalSimulation } from '../hooks/useVitalSimulation';
import { PatientCard } from './PatientCard';
import { ShieldAlert, Activity, Pause, Play } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const WardDashboard: React.FC = () => {
    const { patients, isRunning, setIsRunning } = useVitalSimulation();

    // Calculate ward stats
    const criticalPatients = patients.filter(p => p.news2Score >= 7);
    const mediumRiskPatients = patients.filter(p => p.news2Score >= 5 && p.news2Score < 7);
    const occupiedBeds = patients.length;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
                        <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-600/20">
                            <ShieldAlert className="w-8 h-8 text-white" />
                        </div>
                        SepsisSentinel <span className="text-slate-400 font-normal text-lg">Ward A</span>
                    </h1>
                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Real-time NEWS2 Monitoring System
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>
                    <div className="space-y-1">
                        <p className="text-xs uppercase font-bold text-slate-400 tracking-wide">Unit Status</p>
                        <div className="flex gap-4 text-sm font-semibold">
                            <span className="text-slate-700">{occupiedBeds} Beds</span>
                            <span className={clsx(criticalPatients.length > 0 ? "text-red-500 animate-pulse" : "text-emerald-500")}>
                                {criticalPatients.length} Critical
                            </span>
                            <span className={clsx(mediumRiskPatients.length > 0 ? "text-amber-500" : "text-slate-400")}>
                                {mediumRiskPatients.length} Watch
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sepsis Alert Banner */}
            <AnimatePresence>
                {criticalPatients.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-600 text-white p-4 rounded-xl shadow-xl shadow-red-600/30 mb-8 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3 font-bold text-lg">
                            <ShieldAlert className="w-6 h-6 animate-bounce" />
                            CRITICAL ALERT: SEPSIS RISK DETECTED
                        </div>
                        <div className="text-red-100 text-sm font-medium">
                            Immediate review required for: {criticalPatients.map(p => p.bed).join(', ')}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Patient Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                ))}
            </div>
        </div>
    );
};
