
import React from 'react';
import { Patient } from '../data/mock-patients';
import { Activity, AlertTriangle, User, Thermometer, Wind, Droplet, Heart, Brain } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
    patient: Patient;
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    // Normalize data for SVG (0-100)
    // Assume range 0-20 for NEWS2 for scaling
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (Math.min(d, 15) / 15) * 100; // Cap at 15 for max height
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className={clsx("h-10 w-full opacity-50", color)}>
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const PatientCard: React.FC<Props> = ({ patient }) => {
    const { news2Score, vitals, name, age, bed, diagnosis, trend } = patient;

    // Determine Risk Level
    let riskLevel = 'low';
    let riskColor = 'border-l-4 border-l-emerald-500 bg-white';
    let badgeColor = 'bg-emerald-100 text-emerald-800';
    let sparkColor = 'text-emerald-500';

    if (news2Score >= 7) {
        riskLevel = 'critical';
        riskColor = 'border-l-4 border-l-red-600 bg-red-50';
        badgeColor = 'bg-red-100 text-red-800 animate-pulse';
        sparkColor = 'text-red-600';
    } else if (news2Score >= 5) {
        riskLevel = 'medium';
        riskColor = 'border-l-4 border-l-amber-500 bg-amber-50';
        badgeColor = 'bg-amber-100 text-amber-800';
        sparkColor = 'text-amber-500';
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx("rounded-xl shadow-sm hover:shadow-md transition-all p-4 relative group", riskColor)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{name}</h3>
                        <p className="text-xs text-slate-500">Bed {bed} • Age {age}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={clsx("text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1", badgeColor)}>
                        NEWS2: {news2Score}
                    </div>
                    {riskLevel === 'critical' && (
                        <div className="flex items-center gap-1 text-red-600 text-xs font-bold animate-bounce">
                            <AlertTriangle className="w-3 h-3" /> SEPSIS RISK
                        </div>
                    )}
                </div>
            </div>

            {/* Diagnosis */}
            <p className="text-sm text-slate-600 italic mb-4 border-b border-black/5 pb-2 truncate">
                {diagnosis}
            </p>

            {/* Vitals Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <VitalStat icon={Heart} value={vitals.hr} unit="bpm" label="HR" alert={vitals.hr > 110 || vitals.hr < 50} />
                <VitalStat icon={Activity} value={`${vitals.bpSys}/${vitals.bpDia}`} unit="mmHg" label="BP" alert={vitals.bpSys < 100} />
                <VitalStat icon={Wind} value={vitals.rr} unit="/min" label="RR" alert={vitals.rr > 20} />
                <VitalStat icon={Droplet} value={vitals.o2Sat} unit="%" label="SpO2" alert={vitals.o2Sat < 94} />
                <VitalStat icon={Thermometer} value={vitals.temp} unit="°C" label="Temp" alert={vitals.temp > 38 || vitals.temp < 36} />
                <VitalStat icon={Brain} value={vitals.consciousness === 'Alert' ? 'A' : 'V/P/U'} unit="" label="CNS" alert={vitals.consciousness !== 'Alert'} />
            </div>

            {/* Trend */}
            <div className="mt-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1">Risk Trend (10m)</p>
                <Sparkline data={trend} color={sparkColor} />
            </div>

        </motion.div>
    );
};

const VitalStat = ({ icon: Icon, value, unit, label, alert }: any) => (
    <div className={clsx("flex flex-col items-center p-2 rounded-lg bg-white/60", alert ? "bg-red-100 ring-1 ring-red-200" : "")}>
        <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold mb-1">
            <Icon className="w-3 h-3" /> {label}
        </div>
        <div className={clsx("text-lg font-bold leading-none", alert ? "text-red-700" : "text-slate-800")}>
            {value}<span className="text-[10px] font-normal text-slate-400 ml-0.5">{unit}</span>
        </div>
    </div>
);
