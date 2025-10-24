'use client';

import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/auth-service';

interface Collaborator {
  id: string;
  userId: string;
  role: string;
  user: {
    email: string;
    name: string;
  };
}

interface SharingModalProps {
  boardId: string;
  isOpen: boolean;
  onClose: () => void;
  onCollaboratorsChange: () => void;
}

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function SharingModal({ boardId, isOpen, onClose, onCollaboratorsChange }: SharingModalProps) {
  console.log('[SharingModal] Component rendered with props:', { boardId, isOpen });
  console.log('[SharingModal] BACKEND_API_BASE_URL:', BACKEND_API_BASE_URL);
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch collaborators when modal opens
  useEffect(() => {
    console.log('[SharingModal] useEffect triggered', { isOpen, boardId });
    if (isOpen) {
      fetchCollaborators();
    }
  }, [isOpen, boardId]);

  const fetchCollaborators = async () => {
    try {
      console.log('[SharingModal] Fetching collaborators for board:', boardId);
      const token = await AuthService.getCurrentToken();
      console.log('[SharingModal] Current token available:', !!token);
      
      if (!token) {
        console.warn('[SharingModal] No authentication token available');
        return;
      }

      const url = `${BACKEND_API_BASE_URL}/api/boards/${boardId}/collaborators`;
      console.log('[SharingModal] Making request to:', url);
      console.log('[SharingModal] Request headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('[SharingModal] Collaborators response status:', response.status);
      console.log('[SharingModal] Response headers:', [...response.headers.entries()]);
      
      if (response.ok) {
        const data = await response.json();
        console.log('[SharingModal] Collaborators retrieved:', data);
        setCollaborators(data);
      } else {
        const errorText = await response.text();
        console.error('[SharingModal] Failed to fetch collaborators:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        setError(`Failed to fetch collaborators: ${response.statusText} - ${errorText}`);
      }
    } catch (err) {
      console.error('[SharingModal] Failed to fetch collaborators:', err);
      setError('Failed to fetch collaborators');
    }
  };

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SharingModal] handleAddCollaborator called', { boardId, email, role });
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('[SharingModal] Adding collaborator:', { email, role, boardId });
      const token = await AuthService.getCurrentToken();
      console.log('[SharingModal] Current token available:', !!token);
      
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      // Additional debugging
      console.log('[SharingModal] Board ID type and value:', typeof boardId, boardId);
      if (!boardId) {
        console.error('[SharingModal] Board ID is missing!');
        setError('Board ID is missing');
        setLoading(false);
        return;
      }

      const url = `${BACKEND_API_BASE_URL}/api/boards/${boardId}/collaborators`;
      console.log('[SharingModal] Making POST request to:', url);
      console.log('[SharingModal] Request body:', { email, role });
      console.log('[SharingModal] Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, role })
      });

      console.log('[SharingModal] Add collaborator response status:', response.status);
      console.log('[SharingModal] Response headers:', [...response.headers.entries()]);
      
      if (response.ok) {
        setSuccess('Collaborator added successfully');
        setEmail('');
        await fetchCollaborators();
        onCollaboratorsChange();
      } else {
        const errorText = await response.text();
        console.error('[SharingModal] Failed to add collaborator:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        setError(`Failed to add collaborator: ${response.statusText} - ${errorText}`);
      }
    } catch (err) {
      console.error('[SharingModal] Failed to add collaborator:', err);
      setError('Failed to add collaborator');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollaborator = async (collaboratorId: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('[SharingModal] Removing collaborator:', { collaboratorId, boardId });
      const token = await AuthService.getCurrentToken();
      console.log('[SharingModal] Current token available:', !!token);
      
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const url = `${BACKEND_API_BASE_URL}/api/boards/${boardId}/collaborators/${collaboratorId}`;
      console.log('[SharingModal] Making DELETE request to:', url);
      console.log('[SharingModal] Request headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`
      });

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('[SharingModal] Remove collaborator response status:', response.status);
      console.log('[SharingModal] Response headers:', [...response.headers.entries()]);
      
      if (response.ok) {
        setSuccess('Collaborator removed successfully');
        await fetchCollaborators();
        onCollaboratorsChange();
      } else {
        const errorText = await response.text();
        console.error('[SharingModal] Failed to remove collaborator:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        setError(`Failed to remove collaborator: ${response.statusText} - ${errorText}`);
      }
    } catch (err) {
      console.error('[SharingModal] Failed to remove collaborator:', err);
      setError('Failed to remove collaborator');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Share Board</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">
                {success}
              </div>
            </div>
          )}

          <form onSubmit={handleAddCollaborator} className="mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="user@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Collaborator'}
            </button>
          </form>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Collaborators</h4>
            {collaborators.length === 0 ? (
              <p className="text-gray-500 text-sm">No collaborators yet</p>
            ) : (
              <ul className="space-y-2">
                {collaborators.map((collaborator) => (
                  <li key={collaborator.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {collaborator.user.name || collaborator.user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {collaborator.user.email} • {collaborator.role}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}