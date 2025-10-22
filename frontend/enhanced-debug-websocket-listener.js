// Enhanced WebSocket listener - second client to verify broadcast
const io = require('socket.io-client');

console.log('=== Enhanced WebSocket Listener Test ===');
console.log('Starting listener at:', new Date().toISOString());

// Connect to the WebSocket server
const socket = io('http://localhost:3001', {
  path: '/api/socketio',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000
});

// Track connection state
let isConnected = false;
let boardJoined = false;
const boardId = 'debug-board-' + Date.now();

socket.on('connect', () => {
  isConnected = true;
  console.log('✓ Listener connected to WebSocket server');
  console.log('  Socket ID:', socket.id);
  console.log('  Time:', new Date().toISOString());
  
  // Join the same test board
  console.log('\n→ Joining test board as listener...');
  socket.emit('join-board', boardId);
});

socket.on('board-joined', (data) => {
  boardJoined = true;
  console.log('← Received board-joined confirmation:', data);
});

// Listen for canvas updates
socket.on('canvas-update', (data) => {
  console.log('← Listener received canvas-update:', data);
  console.log('  Action type:', data.action?.type);
  console.log('  From user:', data.userId);
  console.log('  Time:', new Date().toISOString());
});

// Listen for cursor updates
socket.on('cursor-update', (data) => {
  console.log('← Listener received cursor-update:', data);
  console.log('  From user:', data.userId);
  console.log('  Position:', `${data.x}, ${data.y}`);
  console.log('  Time:', new Date().toISOString());
});

socket.on('action-processed', (data) => {
  console.log('← Listener received action-processed:', data);
});

socket.on('disconnect', () => {
  isConnected = false;
  console.log('✗ Listener disconnected from WebSocket server at:', new Date().toISOString());
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.log('✗ Listener connection error:', error.message);
  console.log('  Error details:', error);
});

socket.on('error', (error) => {
  console.log('✗ Listener WebSocket error:', error.message);
  console.log('  Error details:', error);
});

// Log all events
socket.onAny((eventName, ...args) => {
  console.log(`← Listener received event: ${eventName}`, args);
});

// Keep the listener alive
console.log('\nListener will stay active for 30 seconds...');
setTimeout(() => {
  console.log('\n→ Listener test completed, leaving board and disconnecting...');
  if (boardJoined) {
    socket.emit('leave-board', boardId);
  }
  setTimeout(() => {
    socket.disconnect();
    console.log('Listener test finished at:', new Date().toISOString());
  }, 500);
}, 30000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, cleaning up listener...');
  if (isConnected) {
    socket.disconnect();
  }
  process.exit(0);
});

console.log('Listener script initialized. Waiting for connection...');