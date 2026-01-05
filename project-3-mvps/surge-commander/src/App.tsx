import { useState, useEffect, useRef } from 'react';
import { CapacityEngine, SimulationParams, SimulationState } from './engine/CapacityEngine';
import { ControlPanel } from './components/ControlPanel';
import { StatsCards } from './components/StatsCards';
import { CapacityChart } from './components/CapacityChart';
import { ShieldAlert, Play, RotateCcw, Pause } from 'lucide-react';

function App() {
    const [params, setParams] = useState<SimulationParams>({
        inflowRate: 35,
        dischargeRate: 25,
        totalBeds: 200,
        nurseRatio: 1.0,
        networkOpen: false,
        networkCapacity: 10,
    });

    const [currentState, setCurrentState] = useState<SimulationState>(CapacityEngine.getInitialState());
    const [history, setHistory] = useState<SimulationState[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    // For forecast chart (preview)
    const [forecast, setForecast] = useState<SimulationState[]>([]);

    const intervalRef = useRef<number | null>(null);

    // Update forecast whenever params change (if not running)
    useEffect(() => {
        if (!isSimulating) {
            const initial = CapacityEngine.getInitialState();
            const prediction = CapacityEngine.runForecast(initial, params, 24);
            setForecast(prediction);
        }
    }, [params, isSimulating]);

    const startSimulation = () => {
        setIsSimulating(true);
        intervalRef.current = window.setInterval(() => {
            setCurrentState((prev) => {
                const next = CapacityEngine.nextStep(prev, params);
                setHistory(h => {
                    const newHistory = [...h, next];
                    if (newHistory.length > 50) newHistory.shift(); // Keep window small
                    return newHistory;
                });

                if (next.collapsed) {
                    // Auto-pause on collapse? Or let it run to show chaos.
                    // Let's let it run but maybe slow down or show alert.
                }
                return next;
            });
        }, 800); // 800ms per "hour"
    };

    const stopSimulation = () => {
        setIsSimulating(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const resetSimulation = () => {
        stopSimulation();
        setCurrentState(CapacityEngine.getInitialState());
        setHistory([]);
    };

    const handleParamChange = (key: keyof SimulationParams, value: any) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                            <ShieldAlert className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900">National Health OS</h1>
                            <p className="text-slate-500 font-medium">National Capacity Simulator • Ministry of Health</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {isSimulating ? (
                            <button onClick={stopSimulation} className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 font-bold rounded-xl hover:bg-amber-200 transition-colors">
                                <Pause className="w-5 h-5" /> Pause
                            </button>
                        ) : (
                            <button onClick={startSimulation} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                                <Play className="w-5 h-5" /> Start Simulation
                            </button>
                        )}
                        <button onClick={resetSimulation} className="p-3 bg-white text-slate-400 rounded-xl border border-slate-200 hover:text-slate-600 transition-colors">
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Controls */}
                    <div className="lg:col-span-1">
                        <ControlPanel params={params} onChange={handleParamChange} isSimulating={isSimulating} />

                        {/* Legend / Info */}
                        <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2">How it works</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                This dashboard uses System Dynamics to model national health capacity.
                                Adjust the <strong className="text-blue-600">Inflow Rate</strong> (Epidemic Surge) and <strong className="text-emerald-600">Discharge Rate</strong> (Efficiency) to see if the system collapses.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-50 p-2 rounded">
                                <span>Logic:</span>
                                P(t+1) = P(t) + Inflow - Discharge
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visualization */}
                    <div className="lg:col-span-2 space-y-6">
                        <StatsCards currentState={currentState} totalBeds={params.totalBeds} />

                        <div className="relative">
                            <CapacityChart data={isSimulating ? history : forecast} totalBeds={params.totalBeds} />
                            {!isSimulating && (
                                <div className="absolute top-4 right-4 bg-slate-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                    Forecast Preview
                                </div>
                            )}
                            {isSimulating && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200 animate-pulse">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Live Simulation
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
