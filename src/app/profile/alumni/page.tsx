"use client";

import React, { useState, useEffect } from "react";
import GamificationDisplay from "@/components/GamificationDisplay";

export default function AlumniProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const savedUserEmail = localStorage.getItem('userEmail');
    const savedUserName = localStorage.getItem('userName');
    const savedUserType = localStorage.getItem('userType');
    
    // Check if user is actually an alumni
    if (savedUserType !== 'alumni') {
      // Redirect to correct profile page
      if (savedUserType === 'student') {
        window.location.href = '/profile/student';
        return;
      } else {
        // If no user type, redirect to profile selector
        window.location.href = '/profile';
        return;
      }
    }
    
    if (savedUserEmail) {
      // For demo purposes, we'll use email as user ID
      // In a real app, you'd have a proper user ID from auth
      setUserId(savedUserEmail);
      
      // Set user info from localStorage
      setUserInfo({
        name: savedUserName || 'Alumni User',
        email: savedUserEmail,
        type: 'alumni'
      });
    } else {
      // Fallback for demo
      setUserId("demo-alumni-id");
      setUserInfo({
        name: 'Demo Alumni',
        email: 'demo@alumni.com',
        type: 'alumni'
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  // Generate initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Profile</h1>
        <p className="text-gray-600">View your achievements, badges, and contributions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">
                  {userInfo ? getInitials(userInfo.name) : 'AU'}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{userInfo?.name || 'Alumni User'}</h2>
              <p className="text-gray-600">Software Engineer</p>
              <p className="text-sm text-gray-500">Class of 2020</p>
              <p className="text-sm text-gray-500">Tech Company</p>
              <p className="text-sm text-gray-500">{userInfo?.email || 'alumni@email.com'}</p>
            </div>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="lg:col-span-2">
          <GamificationDisplay 
            userId={userId} 
            userType="alumni"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">How to Earn Points & Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-600 mb-2">Content Creation</h4>
            <ul className="space-y-1">
              <li>• Create community posts: 1 point</li>
              <li>• Create events: 1 point</li>
              <li>• Comment on posts: 2 points</li>
              <li>• Answer accepted: 2 points</li>
              <li>• Receive upvotes: 1 point</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-orange-600 mb-2">Badges & Recognition</h4>
            <ul className="space-y-1">
              <li>• Streak badges: Week Warrior, Monthly Master</li>
              <li>• Achievement badges: Bronze, Silver, Gold</li>
              <li>• Mentoring badges: First Mentor, Mentor Master</li>
              <li>• Level up every 10 points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
