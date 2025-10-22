import { BoardController } from '../controllers/board.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

// This file is kept for compatibility but the routes are now handled by boards.routes.ts
// All board-related routes are now managed through the main boards router

export default router;

const boardController = new BoardController();

// Wrapper function to apply auth middleware
const withAuth = (handler: Function) => {
  return async (req: any, res: any) => {
    return authMiddleware(req, res, () => handler(req, res));
  };
};

export const boardRoutes = {
  // GET /api/boards - Get all boards for a user
  GET: withAuth(boardController.getBoards.bind(boardController)),
  
  // POST /api/boards - Create a new board
  POST: withAuth(boardController.createBoard.bind(boardController)),
};