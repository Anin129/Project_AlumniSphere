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
