"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string>('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [authorRole, setAuthorRole] = useState<'Student' | 'Alumni'>('Student');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          tags,
          category: 'general',
          authorRole,
          authorName,
          authorEmail,
          graduationYear,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to create post');
      }
      const data = await res.json();
      router.push(`/community/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200/60 bg-white/70 p-6 text-gray-700 space-y-5">
      {error && (
        <div className="rounded-md bg-red-50 text-red-700 px-3 py-2 border border-red-200">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you want to ask?"
          maxLength={200}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Details</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Provide context, examples, and what you've tried."
          maxLength={10000}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="react, internships, dsa"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">I am a</label>
          <select
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value as 'Student' | 'Alumni')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Graduation year</label>
          <input
            type="number"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2026"
            min={1950}
            max={2100}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
        >
          {submitting ? 'Publishing...' : 'Publish' }
        </button>
        <button
          type="button"
          onClick={() => router.push('/community')}
          className="bg-white border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
