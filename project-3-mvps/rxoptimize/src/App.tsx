import { useState } from 'react';
import { Pill, ShieldAlert } from 'lucide-react';
import { MedicationInput } from './components/MedicationInput';
import { InteractionMonitor } from './components/InteractionMonitor';

function App() {
  const [activeDrugs, setActiveDrugs] = useState<string[]>(['warfarin', 'lisinopril']); // Pre-load with common meds

  const addDrug = (id: string) => {
    if (!activeDrugs.includes(id)) {
      setActiveDrugs([...activeDrugs, id]);
    }
  };

  const removeDrug = (id: string) => {
    setActiveDrugs(activeDrugs.filter(d => d !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 lg:p-8">
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/20">
            <Pill className="text-white" size={28} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900">RxOptimize</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Pharmacist Agent</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-xs font-bold text-slate-400">
          <ShieldAlert size={14} className="text-blue-500" />
          CLINICAL DECISION SUPPORT
        </div>
      </header>

      {/* Main Grid */}
      <main className="w-full max-w-6xl flex-1 grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        <MedicationInput
          activeDrugs={activeDrugs}
          onAdd={addDrug}
          onRemove={removeDrug}
        />
        <InteractionMonitor activeDrugs={activeDrugs} />
      </main>
    </div>
  );
}

export default App;
