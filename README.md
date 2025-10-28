# Whiteboard Application

A collaborative whiteboard application with real-time functionality built with Node.js, TypeScript, Prisma, PostgreSQL, and Next.js.

## Project Structure

```
.
├── backend/              # Node.js/TypeScript backend with Prisma
│   ├── src/              # Source code
│   ├── prisma/           # Prisma schema and migrations
│   └── ...
├── frontend/             # Next.js frontend
│   ├── src/              # Source code
│   └── ...
├── deploy.sh             # AWS deployment script (Linux/Mac)
├── deploy.bat            # AWS deployment script (Windows)
├── dev.sh                # Local development script (Linux/Mac)
├── dev.bat               # Local development script (Windows)
├── destroy.sh            # AWS resource cleanup script (Linux/Mac)
├── destroy.bat           # AWS resource cleanup script (Windows)
└── DEPLOYMENT.md         # Detailed deployment documentation
```

## Features

- Real-time collaborative whiteboard
- User authentication with AWS Cognito
- Board sharing and collaboration
- Auto-save functionality
- Export capabilities (PNG, JPEG, SVG, JSON)
- Responsive design

## Technology Stack

### Backend
- Node.js with TypeScript
- Express.js web framework
- Socket.IO for real-time communication
- Prisma ORM with PostgreSQL
- AWS Cognito for authentication

### Frontend
- Next.js 16
- React 19
- Tailwind CSS for styling
- Fabric.js for canvas manipulation
- AWS Amplify for authentication

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (for local development)
- AWS Account (for deployment)

### Local Development

1. **Install dependencies:**
   ```bash
   # Install root dependencies (concurrently)
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd frontend
   npm install
   ```

2. **Set up environment variables:**
   Create `.env` files in both backend and frontend directories based on the `.env.example` files.

3. **Run the application:**
   ```bash
   # Run both frontend and backend using concurrently
   npm run dev
   
   # Or use the automated scripts:
   ./dev.sh  # Linux/Mac
   dev.bat   # Windows
   ```

### Deployment

For AWS deployment, see [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Scripts

- `deploy.sh` / `deploy.bat` - Deploy to AWS
- `dev.sh` / `dev.bat` - Run locally for development
- `destroy.sh` / `destroy.bat` - Clean up AWS resources

## Available npm Scripts (Root)

- `npm run dev` - Run both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run start` - Start both frontend and backend in production mode
- `npm run seed` - Seed the backend database

## License

This project is licensed under the MIT License.