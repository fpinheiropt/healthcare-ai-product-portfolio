import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DialogueLine } from '../data/mock-consultation';
import clsx from 'clsx';
import { User, Stethoscope } from 'lucide-react';

interface LiveTranscriptProps {
    script: DialogueLine[];
    currentTime: number;
}

export default function LiveTranscript({ script, currentTime }: LiveTranscriptProps) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const visibleLines = script.filter(line => line.delay <= currentTime);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleLines.length]);

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner h-[400px]">
            <AnimatePresence>
                {visibleLines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={clsx(
                            "flex gap-4 max-w-[85%]",
                            line.speaker === 'Doctor' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                            line.speaker === 'Doctor' ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
                        )}>
                            {line.speaker === 'Doctor' ? <Stethoscope className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        <div className={clsx(
                            "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                            line.speaker === 'Doctor'
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                        )}>
                            <p className="font-bold text-xs opacity-70 mb-1 uppercase tracking-wider">{line.speaker}</p>
                            {line.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div ref={bottomRef} />
        </div>
    );
}
