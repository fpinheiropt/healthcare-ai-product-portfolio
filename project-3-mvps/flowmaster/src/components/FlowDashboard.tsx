import React, { useState, useMemo } from 'react';
import { MOCK_FLOW_PATIENTS, type PatientFlow } from '../data/mock-flow-data';
import { predictDischarge, type PredictionResult } from '../engine/DischargeEngine';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Clock, Users, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// Augment patient with prediction
interface AugmentedPatient extends PatientFlow {
    prediction: PredictionResult;
}

const MOCK_CHART_DATA = [
    { name: 'Mon', occupied: 95, target: 80 },
    { name: 'Tue', occupied: 98, target: 80 },
    { name: 'Wed', occupied: 92, target: 80 },
    { name: 'Thu', occupied: 88, target: 80 },
    { name: 'Fri', occupied: 85, target: 80 },
    { name: 'Sat', occupied: 82, target: 80 },
    { name: 'Sun', occupied: 78, target: 80 },
];

export const FlowDashboard: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Delayed' | 'Critical'>('All');

    // Run "Live" Prediction
    const data: AugmentedPatient[] = useMemo(() => {
        return MOCK_FLOW_PATIENTS.map(p => ({
            ...p,
            prediction: predictDischarge(p)
        }));
    }, []);

    const filteredData = data.filter(p => {
        if (filter === 'All') return true;
        if (filter === 'Delayed') return p.prediction.status === 'Delayed';
        if (filter === 'Critical') return p.prediction.status === 'Critical Delay';
        return true;
    });

    const stats = {
        total: data.length,
        delayed: data.filter(p => p.prediction.status !== 'On Track').length,
        critical: data.filter(p => p.prediction.status === 'Critical Delay').length
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Users className="w-6 h-6" />
                        </div>
                        FlowMaster <span className="text-slate-400 font-normal text-lg">Discharge Predictor</span>
                    </h1>
                    <p className="text-slate-500 mt-2">AI-Driven Length of Stay (LOS) Optimization</p>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Stats & Chart */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            label="Active Patients"
                            value={stats.total}
                            icon={Users}
                            color="bg-blue-50 text-blue-700"
                        />
                        <StatCard
                            label="Predicted Delays"
                            value={stats.delayed}
                            icon={Clock}
                            color="bg-amber-50 text-amber-700"
                        />
                        <StatCard
                            label="Critical Bottlenecks"
                            value={stats.critical}
                            icon={AlertCircle}
                            color="bg-red-50 text-red-700"
                            animate={stats.critical > 0}
                        />
                    </div>

                    {/* Occupancy Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Projected Bed Occupancy (7 Days)</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MOCK_CHART_DATA}>
                                    <defs>
                                        <linearGradient id="colorOccupied" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="occupied" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOccupied)" />
                                    <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" fill="none" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column: Patient List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Patient Queue</h3>
                        <div className="flex gap-1">
                            {['All', 'Delayed', 'Critical'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={clsx(
                                        "px-2 py-1 rounded text-xs font-semibold transition-colors",
                                        filter === f ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-200"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-y-auto divide-y divide-slate-100 p-2">
                        {filteredData.map(patient => (
                            <PatientRow key={patient.id} patient={patient} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon: Icon, color, animate }: any) => (
    <div className={clsx("p-4 rounded-xl border border-transparent", color)}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-wide">{label}</p>
                <h2 className="text-3xl font-bold mt-1">{value}</h2>
            </div>
            <Icon className={clsx("w-6 h-6 opacity-50", animate && "animate-pulse")} />
        </div>
    </div>
);

const PatientRow = ({ patient }: { patient: AugmentedPatient }) => {
    const { prediction } = patient;
    const isDelayed = prediction.delayDays > 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 mb-2 rounded-lg border border-slate-100 hover:border-blue-200 bg-white hover:shadow-sm transition-all"
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{patient.name}</h3>
                        <span className={clsx(
                            "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase",
                            prediction.status === 'On Track' ? "bg-emerald-100 text-emerald-700" :
                                prediction.status === 'Delayed' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                        )}>
                            {prediction.status === 'Critical Delay' ? 'Critical' : prediction.status}
                        </span>
                    </div>
                    <p className="text-slate-500 text-xs">{patient.diagnosis}</p>
                </div>
            </div>

            {/* Bottlenecks */}
            {prediction.bottlenecks.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {prediction.bottlenecks.map((b, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            {b}
                        </span>
                    ))}
                </div>
            )}

            {/* Timeline */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                <div className="text-slate-400">
                    Due: {new Date(patient.targetDischargeDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>

                <div className="flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                    <span className={clsx(
                        "font-bold",
                        isDelayed ? "text-red-600" : "text-emerald-600"
                    )}>
                        {new Date(prediction.predictedDischargeDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    {isDelayed && (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1 rounded">+{prediction.delayDays}d</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
