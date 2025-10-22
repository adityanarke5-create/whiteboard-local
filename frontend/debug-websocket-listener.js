// Debug WebSocket listener - second client to verify broadcast
const io = require('socket.io-client');

console.log('Starting WebSocket listener test...');

// Connect to the WebSocket server
const socket = io('http://localhost:3001', {
  path: '/api/socketio'
});

socket.on('connect', () => {
  console.log('✓ Listener connected to WebSocket server', socket.id);
  
  // Join the same test board
  console.log('Joining test board as listener...');
  socket.emit('join-board', 'debug-board-id');
  
  // Listen for canvas updates
  socket.on('canvas-update', (data) => {
    console.log('← Listener received canvas-update:', data);
  });
  
  // Listen for cursor updates
  socket.on('cursor-update', (data) => {
    console.log('← Listener received cursor-update:', data);
  });
});

socket.on('disconnect', () => {
  console.log('✗ Listener disconnected from WebSocket server');
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.log('✗ Listener connection error:', error.message);
});

socket.on('error', (error) => {
  console.log('✗ Listener WebSocket error:', error.message);
});

// Keep the listener alive for 10 seconds
setTimeout(() => {
  console.log('Listener test completed, disconnecting...');
  socket.emit('leave-board', 'debug-board-id');
  socket.disconnect();
}, 10000);