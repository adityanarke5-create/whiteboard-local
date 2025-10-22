import { DatabaseService } from '../services/database.service';
import { Request, Response } from 'express';

export class ActionController {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = new DatabaseService();
  }

  // Get recent actions for a board
  async getActions(req: Request, res: Response) {
    try {
      const { id: boardId } = req.params;
      
      if (typeof boardId !== 'string') {
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      const actions = await this.databaseService.getActionsByBoardId(boardId);
      res.status(200).json(actions);
    } catch (error) {
      console.error('Error fetching actions:', error);
      res.status(500).json({ error: 'Failed to fetch actions' });
    }
  }

  // Add a new action
  async createAction(req: Request, res: Response) {
    try {
      const { id: boardId } = req.params;
      const { userId, action } = req.body;
      
      if (typeof boardId !== 'string') {
        return res.status(400).json({ error: 'Invalid board ID' });
      }

      // Get user ID from the authenticated request
      const authenticatedUserId = (req as any).user.id;

      // Verify that the user has access to this board
      const board = await this.databaseService.getBoardById(boardId);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }

      // Check if user is the owner or a collaborator
      const isOwner = board.ownerId === authenticatedUserId;
      const isCollaborator = await this.databaseService.getCollaboratorsByBoardId(boardId)
        .then(collaborators => collaborators.some(c => c.userId === authenticatedUserId));

      if (!isOwner && !isCollaborator) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (!userId || !action) {
        return res.status(400).json({ error: 'User ID and action are required' });
      }

      // Use the authenticated user ID instead of the one sent in the request
      const newAction = await this.databaseService.createAction({
        boardId,
        userId: authenticatedUserId,
        action,
      });

      res.status(201).json(newAction);
    } catch (error) {
      console.error('Error creating action:', error);
      res.status(500).json({ error: 'Failed to create action' });
    }
  }
}