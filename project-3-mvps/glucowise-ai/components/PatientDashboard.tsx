import React, { useState, useEffect, useMemo } from 'react';
import AIChatInterface from './AIChatInterface';
import AgentInsight from './AgentInsight';
import RecentActivityLog from './RecentActivityLog';
import SmartBolusCalculator from './SmartBolusCalculator';
import { Plus, Bell, TrendingUp, Activity, Pill, AlertTriangle, Calendar, Droplet, LineChart as ChartIcon, Heart, Utensils, BookOpen, MessageSquare, Check, Info, AlertCircle } from 'lucide-react';
import GlucoseChart from './GlucoseChart';
import FoodLogger from './FoodLogger';
import { GlucoseReading, GlucoseContext, Medication } from '../types';
import { MealPredictor } from './MealPredictor';
import { getGlucoseInsights } from '../services/geminiService';

// Mock Data
const MOCK_READINGS: GlucoseReading[] = Array.from({ length: 20 }, (_, i) => ({
  id: `r-${i}`,
  value: Math.floor(Math.random() * (190 - 85) + 85), // Random between 85 and 190
  timestamp: new Date(Date.now() - (19 - i) * 6 * 60 * 60 * 1000).toISOString(), // Every 6 hours
  context: i % 4 === 0 ? GlucoseContext.FASTING : GlucoseContext.POST_MEAL
}));

// Mock A1C History for the Trend Graph
const MOCK_A1C_HISTORY = [
  { timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), value: 7.8 },
  { timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), value: 7.5 },
  { timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), value: 7.2 },
  { timestamp: new Date().toISOString(), value: 6.9 } // Current projected
];

const MOCK_MEDS: Medication[] = [
  { id: '1', name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', takenToday: true },
  { id: '2', name: 'Lantus (Insulin)', dosage: '20 units', frequency: 'Bedtime', takenToday: false },
];

const PatientDashboard: React.FC = () => {
  const [readings, setReadings] = useState<GlucoseReading[]>(MOCK_READINGS);
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDS);
  const [insight, setInsight] = useState<any>(null);
  const [showAddReading, setShowAddReading] = useState(false);
  const [newReadingValue, setNewReadingValue] = useState('');
  const [chartView, setChartView] = useState<'glucose' | 'a1c'>('glucose');
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'food' | 'learn' | 'chat'>('home');

  // Agent State
  const [prediction, setPrediction] = useState({ peak: 0, carbs: 0 });

  // Fetch AI insights on mount or when readings change
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Only simulate API call for now to avoid immediate key requirement on render if not set
        if (process.env.API_KEY) {
          const result = await getGlucoseInsights(readings, medications);
          setInsight(result);
        } else {
          // Fallback mock insight
          setInsight({
            hypoRiskScore: 15,
            riskLevel: "Low",
            insightTitle: "Stable Trends",
            insightMessage: "Your levels have been consistent. Great job on the post-meal walks.",
            recommendation: "Maintain current medication schedule."
          })
        }
      } catch (e) {
        console.error("Failed to get insights", e);
      }
    };
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readings]);

  // Calculate Estimated A1C based on average glucose
  // Formula: A1C = (eAG + 46.7) / 28.7
  const estimatedA1C = useMemo(() => {
    if (readings.length === 0) return 0;
    const sum = readings.reduce((acc, curr) => acc + curr.value, 0);
    const avg = sum / readings.length;
    return ((avg + 46.7) / 28.7).toFixed(1);
  }, [readings]);

  const addReading = () => {
    if (!newReadingValue) return;
    const reading: GlucoseReading = {
      id: Date.now().toString(),
      value: parseInt(newReadingValue),
      timestamp: new Date().toISOString(),
      context: GlucoseContext.PRE_MEAL, // Default for now
    };
    setReadings([...readings, reading]);
    setNewReadingValue('');
    setShowAddReading(false);
  };

  const toggleMedication = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, takenToday: !med.takenToday } : med
    ));
  };

  const latestReading = readings[readings.length - 1];
  const currentVal = latestReading.value;

  // Status Theme Logic
  let statusTheme = {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    subtext: 'text-emerald-600/80',
    iconBg: 'bg-emerald-100',
    label: 'Normal'
  };

  let a1cColor = 'text-emerald-600';

  if (currentVal > 180) {
    statusTheme = {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      subtext: 'text-amber-600/80',
      iconBg: 'bg-amber-100',
      label: 'High'
    };
    a1cColor = 'text-amber-600';
  } else if (currentVal < 70) {
    statusTheme = {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      subtext: 'text-red-600/80',
      iconBg: 'bg-red-100',
      label: 'Low'
    };
    a1cColor = 'text-red-600';
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white px-6 py-5 shadow-sm flex justify-between items-center sticky top-0 z-10 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hi, John</h2>
          <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button className="bg-red-50 text-red-600 p-2.5 rounded-full hover:bg-red-100 transition-colors shadow-sm border border-red-100">
          <AlertCircle size={22} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {activeTab === 'home' && (
          <main className="p-5 space-y-6">

            {/* Neural Guardian Agent */}
            <AgentInsight
              predictedGlucose={prediction.peak}
              mealCarbs={prediction.carbs}
            />

            {/* Status Card with Gradient - Matching HeartGuide AI */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">Current Glucose</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-bold tracking-tighter">{currentVal}</h3>
                    <span className="text-lg opacity-60 font-medium">mg/dL</span>
                  </div>
                  <p className="text-teal-100 text-xs mt-1">{latestReading.context} • Just now</p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <Droplet className="text-white fill-white" size={28} />
                </div>
              </div>

            </div>

            {/* Glucose Prediction Simulator */}
            <MealPredictor
              currentGlucose={currentVal}
              onPredictionUpdate={(peak, carbs) => setPrediction({ peak, carbs })}
            />

            {/* Smart Bolus Calculator (New Feature) */}
            <SmartBolusCalculator
              currentGlucose={currentVal}
              mealCarbs={prediction.carbs}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowAddReading(true)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:shadow-md"
              >
                <div className="bg-emerald-50 p-3.5 rounded-2xl text-emerald-600">
                  <Plus size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Log Glucose</span>
              </button>
              <button className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:shadow-md">
                <div className="bg-blue-50 p-3.5 rounded-2xl text-blue-600">
                  <Calendar size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Schedule</span>
              </button>
            </div>

            {/* Chart Section */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <button
                  onClick={() => setChartView('glucose')}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${chartView === 'glucose' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  Glucose
                </button>
                <button
                  onClick={() => setChartView('a1c')}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${chartView === 'a1c' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  Est. A1C
                </button>
              </div>
              <GlucoseChart
                readings={chartView === 'glucose' ? readings : MOCK_A1C_HISTORY}
                type={chartView}
              />
            </div>

            {/* Food Logger */}
            <FoodLogger onLog={(data) => console.log("Logged food:", data)} />

            {/* Medication Adherence */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                Medications
              </h3>
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group">
                    <div>
                      <p className="font-semibold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{med.dosage} • {med.frequency}</p>
                    </div>
                    <button
                      onClick={() => toggleMedication(med.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${med.takenToday
                        ? 'bg-blue-500 border-blue-500 text-white scale-105'
                        : 'border-slate-200 text-transparent hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    >
                      <Check className="w-6 h-6" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Banner if Risk is High */}
            {insight && insight.riskLevel === "High" && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 animate-pulse">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-red-800 font-bold text-sm">Action Required</h4>
                  <p className="text-red-600 text-sm mt-1">{insight.recommendation}</p>
                </div>
              </div>
            )}

            {/* Modal for Add Reading */}
            {showAddReading && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl scale-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Log Glucose</h3>
                  <div className="relative mb-8">
                    <input
                      type="number"
                      className="w-full text-5xl font-bold text-center p-4 border-b-2 border-slate-200 focus:border-emerald-500 outline-none bg-transparent text-slate-800 placeholder:text-slate-300"
                      placeholder="---"
                      autoFocus
                      value={newReadingValue}
                      onChange={(e) => setNewReadingValue(e.target.value)}
                    />
                    <span className="absolute bottom-4 right-8 text-slate-400 font-medium">mg/dL</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddReading(false)}
                      className="flex-1 py-3.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addReading}
                      className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                    >
                      Save Reading
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'food' && (
          <div className="p-5 space-y-6">
            <RecentActivityLog />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-5 h-full">
            <AIChatInterface nurseName="Coach Mike" specialty="Diabetes" />
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