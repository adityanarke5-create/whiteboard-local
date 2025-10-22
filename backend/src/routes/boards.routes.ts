import { Router } from 'express';
import { BoardController } from '../controllers/board.controller';
import { SnapshotController } from '../controllers/snapshot.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import boardIdRouter from './board-id.routes';

const router = Router();
const boardController = new BoardController();
const snapshotController = new SnapshotController();

// GET /api/boards - Get all boards for a user
router.get('/', authMiddleware, (req, res) => boardController.getBoards(req, res));

// POST /api/boards - Create a new board
router.post('/', authMiddleware, (req, res) => boardController.createBoard(req, res));

// GET /api/boards/:id/snapshots - Get all snapshots for a board
router.get('/:id/snapshots', (req, res) => snapshotController.getSnapshots(req, res));

// POST /api/boards/:id/snapshots - Create a new snapshot
router.post('/:id/snapshots', authMiddleware, (req, res) => snapshotController.createSnapshot(req, res));

// Nested routes for specific board operations (general routes should be last)
router.use('/:id', boardIdRouter);

export default router;