import React, { useState, useEffect } from 'react';
import { Truck, Clock, AlertCircle, Plus, Zap, CheckCircle2 } from 'lucide-react';
import { Job, Porter, INITIAL_PORTERS, HOSPITAL_NODES, LogisticsEngine } from '../engine/LogisticsEngine';
import HospitalMap from './HospitalMap';

const DispatchDashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [porters, setPorters] = useState<Porter[]>(INITIAL_PORTERS);
    const [stats, setStats] = useState({ completed: 0, avgTime: 0 });

    // Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setPorters(currentPorters => {
                return currentPorters.map(porter => {
                    // Move Porter logic (simplified)
                    if (porter.assignedJobId) {
                        const job = jobs.find(j => j.id === porter.assignedJobId);
                        if (job && porter.route.length > 0) {
                            const targetNode = porter.route[0];
                            const target = HOSPITAL_NODES.find(n => n.id === targetNode.id);

                            if (target) {
                                // Move towards target (lerp)
                                const dx = target.x - porter.currentLocation.x;
                                const dy = target.y - porter.currentLocation.y;
                                const dist = Math.sqrt(dx * dx + dy * dy);

                                if (dist < 1) {
                                    // Arrived at node
                                    const newRoute = porter.route.slice(1);

                                    // If route finished, job complete
                                    if (newRoute.length === 0) {
                                        completeJob(porter.assignedJobId);
                                        return { ...porter, status: 'idle', route: [], assignedJobId: null, currentLocation: { x: target.x, y: target.y } };
                                    }

                                    return { ...porter, route: newRoute, currentLocation: { x: target.x, y: target.y } };
                                } else {
                                    // Create movement step
                                    const speed = 1.5; // movement speed
                                    return {
                                        ...porter,
                                        currentLocation: {
                                            x: porter.currentLocation.x + (dx / dist) * speed,
                                            y: porter.currentLocation.y + (dy / dist) * speed
                                        }
                                    };
                                }
                            }
                        }
                    }
                    return porter;
                });
            });
        }, 100); // 100ms tick for smooth animation

        return () => clearInterval(interval);
    }, [jobs]);

    const completeJob = (jobId: string) => {
        setJobs(prev => prev.filter(j => j.id !== jobId));
        setStats(prev => ({ ...prev, completed: prev.completed + 1 }));
    };

    const addRandomJob = () => {
        const start = HOSPITAL_NODES[Math.floor(Math.random() * HOSPITAL_NODES.length)];
        let end = HOSPITAL_NODES[Math.floor(Math.random() * HOSPITAL_NODES.length)];
        while (end.id === start.id) {
            end = HOSPITAL_NODES[Math.floor(Math.random() * HOSPITAL_NODES.length)];
        }

        const priority = Math.random() > 0.8 ? 'stat' : Math.random() > 0.5 ? 'urgent' : 'routine';

        const newJob: Job = {
            id: Math.random().toString(36).substr(2, 9),
            description: `Transfer ${start.label} -> ${end.label}`,
            startNodeId: start.id,
            endNodeId: end.id,
            priority: priority as any,
            status: 'pending',
            timestamp: Date.now()
        };

        setJobs(prev => [...prev, newJob]);
    };

    const runOptimization = () => {
        // Assign pending jobs to idle porters
        const pendingJobs = jobs.filter(j => j.status === 'pending');
        const idlePorters = porters.filter(p => p.status === 'idle');

        if (pendingJobs.length > 0 && idlePorters.length > 0) {
            setPorters(current => {
                const updatedPorters = [...current];

                // Simple Assignment: One job per idle porter for MVP
                idlePorters.forEach((porter, idx) => {
                    if (idx < pendingJobs.length) {
                        const job = pendingJobs[idx];
                        // Find porter index in main array
                        const pIndex = updatedPorters.findIndex(p => p.id === porter.id);
                        if (pIndex !== -1) {
                            // Use Logistics Engine to optimize route
                            const routeIds = LogisticsEngine.optimizeRoute(porter.currentLocation, [job]);
                            const routeNodes = routeIds.map(id => LogisticsEngine.getNode(id)!).filter(n => n);

                            updatedPorters[pIndex] = {
                                ...updatedPorters[pIndex],
                                status: 'busy',
                                assignedJobId: job.id,
                                route: routeNodes
                            };

                            // Update Job Status
                            setJobs(prevJobs => prevJobs.map(j => j.id === job.id ? { ...j, status: 'assigned' } : j));
                        }
                    }
                });
                return updatedPorters;
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-6 p-6">
            {/* Left: Map & Visualization */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Truck className="text-indigo-600" /> Dispatch Command
                        </h2>
                        <p className="text-slate-500">Real-time Logistics Optimization</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">Jobs Done</span>
                            <span className="text-2xl font-bold text-slate-700">{stats.completed}</span>
                        </div>
                        <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col items-center">
                            <span className="text-xs font-bold text-emerald-600 uppercase">Efficiency</span>
                            <span className="text-2xl font-bold text-emerald-700">94%</span>
                        </div>
                    </div>
                </div>

                <HospitalMap porters={porters} nodes={HOSPITAL_NODES} />

                <div className="grid grid-cols-3 gap-4">
                    {porters.map(p => (
                        <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${p.status === 'idle' ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`} />
                            <div>
                                <p className="font-bold text-sm text-slate-700">{p.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{p.status} {p.assignedJobId ? '• On Job' : ''}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Job Queue & Controls */}
            <div className="w-full lg:w-96 flex flex-col gap-4">
                <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-1">PorterSmart AI</h3>
                        <p className="text-indigo-200 text-sm mb-4">TSP Algorithm v1.0.4 Active</p>
                        <button
                            onClick={runOptimization}
                            className="w-full py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                        >
                            <Zap size={18} fill="currentColor" /> Run Optimization
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700">Job Queue</h3>
                        <button onClick={addRandomJob} className="p-2 hover:bg-slate-100 rounded-lg text-indigo-600 transition">
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-1 max-h-[500px] pr-2">
                        {jobs.length === 0 && (
                            <div className="text-center py-10 text-slate-400">
                                <CheckCircle2 className="mx-auto mb-2 opacity-50" />
                                <p>All caught up!</p>
                            </div>
                        )}
                        {jobs.map(job => (
                            <div key={job.id} className={`p-4 rounded-xl border ${job.status === 'assigned' ? 'bg-slate-50 border-slate-200 opacity-60' :
                                    'bg-white border-slate-200 hover:border-indigo-300'
                                } transition-all`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${job.priority === 'stat' ? 'bg-red-100 text-red-700' :
                                            job.priority === 'urgent' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {job.priority}
                                    </span>
                                    <span className="text-xs text-slate-400 font-mono">#{job.id}</span>
                                </div>
                                <p className="font-bold text-slate-700 text-sm">{job.description}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                                    <Clock size={12} />
                                    <span>{Math.floor((Date.now() - job.timestamp) / 1000)}s ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispatchDashboard;
