import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DatabaseService } from '../services/database.service';

export type SocketServer = SocketIOServer;

let io: SocketIOServer | null = null;
const databaseService = new DatabaseService();

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
      console.log(`[WebSocket] User ${socket.id} joined board ${boardId}`);
      
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
    
    socket.on('leave-board', (boardId) => {
      console.log('[WebSocket] User leaving board:', { 
        socketId: socket.id,
        boardId,
        timestamp: new Date().toISOString()
      });
      
      socket.leave(boardId);
      console.log(`[WebSocket] User ${socket.id} left board ${boardId}`);
      
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

export function getIO(): SocketIOServer | null {
  return io;
}