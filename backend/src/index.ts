import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { initSocketIO } from './lib/socket';
import { CleanupService } from './services/cleanup.service';
import boardsRouter from './routes/boards.routes';
import { validateConfig, ConfigError } from './lib/config';

// Validate environment configuration at startup
let config;
try {
  config = validateConfig();
  console.log('> Configuration validated successfully');
} catch (error) {
  if (error instanceof ConfigError) {
    console.error(`[Config] ${error.message}`);
    process.exit(1);
  }
  throw error;
}

const app: Application = express();
const server = createServer(app);

// Initialize Socket.IO
initSocketIO(server);

// Initialize cleanup service
const cleanupService = new CleanupService();
cleanupService.startPeriodicCleanup();

// Add body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Register API routes
app.use('/api/boards', boardsRouter);

const PORT = config.port;
server.listen(PORT, () => {
  console.log(`> Backend ready on http://localhost:${PORT}`);
  console.log('> WebSocket server ready');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down gracefully');
  cleanupService.stopPeriodicCleanup();
  server.close(() => {
    console.log('[Server] Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Server] SIGINT received, shutting down gracefully');
  cleanupService.stopPeriodicCleanup();
  server.close(() => {
    console.log('[Server] Process terminated');
    process.exit(0);
  });
});