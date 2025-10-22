'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { AuthService } from '@/lib/auth-service';

export default function AuthDebugPage() {
  const { exportLogs } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [envConfig, setEnvConfig] = useState<any>({});

  useEffect(() => {
    // Get environment configuration
    setEnvConfig({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    });

    // Get logs
    try {
      const logsData = exportLogs();
      setLogs(JSON.parse(logsData));
    } catch (error) {
      console.error('Error parsing logs:', error);
    }
  }, [exportLogs]);

  const handleExportLogs = () => {
    const logsData = exportLogs();
    const blob = new Blob([logsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'auth-logs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    // In a real implementation, you would clear the logs
    // For now, we'll just refresh the display
    try {
      const logsData = exportLogs();
      setLogs(JSON.parse(logsData));
    } catch (error) {
      console.error('Error parsing logs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Debug</h1>
        
        {/* Environment Configuration */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Environment Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {envConfig.region || 'Not set'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User Pool ID</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {envConfig.userPoolId ? `${envConfig.userPoolId.substring(0, 15)}...` : 'Not set'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client ID</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {envConfig.clientId ? `${envConfig.clientId.substring(0, 15)}...` : 'Not set'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Domain</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {envConfig.domain || 'Not set'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Debug Actions */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Debug Actions</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleExportLogs}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Export Logs
            </button>
            <button
              onClick={handleClearLogs}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Refresh Logs
            </button>
          </div>
        </div>
        
        {/* Authentication Logs */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication Logs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.event}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <pre className="whitespace-pre-wrap overflow-x-auto max-w-md">
                        {JSON.stringify(log.data || log.error, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}