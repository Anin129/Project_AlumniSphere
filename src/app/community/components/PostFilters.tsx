"use client";

import React from 'react';
import { SortOption, FilterOption } from '../types';
import { Search } from 'lucide-react';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
  filterBy: FilterOption;
  onFilterByChange: (value: FilterOption) => void;
};

const PostFilters: React.FC<Props> = ({
  searchQuery,
  onSearchQueryChange,
  sortBy,
  onSortByChange,
  filterBy,
  onFilterByChange,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="trending">🔥 Trending</option>
            <option value="newest">🕒 Newest</option>
            <option value="votes">👍 Most Voted</option>
            <option value="comments">💬 Most Discussed</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => onFilterByChange(e.target.value as FilterOption)}
            className="px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="all">All Posts</option>
            <option value="open">Open Only</option>
            <option value="closed">Closed Only</option>
            <option value="resolved">Resolved Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostFilters;
