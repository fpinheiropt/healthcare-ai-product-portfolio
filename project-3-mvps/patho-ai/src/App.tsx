import { useState } from 'react';
import { Microscope, Dna, Activity } from 'lucide-react';
import { StagingCalculator } from './components/StagingCalculator';

function App() {
  const [activeCancerType, setActiveCancerType] = useState('breast');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Microscope size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">Patho-AI</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Oncology Decision Support</p>
            </div>
          </div>

          <div className="flex bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveCancerType('breast')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeCancerType === 'breast' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Breast Cancer
            </button>
            <button
              onClick={() => setActiveCancerType('lung')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeCancerType === 'lung' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Lung Cancer (Coming Soon)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Dna className="text-blue-500" />
            TNM Staging Calculator: {activeCancerType === 'breast' ? 'Invasive Breast Carcinoma' : 'Lung Carcinoma'}
          </h2>
          <p className="text-slate-500 mt-2">
            Select T, N, and M values below based on clinical and pathological findings to determine the prognostic stage group (AJCC 8th Edition).
          </p>
        </div>

        {activeCancerType === 'breast' ? (
          <StagingCalculator />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <Activity className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-700">Module Under Development</h3>
            <p className="text-slate-500">The Lung Cancer staging algorithm is currently being validated.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
