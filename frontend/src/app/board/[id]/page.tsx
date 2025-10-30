'use client';

import { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import EnhancedToolbar from '@/components/EnhancedToolbar';
import Whiteboard, { WhiteboardHandle } from '@/components/WhiteboardFixed';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/auth-context';
import { AuthService } from '@/lib/auth-service';
import EnhancedSharingModal from '@/components/EnhancedSharingModal';

// Backend API base URL - using the dedicated backend server port
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTool, setActiveTool] = useState('select');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const whiteboardRef = useRef<WhiteboardHandle>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  const boardId = unwrappedParams?.id;

  // Listen for tool change events from keyboard shortcuts
  useEffect(() => {
    const handleToolChange = (event: CustomEvent) => {
      // console.log('[BoardPage] Tool change event received:', event.detail);
      setActiveTool(event.detail);
    };

    window.addEventListener('toolChange', handleToolChange as EventListener);
    
    return () => {
      window.removeEventListener('toolChange', handleToolChange as EventListener);
    };
  }, []);

  // Load board data when component mounts
  useEffect(() => {
    // Note: Board data loading is now handled by the WebSocket connection
    // The socket will send the latest board state when the user joins
    // console.log('[BoardPage] Board data loading handled by WebSocket connection');
  }, [boardId]);

  const handleShare = () => {
    setIsSharingModalOpen(true);
  };

  const handleToolChange = (tool: string) => {
    // console.log('[BoardPage] Tool changed:', { tool, previousTool: activeTool });
    setActiveTool(tool);
  };

  const handleExport = async (format: string) => {
    // console.log('[BoardPage] Export initiated:', { format });
    
    if (whiteboardRef.current) {
      const data = whiteboardRef.current.exportAs(format);
      if (data) {
        // console.log('[BoardPage] Export data generated, creating download link');
        // Create download link
        const link = document.createElement('a');
        link.href = data;
        link.download = `board-${boardId}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // console.log('[BoardPage] Export completed');
      } else {
        // console.warn('[BoardPage] No export data generated');
      }
    } else {
      // console.warn('[BoardPage] Whiteboard ref not available for export');
    }
  };

  const handleClear = () => {
    // console.log('[BoardPage] Clear canvas initiated');
    if (whiteboardRef.current && confirm('Are you sure you want to clear the entire canvas?')) {
      whiteboardRef.current.clearCanvas();
      // console.log('[BoardPage] Canvas cleared');
    }
  };

  const handleManualSave = async () => {
    // console.log('[BoardPage] Manual save initiated');
    
    // Validate boardId before proceeding
    if (!boardId) {
      // console.warn('[BoardPage] Cannot save - board ID not available');
      return;
    }
    
    if (!whiteboardRef.current) {
      // console.warn('[BoardPage] Cannot save - whiteboard ref not available');
      return;
    }
    
    setIsAutoSaving(true);
    const boardData = whiteboardRef.current.exportAs('json');
    
    if (boardData) {
      // console.log('[BoardPage] Board data exported for saving');
      
      try {
        const token = await AuthService.getCurrentToken();
        if (!token) {
          // console.error('[BoardPage] No authentication token available for saving');
          setIsAutoSaving(false);
          return;
        }
        
        // console.log('[BoardPage] Sending save request to backend', { boardId });
        const response = await fetch(`${BACKEND_API_BASE_URL}/api/boards/${boardId}/snapshots`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: boardData }),
        });
        
        // console.log('[BoardPage] Save response status:', response.status);
        
        if (response.ok) {
          setLastSaved(new Date());
          // console.log('[BoardPage] Board saved successfully');
        } else {
          const errorText = await response.text();
          // console.error('[BoardPage] Failed to save board:', { 
          //   status: response.status,
          //   statusText: response.statusText,
          //   errorText: errorText
          // });
        }
      } catch (error) {
        // console.error('[BoardPage] Failed to save board:', error);
      }
    } else {
      // console.warn('[BoardPage] No board data to save');
    }
    
    setIsAutoSaving(false);
  };

  // Auto-save functionality
  useEffect(() => {
    // Don't set up auto-save if boardId is not available
    if (!boardId) {
      // console.log('[BoardPage] Board ID not available, skipping auto-save setup');
      return;
    }
    
    // console.log('[BoardPage] Setting up auto-save interval', { boardId });
    
    const autoSaveInterval = setInterval(async () => {
      // console.log('[BoardPage] Auto-save triggered');
      
      // Double-check that boardId is still available
      if (!boardId) {
        // console.log('[BoardPage] Board ID not available during auto-save, skipping');
        return;
      }
      
      if (whiteboardRef.current) {
        setIsAutoSaving(true);
        const boardData = whiteboardRef.current.exportAs('json');
        
        if (boardData) {
          // console.log('[BoardPage] Board data exported for auto-save', { boardId });
          
          try {
            const token = await AuthService.getCurrentToken();
            if (!token) {
              // console.error('[BoardPage] No authentication token available for auto-save');
              setIsAutoSaving(false);
              return;
            }
            
            // console.log('[BoardPage] Sending auto-save request to backend', { boardId });
            const response = await fetch(`${BACKEND_API_BASE_URL}/api/boards/${boardId}/snapshots`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ data: boardData }),
            });
            
            // console.log('[BoardPage] Auto-save response status:', response.status);
            
            if (response.ok) {
              setLastSaved(new Date());
              // console.log('[BoardPage] Board auto-saved successfully');
            } else {
              const errorText = await response.text();
              // console.error('[BoardPage] Failed to auto-save board:', { 
              //   status: response.status,
              //   statusText: response.statusText,
              //   errorText: errorText
              // });
            }
          } catch (error) {
            // console.error('[BoardPage] Failed to auto-save board:', error);
          }
        } else {
          // console.log('[BoardPage] No board data to auto-save');
        }
        
        setIsAutoSaving(false);
      } else {
        // console.log('[BoardPage] Whiteboard ref not available for auto-save');
      }
    }, 30000); // Auto-save every 30 seconds

    return () => {
      // console.log('[BoardPage] Clearing auto-save interval');
      clearInterval(autoSaveInterval);
    };
  }, [boardId]); // Only re-run when boardId changes

  if (!boardId) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading board...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Back to dashboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Board Editor</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              
              {/* Save status indicator */}
              <div className="flex items-center text-sm">
                {isAutoSaving ? (
                  <span className="flex items-center text-indigo-600">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : lastSaved ? (
                  <span className="text-gray-500">
                    Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                ) : (
                  <span className="text-gray-500">Not saved yet</span>
                )}
              </div>
              
              {/* Manual save button */}
              <button
                onClick={handleManualSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Save Now
              </button>
              
              {/* User info */}
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-800 font-medium text-sm">
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:inline">
                    {user.name || user.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Toolbar */}
        <div className="shrink-0">
          <EnhancedToolbar
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
            onShare={handleShare}
            onSave={handleManualSave}
            collaboratorCount={0}
          />
        </div>
        
        {/* Main content - Whiteboard */}
        <main className="flex-1 overflow-hidden relative">
          <Whiteboard 
            ref={whiteboardRef} 
            boardId={boardId} 
            userId={user?.id || 'anonymous'}
            activeTool={activeTool}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </main>
        
        {/* Sharing Modal */}
        <EnhancedSharingModal
          boardId={boardId || ''}
          isOpen={isSharingModalOpen}
          onClose={() => {
            setIsSharingModalOpen(false);
          }}
          onCollaboratorsChange={() => {
            console.log('Collaborators changed');
          }}
        />
      </div>
    </ProtectedRoute>
  );
}