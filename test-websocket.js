const io = require('socket.io-client');

console.log('Testing WebSocket connection...');

const socket = io('http://localhost:3001', {
  path: '/api/socketio',
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
  console.log('Socket ID:', socket.id);
  
  // Test joining a board
  socket.emit('join-board', 'test-board-123');
});

socket.on('board-joined', (data) => {
  console.log('✅ Board joined successfully:', data);
  
  // Test sending a canvas action
  socket.emit('canvas-action', {
    boardId: 'test-board-123',
    userId: 'test-user',
    action: {
      type: 'object:added',
      object: {
        id: 'test-object-123',
        type: 'rect',
        left: 100,
        top: 100,
        width: 50,
        height: 50
      }
    }
  });
});

socket.on('canvas-action', (data) => {
  console.log('✅ Received canvas action:', data);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

// Keep the test running for 10 seconds
setTimeout(() => {
  console.log('Test completed');
  socket.disconnect();
  process.exit(0);
}, 10000);