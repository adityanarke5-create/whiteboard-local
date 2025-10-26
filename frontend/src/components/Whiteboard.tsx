'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '@/lib/auth-service';

// Backend API base URL - using the dedicated backend server port
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
console.log('[WebSocket] Backend URL:', BACKEND_API_BASE_URL);

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
  const stateUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null); // Store interval ID
  
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
      // Initialize Socket.io client with proper configuration to ensure WebSocket transport
      console.log('[WebSocket] Initializing connection to:', BACKEND_API_BASE_URL);
      const socket = io(BACKEND_API_BASE_URL, {
        path: '/api/socketio',
        transports: ['websocket'], // Force WebSocket transport only
        upgrade: false, // Disable HTTP upgrade to WebSocket
        reconnection: true, // Enable reconnection
        reconnectionAttempts: 5, // Limit reconnection attempts
        reconnectionDelay: 1000, // Delay between reconnection attempts
        reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
        randomizationFactor: 0.5, // Randomization factor for reconnection delay
        timeout: 20000, // Connection timeout
      });
      
      console.log('[WebSocket] Socket instance created:', {
        id: socket.id,
        connected: socket.connected
      });
      
      socketRef.current = socket;
      
      // Add connection event listeners for debugging
      socket.on('connect', () => {
        console.log('[WebSocket] Connected to server:', { 
          socketId: socket.id,
          transport: socket.io.engine.transport.name,
          connected: socket.connected
        });
        
        // Verify that we're using WebSocket transport
        if (socket.io.engine.transport.name !== 'websocket') {
          console.warn('[WebSocket] WARNING: Not using WebSocket transport!', {
            transport: socket.io.engine.transport.name
          });
        } else {
          console.log('[WebSocket] CONFIRMED: Using WebSocket transport');
        }
        
        // Join the board room when connected
        console.log('[WebSocket] Joining board:', boardId);
        socket.emit('join-board', boardId);
      });
      
      socket.on('connect_error', (error) => {
        console.error('[WebSocket] Connection error:', error);
        console.error('[WebSocket] Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
          type: error.constructor.name
        });
        
        // Try to reconnect manually after a delay
        setTimeout(() => {
          if (socket && !socket.connected) {
            console.log('[WebSocket] Attempting manual reconnection...');
            socket.connect();
          }
        }, 3000);
      });
      
      socket.on('disconnect', (reason) => {
        console.log('[WebSocket] Disconnected from server:', { 
          reason,
          connected: socket.connected
        });
      });
      
      // Add transport upgrade event listener
      socket.io.engine.on('upgrade', () => {
        console.log('[WebSocket] Transport upgraded:', socket.io.engine.transport.name);
      });
      
      // Add packet event listeners for debugging
      socket.on('connect', () => {
        console.log('[WebSocket] Successfully connected with transport:', socket.io.engine.transport.name);
      });
      
      // Log connection state changes
      socket.on('connect', () => {
        console.log('[WebSocket] Connection state: CONNECTED');
      });
      
      socket.on('disconnect', () => {
        console.log('[WebSocket] Connection state: DISCONNECTED');
      });
      
      socket.on('connect_error', () => {
        console.log('[WebSocket] Connection state: CONNECTION_ERROR');
      });
      
      // Listen for board join confirmation
      socket.on('board-joined', (data) => {
        console.log('[WebSocket] Board joined confirmation received:', data);
      });
      
      // Listen for board leave confirmation
      socket.on('board-left', (data) => {
        console.log('[WebSocket] Board left confirmation received:', data);
      });
      
      // Listen for action processed confirmation
      socket.on('action-processed', (data) => {
        console.log('[WebSocket] Action processed confirmation received:', data);
      });
      
      // Listen for complete board state from the server
      socket.on('board-snapshot', (data) => {
        if (fabricRef.current) {
          console.log('[Whiteboard] Received board snapshot from server:', {
            dataSize: data.data?.length,
            timestamp: data.timestamp
          });
          // Load the complete board state
          fabricRef.current.loadFromJSON(data.data, () => {
            fabricRef.current.renderAll();
            console.log('[Whiteboard] Board snapshot loaded successfully');
          });
        }
      });
      
      // Listen for canvas updates from other users
      socket.on('canvas-update', (data) => {
        if (fabricRef.current) {
          console.log('[Whiteboard] Received canvas update:', {
            actionType: data.action?.type,
            userId: data.userId
          });
          // Apply the action to the canvas
          applyRemoteAction(data);
        } else {
          console.log('[Whiteboard] Fabric not ready, queuing canvas update');
        }
      });
      
      // Log any other events
      socket.onAny((eventName, ...args) => {
        // Only log canvas-related events
        if (eventName === 'canvas-update' || eventName === 'canvas-action' || eventName === 'action-processed') {
          console.log(`[WebSocket] Received event: ${eventName}`, { 
            socketId: socket.id, 
            args
          });
        }
      });
      
      // Periodically check connection status
      // const connectionCheckInterval = setInterval(() => {
      //   if (socket) {
      //     // Only log connection status occasionally to reduce noise
      //     if (Math.random() < 0.1) { // Log 10% of checks
      //       console.log('[WebSocket] Connection status check:', {
      //         connected: socket.connected,
      //         transport: socket.connected ? socket.io.engine.transport.name : 'disconnected'
      //       });
      //     }
      //   }
      // }, 10000); // Check every 10 seconds
      
      // Cleanup
      return () => {
        // Clear the connection check interval
        // clearInterval(connectionCheckInterval);
        
        // Clear the state update interval
        if (stateUpdateIntervalRef.current) {
          clearInterval(stateUpdateIntervalRef.current);
        }
        
        // Send current board state before leaving
        if (fabricRef.current && socketRef.current) {
          const boardState = JSON.stringify(fabricRef.current.toJSON());
          socketRef.current.emit('update-board-state', {
            boardId,
            state: boardState
          });
        }
        
        socketRef.current?.emit('leave-board', boardId);
        socketRef.current?.disconnect();
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

      // Periodically send board state updates to backend (every 30 seconds)
      stateUpdateIntervalRef.current = setInterval(() => {
        if (fabricRef.current && socketRef.current) {
          const boardState = JSON.stringify(fabricRef.current.toJSON());
          socketRef.current.emit('update-board-state', {
            boardId,
            state: boardState
          });
        }
      }, 30000); // 30 seconds

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
        // Only log occasionally to reduce noise
        if (Math.random() < 0.1) {
          console.log('[Whiteboard] Canvas object:added event triggered');
        }
        
        if (!options.target) {
          console.warn('[Whiteboard] No target in object:added event');
          return;
        }
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          // Only log occasionally to reduce noise
          if (Math.random() < 0.1) {
            console.log('[Whiteboard] Skipping remote action in object:added event');
          }
          return;
        }
        
        // Skip if we're currently drawing a shape (to prevent sending incomplete shapes)
        if (isDrawingShapeRef.current) {
          // Only log occasionally to reduce noise
          if (Math.random() < 0.1) {
            console.log('[Whiteboard] Skipping object:added event during shape drawing');
          }
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          // Only log occasionally to reduce noise
          if (Math.random() < 0.1) {
            console.log('[Whiteboard] Generating new ID for object');
          }
          options.target.id = crypto.randomUUID();
        }
        
        // Send action to other users
        const action = {
          type: 'add',
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'id'])
        };
        
        // Only log occasionally to reduce noise
        if (Math.random() < 0.1) {
          console.log('[Whiteboard] Sending canvas action:', { 
            boardId, 
            actionType: action.type,
            userId
          });
        }
        
        if (socketRef.current) {
          socketRef.current.emit('canvas-action', {
            boardId,
            action,
            userId // This is the Cognito userId
          });
          
          // Only log occasionally to reduce noise
          if (Math.random() < 0.1) {
            console.log('[Whiteboard] Canvas action sent to server');
          }
        } else {
          console.warn('[Whiteboard] Socket not available, cannot send canvas action');
        }
        
        // Log confirmation when action is processed (only occasionally)
        socketRef.current?.once('action-processed', (data) => {
          if (Math.random() < 0.1) {
            console.log('[Whiteboard] Action processed confirmation received');
          }
        });
      });
      
      canvas.on('object:modified', (options: any) => {
        console.log('[Whiteboard] Canvas object:modified event triggered', { options });
        
        if (!options.target) {
          console.warn('[Whiteboard] No target in object:modified event');
          return;
        }
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          console.log('[Whiteboard] Skipping remote action in object:modified event');
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          console.log('[Whiteboard] Generating new ID for object');
          options.target.id = crypto.randomUUID();
        }
        
        // Send action to other users
        const action = {
          type: 'modify',
          objectId: options.target.id,
          object: options.target.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'id'])
        };
        
        console.log('[Whiteboard] Sending canvas modify action:', { boardId, action, userId, userType: 'cognito' });
        
        if (socketRef.current) {
          socketRef.current.emit('canvas-action', {
            boardId,
            action,
            userId // This is the Cognito userId
          });
          
          console.log('[Whiteboard] Canvas modify action sent to server');
        } else {
          console.warn('[Whiteboard] Socket not available, cannot send canvas modify action');
        }
        
        // Log confirmation when action is processed
        socketRef.current?.once('action-processed', (data) => {
          console.log('[Whiteboard] Modify action processed confirmation received:', data);
        });
      });
      
      canvas.on('object:removed', (options: any) => {
        console.log('[Whiteboard] Canvas object:removed event triggered', { options });
        
        if (!options.target) {
          console.warn('[Whiteboard] No target in object:removed event');
          return;
        }
        
        // Skip if this event was triggered by a remote action
        if (options.target.remoteAction) {
          console.log('[Whiteboard] Skipping remote action in object:removed event');
          return;
        }
        
        // Ensure the object has an ID
        if (!options.target.id) {
          // If the object doesn't have an ID, we can't sync it properly
          console.warn('[Whiteboard] Object to remove has no ID, cannot sync');
          return;
        }
        
        // Send action to other users
        const action = {
          type: 'remove',
          objectId: options.target.id
        };
        
        console.log('[Whiteboard] Sending canvas remove action:', { boardId, action, userId, userType: 'cognito' });
        
        if (socketRef.current) {
          socketRef.current.emit('canvas-action', {
            boardId,
            action,
            userId // This is the Cognito userId
          });
          
          console.log('[Whiteboard] Canvas remove action sent to server');
        } else {
          console.warn('[Whiteboard] Socket not available, cannot send canvas remove action');
        }
        
        // Log confirmation when action is processed
        socketRef.current?.once('action-processed', (data) => {
          console.log('[Whiteboard] Remove action processed confirmation received:', data);
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
        // Clear the state update interval
        if (stateUpdateIntervalRef.current) {
          clearInterval(stateUpdateIntervalRef.current);
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

  // Ref to track if we're currently drawing a shape
  const isDrawingShapeRef = useRef(false);
  
  // Ref to track the current shape being drawn
  const currentDrawingShapeRef = useRef<any>(null);

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
        // Mark that we're drawing a shape
        isDrawingShapeRef.current = true;
        currentDrawingShapeRef.current = shape;
        canvas.add(shape);
        canvas.setActiveObject(shape);
        console.log('[Whiteboard] Shape created and added to canvas, waiting for mouse up to send action');
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
    // Check if we were drawing a shape
    if (isDrawingShapeRef.current && currentDrawingShapeRef.current && fabricRef.current) {
      const canvas = fabricRef.current;
      const shape = currentDrawingShapeRef.current;
      
      // Send the completed shape action to other users
      const action = {
        type: 'add',
        object: shape.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'id'])
      };
      
      console.log('[Whiteboard] Sending completed shape action on mouse up:', { 
        boardId, 
        actionType: action.type,
        userId,
        objectType: shape.type,
        objectId: shape.id
      });
      
      if (socketRef.current) {
        socketRef.current.emit('canvas-action', {
          boardId,
          action,
          userId // This is the Cognito userId
        });
        
        console.log('[Whiteboard] Completed shape action sent to server');
      } else {
        console.warn('[Whiteboard] Socket not available, cannot send completed shape action');
      }
      
      // Reset drawing state
      isDrawingShapeRef.current = false;
      currentDrawingShapeRef.current = null;
      console.log('[Whiteboard] Drawing state reset');
    }
  };

  // Apply remote actions to the canvas
  const applyRemoteAction = (data: any) => {
    if (!fabricRef.current) {
      console.log('[Whiteboard] Fabric not ready for remote action');
      return;
    }
    
    const { action, userId: actionUserId } = data;
    const canvas = fabricRef.current;
    
    // Don't process our own actions
    if (actionUserId === userId) {
      console.log('[Whiteboard] Skipping own action:', { actionType: action.type });
      return;
    }
    
    console.log('[Whiteboard] Applying remote action:', { 
      actionType: action.type, 
      actionUserId,
      objectType: action.object?.type,
      objectId: action.object?.id
    });
    
    // Validate action data
    if (!action || !action.type) {
      console.error('[Whiteboard] Invalid action data:', action);
      return;
    }
    
    switch (action.type) {
      case 'add':
        try {
          // Log the object data being processed
          console.log('[Whiteboard] Processing add action object data:', action.object);
          
          // Validate object data
          if (!action.object || !action.object.type) {
            console.error('[Whiteboard] Invalid object data for add action:', action.object);
            return;
          }
          
          // Create a deep copy of the object to avoid reference issues
          const objectData = JSON.parse(JSON.stringify(action.object));
          
          // Get the fabric class for this object type
          const FabricClass = window.fabric[objectData.type];
          if (!FabricClass) {
            console.error('[Whiteboard] Unknown object type:', objectData.type);
            return;
          }
          
          // Remove the 'type' property from objectData since it's not a valid option
          const { type, ...options } = objectData;
          
          // Ensure the object has proper styling
          if (options.fill === 'transparent' && !options.stroke) {
            options.stroke = '#000000'; // Default stroke color
          }
          
          // Create the fabric object based on type
          let fabricObject;
          if (type === 'line') {
            // Special handling for lines - use the points array
            const points = [objectData.x1, objectData.y1, objectData.x2, objectData.y2];
            fabricObject = new FabricClass(points, options);
          } else {
            // For other objects, pass options directly
            fabricObject = new FabricClass(options);
          }
          
          // Ensure the object has a proper ID
          if (!fabricObject.id && objectData.id) {
            fabricObject.id = objectData.id;
          }
          
          // Ensure the object is visible
          fabricObject.visible = true;
          
          // Mark as remote action to avoid infinite loop
          fabricObject.remoteAction = true;
          
          // Log canvas state before adding object
          console.log('[Whiteboard] Canvas state before adding object:', {
            width: canvas.width,
            height: canvas.height,
            zoom: canvas.getZoom(),
            viewport: canvas.viewportTransform
          });
          
          // Add the object to the canvas
          canvas.add(fabricObject);
          console.log('[Whiteboard] Object added to canvas, triggering render');
          
          // Log object position
          console.log('[Whiteboard] Added object position:', {
            left: fabricObject.left,
            top: fabricObject.top,
            width: fabricObject.width,
            height: fabricObject.height
          });
          
          // Force a complete re-render
          setTimeout(() => {
            canvas.renderAll();
            console.log('[Whiteboard] Canvas render completed');
            
            // Verify the object was added
            const objects = canvas.getObjects();
            console.log('[Whiteboard] Canvas objects after addition:', objects.length);
            if (objects.length > 0) {
              console.log('[Whiteboard] Last object in canvas:', objects[objects.length - 1]);
            }
            
            // Log successful addition
            console.log('[Whiteboard] Remote add action applied successfully:', { 
              objectType: fabricObject.type,
              objectId: fabricObject.id,
              canvasObjectsCount: canvas.getObjects().length
            });
            
            // Log the actual object that was added
            console.log('[Whiteboard] Added object details:', fabricObject);
          }, 0);
        } catch (error) {
          console.error('[Whiteboard] Error applying remote add action:', error);
          console.error('[Whiteboard] Object data that failed:', action.object);
        }
        break;
        
      case 'modify':
        try {
          // Validate object ID
          if (!action.objectId) {
            console.error('[Whiteboard] Missing objectId for modify action:', action);
            return;
          }
          
          const objectToModify = canvas.getObjectById(action.objectId);
          if (objectToModify) {
            // Mark as remote action to avoid infinite loop
            objectToModify.remoteAction = true;
            // Apply all properties from the action object
            objectToModify.set(action.object);
            canvas.renderAll();
            console.log('[Whiteboard] Remote modify action applied:', { objectId: action.objectId });
          } else {
            console.warn('[Whiteboard] Object to modify not found:', { objectId: action.objectId });
          }
        } catch (error) {
          console.error('[Whiteboard] Error applying remote modify action:', error);
          console.error('[Whiteboard] Action data that failed:', action);
        }
        break;
        
      case 'remove':
        try {
          // Validate object ID
          if (!action.objectId) {
            console.error('[Whiteboard] Missing objectId for remove action:', action);
            return;
          }
          
          const objectToRemove = canvas.getObjectById(action.objectId);
          if (objectToRemove) {
            // Mark as remote action to avoid infinite loop
            objectToRemove.remoteAction = true;
            canvas.remove(objectToRemove);
            canvas.renderAll();
            console.log('[Whiteboard] Remote remove action applied:', { objectId: action.objectId });
          } else {
            console.warn('[Whiteboard] Object to remove not found:', { objectId: action.objectId });
          }
        } catch (error) {
          console.error('[Whiteboard] Error applying remote remove action:', error);
          console.error('[Whiteboard] Action data that failed:', action);
        }
        break;
        
      default:
        console.warn('[Whiteboard] Unknown action type', { type: action.type });
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