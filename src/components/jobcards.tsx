"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  User, 
  BookmarkPlus, 
  Share2, 
  ExternalLink,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle
} from 'lucide-react';

const JobCards = () => {
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [likedJobs, setLikedJobs] = useState(new Set());

  const jobData = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      companyLogo: "TC",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior",
      isRemote: true,
      postedBy: {
        name: "Sarah Johnson",
        graduationYear: "2018",
        currentRole: "Engineering Manager",
        avatar: "SJ"
      },
      postedDate: "2 days ago",
      deadline: "Dec 15, 2024",
      salary: "$120k - $180k",
      description: "Join our innovative team to build scalable web applications using React, Node.js, and cloud technologies.",
      requirements: [
        "5+ years of full-stack development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with AWS or similar cloud platforms",
        "Strong problem-solving and communication skills"
      ],
      benefits: ["Health Insurance", "401k Match", "Remote Work", "Stock Options"],
      companySize: "500-1000 employees",
      industry: "Technology",
      applicants: 23,
      alumniMessage: "Great culture and amazing growth opportunities! Feel free to reach out if you have questions."
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      company: "Growth Dynamics",
      companyLogo: "GD",
      location: "New York, NY",
      type: "Full-time",
      level: "Mid-level",
      isRemote: false,
      postedBy: {
        name: "Michael Chen",
        graduationYear: "2019",
        currentRole: "VP of Marketing",
        avatar: "MC"
      },
      postedDate: "1 week ago",
      deadline: "Dec 20, 2024",
      salary: "$90k - $130k",
      description: "Drive product marketing strategy for our B2B SaaS platform, working closely with product and sales teams.",
      requirements: [
        "3+ years in product marketing or related field",
        "Experience with B2B SaaS products",
        "Strong analytical and presentation skills",
        "MBA preferred but not required"
      ],
      benefits: ["Health Insurance", "Unlimited PTO", "Learning Budget", "Team Retreats"],
      companySize: "50-200 employees",
      industry: "SaaS",
      applicants: 15,
      alumniMessage: "Fast-paced environment with incredible learning opportunities. The team is very collaborative!"
    },
    {
      id: 3,
      title: "Data Scientist Intern",
      company: "Analytics Pro",
      companyLogo: "AP",
      location: "Remote",
      type: "Internship",
      level: "Entry",
      isRemote: true,
      postedBy: {
        name: "Emily Rodriguez",
        graduationYear: "2020",
        currentRole: "Senior Data Scientist",
        avatar: "ER"
      },
      postedDate: "3 days ago",
      deadline: "Jan 10, 2025",
      salary: "$25/hour",
      description: "Summer internship opportunity to work on machine learning projects and data visualization dashboards.",
      requirements: [
        "Currently pursuing degree in Data Science, Statistics, or related field",
        "Knowledge of Python and SQL",
        "Familiarity with machine learning concepts",
        "Strong academic record"
      ],
      benefits: ["Mentorship Program", "Flexible Hours", "Remote Work", "Networking Events"],
      companySize: "200-500 employees",
      industry: "Analytics",
      applicants: 42,
      alumniMessage: "Perfect opportunity for recent grads! Great mentorship and real-world project experience."
    }
  ];

  const toggleSave = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const toggleLike = (jobId) => {
    setLikedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Entry': return 'bg-green-100 text-green-800';
      case 'Mid-level': return 'bg-blue-100 text-blue-800';
      case 'Senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'bg-blue-100 text-blue-800';
      case 'Part-time': return 'bg-yellow-100 text-yellow-800';
      case 'Contract': return 'bg-orange-100 text-orange-800';
      case 'Internship': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Job Board</h1>
        <p className="text-gray-600">Opportunities shared by your alumni network</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {jobData.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {job.companyLogo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{job.title}</h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSave(job.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedJobs.has(job.id) 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <BookmarkPlus size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(job.level)}`}>
                  {job.level}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                  {job.type}
                </span>
                {job.isRemote && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Remote OK
                  </span>
                )}
              </div>

              {/* Location & Salary */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={16} className="mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign size={16} className="mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar size={16} className="mr-2" />
                  Apply by {job.deadline}
                </div>
              </div>
            </div>

            {/* Alumni Info */}
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {job.postedBy.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Posted by {job.postedBy.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    <GraduationCap size={12} className="inline mr-1" />
                    Class of {job.postedBy.graduationYear} • {job.postedBy.currentRole}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {job.postedDate}
                </div>
              </div>
              {job.alumniMessage && (
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{job.alumniMessage}"</p>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="p-6">
              <p className="text-gray-700 text-sm mb-4">{job.description}</p>
              
              {/* Requirements */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {job.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                  {job.requirements.length > 2 && (
                    <li className="text-blue-600 font-medium cursor-pointer hover:underline">
                      +{job.requirements.length - 2} more requirements
                    </li>
                  )}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building2 size={14} className="mr-1" />
                  {job.companySize}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {job.applicants} applicants
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(job.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      likedJobs.has(job.id) 
                        ? 'text-red-600' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart size={16} fill={likedJobs.has(job.id) ? 'currentColor' : 'none'} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-sm">Contact Alumni</span>
                  </button>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <span>Apply Now</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Load More Jobs
        </button>
      </div>
    </div>
  );
};

export default JobCards;