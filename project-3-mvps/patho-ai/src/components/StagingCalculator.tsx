import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { OncologyStagingEngine, TNM_OPTIONS, type TNMValue, type StagingResult } from '../engine/OncologyStagingEngine';

export const StagingCalculator: React.FC = () => {
    const [t, setT] = useState<TNMValue>('T1');
    const [n, setN] = useState<TNMValue>('N0');
    const [m, setM] = useState<TNMValue>('M0');
    const [result, setResult] = useState<StagingResult | null>(null);

    useEffect(() => {
        const stage = OncologyStagingEngine.calculateStage(t, n, m);
        setResult(stage);
    }, [t, n, m]);

    return (
        <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Input Column */}
            <div className="space-y-8 overflow-y-auto pr-2">

                {/* T Selector */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 text-blue-600 font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl">T</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Tumor Size & Extent</h3>
                            <p className="text-xs text-slate-500">Primary Tumor (T)</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {TNM_OPTIONS.T.map((opt) => (
                            <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${t === opt.value ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                                <input
                                    type="radio"
                                    name="t-stage"
                                    value={opt.value}
                                    checked={t === opt.value}
                                    onChange={() => setT(opt.value)}
                                    className="mt-1"
                                />
                                <span className={`text-sm ${t === opt.value ? 'text-blue-900 font-medium' : 'text-slate-600'}`}>
                                    {opt.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* N Selector */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-indigo-100 text-indigo-600 font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl">N</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Node Involvement</h3>
                            <p className="text-xs text-slate-500">Regional Lymph Nodes (N)</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {TNM_OPTIONS.N.map((opt) => (
                            <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${n === opt.value ? 'bg-indigo-50 border-indigo-500 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                                <input
                                    type="radio"
                                    name="n-stage"
                                    value={opt.value}
                                    checked={n === opt.value}
                                    onChange={() => setN(opt.value)}
                                    className="mt-1"
                                />
                                <span className={`text-sm ${n === opt.value ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                                    {opt.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* M Selector */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 text-purple-600 font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl">M</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Metastasis</h3>
                            <p className="text-xs text-slate-500">Distant Metastasis (M)</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {TNM_OPTIONS.M.map((opt) => (
                            <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${m === opt.value ? 'bg-purple-50 border-purple-500 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                                <input
                                    type="radio"
                                    name="m-stage"
                                    value={opt.value}
                                    checked={m === opt.value}
                                    onChange={() => setM(opt.value)}
                                    className="mt-1"
                                />
                                <span className={`text-sm ${m === opt.value ? 'text-purple-900 font-medium' : 'text-slate-600'}`}>
                                    {opt.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>
            </div>

            {/* Results Column */}
            <div className="relative">
                <div className="sticky top-6">
                    <AnimatePresence mode="wait">
                        {result && (
                            <motion.div
                                key={result.stage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
                            >
                                {/* Header */}
                                <div className={`p-8 text-center border-b ${result.color.replace('bg-', 'bg-opacity-20 ')}`}>
                                    <h2 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Calculated Clinical Stage</h2>
                                    <div className="text-6xl font-display font-bold text-slate-900 mb-4">{result.stage}</div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${result.color}`}>
                                        <Info size={14} />
                                        {result.description}
                                    </div>
                                </div>

                                {/* Guidelines */}
                                <div className="p-8 bg-slate-50">
                                    <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                                        <FileText className="text-blue-500" size={20} />
                                        Standard Treatment Options
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.treatment.map((tx, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                                <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                                                <span className="text-slate-700 text-sm">{tx}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                        <AlertCircle className="text-yellow-600 shrink-0" size={20} />
                                        <p className="text-xs text-yellow-800">
                                            <strong>Clinical Decision Support:</strong> This tool is for educational purposes only. Final staging requires full pathology report and multidisciplinary review.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
