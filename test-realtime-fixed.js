const io = require('socket.io-client');

console.log('Testing real-time collaboration...');

// Create two clients
const client1 = io('http://localhost:3001', { 
  transports: ['websocket'],
  forceNew: true 
});

const client2 = io('http://localhost:3001', { 
  transports: ['websocket'],
  forceNew: true 
});

const boardId = 'test-board-' + Date.now();
let client1Connected = false;
let client2Connected = false;

// Client 1 setup
client1.on('connect', () => {
  console.log('✅ Client 1 connected');
  client1Connected = true;
  client1.emit('join-board', boardId);
});

client1.on('board-joined', () => {
  console.log('✅ Client 1 joined board');
  checkBothReady();
});

// Client 2 setup
client2.on('connect', () => {
  console.log('✅ Client 2 connected');
  client2Connected = true;
  client2.emit('join-board', boardId);
});

client2.on('board-joined', () => {
  console.log('✅ Client 2 joined board');
  checkBothReady();
});

// Test real-time action
function checkBothReady() {
  if (client1Connected && client2Connected) {
    setTimeout(() => {
      console.log('📤 Client 1 sending canvas action...');
      client1.emit('canvas-action', {
        boardId,
        userId: 'user1',
        action: {
          type: 'object:added',
          object: {
            id: 'test-rect-' + Date.now(),
            type: 'rect',
            left: 100,
            top: 100,
            width: 50,
            height: 50,
            fill: 'red'
          }
        }
      });
    }, 1000);
  }
}

// Client 2 should receive the action
client2.on('canvas-action', (data) => {
  console.log('✅ Client 2 received canvas action:', data.action.type);
  console.log('🎉 Real-time collaboration is working!');
  
  // Clean up
  client1.disconnect();
  client2.disconnect();
  process.exit(0);
});

// Error handling
client1.on('connect_error', (error) => {
  console.error('❌ Client 1 connection error:', error.message);
});

client2.on('connect_error', (error) => {
  console.error('❌ Client 2 connection error:', error.message);
});

// Timeout
setTimeout(() => {
  console.log('❌ Test timeout - real-time collaboration not working');
  client1.disconnect();
  client2.disconnect();
  process.exit(1);
}, 10000);