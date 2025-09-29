"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'];

export default function TestCharts() {
  // Test data with known values
  const testData = [
    { category: 'Posts Created', value: 5 },
    { category: 'Events Created', value: 3 },
    { category: 'Comments Made', value: 8 },
    { category: 'Login Streaks', value: 2 },
  ];

  const levelData = [
    { level: 'Current', stars: 25 },
    { level: 'Next Level', stars: 50 },
  ];

  console.log('TestCharts - testData:', testData);
  console.log('TestCharts - levelData:', levelData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Test Charts with Hardcoded Data</h2>
      
      {/* Test Achievement Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Test Achievement Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={testData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {testData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Test Level Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Test Level Progress</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={levelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
