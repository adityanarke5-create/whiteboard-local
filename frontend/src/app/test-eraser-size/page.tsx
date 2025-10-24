'use client';

import { useState, useRef } from 'react';
import Toolbar from '@/components/Toolbar';
import Whiteboard, { WhiteboardHandle } from '@/components/Whiteboard';

export default function TestEraserSize() {
  const [activeTool, setActiveTool] = useState('select');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const whiteboardRef = useRef<WhiteboardHandle>(null);
  const [boardId] = useState('test-board-id');
  const [userId] = useState('test-user-id');

  const handleToolChange = (tool: string) => {
    console.log('Tool changed to:', tool);
    setActiveTool(tool);
  };

  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
  };

  const handleClear = () => {
    console.log('Clearing canvas');
    if (whiteboardRef.current && confirm('Are you sure you want to clear the entire canvas?')) {
      whiteboardRef.current.clearCanvas();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 p-4">
        <h1 className="text-xl font-semibold text-gray-800">Eraser Tool Size Test</h1>
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
      
      {/* Instructions */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-medium text-yellow-800">Testing Instructions</h2>
          <ul className="list-disc pl-5 mt-2 text-yellow-700">
            <li>Select the eraser tool from the toolbar</li>
            <li>Adjust the eraser size using the size slider</li>
            <li>Draw some shapes on the canvas using other tools</li>
            <li>Use the eraser to remove parts of the shapes</li>
            <li>Verify that no errors occur when adjusting the eraser size</li>
          </ul>
        </div>
      </div>
      
      {/* Main content - Whiteboard */}
      <main className="flex-1 overflow-hidden relative">
        <Whiteboard 
          ref={whiteboardRef} 
          boardId={boardId} 
          userId={userId}
          activeTool={activeTool}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </main>
    </div>
  );
}