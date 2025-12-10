import { Handle, Position } from 'reactflow';
import { HelpCircle } from 'lucide-react';
import clsx from 'clsx';

function QuestionNode({ data }: { data: { label: string } }) {
    return (
        <div className={clsx(
            "w-[240px] shadow-xl rounded-xl border-2 border-blue-500 bg-white",
            "flex flex-col overflow-hidden transition-all hover:ring-4 ring-blue-500/10"
        )}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />

            <div className="bg-blue-50 p-3 border-b border-blue-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-bold text-blue-900 font-display">Clinical Decision</span>
            </div>

            <div className="p-4 bg-white">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Rule to Check</label>
                <input
                    className="w-full text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Fever > 38C?"
                    defaultValue={data.label}
                />
            </div>

            <div className="bg-slate-50 p-2 flex justify-between px-6 border-t border-slate-100">
                <div className="relative">
                    <span className="text-xs font-bold text-emerald-600 block mb-1 text-center">YES</span>
                    <Handle type="source" position={Position.Bottom} id="yes" className="w-3 h-3 bg-emerald-500 !relative !transform-none !left-0" style={{ left: '0.2rem' }} />
                </div>
                <div className="relative">
                    <span className="text-xs font-bold text-red-600 block mb-1 text-center">NO</span>
                    <Handle type="source" position={Position.Bottom} id="no" className="w-3 h-3 bg-red-500 !relative !transform-none !left-0" style={{ left: 0 }} />
                </div>
            </div>
        </div>
    );
}

export default QuestionNode;
