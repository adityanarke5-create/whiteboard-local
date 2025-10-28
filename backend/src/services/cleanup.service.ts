import { DatabaseService } from './database.service';

export class CleanupService {
  private databaseService: DatabaseService;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.databaseService = new DatabaseService();
  }

  // Start periodic cleanup of old actions
  startPeriodicCleanup() {
    // Run cleanup every hour
    this.cleanupInterval = setInterval(async () => {
      try {
        console.log('[CleanupService] Starting periodic cleanup of old actions');
        await this.cleanupAllBoards();
      } catch (error) {
        console.error('[CleanupService] Error during periodic cleanup:', error);
      }
    }, 60 * 60 * 1000); // Every hour
  }

  // Stop periodic cleanup
  stopPeriodicCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  // Cleanup old actions for all boards
  async cleanupAllBoards() {
    try {
      // This would require a more complex query to get all boards with snapshots
      // For now, we'll rely on the cleanup that happens when users leave boards
      console.log('[CleanupService] Cleanup of all boards not implemented yet');
    } catch (error) {
      console.error('[CleanupService] Error cleaning up all boards:', error);
      throw error;
    }
  }

  // Cleanup old actions for a specific board
  async cleanupBoardActions(boardId: string): Promise<number> {
    try {
      const deletedCount = await this.databaseService.cleanupActionsBeforeLatestSnapshot(boardId);
      console.log('[CleanupService] Cleaned up actions for board:', { boardId, deletedCount });
      return deletedCount;
    } catch (error) {
      console.error('[CleanupService] Error cleaning up board actions:', error);
      throw error;
    }
  }

  // Immediate cleanup after snapshot creation
  async cleanupAfterSnapshot(boardId: string): Promise<number> {
    try {
      const deletedCount = await this.databaseService.cleanupActionsBeforeLatestSnapshot(boardId);
      console.log('[CleanupService] Immediate cleanup after snapshot:', { boardId, deletedCount });
      return deletedCount;
    } catch (error) {
      console.error('[CleanupService] Error during immediate cleanup after snapshot:', error);
      throw error;
    }
  }
}