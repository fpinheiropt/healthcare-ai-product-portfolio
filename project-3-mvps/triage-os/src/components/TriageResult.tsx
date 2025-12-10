import { AlertTriangle, CheckCircle, Clock, Phone, AlertCircle } from 'lucide-react';
import { getDisposition } from '../engine/TriageEngine';
import type { TriageResult } from '../types';

interface TriageResultCardProps {
    result: TriageResult;
    onReset: () => void;
}

export function TriageResultCard({ result, onReset }: TriageResultCardProps) {
    const disposition = getDisposition(result.level);

    // ESI-1 and ESI-2 are high acuity
    const isCritical = result.level === 'ESI-1' || result.level === 'ESI-2';

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-slide-up">
            <div className={`${disposition.color} p-6 text-white text-center`}>
                <div className="flex justify-center mb-4">
                    {result.level === 'ESI-1' ? (
                        <AlertTriangle className="w-16 h-16 animate-pulse" />
                    ) : result.level === 'ESI-2' ? (
                        <AlertCircle className="w-16 h-16" />
                    ) : (
                        <CheckCircle className="w-16 h-16" />
                    )}
                </div>
                <h2 className="text-3xl font-bold mb-1">{result.level}</h2>
                <p className="font-medium opacity-90 text-sm uppercase tracking-wider">Acuity Level Assessed</p>
            </div>

            <div className="p-8">
                <div className="mb-8 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Recommended Action</h3>
                    <div className="flex items-center justify-center gap-2 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {isCritical ? <Phone className="w-5 h-5 text-red-500" /> : <Clock className="w-5 h-5 text-blue-500" />}
                        <span className="font-semibold">{disposition.text}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-slate-500 text-center leading-relaxed">
                        This is an automated assessment based on clinical protocols. It does not replace professional medical advice.
                    </p>

                    <button
                        onClick={onReset}
                        className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Start New Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}
