import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface AttractScreenProps {
    onStart: () => void;
}

export default function AttractScreen({ onStart }: AttractScreenProps) {
    return (
        <motion.div
            onClick={onStart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 text-center"
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-12"
            >
                <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Activity className="w-20 h-20 text-white" />
                </div>
            </motion.div>

            <h1 className="text-6xl font-bold tracking-tight mb-6">FastTrack Check-in</h1>
            <p className="text-2xl text-blue-100 font-light max-w-md leading-relaxed mb-16">
                Please touch anywhere on the screen to start your registration.
            </p>

            <div className="animate-bounce">
                <div className="px-8 py-3 rounded-full border-2 border-white/30 text-lg font-medium tracking-wider uppercase">
                    Touch to Start
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </motion.div>
    );
}
