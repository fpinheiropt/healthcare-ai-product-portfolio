import { Handle, Position } from 'reactflow';
import { Flag } from 'lucide-react';
import clsx from 'clsx';

function OutcomeNode({ data }: { data: { label: string, color?: string } }) {
    // Default to orange if no color
    const color = data.color || 'orange';

    const colors = {
        red: 'border-red-500 bg-red-50 text-red-900',
        orange: 'border-orange-500 bg-orange-50 text-orange-900',
        green: 'border-green-500 bg-green-50 text-green-900',
    };

    return (
        <div className={clsx(
            "w-[200px] shadow-xl rounded-xl border-2 bg-white",
            color === 'red' ? 'border-red-500' : color === 'green' ? 'border-green-500' : 'border-orange-500',
            "flex flex-col overflow-hidden transition-all"
        )}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-400" />

            <div className={clsx("p-3 border-b flex items-center gap-2",
                color === 'red' ? 'bg-red-50 border-red-100' : color === 'green' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'
            )}>
                <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center bg-white/50")}>
                    <Flag className={clsx("w-5 h-5",
                        color === 'red' ? 'text-red-600' : color === 'green' ? 'text-green-600' : 'text-orange-600'
                    )} />
                </div>
                <span className={clsx("font-bold font-display",
                    color === 'red' ? 'text-red-900' : color === 'green' ? 'text-green-900' : 'text-orange-900'
                )}>Final Outcome</span>
            </div>

            <div className="p-4 bg-white">
                <select
                    className="w-full text-sm font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded border border-slate-200 focus:outline-none"
                    defaultValue={data.label}
                >
                    <option>Call 911 (Emergent)</option>
                    <option>Go to ER (Urgent)</option>
                    <option>Urgent Care (Semi-Urgent)</option>
                    <option>Home Care (Non-Urgent)</option>
                </select>
            </div>
        </div>
    );
}

export default OutcomeNode;
