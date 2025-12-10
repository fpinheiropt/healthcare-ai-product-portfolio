import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
    Connection,
    Edge,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import StartNode from './StartNode';
import QuestionNode from './QuestionNode';
import OutcomeNode from './OutcomeNode';
import { Save } from 'lucide-react';

const nodeTypes = {
    startNode: StartNode,
    questionNode: QuestionNode,
    outcomeNode: OutcomeNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'startNode',
        data: { label: 'Triage Start' },
        position: { x: 250, y: 50 },
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

function FlowCanvas() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({
            ...params,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#64748b', strokeWidth: 2 }
        }, eds)),
        [],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const label = event.dataTransfer.getData('application/label');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: label },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exportData, setExportData] = useState<string>('');

    const onSave = () => {
        const protocol = {
            nodes: nodes,
            edges: edges,
            version: "1.0",
            timestamp: new Date().toISOString()
        };
        setExportData(JSON.stringify(protocol, null, 2));
        setIsModalOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(exportData);
        alert("JSON Copied to Clipboard!");
    };

    return (
        <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={onSave}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                    <Save className="w-4 h-4" />
                    Save Protocol
                </button>
            </div>

            {/* Export Modal */}
            {isModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800">Protocol JSON Export</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">Close</button>
                        </div>
                        <div className="p-0 overflow-auto flex-1 bg-slate-900">
                            <pre className="text-xs text-green-400 font-mono p-4">{exportData}</pre>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Cancel</button>
                            <button onClick={copyToClipboard} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Copy JSON</button>
                        </div>
                    </div>
                </div>
            )}

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-50"
            >
                <Controls className="bg-white border border-slate-200 shadow-lg rounded-lg overflow-hidden text-slate-600" />
                <MiniMap
                    className="border border-slate-200 shadow-xl rounded-lg overflow-hidden"
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'startNode': return '#10b981';
                            case 'questionNode': return '#3b82f6';
                            case 'outcomeNode': return '#f97316';
                            default: return '#eee';
                        }
                    }}
                />
                <Background color="#cbd5e1" gap={16} size={1} />
            </ReactFlow>
        </div>
    );
}

export default function FlowApp() {
    return (
        <ReactFlowProvider>
            <FlowCanvas />
        </ReactFlowProvider>
    );
}
