'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { io, Socket } from 'socket.io-client';

// Declare fabric as a global variable since we'll load it dynamically
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
  setBackgroundColor: (color: string) => void;
  setDrawingMode: (mode: boolean) => void;
  setFreeDrawingBrush: (color: string, width: number) => void;
  addShape: (shapeType: string, options?: any) => any;
  exportAs: (format: string) => string | null;
  loadFromJSON: (json: string) => void;
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
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const isDrawingRef = useRef(false);
  
  // Refs to avoid stale closure issues
  const toolRef = useRef(activeTool);
  const colorRef = useRef(strokeColor);
  const widthRef = useRef(strokeWidth);

  // Update refs whenever props change
  useEffect(() => {
    toolRef.current = activeTool;
    colorRef.current = strokeColor;
    widthRef.current = strokeWidth;
  }, [activeTool, strokeColor, strokeWidth]);

  // Load fabric.js dynamically
  useEffect(() => {
    const loadFabric = async () => {
      if (typeof window !== 'undefined') {
        console.log('[Whiteboard] Loading Fabric.js dynamically');
        // @ts-ignore
        const fabricModule = await import('fabric').then(mod => mod.fabric || mod.default || mod);
        window.fabric = fabricModule;
        setFabricLoaded(true);
        console.log('[Whiteboard] Fabric.js loaded successfully');
        
        if (onReady) {
          onReady();
        }
      }
    };

    loadFabric();
  }, [onReady]);

  // Initialize Socket.io connection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[Whiteboard] Initializing Socket.io connection', { boardId, userId });
      // Initialize Socket.io client
      const socket = io({
        path: '/api/socketio',
      });
      
      socketRef.current = socket;
      
      // Join the board room
      console.log('[Whiteboard] Joining board room', { boardId });
      socket.emit('join-board', boardId);
      
      // Listen for canvas updates from other users
      socket.on('canvas-update', (data) => {
        console.log('[Whiteboard] Received canvas update from other user', data);
        if (fabricRef.current) {
          // Apply the action to the canvas
          applyRemoteAction(data.action);
        }
      });
      
      // Listen for cursor updates from other users
      socket.on('cursor-update', (data) => {
        console.log('[Whiteboard] Received cursor update', data);
      });
      
      socket.on('connect', () => {
        console.log('[Whiteboard] Socket connected', { socketId: socket.id });
      });
      
      socket.on('disconnect', () => {
        console.log('[Whiteboard] Socket disconnected');
      });
      
      // Log all socket events for debugging
      socket.onAny((eventName, ...args) => {
        console.log(`[Whiteboard] Socket event received: ${eventName}`, args);
      });
      
      // Cleanup
      return () => {
        console.log('[Whiteboard] Leaving board room and disconnecting socket', { boardId });
        socket.emit('leave-board', boardId);
        socket.disconnect();
      };
    }
  }, [boardId, userId]);

  // Initialize canvas when fabric is loaded
  useEffect(() => {
    if (fabricLoaded && canvasRef.current) {
      console.log('[Whiteboard] Initializing Fabric canvas');
      // Initialize Fabric canvas
      const canvas = new window.fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight - 120, // Adjust for header and toolbar height
        backgroundColor: '#f8fafc',
        selection: true,
      });

      fabricRef.current = canvas;
      console.log('[Whiteboard] Fabric canvas initialized successfully');

      // Add getObjectById method to Fabric canvas prototype
      if (!window.fabric.Canvas.prototype.getObjectById) {
        window.fabric.Canvas.prototype.getObjectById = function(id: string) {
          return this.getObjects().find((obj: any) => obj.id === id);
        };
      }

      // Handle canvas events for real-time collaboration
      canvas.on('object:added', (options: any) => {
        console.log('[Whiteboard] Canvas object:added event', { 
          hasTarget: !!options.target,
          isRemoteAction: options.target?.remoteAction,
          targetId: options.target?.id,
          targetType: options.target?.type,
          targetData: options.target ? {
            left: options.target.left,
            top: options.target.top,
            width: options.target.width,
            height: options.target.height
          } : null
        });
        
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          console.log('[Whiteboard] Skipping remote action for object:added');
          return;
        }
        
        // Send action to other users
        const action = {
          type: 'add',
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling'])
        };
        
        console.log('[Whiteboard] Sending canvas-action for object:added', { action, boardId, userId });
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
      });
      
      canvas.on('object:modified', (options: any) => {
        console.log('[Whiteboard] Canvas object:modified event', { 
          hasTarget: !!options.target,
          isRemoteAction: options.target?.remoteAction,
          targetId: options.target?.id,
          targetType: options.target?.type,
          targetData: options.target ? {
            left: options.target.left,
            top: options.target.top,
            width: options.target.width,
            height: options.target.height
          } : null
        });
        
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          console.log('[Whiteboard] Skipping remote action for object:modified');
          return;
        }
        
        // Send action to other users
        const action = {
          type: 'modify',
          objectId: options.target.id,
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling'])
        };
        
        console.log('[Whiteboard] Sending canvas-action for object:modified', { action, boardId, userId });
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
      });
      
      canvas.on('object:removed', (options: any) => {
        console.log('[Whiteboard] Canvas object:removed event', { 
          hasTarget: !!options.target,
          isRemoteAction: options.target?.remoteAction,
          targetId: options.target?.id,
          targetType: options.target?.type
        });
        
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          console.log('[Whiteboard] Skipping remote action for object:removed');
          return;
        }
        
        // Send action to other users
        const action = {
          type: 'remove',
          objectId: options.target.id
        };
        
        console.log('[Whiteboard] Sending canvas-action for object:removed', { action, boardId, userId });
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
      });

      // Mouse events for drawing
      canvas.on('mouse:down', (options: any) => {
        console.log('[Whiteboard] Canvas mouse:down event', { activeTool: toolRef.current, pointer: options.pointer });
        isDrawingRef.current = true;
        handleMouseDown(options);
      });
      
      canvas.on('mouse:move', (options: any) => {
        if (!isDrawingRef.current) return;
        handleMouseMove(options);
      });
      
      canvas.on('mouse:up', () => {
        console.log('[Whiteboard] Canvas mouse:up event');
        isDrawingRef.current = false;
        handleMouseUp();
      });

      // Handle window resize
      const handleResize = () => {
        if (canvasRef.current && fabricRef.current) {
          fabricRef.current.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight - 120,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        console.log('[Whiteboard] Cleaning up canvas');
        window.removeEventListener('resize', handleResize);
        if (fabricRef.current) {
          fabricRef.current.dispose();
        }
      };
    }
  }, [fabricLoaded, boardId, userId]);

  // Update canvas settings when props change
  useEffect(() => {
    if (!fabricRef.current) {
      console.log('[Whiteboard] Canvas not initialized yet, skipping prop update');
      return;
    }
    
    const canvas = fabricRef.current;
    console.log('[Whiteboard] Updating canvas settings', { activeTool, strokeColor, strokeWidth });
    
    // Update drawing mode based on active tool
    if (activeTool === 'pen') {
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = strokeColor;
        canvas.freeDrawingBrush.width = strokeWidth;
        console.log('[Whiteboard] Updated free drawing brush', { color: strokeColor, width: strokeWidth });
      }
    } else {
      // For all other tools (select, shapes, eraser), disable drawing mode
      canvas.isDrawingMode = false;
      console.log('[Whiteboard] Disabled drawing mode for tool:', activeTool);
    }
    
    // Update selection based on active tool
    canvas.selection = activeTool === 'select';
    console.log('[Whiteboard] Updated selection mode', { selection: canvas.selection });
  }, [activeTool, strokeColor, strokeWidth]);

  // Handle mouse down events
  const handleMouseDown = (options: any) => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    
    // Use refs to get the latest values
    const tool = toolRef.current;
    const color = colorRef.current;
    const width = widthRef.current;
    
    console.log('[Whiteboard] Handling mouse down', { tool, pointer: options.pointer });
    
    // Handle shape creation tools
    if (['rectangle', 'circle', 'line', 'text'].includes(tool)) {
      let shape;
      
      switch (tool) {
        case 'rectangle':
          shape = new window.fabric.Rect({
            left: options.pointer.x,
            top: options.pointer.y,
            width: 1,
            height: 1,
            fill: 'transparent',
            stroke: color,
            strokeWidth: width,
          });
          break;
        case 'circle':
          shape = new window.fabric.Circle({
            left: options.pointer.x,
            top: options.pointer.y,
            radius: 1,
            fill: 'transparent',
            stroke: color,
            strokeWidth: width,
          });
          break;
        case 'line':
          shape = new window.fabric.Line([
            options.pointer.x, 
            options.pointer.y, 
            options.pointer.x, 
            options.pointer.y
          ], {
            stroke: color,
            strokeWidth: width,
          });
          break;
        case 'text':
          shape = new window.fabric.Textbox('Text', {
            left: options.pointer.x,
            top: options.pointer.y,
            fill: color,
            fontSize: 20,
            width: 150,
          });
          break;
      }
      
      if (shape) {
        // Assign a unique ID to the shape
        shape.id = crypto.randomUUID();
        console.log('[Whiteboard] Created shape', { type: tool, shapeType: shape.type, shapeId: shape.id });
        canvas.add(shape);
        canvas.setActiveObject(shape);
      }
    }
  };

  // Handle mouse move events
  const handleMouseMove = (options: any) => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const activeObject = canvas.getActiveObject();
    
    // Use refs to get the latest values
    const tool = toolRef.current;
    
    // Only handle mouse move for shape tools
    if (!activeObject || !['rectangle', 'circle', 'line'].includes(tool)) return;
    
    const pointer = canvas.getPointer(options.e);
    console.log('[Whiteboard] Handling mouse move', { tool, pointer });
    
    switch (tool) {
      case 'rectangle':
        const width = pointer.x - activeObject.left;
        const height = pointer.y - activeObject.top;
        // Prevent negative dimensions
        activeObject.set({
          width: Math.abs(width),
          height: Math.abs(height),
          left: width < 0 ? pointer.x : activeObject.left,
          top: height < 0 ? pointer.y : activeObject.top,
        });
        break;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(pointer.x - activeObject.left, 2) + 
          Math.pow(pointer.y - activeObject.top, 2)
        );
        activeObject.set({ radius });
        break;
      case 'line':
        activeObject.set({ x2: pointer.x, y2: pointer.y });
        break;
    }
    
    canvas.renderAll();
  };

  // Handle mouse up events
  const handleMouseUp = () => {
    console.log('[Whiteboard] Handling mouse up');
    // Any cleanup needed after drawing
  };

  // Apply remote actions to the canvas
  const applyRemoteAction = (action: any) => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    console.log('[Whiteboard] Applying remote action', { action });
    
    switch (action.type) {
      case 'add':
        window.fabric.util.enlivenObjects([action.object], (enlivenedObjects: any[]) => {
          console.log('[Whiteboard] Enlivened objects for add action', { count: enlivenedObjects.length });
          enlivenedObjects.forEach((obj) => {
            obj.remoteAction = true; // Mark as remote action to avoid infinite loop
            canvas.add(obj);
          });
          canvas.renderAll();
        });
        break;
        
      case 'modify':
        const object = canvas.getObjectById(action.objectId);
        if (object) {
          console.log('[Whiteboard] Modifying object', { objectId: action.objectId });
          object.set(action.object);
          object.remoteAction = true; // Mark as remote action to avoid infinite loop
          canvas.renderAll();
        } else {
          console.warn('[Whiteboard] Object not found for modify action', { objectId: action.objectId });
        }
        break;
        
      case 'remove':
        const objToRemove = canvas.getObjectById(action.objectId);
        if (objToRemove) {
          console.log('[Whiteboard] Removing object', { objectId: action.objectId });
          objToRemove.remoteAction = true; // Mark as remote action to avoid infinite loop
          canvas.remove(objToRemove);
          canvas.renderAll();
        } else {
          console.warn('[Whiteboard] Object not found for remove action', { objectId: action.objectId });
        }
        break;
        
      default:
        console.warn('[Whiteboard] Unknown action type', { type: action.type });
    }
  };

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      console.log('[Whiteboard] Clearing canvas');
      if (fabricRef.current) {
        fabricRef.current.clear();
      }
    },
    
    setBackgroundColor: (color: string) => {
      console.log('[Whiteboard] Setting background color', { color });
      if (fabricRef.current) {
        fabricRef.current.setBackgroundColor(color, fabricRef.current.renderAll.bind(fabricRef.current));
      }
    },
    
    setDrawingMode: (mode: boolean) => {
      console.log('[Whiteboard] Setting drawing mode', { mode });
      if (fabricRef.current) {
        fabricRef.current.isDrawingMode = mode;
      }
    },
    
    setFreeDrawingBrush: (color: string, width: number) => {
      console.log('[Whiteboard] Setting free drawing brush', { color, width });
      if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
        fabricRef.current.freeDrawingBrush.color = color;
        fabricRef.current.freeDrawingBrush.width = width;
      }
    },
    
    addShape: (shapeType: string, options: any = {}) => {
      console.log('[Whiteboard] Adding shape', { shapeType, options });
      if (!fabricRef.current) return null;

      const canvas = fabricRef.current;
      const commonProps = {
        left: options.left || 100,
        top: options.top || 100,
        fill: options.fill || 'transparent',
        stroke: options.stroke || '#000000',
        strokeWidth: options.strokeWidth || 2,
      };

      let shape;

      switch (shapeType) {
        case 'rectangle':
          shape = new window.fabric.Rect({
            ...commonProps,
            width: options.width || 100,
            height: options.height || 70,
          });
          break;
        case 'circle':
          shape = new window.fabric.Circle({
            ...commonProps,
            radius: options.radius || 50,
          });
          break;
        case 'line':
          shape = new window.fabric.Line(
            [options.x1 || 50, options.y1 || 50, options.x2 || 150, options.y2 || 150],
            {
              ...commonProps,
            }
          );
          break;
        case 'text':
          shape = new window.fabric.Textbox(options.text || 'Text', {
            ...commonProps,
            width: options.width || 150,
            fontSize: options.fontSize || 20,
          });
          break;
        default:
          return null;
      }

      if (shape) {
        shape.id = crypto.randomUUID();
        canvas.add(shape);
        canvas.setActiveObject(shape);
      }
      return shape;
    },
    
    exportAs: (format: string): string | null => {
      console.log('[Whiteboard] Exporting canvas', { format });
      if (!fabricRef.current) return null;

      switch (format) {
        case 'png':
          return fabricRef.current.toDataURL({ format: 'png' });
        case 'jpg':
          return fabricRef.current.toDataURL({ format: 'jpeg' });
        case 'svg':
          return fabricRef.current.toSVG();
        case 'json':
          return JSON.stringify(fabricRef.current.toJSON());
        default:
          return null;
      }
    },
    
    loadFromJSON: (json: string) => {
      console.log('[Whiteboard] Loading from JSON', { dataLength: json.length });
      if (!fabricRef.current) return;
      
      fabricRef.current.loadFromJSON(json, () => {
        fabricRef.current.renderAll();
        console.log('[Whiteboard] JSON loaded and rendered successfully');
      });
    }
  }));

  return (
    <div className="flex-1 overflow-hidden relative">
      {!fabricLoaded ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading canvas...</p>
          </div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      )}
    </div>
  );
});

Whiteboard.displayName = 'Whiteboard';

export default Whiteboard;