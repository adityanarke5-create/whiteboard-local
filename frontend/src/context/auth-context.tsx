'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, User } from '@/lib/auth-service';
import { authLogger } from '@/lib/auth-logger';

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

  // Log environment configuration on mount
  useEffect(() => {
    authLogger.log('AuthContext', 'Initializing authentication context');
    AuthService.logEnvironmentConfig();
  }, []);

  // Check authentication status on mount
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

  const signIn = async (email: string, password: string) => {
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
  };

  const signOut = async () => {
    authLogger.log('AuthContext', 'Signing out user');
    
    try {
      await AuthService.signOut();
      authLogger.log('AuthContext', 'Sign out successful, clearing user state');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      authLogger.error('AuthContext Sign Out Error', error);
    }
  };

  const refreshUser = async () => {
    authLogger.log('AuthContext', 'Refreshing user information');
    
    try {
      const currentUser = await AuthService.getCurrentUser();
      authLogger.log('AuthContext', 'User information refreshed: ' + (currentUser ? currentUser.email : 'null'));
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    } catch (error) {
      authLogger.error('AuthContext Refresh User Error', error);
    }
  };
  
  const exportLogs = (): string => {
    return AuthService.exportLogs();
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    refreshUser,
    exportLogs
  };

  authLogger.log('AuthContext', 'Providing authentication context: ' + 
    `isAuthenticated=${isAuthenticated}, user=${user ? user.email : 'null'}, loading=${loading}`);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  authLogger.log('useAuth', 'Accessing authentication context: ' + 
    `isAuthenticated=${context.isAuthenticated}, user=${context.user ? context.user.email : 'null'}, loading=${context.loading}`);
  
  return context;
}