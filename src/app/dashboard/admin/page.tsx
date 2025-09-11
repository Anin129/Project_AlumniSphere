"use client";

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
