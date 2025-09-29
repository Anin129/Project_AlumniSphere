"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GamificationDisplay from "@/components/GamificationDisplay";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setUserType] = useState<'student' | 'alumni' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to find user in both collections
      const [studentRes, alumniRes] = await Promise.all([
        fetch(`/api/users/${userId}?type=student`),
        fetch(`/api/users/${userId}?type=alumni`)
      ]);

      if (studentRes.ok) {
        const studentData = await studentRes.json();
        setUserInfo(studentData);
        setUserType('student');
      } else if (alumniRes.ok) {
        const alumniData = await alumniRes.json();
        setUserInfo(alumniData);
        setUserType('alumni');
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to load user profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-xl font-semibold text-red-800 mb-2">User Not Found</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/gamification-test" className="text-blue-600 underline">
            Go to Gamification Test to find user IDs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {userType === 'student' ? 'Student' : 'Alumni'} Profile
        </h1>
        <p className="text-gray-600">View achievements and progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                userType === 'student' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  userType === 'student' ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {userInfo?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{userInfo?.name || 'Unknown User'}</h2>
              <p className="text-gray-600">
                {userType === 'student' ? 'Student' : 'Alumni'}
              </p>
              {userInfo?.graduationYear && (
                <p className="text-sm text-gray-500">Class of {userInfo.graduationYear}</p>
              )}
              {userInfo?.department && (
                <p className="text-sm text-gray-500">{userInfo.department}</p>
              )}
              {userInfo?.currentCompany && (
                <p className="text-sm text-gray-500">{userInfo.currentCompany}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="lg:col-span-2">
          <GamificationDisplay 
            userId={userId} 
            userType={userType!}
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">
          {userType === 'student' ? 'How Students Earn Stars' : 'How Alumni Earn Points & Badges'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {userType === 'student' ? (
            <>
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Content Creation</h4>
                <ul className="space-y-1">
                  <li>• Create community posts: 3 stars</li>
                  <li>• Create events: 2 stars</li>
                  <li>• Comment on posts: 1 star</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 mb-2">Engagement</h4>
                <ul className="space-y-1">
                  <li>• Daily login: 1 star</li>
                  <li>• 7+ day streak: 2 stars/day</li>
                  <li>• 30+ day streak: 3 stars/day</li>
                  <li>• 100+ day streak: 5 stars/day</li>
                </ul>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
