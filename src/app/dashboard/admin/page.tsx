"use client";

<<<<<<< HEAD
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
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Settings,
  Shield,
  CalendarCheck,
  X,
  LogOut,
  Zap,
  ChevronDown,
  Globe,
  User,
} from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ---------------- SidebarLink ----------------
type SidebarLinkProps = {
  link: { id: string; label: string; icon: React.ReactNode };
  isActive: boolean;
  onClick: () => void;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-700 text-white font-bold shadow-lg transform scale-105"
        : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
    }`}
  >
    <span
      className={
        isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-500"
      }
    >
      {link.icon}
    </span>
    <span className="font-semibold">{link.label}</span>
  </button>
);

// ---------------- Logo ----------------
const Logo: React.FC = () => (
  <div className="flex items-center space-x-3 py-6 px-6">
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 via-sky-500 to-blue-700 flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-lg">AD</span>
    </div>
    <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-700 bg-clip-text text-transparent">
      Admin Dashboard
    </span>
  </div>
);

// ---------------- Sidebar ----------------
type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  const links = [
    { id: "profile", label: "Profile", icon: <User className="h-6 w-6" /> },
    { id: "users", label: "Users", icon: <Users className="h-6 w-6" /> },
    {
      id: "moderation",
      label: "Moderation",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: "events",
      label: "Events Requests",
      icon: <CalendarCheck className="h-6 w-6" />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
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
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 via-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                AD
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">
                  Admin Name
                </div>
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
  );
};

// ---------------- Main ----------------
export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[70px] left-6 z-50 bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-700 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
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

      {/* Hero Section */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-[700px] py-6 px-6 text-center"
        style={{
          backgroundImage: "url('/Admin_back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0 rounded-none" />
        <div className="animate-fade-in max-w-6xl relative py-6 z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sky-300 font-semibold mb-8 shadow-lg">
            <Zap className="h-5 w-5 mr-2" />
            <span>Admin Control Center</span>
          </div>
          <div className="flex flex-row md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left">
              <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-700 bg-clip-text text-transparent mb-8 leading-tight">
                Welcome, Admin
              </h1>
              <p className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-indigo-500 to-blue-800 bg-clip-text max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
                Manage users, approve events, and keep the platform safe and organized.
                Monitor admin posts and ensure compliance across the community.
              </p>
            </div>
            <img
              src="/Admin_front.png"
              alt=""
              className="h-[400px] w-[600px] rounded-2xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              className="bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 text-lg"
              onClick={() => {
              const carouselSection = document.querySelector("section");
              if (carouselSection) {
                carouselSection.scrollIntoView({ behavior: "smooth" });
              }
              }}
            >
              <span>Explore Tools</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 text-lg hover:bg-white/30">
              <Globe className="h-6 w-6" />
              <span>Admin Community</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="py-28 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-700 bg-clip-text text-transparent mb-12">
            What You Can Do
          </h2>

          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            className="rounded-3xl mx-auto flex justify-center items-center shadow-2xl w-[900px] h-[400px] overflow-hidden from-indigo-200 via-sky-200 to-blue-200"
          >
            <div className="flex flex-row items-center justify-center p-8 bg-gradient-to-r from-indigo-200 via-sky-200 to-blue-200 w-full h-[500px]">
              <div className="flex-shrink-0 flex items-center justify-center w-[320px] h-[320px]">
                <img
                  src="/Admin_maintain.png"
                  alt=""
                  className="object-contain h-[300px] w-[300px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-[400px] h-full px-8">
                <h3 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                  Maintain Data
                </h3>
                <p className="text-xl text-slate-800">
                  Keep user data, reports, and system records updated and
                  secure.
                  Spot inconsistencies before they become issues.
                  Ensure seamless access for all users at any time.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center p-8 bg-gradient-to-r from-indigo-200 via-sky-200 to-blue-200 w-full h-[500px]">
              <div className="flex-shrink-0 flex items-center justify-center w-[320px] h-[320px]">
                <img
                  src="/Admin_Approve.png"
                  alt=""
                  className="object-contain h-[300px] w-[300px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-start w-[400px] h-full px-8">
                <h3 className="text-3xl text-center font-bold text-blue-700 mb-6">
                  Approve Event Requests
                </h3>
                <p className="text-xl text-slate-800">
                  Review and accept webinar & event hosting requests.
                  Encourage community engagement through timely approvals.
                  Help shape the platform’s event calendar.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center p-8 bg-gradient-to-r from-indigo-200 via-sky-200 to-blue-200 w-full h-[500px]">
              <div className="flex-shrink-0 flex items-center justify-center w-[320px] h-[320px]">
                <img
                  src="/Admin_Monitor.png"
                  alt=""
                  className="object-contain h-[300px] w-[300px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-[400px] h-full px-8">
                <h3 className="text-3xl text-center font-bold text-purple-700 mb-6">
                  Monitor Admin Posts
                </h3>
                <p className="text-xl text-slate-800">
                  Check what other admins are posting to ensure compliance.
                  Quickly flag inappropriate or off-topic content.
                  Foster a positive and professional environment.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center p-8 bg-gradient-to-r from-indigo-200 via-sky-200 to-blue-200 w-full h-[500px]">
              <div className="flex-shrink-0 flex items-center justify-center w-[320px] h-[320px]">
                <img
                  src="/Admin_Manage.png"
                  alt=""
                  className="object-contain h-[300px] w-[300px] rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-[400px] h-full px-8">
                <h3 className="text-3xl text-center font-bold text-indigo-700 mb-6">
                  Manage Users & Roles
                </h3>
                <p className="text-xl text-slate-800">
                  Add, remove, or assign roles to keep the platform organized.
                  Empower trusted members with new responsibilities.
                  Maintain a balanced and secure user hierarchy.
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
>>>>>>> 4b5334b33b82aa8257e6924e3ae771993518cd55
