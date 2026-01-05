import { useState, useEffect } from 'react';
import { Mic, StopCircle, Sparkles, RefreshCw } from 'lucide-react';
import AudioVisualizer from './components/AudioVisualizer';
import LiveTranscript from './components/LiveTranscript';
import NoteEditor from './components/NoteEditor';
import { CONSULTATION_SCRIPT, GENERATED_SOAP, MAX_SCRIPT_DURATION } from './data/mock-consultation';
import { motion } from 'framer-motion';

type AppState = 'idle' | 'recording' | 'processing' | 'completed';

function App() {
  const [status, setStatus] = useState<AppState>('idle');
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (status === 'recording') {
      interval = setInterval(() => {
        setTime(t => {
          if (t >= MAX_SCRIPT_DURATION) {
            setStatus('processing');
            return t;
          }
          return t + 100;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === 'processing') {
      // Simulate AI latency
      const timer = setTimeout(() => {
        setStatus('completed');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleReset = () => {
    setStatus('idle');
    setTime(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900">

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">CliniScript</h1>
            <p className="text-sm text-slate-500">Ambient Clinical Intelligence</p>
          </div>
        </div>

        {status === 'completed' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" /> Start New Consult
          </button>
        )}
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left Panel: Record & Transcript */}
        <div className="space-y-6">
          {/* Control Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center min-h-[200px]">
            {status === 'idle' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatus('recording')}
                className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-colors group"
              >
                <Mic className="w-10 h-10 text-white" />
              </motion.button>
            )}

            {status === 'recording' && (
              <div className="space-y-4">
                <AudioVisualizer isActive={true} />
                <button
                  onClick={() => setStatus('processing')}
                  className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-100 transition-colors flex items-center gap-2 mx-auto"
                >
                  <StopCircle className="w-4 h-4" /> Stop & Generate
                </button>
              </div>
            )}

            {status === 'processing' && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-purple-600 font-bold animate-pulse">Analyzing conversation...</p>
              </div>
            )}

            {status === 'completed' && (
              <div className="flex flex-col items-center gap-2 text-emerald-600">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Note Generated</h3>
                <p className="text-sm text-slate-500">Review the SOAP note on the right.</p>
              </div>
            )}

            <div className="mt-6 text-sm font-medium text-slate-400">
              {status === 'idle' ? 'Tap mic to start simulation' : `${(time / 1000).toFixed(1)}s elapsed`}
            </div>
          </div>

          {/* Transcript Area */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 p-2 bg-slate-100/90 backdrop-blur-sm z-10 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider rounded-t-xl">
              <span>Live Transcript</span>
            </div>
            <LiveTranscript script={CONSULTATION_SCRIPT} currentTime={time} />
          </div>
        </div>

        {/* Right Panel: Note Editor */}
        <div className="h-full min-h-[600px]">
          {status === 'completed' ? (
            <NoteEditor soap={GENERATED_SOAP} />
          ) : (
            <div className="h-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 p-12 text-center">
              <div>
                <FileTextSkeleton />
                <p className="mt-4 font-medium">SOAP note will appear here</p>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

function FileTextSkeleton() {
  return (
    <div className="w-24 h-32 border-2 border-slate-300 rounded-lg mx-auto p-4 space-y-3 opacity-50">
      <div className="h-2 bg-slate-300 rounded w-1/2"></div>
      <div className="h-2 bg-slate-300 rounded w-full"></div>
      <div className="h-2 bg-slate-300 rounded w-3/4"></div>
      <div className="h-2 bg-slate-300 rounded w-full"></div>
      <div className="h-2 bg-slate-300 rounded w-full"></div>
    </div>
  );
}

export default App;
