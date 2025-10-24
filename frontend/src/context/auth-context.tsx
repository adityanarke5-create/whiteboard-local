'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthService, User } from '@/lib/auth-service';
import { authLogger } from '@/lib/auth-logger';

// Extend Window interface
declare global {
  interface Window {
    authHookLogged?: boolean;
  }
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  exportLogs: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Log environment configuration on mount - run only once
  useEffect(() => {
    authLogger.log('AuthContext', 'Initializing authentication context');
    AuthService.logEnvironmentConfig();
  }, []);

  // Check authentication status on mount - run only once
  useEffect(() => {
    authLogger.log('AuthContext', 'Checking initial authentication status');
    
    const initAuth = async () => {
      try {
        const authStatus = await AuthService.isAuthenticated();
        authLogger.log('AuthContext', 'Initial authentication status: ' + authStatus);
        setIsAuthenticated(authStatus);
        
        if (authStatus) {
          const currentUser = await AuthService.getCurrentUser();
          authLogger.log('AuthContext', 'Current user: ' + (currentUser ? currentUser.email : 'null'));
          setUser(currentUser);
        }
      } catch (error) {
        authLogger.error('AuthContext Initialization Error', error);
      } finally {
        setLoading(false);
        authLogger.log('AuthContext', 'Authentication context initialization complete');
      }
    };

    initAuth();
  }, []);

  // Memoize signIn function to prevent unnecessary re-renders
  const signIn = useCallback(async (email: string, password: string) => {
    authLogger.log('AuthContext', 'Signing in user: ' + email);
    
    try {
      const result = await AuthService.signIn(email, password);
      
      if ('error' in result) {
        authLogger.error('AuthContext Sign In Failed', new Error(result.error));
        return { success: false, error: result.error };
      } else {
        const currentUser = await AuthService.getCurrentUser();
        authLogger.log('AuthContext', 'Sign in successful, setting user state: ' + (currentUser ? currentUser.email : 'null'));
        setUser(currentUser);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error: any) {
      authLogger.error('AuthContext Sign In Error', error);
      return { success: false, error: error.message || 'Sign in failed' };
    }
  }, []);

  // Memoize signOut function to prevent unnecessary re-renders
  const signOut = useCallback(async () => {
    authLogger.log('AuthContext', 'Signing out user');
    
    try {
      await AuthService.signOut();
      authLogger.log('AuthContext', 'Sign out successful, clearing user state');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      authLogger.error('AuthContext Sign Out Error', error);
    }
  }, []);

  // Memoize refreshUser function to prevent unnecessary re-renders
  const refreshUser = useCallback(async () => {
    authLogger.log('AuthContext', 'Refreshing user information');
    
    try {
      const currentUser = await AuthService.getCurrentUser();
      authLogger.log('AuthContext', 'User information refreshed: ' + (currentUser ? currentUser.email : 'null'));
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    } catch (error) {
      authLogger.error('AuthContext Refresh User Error', error);
    }
  }, []);
  
  const exportLogs = useCallback((): string => {
    return AuthService.exportLogs();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    refreshUser,
    exportLogs
  };

  // Reduce logging frequency - only log when critical state changes
  useEffect(() => {
    if (!loading) {
      authLogger.log('AuthContext', 'State updated: ' + 
        `isAuthenticated=${isAuthenticated}, user=${user ? user.email : 'null'}`);
    }
  }, [isAuthenticated, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Reduce logging frequency in useAuth hook
  // Only log when in development mode and only once per session
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && !window.authHookLogged) {
      authLogger.log('useAuth', 'Accessing authentication context');
      window.authHookLogged = true;
    }
  }, []);

  return context;
}