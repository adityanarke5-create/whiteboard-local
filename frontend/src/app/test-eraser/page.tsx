'use client';

import { useState, useRef, useEffect } from 'react';
import Toolbar from '@/components/Toolbar';
import Whiteboard, { WhiteboardHandle } from '@/components/Whiteboard';

export default function TestEraser() {
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
    if (whiteboardRef.current) {
      const data = whiteboardRef.current.exportAs(format);
      if (data) {
        // Create download link
        const link = document.createElement('a');
        link.href = data;
        link.download = `test-board.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
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
        <h1 className="text-xl font-semibold text-gray-800">Eraser Tool Test</h1>
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
            <li>Draw some shapes on the canvas using other tools</li>
            <li>Use the eraser to remove parts of the shapes</li>
            <li>Try selecting objects and pressing Delete/Backspace to remove them</li>
            <li>Try Shift+Click on objects to delete them directly</li>
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