"use client";

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type Props = {
  userVote: 'up' | 'down' | null;
  votes: number;
  onVote: (type: 'up' | 'down') => void;
};

export const VoteButtons: React.FC<Props> = ({ userVote, votes, onVote }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onVote('up')}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
          userVote === 'up'
            ? 'bg-green-100 text-green-600'
            : 'text-gray-500 hover:bg-gray-100 hover:text-green-600'
        }`}
      >
        <ArrowUp className={`h-4 w-4 ${userVote === 'up' ? 'fill-current' : ''}`} />
      </button>

      <span
        className={`font-bold min-w-[2rem] text-center ${
          votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-gray-600'
        }`}
      >
        {votes}
      </span>

      <button
        onClick={() => onVote('down')}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
          userVote === 'down'
            ? 'bg-red-100 text-red-600'
            : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'
        }`}
      >
        <ArrowDown className={`h-4 w-4 ${userVote === 'down' ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};
