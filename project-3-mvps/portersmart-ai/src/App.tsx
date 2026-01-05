import DispatchDashboard from './components/DispatchDashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">PorterSmart <span className="text-indigo-600">AI</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">System Status: <span className="text-emerald-500">Online</span></span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Francisco" alt="User" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <DispatchDashboard />
      </main>
    </div>
  );
}

export default App;
