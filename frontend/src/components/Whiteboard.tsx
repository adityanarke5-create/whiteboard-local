'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '@/lib/auth-service';

// Backend API base URL - using the dedicated backend server port
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

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
  // Add new methods for pan and zoom
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  pan: (deltaX: number, deltaY: number) => void;
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
  const cursorRefs = useRef<Map<string, any>>(new Map()); // Store remote cursors
  
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
        // @ts-ignore
        const fabricModule = await import('fabric').then(mod => mod.fabric || mod.default || mod);
        window.fabric = fabricModule;
        setFabricLoaded(true);
        
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
      // Initialize Socket.io client
      const socket = io({
        path: '/api/socketio',
      });
      
      socketRef.current = socket;
      
      // Join the board room
      socket.emit('join-board', boardId);
      
      // Listen for canvas updates from other users
      socket.on('canvas-update', (data) => {
        if (fabricRef.current) {
          // Apply the action to the canvas
          applyRemoteAction(data);
        }
      });
      
      // Listen for complete board state from the server
      socket.on('board-snapshot', (data) => {
        if (fabricRef.current) {
          console.log('[Whiteboard] Received board snapshot from server');
          // Load the complete board state
          fabricRef.current.loadFromJSON(data.data, () => {
            fabricRef.current.renderAll();
            console.log('[Whiteboard] Board snapshot loaded successfully');
          });
        }
      });
      
      // Listen for cursor updates from other users
      socket.on('cursor-update', (data) => {
        if (fabricRef.current) {
          updateRemoteCursor(data.userId, data.x, data.y);
        }
      });
      
      // Cleanup
      return () => {
        socket.emit('leave-board', boardId);
        socket.disconnect();
      };
    }
  }, [boardId, userId]);

  // Initialize canvas when fabric is loaded
  useEffect(() => {
    if (fabricLoaded && canvasRef.current) {
      // Initialize Fabric canvas
      const canvas = new window.fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight - 120, // Adjust for header and toolbar height
        backgroundColor: '#f8fafc',
        selection: true,
      });

      fabricRef.current = canvas;

      // Add getObjectById method to Fabric canvas prototype if not already present
      if (!window.fabric.Canvas.prototype.getObjectById) {
        window.fabric.Canvas.prototype.getObjectById = function(id: string) {
          return this.getObjects().find((obj: any) => obj.id === id);
        };
      }
      
      // Also add it to the current canvas instance to be safe
      if (!canvas.getObjectById) {
        canvas.getObjectById = function(id: string) {
          return this.getObjects().find((obj: any) => obj.id === id);
        };
      }

      // Set up pan and zoom functionality
      canvas.on('mouse:wheel', function(opt: any) {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      // Set up panning
      canvas.on('mouse:down', function(opt: any) {
        const evt = opt.e;
        // Check if pan tool is active
        if (toolRef.current === 'pan' || evt.altKey === true) {
          canvas.isDragging = true;
          canvas.selection = false;
          canvas.defaultCursor = 'grabbing';
          canvas.lastPosX = evt.clientX;
          canvas.lastPosY = evt.clientY;
        } else {
          isDrawingRef.current = true;
          handleMouseDown(opt);
        }
      });

      canvas.on('mouse:move', function(opt: any) {
        // Send cursor position to other users
        if (socketRef.current && fabricRef.current) {
          const pointer = fabricRef.current.getPointer(opt.e);
          socketRef.current.emit('cursor-move', {
            boardId,
            userId,
            x: pointer.x,
            y: pointer.y
          });
        }
        
        // Handle panning
        if (canvas.isDragging) {
          const e = opt.e;
          const vpt = canvas.viewportTransform;
          if (vpt) {
            vpt[4] += e.clientX - canvas.lastPosX;
            vpt[5] += e.clientY - canvas.lastPosY;
            canvas.requestRenderAll();
            canvas.lastPosX = e.clientX;
            canvas.lastPosY = e.clientY;
          }
        } else if (isDrawingRef.current) {
          // Handle mouse move for shape tools
          handleMouseMove(opt);
        }
      });

      canvas.on('mouse:up', function(opt: any) {
        if (canvas.isDragging) {
          canvas.setViewportTransform(canvas.viewportTransform);
          canvas.isDragging = false;
          canvas.selection = toolRef.current === 'select';
          canvas.defaultCursor = 'grab';
        } else {
          isDrawingRef.current = false;
          handleMouseUp();
        }
      });

      // Handle canvas events for real-time collaboration
      canvas.on('object:added', (options: any) => {
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          options.target.id = crypto.randomUUID();
        }
        
        // Send action to other users
        const action = {
          type: 'add',
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'id'])
        };
        
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
      });
      
      canvas.on('object:modified', (options: any) => {
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          options.target.id = crypto.randomUUID();
        }
        
        // Send action to other users
        const action = {
          type: 'modify',
          objectId: options.target.id,
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'id'])
        };
        
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
      });
      
      canvas.on('object:removed', (options: any) => {
        if (!options.target) return;
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          // If the object doesn't have an ID, we can't sync it properly
          return;
        }
        
        // Send action to other users
        const action = {
          type: 'remove',
          objectId: options.target.id
        };
        
        socketRef.current?.emit('canvas-action', {
          boardId,
          action,
          userId
        });
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
      return;
    }
    
    const canvas = fabricRef.current;
    
    // Update drawing mode based on active tool
    if (activeTool === 'eraser') {
      canvas.isDrawingMode = true;
      // Set up eraser brush
      if (!canvas.freeDrawingBrush || 
          (window.fabric.EraserBrush && !(canvas.freeDrawingBrush instanceof window.fabric.EraserBrush))) {
        // Ensure EraserBrush is available
        if (window.fabric.EraserBrush) {
          canvas.freeDrawingBrush = new window.fabric.EraserBrush(canvas);
        } else {
          // Fallback: use regular pencil brush with white color
          canvas.freeDrawingBrush = new window.fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.color = '#f8fafc'; // Background color
        }
      }
      canvas.freeDrawingBrush.width = strokeWidth;
    } else {
      // For all other tools (select, shapes, pan), disable drawing mode
      canvas.isDrawingMode = false;
    }
    
    // Update selection based on active tool
    canvas.selection = activeTool === 'select';
    
    // Handle pan tool
    if (activeTool === 'pan') {
      canvas.defaultCursor = 'grab';
      canvas.selection = false;
    } else {
      canvas.defaultCursor = 'default';
    }
  }, [activeTool, strokeColor, strokeWidth]);

  // Handle mouse down events
  const handleMouseDown = (options: any) => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    
    // Use refs to get the latest values
    const tool = toolRef.current;
    const color = colorRef.current;
    const width = widthRef.current;
    
    // Handle eraser tool
    if (tool === 'eraser') {
      // The eraser brush is handled by Fabric's drawing mode
      console.log('[Whiteboard] Eraser tool activated');
      return;
    }
    
    // Handle selection tool for object deletion
    if (tool === 'select') {
      // Check if we're clicking on an object to potentially delete it
      const pointer = canvas.getPointer(options.e);
      const clickedObject = canvas.findTarget(options.e, false);
      
      if (clickedObject && options.e.shiftKey) {
        // If Shift key is pressed while clicking on an object, delete it
        console.log('[Whiteboard] Deleting object with Shift+Click', { objectId: clickedObject.id });
        canvas.remove(clickedObject);
        canvas.requestRenderAll();
        return;
      }
    }
    
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
    // Any cleanup needed after drawing
  };

  // Update remote cursor position
  const updateRemoteCursor = (cursorUserId: string, x: number, y: number) => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    
    // Don't show our own cursor
    if (cursorUserId === userId) return;
    
    let cursor = cursorRefs.current.get(cursorUserId);
    
    if (!cursor) {
      // Create a new cursor if it doesn't exist
      cursor = new window.fabric.Circle({
        radius: 5,
        fill: '#ff0000',
        left: x,
        top: y,
        originX: 'center',
        originY: 'center',
        selectable: false,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
      });
      
      cursor.id = `cursor-${cursorUserId}`;
      canvas.add(cursor);
      cursorRefs.current.set(cursorUserId, cursor);
    }
    
    // Update cursor position
    cursor.set({ left: x, top: y });
    canvas.renderAll();
  };

  // Apply remote actions to the canvas
  const applyRemoteAction = (data: any) => {
    if (!fabricRef.current) return;
    
    const { action, userId: actionUserId } = data;
    const canvas = fabricRef.current;
    
    // Don't process our own actions
    if (actionUserId === userId) {
      return;
    }
    
    switch (action.type) {
      case 'add':
        // Use enlivenObjects to properly deserialize Fabric objects
        window.fabric.util.enlivenObjects([action.object], (enlivenedObjects: any[]) => {
          enlivenedObjects.forEach((obj) => {
            // Ensure the object has a proper ID
            if (!obj.id && action.object.id) {
              obj.id = action.object.id;
            }
            // Mark as remote action to avoid infinite loop
            obj.remoteAction = true;
            canvas.add(obj);
          });
          canvas.renderAll();
        });
        break;
        
      case 'modify':
        const objectToModify = canvas.getObjectById(action.objectId);
        if (objectToModify) {
          // Mark as remote action to avoid infinite loop
          objectToModify.remoteAction = true;
          // Apply all properties from the action object
          objectToModify.set(action.object);
          canvas.renderAll();
        }
        break;
        
      case 'remove':
        const objectToRemove = canvas.getObjectById(action.objectId);
        if (objectToRemove) {
          // Mark as remote action to avoid infinite loop
          objectToRemove.remoteAction = true;
          canvas.remove(objectToRemove);
          canvas.renderAll();
        }
        break;
        
      default:
        console.warn('Unknown action type', { type: action.type });
    }
  };

  // Add pan and zoom methods
  const zoomIn = useCallback(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    let zoom = canvas.getZoom();
    zoom *= 1.1;
    if (zoom > 20) zoom = 20;
    canvas.setZoom(zoom);
    canvas.requestRenderAll();
  }, []);

  const zoomOut = useCallback(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    let zoom = canvas.getZoom();
    zoom /= 1.1;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    canvas.requestRenderAll();
  }, []);

  const resetZoom = useCallback(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    canvas.setZoom(1);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.requestRenderAll();
  }, []);

  const pan = useCallback((deltaX: number, deltaY: number) => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    const vpt = canvas.viewportTransform;
    if (vpt) {
      vpt[4] += deltaX;
      vpt[5] += deltaY;
      canvas.setViewportTransform(vpt);
      canvas.requestRenderAll();
    }
  }, []);

  // Set up keyboard shortcuts for pan and zoom
  useEffect(() => {
    if (!fabricLoaded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle object deletion with Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (fabricRef.current) {
          const canvas = fabricRef.current;
          const activeObject = canvas.getActiveObject();
          const activeObjects = canvas.getActiveObjects();
          
          if (activeObject || activeObjects.length > 0) {
            console.log('[Whiteboard] Deleting selected objects', { 
              activeObject: activeObject?.id,
              activeObjectsCount: activeObjects.length
            });
            
            // Remove all active objects
            activeObjects.forEach((obj: any) => {
              canvas.remove(obj);
            });
            
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            return;
          }
        }
      }
      
      // Pan with arrow keys (when holding Shift)
      if (e.shiftKey && e.key === 'ArrowUp') {
        pan(0, -10);
      } else if (e.shiftKey && e.key === 'ArrowDown') {
        pan(0, 10);
      } else if (e.shiftKey && e.key === 'ArrowLeft') {
        pan(-10, 0);
      } else if (e.shiftKey && e.key === 'ArrowRight') {
        pan(10, 0);
      }
      
      // Zoom with Ctrl+/Ctrl- keys
      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        zoomIn();
      } else if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
        zoomOut();
      }
      
      // Reset zoom with Ctrl+0 key
      if (e.ctrlKey && e.key === '0') {
        resetZoom();
      }
    };

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fabricLoaded, pan, zoomIn, zoomOut, resetZoom]);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      if (fabricRef.current) {
        fabricRef.current.clear();
      }
    },
    
    setBackgroundColor: (color: string) => {
      if (fabricRef.current) {
        fabricRef.current.setBackgroundColor(color, fabricRef.current.renderAll.bind(fabricRef.current));
      }
    },
    
    setDrawingMode: (mode: boolean) => {
      if (fabricRef.current) {
        fabricRef.current.isDrawingMode = mode;
      }
    },
    
    setFreeDrawingBrush: (color: string, width: number) => {
      if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
        fabricRef.current.freeDrawingBrush.color = color;
        fabricRef.current.freeDrawingBrush.width = width;
      }
    },
    
    addShape: (shapeType: string, options: any = {}) => {
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
      if (!fabricRef.current) return;
      
      fabricRef.current.loadFromJSON(json, () => {
        fabricRef.current.renderAll();
      });
    },
    
    // Add new pan and zoom methods
    zoomIn,
    zoomOut,
    resetZoom,
    pan,
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