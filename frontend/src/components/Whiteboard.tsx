// 'use client';

// import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { AuthService } from '@/lib/auth-service';

// // Backend API base URL - using the dedicated backend server port
// const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
// console.log('[WebSocket] Backend URL:', BACKEND_API_BASE_URL);

// // Declare fabric as a global variable since we'll load it dynamically
// declare global {
//   interface Window {
//     fabric: any;
//   }
// }

// interface WhiteboardProps {
//   boardId: string;
//   userId: string;
//   activeTool?: string;
//   strokeColor?: string;
//   strokeWidth?: number;
//   onReady?: () => void;
// }

// export type WhiteboardHandle = {
//   clearCanvas: () => void;
//   setBackgroundColor: (color: string) => void;
//   setDrawingMode: (mode: boolean) => void;
//   setFreeDrawingBrush: (color: string, width: number) => void;
//   addShape: (shapeType: string, options?: any) => any;
//   exportAs: (format: string) => string | null;
//   loadFromJSON: (json: string) => void;
//   // Add new methods for pan and zoom
//   zoomIn: () => void;
//   zoomOut: () => void;
//   resetZoom: () => void;
//   pan: (deltaX: number, deltaY: number) => void;
// };

// const Whiteboard = forwardRef<WhiteboardHandle, WhiteboardProps>(({ 
//   boardId, 
//   userId, 
//   activeTool = 'select', 
//   strokeColor = '#000000', 
//   strokeWidth = 2,
//   onReady 
// }, ref) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fabricRef = useRef<any>(null);
//   const [fabricLoaded, setFabricLoaded] = useState(false);
//   const socketRef = useRef<Socket | null>(null);
//   const isDrawingRef = useRef(false);
//   const syncingRef = useRef(false);
//   const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const stateUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  

  
//   // Refs to avoid stale closure issues
//   const toolRef = useRef(activeTool);
//   const colorRef = useRef(strokeColor);
//   const widthRef = useRef(strokeWidth);

//   // Update refs whenever props change
//   useEffect(() => {
//     toolRef.current = activeTool;
//     colorRef.current = strokeColor;
//     widthRef.current = strokeWidth;
//   }, [activeTool, strokeColor, strokeWidth]);

//   // Load fabric.js dynamically
//   useEffect(() => {
//     const loadFabric = async () => {
//       if (typeof window !== 'undefined') {
//         // @ts-ignore
//         const fabricModule = await import('fabric').then(mod => mod.fabric || mod.default || mod);
//         window.fabric = fabricModule;
//         setFabricLoaded(true);
        
//         if (onReady) {
//           onReady();
//         }
//       }
//     };

//     loadFabric();
//   }, [onReady]);

//   // Initialize Socket.io connection
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       console.log('[WebSocket] Initializing connection to:', BACKEND_API_BASE_URL);
//       const socket = io(BACKEND_API_BASE_URL, {
//         transports: ['websocket']
//       });
      
//       console.log('[WebSocket] Socket instance created:', {
//         id: socket.id,
//         connected: socket.connected
//       });
      
//       socketRef.current = socket;
      
//       // Add connection event listeners for debugging
//       socket.on('connect', () => {
//         console.log('[WebSocket] Connected to server:', { 
//           socketId: socket.id,
//           transport: socket.io.engine.transport.name,
//           connected: socket.connected,
//           boardId: boardId,
//           userId: userId
//         });
        
//         // Verify that we're using WebSocket transport
//         if (socket.io.engine.transport.name !== 'websocket') {
//           console.warn('[WebSocket] WARNING: Not using WebSocket transport!', {
//             transport: socket.io.engine.transport.name
//           });
//         } else {
//           console.log('[WebSocket] CONFIRMED: Using WebSocket transport');
//         }
        
//         // Join the board room when connected
//         console.log('[WebSocket] Joining board:', boardId);
//         socket.emit('join-board', boardId);
        
//         // Test connectivity by sending a ping
//         setTimeout(() => {
//           console.log('[WebSocket] Testing connectivity with ping');
//           socket.emit('ping', { boardId, userId, timestamp: Date.now() });
//         }, 1000);
//       });
      
//       socket.on('connect_error', (error) => {
//         console.error('[WebSocket] Connection error:', error);
//         console.error('[WebSocket] Error details:', {
//           message: error.message,
//           stack: error.stack,
//           name: error.name,
//           type: error.constructor.name
//         });
        
//         // Try to reconnect manually after a delay
//         setTimeout(() => {
//           if (socket && !socket.connected) {
//             console.log('[WebSocket] Attempting manual reconnection...');
//             socket.connect();
//           }
//         }, 3000);
//       });
      
//       socket.on('disconnect', (reason) => {
//         console.log('[WebSocket] Disconnected from server:', { 
//           reason,
//           connected: socket.connected
//         });
//       });
      
//       // Add transport upgrade event listener
//       socket.io.engine.on('upgrade', () => {
//         console.log('[WebSocket] Transport upgraded:', socket.io.engine.transport.name);
//       });
      
//       // Add packet event listeners for debugging
//       socket.on('connect', () => {
//         console.log('[WebSocket] Successfully connected with transport:', socket.io.engine.transport.name);
//       });
      
//       // Log connection state changes
//       socket.on('connect', () => {
//         console.log('[WebSocket] Connection state: CONNECTED');
//       });
      
//       socket.on('disconnect', () => {
//         console.log('[WebSocket] Connection state: DISCONNECTED');
//       });
      
//       socket.on('connect_error', () => {
//         console.log('[WebSocket] Connection state: CONNECTION_ERROR');
//       });
      
//       // Listen for board join confirmation
//       socket.on('board-joined', (data) => {
//         console.log('[WebSocket] Board joined confirmation received:', data);
//       });
      
//       // Listen for board leave confirmation
//       socket.on('board-left', (data) => {
//         console.log('[WebSocket] Board left confirmation received:', data);
//       });
      

      
//       // Listen for complete board state from the server
//       socket.on('board-snapshot', (data) => {
//         console.log('[WebSocket] Received board snapshot');
//         if (fabricRef.current) {
//           syncingRef.current = true;
//           fabricRef.current.loadFromJSON(data.data, () => {
//             fabricRef.current.renderAll();
//             syncingRef.current = false;
//           });
//         }
//       });
      
//       // Listen for canvas state updates from other users
//       socket.on('canvas-state', (canvasData) => {
//         console.log('[WebSocket] Received canvas state update');
//         if (fabricRef.current && !syncingRef.current) {
//           syncingRef.current = true;
//           fabricRef.current.loadFromJSON(canvasData, () => {
//             fabricRef.current.renderAll();
//             syncingRef.current = false;
//           });
//         }
//       });
      
//       // Listen for individual canvas actions from other users
//       socket.on('canvas-action', (data) => {
//         console.log('Received canvas action:', data.action?.type);
//         if (fabricRef.current && !syncingRef.current && data.userId !== userId) {
//           const { action } = data;
//           syncingRef.current = true;
          
//           if (action.type === 'object:added' && action.object) {
//             window.fabric.util.enlivenObjects([action.object], (objects: any[]) => {
//               if (objects && objects[0]) {
//                 const obj = objects[0];
//                 obj.remoteAction = true;
//                 fabricRef.current.add(obj);
//                 fabricRef.current.renderAll();
//               }
//               syncingRef.current = false;
//             });
//           } else if (action.type === 'object:modified' && action.object) {
//             const existingObj = fabricRef.current.getObjectById(action.object.id);
//             if (existingObj) {
//               existingObj.set(action.object);
//               existingObj.setCoords();
//               fabricRef.current.renderAll();
//             }
//             syncingRef.current = false;
//           } else if (action.type === 'object:removed' && action.objectId) {
//             const objToRemove = fabricRef.current.getObjectById(action.objectId);
//             if (objToRemove) {
//               fabricRef.current.remove(objToRemove);
//               fabricRef.current.renderAll();
//             }
//             syncingRef.current = false;
//           } else {
//             syncingRef.current = false;
//           }
//         }
//       });
      
//       // Listen for cursor updates from other users
//       socket.on('cursor-update', (data) => {
//         if (data.userId !== userId) {
//           // Handle cursor visualization for other users (silent)
//         }
//       });
      
//       // Log important events only
//       socket.onAny((eventName, ...args) => {
//         if (['canvas-action', 'canvas-state', 'board-snapshot', 'board-joined'].includes(eventName)) {
//           console.log(`[WebSocket] ${eventName}`);
//         }
//       });
      
//       // Add a pong handler for connectivity testing
//       socket.on('pong', (data) => {
//         console.log('[WebSocket] Received pong:', data);
//       });
      
//       // Periodically check connection status
//       // const connectionCheckInterval = setInterval(() => {
//       //   if (socket) {
//       //     // Only log connection status occasionally to reduce noise
//       //     if (Math.random() < 0.1) { // Log 10% of checks
//       //       console.log('[WebSocket] Connection status check:', {
//       //         connected: socket.connected,
//       //         transport: socket.connected ? socket.io.engine.transport.name : 'disconnected'
//       //       });
//       //     }
//       //   }
//       // }, 10000); // Check every 10 seconds
      
//       // Cleanup
//       return () => {
//         // Clear the connection check interval
//         // clearInterval(connectionCheckInterval);
        
//         // Clear the state update interval
//         if (stateUpdateIntervalRef.current) {
//           clearInterval(stateUpdateIntervalRef.current);
//         }
        
//         // Send current board state before leaving
//         if (fabricRef.current && socketRef.current) {
//           const boardState = JSON.stringify(fabricRef.current.toJSON());
//           socketRef.current.emit('update-board-state', {
//             boardId,
//             state: boardState
//           });
//         }
        
//         socketRef.current?.emit('leave-board', boardId);
//         socketRef.current?.disconnect();
//       };
//     }
//   }, [boardId, userId]);

//   // Initialize canvas when fabric is loaded
//   useEffect(() => {
//     if (fabricLoaded && canvasRef.current) {
//       // Initialize Fabric canvas
//       const canvas = new window.fabric.Canvas(canvasRef.current, {
//         width: window.innerWidth,
//         height: window.innerHeight - 120, // Adjust for header and toolbar height
//         backgroundColor: '#f8fafc',
//         selection: true,
//       });

//       fabricRef.current = canvas;

//       // Add getObjectById method to Fabric canvas prototype if not already present
//       if (!window.fabric.Canvas.prototype.getObjectById) {
//         window.fabric.Canvas.prototype.getObjectById = function(id: string) {
//           return this.getObjects().find((obj: any) => obj.id === id);
//         };
//       }
      
//       // Also add it to the current canvas instance to be safe
//       if (!canvas.getObjectById) {
//         canvas.getObjectById = function(id: string) {
//           return this.getObjects().find((obj: any) => obj.id === id);
//         };
//       }

//       // Periodically send board state updates to backend (every 30 seconds)
//       stateUpdateIntervalRef.current = setInterval(() => {
//         if (fabricRef.current && socketRef.current) {
//           const boardState = JSON.stringify(fabricRef.current.toJSON());
//           socketRef.current.emit('update-board-state', {
//             boardId,
//             state: boardState
//           });
//         }
//       }, 30000); // 30 seconds

//       // Set up pan and zoom functionality
//       canvas.on('mouse:wheel', function(opt: any) {
//         const delta = opt.e.deltaY;
//         let zoom = canvas.getZoom();
//         zoom *= 0.999 ** delta;
//         if (zoom > 20) zoom = 20;
//         if (zoom < 0.01) zoom = 0.01;
//         canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//         opt.e.preventDefault();
//         opt.e.stopPropagation();
//       });

//       // Set up panning
//       canvas.on('mouse:down', function(opt: any) {
//         const evt = opt.e;
//         // Check if pan tool is active
//         if (toolRef.current === 'pan' || evt.altKey === true) {
//           canvas.isDragging = true;
//           canvas.selection = false;
//           canvas.defaultCursor = 'grabbing';
//           canvas.lastPosX = evt.clientX;
//           canvas.lastPosY = evt.clientY;
//         } else {
//           isDrawingRef.current = true;
//           handleMouseDown(opt);
//         }
//       });

//       canvas.on('mouse:move', function(opt: any) {
//         // Handle panning
//         if (canvas.isDragging) {
//           const e = opt.e;
//           const vpt = canvas.viewportTransform;
//           if (vpt) {
//             vpt[4] += e.clientX - canvas.lastPosX;
//             vpt[5] += e.clientY - canvas.lastPosY;
//             canvas.requestRenderAll();
//             canvas.lastPosX = e.clientX;
//             canvas.lastPosY = e.clientY;
//           }
//         } else if (isDrawingRef.current) {
//           // Handle mouse move for shape tools
//           handleMouseMove(opt);
//         } else {
//           // Minimal cursor tracking (no logs)
//           if (socketRef.current && boardId && lastPointRef.current) {
//             const pointer = canvas.getPointer(opt.e);
//             const distance = Math.sqrt(
//               Math.pow(pointer.x - lastPointRef.current.x, 2) + 
//               Math.pow(pointer.y - lastPointRef.current.y, 2)
//             );
            
//             if (distance >= 10) { // Reduced frequency
//               socketRef.current.emit('cursor-move', {
//                 boardId, userId, x: pointer.x, y: pointer.y
//               });
//               lastPointRef.current = { x: pointer.x, y: pointer.y };
//             }
//           }
//         }
//       });

//       canvas.on('mouse:up', function(opt: any) {
//         if (canvas.isDragging) {
//           canvas.setViewportTransform(canvas.viewportTransform);
//           canvas.isDragging = false;
//           canvas.selection = toolRef.current === 'select';
//           canvas.defaultCursor = 'grab';
//         } else {
//           isDrawingRef.current = false;
//           handleMouseUp();
//         }
//       });

//       // Send individual actions for real-time collaboration
//       const sendCanvasAction = (actionType: string, target?: any) => {
//         if (socketRef.current && !syncingRef.current && socketRef.current.connected) {
//           const action: any = {
//             type: actionType,
//             timestamp: Date.now()
//           };
          
//           if (target) {
//             if (actionType === 'object:removed') {
//               action.objectId = target.id;
//             } else {
//               action.object = target.toObject ? target.toObject() : target;
//               if (action.object) {
//                 action.object.id = target.id;
//               }
//             }
//           }
          
//           console.log('[Action] Sending:', actionType);
//           socketRef.current.emit('canvas-action', {
//             boardId,
//             action,
//             userId
//           });
//         }
//       };
      
//       // Throttled full canvas state synchronization (fallback)
//       let syncTimeout: NodeJS.Timeout | null = null;
//       const syncCanvas = () => {
//         if (socketRef.current && !syncingRef.current) {
//           if (syncTimeout) clearTimeout(syncTimeout);
//           syncTimeout = setTimeout(() => {
//             const canvasData = JSON.stringify(canvas.toJSON());
//             socketRef.current?.emit('canvas-update', {
//               boardId,
//               canvasData,
//               userId
//             });
//           }, 500); // Slower fallback sync
//         }
//       };
      

      
//       // Real-time collaboration events
//       canvas.on('object:added', (options: any) => {
//         if (!options.target.id) {
//           options.target.id = crypto.randomUUID();
//         }
//         if (!options.target.remoteAction && !syncingRef.current && socketRef.current?.connected) {
//           console.log('Sending object:added');
//           sendCanvasAction('object:added', options.target);
//         }
//       });
      
//       canvas.on('object:modified', (options: any) => {
//         if (!options.target.remoteAction && !syncingRef.current && socketRef.current?.connected) {
//           console.log('Sending object:modified');
//           sendCanvasAction('object:modified', options.target);
//         }
//       });
      
//       canvas.on('object:removed', (options: any) => {
//         if (!options.target.remoteAction && !syncingRef.current && socketRef.current?.connected) {
//           console.log('Sending object:removed');
//           sendCanvasAction('object:removed', options.target);
//         }
//       });
      
//       canvas.on('path:created', (options: any) => {
//         if (!syncingRef.current && socketRef.current?.connected) {
//           const path = options.path;
//           if (!path.id) {
//             path.id = crypto.randomUUID();
//           }
//           console.log('Sending path:created');
//           sendCanvasAction('object:added', path);
//         }
//       });
      
//       // Send drawing actions immediately
//       canvas.on('mouse:up', () => {
//         if (activeTool === 'pen' && !syncingRef.current && socketRef.current?.connected) {
//           setTimeout(() => {
//             const canvasData = JSON.stringify(canvas.toJSON());
//             socketRef.current?.emit('canvas-update', {
//               boardId,
//               canvasData,
//               userId
//             });
//           }, 100);
//         }
//       });
      
//       // Send selection changes for collaboration
//       canvas.on('selection:created', (options: any) => {
//         if (socketRef.current && !syncingRef.current) {
//           const selectedObjects = options.selected?.map((obj: any) => obj.id) || [];
//           socketRef.current.emit('selection-change', {
//             boardId,
//             userId,
//             selectedObjects
//           });
//         }
//       });
      
//       canvas.on('selection:updated', (options: any) => {
//         if (socketRef.current && !syncingRef.current) {
//           const selectedObjects = options.selected?.map((obj: any) => obj.id) || [];
//           socketRef.current.emit('selection-change', {
//             boardId,
//             userId,
//             selectedObjects
//           });
//         }
//       });
      
//       canvas.on('selection:cleared', () => {
//         if (socketRef.current && !syncingRef.current) {
//           socketRef.current.emit('selection-change', {
//             boardId,
//             userId,
//             selectedObjects: []
//           });
//         }
//       });

//       // Handle window resize
//       const handleResize = () => {
//         if (canvasRef.current && fabricRef.current) {
//           fabricRef.current.setDimensions({
//             width: window.innerWidth,
//             height: window.innerHeight - 120,
//           });
//         }
//       };

//       window.addEventListener('resize', handleResize);

//       // Cleanup
//       return () => {
//         window.removeEventListener('resize', handleResize);
//         if (fabricRef.current) {
//           fabricRef.current.dispose();
//         }
//         // Clear the state update interval
//         if (stateUpdateIntervalRef.current) {
//           clearInterval(stateUpdateIntervalRef.current);
//         }
//       };
//     }
//   }, [fabricLoaded, boardId, userId]);

//   // Update canvas settings when props change
//   useEffect(() => {
//     if (!fabricRef.current) {
//       return;
//     }
    
//     const canvas = fabricRef.current;
    
//     // Update drawing mode based on active tool
//     if (activeTool === 'pen') {
//       canvas.isDrawingMode = true;
//       canvas.freeDrawingBrush = new window.fabric.PencilBrush(canvas);
//       canvas.freeDrawingBrush.color = strokeColor;
//       canvas.freeDrawingBrush.width = strokeWidth;
//     } else if (activeTool === 'eraser') {
//       canvas.isDrawingMode = true;
//       // Set up eraser brush
//       if (window.fabric.EraserBrush) {
//         canvas.freeDrawingBrush = new window.fabric.EraserBrush(canvas);
//       } else {
//         // Fallback: use regular pencil brush with background color
//         canvas.freeDrawingBrush = new window.fabric.PencilBrush(canvas);
//         canvas.freeDrawingBrush.color = '#f8fafc';
//       }
//       canvas.freeDrawingBrush.width = strokeWidth;
//     } else {
//       // For all other tools (select, shapes, pan), disable drawing mode
//       canvas.isDrawingMode = false;
//     }
    
//     // Update selection based on active tool
//     canvas.selection = activeTool === 'select';
    
//     // Handle pan tool
//     if (activeTool === 'pan') {
//       canvas.defaultCursor = 'grab';
//       canvas.selection = false;
//     } else {
//       canvas.defaultCursor = 'default';
//     }
//   }, [activeTool, strokeColor, strokeWidth]);

//   // Ref to track if we're currently drawing a shape
//   const isDrawingShapeRef = useRef(false);
  
//   // Ref to track the current shape being drawn
//   const currentDrawingShapeRef = useRef<any>(null);
  
//   // Refs for smoothing effect
//   const lastPointRef = useRef<{x: number, y: number} | null>(null);
//   const smoothingThresholdRef = useRef(2); // Minimum distance for point to be considered

//   // Handle mouse down events
//   const handleMouseDown = (options: any) => {
//     if (!fabricRef.current) return;
    
//     const canvas = fabricRef.current;
    
//     // Use refs to get the latest values
//     const tool = toolRef.current;
//     const color = colorRef.current;
//     const width = widthRef.current;
    
//     // Handle eraser tool
//     if (tool === 'eraser') {
//       // The eraser brush is handled by Fabric's drawing mode
//       console.log('[Whiteboard] Eraser tool activated');
//       return;
//     }
    
//     // Handle selection tool for object deletion
//     if (tool === 'select') {
//       // Check if we're clicking on an object to potentially delete it
//       const pointer = canvas.getPointer(options.e);
//       const clickedObject = canvas.findTarget(options.e, false);
      
//       if (clickedObject && options.e.shiftKey) {
//         // If Shift key is pressed while clicking on an object, delete it
//         console.log('[Whiteboard] Deleting object with Shift+Click', { objectId: clickedObject.id });
//         canvas.remove(clickedObject);
//         canvas.requestRenderAll();
//         return;
//       }
//     }
    
//     // Handle shape creation tools
//     if (['rectangle', 'circle', 'line', 'text'].includes(tool)) {
//       let shape;
      
//       switch (tool) {
//         case 'rectangle':
//           shape = new window.fabric.Rect({
//             left: options.pointer.x,
//             top: options.pointer.y,
//             width: 1,
//             height: 1,
//             fill: 'transparent',
//             stroke: color,
//             strokeWidth: width,
//           });
//           break;
//         case 'circle':
//           shape = new window.fabric.Circle({
//             left: options.pointer.x,
//             top: options.pointer.y,
//             radius: 1,
//             fill: 'transparent',
//             stroke: color,
//             strokeWidth: width,
//           });
//           break;
//         case 'line':
//           shape = new window.fabric.Line([
//             options.pointer.x, 
//             options.pointer.y, 
//             options.pointer.x, 
//             options.pointer.y
//           ], {
//             stroke: color,
//             strokeWidth: width,
//           });
//           break;
//         case 'text':
//           shape = new window.fabric.Textbox('Text', {
//             left: options.pointer.x,
//             top: options.pointer.y,
//             fill: color,
//             fontSize: 20,
//             width: 150,
//           });
//           break;
//       }
      
//       if (shape) {
//         // Assign a unique ID to the shape
//         shape.id = crypto.randomUUID();
//         // Mark that we're drawing a shape
//         isDrawingShapeRef.current = true;
//         currentDrawingShapeRef.current = shape;
//         canvas.add(shape);
//         canvas.setActiveObject(shape);
//         console.log('[Whiteboard] Shape created and added to canvas, waiting for mouse up to send action');
//       }
//     }
//   };

//   // Handle mouse move events with smoothing
//   const handleMouseMove = (options: any) => {
//     if (!fabricRef.current) return;
    
//     const canvas = fabricRef.current;
//     const activeObject = canvas.getActiveObject();
    
//     // Use refs to get the latest values
//     const tool = toolRef.current;
    
//     // Only handle mouse move for shape tools
//     if (!activeObject || !['rectangle', 'circle', 'line'].includes(tool)) return;
    
//     const pointer = canvas.getPointer(options.e);
    
//     // Apply smoothing by checking distance from last point
//     if (lastPointRef.current) {
//       const distance = Math.sqrt(
//         Math.pow(pointer.x - lastPointRef.current.x, 2) + 
//         Math.pow(pointer.y - lastPointRef.current.y, 2)
//       );
      
//       // Only update if distance exceeds threshold for smoother drawing
//       if (distance < smoothingThresholdRef.current) {
//         return;
//       }
//     }
    
//     // Update last point
//     lastPointRef.current = { x: pointer.x, y: pointer.y };
    
//     switch (tool) {
//       case 'rectangle':
//         const width = pointer.x - activeObject.left;
//         const height = pointer.y - activeObject.top;
//         // Prevent negative dimensions
//         activeObject.set({
//           width: Math.abs(width),
//           height: Math.abs(height),
//           left: width < 0 ? pointer.x : activeObject.left,
//           top: height < 0 ? pointer.y : activeObject.top,
//         });
//         break;
//       case 'circle':
//         const radius = Math.sqrt(
//           Math.pow(pointer.x - activeObject.left, 2) + 
//           Math.pow(pointer.y - activeObject.top, 2)
//         );
//         activeObject.set({ radius });
//         break;
//       case 'line':
//         activeObject.set({ x2: pointer.x, y2: pointer.y });
//         break;
//     }
    
//     canvas.renderAll();
//   };

//   // Handle mouse up events
//   const handleMouseUp = () => {
//     lastPointRef.current = null;
    
//     if (isDrawingShapeRef.current && currentDrawingShapeRef.current) {
//       isDrawingShapeRef.current = false;
//       currentDrawingShapeRef.current = null;
//     }
//   };


  

  
//   // Add pan and zoom methods
//   const zoomIn = useCallback(() => {
//     if (!fabricRef.current) return;
//     const canvas = fabricRef.current;
//     let zoom = canvas.getZoom();
//     zoom *= 1.1;
//     if (zoom > 20) zoom = 20;
//     canvas.setZoom(zoom);
//     canvas.requestRenderAll();
//   }, []);

//   const zoomOut = useCallback(() => {
//     if (!fabricRef.current) return;
//     const canvas = fabricRef.current;
//     let zoom = canvas.getZoom();
//     zoom /= 1.1;
//     if (zoom < 0.01) zoom = 0.01;
//     canvas.setZoom(zoom);
//     canvas.requestRenderAll();
//   }, []);

//   const resetZoom = useCallback(() => {
//     if (!fabricRef.current) return;
//     const canvas = fabricRef.current;
//     canvas.setZoom(1);
//     canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
//     canvas.requestRenderAll();
//   }, []);

//   const pan = useCallback((deltaX: number, deltaY: number) => {
//     if (!fabricRef.current) return;
//     const canvas = fabricRef.current;
//     const vpt = canvas.viewportTransform;
//     if (vpt) {
//       vpt[4] += deltaX;
//       vpt[5] += deltaY;
//       canvas.setViewportTransform(vpt);
//       canvas.requestRenderAll();
//     }
//   }, []);

//   // Set up keyboard shortcuts for pan and zoom
//   useEffect(() => {
//     if (!fabricLoaded) return;

//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Handle object deletion with Delete key
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         if (fabricRef.current) {
//           const canvas = fabricRef.current;
//           const activeObject = canvas.getActiveObject();
//           const activeObjects = canvas.getActiveObjects();
          
//           if (activeObject || activeObjects.length > 0) {
//             console.log('[Whiteboard] Deleting selected objects', { 
//               activeObject: activeObject?.id,
//               activeObjectsCount: activeObjects.length
//             });
            
//             // Remove all active objects
//             activeObjects.forEach((obj: any) => {
//               canvas.remove(obj);
//             });
            
//             canvas.discardActiveObject();
//             canvas.requestRenderAll();
//             return;
//           }
//         }
//       }
      
//       // Pan with arrow keys (when holding Shift)
//       if (e.shiftKey && e.key === 'ArrowUp') {
//         pan(0, -10);
//       } else if (e.shiftKey && e.key === 'ArrowDown') {
//         pan(0, 10);
//       } else if (e.shiftKey && e.key === 'ArrowLeft') {
//         pan(-10, 0);
//       } else if (e.shiftKey && e.key === 'ArrowRight') {
//         pan(10, 0);
//       }
      
//       // Zoom with Ctrl+/Ctrl- keys
//       if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
//         zoomIn();
//       } else if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
//         zoomOut();
//       }
      
//       // Reset zoom with Ctrl+0 key
//       if (e.ctrlKey && e.key === '0') {
//         resetZoom();
//       }
      
//       // Switch tools with keyboard shortcuts
//       switch (e.key) {
//         case 'v': // V key for selection tool
//         case 'V':
//           if (toolRef.current !== 'select') {
//             console.log('[Whiteboard] Switching to selection tool with V key');
//             // We need to update the parent component's state, so we'll emit a custom event
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'select' }));
//           }
//           break;
//         case 'r': // R key for rectangle tool
//         case 'R':
//           if (toolRef.current !== 'rectangle') {
//             console.log('[Whiteboard] Switching to rectangle tool with R key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'rectangle' }));
//           }
//           break;
//         case 'c': // C key for circle tool
//         case 'C':
//           if (toolRef.current !== 'circle') {
//             console.log('[Whiteboard] Switching to circle tool with C key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'circle' }));
//           }
//           break;
//         case 'l': // L key for line tool
//         case 'L':
//           if (toolRef.current !== 'line') {
//             console.log('[Whiteboard] Switching to line tool with L key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'line' }));
//           }
//           break;
//         case 't': // T key for text tool
//         case 'T':
//           if (toolRef.current !== 'text') {
//             console.log('[Whiteboard] Switching to text tool with T key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'text' }));
//           }
//           break;
//         case 'p': // P key for pen tool
//         case 'P':
//           if (toolRef.current !== 'pen') {
//             console.log('[Whiteboard] Switching to pen tool with P key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'pen' }));
//           }
//           break;
//         case 'e': // E key for eraser tool
//         case 'E':
//           if (toolRef.current !== 'eraser') {
//             console.log('[Whiteboard] Switching to eraser tool with E key');
//             window.dispatchEvent(new CustomEvent('toolChange', { detail: 'eraser' }));
//           }
//           break;
//       }
//     };

//     // Add keyboard event listener
//     window.addEventListener('keydown', handleKeyDown);

//     // Cleanup
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [fabricLoaded, pan, zoomIn, zoomOut, resetZoom]);

//   // Expose methods to parent components
//   useImperativeHandle(ref, () => ({
//     clearCanvas: () => {
//       if (fabricRef.current) {
//         fabricRef.current.clear();
//       }
//     },
    
//     setBackgroundColor: (color: string) => {
//       if (fabricRef.current) {
//         fabricRef.current.setBackgroundColor(color, fabricRef.current.renderAll.bind(fabricRef.current));
//       }
//     },
    
//     setDrawingMode: (mode: boolean) => {
//       if (fabricRef.current) {
//         fabricRef.current.isDrawingMode = mode;
//       }
//     },
    
//     setFreeDrawingBrush: (color: string, width: number) => {
//       if (fabricRef.current && fabricRef.current.freeDrawingBrush) {
//         fabricRef.current.freeDrawingBrush.color = color;
//         fabricRef.current.freeDrawingBrush.width = width;
//       }
//     },
    
//     addShape: (shapeType: string, options: any = {}) => {
//       if (!fabricRef.current) return null;

//       const canvas = fabricRef.current;
//       const commonProps = {
//         left: options.left || 100,
//         top: options.top || 100,
//         fill: options.fill || 'transparent',
//         stroke: options.stroke || '#000000',
//         strokeWidth: options.strokeWidth || 2,
//       };

//       let shape;

//       switch (shapeType) {
//         case 'rectangle':
//           shape = new window.fabric.Rect({
//             ...commonProps,
//             width: options.width || 100,
//             height: options.height || 70,
//           });
//           break;
//         case 'circle':
//           shape = new window.fabric.Circle({
//             ...commonProps,
//             radius: options.radius || 50,
//           });
//           break;
//         case 'line':
//           shape = new window.fabric.Line(
//             [options.x1 || 50, options.y1 || 50, options.x2 || 150, options.y2 || 150],
//             {
//               ...commonProps,
//             }
//           );
//           break;
//         case 'text':
//           shape = new window.fabric.Textbox(options.text || 'Text', {
//             ...commonProps,
//             width: options.width || 150,
//             fontSize: options.fontSize || 20,
//           });
//           break;
//         default:
//           return null;
//       }

//       if (shape) {
//         shape.id = crypto.randomUUID();
//         canvas.add(shape);
//         canvas.setActiveObject(shape);
//       }
//       return shape;
//     },
    
//     exportAs: (format: string): string | null => {
//       if (!fabricRef.current) return null;

//       switch (format) {
//         case 'png':
//           return fabricRef.current.toDataURL({ format: 'png' });
//         case 'jpg':
//           return fabricRef.current.toDataURL({ format: 'jpeg' });
//         case 'svg':
//           return fabricRef.current.toSVG();
//         case 'json':
//           return JSON.stringify(fabricRef.current.toJSON());
//         default:
//           return null;
//       }
//     },
    
//     loadFromJSON: (json: string) => {
//       if (!fabricRef.current) return;
      
//       fabricRef.current.loadFromJSON(json, () => {
//         fabricRef.current.renderAll();
//       });
//     },
    
//     // Add new pan and zoom methods
//     zoomIn,
//     zoomOut,
//     resetZoom,
//     pan,
//   }));

//   return (
//     <div className="flex-1 overflow-hidden relative">
//       {!fabricLoaded ? (
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading canvas...</p>
//           </div>
//         </div>
//       ) : (
//         <canvas ref={canvasRef} className="absolute top-0 left-0" />
//       )}
//     </div>
//   );
// });

// Whiteboard.displayName = 'Whiteboard';

// export default Whiteboard;
