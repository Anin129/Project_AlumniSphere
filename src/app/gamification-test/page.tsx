"use client";

import React, { useState } from "react";
import GamificationDisplay from "@/components/GamificationDisplay";
import TestCharts from "@/components/TestCharts";
import SimpleChartTest from "@/components/SimpleChartTest";
import GamificationChartsVertical from "@/components/GamificationChartsVertical";

export default function GamificationTestPage() {
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState<"student" | "alumni">("student");
  const [showStats, setShowStats] = useState(false);

  const handleShowStats = () => {
    if (userId.trim()) {
      setShowStats(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gamification Test</h1>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Gamification Display</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID (MongoDB ObjectId)"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as "student" | "alumni")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleShowStats}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Show Gamification Stats
            </button>
            {userId.trim() && (
              <a
                href={`/profile/${userId}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View Profile Page
              </a>
            )}
          </div>
        </div>
      </div>

      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GamificationDisplay userId={userId} userType={userType} />
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">How to Test</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>1. Create a user:</strong>
                <p>Go to <a href="/register" className="text-blue-600 underline">/register</a> and create a new account</p>
              </div>
              
              <div>
                <strong>2. Get the user ID:</strong>
                <p>Check your MongoDB database for the user's _id field</p>
              </div>
              
              <div>
                <strong>3. Trigger gamification:</strong>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Create a community post</li>
                  <li>Comment on posts</li>
                  <li>Create events</li>
                  <li>RSVP to events</li>
                </ul>
              </div>
              
              <div>
                <strong>4. View results:</strong>
                <p>Enter the user ID above and see their gamification stats</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Charts Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <TestCharts />
      </div>

      {/* Simple Chart Test */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <SimpleChartTest />
      </div>

      {/* Vertical Charts Test */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-4">Vertical Charts Test</h2>
        <GamificationChartsVertical 
          stats={{
            totalStars: 25,
            totalPoints: 15,
            totalBadges: 3,
            dailyLoginStreak: 5,
            longestStreak: 10,
            level: 2,
            badges: [
              { name: 'First Post', category: 'Community', earnedAt: '2024-01-01' },
              { name: 'Event Creator', category: 'Events', earnedAt: '2024-01-02' },
              { name: 'Streak Master', category: 'Login', earnedAt: '2024-01-03' }
            ]
          }} 
          userType="student" 
        />
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Gamification System Overview</h3>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>📊 New Feature:</strong> Click "Show Charts" in the gamification display to see interactive bar graphs and pie charts!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Students Earn Stars</h4>
            <ul className="space-y-1">
              <li>• 3 stars for creating posts</li>
              <li>• 2 stars for creating events</li>
              <li>• 1 star for comments</li>
              <li>• 1 star for daily login</li>
              <li>• 5 stars for accepted answers</li>
              <li>• Level up every 50 stars</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Alumni Earn Points & Badges</h4>
            <ul className="space-y-1">
              <li>• 1 point for creating posts</li>
              <li>• 1 point for creating events</li>
              <li>• 2 points for comments</li>
              <li>• 2 points for accepted answers</li>
              <li>• 1 point for receiving upvotes</li>
              <li>• 0 points for login (streak badges)</li>
              <li>• Level up every 10 points</li>
              <li>• Automatic badge earning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
