import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentChat } from './components/AssessmentChat';
import { ClinicalAssessmentEngine, type AssessmentResult } from './engine/ClinicalAssessmentEngine';
import { Activity, ShieldCheck, Phone, RefreshCcw } from 'lucide-react';

function App() {
  const [view, setView] = useState<'intro' | 'chat' | 'result'>('intro');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAssessmentComplete = (answers: number[]) => {
    const assessmentResult = ClinicalAssessmentEngine.calculatePHQ9(answers);
    setResult(assessmentResult);
    setView('result');
  };

  const handleReset = () => {
    setResult(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg h-[800px] max-h-[90vh] relative">

        {/* Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-300/30 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-300/30 rounded-full blur-[80px] animate-pulse delay-1000"></div>

        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 h-full flex flex-col items-center justify-center p-8 text-center relative z-10"
            >
              <div className="bg-gradient-to-br from-teal-400 to-indigo-500 w-24 h-24 rounded-3xl rotate-3 mb-8 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Activity className="text-white w-12 h-12" />
              </div>

              <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">
                MindBridge AI
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                A safe, confidential space to check in on your mental health. Our AI-guided assessment uses clinical protocols to provide immediate insights.
              </p>

              <button
                onClick={() => setView('chat')}
                className="bg-slate-900 text-white text-lg font-bold py-4 px-12 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Start Assessment
              </button>

              <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
                <ShieldCheck size={16} />
                <span>HIPAA Compliant & Private</span>
              </div>
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full relative z-10"
            >
              <AssessmentChat onComplete={handleAssessmentComplete} />
            </motion.div>
          )}

          {view === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 h-full flex flex-col p-8 relative z-10 overflow-y-auto"
            >
              <div className="text-center mb-8">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 ${result.color.replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                  Assessment Complete
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
                  Your Results
                </h2>
                <p className="text-slate-500">Based on PHQ-9 Clinical Protocol</p>
              </div>

              <div className={`p-6 rounded-2xl border-2 mb-8 ${result.color}`}>
                <div className="text-center mb-4">
                  <span className="block text-5xl font-bold mb-1">{result.score}</span>
                  <span className="text-sm font-semibold opacity-80 uppercase tracking-widest">Score / 27</span>
                </div>
                <div className="bg-white/50 rounded-xl p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{result.severity}</h3>
                  <p className="text-sm opacity-90">{result.recommendation}</p>
                </div>
              </div>

              <div className="space-y-4 mb-auto">
                <h3 className="font-bold text-slate-900 text-lg">Next Steps</h3>

                <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 group">
                  <div className="bg-indigo-500 text-white p-3 rounded-lg group-hover:bg-indigo-600 transition-colors">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Find a Therapist</div>
                    <div className="text-sm text-slate-500">Browse providers near you</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors border border-red-100 group">
                  <div className="bg-red-500 text-white p-3 rounded-lg group-hover:bg-red-600 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Crisis Hotline</div>
                    <div className="text-sm text-slate-500">Immediate 24/7 support (988)</div>
                  </div>
                </a>
              </div>

              <button
                onClick={handleReset}
                className="mt-8 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors py-4"
              >
                <RefreshCcw size={16} /> restart assessment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
