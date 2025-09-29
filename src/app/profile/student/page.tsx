"use client";

import React, { useState, useEffect } from "react";
import GamificationDisplay from "@/components/GamificationDisplay";

export default function StudentProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const savedUserEmail = localStorage.getItem('userEmail');
    const savedUserName = localStorage.getItem('userName');
    const savedUserType = localStorage.getItem('userType');
    
    // Check if user is actually a student
    if (savedUserType !== 'student') {
      // Redirect to correct profile page
      if (savedUserType === 'alumni') {
        window.location.href = '/profile/alumni';
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
        name: savedUserName || 'Student User',
        email: savedUserEmail,
        type: 'student'
      });
    } else {
      // Fallback for demo
      setUserId("demo-student-id");
      setUserInfo({
        name: 'Demo Student',
        email: 'demo@student.com',
        type: 'student'
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profile</h1>
        <p className="text-gray-600">View your achievements and progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {userInfo ? getInitials(userInfo.name) : 'SU'}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{userInfo?.name || 'Student User'}</h2>
              <p className="text-gray-600">Computer Science Student</p>
              <p className="text-sm text-gray-500">Class of 2025</p>
              <p className="text-sm text-gray-500">{userInfo?.email || 'student@email.com'}</p>
            </div>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="lg:col-span-2">
          <GamificationDisplay 
            userId={userId} 
            userType="student"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">How to Earn Stars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Content Creation</h4>
            <ul className="space-y-1">
              <li>• Create community posts: 3 stars</li>
              <li>• Create events: 2 stars</li>
              <li>• Comment on posts: 1 star</li>
              <li>• Answer accepted: 5 stars</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-green-600 mb-2">Daily Engagement</h4>
            <ul className="space-y-1">
              <li>• Daily login: 1 star</li>
              <li>• 7+ day streak: 2 stars/day</li>
              <li>• 30+ day streak: 3 stars/day</li>
              <li>• 100+ day streak: 5 stars/day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
