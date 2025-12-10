import { SimulationState } from '../engine/CapacityEngine';
import { Users, BedDouble, AlertTriangle, Activity } from 'lucide-react';

interface StatsCardsProps {
    currentState: SimulationState;
    totalBeds: number;
}

export function StatsCards({ currentState, totalBeds }: StatsCardsProps) {
    const occupancyRate = (currentState.occupiedBeds / totalBeds) * 100;
    const isCritical = occupancyRate > 90;
    const isCollapsed = currentState.collapsed;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-5 rounded-2xl shadow-sm border ${isCollapsed ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">System Status</span>
                    <Activity className={`w-5 h-5 ${isCollapsed ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`} />
                </div>
                <div className={`text-2xl font-bold ${isCollapsed ? 'text-red-700' : 'text-slate-900'}`}>
                    {isCollapsed ? 'COLLAPSED' : isCritical ? 'CRITICAL' : 'STABLE'}
                </div>
                <div className="text-xs text-slate-400 mt-1">Time: Hour {currentState.time}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">Occupancy</span>
                    <BedDouble className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                    {currentState.occupiedBeds} <span className="text-sm font-medium text-slate-400">/ {totalBeds}</span>
                </div>
                <div className={`text-xs mt-1 font-medium ${occupancyRate > 90 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {occupancyRate.toFixed(1)}% Full
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">Waiting Queue</span>
                    <Users className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{currentState.waitingRoomQueue}</div>
                <div className="text-xs text-slate-400 mt-1">Patients waiting for beds</div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">Risk Level</span>
                    <AlertTriangle className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                    {currentState.inflow > 20 ? 'HIGH' : 'LOW'}
                </div>
                <div className="text-xs text-slate-400 mt-1">Inflow: {currentState.inflow}/hr</div>
            </div>
        </div>
    );
}
