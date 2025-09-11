"use client";

<<<<<<< HEAD
import React, { useState, useRef, useCallback } from "react";
import {
  Home,
  User,
  Users,
  Briefcase,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  X,
  Menu,
  Bell,
  Activity,
  CheckCircle,
  GraduationCap,
  ChevronRight,
  Clock,
  Upload,
  Camera,
  Edit3,
  Save,
  Download,
  Eye,
  MapPin,
  Phone,
  Mail,
  Building,
} from "lucide-react";

type PageType =
  | "dashboard"
  | "profile"
  | "alumni"
  | "careers"
  | "events"
  | "resume"
  | "support";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  studentId: string;
  major: string;
  year: string;
  graduationDate: string;
  profilePhoto: string | null;
  linkedin: string;
  github: string;
  portfolio: string;
  skills: string[];
  aboutMe: string;
}

export default function StudentPortal() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Alex Kumar",
    email: "alex.kumar@university.edu",
    phone: "+1 (555) 123-4567",
    birthDate: "2000-05-15",
    address: "123 University Street",
    city: "Student City",
    state: "California",
    zipCode: "12345",
    studentId: "CS2021001",
    major: "Computer Science",
    year: "Final Year",
    graduationDate: "2025-05",
    profilePhoto: null,
    linkedin: "linkedin.com/in/alexkumar",
    github: "github.com/alexkumar",
    portfolio: "alexkumar.dev",
    skills: ["JavaScript", "React", "Python", "Node.js", "SQL"],
    aboutMe:
      "Passionate computer science student with expertise in full-stack development and machine learning.",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Removed duplicate handleInputChange declaration
  const handleInputChange = useCallback(
    (field: keyof ProfileData) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setProfileData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    []
  );

  const handleSkillsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const skills = e.target.value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      setProfileData((prev) => ({
        ...prev,
        skills,
      }));
    },
    []
  );

  const sidebarItems = [
    { id: "dashboard" as PageType, label: "Dashboard", icon: Home },
    { id: "profile" as PageType, label: "Profile", icon: User },
    { id: "resume" as PageType, label: "Resume Manager", icon: FileText },
    { id: "alumni" as PageType, label: "Alumni Network", icon: Users },
    { id: "careers" as PageType, label: "Career Center", icon: Briefcase },
    { id: "events" as PageType, label: "Events", icon: Calendar },
    { id: "support" as PageType, label: "Support", icon: HelpCircle },
  ];

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      alert("Resume uploaded successfully!");
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const stats = {
    cgpa: 8.42,
    creditsCompleted: 142,
    connectionssMade: 25,
    eventsAttended: 8,
  };

  const features = [
    {
      icon: Users,
      title: "Alumni Network",
      description:
        "Connect with successful graduates and build your professional network",
      gradient: "from-blue-500 to-violet-500",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description:
        "Access job postings, internships, and career guidance resources",
      gradient: "from-green-500 to-blue-500",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description:
        "Create and manage your professional resume with expert templates",
      gradient: "from-violet-500 to-red-500",
    },
    {
      icon: Calendar,
      title: "Professional Events",
      description:
        "Join workshops, seminars, and networking events to boost your career",
      gradient: "from-red-500 to-green-500",
    },
  ];

  const recentActivities = [
    {
      icon: CheckCircle,
      title: "Resume Updated",
      description: "Your resume has been successfully updated",
      time: "2 hours ago",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      title: "New Alumni Connection",
      description: "Sarah Johnson accepted your connection request",
      time: "1 day ago",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Calendar,
      title: "Event Registered",
      description: "Tech Career Panel - Next Week",
      time: "3 days ago",
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  // Sidebar Component
  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Student Portal
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => alert("Logged out successfully!")}
            className="w-full flex items-center px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );

  // Header Component
  const Header = () => (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-gray-600 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center space-x-4 ml-auto">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">
              {profileData.name}
            </p>
            <p className="text-xs text-gray-500">{profileData.year}</p>
          </div>
          {profileData.profilePhoto ? (
            <img
              src={profileData.profilePhoto}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 via-violet-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profileData.name.split(" ")[0]}!
            </h1>
            <p className="text-blue-100 text-lg">
              {profileData.major} • {profileData.year}
            </p>
          </div>
          <div className="hidden md:block">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.cgpa}</div>
            <div className="text-sm text-blue-100">Current CGPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.creditsCompleted}</div>
            <div className="text-sm text-blue-100">Credits Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.connectionssMade}</div>
            <div className="text-sm text-blue-100">Connections Made</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.eventsAttended}</div>
            <div className="text-sm text-blue-100">Events Attended</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() =>
                handlePageChange(
                  index === 0
                    ? "alumni"
                    : index === 1
                    ? "careers"
                    : index === 2
                    ? "resume"
                    : "events"
                )
              }
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:text-gray-900 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`w-8 h-8 ${activity.bgColor} rounded-full flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Profile Component
  const Profile = () => (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editMode ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <Edit3 className="w-4 h-4 mr-2" />
            )}
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="text-center">
                <div className="relative inline-block">
                  {profileData.profilePhoto ? (
                    <img
                      src={profileData.profilePhoto}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  {editMode && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profileData.name}
                </h2>
                <p className="text-gray-600">{profileData.studentId}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {profileData.email}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="text-sm">{profileData.major}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span className="text-sm">{profileData.year}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {profileData.city}, {profileData.state}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={handleInputChange("name")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange("email")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={handleInputChange("phone")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={handleInputChange("birthDate")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={handleInputChange("address")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={handleInputChange("city")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={handleInputChange("state")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={profileData.zipCode}
                    onChange={handleInputChange("zipCode")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={profileData.studentId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Major
                  </label>
                  <select
                    value={profileData.major}
                    onChange={handleInputChange("major")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business Administration">
                      Business Administration
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Year
                  </label>
                  <select
                    value={profileData.year}
                    onChange={handleInputChange("year")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Graduation
                  </label>
                  <input
                    type="month"
                    value={profileData.graduationDate}
                    onChange={handleInputChange("graduationDate")}
                    disabled={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Professional Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={handleInputChange("linkedin")}
                      disabled={!editMode}
                      placeholder="linkedin.com/in/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={profileData.github}
                      onChange={handleInputChange("github")}
                      disabled={!editMode}
                      placeholder="github.com/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      value={profileData.portfolio}
                      onChange={handleInputChange("portfolio")}
                      disabled={!editMode}
                      placeholder="yourportfolio.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={profileData.skills.join(", ")}
                    onChange={handleSkillsChange}
                    disabled={!editMode}
                    placeholder="JavaScript, React, Python..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate skills with commas
                  </p>
                </div>

                {/* About Me */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    value={profileData.aboutMe}
                    onChange={handleInputChange("aboutMe")}
                    disabled={!editMode}
                    rows={4}
                    placeholder="Write a short bio about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Resume Manager Component
  const ResumeManager = () => (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Manager</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-gray-700">Upload your resume (PDF only)</p>
          <button
            onClick={() => resumeInputRef.current?.click()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </button>
          <input
            type="file"
            ref={resumeInputRef}
            onChange={handleResumeUpload}
            accept="application/pdf"
            className="hidden"
          />
        </div>

        {resumeFile && (
          <div className="mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-800">{resumeFile.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  window.open(URL.createObjectURL(resumeFile), "_blank")
                }
                className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Eye className="w-4 h-4 mr-1" /> View
              </button>
              <button
                onClick={() => alert("Resume downloaded!")}
                className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4 mr-1" /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Main Content Renderer
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "resume":
        return <ResumeManager />;
      default:
        return (
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {currentPage} page coming soon...
            </h1>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
=======
import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import {
  User,
  Calendar,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Trophy,
  Settings,
  X,
  LogOut,
  Zap,
  ChevronDown,
  Globe,
  Shield,
  TrendingUp,
  BookOpen,
  Users,
} from "lucide-react";

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
        ? "bg-gradient-to-r from-green-600 to-blue-600 via-emerald-500 text-white font-bold shadow-lg transform scale-105"
        : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
    }`}
  >
    <span
      className={
        isActive ? "text-white" : "text-gray-500 group-hover:text-green-500"
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
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-lg">SD</span>
    </div>
    <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-blue-600 via-emerald-500 bg-clip-text text-transparent">
      Student Dashboard
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
    { id: "events", label: "Events", icon: <Calendar className="h-6 w-6" /> },
    {
      id: "community",
      label: "Community Forum",
      icon: <MessageSquare className="h-6 w-6" />,
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
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                ST
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">
                  Student Name
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
export default function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[70px] left-6 z-50 bg-gradient-to-r from-green-600 to-blue-600 via-emerald-500 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
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
        className="relative z-10 flex flex-col items-center justify-center h-[700px] px-6 text-center"
        style={{
          backgroundImage: "url('/Students.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0 rounded-none" />
        <div className="animate-fade-in max-w-6xl relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-green-700 font-semibold mb-8 shadow-lg">
            <Zap className="h-5 w-5 mr-2" />
            <span>Student Success Platform</span>
          </div>
          <div className="flex flex-row m-6">
            <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left mr-10">
            <h1 className="text-7xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-blue-800 via-lime-500 bg-clip-text text-transparent mb-8 leading-tight">
              Student Dashboard
            </h1>

            <p className="text-2xl md:text-3xl text-slate-800 max-w-4xl mb-12 leading-relaxed font-medium">
              Empowering students to connect, learn, and grow with alumni
              support. Get started on your journey today!
            </p>

            </div>
            <img
              src="/Stu_Front.png"
              alt=""
              className="w-[650px] h-[400px] rounded-2xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToFeatures}
              className="bg-gradient-to-r from-green-600 to-blue-700 via-teal-600 hover:from-green-600 hover:via-emerald-500 hover:to-indigo-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-3 text-lg"
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
      <section
        id="features"
        className="py-28 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20"
      >
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-green-700 font-semibold mb-6">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Student Features</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 via-emerald-500 bg-clip-text text-transparent mb-8 py-2.5">
              Interesting features for Students
            </h2>

            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Manage courses, discover events, access career opportunities, and
              build your student journey.
            </p>
          </div>

          <StudentSlidingCards />

          <div className="mt-24 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-700 font-semibold mb-8">
              <Briefcase className="h-5 w-5 mr-2" />
              <span>Job Updates</span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest job openings and career resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------- Sliding Cards ----------------
function StudentSlidingCards() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const colorVariants = {
    blue: "from-blue-500 to-purple-600",
    green: "from-green-500 to-teal-600",
    orange: "from-orange-500 to-red-600",
    purple: "from-purple-500 to-pink-600",
    indigo: "from-indigo-500 to-blue-600",
    emerald: "from-emerald-500 to-cyan-600",
  };

  const cards = [
    {
      icon: <Calendar className="h-10 w-10" />,
      bg_img: "/Camp_events.jpg",
      title: "Campus Events",
      description: "Discover upcoming workshops, hackathons, and seminars.",
      color: "indigo",
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      bg_img: "/Job_opps.png",
      title: "Job Opportunities",
      description:
        "Access internships and job postings shared by alumni and companies.",
      color: "emerald",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      bg_img: "/Discussion.jpg",
      title: "Discussion Forums",
      description:
        "Collaborate with peers and mentors through Q&A and group discussions.",
      color: "orange",
    },
    {
      icon: <Trophy className="h-10 w-10" />,
      bg_img: "/Gami_reward.jpg",
      title: "Gamification",
      description: "Earn rewards and recognition for your achievements.",
      color: "green",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [x.get(), -3000],
        transition: { repeat: Infinity, duration: 20, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isPaused]);

  return (
    <div
      className="relative m-auto w-[84vw] justify-center p-0 overflow-hidden bg-transparent py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-8 p-2 w-full cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -3000, right: 0 }}
        style={{ x }}
      >
        {[...cards, ...cards].map((card, idx) => (
          <div
            key={idx}
            className="h-[350px] w-[700px] bg-gradient-to-r from-green-200 to-blue-200 via-emerald-200 flex flex-row flex-shrink-0 relative backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center w-[60%]">
              <img
                src={card.bg_img}
                alt=""
                className="h-full w-[450px] object-cover rounded-2xl"
              />
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
>>>>>>> 4b5334b33b82aa8257e6924e3ae771993518cd55
    </div>
  );
}
