// Test WebSocket connection
const io = require('socket.io-client');

// Connect to the WebSocket server
const socket = io('http://localhost:3001', {
  path: '/api/socketio'
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
  
  // Join a test board
  socket.emit('join-board', 'test-board-id');
  console.log('Joined test board');
  
  // Listen for canvas updates
  socket.on('canvas-update', (data) => {
    console.log('Received canvas update:', data);
  });
  
  // Send a test action
  socket.emit('canvas-action', {
    boardId: 'test-board-id',
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
    userId: 'test-user-id'
  });
  console.log('Sent test action');
  
  // Leave the board after a short delay
  setTimeout(() => {
    socket.emit('leave-board', 'test-board-id');
    console.log('Left test board');
    socket.disconnect();
  }, 2000);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});