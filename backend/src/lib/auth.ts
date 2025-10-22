// Mock authentication functions for development
export const mockSignIn = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful authentication
  if (email && password) {
    return {
      user: {
        id: 'user-123',
        email,
        name: 'Test User',
      },
      token: 'mock-jwt-token',
    };
  }
  
  throw new Error('Invalid credentials');
};

export const mockSignUp = async (name: string, email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful registration
  if (name && email && password) {
    return {
      user: {
        id: 'user-123',
        email,
        name,
      },
    };
  }
  
  throw new Error('Registration failed');
};

export const mockSignOut = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock successful sign out
  return true;
};