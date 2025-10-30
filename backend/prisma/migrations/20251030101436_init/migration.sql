-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cognitoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "shareToken" TEXT,
    "ownerId" TEXT NOT NULL,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardCollaborator" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardCollaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardAction" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "objectId" TEXT,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardSnapshot" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isAuto" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cognitoId_key" ON "User"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_shareToken_key" ON "Board"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "BoardCollaborator_boardId_userId_key" ON "BoardCollaborator"("boardId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardCollaborator_boardId_email_key" ON "BoardCollaborator"("boardId", "email");

-- CreateIndex
CREATE INDEX "BoardAction_boardId_timestamp_idx" ON "BoardAction"("boardId", "timestamp");

-- CreateIndex
CREATE INDEX "BoardSnapshot_boardId_timestamp_idx" ON "BoardSnapshot"("boardId", "timestamp");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardCollaborator" ADD CONSTRAINT "BoardCollaborator_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardCollaborator" ADD CONSTRAINT "BoardCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardAction" ADD CONSTRAINT "BoardAction_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardAction" ADD CONSTRAINT "BoardAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardSnapshot" ADD CONSTRAINT "BoardSnapshot_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
