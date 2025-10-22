# Whiteboard Backend

This is the backend service for the collaborative whiteboard application, built with Express.js, Prisma, and Socket.IO.

## Features

- RESTful API for board management
- Real-time collaboration using WebSocket
- Authentication with AWS Cognito
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js 16+
- PostgreSQL database
- AWS Cognito User Pool

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/whiteboard
   AWS_REGION=your-aws-region
   COGNITO_USER_POOL_ID=your-user-pool-id
   COGNITO_CLIENT_ID=your-client-id
   PORT=3001
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run database migrations (if needed):
   ```bash
   npx prisma migrate dev
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/boards` - Get all boards for authenticated user
- `POST /api/boards` - Create a new board
- `GET /api/boards/:id` - Get a specific board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board
- `GET /api/boards/:id/snapshots` - Get all snapshots for a board
- `POST /api/boards/:id/snapshots` - Create a new snapshot
- `GET /api/boards/:id/actions` - Get recent actions for a board
- `POST /api/boards/:id/actions` - Add a new action

## WebSocket Events

- `join-board` - Join a board room
- `leave-board` - Leave a board room
- `canvas-action` - Send canvas actions to other users
- `cursor-move` - Send cursor position updates