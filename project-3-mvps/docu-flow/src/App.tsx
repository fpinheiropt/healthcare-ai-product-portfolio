import { useState } from 'react';
import { NoteBuilder } from './components/NoteBuilder';
import { NotePreview } from './components/NotePreview';
import { INITIAL_NOTE_STATE } from './logic/TemplateEngine';
import type { NoteState } from './logic/TemplateEngine';
import { FileText } from 'lucide-react';

function App() {
  const [noteState, setNoteState] = useState<NoteState>(INITIAL_NOTE_STATE);
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpdate = (updates: Partial<NoteState>) => {
    setNoteState(prev => ({ ...prev, ...updates }));
  };

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsDragging(true);

    const startX = mouseDownEvent.clientX;
    const startWidth = sidebarWidth;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
      // Clamp width between 300px and 800px
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    };

    const stopDrag = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto'; // Re-enable selection
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">

      {/* Sidebar / Builder Area */}
      <div
        style={{ width: sidebarWidth }}
        className="flex flex-col border-r border-slate-200 bg-white flex-shrink-0"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-2 shadow-sm z-10">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">DocuFlow</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Clinical Discovery Engine</p>
          </div>
        </div>

        {/* Builder Component */}
        <NoteBuilder state={noteState} onChange={handleUpdate} />
      </div>

      {/* Drag Handle */}
      <div
        className={`w-1 cursor-col-resize hover:bg-indigo-500 transition-colors z-50 flex-shrink-0 ${isDragging ? 'bg-indigo-600' : 'bg-transparent'}`}
        onMouseDown={startResizing}
      />

      {/* Main Content / Preview Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-[400px]">
        <NotePreview state={noteState} />
      </div>

    </div>
  );
}
export default App;
