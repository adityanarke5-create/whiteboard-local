'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { FiUsers, FiDownload, FiSave, FiEdit3, FiShare2, FiZap, FiLayers, FiMouse } from 'react-icons/fi';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FiEdit3 className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-900">CollabBoard</span>
            </div>
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              ) : isAuthenticated ? (
                <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Collaborate on Ideas
          <span className="block text-blue-600">Visually</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Create, draw, and brainstorm with your team on an infinite canvas. 
          Real-time collaboration made simple and beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-200 shadow-lg hover:shadow-xl">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-200 shadow-lg hover:shadow-xl">
                Start Creating Free
              </Link>
              <Link href="#features" className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 transition duration-200 shadow-lg hover:shadow-xl">
                Learn More
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to collaborate</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools designed for teams who think visually</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-xl mb-6 flex items-center justify-center">
              <FiUsers className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-time Collaboration</h3>
            <p className="text-gray-600 leading-relaxed">See cursors, edits, and changes from your team members instantly. No lag, no conflicts.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-xl mb-6 flex items-center justify-center">
              <FiDownload className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Export Anywhere</h3>
            <p className="text-gray-600 leading-relaxed">Export your boards as PNG, JPEG, SVG, or JSON. Perfect for presentations and documentation.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-xl mb-6 flex items-center justify-center">
              <FiSave className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Auto-save & Snapshots</h3>
            <p className="text-gray-600 leading-relaxed">Never lose your work. Automatic saving with version history and manual snapshots.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-orange-100 rounded-xl mb-6 flex items-center justify-center">
              <FiShare2 className="text-orange-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Sharing</h3>
            <p className="text-gray-600 leading-relaxed">Share boards with a link. Invite collaborators by email with editor or viewer permissions.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-red-100 rounded-xl mb-6 flex items-center justify-center">
              <FiLayers className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Rich Drawing Tools</h3>
            <p className="text-gray-600 leading-relaxed">Shapes, text, freehand drawing, and more. Everything you need to express your ideas.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl mb-6 flex items-center justify-center">
              <FiZap className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">Optimized for performance. Smooth drawing experience even with complex boards.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to start collaborating?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of teams already using CollabBoard</p>
          {isAuthenticated ? (
            <Link href="/dashboard" className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition duration-200 shadow-lg">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/auth/signup" className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition duration-200 shadow-lg">
              Get Started for Free
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
        <p>&copy; 2024 CollabBoard. Built for creative collaboration.</p>
      </footer>
    </div>
  );
}