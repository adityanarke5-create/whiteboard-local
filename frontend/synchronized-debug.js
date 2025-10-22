// Synchronized debug script - run this script twice with different arguments
// node synchronized-debug.js listener
// node synchronized-debug.js sender

const io = require('socket.io-client');
const args = process.argv.slice(2);
const mode = args[0] || 'sender'; // 'sender' or 'listener'

const BOARD_ID = 'sync-debug-board';
const SERVER_URL = 'http://localhost:3001';

console.log(`=== Synchronized WebSocket Debug Test (${mode}) ===`);
console.log(`Mode: ${mode}`);
console.log(`Board ID: ${BOARD_ID}`);
console.log(`Server URL: ${SERVER_URL}`);
console.log('Time:', new Date().toISOString());

// Connect to the WebSocket server
const socket = io(SERVER_URL, {
  path: '/api/socketio',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000
});

let isConnected = false;

socket.on('connect', () => {
  isConnected = true;
  console.log(`✓ ${mode} connected to WebSocket server`);
  console.log('  Socket ID:', socket.id);
  console.log('  Time:', new Date().toISOString());
  
  // Join the board
  console.log(`\n→ ${mode} joining board...`);
  socket.emit('join-board', BOARD_ID);
});

socket.on('board-joined', (data) => {
  console.log(`← ${mode} received board-joined confirmation:`, data);
  
  if (mode === 'sender') {
    // Sender starts sending messages after joining
    setTimeout(() => {
      console.log('\n→ Sender sending test canvas actions...');
      
      // Test 1: Add rectangle
      console.log('  Sending rectangle add action...');
      socket.emit('canvas-action', {
        boardId: BOARD_ID,
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
        userId: 'sender-user'
      });
      
      // Test 2: Add circle after delay
      setTimeout(() => {
        console.log('  Sending circle add action...');
        socket.emit('canvas-action', {
          boardId: BOARD_ID,
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
          userId: 'sender-user'
        });
      }, 1000);
      
      // Test 3: Send cursor move
      setTimeout(() => {
        console.log('  Sending cursor move action...');
        socket.emit('cursor-move', {
          boardId: BOARD_ID,
          userId: 'sender-user',
          x: 150,
          y: 150
        });
      }, 2000);
      
      // Leave board and disconnect
      setTimeout(() => {
        console.log('\n→ Sender leaving board and disconnecting...');
        socket.emit('leave-board', BOARD_ID);
        setTimeout(() => {
          socket.disconnect();
        }, 500);
      }, 5000);
    }, 1000);
  }
});

// Listen for canvas updates
socket.on('canvas-update', (data) => {
  console.log(`← ${mode} received canvas-update:`, data);
});

// Listen for cursor updates
socket.on('cursor-update', (data) => {
  console.log(`← ${mode} received cursor-update:`, data);
});

socket.on('action-processed', (data) => {
  console.log(`← ${mode} received action-processed:`, data);
});

socket.on('disconnect', () => {
  isConnected = false;
  console.log(`✗ ${mode} disconnected from WebSocket server at:`, new Date().toISOString());
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.log(`✗ ${mode} connection error:`, error.message);
});

socket.on('error', (error) => {
  console.log(`✗ ${mode} WebSocket error:`, error.message);
});

// Log all events
socket.onAny((eventName, ...args) => {
  console.log(`← ${mode} received event: ${eventName}`, args);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(`\nReceived SIGINT, cleaning up ${mode}...`);
  if (isConnected) {
    socket.disconnect();
  }
  process.exit(0);
});

console.log(`${mode} script initialized. Waiting for connection...`);