'use client';

import { useState } from 'react';
import SharingModal from '@/components/SharingModal';

export default function TestSharing() {
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [boardId] = useState('test-board-id');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sharing Modal Test</h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            This page tests the sharing modal functionality. Click the button below to open the sharing modal.
          </p>
          
          <button
            onClick={() => setIsSharingModalOpen(true)}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Open Sharing Modal
          </button>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Testing Instructions</h2>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Click the "Open Sharing Modal" button above</li>
              <li>Verify that the sharing modal opens correctly</li>
              <li>Check that the UI displays properly without errors</li>
              <li>Test adding and removing collaborators (backend required for full functionality)</li>
              <li>Close the modal using the X button or clicking outside</li>
            </ul>
          </div>
        </div>
      </div>
      
      <SharingModal
        boardId={boardId}
        isOpen={isSharingModalOpen}
        onClose={() => setIsSharingModalOpen(false)}
        onCollaboratorsChange={() => {
          console.log('Collaborators changed in test page');
        }}
      />
    </div>
  );
}