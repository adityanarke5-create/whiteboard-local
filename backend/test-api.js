// Simple script to test backend API endpoints
const http = require('http');

// Test health endpoint
console.log('Testing health endpoint...');
const healthReq = http.get('http://localhost:3001/health', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Health endpoint response:', data);
  });
});

healthReq.on('error', (err) => {
  console.error('Error testing health endpoint:', err.message);
});

// Test API test endpoint
console.log('Testing API test endpoint...');
const testReq = http.get('http://localhost:3001/api/test', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('API test endpoint response:', data);
  });
});

testReq.on('error', (err) => {
  console.error('Error testing API test endpoint:', err.message);
});