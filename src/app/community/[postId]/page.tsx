"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MessageSquare, User, Calendar, ArrowLeft, Heart, Share2 } from 'lucide-react';

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  authorModel: 'Student' | 'Alumni';
  authorId: string;
  likes?: number;
};

export default function PostDetailPage() {
  const params = useParams();
  const { postId } = params as { postId: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const storageKey = useMemo(() => `liked:post:${postId}`, [postId]);
  const [liked, setLiked] = useState(false);
  const [votes, setVotes] = useState<number>(0);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentRole, setCommentRole] = useState<'Student' | 'Alumni'>('Student');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/community/${postId}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch post');

        const data = await res.json();
        setPost(data);
        setVotes(Number(data.votes || 0));
        setComments((data.comments || []).map((c: any) => ({
          id: c.id,
          content: c.content,
          createdAt: c.createdAt,
          authorModel: c.authorModel,
          authorId: c.authorId,
          likes: c.likes || 0
        })));
      } catch (e: any) {
        setError(e.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (postId) load();
  }, [postId]);

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      setLiked(saved === '1');
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    // Initialize liked state for comments from localStorage on comments change
    try {
      const initial: Record<string, boolean> = {};
      comments.forEach((c) => {
        const key = `liked:comment:${c.id}`;
        initial[c.id] = typeof window !== 'undefined' && localStorage.getItem(key) === '1';
      });
      setLikedComments(initial);
    } catch {}
  }, [comments]);

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    // optimistic update
    setLiked(nextLiked);
    setVotes((v) => Math.max(0, v + (nextLiked ? 1 : -1)));

    try {
      const res = await fetch(`/api/community/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ like: nextLiked })
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.votes === 'number') setVotes(Math.max(0, data.votes));
        try {
          if (nextLiked) localStorage.setItem(storageKey, '1');
          else localStorage.removeItem(storageKey);
        } catch {}
      } else {
        // revert on failure
        setLiked(!nextLiked);
        setVotes((v) => Math.max(0, v + (nextLiked ? -1 : 1)));
      }
    } catch {
      setLiked(!nextLiked);
      setVotes((v) => Math.max(0, v + (nextLiked ? -1 : 1)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.back()} className="p-2 rounded-lg bg-white/60 backdrop-blur-lg border border-white/30 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Discussion Details
                </h1>
                <p className="text-gray-600">View and engage with community discussions</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={handleToggleLike} aria-pressed={liked} className={`p-2 rounded-lg backdrop-blur-lg border transition-all duration-300 shadow-lg hover:shadow-xl ${liked ? 'bg-pink-50 border-pink-200' : 'bg-white/60 border-white/30 hover:bg-white/80'}`}>
                <Heart className={`w-5 h-5 ${liked ? 'text-pink-600 fill-pink-600' : 'text-gray-700'}`} />
              </button>
              <button className="p-2 rounded-lg bg-white/60 backdrop-blur-lg border border-white/30 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {loading && (
          <div className="text-center">
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-12 shadow-lg">
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin border-2 border-white"></div>
                <p className="text-gray-600 font-medium">Loading discussion...</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="bg-red-50/60 backdrop-blur-lg border border-red-200/30 rounded-xl p-8 shadow-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && post && (
          <>
            {/* Main Post */}
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 mb-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author?.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{post.author?.name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{post.author?.role || 'User'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {post.tags?.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{post.content}</p>
              </div>

              {/* Post Stats */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200/50">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Heart className={`w-5 h-5 ${liked ? 'text-pink-600 fill-pink-600' : ''}`} />
                    <span className="font-medium">{votes} votes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">{comments.length} comments</span>
                  </div>
                </div>

                {post.isResolved && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Resolved</span>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="break-words">Discussion ({comments.length})</span>
                </h2>

                <button onClick={() => setIsAddingComment(true)} className="self-stretch sm:self-auto w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Add Comment
                </button>
              </div>

              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium mb-2">No comments yet</p>
                  <p className="text-gray-400">Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className="bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl p-6 hover:bg-white/60 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {comment.authorModel[0]}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="font-semibold text-gray-800">{comment.authorModel}</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                comment.authorModel === 'Alumni' 
                                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200/30'
                                  : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200/30'
                              }`}>
                                {comment.authorModel}
                              </span>
                            </div>
                            <time className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </time>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                          
                          <div className="flex items-center space-x-4 mt-4">
                            <button
                              onClick={async () => {
                                const storageKey = `liked:comment:${comment.id}`;
                                const wasLiked = !!likedComments[comment.id];
                                const nextLiked = !wasLiked;
                                // optimistic update
                                setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, likes: Math.max(0, (c.likes || 0) + (nextLiked ? 1 : -1)) } : c));
                                setLikedComments((prev) => ({ ...prev, [comment.id]: nextLiked }));
                                try {
                                  const res = await fetch(`/api/community/${postId}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ like: nextLiked, commentId: comment.id })
                                  });
                                  if (res.ok) {
                                    const data = await res.json();
                                    if (typeof data.likes === 'number') {
                                      setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, likes: data.likes } : c));
                                    }
                                    try {
                                      if (nextLiked) localStorage.setItem(storageKey, '1');
                                      else localStorage.removeItem(storageKey);
                                    } catch {}
                                  } else {
                                    // revert
                                    setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, likes: Math.max(0, (c.likes || 0) + (nextLiked ? -1 : 1)) } : c));
                                    setLikedComments((prev) => ({ ...prev, [comment.id]: wasLiked }));
                                  }
                                } catch {
                                  setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, likes: Math.max(0, (c.likes || 0) + (nextLiked ? -1 : 1)) } : c));
                                  setLikedComments((prev) => ({ ...prev, [comment.id]: wasLiked }));
                                }
                              }}
                              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                            >
                              <Heart className={`w-4 h-4 ${likedComments[comment.id] ? 'text-pink-600 fill-pink-600' : ''}`} />
                              <span className="text-sm">{(comment.likes || 0)} Like{(comment.likes || 0) === 1 ? '' : 's'}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isAddingComment && (
                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white text-xs">+</span>
                    Add a comment
                  </h3>
                  {commentError && (
                    <div className="mb-4 rounded-md bg-red-50 text-red-700 px-3 py-2 border border-red-200">{commentError}</div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Student or Alumni</label>
                      <select
                        value={commentRole}
                        onChange={(e) => setCommentRole(e.target.value as 'Student' | 'Alumni')}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                      >
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Your name</label>
                      <input
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                      <input
                        type="email"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <label className="block text-sm font-medium text-gray-800 mb-1">Comment</label>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    placeholder="Write your comment..."
                    maxLength={5000}
                  />

                  <div className="mt-4 flex gap-3">
                    <button
                      disabled={submittingComment}
                      onClick={async () => {
                        if (!commentText.trim()) {
                          setCommentError('Comment cannot be empty');
                          return;
                        }
                        try {
                          setSubmittingComment(true);
                          setCommentError(null);
                          const res = await fetch(`/api/community/${postId}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              content: commentText,
                              authorRole: commentRole,
                              authorName: commentName,
                              authorEmail: commentEmail,
                            })
                          });
                          if (!res.ok) {
                            const data = await res.json().catch(() => ({}));
                            throw new Error(data?.error || 'Failed to add comment');
                          }
                          const data = await res.json();
                          if (data?.comment) {
                            setComments((prev) => [...prev, {
                              id: data.comment.id,
                              content: data.comment.content,
                              createdAt: data.comment.createdAt,
                              authorModel: data.comment.authorModel,
                              authorId: data.comment.authorId,
                            }]);
                          }
                          setCommentText('');
                          setIsAddingComment(false);
                        } catch (e: any) {
                          setCommentError(e.message || 'Something went wrong');
                        } finally {
                          setSubmittingComment(false);
                        }
                      }}
                      className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
                    >
                      {submittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                    <button
                      disabled={submittingComment}
                      onClick={() => { setIsAddingComment(false); setCommentError(null); }}
                      className="bg-white border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-lg shadow-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
