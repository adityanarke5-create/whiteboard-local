import express from 'express';
import http from 'http';
import cors from 'cors';
import WebSocketServer from './lib/websocket-server';
import boardsRouter from './routes/boards.routes';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize WebSocket server
const wsServer = WebSocketServer.getInstance();
wsServer.attachServer(server);

// API Routes
app.use('/api/boards', boardsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes would be added here
// For now, we'll add a placeholder
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend API is running' });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`> Backend ready on http://localhost:${port}`);
  console.log(`> WebSocket server ready`);
});