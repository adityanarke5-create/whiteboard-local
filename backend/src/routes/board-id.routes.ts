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

// GET /api/boards/:id/collaborators - Get collaborators for a board
router.get('/collaborators', authMiddleware, (req, res) => boardController.getCollaborators(req, res));

// POST /api/boards/:id/collaborators - Add a collaborator to a board
router.post('/collaborators', authMiddleware, (req, res) => boardController.addCollaborator(req, res));

// DELETE /api/boards/:id/collaborators/:collaboratorId - Remove a collaborator from a board
router.delete('/collaborators/:collaboratorId', authMiddleware, (req, res) => boardController.removeCollaboratorById(req, res));

export default router;