// Test script to verify user synchronization
const jwt = require('jsonwebtoken');

// Create a mock JWT token that simulates a Cognito token
const mockCognitoToken = jwt.sign(
  {
    sub: 'test-user-cognito-id-123',
    email: 'test@example.com',
    name: 'Test User'
  },
  'test-secret',
  {
    expiresIn: '1h',
    issuer: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_L5ECqz3kt',
    audience: '4gs73ppm5ksn0u5iul8dq3hiun'
  }
);

console.log('Mock Cognito Token:', mockCognitoToken);

// Test the backend API with the mock token
fetch('http://localhost:3001/api/boards', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${mockCognitoToken}`,
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));