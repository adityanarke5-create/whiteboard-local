import { DatabaseService } from '../services/database.service';
import { BoardService } from '../services/board.service';
import { Request, Response } from 'express';

export class BoardController {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = new DatabaseService();
  }

  // Get all boards for a user
  async getBoards(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const boards = await BoardService.getUserBoards(userId);
      res.status(200).json(boards);
    } catch (error) {
      console.error('[BoardController] Error fetching boards:', error);
      res.status(500).json({ error: 'Failed to fetch boards' });
    }
  }

  // Create a new board
  async createBoard(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const userId = (req as any).user.id;

      if (!title) {
        return res.status(400).json({ error: 'Board title is required' });
      }

      const board = await BoardService.createBoard(userId, title, description);
      res.status(201).json(board);
    } catch (error) {
      console.error('[BoardController] Error creating board:', error);
      res.status(500).json({ error: 'Failed to create board' });
    }
  }

  // Get a specific board
  async getBoardById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id;
      
      if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      // If user is authenticated, check permissions
      if (userId) {
        const board = await BoardService.getBoardById(id, userId);
        if (!board) {
          return res.status(404).json({ error: 'Board not found or access denied' });
        }
        return res.status(200).json(board);
      }
      
      // For unauthenticated users, try to get by share token
      const { token } = req.query;
      if (token && typeof token === 'string') {
        const board = await BoardService.getBoardByShareToken(token);
        if (!board) {
          return res.status(404).json({ error: 'Board not found' });
        }
        return res.status(200).json(board);
      }
      
      return res.status(401).json({ error: 'Authentication required' });
    } catch (error) {
      console.error('[BoardController] Error fetching board:', error);
      res.status(500).json({ error: 'Failed to fetch board' });
    }
  }

  // Update a board
  async updateBoard(req: Request, res: Response) {
    // console.log('[BoardController] Updating board');
    
    try {
      const { id } = req.params;
      const { title } = req.body;
      // console.log('[BoardController] Board update request', { id, title });
      
      if (typeof id !== 'string') {
        // console.warn('[BoardController] Invalid board ID');
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      const board = await this.databaseService.getBoardById(id);
      
      if (!board) {
        // console.warn('[BoardController] Board not found', { id });
        return res.status(404).json({ error: 'Board not found' });
      }

      const updatedBoard = await this.databaseService.updateBoard(id, { title });
      // console.log('[BoardController] Board updated successfully');
      
      res.status(200).json(updatedBoard);
    } catch (error) {
      // console.error('[BoardController] Error updating board:', error);
      res.status(500).json({ error: 'Failed to update board' });
    }
  }

  // Delete a board
  async deleteBoard(req: Request, res: Response) {
    // console.log('[BoardController] Deleting board');
    
    try {
      const { id } = req.params;
      // console.log('[BoardController] Board delete request', { id });
      
      if (typeof id !== 'string') {
        // console.warn('[BoardController] Invalid board ID');
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      const board = await this.databaseService.getBoardById(id);
      
      if (!board) {
        // console.warn('[BoardController] Board not found', { id });
        return res.status(404).json({ error: 'Board not found' });
      }

      await this.databaseService.deleteBoard(id);
      // console.log('[BoardController] Board deleted successfully');
      
      res.status(200).json({ success: true });
    } catch (error) {
      // console.error('[BoardController] Error deleting board:', error);
      res.status(500).json({ error: 'Failed to delete board' });
    }
  }

  // Get collaborators for a board
  async getCollaborators(req: Request, res: Response) {
    // console.log('[BoardController] Getting collaborators for board');
    
    // Debug route parameters
    // console.log('[BoardController] Request params:', req.params);
    
    try {
      const { id: boardId } = req.params;
      // console.log('[BoardController] Board ID from request params:', boardId);
      
      if (typeof boardId !== 'string') {
        // console.warn('[BoardController] Invalid board ID type:', typeof boardId);
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      // console.log('[BoardController] Fetching collaborators for board ID:', boardId);
      const collaborators = await this.databaseService.getCollaboratorsByBoardId(boardId);
      // console.log('[BoardController] Collaborators retrieved successfully', { count: collaborators.length });
      res.status(200).json(collaborators);
    } catch (error) {
      // console.error('[BoardController] Error fetching collaborators:', error);
      res.status(500).json({ error: 'Failed to fetch collaborators' });
    }
  }

  // Add a collaborator to a board
  async addCollaborator(req: Request, res: Response) {
    try {
      const { id: boardId } = req.params;
      const { email, role } = req.body;
      const userId = (req as any).user.id;
      
      if (typeof boardId !== 'string') {
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Verify board ownership
      const board = await BoardService.getBoardById(boardId, userId);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }

      if (board.ownerId !== userId) {
        return res.status(403).json({ error: 'Only the board owner can add collaborators' });
      }

      const collaborator = await BoardService.addCollaborator(boardId, email, role || 'editor');
      res.status(201).json(collaborator);
    } catch (error) {
      console.error('[BoardController] Error adding collaborator:', error);
      res.status(500).json({ error: 'Failed to add collaborator' });
    }
  }

  // Remove a collaborator from a board by collaborator ID in URL parameter
  async removeCollaboratorById(req: Request, res: Response) {
    try {
      const { id: boardId, collaboratorId } = req.params;
      const userId = (req as any).user.id;
      
      if (typeof boardId !== 'string') {
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      if (!collaboratorId) {
        return res.status(400).json({ error: 'Collaborator ID is required' });
      }

      // Verify board ownership
      const board = await BoardService.getBoardById(boardId, userId);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }

      if (board.ownerId !== userId) {
        return res.status(403).json({ error: 'Only the board owner can remove collaborators' });
      }

      await BoardService.removeCollaborator(boardId, collaboratorId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('[BoardController] Error removing collaborator:', error);
      res.status(500).json({ error: 'Failed to remove collaborator' });
    }
  }

  // Remove a collaborator from a board
  async removeCollaborator(req: Request, res: Response) {
    // console.log('[BoardController] Removing collaborator from board');
    
    try {
      const { id: boardId } = req.params;
      const { collaboratorId } = req.body;
      
      // console.log('[BoardController] Remove collaborator request', { boardId, collaboratorId });
      
      if (typeof boardId !== 'string') {
        // console.warn('[BoardController] Invalid board ID type:', typeof boardId);
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      if (!collaboratorId) {
        // console.warn('[BoardController] Collaborator ID is required');
        return res.status(400).json({ error: 'Collaborator ID is required' });
      }

      // Get the board to verify ownership
      // console.log('[BoardController] Fetching board by ID:', boardId);
      const board = await this.databaseService.getBoardById(boardId);
      if (!board) {
        // console.warn('[BoardController] Board not found', { boardId });
        return res.status(404).json({ error: 'Board not found' });
      }

      // Verify that the requesting user is the owner
      const userId = (req as any).user.id;
      // console.log('[BoardController] Verifying ownership', { userId, boardOwnerId: board.ownerId });
      if (board.ownerId !== userId) {
        // console.warn('[BoardController] User is not the board owner', { userId, boardOwnerId: board.ownerId });
        return res.status(403).json({ error: 'Only the board owner can remove collaborators' });
      }

      // Remove the collaborator
      // console.log('[BoardController] Removing collaborator', { collaboratorId });
      const collaborator = await this.databaseService.removeCollaborator(collaboratorId);
      // console.log('[BoardController] Collaborator removed successfully');
      res.status(200).json(collaborator);
    } catch (error) {
      // console.error('[BoardController] Error removing collaborator:', error);
      res.status(500).json({ error: 'Failed to remove collaborator' });
    }
  }
}