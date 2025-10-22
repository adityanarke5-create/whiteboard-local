import { Router } from 'express';
import { BoardController } from '../controllers/board.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const boardController = new BoardController();

// GET /api/boards/:id - Get a specific board
router.get('/', (req, res) => boardController.getBoardById(req, res));

// PUT /api/boards/:id - Update a board
router.put('/', authMiddleware, (req, res) => boardController.updateBoard(req, res));

// DELETE /api/boards/:id - Delete a board
router.delete('/', authMiddleware, (req, res) => boardController.deleteBoard(req, res));

export default router;