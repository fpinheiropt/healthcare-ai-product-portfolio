import { Handle, Position } from 'reactflow';
import { Play } from 'lucide-react';
import clsx from 'clsx';

function StartNode() {
    return (
        <div className={clsx(
            "w-[200px] shadow-xl rounded-xl border-2 border-emerald-500 bg-white",
            "flex flex-col overflow-hidden transition-all hover:ring-4 ring-emerald-500/10"
        )}>
            <div className="bg-emerald-50 p-3 border-b border-emerald-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Play className="w-5 h-5 text-emerald-600 fill-current" />
                </div>
                <span className="font-bold text-emerald-900 font-display">Triage Start</span>
            </div>
            <div className="p-4 bg-white">
                <p className="text-sm text-slate-500">Patient arrives with:</p>
                <div className="mt-2 text-sm font-medium text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                    Main Symptom
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-emerald-500" />
        </div>
    );
}

export default StartNode;
