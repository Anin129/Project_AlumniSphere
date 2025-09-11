<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  DollarSign, 
  Briefcase, 
  MessageCircle, 
  BarChart3, 
  User,
  Award,
  Star,
} from 'lucide-react';

type Highlight = {
  name: string;
  achievement: string;
  batch: string;
  date: string;
};

type Campaign = {
  name: string;
  target: number;
  raised: number;
  donors: number;
  myContribution: number;
};

type JobPosting = {
  title: string;
  company: string;
  location: string;
  applications: number;
  status: 'Active' | 'Closed';
  posted: string;
};

type MenteeRequest = {
  name: string;
  course: string;
  year: string;
  topic: string;
  date: string;
};

type DiscussionTopic = {
  title: string;
  replies: number;
  lastActive: string;
  author: string;
};

const AlumniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [formattedMenteeDates, setFormattedMenteeDates] = useState<string[]>([]);

  const sidebarItems = [
    { id: 'overview', label: 'Home / Overview', icon: Home },
    { id: 'mentoring', label: 'Mentoring Platform', icon: Users },
    { id: 'fundraising', label: 'Fundraising Campaigns', icon: DollarSign },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'discussions', label: 'Alumni Discussions', icon: MessageCircle },
    { id: 'impact', label: 'Impact Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile Settings', icon: User }
  ];

  const studentHighlights: Highlight[] = [
    { name: 'Arjun Patel', achievement: 'Secured internship at Google', batch: 'Final Year', date: '2 days ago' },
    { name: 'Priya Sharma', achievement: 'Won National Coding Championship', batch: '3rd Year', date: '1 week ago' },
    { name: 'Rohit Kumar', achievement: 'Published research paper in IEEE', batch: '4th Year', date: '2 weeks ago' }
  ];

  const activeCampaigns: Campaign[] = [
    { name: 'Library Renovation Fund', target: 500000, raised: 340000, donors: 45, myContribution: 25000 },
    { name: 'Student Scholarship Fund', target: 200000, raised: 180000, donors: 32, myContribution: 15000 },
    { name: 'Infrastructure Development', target: 800000, raised: 120000, donors: 18, myContribution: 0 }
  ];

  const myJobPostings: JobPosting[] = [
    { title: 'Software Engineer', company: 'TechCorp', location: 'Bangalore', applications: 23, status: 'Active', posted: '3 days ago' },
    { title: 'Data Scientist', company: 'DataInc', location: 'Mumbai', applications: 18, status: 'Active', posted: '1 week ago' },
    { title: 'Product Manager', company: 'StartupXYZ', location: 'Pune', applications: 12, status: 'Closed', posted: '2 weeks ago' }
  ];

  const menteeRequests: MenteeRequest[] = [
    { name: 'Rahul Singh', course: 'Computer Science', year: 'Final Year', topic: 'Career Guidance', date: '2024-02-20' },
    { name: 'Anjali Patel', course: 'Information Technology', year: '3rd Year', topic: 'Internship Prep', date: '2024-02-22' },
    { name: 'Vikash Kumar', course: 'Computer Science', year: '2nd Year', topic: 'Technical Skills', date: '2024-02-25' }
  ];

  const discussionTopics: DiscussionTopic[] = [
    { title: 'Industry Trends 2024', replies: 24, lastActive: '2 hours ago', author: 'Priya Sharma' },
    { title: 'Startup Funding Landscape', replies: 18, lastActive: '1 day ago', author: 'Arjun Mehta' },
    { title: 'AI/ML Career Opportunities', replies: 31, lastActive: '3 days ago', author: 'Sneha Patel' }
  ];

  const impactStats = {
    totalContributions: 65000,
    menteesHelped: 12,
    jobsPosted: 5,
    studentsPlaced: 8,
    eventsOrganized: 3,
    forumPosts: 24
  };

  // ✅ Fix hydration by formatting dates only on client
  useEffect(() => {
    setFormattedMenteeDates(
      menteeRequests.map(req => new Date(req.date).toLocaleDateString())
    );
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Rajesh!</h2>
            <p className="text-green-200">Software Engineer at Google • 2018-2022 Batch</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{(impactStats.totalContributions / 1000).toFixed(0)}K</div>
            <div className="text-md text-green-200 font-bold">Total Contributions</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">{impactStats.menteesHelped}</div>
            <div className="text-md text-green-200 font-bold">Mentees Helped</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{impactStats.jobsPosted}</div>
            <div className="text-md text-green-200 font-bold">Jobs Posted</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{impactStats.studentsPlaced}</div>
            <div className="text-md text-green-200 font-bold">Students Placed</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{impactStats.eventsOrganized}</div>
            <div className="text-md text-green-200 font-bold">Events Organized</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg text-black font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Student Achievements
          </h3>
          <div className="space-y-4">
            {studentHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1 text-gray-800">
                  <p className="text-sm font-medium text-black">{highlight.name} • {highlight.batch}</p>
                  <p className="text-sm">{highlight.achievement}</p>
                  <p className="text-xs text-gray-500 mt-1">{highlight.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Pending Mentee Requests
          </h3>
          <div className="space-y-4">
            {menteeRequests.map((req, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3 text-gray-800">
                <h4 className="font-medium text-sm text-black">{req.name}</h4>
                <p className="text-xs">{req.course} • {req.year}</p>
                <p className="text-xs">Topic: {req.topic}</p>
                <p className="text-xs">Preferred Date: {formattedMenteeDates[idx]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMentoring = () => (
    <div>
      <h2 className="text-2xl text-black font-bold mb-4">Mentoring Platform</h2>
      {menteeRequests.map((req, idx) => (
        <div key={idx} className="bg-gradient-to-r from-sky-200 to-blue-300 text-gray-900 rounded-xl shadow-lg p-4 mb-4">
          <h4 className="text-xl font-bold text-orange-700 mb-4">{req.name}</h4>
          <p>{req.course} • {req.year}</p>
          <p>Topic: {req.topic}</p>
          <p>Preferred Date: {formattedMenteeDates[idx]}</p>
        </div>
      ))}
    </div>
  );

  const renderFundraising = () => (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Fundraising Campaigns</h2>
      {activeCampaigns.map((camp, idx) => (
        <div key={idx} className="bg-gradient-to-r from-sky-200 to-blue-300 text-gray-900 rounded-xl shadow-lg p-4 mb-4">
          <h4 className="text-xl text-blue-700 font-bold">{camp.name}</h4>
          <p>Target: ₹{camp.target.toLocaleString()}</p>
          <p>Raised: ₹{camp.raised.toLocaleString()}</p>
          <p>Your Contribution: ₹{camp.myContribution.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );

  const renderJobs = () => (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Job Postings</h2>
      {myJobPostings.map((job, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-lg p-4 mb-4 text-gray-800">
          <h4 className="font-bold text-black">{job.title} - {job.company}</h4>
          <p>Location: {job.location}</p>
          <p>Applications: {job.applications}</p>
          <p>Status: <span className={job.status === "Active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{job.status}</span></p>
        </div>
      ))}
    </div>
  );

  const renderDiscussions = () => (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Alumni Discussions</h2>
      {discussionTopics.map((topic, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-lg p-4 mb-4 text-gray-800">
          <h4 className="font-semibold text-black">{topic.title}</h4>
          <p>Author: {topic.author}</p>
          <p>Replies: {topic.replies}</p>
          <p>Last Active: {topic.lastActive}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Alumni Dashboard</h1>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center space-x-3 p-2 w-full rounded hover:bg-gray-700 ${
                activeTab === item.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'mentoring' && renderMentoring()}
        {activeTab === 'fundraising' && renderFundraising()}
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'impact' && (
          <div className="text-center text-gray-600 mt-6">
            Impact Dashboard coming soon!
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="text-center text-gray-600 mt-6">
            Profile Settings will be implemented here.
          </div>
        )}
      </main>
    </div>
  );
};

export default AlumniDashboard;






// "use client"
// import React, { useState } from 'react';
// import { 
//   Home, 
//   Users, 
//   DollarSign, 
//   Briefcase, 
//   MessageCircle, 
//   BarChart3, 
//   User,
//   Calendar,
//   Plus,
//   Award,
//   Star,
//   Clock,
//   Video,
//   Heart,
//   CheckCircle
// } from 'lucide-react';

// type Highlight = {
//   name: string;
//   achievement: string;
//   batch: string;
//   date: string;
// };

// type Campaign = {
//   name: string;
//   target: number;
//   raised: number;
//   donors: number;
//   myContribution: number;
// };

// type JobPosting = {
//   title: string;
//   company: string;
//   location: string;
//   applications: number;
//   status: 'Active' | 'Closed';
//   posted: string;
// };

// type MenteeRequest = {
//   name: string;
//   course: string;
//   year: string;
//   topic: string;
//   date: string;
// };

// type DiscussionTopic = {
//   title: string;
//   replies: number;
//   lastActive: string;
//   author: string;
// };

// const AlumniDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>('overview');

//   const sidebarItems = [
//     { id: 'overview', label: 'Home / Overview', icon: Home },
//     { id: 'mentoring', label: 'Mentoring Platform', icon: Users },
//     { id: 'fundraising', label: 'Fundraising Campaigns', icon: DollarSign },
//     { id: 'jobs', label: 'Job Postings', icon: Briefcase },
//     { id: 'discussions', label: 'Alumni Discussions', icon: MessageCircle },
//     { id: 'impact', label: 'Impact Dashboard', icon: BarChart3 },
//     { id: 'profile', label: 'Profile Settings', icon: User }
//   ];

//   const studentHighlights: Highlight[] = [
//     { name: 'Arjun Patel', achievement: 'Secured internship at Google', batch: 'Final Year', date: '2 days ago' },
//     { name: 'Priya Sharma', achievement: 'Won National Coding Championship', batch: '3rd Year', date: '1 week ago' },
//     { name: 'Rohit Kumar', achievement: 'Published research paper in IEEE', batch: '4th Year', date: '2 weeks ago' }
//   ];

//   const activeCampaigns: Campaign[] = [
//     { name: 'Library Renovation Fund', target: 500000, raised: 340000, donors: 45, myContribution: 25000 },
//     { name: 'Student Scholarship Fund', target: 200000, raised: 180000, donors: 32, myContribution: 15000 },
//     { name: 'Infrastructure Development', target: 800000, raised: 120000, donors: 18, myContribution: 0 }
//   ];

//   const myJobPostings: JobPosting[] = [
//     { title: 'Software Engineer', company: 'TechCorp', location: 'Bangalore', applications: 23, status: 'Active', posted: '3 days ago' },
//     { title: 'Data Scientist', company: 'DataInc', location: 'Mumbai', applications: 18, status: 'Active', posted: '1 week ago' },
//     { title: 'Product Manager', company: 'StartupXYZ', location: 'Pune', applications: 12, status: 'Closed', posted: '2 weeks ago' }
//   ];

//   const menteeRequests: MenteeRequest[] = [
//     { name: 'Rahul Singh', course: 'Computer Science', year: 'Final Year', topic: 'Career Guidance', date: '2024-02-20' },
//     { name: 'Anjali Patel', course: 'Information Technology', year: '3rd Year', topic: 'Internship Prep', date: '2024-02-22' },
//     { name: 'Vikash Kumar', course: 'Computer Science', year: '2nd Year', topic: 'Technical Skills', date: '2024-02-25' }
//   ];

//   const discussionTopics: DiscussionTopic[] = [
//     { title: 'Industry Trends 2024', replies: 24, lastActive: '2 hours ago', author: 'Priya Sharma' },
//     { title: 'Startup Funding Landscape', replies: 18, lastActive: '1 day ago', author: 'Arjun Mehta' },
//     { title: 'AI/ML Career Opportunities', replies: 31, lastActive: '3 days ago', author: 'Sneha Patel' }
//   ];

//   const impactStats = {
//     totalContributions: 65000,
//     menteesHelped: 12,
//     jobsPosted: 5,
//     studentsPlaced: 8,
//     eventsOrganized: 3,
//     forumPosts: 24
//   };

//   const renderOverview = () => (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">Welcome back, Rajesh!</h2>
//             <p className="text-green-200">Software Engineer at Google • 2018-2022 Batch</p>
//           </div>
//           <div className="text-right">
//             <div className="text-3xl font-bold">₹{(impactStats.totalContributions / 1000).toFixed(0)}K</div>
//             <div className="text-md text-green-200 font-bold">Total Contributions</div>
//           </div>
//         </div>
//         <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-xl font-bold">{impactStats.menteesHelped}</div>
//             <div className="text-md text-green-200 font-bold">Mentees Helped</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{impactStats.jobsPosted}</div>
//             <div className="text-md text-green-200 font-bold">Jobs Posted</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{impactStats.studentsPlaced}</div>
//             <div className="text-md text-green-200 font-bold">Students Placed</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{impactStats.eventsOrganized}</div>
//             <div className="text-md text-green-200 font-bold">Events Organized</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg text-yellow-600 font-semibold mb-4 flex items-center">
//             <Award className="w-5 h-5 mr-2" />
//             Student Achievements
//           </h3>
//           <div className="space-y-4">
//             {studentHighlights.map((highlight, idx) => (
//               <div key={idx} className="flex text-black items-start space-x-3 p-3 bg-gray-50 rounded-lg">
//                 <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <Star className="w-4 h-4 text-yellow-600" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">{highlight.name} • {highlight.batch}</p>
//                   <p className="text-sm text-gray-600">{highlight.achievement}</p>
//                   <p className="text-xs text-gray-400 mt-1">{highlight.date}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
//             <Users className="w-5 h-5 mr-2 " />
//             Pending Mentee Requests
//           </h3>
//           <div className="space-y-4">
//             {menteeRequests.map((req, idx) => (
//               <div key={idx} className="border border-gray-200 text-black rounded-lg p-3">
//                 <h4 className="font-medium text-sm">{req.name}</h4>
//                 <p className="text-xs text-gray-600">{req.course} • {req.year}</p>
//                 <p className="text-xs text-gray-600">Topic: {req.topic}</p>
//                 <p className="text-xs text-gray-600">Preferred Date: {new Date(req.date).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderMentoring = () => (
//     <div>
//       <h2 className="text-2xl text-black font-bold mb-4">Mentoring Platform</h2>
//       {menteeRequests.map((req, idx) => (
//         <div key={idx} className="bg-gradient-to-r from-sky-200 to-blue-300 text-black rounded-xl shadow-lg p-4 mb-4">
//           <h4 className="text-xl font-bold text-orange-600 mb-4">{req.name}</h4>
//           <p>{req.course} • {req.year}</p>
//           <p>Topic: {req.topic}</p>
//           <p>Preferred Date: {new Date(req.date).toLocaleDateString()}</p>
//         </div>
//       ))}
//     </div>
//   );

//   const renderFundraising = () => (
//     <div>
//       <h2 className="text-2xl  font-bold text-green-600 mb-4">Fundraising Campaigns</h2>
//       {activeCampaigns.map((camp, idx) => (
//         <div key={idx} className="bg-gradient-to-r from-sky-200 to-blue-300 text-black rounded-xl shadow-lg p-4 mb-4">
//           <h4 className='text-xl text-blue-600 font-bold'>{camp.name}</h4>
//           <p>Target: ₹{camp.target.toLocaleString()}</p>
//           <p>Raised: ₹{camp.raised.toLocaleString()}</p>
//           <p>Your Contribution: ₹{camp.myContribution.toLocaleString()}</p>
//         </div>
//       ))}
//     </div>
//   );

//   const renderJobs = () => (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Job Postings</h2>
//       {myJobPostings.map((job, idx) => (
//         <div key={idx} className="bg-white rounded-xl shadow-lg p-4 mb-4">
//           <h4>{job.title} - {job.company}</h4>
//           <p>Location: {job.location}</p>
//           <p>Applications: {job.applications}</p>
//           <p>Status: {job.status}</p>
//         </div>
//       ))}
//     </div>
//   );

//   const renderDiscussions = () => (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Alumni Discussions</h2>
//       {discussionTopics.map((topic, idx) => (
//         <div key={idx} className="bg-white rounded-xl shadow-lg p-4 mb-4">
//           <h4>{topic.title}</h4>
//           <p>Author: {topic.author}</p>
//           <p>Replies: {topic.replies}</p>
//           <p>Last Active: {topic.lastActive}</p>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h1 className="text-xl font-bold mb-6">Alumni Dashboard</h1>
//         <nav className="space-y-2">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               className={`flex items-center space-x-3 p-2 w-full rounded hover:bg-gray-700 ${
//                 activeTab === item.id ? 'bg-gray-700' : ''
//               }`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </button>
//           ))}
//         </nav>
//       </aside>

//       <main className="flex-1 bg-gray-100 p-6">
//         {activeTab === 'overview' && renderOverview()}
//         {activeTab === 'mentoring' && renderMentoring()}
//         {activeTab === 'fundraising' && renderFundraising()}
//         {activeTab === 'jobs' && renderJobs()}
//         {activeTab === 'discussions' && renderDiscussions()}
//         {activeTab === 'impact' && (
//           <div className="text-center text-gray-600 mt-6">
//             Impact Dashboard coming soon!
//           </div>
//         )}
//         {activeTab === 'profile' && (
//           <div className="text-center text-gray-600 mt-6">
//             Profile Settings will be implemented here.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AlumniDashboard;
=======
"use client"

import React, { useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import {
  User,
  Calendar,
  Briefcase,
  MessageSquare,
  Trophy,
  Settings,
  X,
  LogOut,
  Zap,
  ChevronDown,
  Globe,
  Shield,
  TrendingUp,
} from "lucide-react"

// ---------------- SidebarLink ----------------
type SidebarLinkProps = {
  link: { id: string; label: string; icon: React.ReactNode }
  isActive: boolean
  onClick: () => void
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-gradient-to-r from-red-600 to-amber-400 via-orange-500 text-white font-bold shadow-lg transform scale-105"
        : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
    }`}
  >
    <span className={isActive ? "text-white" : "text-gray-500 group-hover:text-green-500"}>
      {link.icon}
    </span>
    <span className="font-semibold">{link.label}</span>
  </button>
)

// ---------------- Logo ----------------
const Logo: React.FC = () => (
  <div className="flex items-center space-x-3 py-6 px-6">
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-400 via-orange-500 flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-lg">AD</span>
    </div>
    <span className="font-bold text-2xl bg-gradient-to-r from-red-600 to-amber-400 via-orange-500 bg-clip-text text-transparent">
      Alumni Dashboard
    </span>
  </div>
)

// ---------------- Sidebar ----------------
type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const links = [
    { id: "profile", label: "Profile", icon: <User className="h-6 w-6" /> },
    { id: "events", label: "Events", icon: <Calendar className="h-6 w-6" /> },
    { id: "community", label: "Community Forum", icon: <MessageSquare className="h-6 w-6" /> },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />}
      <div
        className={`fixed top-16 left-0 min-h-screen w-80 bg-white/95 backdrop-blur-xl border-r border-white/40 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-white/40 bg-gradient-to-r from-white/50 to-white/30">
            <Logo />
            <button
              onClick={onClose}
              className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 mr-4 hover:scale-110"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6">
            <nav className="space-y-3">
              {links.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={link}
                  isActive={activeTab === link.id}
                  onClick={() => setActiveTab(link.id)}
                />
              ))}
            </nav>
          </div>

          <div className="border-t border-white/40 p-6 bg-gradient-to-r from-white/40 to-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 via-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                AL
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">Alumni Name</div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-semibold">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ---------------- Main ----------------
export default function AlumniDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const scrollToFeatures = () => {
    const section = document.getElementById("features")
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[70px] left-6 z-50 bg-gradient-to-r from-red-600 to-amber-400 via-orange-500 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
        >
          <span className="text-xl font-bold">☰</span>
        </button>
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Animated Alumni Images */}
      <motion.img
        src="/Alu_1.png"
        alt=""
        className="z-50 h-[200px] w-[200px] absolute top-[100px] left-[70px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.img
        src="/Alu_2.png"
        alt=""
        className="z-50 h-[240px] w-[240px] absolute top-[100px] right-[90px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.img
        src="/Alu_3.png"
        alt=""
        className="z-50 h-[240px] w-[240px] absolute top-[500px] left-[60px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.img
        src="/Alu_4.png"
        alt=""
        className="z-50 h-[200px] w-[200px] absolute top-[500px] right-[70px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      {/* Hero Section */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-[700px] px-6 text-center"
        style={{
          backgroundImage: "url('/Alumni.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/15 backdrop-blur-sm z-0 rounded-none" />
        <div className="animate-fade-in max-w-6xl relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/30 text-amber-700 font-semibold mb-8 shadow-lg">
            <Zap className="h-5 w-5 mr-2" />
            <span>Alumni Engagement Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-red-800 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-8 leading-tight">
            Alumni Dashboard
          </h1>

          <p className="text-2xl md:text-3xl text-amber-700 max-w-4xl mb-12 leading-relaxed font-medium">
            Share your experiences, connect with peers, and support students with opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToFeatures}
              className="bg-gradient-to-r from-red-600 to-amber-400 via-orange-500 hover:from-red-700 hover:to-amber-500 hover:via-orange-600 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-3 text-lg"
            >
              <span>Explore Features</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-lg hover:bg-white/30">
              <Globe className="h-6 w-6" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-28 bg-gradient-to-b from-white via-green-50/30 to-blue-50/20">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-orange-100 text-amber-600 font-semibold mb-6">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Alumni Features</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-400 via-orange-500 bg-clip-text text-transparent mb-8 py-2.5">
              Tools to Stay Connected & Contribute
            </h2>

            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Post job openings, attend events, mentor students, and grow your alumni network.
            </p>
          </div>

          <AlumniSlidingCards />

          <div className="mt-24 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-orange-100 text-amber-600 font-semibold mb-8">
              <Shield className="h-5 w-5 mr-2" />
              <span>Secure & Trusted</span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure alumni data is safe and your contributions make real impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// ---------------- Sliding Cards ----------------
function AlumniSlidingCards() {
  const [isPaused, setIsPaused] = useState(false)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const colorVariants = {
    blue: "from-blue-500 to-purple-600",
    green: "from-green-500 to-teal-600",
    orange: "from-orange-500 to-red-600",
    purple: "from-purple-500 to-pink-600",
    indigo: "from-indigo-500 to-blue-600",
    emerald: "from-emerald-500 to-cyan-600",
  }

  const cards = [
    { icon: <Calendar className="h-10 w-10" />, bg_img: "/Alumni_events.png", title: "Alumni Meetups", description: "Stay updated on reunions, conferences, and networking events.", color: "indigo" },
    { icon: <Briefcase className="h-10 w-10" />, bg_img: "/Alumni_jobs.png", title: "Post Opportunities", description: "Share job and internship opportunities with current students.", color: "emerald" },
    { icon: <MessageSquare className="h-10 w-10" />, bg_img: "/Alumni_forum.png", title: "Community Forum", description: "Engage with alumni across the globe through discussions.", color: "orange" },
    { icon: <Trophy className="h-10 w-10" />, bg_img: "/Alumni_reward.png", title: "Recognition", description: "Earn recognition for contributions and mentorship.", color: "green" },
  ]

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [x.get(), -3000],
        transition: { repeat: Infinity, duration: 20, ease: "linear" },
      })
    } else {
      controls.stop()
    }
  }, [isPaused])

  return (
    <div
      className="relative m-auto w-[84vw] justify-center p-0 overflow-hidden bg-transparent py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-8 p-2 w-max cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -3000, right: 0 }}
        style={{ x }}
      >
        {[...cards, ...cards].map((card, idx) => (
          <div
            key={idx}
            className="h-[350px] w-[700px] bg-gradient-to-r from-red-200 to-amber-200 via-orange-200 flex flex-row flex-shrink-0 relative backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center w-[60%]">
              <img src={card.bg_img} alt="" className="h-full w-[450px] object-cover rounded-2xl" />
            </div>

            <div className="w-[50%] relative grid-cols-1 z-10 flex flex-col items-center text-center">
              <div
                className={`mb-8 p-5 text-white rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl bg-gradient-to-br ${
                  colorVariants[card.color as keyof typeof colorVariants]
                }`}
              >
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mb-6 group-hover:text-gray-900 transition-colors">
                {card.title}
              </h3>
              <p className="leading-relaxed text-lg group-hover:text-gray-700 transition-colors p-2">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
>>>>>>> 4b5334b33b82aa8257e6924e3ae771993518cd55
