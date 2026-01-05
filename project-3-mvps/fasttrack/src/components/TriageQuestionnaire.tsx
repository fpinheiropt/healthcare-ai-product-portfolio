import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { Flowchart, MTSPriority, PRIORITY_CONFIG } from '../data/mts-protocols';
import clsx from 'clsx';

interface TriageQuestionnaireProps {
    flowchart: Flowchart;
    onComplete: (priority: MTSPriority, discriminator: string) => void;
    onBack?: () => void;
}

export default function TriageQuestionnaire({ flowchart, onComplete, onBack }: TriageQuestionnaireProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const currentDiscriminator = flowchart.discriminators[currentStep];

    const handleAnswer = (answer: boolean) => {
        if (answer) {
            // YES: Priority established
            onComplete(currentDiscriminator.priority, currentDiscriminator.question);
        } else {
            // NO: Move to next discriminator
            if (currentStep < flowchart.discriminators.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                // End of list: Default to BLUE (Non-Urgent)
                onComplete('blue', 'General Standard of Care');
            }
        }
    };

    const progress = ((currentStep) / flowchart.discriminators.length) * 100;
    const currentPriorityConfig = PRIORITY_CONFIG[currentDiscriminator.priority];

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header / Progress */}
            <div className="bg-white px-8 py-6 border-b border-slate-200 shadow-sm z-10">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onBack} className="text-slate-400 hover:text-slate-600 font-medium text-sm uppercase tracking-wider">
                        ← Change Complaint
                    </button>
                    <span className="text-slate-400 font-mono text-sm">
                        Q{currentStep + 1}/{flowchart.discriminators.length}
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">{flowchart.title}</h2>
                <div className="w-full bg-slate-100 h-2 mt-4 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-slate-100 to-transparent opacity-50" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDiscriminator.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-3xl text-center z-10"
                    >
                        {/* Clinical Context Hint */}
                        <div className={clsx(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-sm",
                            currentPriorityConfig.color.includes('red') ? "bg-red-100 text-red-700" :
                                currentPriorityConfig.color.includes('orange') ? "bg-orange-100 text-orange-700" :
                                    "bg-slate-200 text-slate-600"
                        )}>
                            <AlertTriangle className="w-4 h-4" />
                            Ruling out: {currentPriorityConfig.label}
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-16">
                            {currentDiscriminator.question}
                        </h3>

                        <div className="grid grid-cols-2 gap-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(true)}
                                className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:border-red-500 hover:shadow-red-50 hover:bg-red-50 group transition-all"
                            >
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                                    <Check className="w-10 h-10 text-red-600" strokeWidth={3} />
                                </div>
                                <span className="text-3xl font-black text-slate-700 group-hover:text-red-700">YES</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(false)}
                                className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-all shadow-blue-200"
                            >
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <X className="w-10 h-10 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-3xl font-black">NO</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="p-4 text-center text-slate-400 text-sm">
                Manchester Triage System v3.1 | Clinical Decision Support
            </div>
        </div>
    );
}
