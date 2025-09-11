"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import CommentSection from '../components/CommentSection';

export default function PostDetailPage() {
  const params = useParams();
  const { postId } = params as { postId: string };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post {postId}</h1>
        <p className="text-gray-600 mb-6">Detailed view coming soon.</p>
        <CommentSection />
      </div>
    </div>
  );
}
