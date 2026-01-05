
import { Baby, Shield } from 'lucide-react';
import { RiskGuardian } from './components/RiskGuardian';
import { PregnancyTimeline } from './components/PregnancyTimeline';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 lg:p-8 p-4 flex justify-center">
      <div className="max-w-4xl w-full space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-500 text-white p-2.5 rounded-xl shadow-lg shadow-pink-500/20">
              <Baby size={28} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-slate-900">GestaLink</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Maternal Care Agent</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 text-xs font-bold text-slate-400">
            <Shield size={14} className="text-green-500" />
            HIPAA SECURE AGENT
          </div>
        </header>

        {/* Content */}
        <main>
          <PregnancyTimeline />
          <RiskGuardian />
        </main>
      </div>
    </div>
  );
}

export default App;
