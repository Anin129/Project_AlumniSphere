"use client";

import React, { useState, useEffect } from "react";
import { Star, Trophy, Award, TrendingUp, BarChart3 } from "lucide-react";
import GamificationCharts from "./GamificationCharts";

interface GamificationStats {
  totalStars?: number;
  totalPoints?: number;
  totalBadges?: number;
  badges?: Array<{ name: string; category: string; earnedAt: string }>;
  dailyLoginStreak?: number;
  longestStreak?: number;
  level?: number;
  achievements?: string[];
}

interface GamificationDisplayProps {
  userId?: string;
  userType?: 'student' | 'alumni';
  stats?: GamificationStats;
}

export default function GamificationDisplay({ userId, userType, stats: initialStats }: GamificationDisplayProps) {
  const [stats, setStats] = useState<GamificationStats | null>(initialStats || null);
  const [loading, setLoading] = useState(!initialStats);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    if (!initialStats && userId && userType) {
      fetchStats();
    }
  }, [userId, userType, initialStats]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}/gamification?type=${userType}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch gamification stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-gray-500 text-sm">No gamification data available</p>
      </div>
    );
  }

  const isStudent = userType === 'student';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Achievements</h3>
        </div>
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
        >
          <BarChart3 className="h-4 w-4" />
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Level */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.level || 1}</div>
          <div className="text-xs text-blue-600">Level</div>
        </div>

        {/* Streak */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.dailyLoginStreak || 0}</div>
          <div className="text-xs text-green-600">Day Streak</div>
        </div>
      </div>

      {/* Student-specific: Stars */}
      {isStudent && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">Stars Earned</span>
          </div>
          <div className="text-xl font-bold text-yellow-600">{stats.totalStars || 0}</div>
          <div className="text-xs text-yellow-600">
            {stats.totalStars ? Math.floor((stats.totalStars || 0) / 50) * 50 : 0} / {Math.ceil((stats.totalStars || 0) / 50) * 50} to next level
          </div>
        </div>
      )}

      {/* Alumni-specific: Points and Badges */}
      {!isStudent && (
        <>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Points</span>
            </div>
            <div className="text-xl font-bold text-purple-600">{stats.totalPoints || 0}</div>
            <div className="text-xs text-purple-600">
              {stats.totalPoints ? Math.floor((stats.totalPoints || 0) / 10) * 10 : 0} / {Math.ceil((stats.totalPoints || 0) / 10) * 10} to next level
            </div>
          </div>

          {stats.badges && stats.badges.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Badges ({stats.totalBadges || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {stats.badges.slice(0, 6).map((badge, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                    title={`${badge.name} - ${badge.category}`}
                  >
                    {badge.name}
                  </div>
                ))}
                {stats.badges.length > 6 && (
                  <div className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{stats.badges.length - 6} more
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Longest Streak */}
      {stats.longestStreak && stats.longestStreak > 0 && (
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            Best streak: <span className="font-semibold">{stats.longestStreak} days</span>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {showCharts && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <GamificationCharts stats={stats} userType={userType} />
        </div>
      )}
    </div>
  );
}
