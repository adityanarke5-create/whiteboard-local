import { DatabaseService } from '../services/database.service';
import { Request, Response } from 'express';

console.log('[BoardController] Initializing board controller');

export class BoardController {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = new DatabaseService();
    console.log('[BoardController] Database service initialized');
  }

  // Get all boards for a user
  async getBoards(req: Request, res: Response) {
    console.log('[BoardController] Getting boards for user');
    
    try {
      // Get user ID from the authenticated request
      const userId = (req as any).user.id;
      console.log('[BoardController] User ID from auth:', userId);

      const boards = await this.databaseService.getBoardsByUserId(userId);
      console.log('[BoardController] Boards retrieved successfully', { count: boards.length });
      
      res.status(200).json(boards);
    } catch (error) {
      console.error('[BoardController] Error fetching boards:', error);
      res.status(500).json({ error: 'Failed to fetch boards' });
    }
  }

  // Create a new board
  async createBoard(req: Request, res: Response) {
    console.log('[BoardController] Creating new board');
    
    try {
      const { title } = req.body;
      console.log('[BoardController] Board creation request', { title });
      
      // Get user ID from the authenticated request
      const userId = (req as any).user.id;
      console.log('[BoardController] User ID from auth:', userId);

      if (!title) {
        console.warn('[BoardController] Board title is required');
        return res.status(400).json({ error: 'Board title is required' });
      }

      const board = await this.databaseService.createBoard({
        title,
        ownerId: userId,
      });
      
      console.log('[BoardController] Board created successfully', { boardId: board.id });
      res.status(201).json(board);
    } catch (error) {
      console.error('[BoardController] Error creating board:', error);
      res.status(500).json({ error: 'Failed to create board' });
    }
  }

  // Get a specific board
  async getBoardById(req: Request, res: Response) {
    console.log('[BoardController] Getting board by ID');
    
    try {
      const { id } = req.params;
      console.log('[BoardController] Board ID from request:', id);
      
      if (typeof id !== 'string') {
        console.warn('[BoardController] Invalid board ID');
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      const board = await this.databaseService.getBoardById(id);
      
      if (!board) {
        console.warn('[BoardController] Board not found', { id });
        return res.status(404).json({ error: 'Board not found' });
      }
      
      console.log('[BoardController] Board retrieved successfully');
      res.status(200).json(board);
    } catch (error) {
      console.error('[BoardController] Error fetching board:', error);
      res.status(500).json({ error: 'Failed to fetch board' });
    }
  }

  // Update a board
  async updateBoard(req: Request, res: Response) {
    console.log('[BoardController] Updating board');
    
    try {
      const { id } = req.params;
      const { title } = req.body;
      console.log('[BoardController] Board update request', { id, title });
      
      if (typeof id !== 'string') {
        console.warn('[BoardController] Invalid board ID');
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      const board = await this.databaseService.getBoardById(id);
      
      if (!board) {
        console.warn('[BoardController] Board not found', { id });
        return res.status(404).json({ error: 'Board not found' });
      }

      const updatedBoard = await this.databaseService.updateBoard(id, { title });
      console.log('[BoardController] Board updated successfully');
      
      res.status(200).json(updatedBoard);
    } catch (error) {
      console.error('[BoardController] Error updating board:', error);
      res.status(500).json({ error: 'Failed to update board' });
    }
  }

  // Delete a board
  async deleteBoard(req: Request, res: Response) {
    console.log('[BoardController] Deleting board');
    
    try {
      const { id } = req.params;
      console.log('[BoardController] Board delete request', { id });
      
      if (typeof id !== 'string') {
        console.warn('[BoardController] Invalid board ID');
        return res.status(400).json({ error: 'Invalid board ID' });
      }
      
      const board = await this.databaseService.getBoardById(id);
      
      if (!board) {
        console.warn('[BoardController] Board not found', { id });
        return res.status(404).json({ error: 'Board not found' });
      }

      await this.databaseService.deleteBoard(id);
      console.log('[BoardController] Board deleted successfully');
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('[BoardController] Error deleting board:', error);
      res.status(500).json({ error: 'Failed to delete board' });
    }
  }
}