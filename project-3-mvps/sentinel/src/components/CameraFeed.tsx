import { motion, AnimatePresence } from 'framer-motion';
import type { Patient } from '../engine/SimulationEngine';
import { Activity } from 'lucide-react';

interface Props {
    patients: Patient[];
}

export function CameraFeed({ patients }: Props) {
    return (
        <div className="w-full h-full relative bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80">
            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>

            <AnimatePresence>
                {patients.map(p => (
                    <BoundingBox key={p.id} patient={p} />
                ))}
            </AnimatePresence>

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,255,100,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
}

function BoundingBox({ patient }: { patient: Patient }) {
    const color = patient.riskScore > 80 ? 'border-red-500 shadow-red-500/50' :
        patient.riskScore > 60 ? 'border-amber-500 shadow-amber-500/50' :
            'border-emerald-500 shadow-emerald-500/20';

    const statusColor = patient.riskScore > 80 ? 'text-red-500' :
        patient.riskScore > 60 ? 'text-amber-500' :
            'text-emerald-500';

    return (
        <motion.div
            layoutId={patient.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                left: `${patient.x}%`,
                top: `${patient.y}%`,
                borderColor: patient.riskScore > 80 ? '#ef4444' : '#10b981'
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className={`absolute w-32 h-48 border-2 ${color} rounded bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] flex flex-col justify-between p-2`}
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold bg-black/60 px-1 rounded text-white">{patient.id}</span>
                <span className={`text-[10px] font-bold ${statusColor} uppercase`}>{patient.status}</span>
            </div>

            {/* Skeleton Overlay Effect */}
            <div className="flex-1 flex items-center justify-center opacity-30">
                <div className="w-16 h-24 border border-dashed border-white/50 rounded-full"></div>
            </div>

            {/* Footer Stats */}
            <div className="bg-black/80 p-1 rounded text-[9px] font-mono space-y-0.5">
                <div className="flex justify-between">
                    <span className="text-slate-400">HR</span>
                    <span className={statusColor}>{Math.round(patient.heartRate)} <Activity className="w-2 h-2 inline" /></span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">RISK</span>
                    <span className={statusColor}>{Math.round(patient.riskScore)}%</span>
                </div>
            </div>

            {/* Connecting Lines (Decor) */}
            <div className="absolute -top-2 -left-2 w-2 h-2 border-t-2 border-l-2 border-white/50" />
            <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b-2 border-r-2 border-white/50" />
        </motion.div>
    );
}
