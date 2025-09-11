"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Plus, TrendingUp, Users, CheckCircle } from 'lucide-react';
import PostCard from './components/PostCard';
import PostFilters from './components/PostFilters';
import { Post, SortOption, FilterOption } from './types';
import { useRouter } from 'next/navigation';

export default function CommunityPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([] as unknown as Post[]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/community', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        const mapped: Post[] = (data.posts || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          content: p.content,
          tags: p.tags || [],
          status: p.status,
          isResolved: p.isResolved,
          votes: p.votes || 0,
          comments: p.commentsCount || 0,
          createdAt: new Date(p.createdAt).toLocaleString(),
          author: {
            name: p.author?.name || 'Unknown',
            graduationYear: p.author?.graduationYear || '—',
            role: p.author?.role || 'student',
            avatar: (p.author?.name || '?').slice(0, 1).toUpperCase()
          },
          userVote: null,
          resolvedBy: p.resolvedBy
            ? {
                name: p.resolvedBy.name,
                graduationYear: p.resolvedBy.graduationYear
              }
            : undefined
        }));
        setPostsData(mapped);
      } catch (e: any) {
        setError(e.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

  const posts = useMemo(() => handleSort(handleFilter(applySearch(postsData))), [postsData, sortBy, filterBy, searchQuery]);

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

            <button onClick={() => router.push('/community/create')} className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            { label: 'Total Discussions', value: '1,247', icon: MessageSquare, color: 'blue' },
            { label: 'Active Today', value: '89', icon: TrendingUp, color: 'green' },
            { label: 'Community Members', value: '2,341', icon: Users, color: 'purple' },
            { label: 'Resolved This Week', value: '156', icon: CheckCircle, color: 'emerald' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div
                  className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-r shrink-0 ${
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

        {loading && (
          <div className="text-gray-600">Loading posts...</div>
        )}
        {error && (
          <div className="text-red-600">{error}</div>
        )}
        {!loading && !error && (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-white/60 backdrop-blur-lg border border-white/30 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Discussions
          </button>
        </div>
      </div>
    </div>
  );
}