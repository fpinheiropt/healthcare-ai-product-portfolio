import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Database, Server, Smartphone, Layers } from 'lucide-react';
import { ArchitectureData } from '../data/architecture';

interface ArchitectureModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ArchitectureData;
}

const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose, data }) => {
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
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto max-w-4xl max-h-[90vh] overflow-y-auto p-6 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full pointer-events-auto border border-white/20 dark:border-slate-800 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                        <Code className="w-3 h-3" />
                                        System Architecture
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
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
                                {/* Left Column: Tech Stack */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-teal-500" />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.techStack.map((tech) => (
                                            <span
                                                key={tech.name}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${tech.category === 'frontend' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' :
                                                    tech.category === 'backend' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' :
                                                        tech.category === 'ai' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' :
                                                            'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                                    }`}
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                            <Database className="w-5 h-5 text-blue-500" />
                                            Key Decisions
                                        </h3>
                                        <div className="space-y-4">
                                            {data.keyDecisions.map((decision, idx) => (
                                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{decision.title}</h4>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{decision.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Data Flow Diagram */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                                        <Server className="w-5 h-5 text-purple-500" />
                                        Data Flow Pipeline
                                    </h3>

                                    <div className="relative">
                                        {/* Connector Line */}
                                        <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500 rounded-full opacity-20"></div>

                                        <div className="space-y-8">
                                            {data.dataFlow.map((step, idx) => {
                                                const StepIcon = step.icon || Layers;
                                                return (
                                                    <motion.div
                                                        key={step.step}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="relative flex items-start gap-6 group"
                                                    >
                                                        {/* Step Number/Icon */}
                                                        <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                            <div className={`absolute inset-0 bg-gradient-to-br ${idx === 0 ? 'from-teal-500/10 to-teal-600/10' : idx === 1 ? 'from-blue-500/10 to-blue-600/10' : idx === 2 ? 'from-indigo-500/10 to-indigo-600/10' : 'from-purple-500/10 to-purple-600/10'} rounded-2xl`}></div>
                                                            <StepIcon className={`w-8 h-8 ${idx === 0 ? 'text-teal-600 dark:text-teal-400' : idx === 1 ? 'text-blue-600 dark:text-blue-400' : idx === 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-purple-600 dark:text-purple-400'}`} />
                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">{step.step}</div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="pt-2">
                                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{step.label}</h4>
                                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
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

export default ArchitectureModal;
