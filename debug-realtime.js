// Simple test to verify real-time collaboration
const io = require('socket.io-client');

const socket1 = io('http://localhost:3001', { path: '/api/socketio' });
const socket2 = io('http://localhost:3001', { path: '/api/socketio' });

const boardId = 'test-board';

socket1.on('connect', () => {
  console.log('Client 1 connected');
  socket1.emit('join-board', boardId);
});

socket2.on('connect', () => {
  console.log('Client 2 connected');
  socket2.emit('join-board', boardId);
});

socket1.on('board-joined', () => {
  console.log('Client 1 joined board');
  // Send a test action from client 1
  setTimeout(() => {
    socket1.emit('canvas-action', {
      boardId,
      userId: 'user1',
      action: {
        type: 'object:added',
        object: { id: 'test-rect', type: 'rect', left: 100, top: 100 }
      }
    });
    console.log('Client 1 sent canvas action');
  }, 1000);
});

socket2.on('canvas-action', (data) => {
  console.log('Client 2 received canvas action:', data.action.type);
  process.exit(0);
});

setTimeout(() => {
  console.log('Test timeout - real-time not working');
  process.exit(1);
}, 5000);