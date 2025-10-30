'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/auth-context';
import { AuthService } from '@/lib/auth-service';
import { FiPlus, FiUsers, FiShare2, FiMoreVertical, FiEdit3, FiTrash2, FiCopy } from 'react-icons/fi';

interface Board {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  isPublic: boolean;
  shareToken?: string;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    collaborators: number;
  };
}

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Fetch boards from API
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = await AuthService.getCurrentToken();
        const response = await fetch('/api/boards', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Boards data:', data);
        
        if (data.error) {
          console.error('Error fetching boards:', data.error);
          setBoards([]);
        } else {
          setBoards(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch boards:', error);
        setBoards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const createBoard = async () => {
    if (!newBoardTitle.trim()) return;
    
    setIsCreating(true);
    
    try {
      const token = await AuthService.getCurrentToken();
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newBoardTitle }),
      });
      
      if (response.ok) {
        const newBoard = await response.json();
        setBoards([...boards, newBoard]);
        setNewBoardTitle('');
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Failed to create board:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleBoardClick = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">Whiteboard</h1>
                  <p className="text-sm text-gray-500">Collaborative drawing workspace</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {user && (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-800 font-medium">
                          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="ml-3 hidden md:block">
                        <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-2 text-gray-600">Create and collaborate on whiteboards with your team.</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiPlus className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create New Board</h3>
              <p className="text-blue-100 mb-4">Start a fresh canvas for your ideas</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  placeholder="Board title"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && createBoard()}
                />
                <button
                  onClick={createBoard}
                  disabled={isCreating || !newBoardTitle.trim()}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50"
                >
                  {isCreating ? '...' : 'Create'}
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FiUsers className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Collaborators</h3>
              <p className="text-gray-600 mb-4">Invite team members to your boards</p>
              <div className="text-2xl font-bold text-green-600">
                {boards.reduce((acc, board) => acc + (board._count?.collaborators || 0), 0)}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FiEdit3 className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Total Boards</h3>
              <p className="text-gray-600 mb-4">Your creative workspace</p>
              <div className="text-2xl font-bold text-purple-600">{boards.length}</div>
            </div>
          </div>

          {/* Boards Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Your Boards</h3>
              <span className="text-sm text-gray-500">{boards.length} boards</span>
            </div>
          </div>
          
          {/* Boards Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : boards.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No boards yet</h3>
              <p className="mt-2 text-gray-500">Create your first board to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boards.map((board) => (
                <div 
                  key={board.id} 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-100"
                  onClick={() => handleBoardClick(board.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle menu click
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg transition"
                      >
                        <FiMoreVertical className="text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl mb-4 group-hover:scale-105 transition-transform">
                      <FiEdit3 className="text-4xl text-white opacity-80" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">{board.title}</h3>
                    {board.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{board.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <FiUsers className="text-xs" />
                          <span>{board._count?.collaborators || 0}</span>
                        </div>
                        {board.isPublic && (
                          <div className="flex items-center space-x-1">
                            <FiShare2 className="text-xs" />
                            <span>Public</span>
                          </div>
                        )}
                      </div>
                      <span>{new Date(board.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Whiteboard. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
