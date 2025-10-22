// Test script to verify environment variables
console.log('=== Environment Variables Test ===');

// Test NEXT_PUBLIC_BACKEND_URL
console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

// Test default value
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
console.log('BACKEND_API_BASE_URL:', BACKEND_API_BASE_URL);

console.log('\n--- Test Complete ---');