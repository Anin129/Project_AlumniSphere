"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, UserCheck, Trophy, Star, Award, ArrowRight, LogOut } from "lucide-react";

export default function DashboardPage() {
  const [userType, setUserType] = useState<'student' | 'alumni' | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Get user data from localStorage or session
    // In a real app, you'd get this from auth context or API
    const savedUserType = localStorage.getItem('userType') as 'student' | 'alumni';
    const savedUserName = localStorage.getItem('userName');
    const savedUserEmail = localStorage.getItem('userEmail');
    
    // If no saved data, try to get from URL params or default to alumni
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get('type') as 'student' | 'alumni';
    
    const userType = savedUserType || typeFromUrl || 'alumni';
    const userName = savedUserName || (userType === 'student' ? 'Student User' : 'Alumni User');
    
    setUserType(userType);
    setUserName(userName);
    
    // Save to localStorage for future use
    localStorage.setItem('userType', userType);
    if (savedUserName) localStorage.setItem('userName', savedUserName);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // In a real app, you'd clear the session/token
    window.location.href = '/';
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isStudent = userType === 'student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isStudent 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {isStudent ? <User className="h-6 w-6 text-white" /> : <UserCheck className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}!</h1>
                <p className="text-gray-600">
                  {isStudent ? 'Student' : 'Alumni'} • AlumniSphere
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isStudent ? 'Your Student Dashboard' : 'Your Alumni Dashboard'}
          </h2>
          <p className="text-lg text-gray-600">
            {isStudent 
              ? 'Track your progress, earn stars, and connect with alumni mentors'
              : 'Share your experience, mentor students, and build your professional network'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 ${
            isStudent ? 'border-blue-500' : 'border-purple-500'
          }`}>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isStudent 
                    ? 'bg-blue-100' 
                    : 'bg-purple-100'
                }`}>
                  {isStudent ? <User className="h-6 w-6 text-blue-600" /> : <UserCheck className="h-6 w-6 text-purple-600" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">My Profile</h3>
                  <p className="text-gray-600">
                    {isStudent ? 'View your student profile and achievements' : 'View your alumni profile and badges'}
                  </p>
                </div>
              </div>
              <Link href={isStudent ? '/profile/student' : '/profile/alumni'}>
                <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  isStudent
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}>
                  <span>View Profile</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Gamification Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  {isStudent ? <Star className="h-6 w-6 text-green-600" /> : <Award className="h-6 w-6 text-green-600" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isStudent ? 'Stars & Levels' : 'Points & Badges'}
                  </h3>
                  <p className="text-gray-600">
                    {isStudent ? 'Track your stars and level progress' : 'Track your points and earned badges'}
                  </p>
                </div>
              </div>
              <Link href={isStudent ? '/profile/student' : '/profile/alumni'}>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>View Progress</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Community Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-orange-500">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                  <p className="text-gray-600">
                    {isStudent ? 'Connect with alumni and peers' : 'Mentor students and share experiences'}
                  </p>
                </div>
              </div>
              <Link href="/community">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Join Community</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/events" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-xl transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Events</span>
              </div>
            </Link>
            
            <Link href="/jobs" className="bg-green-50 hover:bg-green-100 p-4 rounded-xl transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Jobs</span>
              </div>
            </Link>
            
            <Link href="/fundraising" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Fundraising</span>
              </div>
            </Link>
            
            <Link href="/search" className="bg-orange-50 hover:bg-orange-100 p-4 rounded-xl transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Search</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
