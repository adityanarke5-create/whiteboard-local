'use client';

import { useState, useEffect } from 'react';
import { FiX, FiCopy, FiMail, FiUsers, FiGlobe, FiLock, FiTrash2, FiCheck } from 'react-icons/fi';
import { AuthService } from '@/lib/auth-service';

interface Collaborator {
  id: string;
  email: string;
  role: string;
  status: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface SharingModalProps {
  boardId: string;
  isOpen: boolean;
  onClose: () => void;
  onCollaboratorsChange?: () => void;
}

export default function EnhancedSharingModal({
  boardId,
  isOpen,
  onClose,
  onCollaboratorsChange
}: SharingModalProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch collaborators and board info
  useEffect(() => {
    if (isOpen && boardId) {
      fetchCollaborators();
      generateShareLink();
    }
  }, [isOpen, boardId]);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const token = await AuthService.getCurrentToken();
      const response = await fetch(`/api/boards/${boardId}/collaborators`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCollaborators(data);
      }
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/board/${boardId}`;
    setShareLink(link);
  };

  const addCollaborator = async () => {
    if (!newCollaboratorEmail.trim()) return;

    setIsAddingCollaborator(true);
    try {
      const token = await AuthService.getCurrentToken();
      const response = await fetch(`/api/boards/${boardId}/collaborators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: newCollaboratorEmail,
          role: newCollaboratorRole
        })
      });

      if (response.ok) {
        const newCollaborator = await response.json();
        setCollaborators([...collaborators, newCollaborator]);
        setNewCollaboratorEmail('');
        onCollaboratorsChange?.();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add collaborator');
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
      alert('Failed to add collaborator');
    } finally {
      setIsAddingCollaborator(false);
    }
  };

  const removeCollaborator = async (collaboratorId: string) => {
    try {
      const token = await AuthService.getCurrentToken();
      const response = await fetch(`/api/boards/${boardId}/collaborators/${collaboratorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
        onCollaboratorsChange?.();
      }
    } catch (error) {
      console.error('Error removing collaborator:', error);
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const togglePublicAccess = async () => {
    try {
      const token = await AuthService.getCurrentToken();
      const response = await fetch(`/api/boards/${boardId}/sharing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isPublic: !isPublic
        })
      });

      if (response.ok) {
        setIsPublic(!isPublic);
      }
    } catch (error) {
      console.error('Error updating sharing settings:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Share Board</h2>
              <p className="text-sm text-gray-500">Invite collaborators and manage access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="text-gray-500 text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Share Link Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Share Link</h3>
              <button
                onClick={togglePublicAccess}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  isPublic 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isPublic ? <FiGlobe className="text-sm" /> : <FiLock className="text-sm" />}
                <span>{isPublic ? 'Public' : 'Private'}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
              />
              <button
                onClick={copyShareLink}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  copySuccess 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copySuccess ? <FiCheck className="text-sm" /> : <FiCopy className="text-sm" />}
                <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              {isPublic 
                ? 'Anyone with this link can view and edit this board' 
                : 'Only invited collaborators can access this board'
              }
            </p>
          </div>

          {/* Add Collaborator Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Invite Collaborators</h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
                />
              </div>
              
              <select
                value={newCollaboratorRole}
                onChange={(e) => setNewCollaboratorRole(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              
              <button
                onClick={addCollaborator}
                disabled={isAddingCollaborator || !newCollaboratorEmail.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAddingCollaborator ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <FiMail className="text-sm" />
                    <span>Invite</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Collaborators List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Collaborators ({collaborators.length})
            </h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : collaborators.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FiUsers className="mx-auto text-4xl mb-2 opacity-50" />
                <p>No collaborators yet</p>
                <p className="text-sm">Invite team members to start collaborating</p>
              </div>
            ) : (
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {(collaborator.user?.name || collaborator.email).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {collaborator.user?.name || collaborator.email}
                        </p>
                        <p className="text-sm text-gray-500">{collaborator.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        collaborator.role === 'editor' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {collaborator.role}
                      </span>
                      
                      <span className={`px-2 py-1 rounded text-xs ${
                        collaborator.status === 'accepted' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {collaborator.status}
                      </span>
                      
                      <button
                        onClick={() => removeCollaborator(collaborator.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove collaborator"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}