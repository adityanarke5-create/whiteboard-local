'use client';

import { useState } from 'react';
import SharingModal from '@/components/SharingModal';

export default function SharingTest() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">Sharing Modal Test</h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative p-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Open Sharing Modal
        </button>
        
        <SharingModal
          boardId="test-board-id"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCollaboratorsChange={() => console.log('Collaborators changed')}
        />
      </main>
    </div>
  );
}