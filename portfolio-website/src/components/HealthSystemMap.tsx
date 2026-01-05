import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Wind, Droplet, Brain, Baby, // Home
    ShieldCheck, Pill, GitBranch, FileText, // Primary Care
    Monitor, Eye, ShieldAlert, // ER
    Activity, Truck, Microscope, Leaf, // Hospital
    Users, Clock, AlertCircle // Metadata Icons
} from 'lucide-react';

interface HealthSystemMapProps {
    activeAgents: Set<string>;
}

// Zone Definitions with Live Stats Simulation
const ZONES = {
    HOME: {
        id: 'home',
        label: 'Patient Home & Remote',
        color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
        agents: ['heartguide', 'breatheasy', 'glucowise', 'mindbridge', 'gestalink'],
        stats: { label: 'Active Monitoring', value: '12,450', unit: 'Pts' }
    },
    PRIMARY: {
        id: 'primary',
        label: 'Primary Care & Triage',
        color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        agents: ['triage-os', 'rxoptimize', 'careflow-architect', 'docu-flow'],
        stats: { label: 'Referral Rate', value: '-18%', unit: 'vs Baseline' }
    },
    ER: {
        id: 'er',
        label: 'Emergency Dept',
        color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
        agents: ['fasttrack', 'sentinel', 'surge-commander'],
        stats: { label: 'Current Wait', value: '45m', unit: 'Avg' }
    },
    HOSPITAL: {
        id: 'hospital',
        label: 'Inpatient Ward',
        color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
        agents: ['sepsis-sentinel', 'flowmaster', 'cliniscript', 'patho-ai', 'ecoward', 'portersmart'],
        stats: { label: 'Beds Available', value: '14/320', unit: 'Capacity' }
    }
};

const AGENT_CONFIG: Record<string, { icon: any, label: string }> = {
    'heartguide': { icon: Heart, label: 'HeartGuide' },
    'breatheasy': { icon: Wind, label: 'BreathEasy' },
    'glucowise': { icon: Droplet, label: 'GlucoWise' },
    'mindbridge': { icon: Brain, label: 'MindBridge' },
    'gestalink': { icon: Baby, label: 'GestaLink' },
    'triage-os': { icon: ShieldCheck, label: 'HealthLine' },
    'rxoptimize': { icon: Pill, label: 'RxOptimize' },
    'careflow-architect': { icon: GitBranch, label: 'CareFlow' },
    'docu-flow': { icon: FileText, label: 'DocuFlow' },
    'fasttrack': { icon: Monitor, label: 'FastTrack' },
    'sentinel': { icon: Eye, label: 'Sentinel' },
    'surge-commander': { icon: ShieldAlert, label: 'National OS' },
    'sepsis-sentinel': { icon: ShieldAlert, label: 'SepsisGuard' },
    'flowmaster': { icon: Activity, label: 'FlowMaster' },
    'cliniscript': { icon: FileText, label: 'CliniScript' },
    'patho-ai': { icon: Microscope, label: 'Patho-AI' },
    'ecoward': { icon: Leaf, label: 'EcoWard' },
    'portersmart': { icon: Truck, label: 'PorterSmart' },
};

export const HealthSystemMap: React.FC<HealthSystemMapProps> = ({ activeAgents }) => {

    // Dynamic Zone Logic
    const zoneStats = React.useMemo(() => {
        // default chaos
        const stats = {
            home: { label: 'Active Monitoring', value: '0', unit: 'Pts', color: 'text-slate-500' },
            primary: { label: 'Referral Rate', value: '+12%', unit: 'vs Baseline', color: 'text-rose-400' },
            er: { label: 'Current Wait', value: '4h 15m', unit: 'Avg', color: 'text-rose-500' },
            hospital: { label: 'Beds Available', value: '0/320', unit: 'Capacity', color: 'text-rose-500' }
        };

        // Home Logic
        if (activeAgents.has('heartguide') || activeAgents.has('breatheasy')) {
            stats.home = { label: 'Active Monitoring', value: '12,450', unit: 'Pts', color: 'text-emerald-400' };
        }

        // Primary Logic
        if (activeAgents.has('triage-os') || activeAgents.has('rxoptimize')) {
            stats.primary = { label: 'Referral Rate', value: '-18%', unit: 'vs Baseline', color: 'text-emerald-400' };
        }

        // ER Logic (Complex)
        let waitMins = 255; // 4h 15m
        if (activeAgents.has('fasttrack')) waitMins -= 45;
        if (activeAgents.has('sentinel')) waitMins -= 30;
        if (activeAgents.has('surge-commander')) waitMins -= 60;
        if (activeAgents.has('triage-os')) waitMins -= 45; // Upstream effect

        if (waitMins < 60) {
            stats.er = { label: 'Current Wait', value: `${waitMins}m`, unit: 'Avg', color: 'text-emerald-400' };
        } else {
            const h = Math.floor(waitMins / 60);
            const m = waitMins % 60;
            stats.er = { label: 'Current Wait', value: `${h}h ${m}m`, unit: 'Avg', color: waitMins > 120 ? 'text-rose-400' : 'text-amber-400' };
        }

        // Hospital Logic
        if (activeAgents.has('flowmaster')) {
            stats.hospital = { label: 'Beds Available', value: '42/320', unit: 'Capacity', color: 'text-emerald-400' };
        }

        return stats;
    }, [activeAgents]);

    // Live Zone Config
    const zones = {
        HOME: { ...ZONES.HOME, stats: zoneStats.home },
        PRIMARY: { ...ZONES.PRIMARY, stats: zoneStats.primary },
        ER: { ...ZONES.ER, stats: zoneStats.er },
        HOSPITAL: { ...ZONES.HOSPITAL, stats: zoneStats.hospital }
    };

    return (
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl p-6 flex flex-col">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(30,41,59,0.5)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none opacity-20" />

            {/* Connecting Pipes (SVG Layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#334155" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#475569" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Home to Primary */}
                <ConnectionPath
                    d="M 22% 55% C 28% 55%, 30% 55%, 36% 55%"
                    label="Triage & Referral"
                    offset="29%"
                />

                {/* Primary to ER */}
                <ConnectionPath
                    d="M 47% 55% C 52% 55%, 55% 55%, 60% 55%"
                    label="Acute Transport"
                    offset="53%"
                />

                {/* ER to Hospital */}
                <ConnectionPath
                    d="M 71% 55% C 78% 55%, 80% 55%, 84% 55%"
                    label="Admission Stream"
                    offset="78%"
                />
            </svg>

            {/* Patient Flow Particles */}
            <AnimatePresence>
                {/* CHAOS MODE: When few agents are active, show chaotic red particles */}
                {activeAgents.size < 3 && (
                    <>
                        {/* Multiple Chaos Particles for "System Stress" effect */}
                        {[0, 2, 4, 1, 3, 5].map((delay) => (
                            <ChaosParticle key={`chaos-${delay}`} delay={delay} />
                        ))}
                    </>
                )}

                {/* ORDER MODE: Structured Flow */}
                {activeAgents.size > 0 && (
                    <>
                        {/* High Risk Flow (Red -> Green if intercepted) */}
                        <PatientParticle
                            path="start-to-primary"
                            delay={0}
                            color={activeAgents.has('heartguide') ? 'bg-emerald-500' : 'bg-rose-500'}
                            pulse={activeAgents.has('heartguide')}
                        />
                        <PatientParticle
                            path="start-to-primary"
                            delay={1.5}
                            color={activeAgents.has('breatheasy') ? 'bg-emerald-500' : 'bg-rose-500'}
                        />

                        {/* Standard Flow */}
                        <PatientParticle path="primary-to-er" delay={0.8} color="bg-blue-400" />
                        <PatientParticle path="er-to-ward" delay={2.2} color="bg-amber-400" />
                    </>
                )}
            </AnimatePresence>


            <div className="relative z-10 grid grid-cols-4 gap-4 h-full items-stretch">
                {/* Zone 1: Home */}
                <ZoneCard zone={zones.HOME} activeAgents={activeAgents} />

                {/* Zone 2: Primary Care */}
                <ZoneCard zone={zones.PRIMARY} activeAgents={activeAgents} />

                {/* Zone 3: ER (With Overload Warning) */}
                <ZoneCard
                    zone={zones.ER}
                    activeAgents={activeAgents}
                    isOverloaded={activeAgents.size < 3}
                />

                {/* Zone 4: Hospital */}
                <ZoneCard zone={zones.HOSPITAL} activeAgents={activeAgents} />
            </div>

            {/* Visual Shields (Prevention) - STAGGERED TO FIX OVERLAP */}
            <AnimatePresence>
                {activeAgents.has('heartguide') && (
                    <PreventionShield x="26%" y="38%" label="Readmission Blocked" delay={0} />
                )}
                {activeAgents.has('breatheasy') && (
                    <PreventionShield x="28%" y="68%" label="Asthma Attack Prevented" delay={0.2} />
                )}
            </AnimatePresence>

        </div>
    );
};

const ConnectionPath = ({ d, label, offset }: { d: string, label: string, offset: string }) => (
    <g>
        <path d={d} stroke="url(#pipeGradient)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d={d} stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" fill="none" className="opacity-50" />
        {/* Label Background */}
        <rect x={parseFloat(offset) - 5 + "%"} y="59%" width="10%" height="4%" rx="4" fill="#0f172a" opacity="0.8" />
        <text x={offset} y="62%" fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em" style={{ textTransform: 'uppercase' }}>
            {label}
        </text>
    </g>
);

const ZoneCard = ({ zone, activeAgents, isOverloaded = false }: { zone: any, activeAgents: Set<string>, isOverloaded?: boolean }) => (
    <div className={`rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-1 flex flex-col relative group transition-all duration-500 shadow-lg
        ${isOverloaded ? 'shadow-[0_0_30px_rgba(225,29,72,0.3)] border-rose-900/50 animate-pulse' : 'hover:border-slate-700'}`}>

        {/* Overload Warning Label */}
        {isOverloaded && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-20 uppercase tracking-widest animate-bounce">
                System Strain
            </div>
        )}

        {/* Header */}
        <div className={`p-3 rounded-t-[22px] border-b border-slate-800 transition-colors duration-500 
            ${isOverloaded ? 'bg-rose-900/30' : (zone.id === 'er' ? 'bg-amber-900/10' : 'bg-slate-800/30')}`}>
            <h4 className={`font-bold text-center uppercase tracking-widest text-[10px] ${isOverloaded ? 'text-rose-200' : 'text-slate-300'}`}>
                {zone.label}
            </h4>
        </div>

        {/* Agents Grid - OPTIMIZED GAP */}
        <div className="flex-1 p-3 flex flex-wrap content-start justify-center gap-2 overflow-y-auto custom-scrollbar">
            {zone.agents.map((agentId: string) => (
                <AgentNode key={agentId} id={agentId} active={activeAgents.has(agentId)} />
            ))}
        </div>

        {/* Footer Stats - DYNAMIC COLOR */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 rounded-b-[22px] flex items-center justify-between px-4 min-h-[50px]">
            <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase">{zone.stats.label}</span>
                <div className="flex items-baseline gap-1">
                    <span className={`text-sm font-bold ${zone.stats.color || 'text-white'}`}>
                        {zone.stats.value}
                    </span>
                    <span className="text-[9px] text-slate-500">{zone.stats.unit}</span>
                </div>
            </div>
            {activeAgents.size > 5 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
                />
            )}
        </div>
    </div>
);

const AgentNode = ({ id, active }: { id: string, active: boolean }) => {
    const config = AGENT_CONFIG[id];
    const Icon = config?.icon || Activity;

    return (
        <motion.div
            initial={false}
            animate={{
                scale: active ? 1.05 : 1,
                opacity: active ? 1 : 0.4,
                filter: active ? 'grayscale(0%)' : 'grayscale(100%) blur(1px)' // Blur inactive
            }}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-500 ${active ? 'bg-slate-800 shadow-xl shadow-teal-900/20 ring-1 ring-teal-500/30' : 'bg-transparent'}`}
        >
            <div className={`relative p-2.5 rounded-xl ${active ? 'bg-gradient-to-br from-teal-500/20 to-teal-900/10 text-teal-400' : 'bg-slate-800/50 text-slate-600'}`}>
                <Icon size={18} />
                {active && <div className="absolute inset-0 rounded-xl bg-teal-400/20 blur-md" />}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider text-center leading-tight ${active ? 'text-teal-100' : 'text-slate-600'}`}>
                {config?.label}
            </span>
        </motion.div>
    );
};

// Chaos Particle (Random Movement)
const ChaosParticle = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] z-20 pointer-events-none"
        animate={{
            x: ['10%', '80%', '20%', '90%', '50%'],
            y: ['10%', '90%', '80%', '20%', '50%'],
            scale: [1, 1.5, 0.8, 1.2, 1],
            opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            delay: delay,
            repeatType: 'reverse'
        }}
    />
);

const PatientParticle = ({ path, delay, color, pulse }: { path: string, delay: number, color: string, pulse?: boolean }) => {
    // Precise path matching SVG curves roughly
    const variants = {
        'start-to-primary': {
            left: ['15%', '36%'],
            top: ['50%', '50%'], // Straight line roughly for now, in visual it's pipe
            opacity: [0, 1, 0],
            scale: pulse ? [1, 1.5, 1] : 1
        },
        'primary-to-er': { left: ['40%', '60%'], opacity: [0, 1, 0] },
        'er-to-ward': { left: ['65%', '84%'], opacity: [0, 1, 0] }
    };

    const config = variants[path as keyof typeof variants];

    return (
        <motion.div
            className={`absolute top-[55%] -mt-1 w-2.5 h-2.5 rounded-full z-20 shadow-lg ${color}`}
            animate={config}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        >
            {pulse && <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />}
        </motion.div>
    );
};

const PreventionShield = ({ x, y, label, delay = 0 }: { x: string, y: string, label: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ delay: delay }}
        className="absolute z-30 flex flex-col items-center pointer-events-none"
        style={{ left: x, top: y }}
    >
        <div className="bg-slate-900 p-1.5 rounded-full shadow-2xl border border-red-500/50 shadow-red-900/20">
            <div className="bg-red-500/20 p-1.5 rounded-full text-red-500">
                <ShieldCheck size={18} />
            </div>
        </div>
        <div className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mt-2 shadow-lg whitespace-nowrap uppercase tracking-wider">
            {label}
        </div>
    </motion.div>
);
