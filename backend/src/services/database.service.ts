import db from '../lib/db';

// console.log('[DatabaseService] Initializing database service');

export interface User {
  id: string;
  email: string;
  name: string | null;
  cognitoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  title: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardCollaborator {
  id: string;
  boardId: string;
  userId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardAction {
  id: string;
  boardId: string;
  userId: string;
  action: string;
  timestamp: Date;
}

export interface BoardSnapshot {
  id: string;
  boardId: string;
  data: string;
  timestamp: Date;
}

export class DatabaseService {
  // User operations
  async createUser(data: { email: string; name?: string; cognitoId: string }): Promise<User> {
    // console.log('[DatabaseService] Creating user', { email: data.email });
    
    try {
      const user = await db.user.create({
        data: {
          email: data.email,
          name: data.name || null,
          cognitoId: data.cognitoId,
        },
      });
      
      // console.log('[DatabaseService] User created successfully', { userId: user.id });
      return user;
    } catch (error) {
      // console.error('[DatabaseService] Error creating user:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    // console.log('[DatabaseService] Getting user by ID', { id });
    
    try {
      const user = await db.user.findUnique({
        where: { id },
      });
      
      // console.log('[DatabaseService] User lookup complete', { found: !!user });
      return user;
    } catch (error) {
      // console.error('[DatabaseService] Error getting user by ID:', error);
      throw error;
    }
  }

  async getUserByCognitoId(cognitoId: string): Promise<User | null> {
    // console.log('[DatabaseService] Getting user by Cognito ID', { cognitoId });
    
    try {
      const user = await db.user.findUnique({
        where: { cognitoId },
      });
      
      // console.log('[DatabaseService] User lookup by Cognito ID complete', { found: !!user });
      return user;
    } catch (error) {
      // console.error('[DatabaseService] Error getting user by Cognito ID:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    // console.log('[DatabaseService] Getting user by email', { email });
    
    try {
      const user = await db.user.findUnique({
        where: { email },
      });
      
      // console.log('[DatabaseService] User lookup by email complete', { found: !!user });
      return user;
    } catch (error) {
      // console.error('[DatabaseService] Error getting user by email:', error);
      throw error;
    }
  }

  // Board operations
  async createBoard(data: { title: string; ownerId: string }): Promise<Board> {
    // console.log('[DatabaseService] Creating board', { title: data.title, ownerId: data.ownerId });
    
    try {
      const board = await db.board.create({
        data: {
          title: data.title,
          ownerId: data.ownerId,
        },
      });
      
      // console.log('[DatabaseService] Board created successfully', { boardId: board.id });
      return board;
    } catch (error) {
      // console.error('[DatabaseService] Error creating board:', error);
      throw error;
    }
  }

  async getBoardsByUserId(userId: string): Promise<Board[]> {
    // console.log('[DatabaseService] Getting boards by user ID', { userId });
    
    try {
      const boards = await db.board.findMany({
        where: {
          OR: [
            { ownerId: userId },
            { collaborators: { some: { userId } } },
          ],
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      
      // console.log('[DatabaseService] Boards retrieved', { count: boards.length });
      return boards;
    } catch (error) {
      // console.error('[DatabaseService] Error getting boards by user ID:', error);
      throw error;
    }
  }

  async getBoardById(id: string): Promise<Board | null> {
    // console.log('[DatabaseService] Getting board by ID', { id });
    
    try {
      const board = await db.board.findUnique({
        where: { id },
      });
      
      // console.log('[DatabaseService] Board lookup complete', { found: !!board });
      return board;
    } catch (error) {
      // console.error('[DatabaseService] Error getting board by ID:', error);
      throw error;
    }
  }

  async updateBoard(id: string, data: { title?: string }): Promise<Board> {
    // console.log('[DatabaseService] Updating board', { id, data });
    
    try {
      const board = await db.board.update({
        where: { id },
        data,
      });
      
      // console.log('[DatabaseService] Board updated successfully');
      return board;
    } catch (error) {
      // console.error('[DatabaseService] Error updating board:', error);
      throw error;
    }
  }

  async deleteBoard(id: string): Promise<Board> {
    // console.log('[DatabaseService] Deleting board', { id });
    
    try {
      const board = await db.board.delete({
        where: { id },
      });
      
      // console.log('[DatabaseService] Board deleted successfully');
      return board;
    } catch (error) {
      // console.error('[DatabaseService] Error deleting board:', error);
      throw error;
    }
  }

  // Board collaborator operations
  async addCollaborator(data: { boardId: string; userId: string; role?: string }): Promise<BoardCollaborator> {
    // console.log('[DatabaseService] Adding collaborator', data);
    
    try {
      const collaborator = await db.boardCollaborator.create({
        data: {
          boardId: data.boardId,
          userId: data.userId,
          role: data.role || 'editor',
        },
      });
      
      // console.log('[DatabaseService] Collaborator added successfully', { collaboratorId: collaborator.id });
      return collaborator;
    } catch (error) {
      // console.error('[DatabaseService] Error adding collaborator:', error);
      throw error;
    }
  }

  async getCollaboratorsByBoardId(boardId: string): Promise<BoardCollaborator[]> {
    // console.log('[DatabaseService] Getting collaborators by board ID', { boardId });
    
    try {
      const collaborators = await db.boardCollaborator.findMany({
        where: { boardId },
        include: {
          user: true, // Include user information
        },
      });
      
      // console.log('[DatabaseService] Collaborators retrieved', { count: collaborators.length });
      return collaborators;
    } catch (error) {
      // console.error('[DatabaseService] Error getting collaborators by board ID:', error);
      throw error;
    }
  }

  async removeCollaborator(id: string): Promise<BoardCollaborator> {
    // console.log('[DatabaseService] Removing collaborator', { id });
    
    try {
      const collaborator = await db.boardCollaborator.delete({
        where: { id },
      });
      
      // console.log('[DatabaseService] Collaborator removed successfully');
      return collaborator;
    } catch (error) {
      // console.error('[DatabaseService] Error removing collaborator:', error);
      throw error;
    }
  }

  // Board action operations
  async createAction(data: { boardId: string; userId: string; action: string }): Promise<BoardAction> {
    // console.log('[DatabaseService] Creating action', data);
    
    try {
      const action = await db.boardAction.create({
        data: {
          boardId: data.boardId,
          userId: data.userId,
          action: data.action,
          timestamp: new Date(),
        },
      });
      
      // console.log('[DatabaseService] Action created successfully', { actionId: action.id });
      return action;
    } catch (error) {
      // console.error('[DatabaseService] Error creating action:', error);
      throw error;
    }
  }

  async getActionsByBoardId(boardId: string, limit?: number): Promise<BoardAction[]> {
    // console.log('[DatabaseService] Getting actions by board ID', { boardId, limit });
    
    try {
      const actions = await db.boardAction.findMany({
        where: { boardId },
        orderBy: { timestamp: 'asc' },
        take: limit,
      });
      
      // console.log('[DatabaseService] Actions retrieved', { count: actions.length });
      return actions;
    } catch (error) {
      // console.error('[DatabaseService] Error getting actions by board ID:', error);
      throw error;
    }
  }

  async deleteActionsByBoardId(boardId: string): Promise<void> {
    // console.log('[DatabaseService] Deleting actions by board ID', { boardId });
    
    try {
      await db.boardAction.deleteMany({
        where: { boardId },
      });
      
      // console.log('[DatabaseService] Actions deleted successfully');
    } catch (error) {
      // console.error('[DatabaseService] Error deleting actions by board ID:', error);
      throw error;
    }
  }

  // Board snapshot operations
  async createSnapshot(data: { boardId: string; data: string }): Promise<BoardSnapshot> {
    // console.log('[DatabaseService] Creating snapshot', { 
    //   boardId: data.boardId,
    //   dataLength: data.data.length,
    //   timestamp: new Date().toISOString()
    // });
    
    try {
      const snapshot = await db.boardSnapshot.create({
        data: {
          boardId: data.boardId,
          data: data.data,
          timestamp: new Date(),
        },
      });
      
      // console.log('[DatabaseService] Snapshot created successfully', { 
      //   snapshotId: snapshot.id,
      //   boardId: data.boardId,
      //   timestamp: new Date().toISOString()
      // });
      return snapshot;
    } catch (error) {
      // console.error('[DatabaseService] Error creating snapshot:', error);
      throw error;
    }
  }

  async getSnapshotsByBoardId(boardId: string): Promise<BoardSnapshot[]> {
    // console.log('[DatabaseService] Getting snapshots by board ID', { 
    //   boardId,
    //   timestamp: new Date().toISOString()
    // });
    
    try {
      const snapshots = await db.boardSnapshot.findMany({
        where: { boardId },
        orderBy: { timestamp: 'desc' },
      });
      
      // console.log('[DatabaseService] Snapshots retrieved', { 
      //   boardId,
      //   count: snapshots.length,
      //   timestamp: new Date().toISOString()
      // });
      return snapshots;
    } catch (error) {
      // console.error('[DatabaseService] Error getting snapshots by board ID:', error);
      throw error;
    }
  }

  async getLatestSnapshotByBoardId(boardId: string): Promise<BoardSnapshot | null> {
    // console.log('[DatabaseService] Getting latest snapshot by board ID', { 
    //   boardId,
    //   timestamp: new Date().toISOString()
    // });
    
    try {
      const snapshot = await db.boardSnapshot.findFirst({
        where: { boardId },
        orderBy: { timestamp: 'desc' },
      });
      
      // console.log('[DatabaseService] Latest snapshot retrieved', { 
      //   boardId,
      //   found: !!snapshot,
      //   timestamp: new Date().toISOString()
      // });
      return snapshot;
    } catch (error) {
      // console.error('[DatabaseService] Error getting latest snapshot by board ID:', error);
      throw error;
    }
  }

  // Add this new method to delete all snapshots for a board
  async deleteSnapshotsByBoardId(boardId: string): Promise<void> {
    // console.log('[DatabaseService] Deleting snapshots by board ID', { 
    //   boardId,
    //   timestamp: new Date().toISOString()
    // });
    
    try {
      await db.boardSnapshot.deleteMany({
        where: { boardId },
      });
      
      // console.log('[DatabaseService] Snapshots deleted successfully', { 
      //   boardId,
      //   timestamp: new Date().toISOString()
      // });
    } catch (error) {
      // console.error('[DatabaseService] Error deleting snapshots by board ID:', error);
      throw error;
    }
  }

  // Add this new method to delete actions that occurred before the latest snapshot
  async cleanupActionsBeforeLatestSnapshot(boardId: string): Promise<number> {
    console.log('[DatabaseService] Cleaning up actions before latest snapshot', { boardId });
    
    try {
      // Get the latest snapshot for this board
      const latestSnapshot = await this.getLatestSnapshotByBoardId(boardId);
      
      if (!latestSnapshot) {
        console.log('[DatabaseService] No snapshot found, skipping cleanup');
        return 0;
      }
      
      // Delete all actions that occurred before the snapshot timestamp
      const result = await db.boardAction.deleteMany({
        where: {
          boardId: boardId,
          timestamp: {
            lt: latestSnapshot.timestamp
          }
        }
      });
      
      console.log('[DatabaseService] Actions cleaned up successfully', { 
        boardId, 
        deletedCount: result.count,
        snapshotTimestamp: latestSnapshot.timestamp
      });
      
      return result.count;
    } catch (error) {
      console.error('[DatabaseService] Error cleaning up actions:', error);
      throw error;
    }
  }
}