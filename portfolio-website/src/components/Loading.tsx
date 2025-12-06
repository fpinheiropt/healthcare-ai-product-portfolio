import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <motion.div
                className="w-16 h-16 border-4 border-slate-200 border-t-teal-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default Loading;
