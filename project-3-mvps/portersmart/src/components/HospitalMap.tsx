import React from 'react';
import { motion } from 'framer-motion';
import { Node, Porter, HOSPITAL_NODES } from '../engine/LogisticsEngine';
import { MapPin, User, Activity } from 'lucide-react';

interface HospitalMapProps {
    porters: Porter[];
    nodes: Node[];
}

const HospitalMap: React.FC<HospitalMapProps> = ({ porters, nodes }) => {
    return (
        <div className="relative w-full aspect-square bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-inner">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-slate-300"></div>
                ))}
            </div>

            {/* Nodes */}
            {nodes.map(node => (
                <div
                    key={node.id}
                    className="absolute flex flex-col items-center justify-center w-12 h-12 -ml-6 -mt-6"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div className={`p-2 rounded-lg shadow-md border ${node.type === 'er' ? 'bg-red-50 border-red-200 text-red-600' :
                            node.type === 'ward' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                                'bg-white border-slate-200 text-slate-500'
                        }`}>
                        <MapPin size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 mt-1 bg-white/80 px-1 rounded">{node.label}</span>
                </div>
            ))}

            {/* Porters */}
            {porters.map(porter => (
                <motion.div
                    key={porter.id}
                    className="absolute z-20"
                    initial={false}
                    animate={{ left: `${porter.currentLocation.x}%`, top: `${porter.currentLocation.y}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                >
                    <div className={`flex items-center justify-center -ml-3 -mt-3 w-6 h-6 rounded-full border-2 shadow-lg ${porter.status === 'busy' ? 'bg-indigo-600 border-indigo-200 text-white' : 'bg-slate-400 border-slate-200 text-white'
                        }`}>
                        <User size={12} />
                    </div>
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-900 bg-white/90 px-1 rounded shadow-sm whitespace-nowrap">
                        {porter.name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default HospitalMap;
