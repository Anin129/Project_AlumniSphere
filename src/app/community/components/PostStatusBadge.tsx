"use client";

import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

type Props = {
  status: 'open' | 'closed';
  isResolved: boolean;
};

export const PostStatusBadge: React.FC<Props> = ({ status, isResolved }) => {
  return (
    <div className="flex items-center space-x-2">
      {isResolved && (
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <CheckCircle className="h-3 w-3" />
          <span>Resolved</span>
        </div>
      )}
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'open' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
        }`}
      >
        {status === 'open' ? (
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Open</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Closed</span>
          </div>
        )}
      </div>
    </div>
  );
};
