import { motion } from 'framer-motion';

export const PregnancyTimeline: React.FC = () => {
    // Mock week: 28 (Third Trimester Start)
    const currentWeek = 28;
    const totalWeeks = 40;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-pink-600">Week {currentWeek}</h2>
                    <p className="text-slate-400 text-sm">Third Trimester</p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Baby Size</div>
                    <div className="text-slate-700 font-medium">🍆 Eggplant</div>
                </div>
            </div>

            {/* Timeline Bar */}
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentWeek / totalWeeks) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                />
            </div>

            {/* Milestones */}
            <div className="flex justify-between mt-2 text-xs text-slate-300 font-medium px-1">
                <span>Week 1</span>
                <span className="text-pink-400">Week 28 (Today)</span>
                <span>Week 40</span>
            </div>
        </div>
    );
};
