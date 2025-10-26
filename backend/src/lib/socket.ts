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
  
  io = new SocketIOServer(httpServer, {
    path: '/api/socketio',
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    console.log('[WebSocket] User connected:', { 
      socketId: socket.id,
      timestamp: new Date().toISOString()
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
      
      // Fetch the latest snapshot for this board and send it to the user
      try {
        const latestSnapshot = await databaseService.getLatestSnapshotByBoardId(boardId);
        if (latestSnapshot) {
          console.log(`[WebSocket] Sending latest snapshot to user ${socket.id}`);
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
    
    socket.on('canvas-action', async (data) => {
      const { boardId, action, userId } = data;
      console.log('[WebSocket] Received canvas-action:', { 
        socketId: socket.id,
        boardId,
        userId,
        actionType: action?.type,
        actionDetails: action,
        timestamp: new Date().toISOString()
      });
      
      // Validate required fields
      if (!boardId || !action || !userId) {
        console.error('[WebSocket] Invalid canvas-action data', { 
          boardId, 
          action, 
          userId,
          socketId: socket.id,
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      // Validate action structure
      if (!action.type) {
        console.error('[WebSocket] Invalid action structure - missing type', { 
          action,
          socketId: socket.id,
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      try {
        // Persist the action in the database
        const actionRecord = await databaseService.createAction({
          boardId,
          userId,
          action: JSON.stringify(action)
        });
        
        console.log('[WebSocket] Action persisted to database:', { 
          actionId: actionRecord.id,
          boardId,
          userId,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('[WebSocket] Error persisting action to database:', error);
      }
      
      // Broadcast to all other users in the same board
      const roomSize = io?.sockets.adapter.rooms.get(boardId)?.size || 0;
      console.log(`[WebSocket] Broadcasting canvas-update to board ${boardId} (room size: ${roomSize})`);
      socket.to(boardId).emit('canvas-update', { action, userId });
      console.log(`[WebSocket] Broadcasted canvas-update to board ${boardId} (excluding sender ${socket.id})`);
      
      // Send confirmation back to sender
      socket.emit('action-processed', { 
        actionType: action.type, 
        boardId, 
        userId,
        timestamp: new Date().toISOString()
      });
      console.log('[WebSocket] Action processed confirmation sent:', { 
        socketId: socket.id,
        boardId,
        userId,
        actionType: action.type,
        timestamp: new Date().toISOString()
      });
    });
    
    socket.on('update-board-state', (data) => {
      const { boardId, state } = data;
      console.log('[WebSocket] Received board state update:', { 
        socketId: socket.id,
        boardId,
        stateLength: state?.length,
        timestamp: new Date().toISOString()
      });
      
      // Store the current board state for potential snapshot saving
      if (boardId && state) {
        boardStates.set(boardId, state);
        console.log(`[WebSocket] Board state updated for board ${boardId}`);
      }
    });
    
    socket.on('request-board-state', async (boardId) => {
      console.log('[WebSocket] Board state requested:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
      
      // Fetch the latest snapshot for this board and send it to the user
      try {
        const latestSnapshot = await databaseService.getLatestSnapshotByBoardId(boardId);
        if (latestSnapshot) {
          console.log(`[WebSocket] Sending latest snapshot to user ${socket.id}`);
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
    });
    
    socket.on('cursor-move', (data) => {
      const { boardId, userId, x, y } = data;
      console.log('[WebSocket] Received cursor-move:', { 
        socketId: socket.id,
        boardId,
        userId,
        x,
        y,
        timestamp: new Date().toISOString()
      });
      
      // Validate required fields
      if (!boardId || !userId || x === undefined || y === undefined) {
        console.error('[WebSocket] Invalid cursor-move data', { 
          boardId, 
          userId, 
          x, 
          y,
          socketId: socket.id,
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      // Broadcast cursor position to all other users in the same board
      socket.to(boardId).emit('cursor-update', { userId, x, y });
      console.log(`[WebSocket] Broadcasted cursor-update to board ${boardId} (excluding sender ${socket.id})`);
    });
    
    socket.on('disconnect', () => {
      console.log('[WebSocket] User disconnected:', { 
        socketId: socket.id,
        timestamp: new Date().toISOString()
      });
      
      // Handle cleanup for all boards this user was in
      for (const [boardId, users] of boardUserCounts.entries()) {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          console.log(`[WebSocket] User ${socket.id} disconnected from board ${boardId}. Active users: ${users.size}`);
          
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
    
    // Log any other events
    socket.onAny((eventName, ...args) => {
      console.log(`[WebSocket] Received event: ${eventName}`, { 
        socketId: socket.id, 
        args,
        timestamp: new Date().toISOString()
      });
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
  } catch (error) {
    console.error('[WebSocket] Error saving final snapshot (async):', error);
  }
}

export function getIO(): SocketIOServer | null {
  return io;
}