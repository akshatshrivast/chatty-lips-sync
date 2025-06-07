
import React from 'react';
import { LipSyncProcessor } from '@/components/LipSyncProcessor';

const LipSync = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lip Sync Animation Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert text dialogue into structured lip sync data for real-time avatar animation. 
            Generate precise visemes and timing information optimized for frontend consumption.
          </p>
        </div>
        
        <LipSyncProcessor />
      </div>
    </div>
  );
};

export default LipSync;
