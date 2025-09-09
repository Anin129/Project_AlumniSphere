"use client";

import React, { useState } from 'react';
import { Clock, GraduationCap, User, MessageCircle, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Post } from '../types';
import { VoteButtons } from './VoteButtons';
import { PostStatusBadge } from './PostStatusBadge';

type Props = { post: Post; index: number };

const PostCard: React.FC<Props> = ({ post, index }) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(post.userVote);
  const [votes, setVotes] = useState(post.votes);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
      setVotes(votes + (type === 'up' ? -1 : 1));
    } else {
      const previousVote = userVote;
      setUserVote(type);
      if (previousVote) {
        setVotes(votes + (type === 'up' ? 2 : -2));
      } else {
        setVotes(votes + (type === 'up' ? 1 : -1));
      }
    }
  };

  return (
    <div
      className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
              post.author.role === 'alumni'
                ? 'bg-gradient-to-br from-green-500 to-teal-600'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}
          >
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">{post.author.name}</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  post.author.role === 'alumni'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {post.author.role === 'alumni' ? (
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-3 w-3" />
                    <span>Alumni {post.author.graduationYear}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Student {post.author.graduationYear}</span>
                  </div>
                )}
              </span>
            </div>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        <PostStatusBadge status={post.status} isResolved={post.isResolved} />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors cursor-pointer">
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed line-clamp-3">{post.content}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
        <VoteButtons userVote={userVote} votes={votes} onVote={handleVote} />

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {post.isResolved && post.resolvedBy && (
        <div className="mt-3 pt-3 border-t border-green-200/50">
          <div className="flex items-center space-x-2 text-sm text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span>
              Resolved by <strong>{post.resolvedBy.name}</strong> (Alumni {post.resolvedBy.graduationYear})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
