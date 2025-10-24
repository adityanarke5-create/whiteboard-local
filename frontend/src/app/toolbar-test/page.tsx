'use client';

import { useState, useRef } from 'react';
import Toolbar from '@/components/Toolbar';
import Whiteboard, { WhiteboardHandle } from '@/components/Whiteboard';

export default function ToolbarTest() {
  const [activeTool, setActiveTool] = useState('select');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const whiteboardRef = useRef<WhiteboardHandle>(null);

  const handleToolChange = (tool: string) => {
    console.log('Tool changed to:', tool);
    setActiveTool(tool);
  };

  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    if (whiteboardRef.current) {
      const data = whiteboardRef.current.exportAs(format);
      if (data) {
        // Create download link
        const link = document.createElement('a');
        link.href = data;
        link.download = `test.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleClear = () => {
    if (whiteboardRef.current && confirm('Are you sure you want to clear the canvas?')) {
      whiteboardRef.current.clearCanvas();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">Toolbar Test</h1>
        </div>
      </header>
      
      {/* Toolbar */}
      <div className="shrink-0">
        <Toolbar
          activeTool={activeTool}
          onToolChange={handleToolChange}
          strokeColor={strokeColor}
          onColorChange={setStrokeColor}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={setStrokeWidth}
          onExport={handleExport}
          onClear={handleClear}
          onZoomIn={() => whiteboardRef.current?.zoomIn()}
          onZoomOut={() => whiteboardRef.current?.zoomOut()}
          onResetZoom={() => whiteboardRef.current?.resetZoom()}
        />
      </div>
      
      {/* Main content - Whiteboard */}
      <main className="flex-1 overflow-hidden relative">
        <Whiteboard 
          ref={whiteboardRef} 
          boardId="test-board" 
          userId="test-user"
          activeTool={activeTool}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </main>
    </div>
  );
}