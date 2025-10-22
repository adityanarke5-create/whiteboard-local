// Enhanced WebSocket debug script with more detailed logging
const io = require('socket.io-client');

console.log('=== Enhanced WebSocket Debug Test ===');
console.log('Starting test at:', new Date().toISOString());

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

socket.on('connect', () => {
  isConnected = true;
  console.log('✓ Connected to WebSocket server');
  console.log('  Socket ID:', socket.id);
  console.log('  Time:', new Date().toISOString());
  
  // Join a test board
  console.log('\n→ Joining test board...');
  const boardId = 'debug-board-' + Date.now();
  socket.emit('join-board', boardId);
  
  // Wait a bit then send test actions
  setTimeout(() => {
    if (boardJoined) {
      console.log('\n→ Sending test canvas actions...');
      
      // Test 1: Add rectangle
      console.log('  Sending rectangle add action...');
      socket.emit('canvas-action', {
        boardId: boardId,
        action: { 
          type: 'add',
          object: {
            type: 'rect',
            left: 100,
            top: 100,
            width: 50,
            height: 50,
            fill: 'red',
            stroke: '#000000',
            strokeWidth: 2
          }
        },
        userId: 'debug-user-1'
      });
      
      // Test 2: Add circle after delay
      setTimeout(() => {
        console.log('  Sending circle add action...');
        socket.emit('canvas-action', {
          boardId: boardId,
          action: { 
            type: 'add',
            object: {
              type: 'circle',
              left: 200,
              top: 100,
              radius: 25,
              fill: 'blue',
              stroke: '#000000',
              strokeWidth: 2
            }
          },
          userId: 'debug-user-1'
        });
      }, 1000);
      
      // Test 3: Send cursor move
      setTimeout(() => {
        console.log('  Sending cursor move action...');
        socket.emit('cursor-move', {
          boardId: boardId,
          userId: 'debug-user-1',
          x: 150,
          y: 150
        });
      }, 2000);
      
      // Leave board and disconnect
      setTimeout(() => {
        console.log('\n→ Leaving test board and disconnecting...');
        socket.emit('leave-board', boardId);
        setTimeout(() => {
          socket.disconnect();
        }, 500);
      }, 5000);
    }
  }, 1000);
});

socket.on('board-joined', (data) => {
  boardJoined = true;
  console.log('← Received board-joined confirmation:', data);
});

socket.on('board-left', (data) => {
  console.log('← Received board-left confirmation:', data);
});

socket.on('action-processed', (data) => {
  console.log('← Received action-processed confirmation:', data);
});

// Listen for canvas updates
socket.on('canvas-update', (data) => {
  console.log('← Received canvas-update:', data);
});

// Listen for cursor updates
socket.on('cursor-update', (data) => {
  console.log('← Received cursor-update:', data);
});

socket.on('disconnect', () => {
  isConnected = false;
  console.log('✗ Disconnected from WebSocket server at:', new Date().toISOString());
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.log('✗ Connection error:', error.message);
  console.log('  Error details:', error);
});

socket.on('error', (error) => {
  console.log('✗ WebSocket error:', error.message);
  console.log('  Error details:', error);
});

// Log all events
socket.onAny((eventName, ...args) => {
  console.log(`← Received event: ${eventName}`, args);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, cleaning up...');
  if (isConnected) {
    socket.disconnect();
  }
  process.exit(0);
});

console.log('Debug script initialized. Waiting for connection...');