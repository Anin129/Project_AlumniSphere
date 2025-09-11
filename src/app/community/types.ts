export type Author = {
  name: string;
  role: 'student' | 'alumni';
  graduationYear: string;
  avatar: string;
};

export type Resolver = {
  name: string;
  role: 'student' | 'alumni';
  graduationYear: string;
};

export type Post = {
  id: number | string;
  title: string;
  content: string;
  author: Author;
  votes: number;
  userVote: 'up' | 'down' | null;
  comments: number;
  status: 'open' | 'closed';
  createdAt: string;
  tags: string[];
  isResolved: boolean;
  resolvedBy: Resolver | null;
};

export type SortOption = 'trending' | 'newest' | 'votes' | 'comments';
export type FilterOption = 'all' | 'open' | 'closed' | 'resolved';
