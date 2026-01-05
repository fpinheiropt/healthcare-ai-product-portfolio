import { motion } from 'framer-motion';
import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface NoteEditorProps {
    soap: {
        subjective: string;
        objective: string;
        assessment: string;
        plan: string;
    };
}

export default function NoteEditor({ soap }: NoteEditorProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = `S: ${soap.subjective}\nO: ${soap.objective}\nA: ${soap.assessment}\nP: ${soap.plan}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">CliniScript Auto-Note</h3>
                        <p className="text-xs text-slate-500">AI-Generated • Review Required</p>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-purple-600 border border-transparent hover:border-slate-200 hover:shadow-sm"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="p-6 space-y-6 overflow-y-auto flex-1 font-mono text-sm"
            >
                <motion.div variants={item}>
                    <h4 className="text-purple-600 font-bold uppercase tracking-wider mb-2 text-xs">Subjective</h4>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{soap.subjective}</p>
                </motion.div>

                <motion.div variants={item}>
                    <h4 className="text-purple-600 font-bold uppercase tracking-wider mb-2 text-xs">Objective</h4>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{soap.objective}</p>
                </motion.div>

                <motion.div variants={item}>
                    <h4 className="text-purple-600 font-bold uppercase tracking-wider mb-2 text-xs">Assessment</h4>
                    <pre className="text-slate-700 leading-relaxed whitespace-pre-wrap font-inherit bg-slate-50 p-3 rounded-lg border border-slate-100">{soap.assessment}</pre>
                </motion.div>

                <motion.div variants={item}>
                    <h4 className="text-purple-600 font-bold uppercase tracking-wider mb-2 text-xs">Plan</h4>
                    <pre className="text-slate-700 leading-relaxed whitespace-pre-wrap font-inherit bg-slate-50 p-3 rounded-lg border border-slate-100">{soap.plan}</pre>
                </motion.div>

            </motion.div>
        </div>
    );
}
