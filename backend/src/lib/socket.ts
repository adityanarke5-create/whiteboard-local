import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DatabaseService } from '../services/database.service';

export type SocketServer = SocketIOServer;

let io: SocketIOServer | null = null;
const databaseService = new DatabaseService();

// Store board state temporarily for snapshot creation
const boardStates = new Map<string, string>();
// Track active users per board
const boardUserCounts = new Map<string, Set<string>>();

export function initSocketIO(httpServer: HttpServer): SocketIOServer {
  if (io) return io;
  
  console.log('[WebSocket] Initializing Socket.IO server');
  
  io = new SocketIOServer(httpServer, {
    cors: { origin: "*" },
    transports: ['websocket']
  });
  
  console.log('[WebSocket] Socket.IO server initialized with config:', {
    path: '/api/socketio',
    transports: ['websocket']
  });
  
  io.on('connection', (socket) => {
    console.log('[WebSocket] User connected:', { 
      socketId: socket.id,
      timestamp: new Date().toISOString()
    });
    
    // Add transport information for debugging
    console.log('[WebSocket] Connection transport:', {
      socketId: socket.id,
      transport: socket.conn.transport.name
    });
    
    // Log when the connection is established
    console.log('[WebSocket] Connection established successfully:', {
      socketId: socket.id,
      transport: socket.conn.transport.name,
      timestamp: new Date().toISOString()
    });
    
    // Listen for transport upgrades
    socket.conn.on('upgrade', (transport) => {
      console.log('[WebSocket] Transport upgraded:', {
        socketId: socket.id,
        transport: transport.name
      });
    });
    
    // Listen for transport errors
    socket.conn.on('packetCreate', (packet) => {
      // Only log for debugging purposes, not for every packet
      if (packet.type === 'error') {
        console.log('[WebSocket] Packet creation error:', {
          socketId: socket.id,
          packet
        });
      }
    });
    
    socket.on('join-board', async (boardId) => {
      console.log('[WebSocket] User joining board:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
      
      socket.join(boardId);
      
      // Track user in board
      if (!boardUserCounts.has(boardId)) {
        boardUserCounts.set(boardId, new Set());
      }
      boardUserCounts.get(boardId)!.add(socket.id);
      
      console.log(`[WebSocket] User ${socket.id} joined board ${boardId}. Active users: ${boardUserCounts.get(boardId)!.size}`);
      
      // Log the join event
      console.log('[WebSocket] Board join event processed:', {
        socketId: socket.id,
        boardId: boardId,
        userCount: boardUserCounts.get(boardId)!.size,
        timestamp: new Date().toISOString()
      });
      
      // Fetch the latest snapshot for this board and send it to the user
      try {
        const latestSnapshot = await databaseService.getLatestSnapshotByBoardId(boardId);
        if (latestSnapshot) {
          console.log(`[WebSocket] Sending latest snapshot to user ${socket.id}`, {
            dataSize: latestSnapshot.data?.length,
            timestamp: latestSnapshot.timestamp
          });
          socket.emit('board-snapshot', { 
            data: latestSnapshot.data,
            timestamp: latestSnapshot.timestamp
          });
        } else {
          console.log(`[WebSocket] No snapshot found for board ${boardId}, sending empty board state`);
          socket.emit('board-snapshot', { 
            data: '{"objects":[],"background":"#f8fafc"}',
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('[WebSocket] Error fetching board snapshot:', error);
        // Send empty board state as fallback
        socket.emit('board-snapshot', { 
          data: '{"objects":[],"background":"#f8fafc"}',
          timestamp: new Date().toISOString()
        });
      }
      
      // Emit confirmation back to client
      socket.emit('board-joined', { boardId, socketId: socket.id });
      console.log('[WebSocket] Board joined confirmation sent:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
    });
    
    socket.on('leave-board', async (boardId) => {
      console.log('[WebSocket] User leaving board:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
      
      socket.leave(boardId);
      
      // Remove user from board tracking
      if (boardUserCounts.has(boardId)) {
        boardUserCounts.get(boardId)!.delete(socket.id);
        console.log(`[WebSocket] User ${socket.id} left board ${boardId}. Active users: ${boardUserCounts.get(boardId)!.size}`);
        
        // Log the leave event
        console.log('[WebSocket] Board leave event processed:', {
          socketId: socket.id,
          boardId: boardId,
          remainingUserCount: boardUserCounts.get(boardId)!.size,
          timestamp: new Date().toISOString()
        });
        
        // If no more users on this board, save the final snapshot
        if (boardUserCounts.get(boardId)!.size === 0) {
          console.log(`[WebSocket] No more users on board ${boardId}. Saving final snapshot.`);
          
          // Check if we have a board state to save
          if (boardStates.has(boardId)) {
            try {
              const boardState = boardStates.get(boardId)!;
              
              // Delete any existing snapshots for this board
              await databaseService.deleteSnapshotsByBoardId(boardId);
              
              // Create new snapshot with the final board state
              const snapshot = await databaseService.createSnapshot({
                boardId,
                data: boardState,
              });
              
              console.log('[WebSocket] Final snapshot saved for board:', { 
                boardId,
                snapshotId: snapshot.id,
                timestamp: new Date().toISOString()
              });
              
              // Clean up old actions before the latest snapshot to reduce storage overhead
              try {
                // Add a small delay to ensure snapshot is fully committed before cleanup
                await new Promise(resolve => setTimeout(resolve, 100));
                const deletedCount = await databaseService.cleanupActionsBeforeLatestSnapshot(boardId);
                console.log('[WebSocket] Cleaned up old actions:', { 
                  boardId,
                  deletedCount,
                  timestamp: new Date().toISOString()
                });
              } catch (cleanupError) {
                console.error('[WebSocket] Error cleaning up old actions:', cleanupError);
              }
              
              // Clean up the temporary board state
              boardStates.delete(boardId);
            } catch (error) {
              console.error('[WebSocket] Error saving final snapshot:', error);
            }
          } else {
            console.log(`[WebSocket] No board state to save for board ${boardId}`);
          }
          
          // Clean up the user tracking for this board
          boardUserCounts.delete(boardId);
        }
      }
      
      // Emit confirmation back to client
      socket.emit('board-left', { boardId, socketId: socket.id });
      console.log('[WebSocket] Board left confirmation sent:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
    });
    
    // Handle individual canvas actions (drawing, adding objects, etc.)
    socket.on('canvas-action', async (data) => {
      const { boardId, action, userId: cognitoUserId } = data;
      
      if (!boardId || !action || !cognitoUserId) return;
      
      // Generate server-side ID for new objects to ensure consistency
      if (action.type === 'object:added' && action.object && !action.object.id) {
        action.object.id = require('crypto').randomUUID();
      }
      
      // Broadcast to OTHER users only (exclude sender)
      socket.to(boardId).emit('canvas-action', { action, userId: cognitoUserId });
      console.log('Broadcasted action to others:', action.type, action.object?.id || action.objectId);
      
      // Store in database async
      setImmediate(async () => {
        try {
          let databaseUserId = cognitoUserId;
          const user = await databaseService.getUserByCognitoId(cognitoUserId);
          if (user) databaseUserId = user.id;
          
          await databaseService.createAction({
            boardId,
            userId: databaseUserId,
            actionType: action.type || 'modify',
            objectId: action.objectId || action.object?.id,
            action: JSON.stringify(action)
          });
        } catch (error) {
          console.error('Error saving action:', error);
        }
      });
    });
    
    // Handle full canvas state updates (for snapshots)
    socket.on('canvas-update', async (data) => {
      const { boardId, canvasData, userId: cognitoUserId } = data;
      
      if (!boardId || !canvasData || !cognitoUserId) return;
      
      // Store state and broadcast immediately
      boardStates.set(boardId, canvasData);
      socket.to(boardId).emit('canvas-state', canvasData);
      console.log('Broadcasted canvas state');
    });
    
    socket.on('update-board-state', (data) => {
      // Remove logging for board state updates
      const { boardId, state } = data;
      
      // Store the current board state for potential snapshot saving
      if (boardId && state) {
        boardStates.set(boardId, state);
      }
    });
    
    socket.on('request-board-state', async (boardId) => {
      // Remove logging for board state requests
      // Fetch the latest snapshot for this board and send it to the user
      try {
        const latestSnapshot = await databaseService.getLatestSnapshotByBoardId(boardId);
        if (latestSnapshot) {
          socket.emit('board-snapshot', { 
            data: latestSnapshot.data,
            timestamp: latestSnapshot.timestamp
          });
        } else {
          socket.emit('board-snapshot', { 
            data: '{"objects":[],"background":"#f8fafc"}',
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('[WebSocket] Error fetching board snapshot:', error);
        // Send empty board state as fallback
        socket.emit('board-snapshot', { 
          data: '{"objects":[],"background":"#f8fafc"}',
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Handle cursor movement for real-time collaboration
    socket.on('cursor-move', (data) => {
      const { boardId, userId, x, y, userName, userColor } = data;
      
      if (!boardId || !userId || x === undefined || y === undefined) {
        return;
      }
      
      socket.to(boardId).emit('cursor-update', { 
        userId, 
        x, 
        y, 
        userName: userName || userId,
        userColor: userColor || '#3B82F6',
        socketId: socket.id
      });
    });
    
    // Handle user selection changes
    socket.on('selection-change', (data) => {
      const { boardId, userId, selectedObjects } = data;
      
      if (!boardId || !userId) {
        return;
      }
      
      // Broadcast selection to all other users in the same board
      socket.to(boardId).emit('selection-update', { 
        userId, 
        selectedObjects: selectedObjects || [],
        socketId: socket.id
      });
    });
    
    // Handle typing indicators for text objects
    socket.on('typing-start', (data) => {
      const { boardId, userId, objectId } = data;
      
      if (!boardId || !userId || !objectId) {
        return;
      }
      
      socket.to(boardId).emit('typing-indicator', { 
        userId, 
        objectId, 
        isTyping: true,
        socketId: socket.id
      });
    });
    
    socket.on('typing-stop', (data) => {
      const { boardId, userId, objectId } = data;
      
      if (!boardId || !userId || !objectId) {
        return;
      }
      
      socket.to(boardId).emit('typing-indicator', { 
        userId, 
        objectId, 
        isTyping: false,
        socketId: socket.id
      });
    });
    
    // Log when the socket is disconnected
    socket.on('disconnect', (reason) => {
      console.log('[WebSocket] User disconnected:', {
        socketId: socket.id,
        reason: reason
      });
      
      // Handle cleanup for all boards this user was in
      for (const [boardId, users] of boardUserCounts.entries()) {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          console.log(`[WebSocket] User ${socket.id} disconnected from board ${boardId}. Active users: ${users.size}`);
          
          // Notify other users in the same board that this user has disconnected
          socket.to(boardId).emit('user-disconnected', { 
            userId: socket.id,
            boardId
          });
          console.log(`[WebSocket] Broadcasted user-disconnected event for user ${socket.id} to board ${boardId}`);
          
          // If no more users on this board, save the final snapshot
          if (users.size === 0) {
            console.log(`[WebSocket] No more users on board ${boardId} after disconnect. Saving final snapshot.`);
            
            // Check if we have a board state to save
            if (boardStates.has(boardId)) {
              // We'll save the snapshot asynchronously without blocking
              saveFinalSnapshot(boardId, boardStates.get(boardId)!);
              
              // Clean up the temporary board state
              boardStates.delete(boardId);
            } else {
              console.log(`[WebSocket] No board state to save for board ${boardId}`);
            }
            
            // Clean up the user tracking for this board
            boardUserCounts.delete(boardId);
          }
        }
      }
    });
    
    // Handle ping for connectivity testing
    socket.on('ping', (data) => {
      console.log('[WebSocket] Received ping from client:', {
        socketId: socket.id,
        data
      });
      socket.emit('pong', { ...data, serverTimestamp: Date.now() });
    });
    
    // Log important events only
    socket.onAny((eventName, ...args) => {
      if (['canvas-action', 'canvas-update', 'join-board', 'leave-board'].includes(eventName)) {
        console.log(`[WebSocket] ${eventName}:`, { socketId: socket.id });
      }
    });
    
    // Log socket errors
    socket.on('error', (error) => {
      console.error('[WebSocket] Socket error:', { 
        socketId: socket.id,
        error,
        timestamp: new Date().toISOString()
      });
    });
  });
  
  // Log server-level events
  io.engine.on('connection_error', (error) => {
    console.error('[WebSocket] Connection error:', { 
      error,
      timestamp: new Date().toISOString()
    });
  });
  
  // Log transport upgrades on the engine level
  io.engine.on('upgrade', (transport) => {
    console.log('[WebSocket] Engine transport upgraded:', {
      transport: transport.name,
      timestamp: new Date().toISOString()
    });
  });
  
  // Log initial transport
  io.engine.on('initial_headers', (headers, req) => {
    console.log('[WebSocket] Initial connection headers:', {
      transport: req._query?.transport,
      timestamp: new Date().toISOString()
    });
  });
  
  return io;
}

// Helper function to save final snapshot asynchronously
async function saveFinalSnapshot(boardId: string, boardState: string) {
  try {
    // Delete any existing snapshots for this board
    await databaseService.deleteSnapshotsByBoardId(boardId);
    
    // Create new snapshot with the final board state
    const snapshot = await databaseService.createSnapshot({
      boardId,
      data: boardState,
    });
    
    console.log('[WebSocket] Final snapshot saved for board (async):', { 
      boardId,
      snapshotId: snapshot.id,
      timestamp: new Date().toISOString()
    });
    
    // Clean up old actions before the latest snapshot to reduce storage overhead
    try {
      // Add a small delay to ensure snapshot is fully committed before cleanup
      await new Promise(resolve => setTimeout(resolve, 100));
      const deletedCount = await databaseService.cleanupActionsBeforeLatestSnapshot(boardId);
      console.log('[WebSocket] Cleaned up old actions (async):', { 
        boardId,
        deletedCount,
        timestamp: new Date().toISOString()
      });
    } catch (cleanupError) {
      console.error('[WebSocket] Error cleaning up old actions (async):', cleanupError);
    }
  } catch (error) {
    console.error('[WebSocket] Error saving final snapshot (async):', error);
  }
}

export function getIO(): SocketIOServer | null {
  return io;
}