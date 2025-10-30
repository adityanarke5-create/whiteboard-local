import { PrismaClient } from '../generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class BoardService {
  // Create a new board
  static async createBoard(ownerId: string, title: string, description?: string) {
    try {
      const board = await prisma.board.create({
        data: {
          title,
          description,
          ownerId,
          shareToken: uuidv4(),
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              collaborators: true,
            },
          },
        },
      });
      return board;
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  }

  // Get boards for a user (owned + collaborated)
  static async getUserBoards(userId: string) {
    try {
      const [ownedBoards, collaboratedBoards] = await Promise.all([
        // Boards owned by user
        prisma.board.findMany({
          where: { ownerId: userId },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                collaborators: true,
              },
            },
          },
          orderBy: { lastActivity: 'desc' },
        }),
        // Boards where user is a collaborator
        prisma.board.findMany({
          where: {
            collaborators: {
              some: {
                userId: userId,
                status: 'accepted',
              },
            },
          },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                collaborators: true,
              },
            },
          },
          orderBy: { lastActivity: 'desc' },
        }),
      ]);

      // Combine and deduplicate
      const allBoards = [...ownedBoards, ...collaboratedBoards];
      const uniqueBoards = allBoards.filter(
        (board, index, self) => index === self.findIndex((b) => b.id === board.id)
      );

      return uniqueBoards;
    } catch (error) {
      console.error('Error fetching user boards:', error);
      throw error;
    }
  }

  // Get board by ID with permissions check
  static async getBoardById(boardId: string, userId: string) {
    try {
      const board = await prisma.board.findFirst({
        where: {
          id: boardId,
          OR: [
            { ownerId: userId },
            { isPublic: true },
            {
              collaborators: {
                some: {
                  userId: userId,
                  status: 'accepted',
                },
              },
            },
          ],
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          collaborators: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          snapshots: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
        },
      });

      return board;
    } catch (error) {
      console.error('Error fetching board:', error);
      throw error;
    }
  }

  // Update board activity timestamp
  static async updateBoardActivity(boardId: string) {
    try {
      await prisma.board.update({
        where: { id: boardId },
        data: { lastActivity: new Date() },
      });
    } catch (error) {
      console.error('Error updating board activity:', error);
    }
  }

  // Add collaborator to board
  static async addCollaborator(boardId: string, email: string, role: string = 'editor') {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Create collaboration record
      const collaboration = await prisma.boardCollaborator.create({
        data: {
          boardId,
          userId: user?.id,
          email,
          role,
          status: user ? 'accepted' : 'pending',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return collaboration;
    } catch (error) {
      console.error('Error adding collaborator:', error);
      throw error;
    }
  }

  // Remove collaborator from board
  static async removeCollaborator(boardId: string, collaboratorId: string) {
    try {
      await prisma.boardCollaborator.delete({
        where: { id: collaboratorId },
      });
    } catch (error) {
      console.error('Error removing collaborator:', error);
      throw error;
    }
  }

  // Update board sharing settings
  static async updateSharingSettings(boardId: string, isPublic: boolean, regenerateToken: boolean = false) {
    try {
      const updateData: any = { isPublic };
      
      if (regenerateToken) {
        updateData.shareToken = uuidv4();
      }

      const board = await prisma.board.update({
        where: { id: boardId },
        data: updateData,
      });

      return board;
    } catch (error) {
      console.error('Error updating sharing settings:', error);
      throw error;
    }
  }

  // Get board by share token
  static async getBoardByShareToken(shareToken: string) {
    try {
      const board = await prisma.board.findUnique({
        where: { shareToken },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          snapshots: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
        },
      });

      return board;
    } catch (error) {
      console.error('Error fetching board by share token:', error);
      throw error;
    }
  }

  // Delete board
  static async deleteBoard(boardId: string, userId: string) {
    try {
      // Check if user is the owner
      const board = await prisma.board.findFirst({
        where: {
          id: boardId,
          ownerId: userId,
        },
      });

      if (!board) {
        throw new Error('Board not found or user not authorized');
      }

      await prisma.board.delete({
        where: { id: boardId },
      });

      return true;
    } catch (error) {
      console.error('Error deleting board:', error);
      throw error;
    }
  }
}