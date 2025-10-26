const io = require('socket.io-client');

// Test WebSocket connection
const socket = io('http://localhost:3001', {
  path: '/api/socketio',
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
  console.log('Socket ID:', socket.id);
  
  // Test joining a board
  socket.emit('join-board', 'test-board-id');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

socket.on('board-joined', (data) => {
  console.log('Board joined:', data);
});

// Keep the process running
process.stdin.resume();