"use client";

import React from 'react';
import CreatePost from '../components/CreatePost';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a new post</h1>
        <CreatePost />
      </div>
    </div>
  );
}
