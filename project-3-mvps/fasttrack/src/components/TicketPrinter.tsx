import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface TicketPrinterProps {
    data: {
        patient: any;
        symptom: string;
        category: 'red' | 'yellow' | 'green';
    };
    onFinish: () => void;
}

export default function TicketPrinter({ data, onFinish }: TicketPrinterProps) {
    const [printing, setPrinting] = useState(true);

    useEffect(() => {
        // Simulate printing delay/animation
        const timer = setTimeout(() => setPrinting(false), 2000);

        // Auto-finish after 8 seconds
        const resetTimer = setTimeout(onFinish, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(resetTimer);
        };
    }, [onFinish]);

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-white">
            {printing ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="bg-white p-4 rounded shadow-sm border border-slate-200"
                        >
                            <div className="w-12 h-1 bg-slate-300 rounded mb-2"></div>
                            <div className="w-8 h-1 bg-slate-200 rounded"></div>
                        </motion.div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Generating Ticket...</h2>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                        <div className={clsx(
                            "px-8 py-6 text-white flex justify-between items-center",
                            data.category === 'red' ? "bg-red-600" :
                                data.category === 'yellow' ? "bg-orange-500" : "bg-emerald-600"
                        )}>
                            <div>
                                <p className="text-sm font-medium opacity-90">PRIORITY LEVEL</p>
                                <h3 className="text-3xl font-black uppercase tracking-wider">
                                    {data.category === 'red' ? 'URGENT' :
                                        data.category === 'yellow' ? 'STANDARD' : 'FAST TRACK'}
                                </h3>
                            </div>
                            <CheckCircle className="w-10 h-10 text-white/90" />
                        </div>

                        <div className="p-8 bg-white relative">
                            {/* Ticket Cutout Effect */}
                            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full border-r-2 border-slate-200"></div>
                            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full border-l-2 border-slate-200"></div>
                            <div className="absolute left-4 right-4 top-1/2 border-t-2 border-dashed border-slate-100"></div>

                            <div className="mb-8">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Patient</p>
                                <p className="text-2xl font-bold text-slate-900">{data.patient.name}</p>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Waiting Zone</p>
                                    <p className="text-4xl font-black text-slate-800">
                                        {data.category === 'green' ? 'C-04' : 'A-12'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Queue</p>
                                    <p className="text-4xl font-black text-slate-800">#842</p>
                                </div>
                            </div>

                            <div className="flex justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <QRCodeSVG value={`TICKET-${data.patient.id}-${Date.now()}`} size={160} />
                            </div>

                            <p className="text-center text-slate-400 text-sm mt-4">Scan at Zone Entrance</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex justify-center"
                    >
                        <button onClick={onFinish} className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
                            Start New Check-in <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
