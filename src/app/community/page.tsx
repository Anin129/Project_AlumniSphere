"use client";

import React, { useState } from 'react';
import { MessageSquare, Plus, TrendingUp, Users, CheckCircle } from 'lucide-react';
import PostCard from './components/PostCard';
import PostFilters from './components/PostFilters';
import { mockPosts } from './data';
import { Post, SortOption, FilterOption } from './types';

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const handleSort = (posts: Post[]) => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'comments':
          return b.comments - a.comments;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'trending':
        default:
          return b.votes + b.comments * 2 - (a.votes + a.comments * 2);
      }
    });
  };

  const handleFilter = (posts: Post[]) => {
    return posts.filter((post) => {
      if (filterBy === 'all') return true;
      if (filterBy === 'open') return post.status === 'open';
      if (filterBy === 'closed') return post.status === 'closed';
      if (filterBy === 'resolved') return post.isResolved;
      return true;
    });
  };

  const applySearch = (posts: Post[]) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.content, p.author.name, ...p.tags].some((t) => t.toLowerCase().includes(q))
    );
  };

  const posts = handleSort(handleFilter(applySearch(mockPosts)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Community Discussion
              </h1>
              <p className="text-gray-600">
                Connect, share knowledge, and get help from fellow students and alumni
              </p>
            </div>

            <button className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Ask Question</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <PostFilters
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          filterBy={filterBy}
          onFilterByChange={setFilterBy}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Discussions', value: '1,247', icon: MessageSquare, color: 'blue' },
            { label: 'Active Today', value: '89', icon: TrendingUp, color: 'green' },
            { label: 'Community Members', value: '2,341', icon: Users, color: 'purple' },
            { label: 'Resolved This Week', value: '156', icon: CheckCircle, color: 'emerald' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${
                    stat.color === 'blue'
                      ? 'from-blue-500 to-blue-600'
                      : stat.color === 'green'
                      ? 'from-green-500 to-green-600'
                      : stat.color === 'purple'
                      ? 'from-purple-500 to-purple-600'
                      : 'from-emerald-500 to-emerald-600'
                  }`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white/60 backdrop-blur-lg border border-white/30 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Discussions
          </button>
        </div>
      </div>
    </div>
  );
}