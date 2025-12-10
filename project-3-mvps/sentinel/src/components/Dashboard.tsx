import { ShieldCheck, Users, AlertTriangle } from 'lucide-react';
import { useWaitingRoom } from '../hooks/useWaitingRoom';
import { CameraFeed } from './CameraFeed';
import { PatientList } from './PatientList';

export function Dashboard() {
    const { patients } = useWaitingRoom();
    const criticalCount = patients.filter(p => p.riskScore > 60).length;

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-mono">
            {/* Sidebar / Command Center */}
            <aside className="w-80 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-emerald-400 mb-2">
                        <ShieldCheck className="w-6 h-6" />
                        <span className="font-bold tracking-wider">SENTINEL AI</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Waiting Room Monitor</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-6 border-b border-slate-800">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div className="text-xs text-slate-500 mb-1">Occupancy</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            {patients.length}
                        </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${criticalCount > 0 ? 'bg-red-500/10 border-red-500/50' : 'bg-slate-800/50 border-slate-700'}`}>
                        <div className="text-xs text-slate-500 mb-1">Critical</div>
                        <div className={`text-xl font-bold flex items-center gap-2 ${criticalCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            <AlertTriangle className="w-4 h-4" />
                            {criticalCount}
                        </div>
                    </div>
                </div>

                {/* Patient List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <PatientList patients={patients} />
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-900 text-xs text-slate-500 text-center">
                    System Online • Latency: 12ms
                </div>
            </aside>

            {/* Main Content - Video Feed */}
            <main className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"></div>

                {/* The "Feed" */}
                <div className="relative w-[95%] h-[90%] border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1 roundedFull border border-white/10 text-xs font-bold text-red-500 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        LIVE FEED • CAM-01
                    </div>
                    <CameraFeed patients={patients} />
                </div>
            </main>
        </div>
    );
}
