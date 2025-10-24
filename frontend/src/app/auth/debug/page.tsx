'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth-service';
import { useAuth } from '@/context/auth-context';

export default function AuthDebug() {
  const { user, isAuthenticated, loading, refreshUser, exportLogs } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [logs, setLogs] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        const token = await AuthService.getCurrentToken();
        const authStatus = await AuthService.isAuthenticated();
        
        setDebugInfo({
          isAuthenticated: authStatus,
          user,
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
        });
      } catch (error) {
        console.error('Debug error:', error);
      }
    };

    if (!loading) {
      fetchDebugInfo();
    }
  }, [user, isAuthenticated, loading]);

  const handleRefresh = async () => {
    await refreshUser();
  };

  const handleExportLogs = () => {
    const exportedLogs = exportLogs();
    setLogs(exportedLogs);
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Authentication Debug</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Authentication Status</h2>
              <p className="text-gray-600">Authenticated: <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>{isAuthenticated ? 'Yes' : 'No'}</span></p>
              <p className="text-gray-600">Loading: <span className={loading ? 'text-yellow-600' : 'text-green-600'}>{loading ? 'Yes' : 'No'}</span></p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">User Information</h2>
              {user ? (
                <>
                  <p className="text-gray-600">Name: {user.name}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">ID: {user.id}</p>
                </>
              ) : (
                <p className="text-gray-600">No user data available</p>
              )}
            </div>
          </div>
          
          {debugInfo && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Debug Information</h2>
              <p className="text-gray-600">Has Token: <span className={debugInfo.hasToken ? 'text-green-600' : 'text-red-600'}>{debugInfo.hasToken ? 'Yes' : 'No'}</span></p>
              <p className="text-gray-600">Token Preview: {debugInfo.tokenPreview}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Refresh User
            </button>
            
            <button
              onClick={handleExportLogs}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Export Logs
            </button>
            
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        {logs && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Authentication Logs</h2>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {logs}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}