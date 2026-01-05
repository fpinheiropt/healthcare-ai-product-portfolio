import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, UserCheck } from 'lucide-react';

interface IDScannerProps {
    onScan: (patientData: any) => void;
}

export default function IDScanner({ onScan }: IDScannerProps) {
    const [scanning, setScanning] = useState(false);

    const handleSimulatedScan = () => {
        setScanning(true);
        setTimeout(() => {
            onScan({
                name: "Maria Silva",
                age: 74,
                id: "12345678"
            });
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Identification</h2>
            <p className="text-xl text-slate-500 mb-16 text-center max-w-lg">
                Please place your National ID Card or SNS Card on the reader below.
            </p>

            <motion.div
                onClick={handleSimulatedScan}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full max-w-md aspect-[1.58] bg-white rounded-2xl shadow-xl border-2 border-slate-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer group"
            >
                {!scanning ? (
                    <>
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                            <Scan className="w-10 h-10 text-blue-600" />
                        </div>
                        <p className="text-lg font-medium text-slate-600">Tap to Simulate Scan</p>
                        <p className="text-sm text-slate-400 mt-2">National ID / SNS Card</p>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
                        />
                        <p className="text-lg font-semibold text-blue-600">Reading Chip...</p>
                    </motion.div>
                )}

                {/* Scan Beam Effect */}
                {scanning && (
                    <motion.div
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
                    />
                )}
            </motion.div>

            <div className="mt-12 flex gap-4">
                <button className="text-slate-400 font-medium hover:text-slate-600 transition-colors">
                    I don't have my card
                </button>
            </div>
        </div>
    );
}
