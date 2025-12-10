import { Play, HelpCircle, Flag } from 'lucide-react';

function Sidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/label', label);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-display font-bold text-slate-900">Node Toolkit</h2>
                <p className="text-xs text-slate-500">Drag nodes to canvas</p>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Triggers</h3>
                    <div
                        className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg cursor-grab hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3"
                        onDragStart={(event) => onDragStart(event, 'startNode', 'Triage Start')}
                        draggable
                    >
                        <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Play className="w-4 h-4 fill-current" />
                        </div>
                        <div className="text-sm font-semibold text-emerald-900">Start Point</div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Logic</h3>
                    <div
                        className="p-3 bg-blue-50 border border-blue-100 rounded-lg cursor-grab hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3"
                        onDragStart={(event) => onDragStart(event, 'questionNode', 'Check Rule')}
                        draggable
                    >
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                            <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-blue-900">Decision</div>
                            <div className="text-[10px] text-blue-700">Yes/No Branch</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Endpoints</h3>
                    <div
                        className="p-3 bg-orange-50 border border-orange-100 rounded-lg cursor-grab hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3"
                        onDragStart={(event) => onDragStart(event, 'outcomeNode', 'Outcome')}
                        draggable
                    >
                        <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600">
                            <Flag className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-semibold text-orange-900">Outcome</div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-center">
                CareFlow v1.0 • ReactFlow
            </div>
        </aside>
    );
}

export default Sidebar;
