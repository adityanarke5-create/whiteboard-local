'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import Toolbar from '@/components/Toolbar';
import Whiteboard from '@/components/Whiteboard';
import SharingModal from '@/components/SharingModal';

export default function TestFeatures() {
  const { user, isAuthenticated, loading, signIn, signOut } = useAuth();
  const [activeTool, setActiveTool] = useState('select');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const whiteboardRef = useRef<any>(null);
  const [boardId] = useState('test-board-id');
  const [userId] = useState('test-user-id');

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
  };

  const handleShare = () => {
    setIsSharingModalOpen(true);
  };

  const handleCollaboratorsChange = () => {
    console.log('Collaborators changed');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Test Features</h1>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('test@example.com', 'password')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              >
                Sign In
              </button>
            )}
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm"
            >
              Share
            </button>
          </div>
        </div>
      </header>

      <div className="shrink-0">
        <Toolbar
          activeTool={activeTool}
          onToolChange={handleToolChange}
          strokeColor={strokeColor}
          onColorChange={setStrokeColor}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={setStrokeWidth}
          onExport={(format) => console.log('Export:', format)}
          onClear={() => whiteboardRef.current?.clearCanvas()}
          onZoomIn={() => whiteboardRef.current?.zoomIn()}
          onZoomOut={() => whiteboardRef.current?.zoomOut()}
          onResetZoom={() => whiteboardRef.current?.resetZoom()}
        />
      </div>

      <main className="flex-1 overflow-hidden">
        <Whiteboard
          ref={whiteboardRef}
          boardId={boardId}
          userId={userId}
          activeTool={activeTool}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </main>

      <SharingModal
        boardId={boardId}
        isOpen={isSharingModalOpen}
        onClose={() => setIsSharingModalOpen(false)}
        onCollaboratorsChange={handleCollaboratorsChange}
      />
    </div>
  );
}