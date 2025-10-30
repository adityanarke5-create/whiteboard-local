'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

declare global {
  interface Window {
    fabric: any;
  }
}

interface WhiteboardProps {
  boardId: string;
  userId: string;
  activeTool?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onReady?: () => void;
}

export type WhiteboardHandle = {
  clearCanvas: () => void;
  exportAs: (format: string) => string | null;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

const Whiteboard = forwardRef<WhiteboardHandle, WhiteboardProps>(({ 
  boardId, 
  userId, 
  activeTool = 'select', 
  strokeColor = '#000000', 
  strokeWidth = 2,
  onReady 
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const socketRef = useRef<Socket | null>(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const syncingRef = useRef(false);

  // Load fabric.js
  useEffect(() => {
    const loadFabric = async () => {
      if (typeof window !== 'undefined') {
        const fabricModule = await import('fabric').then(mod => mod.fabric || mod.default || mod);
        window.fabric = fabricModule;
        setFabricLoaded(true);
        onReady?.();
      }
    };
    loadFabric();
  }, [onReady]);

  // Send canvas action to other clients
  const sendCanvasAction = useCallback((actionType: string, target?: any) => {
    if (!socketRef.current?.connected || syncingRef.current) return;
    
    const action: any = { type: actionType, timestamp: Date.now() };
    
    if (target) {
      if (actionType === 'object:removed') {
        action.objectId = target.id;
      } else {
        action.object = target.toObject ? target.toObject() : target;
        if (action.object) action.object.id = target.id;
      }
    }
    
    console.log('Sending action:', actionType, target?.id);
    socketRef.current.emit('canvas-action', { boardId, action, userId });
  }, [boardId, userId]);

  // Send canvas state for snapshots
  const sendCanvasState = useCallback(() => {
    if (!socketRef.current?.connected || !fabricRef.current || syncingRef.current) return;
    
    const canvasData = JSON.stringify(fabricRef.current.toJSON());
    socketRef.current.emit('update-board-state', { boardId, state: canvasData });
  }, [boardId]);

  // Initialize WebSocket
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = io(BACKEND_API_BASE_URL, { 
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected');
      socket.emit('join-board', boardId);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('board-joined', () => {
      console.log('Board joined');
    });

    socket.on('canvas-action', (data) => {
      console.log('Received action:', data.action?.type, data.action?.object?.id || data.action?.objectId);
      if (!fabricRef.current || data.userId === userId) return;
      
      const { action } = data;
      const canvas = fabricRef.current;

      // Temporarily disable events to prevent loops
      const originalEvents = canvas.__eventListeners;
      canvas.__eventListeners = {};

      if (action.type === 'object:added' && action.object) {
        const existing = canvas.getObjects().find((obj: any) => obj.id === action.object.id);
        if (!existing) {
          window.fabric.util.enlivenObjects([action.object], (objects: any[]) => {
            if (objects?.[0] && fabricRef.current) {
              const obj = objects[0];
              obj.id = action.object.id;
              fabricRef.current.add(obj);
              fabricRef.current.renderAll();
              console.log('✅ Added object:', obj.id);
            }
          });
        }
      } else if (action.type === 'object:modified' && action.object) {
        const existingObj = canvas.getObjects().find((obj: any) => obj.id === action.object.id);
        if (existingObj) {
          existingObj.set(action.object);
          existingObj.setCoords();
          canvas.renderAll();
          console.log('✅ Modified object:', action.object.id);
        }
      } else if (action.type === 'object:removed' && action.objectId) {
        const objToRemove = canvas.getObjects().find((obj: any) => obj.id === action.objectId);
        if (objToRemove) {
          canvas.remove(objToRemove);
          canvas.renderAll();
          console.log('✅ Removed object:', action.objectId);
        }
      }

      // Restore events after a short delay
      setTimeout(() => {
        if (fabricRef.current) {
          fabricRef.current.__eventListeners = originalEvents;
        }
      }, 100);
    });

    socket.on('board-snapshot', (data) => {
      console.log('Received board snapshot');
      if (!fabricRef.current) return;
      
      syncingRef.current = true;
      try {
        const canvasData = JSON.parse(data.data);
        fabricRef.current.loadFromJSON(canvasData, () => {
          if (fabricRef.current) {
            fabricRef.current.requestRenderAll();
            fabricRef.current.renderAll();
            console.log('Loaded snapshot with', fabricRef.current.getObjects().length, 'objects');
            syncingRef.current = false;
          }
        });
      } catch (error) {
        console.error('Error loading snapshot:', error);
        syncingRef.current = false;
      }
    });

    return () => {
      socket.emit('leave-board', boardId);
      socket.disconnect();
    };
  }, [boardId, userId]);

  // Initialize canvas
  useEffect(() => {
    if (!fabricLoaded || !canvasRef.current) return;

    const canvas = new window.fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight - 120,
      backgroundColor: '#f8fafc',
    });

    fabricRef.current = canvas;

    // Add getObjectById method
    canvas.getObjectById = function(id: string) {
      return this.getObjects().find((obj: any) => obj.id === id);
    };

    // Canvas events for real-time collaboration
    canvas.on('object:added', (e: any) => {
      if (!e.target.id) e.target.id = crypto.randomUUID();
      // Only send if this is a user-initiated action (has event listeners)
      if (canvas.__eventListeners && Object.keys(canvas.__eventListeners).length > 0) {
        sendCanvasAction('object:added', e.target);
      }
    });

    canvas.on('object:modified', (e: any) => {
      if (canvas.__eventListeners && Object.keys(canvas.__eventListeners).length > 0) {
        sendCanvasAction('object:modified', e.target);
      }
    });

    canvas.on('object:removed', (e: any) => {
      if (canvas.__eventListeners && Object.keys(canvas.__eventListeners).length > 0) {
        sendCanvasAction('object:removed', e.target);
      }
    });

    canvas.on('path:created', (e: any) => {
      const path = e.path;
      if (!path.id) path.id = crypto.randomUUID();
      if (canvas.__eventListeners && Object.keys(canvas.__eventListeners).length > 0) {
        sendCanvasAction('object:added', path);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [fabricLoaded, sendCanvasAction]);

  // Update canvas settings
  useEffect(() => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    
    if (activeTool === 'pen') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new window.fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = strokeColor;
      canvas.freeDrawingBrush.width = strokeWidth;
    } else {
      canvas.isDrawingMode = false;
    }
    
    canvas.selection = activeTool === 'select';
  }, [activeTool, strokeColor, strokeWidth]);

  // Handle shape creation
  useEffect(() => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    let isDrawing = false;
    let startPointer: any = null;
    let activeShape: any = null;

    const handleMouseDown = (e: any) => {
      if (!['rectangle', 'circle', 'line'].includes(activeTool)) return;
      
      isDrawing = true;
      startPointer = canvas.getPointer(e.e);
      
      let shape;
      const id = crypto.randomUUID();
      
      switch (activeTool) {
        case 'rectangle':
          shape = new window.fabric.Rect({
            left: startPointer.x,
            top: startPointer.y,
            width: 1,
            height: 1,
            fill: 'transparent',
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            id
          });
          break;
        case 'circle':
          shape = new window.fabric.Circle({
            left: startPointer.x,
            top: startPointer.y,
            radius: 1,
            fill: 'transparent',
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            id
          });
          break;
        case 'line':
          shape = new window.fabric.Line([startPointer.x, startPointer.y, startPointer.x, startPointer.y], {
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            id
          });
          break;
      }
      
      if (shape) {
        activeShape = shape;
        canvas.add(shape);
      }
    };

    const handleMouseMove = (e: any) => {
      if (!isDrawing || !activeShape) return;
      
      const pointer = canvas.getPointer(e.e);
      
      switch (activeTool) {
        case 'rectangle':
          const width = pointer.x - startPointer.x;
          const height = pointer.y - startPointer.y;
          activeShape.set({
            width: Math.abs(width),
            height: Math.abs(height),
            left: width < 0 ? pointer.x : startPointer.x,
            top: height < 0 ? pointer.y : startPointer.y,
          });
          break;
        case 'circle':
          const radius = Math.sqrt(Math.pow(pointer.x - startPointer.x, 2) + Math.pow(pointer.y - startPointer.y, 2));
          activeShape.set({ radius });
          break;
        case 'line':
          activeShape.set({ x2: pointer.x, y2: pointer.y });
          break;
      }
      
      canvas.renderAll();
    };

    const handleMouseUp = () => {
      isDrawing = false;
      activeShape = null;
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [activeTool, strokeColor, strokeWidth]);

  // Expose methods
  useImperativeHandle(ref, () => ({
    clearCanvas: () => fabricRef.current?.clear(),
    exportAs: (format: string) => {
      if (!fabricRef.current) return null;
      switch (format) {
        case 'png': return fabricRef.current.toDataURL({ format: 'png' });
        case 'jpg': return fabricRef.current.toDataURL({ format: 'jpeg' });
        case 'svg': return fabricRef.current.toSVG();
        case 'json': return JSON.stringify(fabricRef.current.toJSON());
        default: return null;
      }
    },
    zoomIn: () => {
      const canvas = fabricRef.current;
      if (canvas) {
        let zoom = canvas.getZoom() * 1.1;
        if (zoom > 20) zoom = 20;
        canvas.setZoom(zoom);
      }
    },
    zoomOut: () => {
      const canvas = fabricRef.current;
      if (canvas) {
        let zoom = canvas.getZoom() / 1.1;
        if (zoom < 0.01) zoom = 0.01;
        canvas.setZoom(zoom);
      }
    },
    resetZoom: () => {
      const canvas = fabricRef.current;
      if (canvas) {
        canvas.setZoom(1);
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      }
    }
  }));

  return (
    <div className="flex-1 overflow-hidden relative">
      {!fabricLoaded ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      )}
    </div>
  );
});

Whiteboard.displayName = 'Whiteboard';
export default Whiteboard;