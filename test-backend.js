const http = require('http');

// Test if backend is running
http.get('http://localhost:3001/health', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend is running:', data);
    testWebSocket();
  });
}).on('error', (err) => {
  console.error('❌ Backend not running:', err.message);
  process.exit(1);
});

function testWebSocket() {
  const io = require('socket.io-client');
  
  console.log('Testing WebSocket connection...');
  
  const socket = io('http://localhost:3001', {
    transports: ['websocket'],
    timeout: 5000
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket connected');
    socket.disconnect();
    process.exit(0);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ WebSocket connection failed:', error.message);
    process.exit(1);
  });

  setTimeout(() => {
    console.error('❌ WebSocket connection timeout');
    process.exit(1);
  }, 5000);
}