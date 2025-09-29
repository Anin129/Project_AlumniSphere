"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

interface GamificationChartsProps {
  stats: GamificationStats;
  userType: 'student' | 'alumni';
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'];

export default function GamificationChartsVertical({ stats, userType }: GamificationChartsProps) {
  // Debug logging
  console.log('GamificationChartsVertical - stats:', stats);
  console.log('GamificationChartsVertical - userType:', userType);
  
  // Prepare data for level progress bar chart
  const levelProgressData = userType === 'student' 
    ? [
        { level: 'Current', stars: Math.max(1, stats.totalStars || 0) },
        { level: 'Next Level', stars: Math.max(50, Math.ceil((stats.totalStars || 0) / 50) * 50) },
      ]
    : [
        { level: 'Current', points: Math.max(1, stats.totalPoints || 0) },
        { level: 'Next Level', points: Math.max(10, Math.ceil((stats.totalPoints || 0) / 10) * 10) },
      ];

  // Prepare data for badge categories pie chart (alumni only)
  const badgeCategoryData = stats.badges?.reduce((acc, badge) => {
    const existing = acc.find(item => item.name === badge.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: badge.category, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>) || [];

  // Prepare data for achievement breakdown
  const achievementData = userType === 'student' 
    ? [
        { category: 'Posts Created', value: Math.max(1, Math.floor((stats.totalStars || 0) / 3)) },
        { category: 'Events Created', value: Math.max(1, Math.floor((stats.totalStars || 0) / 2)) },
        { category: 'Comments Made', value: Math.max(1, (stats.totalStars || 0) % 3) },
        { category: 'Login Streaks', value: Math.max(1, Math.floor((stats.dailyLoginStreak || 0) / 7)) },
      ]
    : [
        { category: 'Posts Created', value: Math.max(1, stats.totalPoints || 0) },
        { category: 'Events Created', value: Math.max(1, Math.floor((stats.totalPoints || 0) / 2)) },
        { category: 'Badges Earned', value: Math.max(1, stats.totalBadges || 0) },
        { category: 'Login Streaks', value: Math.max(1, Math.floor((stats.dailyLoginStreak || 0) / 7)) },
      ];

  // Debug logging for data arrays
  console.log('levelProgressData:', levelProgressData);
  console.log('achievementData:', achievementData);

  return (
    <div className="space-y-6">
      {/* Debug Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Debug Information (Vertical Charts)</h4>
        <div className="text-sm text-yellow-700">
          <p><strong>User Type:</strong> {userType}</p>
          <p><strong>Stats:</strong> {JSON.stringify(stats, null, 2)}</p>
          <p><strong>Level Progress Data:</strong> {JSON.stringify(levelProgressData, null, 2)}</p>
          <p><strong>Achievement Data:</strong> {JSON.stringify(achievementData, null, 2)}</p>
        </div>
      </div>

      {/* Level Progress Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">
          {userType === 'student' ? 'Stars Progress' : 'Points Progress'}
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={levelProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                value, 
                userType === 'student' ? 'Stars' : 'Points'
              ]}
            />
            <Bar 
              dataKey={userType === 'student' ? 'stars' : 'points'} 
              fill={userType === 'student' ? '#3B82F6' : '#8B5CF6'} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 text-sm text-gray-600 text-center">
          {userType === 'student' 
            ? `${stats.totalStars || 0} / ${Math.max(50, Math.ceil((stats.totalStars || 0) / 50) * 50)} stars to next level`
            : `${stats.totalPoints || 0} / ${Math.max(10, Math.ceil((stats.totalPoints || 0) / 10) * 10)} points to next level`
          }
        </div>
      </div>

      {/* Achievement Breakdown Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Achievement Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={achievementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {achievementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Badge Categories Pie Chart (Alumni only) */}
      {userType === 'alumni' && badgeCategoryData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4">Badge Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={badgeCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {badgeCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Streak Progress Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Streak Progress</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={[
            { period: 'Current Streak', days: Math.max(1, stats.dailyLoginStreak || 0) },
            { period: 'Best Streak', days: Math.max(1, stats.longestStreak || 0) },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'Days']} />
            <Bar dataKey="days" radius={[4, 4, 0, 0]}>
              {[
                { period: 'Current Streak', days: Math.max(1, stats.dailyLoginStreak || 0) },
                { period: 'Best Streak', days: Math.max(1, stats.longestStreak || 0) },
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
