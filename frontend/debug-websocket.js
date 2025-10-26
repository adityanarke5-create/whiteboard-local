// Debug WebSocket communication
const io = require('socket.io-client');

console.log('Starting WebSocket debug test...');

// Connect to the WebSocket server with proper WebSocket transport configuration
const socket = io('http://localhost:3001', {
  path: '/api/socketio',
  transports: ['websocket'], // Force WebSocket transport only
  upgrade: false, // Disable HTTP upgrade to WebSocket
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Limit reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts
  reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
  randomizationFactor: 0.5, // Randomization factor for reconnection delay
  timeout: 20000, // Connection timeout
});

socket.on('connect', () => {
  console.log('✓ Connected to WebSocket server', socket.id);
  console.log('  Transport:', socket.io.engine.transport.name);
  
  // Join a test board
  console.log('Joining test board...');
  socket.emit('join-board', 'debug-board-id');
  
  // Listen for canvas updates
  socket.on('canvas-update', (data) => {
    console.log('← Received canvas-update:', data);
  });
  
  // Listen for cursor updates
  socket.on('cursor-update', (data) => {
    console.log('← Received cursor-update:', data);
  });
  
  // Send a test canvas action after a short delay
  setTimeout(() => {
    console.log('→ Sending test canvas-action...');
    socket.emit('canvas-action', {
      boardId: 'debug-board-id',
      action: { 
        type: 'add',
        object: {
          type: 'rect',
          left: 100,
          top: 100,
          width: 50,
          height: 50,
          fill: 'red'
        }
      },
      userId: 'debug-user-id'
    });
  }, 1000);
  
  // Send a test cursor move after another delay
  setTimeout(() => {
    console.log('→ Sending test cursor-move...');
    socket.emit('cursor-move', {
      boardId: 'debug-board-id',
      userId: 'debug-user-id',
      x: 200,
      y: 200
    });
  }, 2000);
  
  // Leave the board and disconnect after a final delay
  setTimeout(() => {
    console.log('Leaving test board and disconnecting...');
    socket.emit('leave-board', 'debug-board-id');
    socket.disconnect();
  }, 3000);
});

socket.on('disconnect', () => {
  console.log('✗ Disconnected from WebSocket server');
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.log('✗ Connection error:', error.message);
  console.log('  Error details:', error);
});

socket.on('error', (error) => {
  console.log('✗ WebSocket error:', error.message);
});