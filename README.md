# CollabBoard - Real-time Collaborative Whiteboard

A real-time collaborative whiteboard application built with Next.js 14+, Fabric.js, Tailwind CSS, PostgreSQL, Prisma, and AWS Cognito authentication.

## Project Structure

This project is divided into two main parts:

```
.
├── backend/             # Backend service (Node.js, Prisma, Socket.io)
└── frontend/            # Frontend application (Next.js, React, Tailwind CSS)
```

## Features

- **Real-time Collaboration**: Multiple users can work on the same whiteboard simultaneously
- **Drawing Tools**: Pen, shapes, text, and eraser tools
- **Export Options**: Export boards as PNG, JPG, SVG, or JSON
- **User Authentication**: Secure authentication with AWS Cognito
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Board Management**: Create, view, and manage multiple boards

## Tech Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Fabric.js for canvas operations
- Socket.io-client for real-time features

### Backend
- Node.js
- PostgreSQL with Prisma ORM
- Socket.io for WebSocket connections
- AWS Cognito for authentication

## Getting Started

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file with your configuration:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/whiteboard
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
   ```

4. **Set up the database**:
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file with your configuration:
   ```env
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see the application.

## Database

The database schema is defined in `backend/prisma/schema.prisma`. The main models are:
- User
- Board
- BoardCollaborator
- BoardAction
- BoardSnapshot

## Deployment

To deploy the application:

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend server**:
   ```bash
   cd ../backend
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.