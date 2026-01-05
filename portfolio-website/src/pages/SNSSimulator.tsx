import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSNSSimulation, AGENT_CATEGORIES } from '../hooks/useSNSSimulation';
import {
    Activity,
    Users,
    Clock,
    DollarSign,
    ShieldCheck,
    ToggleLeft,
    ToggleRight,
    Play,
    RotateCcw,
    LayoutDashboard
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Navbar from '../components/Navbar';
import { HealthSystemMap } from '../components/HealthSystemMap';
import { SimulationFeed } from '../components/SimulationFeed';

function SNSSimulator() {
    const { activeAgents, toggleAgent, toggleAll, metrics, AGENT_DATA } = useSNSSimulation();
    const [viewMode, setViewMode] = useState<'map' | 'analytics'>('map');

    const chartData = [
        { name: 'Baseline', cost: 14.5, wait: 6.8, safety: 12500 },
        { name: 'Projected', cost: metrics.cost, wait: metrics.waitTime, safety: metrics.safety }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500/30">
            <Navbar />

            <div className="pt-20 h-[calc(100vh-80px)] flex flex-col">
                {/* TOP BAR: KPIs Ticker */}
                <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-40">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-teal-500/10 rounded-lg text-teal-500">
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight tracking-wide">SNS Command Center</h1>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                System Status: {activeAgents.size > 0 ? 'OPTIMIZED' : 'STANDARD'}
                            </div>
                        </div>
                    </div>

                    {/* KPI Ticker Display */}
                    <div className="flex-1 flex justify-center gap-8 md:gap-16">
                        <TickerItem
                            label="Annual Waste"
                            value={`€${metrics.cost.toFixed(1)}B`}
                            delta={metrics.cost - 14.5}
                            unit="EUR"
                            inverse
                            context={`≈ ${((14.5 - metrics.cost) / 0.5).toFixed(0)} New Hospitals`}
                        />
                        <TickerItem
                            label="Wait Times"
                            value={`${metrics.waitTime.toFixed(1)}h`}
                            delta={metrics.waitTime - 6.8}
                            unit="Avg"
                            inverse
                            context={`≈ ${((6.8 - metrics.waitTime) * 0.3).toFixed(1)}M Pt. Hours Saved`}
                        />
                        <TickerItem
                            label="Safety Events"
                            value={`${(metrics.safety / 1000).toFixed(1)}k`}
                            delta={metrics.safety - 12500}
                            unit="/yr"
                            inverse
                            context={`≈ ${(12500 - metrics.safety)} Lives Protected`}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => toggleAll(activeAgents.size === 0)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeAgents.size > 0
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-900/20'
                                }`}
                        >
                            {activeAgents.size > 0 ? <RotateCcw size={16} /> : <Play size={16} />}
                            {activeAgents.size > 0 ? 'Reset' : 'Deploy All'}
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

                    {/* LEFT SIDEBAR: Controls */}
                    <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-900/30 overflow-y-auto custom-scrollbar">
                        <div className="p-6 space-y-8">
                            <ControlGroup title="Chronic Flagships" agents={AGENT_CATEGORIES.CHRONIC} activeAgents={activeAgents} toggleAgent={toggleAgent} data={AGENT_DATA} icon={<Activity size={16} />} color="text-blue-400" />
                            <ControlGroup title="Clinical Support" agents={AGENT_CATEGORIES.CLINICAL} activeAgents={activeAgents} toggleAgent={toggleAgent} data={AGENT_DATA} icon={<ShieldCheck size={16} />} color="text-purple-400" />
                            <ControlGroup title="Operational" agents={AGENT_CATEGORIES.OPERATIONAL} activeAgents={activeAgents} toggleAgent={toggleAgent} data={AGENT_DATA} icon={<Users size={16} />} color="text-amber-400" />
                        </div>
                    </div>

                    {/* CENTER: Visualization Map */}
                    <div className="flex-1 bg-slate-950 relative flex flex-col p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950 pointer-events-none" />

                        {/* Map Container */}
                        <div className="flex-1 flex items-center justify-center relative z-10 overflow-auto">
                            <div className="min-w-[800px] w-full max-w-5xl aspect-video lg:aspect-[21/9]">
                                <HealthSystemMap activeAgents={activeAgents} />
                            </div>
                        </div>

                        {/* Bottom Analytics Overlay (Detailed) */}
                        <div className="min-h-48 h-auto lg:h-52 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 shrink-0 z-20 relative pointer-events-auto">

                            {/* Resource Optimization (Comparison) */}
                            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 p-5 flex flex-col shadow-xl hover:border-teal-500/30 transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Resource Optimization</h4>
                                        <p className="text-[10px] text-slate-500">Capacity utilization before vs. after AI</p>
                                    </div>
                                    <div className="p-1.5 rounded-md bg-teal-900/20 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                                        <Users size={16} />
                                    </div>
                                </div>
                                <div className="flex-1 flex gap-4 items-end px-2 pb-2">
                                    {/* Traditional */}
                                    <div className="flex-1 flex flex-col justify-end gap-2 group/bar">
                                        <div className="text-xs text-slate-500 text-center font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity">92%</div>
                                        <div className="w-full bg-slate-800 rounded-t-sm relative overflow-hidden" style={{ height: '80%' }}>
                                            <div className="absolute inset-x-0 bottom-0 bg-teal-900/40 h-full border-t border-teal-800/50" />
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase text-center tracking-wider">Manual</div>
                                    </div>

                                    {/* AI Optimized - Dynamic Height */}
                                    <div className="flex-1 flex flex-col justify-end gap-2 group/bar">
                                        <div className="text-xs text-teal-400 text-center font-mono font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                            {activeAgents.size > 0 ? '45%' : '92%'}
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-t-sm relative overflow-hidden" style={{ height: activeAgents.size > 0 ? '45%' : '80%', transition: 'height 1s ease-in-out' }}>
                                            <div className="absolute inset-x-0 bottom-0 bg-teal-500 h-full shadow-[0_0_20px_rgba(20,184,166,0.4)]" />
                                            {/* Striped Pattern Overlay */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 mix-blend-overlay" />
                                        </div>
                                        <div className="text-[10px] font-bold text-teal-400 uppercase text-center tracking-wider">AI Adjusted</div>
                                    </div>
                                </div>
                            </div>

                            {/* Efficiency Gain (Pulse) */}
                            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 p-5 flex flex-col shadow-xl hover:border-emerald-500/30 transition-colors relative overflow-hidden">
                                <div className="flex justify-between items-start z-10 relative">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency Gain</h4>
                                        <p className="text-[10px] text-slate-500">System-wide throughput velocity</p>
                                    </div>
                                    <div className="p-1.5 rounded-md bg-emerald-900/20 text-emerald-400">
                                        <Activity size={16} />
                                    </div>
                                </div>

                                <div className="flex-1 flex items-end justify-between relative z-10">
                                    {/* Pulse Line SVG */}
                                    <div className="absolute inset-0 bottom-0 top-8 opacity-40">
                                        <svg viewBox="0 0 200 100" className="w-full h-full preserve-3d">
                                            <path
                                                d={activeAgents.size > 0
                                                    ? "M0,80 Q20,80 40,80 T60,80 T80,50 T100,50 T120,20 T140,80 T160,80 T180,80 T200,80"
                                                    : "M0,80 L200,80"
                                                }
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                className={`text-emerald-500 transition-all duration-1000 ${activeAgents.size > 0 ? 'animate-pulse' : ''}`}
                                            />
                                            {activeAgents.size > 0 && (
                                                <path
                                                    d="M0,80 Q20,80 40,80 T60,80 T80,50 T100,50 T120,20 T140,80 T160,80 T180,80 T200,80"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    className="text-emerald-400/20 blur-sm"
                                                />
                                            )}
                                        </svg>
                                    </div>

                                    <div className="text-5xl font-bold text-white tabular-nums tracking-tighter relative z-20 mt-auto ml-auto">
                                        {activeAgents.size > 0 ? '129' : '0'}
                                        <span className="text-2xl text-emerald-500 align-top">%</span>
                                    </div>
                                </div>

                                {/* Background glow */}
                                <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] transition-opacity duration-700 ${activeAgents.size > 0 ? 'opacity-100' : 'opacity-0'}`} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: Intelligence Stream */}
                    <div className="w-full lg:w-96 border-l border-slate-800 bg-slate-900 flex flex-col h-[500px] lg:h-auto">
                        <SimulationFeed activeAgents={activeAgents} />
                    </div>

                </div>
            </div>
        </div>
    );
}

// Subcomponents

const TickerItem = ({ label, value, delta, unit, inverse = false, context }: any) => {
    // Inverse means negative delta is GOOD (e.g. Cost, Wait Time)
    const isGood = inverse ? delta <= 0 : delta > 0;
    const color = isGood ? 'text-emerald-400' : 'text-rose-400';

    return (
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</span>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
                <span className={`text-xs font-bold ${color}`}>
                    {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                </span>
            </div>
            {/* Context Label */}
            {context && Math.abs(delta) > 0.1 && (
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">{context}</span>
            )}
        </div>
    );
};

const ControlGroup = ({ title, agents, activeAgents, toggleAgent, data, icon, color }: any) => (
    <div className="space-y-3">
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${color}`}>
            {icon} {title}
        </h3>
        <div className="space-y-2">
            {agents.map((id: string) => (
                <div
                    key={id}
                    onClick={() => toggleAgent(id)}
                    className={`group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${activeAgents.has(id)
                        ? 'bg-teal-500/10 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                        : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                >
                    <div>
                        <div className={`text-sm font-bold ${activeAgents.has(id) ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {data[id].name}
                        </div>
                        <div className="text-[10px] text-slate-600 truncate max-w-[180px]">{data[id].description}</div>
                    </div>
                    <div className={`transition-transform duration-300 ${activeAgents.has(id) ? 'scale-110 text-teal-500' : 'text-slate-600 scale-90'}`}>
                        {activeAgents.has(id) ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SNSSimulator;
