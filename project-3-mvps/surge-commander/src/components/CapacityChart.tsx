import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SimulationState } from '../engine/CapacityEngine';

interface CapacityChartProps {
    data: SimulationState[];
    totalBeds: number;
}

export function CapacityChart({ data, totalBeds }: CapacityChartProps) {
    return (
        <div className="h-[300px] w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Capacity Forecast (24 Hours)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorOccupied" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorQueue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <ReferenceLine y={totalBeds} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Capacity Limit', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }} />
                    <Area type="monotone" dataKey="occupiedBeds" stackId="1" stroke="#3b82f6" fill="url(#colorOccupied)" name="Occupied Beds" />
                    <Area type="monotone" dataKey="waitingRoomQueue" stackId="2" stroke="#ef4444" fill="url(#colorQueue)" name="Waiting Queue" />
                    <Area type="monotone" dataKey="networkDiverted" stackId="3" stroke="#10b981" fill="#d1fae5" name="Diverted (Network)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
