import { Leaf, BarChart3, Wind } from 'lucide-react';
import { WasteTracker } from './components/WasteTracker';
import { EnergyMonitor } from './components/EnergyMonitor';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 lg:p-8 font-sans text-slate-900">

      {/* Header */}
      <header className="max-w-6xl w-full mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg shadow-emerald-500/20 text-white">
            <Leaf size={28} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight text-slate-900">EcoWard AI</h1>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Sustainability Agent</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <Wind size={16} className="text-slate-400" />
            <span>AQI: <span className="text-emerald-600 font-bold">24 (Good)</span></span>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-slate-400" />
            <span>Goal: Net Zero 2030</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-6 items-start">
        <section>
          <WasteTracker />
        </section>
        <section>
          <EnergyMonitor />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400 uppercase font-bold tracking-widest">
        Sword Intelligence • Sustainability Module • v1.0
      </footer>

    </div>
  );
}

export default App;
