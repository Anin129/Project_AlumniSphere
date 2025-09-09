import { Post } from './types';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'How to transition from software development to product management?',
    content:
      "I've been working as a software developer for 3 years and I'm interested in moving to product management. What skills should I develop?",
    author: {
      name: 'Sarah Chen',
      role: 'student',
      graduationYear: '2024',
      avatar: 'SC',
    },
    votes: 24,
    userVote: null,
    comments: 8,
    status: 'open',
    createdAt: '2 hours ago',
    tags: ['career', 'product-management', 'advice'],
    isResolved: false,
    resolvedBy: null,
  },
  {
    id: 2,
    title: 'Best practices for remote work as a new graduate?',
    content:
      'Just started my first job remotely. Any tips for staying productive and building relationships with colleagues?',
    author: {
      name: 'Alex Kumar',
      role: 'student',
      graduationYear: '2024',
      avatar: 'AK',
    },
    votes: 18,
    userVote: 'up',
    comments: 12,
    status: 'closed',
    createdAt: '5 hours ago',
    tags: ['remote-work', 'productivity', 'networking'],
    isResolved: true,
    resolvedBy: {
      name: 'Jennifer Walsh',
      role: 'alumni',
      graduationYear: '2018',
    },
  },
  {
    id: 3,
    title: 'Machine Learning career path - which specialization?',
    content:
      "I'm passionate about ML but confused about which path to take: Computer Vision, NLP, or MLOps? What's the market demand like?",
    author: {
      name: 'David Park',
      role: 'student',
      graduationYear: '2025',
      avatar: 'DP',
    },
    votes: 31,
    userVote: null,
    comments: 15,
    status: 'open',
    createdAt: '1 day ago',
    tags: ['machine-learning', 'career-path', 'specialization'],
    isResolved: false,
    resolvedBy: null,
  },
  {
    id: 4,
    title: 'Startup vs Big Tech - Early Career Decision',
    content:
      'Got offers from both a startup and a big tech company. Startup offers more responsibility but less pay. Big tech offers stability. What factors should I consider?',
    author: {
      name: 'Maya Patel',
      role: 'student',
      graduationYear: '2024',
      avatar: 'MP',
    },
    votes: 42,
    userVote: 'up',
    comments: 23,
    status: 'open',
    createdAt: '3 days ago',
    tags: ['startup', 'big-tech', 'career-choice'],
    isResolved: false,
    resolvedBy: null,
  },
];
