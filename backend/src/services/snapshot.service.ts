import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class SnapshotService {
  // Create a new snapshot
  static async createSnapshot(boardId: string, data: string, isAuto: boolean = true) {
    try {
      // Get the latest version number
      const latestSnapshot = await prisma.boardSnapshot.findFirst({
        where: { boardId },
        orderBy: { version: 'desc' },
      });

      const version = (latestSnapshot?.version || 0) + 1;

      const snapshot = await prisma.boardSnapshot.create({
        data: {
          boardId,
          data,
          version,
          isAuto,
        },
      });

      // Update board activity
      await prisma.board.update({
        where: { id: boardId },
        data: { lastActivity: new Date() },
      });

      return snapshot;
    } catch (error) {
      console.error('Error creating snapshot:', error);
      throw error;
    }
  }

  // Get latest snapshot for a board
  static async getLatestSnapshot(boardId: string) {
    try {
      const snapshot = await prisma.boardSnapshot.findFirst({
        where: { boardId },
        orderBy: { timestamp: 'desc' },
      });

      return snapshot;
    } catch (error) {
      console.error('Error fetching latest snapshot:', error);
      throw error;
    }
  }

  // Get all snapshots for a board (for version history)
  static async getBoardSnapshots(boardId: string, limit: number = 10) {
    try {
      const snapshots = await prisma.boardSnapshot.findMany({
        where: { boardId },
        orderBy: { timestamp: 'desc' },
        take: limit,
      });

      return snapshots;
    } catch (error) {
      console.error('Error fetching board snapshots:', error);
      throw error;
    }
  }

  // Clean up old auto-snapshots (keep only recent ones)
  static async cleanupOldSnapshots(boardId: string, keepCount: number = 5) {
    try {
      // Get auto snapshots to keep
      const snapshotsToKeep = await prisma.boardSnapshot.findMany({
        where: { 
          boardId,
          isAuto: true,
        },
        orderBy: { timestamp: 'desc' },
        take: keepCount,
        select: { id: true },
      });

      const keepIds = snapshotsToKeep.map(s => s.id);

      // Delete old auto snapshots
      if (keepIds.length > 0) {
        await prisma.boardSnapshot.deleteMany({
          where: {
            boardId,
            isAuto: true,
            id: {
              notIn: keepIds,
            },
          },
        });
      }

      return true;
    } catch (error) {
      console.error('Error cleaning up old snapshots:', error);
      throw error;
    }
  }

  // Delete snapshot by ID
  static async deleteSnapshot(snapshotId: string) {
    try {
      await prisma.boardSnapshot.delete({
        where: { id: snapshotId },
      });

      return true;
    } catch (error) {
      console.error('Error deleting snapshot:', error);
      throw error;
    }
  }

  // Get snapshot by ID
  static async getSnapshotById(snapshotId: string) {
    try {
      const snapshot = await prisma.boardSnapshot.findUnique({
        where: { id: snapshotId },
      });

      return snapshot;
    } catch (error) {
      console.error('Error fetching snapshot:', error);
      throw error;
    }
  }
}