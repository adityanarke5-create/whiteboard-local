// Simple test script to verify authentication service
const { AuthService } = require('./src/lib/auth-service');

// This is just a placeholder test - in a real scenario, you would need to sign in first
console.log('Testing AuthService.getCurrentToken()...');

// Mock the fetchAuthSession function for testing
jest.mock('aws-amplify/auth', () => ({
  fetchAuthSession: jest.fn().mockResolvedValue({
    tokens: {
      idToken: {
        toString: () => 'test-jwt-token-12345'
      }
    }
  }),
  getCurrentUser: jest.fn().mockResolvedValue({
    userId: 'test-user-id',
    username: 'test@example.com'
  }),
  fetchUserAttributes: jest.fn().mockResolvedValue({
    email: 'test@example.com',
    name: 'Test User'
  })
}));

// Test the getCurrentToken function
AuthService.getCurrentToken().then(token => {
  console.log('Token retrieved:', token ? token.substring(0, 20) + '...' : 'null');
}).catch(error => {
  console.error('Error retrieving token:', error);
});