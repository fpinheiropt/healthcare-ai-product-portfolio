import React from 'react';
import { Patient, RiskLevel } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Activity, ChevronRight, Search, Filter, Bell } from 'lucide-react';

interface ProviderDashboardProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  selectedPatientId: string | null;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ patients, onSelectPatient, selectedPatientId }) => {
  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH: return 'bg-red-50 text-red-700 border-red-200 ring-red-100';
      case RiskLevel.MODERATE: return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-100';
      case RiskLevel.LOW: return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100';
    }
  };

  const highRiskCount = patients.filter(p => p.riskLevel === RiskLevel.HIGH).length;
  const activeAlerts = patients.reduce((acc, p) => acc + p.alerts.length, 0);

  return (
    <div className="h-full flex flex-col bg-slate-50/50 font-sans">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-4 gap-6 p-8 pb-2">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Patients</p>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{patients.length}</h3>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl text-slate-600"><Users size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">High Risk</p>
            <h3 className="text-3xl font-bold text-red-600 tracking-tight">{highRiskCount}</h3>
          </div>
          <div className="bg-red-50 p-3 rounded-xl text-red-600"><Activity size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Alerts</p>
            <h3 className="text-3xl font-bold text-amber-600 tracking-tight">{activeAlerts}</h3>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><AlertTriangle size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Readmission Rate</p>
            <h3 className="text-3xl font-bold text-teal-600 tracking-tight">14.2%</h3>
            <p className="text-xs text-emerald-600 flex items-center font-medium mt-1">↓ 2.1% this month</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-xl text-teal-600"><TrendingUp size={24} /></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-8 gap-8">
        {/* Patient List */}
        <div className="w-1/3 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-slate-800 text-lg">Patient Queue</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><Search size={18} /></button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><Filter size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {patients.sort((a, b) => b.riskScore - a.riskScore).map(patient => (
              <div
                key={patient.id}
                onClick={() => onSelectPatient(patient.id)}
                className={`p-5 border-b border-slate-50 cursor-pointer transition-all duration-200 group ${selectedPatientId === patient.id ? 'bg-teal-50/50 border-l-4 border-l-teal-500' : 'border-l-4 border-l-transparent hover:bg-slate-50'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`font-bold text-base ${selectedPatientId === patient.id ? 'text-teal-900' : 'text-slate-800'}`}>{patient.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{patient.condition} • {patient.age}yo</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ring-1 ring-inset ${getRiskColor(patient.riskLevel)}`}>
                    {patient.riskScore}% Risk
                  </span>
                </div>
                {patient.alerts.length > 0 && (
                  <div className="bg-red-50/80 text-red-700 text-xs p-2.5 rounded-lg flex items-start gap-2 border border-red-100/50">
                    <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                    <span className="line-clamp-1 font-medium">{patient.alerts[0]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Patient Detail */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
          {selectedPatient ? (
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedPatient.name}</h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">ID: #{selectedPatient.id}</span>
                      <span>Last Check-in: {selectedPatient.lastCheckIn ? new Date(selectedPatient.lastCheckIn).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold border ring-1 ring-inset ${getRiskColor(selectedPatient.riskLevel)}`}>
                    {selectedPatient.riskLevel} RISK LEVEL
                  </span>
                </div>
              </div>

              {/* Alerts Section */}
              {selectedPatient.alerts.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-8 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-lg">
                    <AlertTriangle size={20} /> Priority Actions Required
                  </h4>
                  <ul className="space-y-2">
                    {selectedPatient.alerts.map((alert, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-red-700 font-medium bg-white/50 p-2 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weight Chart */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><TrendingUp size={18} /></div>
                  Weight Trend (30 Days)
                </h3>
                <div className="h-72 w-full bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedPatient.weightHistory}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => val.split('-').slice(1).join('/')}
                        dy={10}
                      />
                      <YAxis
                        domain={['dataMin - 2', 'dataMax + 2']}
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#0f766e', fontWeight: 600 }}
                        cursor={{ stroke: '#0d9488', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <ReferenceLine y={selectedPatient.weightHistory[0]?.weight + 3} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', fill: '#ef4444', fontSize: 12 }} />
                      <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="#0d9488"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorWeight)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Medications */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">Medication Adherence</h3>
                  <div className="space-y-3">
                    {selectedPatient.medications.map(med => (
                      <div key={med.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div>
                          <p className="font-bold text-sm text-slate-800">{med.name}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{med.frequency}</p>
                        </div>
                        <div className={`text-xs px-2.5 py-1 rounded-full font-bold ${med.takenToday ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                          {med.takenToday ? 'Taken' : 'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Food Logs */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">Recent Sodium Intake</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {selectedPatient.foodLogs.slice(0, 5).map(log => (
                      <div key={log.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-sm font-medium text-slate-700 capitalize">{log.name}</span>
                        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">{log.sodiumMg} mg</span>
                      </div>
                    ))}
                    {selectedPatient.foodLogs.length === 0 && <p className="text-sm text-slate-400 italic text-center py-8">No food logs available.</p>}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <div className="bg-slate-50 p-8 rounded-full mb-4">
                <Users size={64} className="opacity-50" />
              </div>
              <p className="text-lg font-medium text-slate-400">Select a patient to view clinical details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};