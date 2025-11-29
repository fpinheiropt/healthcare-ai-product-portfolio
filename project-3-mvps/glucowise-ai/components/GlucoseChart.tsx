import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface DataPoint {
  timestamp: string;
  value: number;
  context?: string;
  [key: string]: any;
}

interface GlucoseChartProps {
  readings: DataPoint[];
  height?: number;
  type?: 'glucose' | 'a1c';
}

const GlucoseChart: React.FC<GlucoseChartProps> = ({ readings, height = 300, type = 'glucose' }) => {
  // Sort readings by date
  const data = [...readings].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let colorClass = 'text-emerald-600';
      
      if (type === 'glucose') {
        if (value < 70 || value > 250) colorClass = 'text-red-600';
        else if (value > 180) colorClass = 'text-amber-600';
      } else {
        // A1C Logic
        if (value >= 9) colorClass = 'text-red-600';
        else if (value >= 7) colorClass = 'text-amber-600';
        else colorClass = 'text-emerald-600';
      }

      return (
        <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-xl min-w-[140px]">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{format(parseISO(label), 'MMM d, h:mm a')}</p>
          <p className={`text-2xl font-bold ${colorClass}`}>
            {value} <span className="text-xs font-medium text-slate-400">{type === 'glucose' ? 'mg/dL' : '%'}</span>
          </p>
          {payload[0].payload.context && (
            <p className="text-xs font-medium text-slate-500 mt-2 bg-slate-50 px-2 py-1 rounded inline-block">{payload[0].payload.context}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-slate-800 font-bold text-lg">
          {type === 'glucose' ? 'Glucose Trends' : 'Estimated A1C History'}
        </h3>
        <div className="flex items-center space-x-3 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {type === 'glucose' ? 'Target (70-180)' : 'Target (<7%)'}
            </div>
        </div>
      </div>
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(str) => format(parseISO(str), 'MMM d')}
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              domain={type === 'glucose' ? [40, 300] : [5, 12]} 
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            
            {/* Reference Areas and Lines based on Type */}
            {type === 'glucose' ? (
              <>
                <ReferenceArea y1={70} y2={180} fill="#10b981" fillOpacity={0.08} />
                <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: '70', position: 'insideLeft', fontSize: 10, fill: '#10b981', dy: -10 }} />
                <ReferenceLine y={180} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: '180', position: 'insideLeft', fontSize: 10, fill: '#10b981', dy: 10 }} />
              </>
            ) : (
              <>
                 <ReferenceArea y1={5} y2={7} fill="#10b981" fillOpacity={0.08} />
                 <ReferenceLine y={7} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.8} label={{ value: 'Target 7%', position: 'insideLeft', fontSize: 10, fill: '#10b981', dy: -10 }} />
                 <ReferenceLine y={9} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'High Risk 9%', position: 'insideLeft', fontSize: 10, fill: '#ef4444', dy: -10 }} />
              </>
            )}
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={type === 'glucose' ? "#0ea5e9" : "#8b5cf6"} 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: type === 'glucose' ? '#0ea5e9' : '#8b5cf6' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: type === 'glucose' ? '#0ea5e9' : '#8b5cf6' }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GlucoseChart;