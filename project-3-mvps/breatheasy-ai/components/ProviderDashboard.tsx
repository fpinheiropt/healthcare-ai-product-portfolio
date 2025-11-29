import React, { useState, useEffect } from 'react';
import { Patient, AIAnalysisResult, RiskLevel } from '../types';
import { analyzePatientRisk } from '../services/geminiService';
import { Users, Bell, Search, BrainCircuit, ArrowRight, Activity, FileText } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  patients: Patient[];
}

const ProviderDashboard: React.FC<Props> = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleRunAI = async () => {
    if (!selectedPatient) return;
    setAnalyzing(true);
    const result = await analyzePatientRisk(selectedPatient);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  // Clear AI result when switching patients
  useEffect(() => {
    setAiAnalysis(null);
  }, [selectedPatient]);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-medical-800 flex items-center gap-2">
            <Activity className="text-medical-600" />
            BreathEasy Pro
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-medical-50 text-medical-700 rounded-lg font-medium">
            <Users size={20} />
            Patient List
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <Bell size={20} />
            Alert Queue <span className="ml-auto bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
            <Search className="text-gray-400 mr-2" size={18} />
            <input type="text" placeholder="Search patients..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-gray-600">Dr. Emily Chen, Pulmonology</span>
             <div className="w-8 h-8 rounded-full bg-medical-200 flex items-center justify-center text-medical-700 font-bold">EC</div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Patient List */}
          <div className={`w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto ${selectedPatient ? 'hidden md:block' : 'block'}`}>
             <div className="p-4">
               <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">High Risk Patients</h2>
               <div className="space-y-2">
                 {patients.map(p => (
                   <div 
                    key={p.id} 
                    onClick={() => setSelectedPatient(p)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${selectedPatient?.id === p.id ? 'border-medical-500 bg-medical-50' : 'border-gray-100 hover:border-medical-200'}`}
                   >
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{p.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.riskScore > 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {p.riskScore}% Risk
                        </span>
                     </div>
                     <div className="flex items-center text-xs text-gray-500 gap-3">
                       <span>Age: {p.age}</span>
                       <span>{p.copdStage}</span>
                       <span>PEF: {p.logs[p.logs.length-1].pef}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Patient Detail / AI View */}
          <div className={`flex-1 bg-slate-50 overflow-y-auto p-6 ${!selectedPatient ? 'hidden md:block' : 'block'}`}>
            {!selectedPatient ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Users size={64} className="mb-4 opacity-20" />
                <p>Select a patient to view details</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                 <button onClick={() => setSelectedPatient(null)} className="md:hidden mb-4 text-sm text-gray-500 flex items-center">
                   ← Back to list
                 </button>

                 <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{selectedPatient.name}</h1>
                      <p className="text-gray-500">{selectedPatient.gender}, {selectedPatient.age} yrs • {selectedPatient.copdStage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Baseline PEF</p>
                      <p className="text-xl font-bold text-gray-900">{selectedPatient.baselinePEF} L/min</p>
                    </div>
                 </div>

                 {/* AI Analysis Section */}
                 <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
                   <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
                     <div className="flex items-center gap-2">
                       <BrainCircuit size={24} />
                       <h2 className="font-bold text-lg">AI Exacerbation Predictor</h2>
                     </div>
                     {!aiAnalysis && (
                       <button 
                        onClick={handleRunAI}
                        disabled={analyzing}
                        className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 disabled:opacity-70 flex items-center gap-2"
                      >
                        {analyzing ? 'Analyzing...' : 'Run Analysis'}
                      </button>
                     )}
                   </div>
                   
                   <div className="p-6">
                      {!aiAnalysis ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>Click "Run Analysis" to generate real-time risk prediction based on recent logs.</p>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-fade-in">
                          <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                               <svg className="w-full h-full" viewBox="0 0 36 36">
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={aiAnalysis.riskScore > 60 ? "#ef4444" : "#10b981"} strokeWidth="3" strokeDasharray={`${aiAnalysis.riskScore}, 100`} />
                               </svg>
                               <div className="absolute flex flex-col items-center">
                                 <span className="text-3xl font-bold text-gray-900">{aiAnalysis.riskScore}%</span>
                                 <span className="text-xs uppercase font-bold text-gray-500">Probability</span>
                               </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2">Reasoning Model</h3>
                              <p className="text-gray-600 text-sm leading-relaxed">{aiAnalysis.reasoning}</p>
                            </div>
                          </div>

                          <div className={`p-4 rounded-lg border-l-4 ${aiAnalysis.urgentActionRequired ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-500'}`}>
                            <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                              <FileText size={18} /> 
                              Clinical Recommendation
                            </h4>
                            <p className="text-gray-700">{aiAnalysis.recommendation}</p>
                          </div>
                        </div>
                      )}
                   </div>
                 </div>

                 {/* Charts */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-gray-800 mb-4">Vital Trends (Last 14 Days)</h3>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={selectedPatient.logs}>
                         <Line type="monotone" dataKey="pef" stroke="#0d9488" strokeWidth={2} dot={false} />
                         <Line type="monotone" dataKey="spO2" stroke="#6366f1" strokeWidth={2} dot={false} />
                       </LineChart>
                     </ResponsiveContainer>
                   </div>
                   <div className="flex justify-center gap-6 mt-4 text-sm">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-600 rounded-full"></div> PEF (L/min)</div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div> SpO2 (%)</div>
                   </div>
                 </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;