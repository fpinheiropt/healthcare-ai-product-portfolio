import React, { useState } from 'react';
import AIChatInterface from './AIChatInterface';
import AgentInsight from './AgentInsight';
import RecentActivityLog from './RecentActivityLog';
import { Patient, WeatherData, DailyLog, Medication, Zone } from '../types';

import { EnvironmentalTrigger } from './EnvironmentalTrigger';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, Wind, Activity, Thermometer, Phone, Pill, CheckCircle, PlusCircle, Clock, ChevronDown, ChevronUp, AlertCircle, TrendingUp, Heart, Utensils, BookOpen, MessageSquare, Check, Info } from 'lucide-react';

interface Props {
  patient: Patient;
  weather: WeatherData;
  onAddLog: (log: DailyLog) => void;
  onTakeMedication: (medId: string) => void;
}

const PatientDashboard: React.FC<Props> = ({ patient, weather, onAddLog, onTakeMedication }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'food' | 'learn' | 'chat'>('home');
  const [showEmergency, setShowEmergency] = useState(false);
  const [expandedMedId, setExpandedMedId] = useState<string | null>(null);
  const [todayLog, setTodayLog] = useState<Partial<DailyLog>>({
    pef: patient.baselinePEF,
    spO2: 98,
    breathlessness: 1,
    rescueInhalerPuffs: 0,
    notes: ''
  });

  // Calculate Zone based on latest PEF
  const latestLog = patient.logs[patient.logs.length - 1];
  const pefPercentage = (latestLog.pef / patient.baselinePEF) * 100;

  let currentZone = Zone.GREEN;
  if (pefPercentage < 50) currentZone = Zone.RED;
  else if (pefPercentage < 80) currentZone = Zone.YELLOW;

  const getZoneColor = (zone: Zone) => {
    switch (zone) {
      case Zone.GREEN: return 'bg-green-100 text-green-800 border-green-300';
      case Zone.YELLOW: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case Zone.RED: return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      pef: Number(todayLog.pef),
      spO2: Number(todayLog.spO2),
      breathlessness: Number(todayLog.breathlessness),
      coughSeverity: 2, // Default simplified
      sputumColor: 'Clear', // Default simplified
      steps: 1000, // Mock
      rescueInhalerPuffs: Number(todayLog.rescueInhalerPuffs),
      notes: todayLog.notes || ''
    };
    onAddLog(newLog);
    alert("Log saved successfully!");
    setActiveTab('home');
  };

  // Check if a medication was taken today
  const isTakenToday = (med: Medication) => {
    if (!med.lastTaken) return false;
    const takenDate = new Date(med.lastTaken).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return takenDate === today;
  };

  const toggleMedExpand = (id: string) => {
    setExpandedMedId(expandedMedId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white px-6 py-5 shadow-sm flex justify-between items-center sticky top-0 z-10 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hi, {patient.name.split(' ')[0]}</h2>
          <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button onClick={() => setShowEmergency(true)} className="bg-red-50 text-red-600 p-2.5 rounded-full hover:bg-red-100 transition-colors shadow-sm border border-red-100">
          <AlertCircle size={22} />
        </button>
      </div>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border-t-8 border-red-600">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle size={48} className="text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Protocol</h2>
              <p className="text-gray-600 mb-6">If you are having severe difficulty breathing or chest pain, do not wait.</p>

              <a href="tel:911" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg mb-3 hover:bg-red-700 transition">
                Call 911 Immediately
              </a>
              <button
                onClick={() => setShowEmergency(false)}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {activeTab === 'home' && (
          <div className="p-5 space-y-6">
            {/* Neural Guardian Agent */}
            <AgentInsight
              aqi={weather.aqi || 45} // Fallback if missing
              pollenLevel={weather.pollen.split(' ')[0]} // "High"
              pollenDetail={weather.pollen.includes('(') ? weather.pollen.substring(weather.pollen.indexOf('(')) : ''} // "(Grass)"
              isIndoors={false}
            />

            {/* Environmental Trigger Simulator */}
            <EnvironmentalTrigger weather={weather} className="mb-6" />

            {/* Current Status Zone - Matching HeartGuide AI */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">Asthma Status</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-bold tracking-tighter">{currentZone}</h3>
                    <span className="text-lg opacity-60 font-medium">ZONE</span>
                  </div>
                  <p className="text-teal-100 text-xs mt-1">Peak Flow: {latestLog.pef} L/min</p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <Wind className="text-white" size={28} />
                </div>
              </div>

              {/* Zone Simulator */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-teal-200" />
                    <span className="text-sm font-medium text-teal-50">Risk Simulator</span>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                    PEF: {Math.round((latestLog.pef / patient.baselinePEF) * 100)}%
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-teal-100 mb-1.5">
                      <span>Trigger Exposure</span>
                      <span className="font-bold">5/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      defaultValue={5}
                      className="w-full h-1.5 bg-teal-900/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-teal-100 mb-1.5">
                      <span>Symptom Severity</span>
                      <span className="font-bold">3/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      defaultValue={3}
                      className="w-full h-1.5 bg-teal-900/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-teal-200">Predicted Zone:</span>
                    <span className="text-sm font-bold text-emerald-300">
                      {currentZone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('checkin')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:shadow-md"
              >
                <div className="bg-teal-50 p-3.5 rounded-2xl text-teal-600">
                  <PlusCircle size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Log Symptoms</span>
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:shadow-md"
              >
                <div className="bg-blue-50 p-3.5 rounded-2xl text-blue-600">
                  <Pill size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Medications</span>
              </button>
            </div>

            {/* PEF Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Peak Flow Trend (30 Days)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.logs}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(val) => val.slice(5)} />
                    <YAxis domain={[0, 500]} />
                    <Tooltip />
                    <ReferenceLine y={patient.baselinePEF} stroke="#10b981" strokeDasharray="3 3" label="Baseline" />
                    <ReferenceLine y={patient.baselinePEF * 0.8} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="pef" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'food' && (
          <div className="p-5 space-y-6">
            <RecentActivityLog />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-5 h-full">
            <AIChatInterface nurseName="Dr. Al" specialty="Pulmonology" />
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="p-8 text-center text-slate-500 mt-20">
            <p>Check-in form coming soon.</p>
            <button onClick={() => setActiveTab('home')} className="mt-4 text-teal-600 font-bold">Go Home</button>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="p-8 text-center text-slate-500 mt-20">
            <p>Education modules coming soon.</p>
            <button onClick={() => setActiveTab('home')} className="mt-4 text-teal-600 font-bold">Go Home</button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-slate-200 px-6 py-4 flex justify-between items-center absolute bottom-0 w-full z-20 pb-8">
        <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} flex flex-col items-center gap-1 transition-colors`}>
          <Heart size={24} className={activeTab === 'home' ? 'fill-current' : ''} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab('checkin')} className={`${activeTab === 'checkin' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} flex flex-col items-center gap-1 transition-colors`}>
          <Activity size={24} />
          <span className="text-[10px] font-medium">Check-in</span>
        </button>
        <button onClick={() => setActiveTab('food')} className={`${activeTab === 'food' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} flex flex-col items-center gap-1 transition-colors`}>
          <Utensils size={24} />
          <span className="text-[10px] font-medium">Log</span>
        </button>
        <button onClick={() => setActiveTab('learn')} className={`${activeTab === 'learn' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} flex flex-col items-center gap-1 transition-colors`}>
          <BookOpen size={24} />
          <span className="text-[10px] font-medium">Learn</span>
        </button>
        <button onClick={() => setActiveTab('chat')} className={`${activeTab === 'chat' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} flex flex-col items-center gap-1 transition-colors`}>
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">Care</span>
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;