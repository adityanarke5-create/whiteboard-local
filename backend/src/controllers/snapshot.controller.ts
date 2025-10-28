import { DatabaseService } from '../services/database.service';
import { CleanupService } from '../services/cleanup.service';
import { Request, Response } from 'express';

export class SnapshotController {
  private databaseService: DatabaseService;
  private cleanupService: CleanupService;

  constructor() {
    this.databaseService = new DatabaseService();
    this.cleanupService = new CleanupService();
  }

  // Get all snapshots for a board (should typically just return the latest one)
  async getSnapshots(req: Request, res: Response) {
    try {
      //console.log('[SnapshotController] Request params:', req.params);
      const { id: boardId } = req.params;
      
      // console.log('[SnapshotController] Getting snapshots for board:', { 
      //   boardId,
      //   timestamp: new Date().toISOString()
      // });
      
      if (typeof boardId !== 'string') {
        console.error('[SnapshotController] Invalid board ID provided:', { boardId, typeofBoardId: typeof boardId });
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      const snapshots = await this.databaseService.getSnapshotsByBoardId(boardId);
      // console.log('[SnapshotController] Snapshots retrieved successfully:', { 
      //   boardId,
      //   count: snapshots.length,
      //   timestamp: new Date().toISOString()
      // });
      
      res.status(200).json(snapshots);
    } catch (error) {
      console.error('[SnapshotController] Error fetching snapshots:', error);
      res.status(500).json({ error: 'Failed to fetch snapshots' });
    }
  }

  // Create a new snapshot (this will replace the previous one)
  async createSnapshot(req: Request, res: Response) {
    try {
      // console.log('[SnapshotController] Request params:', req.params);
      // console.log('[SnapshotController] Request body:', req.body);
      const { id: boardId } = req.params;
      const { data } = req.body;
      
      // console.log('[SnapshotController] Creating snapshot:', { 
      //   boardId,
      //   dataLength: data ? data.length : 0,
      //   timestamp: new Date().toISOString()
      // });
      
      if (typeof boardId !== 'string') {
        console.error('[SnapshotController] Invalid board ID provided:', { boardId, typeofBoardId: typeof boardId });
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      // Get user ID from the authenticated request
      const userId = (req as any).user.id;
      //console.log('[SnapshotController] User ID from request:', { userId });

      // Verify that the user has access to this board
      const board = await this.databaseService.getBoardById(boardId);
      // console.log('[SnapshotController] Board lookup result:', { 
      //   boardId,
      //   found: !!board,
      //   timestamp: new Date().toISOString()
      // });
      
      if (!board) {
        console.error('[SnapshotController] Board not found:', { boardId });
        return res.status(404).json({ error: 'Board not found' });
      }

      // Check if user is the owner or a collaborator
      const collaborators = await this.databaseService.getCollaboratorsByBoardId(boardId);
      // console.log('[SnapshotController] Collaborators retrieved:', { 
      //   boardId,
      //   count: collaborators.length,
      //   timestamp: new Date().toISOString()
      // });
      
      const isOwner = board.ownerId === userId;
      const isCollaborator = collaborators.some(c => c.userId === userId);

      // console.log('[SnapshotController] Access check:', { 
      //   boardId,
      //   userId,
      //   isOwner,
      //   isCollaborator,
      //   timestamp: new Date().toISOString()
      // });

      if (!isOwner && !isCollaborator) {
        console.error('[SnapshotController] Access denied for user:', { 
          boardId,
          userId,
          ownerId: board.ownerId,
          timestamp: new Date().toISOString()
        });
        return res.status(403).json({ error: 'Access denied' });
      }

      if (!data) {
        console.error('[SnapshotController] Snapshot data is required');
        return res.status(400).json({ error: 'Snapshot data is required' });
      }

      // First, delete any existing snapshots for this board to maintain only the latest one
      //console.log('[SnapshotController] Deleting existing snapshots for board:', { boardId });
      await this.databaseService.deleteSnapshotsByBoardId(boardId);
      
      // Then create the new snapshot
      const snapshot = await this.databaseService.createSnapshot({
        boardId,
        data,
      });
      
      // Automatically clean up actions that occurred before this snapshot using the cleanup service
      try {
        const deletedCount = await this.cleanupService.cleanupAfterSnapshot(boardId);
        console.log('[SnapshotController] Actions cleaned up after snapshot creation:', { 
          boardId,
          deletedCount,
          timestamp: new Date().toISOString()
        });
      } catch (cleanupError) {
        console.error('[SnapshotController] Error cleaning up actions after snapshot creation:', cleanupError);
        // Don't fail the snapshot creation if cleanup fails, but log the error
      }
      
      // console.log('[SnapshotController] Snapshot created successfully:', { 
      //   snapshotId: snapshot.id,
      //   boardId,
      //   timestamp: new Date().toISOString()
      // });

      res.status(201).json(snapshot);
    } catch (error) {
      console.error('[SnapshotController] Error creating snapshot:', error);
      res.status(500).json({ error: 'Failed to create snapshot' });
    }
  }
}