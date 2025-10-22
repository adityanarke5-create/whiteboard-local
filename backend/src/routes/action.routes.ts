import { Router } from 'express';
import { ActionController } from '../controllers/action.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const actionController = new ActionController();

// GET /api/boards/:id/actions - Get recent actions for a board
router.get('/', (req, res) => actionController.getActions(req, res));

// POST /api/boards/:id/actions - Add a new action
router.post('/', authMiddleware, (req, res) => actionController.createAction(req, res));

export default router;