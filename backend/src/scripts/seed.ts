import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      cognitoId: 'cognito-user-1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
      cognitoId: 'cognito-user-2',
    },
  });

  console.log('Created users:', user1, user2);

  // Create sample boards
  const board1 = await prisma.board.create({
    data: {
      title: 'Project Planning',
      ownerId: user1.id,
    },
  });

  const board2 = await prisma.board.create({
    data: {
      title: 'UI Design Ideas',
      ownerId: user1.id,
    },
  });

  const board3 = await prisma.board.create({
    data: {
      title: 'Team Brainstorm',
      ownerId: user2.id,
    },
  });

  console.log('Created boards:', board1, board2, board3);

  // Add collaborators
  const collaborator1 = await prisma.boardCollaborator.create({
    data: {
      boardId: board1.id,
      userId: user2.id,
      role: 'editor',
    },
  });

  console.log('Created collaborator:', collaborator1);

  // Add sample actions
  const action1 = await prisma.boardAction.create({
    data: {
      boardId: board1.id,
      userId: user1.id,
      action: JSON.stringify({
        type: 'add',
        object: {
          type: 'rect',
          left: 100,
          top: 100,
          width: 100,
          height: 100,
        },
      }),
      timestamp: new Date(),
    },
  });

  const action2 = await prisma.boardAction.create({
    data: {
      boardId: board1.id,
      userId: user2.id,
      action: JSON.stringify({
        type: 'modify',
        objectId: action1.id,
        properties: {
          fill: 'red',
        },
      }),
      timestamp: new Date(Date.now() + 1000),
    },
  });

  console.log('Created actions:', action1, action2);

  // Add sample snapshots
  const snapshot1 = await prisma.boardSnapshot.create({
    data: {
      boardId: board1.id,
      data: JSON.stringify({
        objects: [
          {
            type: 'rect',
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: 'red',
          },
        ],
      }),
      timestamp: new Date(),
    },
  });

  console.log('Created snapshot:', snapshot1);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });