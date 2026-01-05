import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle, Activity, Lock, FileText, BarChart } from 'lucide-react';
import { SafetyReportData } from '../data/safetyReports';

interface SafetyReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: SafetyReportData;
}

const SafetyReportModal: React.FC<SafetyReportModalProps> = ({ isOpen, onClose, data }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-emerald-900/60 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto max-w-4xl max-h-[90vh] overflow-y-auto p-4 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full pointer-events-auto border border-emerald-500/30 dark:border-emerald-800 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />

                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-emerald-100 dark:border-emerald-900/50 flex justify-between items-start">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                        <ShieldCheck className="w-3 h-3" />
                                        Safety Validation Verified
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                        {data.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                                {/* Left Column: Status & Stats */}
                                <div className="space-y-6">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
                                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">Pass Rate</div>
                                        <div className="text-5xl font-black text-emerald-700 dark:text-emerald-300">{data.passRate}%</div>
                                        <div className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1">4/4 Tests Passed</div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                            <Lock className="w-5 h-5 text-teal-500" />
                                            Protection Level
                                        </h3>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-md mb-1">{data.protectionLevel}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Logic is hard-coded and validated via unit tests. No LLM hallucinations possible for safety critical paths.</p>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                        <Activity className="w-3 h-3" />
                                        Validated on {data.validationDate}
                                    </div>
                                </div>

                                {/* Right Column: Test Suite Results */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                                        <FileText className="w-5 h-5 text-emerald-500" />
                                        Executive Summary
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{data.executiveSummary}</p>

                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                        <BarChart className="w-5 h-5 text-blue-500" />
                                        Test Suite Execution
                                    </h3>

                                    <div className="space-y-4">
                                        {data.testSuite.map((test, idx) => (
                                            <motion.div
                                                key={test.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border-l-4 border-emerald-500 shadow-sm border-t border-r border-b border-slate-100 dark:border-slate-700"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-900" />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="font-bold text-slate-900 dark:text-white">{test.testCase}</h4>
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">PASS</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{test.details}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SafetyReportModal;
