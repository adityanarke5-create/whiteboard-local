import { Router } from 'express';
import { BoardController } from '../controllers/board.controller';
import { SnapshotController } from '../controllers/snapshot.controller';
import { ActionController } from '../controllers/action.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import actionRoutes from './action.routes';

const router = Router();
const boardController = new BoardController();
const snapshotController = new SnapshotController();
const actionController = new ActionController();

// GET /api/boards - Get all boards for a user
router.get('/', authMiddleware, (req, res) => boardController.getBoards(req, res));

// POST /api/boards - Create a new board
router.post('/', authMiddleware, (req, res) => boardController.createBoard(req, res));

// GET /api/boards/:id - Get a specific board
router.get('/:id', (req, res) => boardController.getBoardById(req, res));

// PUT /api/boards/:id - Update a board
router.put('/:id', authMiddleware, (req, res) => boardController.updateBoard(req, res));

// DELETE /api/boards/:id - Delete a board
router.delete('/:id', authMiddleware, (req, res) => boardController.deleteBoard(req, res));

// GET /api/boards/:id/snapshots - Get all snapshots for a board
router.get('/:id/snapshots', (req, res) => snapshotController.getSnapshots(req, res));

// POST /api/boards/:id/snapshots - Create a new snapshot
router.post('/:id/snapshots', authMiddleware, (req, res) => snapshotController.createSnapshot(req, res));

// GET /api/boards/:id/collaborators - Get collaborators for a board
router.get('/:id/collaborators', authMiddleware, (req, res) => boardController.getCollaborators(req, res));

// POST /api/boards/:id/collaborators - Add a collaborator to a board
router.post('/:id/collaborators', authMiddleware, (req, res) => boardController.addCollaborator(req, res));

// DELETE /api/boards/:id/collaborators/:collaboratorId - Remove a collaborator from a board
router.delete('/:id/collaborators/:collaboratorId', authMiddleware, (req, res) => boardController.removeCollaboratorById(req, res));

// Action routes
router.use('/:id/actions', actionRoutes);

export default router;