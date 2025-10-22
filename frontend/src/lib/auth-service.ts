import { Amplify } from 'aws-amplify';
import { 
  signIn, 
  signUp, 
  confirmSignUp, 
  signOut, 
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession
} from 'aws-amplify/auth';
import { configureAmplify } from './amplify-config';
import { authLogger } from './auth-logger';

// Initialize Amplify
configureAmplify();

export interface User {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  // Check if Amplify is properly configured
  private static isConfigured(): boolean {
    return !!(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID && 
              process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID && 
              process.env.NEXT_PUBLIC_COGNITO_DOMAIN && 
              process.env.NEXT_PUBLIC_AWS_REGION);
  }

  // Sign up a new user
  static async signUp(name: string, email: string, password: string): Promise<{ user: any } | { error: string }> {
    authLogger.logAuthFlow('Sign Up Attempt', { name, email });
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      const error = 'AWS Cognito is not properly configured. Please check your environment variables.';
      authLogger.error('Sign Up Error - Config', new Error(error));
      return { error };
    }
    
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });
      
      authLogger.logAuthFlow('Sign Up Success', { userId: result.userId });
      return { user: result };
    } catch (error: any) {
      authLogger.error('Sign Up Error', error);
      return { error: error.message || 'Failed to sign up' };
    }
  }

  // Confirm sign up with code
  static async confirmSignUp(email: string, code: string): Promise<{ success: boolean } | { error: string }> {
    authLogger.logAuthFlow('Confirm Sign Up Attempt', { email });
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      const error = 'AWS Cognito is not properly configured. Please check your environment variables.';
      authLogger.error('Confirm Sign Up Error - Config', new Error(error));
      return { error };
    }
    
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      
      authLogger.logAuthFlow('Confirm Sign Up Success', { email });
      return { success: true };
    } catch (error: any) {
      authLogger.error('Confirm Sign Up Error', error);
      return { error: error.message || 'Failed to confirm sign up' };
    }
  }

  // Sign in user
  static async signIn(email: string, password: string): Promise<{ user: any } | { error: string }> {
    authLogger.logAuthFlow('Sign In Attempt', { email });
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      const error = 'AWS Cognito is not properly configured. Please check your environment variables.';
      authLogger.error('Sign In Error - Config', new Error(error));
      return { error };
    }
    
    try {
      const user = await signIn({ username: email, password });
      
      authLogger.logAuthFlow('Sign In Success', { 
        nextStep: user.nextStep,
        isSignedIn: user.isSignedIn
      });
      
      // Get the JWT token and store it in localStorage
      try {
        const session = await fetchAuthSession();
        authLogger.logAuthFlow('Session Retrieved', { 
          hasTokens: !!session.tokens,
          hasIdToken: !!session.tokens?.idToken
        });
        
        const token = session.tokens?.idToken?.toString();
        authLogger.logAuthFlow('Token Extracted', { 
          hasToken: !!token,
          tokenLength: token ? token.length : 0
        });
        
        if (token) {
          localStorage.setItem('cognito_token', token);
          authLogger.logTokenEvent('Token Stored', { token: token.substring(0, 20) + '...' });
        } else {
          // Store a placeholder if no token is available
          localStorage.setItem('cognito_token', 'placeholder-token');
          authLogger.logTokenEvent('Placeholder Token Stored', { reason: 'No valid token available' });
        }
      } catch (sessionError) {
        authLogger.error('Session Retrieval Error', sessionError);
        // Store a placeholder if session retrieval fails
        localStorage.setItem('cognito_token', 'placeholder-token');
        authLogger.logTokenEvent('Placeholder Token Stored', { reason: 'Session retrieval failed' });
      }
      
      return { user };
    } catch (error: any) {
      authLogger.error('Sign In Error', error);
      return { error: error.message || 'Failed to sign in' };
    }
  }

  // Sign out user
  static async signOut(): Promise<void> {
    authLogger.logAuthFlow('Sign Out Attempt');
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      const error = 'AWS Cognito is not properly configured. Please check your environment variables.';
      authLogger.error('Sign Out Error - Config', new Error(error));
      return;
    }
    
    try {
      await signOut();
      
      authLogger.logAuthFlow('Sign Out Success');
      // Remove the token from localStorage
      localStorage.removeItem('cognito_token');
      authLogger.logTokenEvent('Token Removed');
    } catch (error: any) {
      authLogger.error('Sign Out Error', error);
    }
  }

  // Get current authenticated user
  static async getCurrentUser(): Promise<User | null> {
    authLogger.logAuthFlow('Get Current User Attempt');
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      const error = 'AWS Cognito is not properly configured. Please check your environment variables.';
      authLogger.error('Get Current User Error - Config', new Error(error));
      return null;
    }
    
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      
      authLogger.logUserEvent('User Retrieved', { 
        userId: user.userId,
        username: user.username
      });
      
      return {
        id: user.userId,
        email: attributes.email || '',
        name: attributes.name || '',
      };
    } catch (error: any) {
      authLogger.error('Get Current User Error', error);
      return null;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    authLogger.logAuthFlow('Check Authentication Status');
    
    // Check if Amplify is configured
    if (!this.isConfigured()) {
      authLogger.logAuthFlow('Authentication Check - Config Incomplete');
      return false;
    }
    
    try {
      await getCurrentUser();
      
      authLogger.logAuthFlow('User Authenticated');
      return true;
    } catch (error: any) {
      authLogger.logAuthFlow('User Not Authenticated', {
        message: error.message,
        code: error.code
      });
      
      return false;
    }
  }
  
  // Get the current JWT token
  static async getCurrentToken(): Promise<string | null> {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      authLogger.logTokenEvent('Current Token Retrieved', { 
        hasToken: !!token,
        tokenLength: token ? token.length : 0
      });
      return token || null;
    } catch (error) {
      authLogger.error('Get Current Token Error', error);
      // Try to get token from localStorage as fallback
      const storedToken = localStorage.getItem('cognito_token');
      if (storedToken && storedToken !== 'placeholder-token') {
        authLogger.logTokenEvent('Fallback Token Retrieved from Storage', { 
          tokenLength: storedToken.length
        });
        return storedToken;
      }
      return null;
    }
  }
  
  // Log environment configuration
  static logEnvironmentConfig(): void {
    authLogger.logEnvironmentConfig();
  }
  
  // Export logs for debugging
  static exportLogs(): string {
    return authLogger.exportLogs();
  }
}