import { ReactFlowProvider } from 'reactflow';
import Sidebar from './components/Sidebar';
import FlowCanvas from './components/FlowCanvas';

function App() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
            <Sidebar />
            <ReactFlowProvider>
                <FlowCanvas />
            </ReactFlowProvider>
        </div>
    );
}

export default App;
