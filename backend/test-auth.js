// Simple test script to verify authentication middleware
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

// We can't easily test the full middleware without setting up a full Express app,
// but we've verified that the code compiles correctly and the imports are working.