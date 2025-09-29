"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  Briefcase,
  GraduationCap,
  Trophy,
  Settings,
  LogOut,
  Globe,
  Search as SearchIcon,
  Heart as HeartIcon,
  User,
  UserCheck,
  MessageCircle,
} from "lucide-react";

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SidebarLink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  const content = (
    <div
      className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
          : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
      }`}
    >
      <span
        className={`transition-all duration-300 ${
          active ? "text-white" : "text-gray-500 group-hover:text-blue-500"
        }`}
      >
        {icon}
      </span>
      <span className="font-semibold">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="w-full block">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {content}
    </button>
  );
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState<'student' | 'alumni' | null>(null);

  useEffect(() => {
    // Get user type from localStorage
    const savedUserType = localStorage.getItem('userType') as 'student' | 'alumni';
    setUserType(savedUserType);
  }, []);

  const getDashboardLink = () => {
    if (userType === 'student') return '/dashboard/student';
    if (userType === 'alumni') return '/dashboard/alumni';
    return '/dashboard/alumni'; // default
  };

  const getProfileLink = () => {
    if (userType === 'student') return '/profile/student';
    if (userType === 'alumni') return '/profile/alumni';
    return '/profile'; // default to selector
  };

  const getProfileLabel = () => {
    if (userType === 'student') return 'My Student Profile';
    if (userType === 'alumni') return 'My Alumni Profile';
    return 'My Profile';
  };

  const links: Array<{ id: string; label: string; href?: string; icon: React.ReactNode }> = [
    { id: "home", label: "Home", href: "/", icon: <Globe className="h-6 w-6" /> },
    { id: "community", label: "Community", href: "/community", icon: <Users className="h-6 w-6" /> },
    { id: "events", label: "Events", href: "/events", icon: <Calendar className="h-6 w-6" /> },
    { id: "jobs", label: "Jobs", href: "/jobs", icon: <Briefcase className="h-6 w-6" /> },
    { id: "fundraising", label: "Fundraising", href: "/fundraising", icon: <HeartIcon className="h-6 w-6" /> },
    { id: "search", label: "Search", href: "/search", icon: <SearchIcon className="h-6 w-6" /> },
    { id: "chatbot", label: "AI Assistant", href: "/chatbot", icon: <MessageCircle className="h-6 w-6" /> },
    { id: "dashboard", label: "Dashboard", href: getDashboardLink(), icon: <Trophy className="h-6 w-6" /> },
    { id: "profile", label: getProfileLabel(), href: getProfileLink(), icon: userType === 'alumni' ? <UserCheck className="h-6 w-6" /> : <User className="h-6 w-6" /> },
    { id: "profiles", label: "All Profiles", href: "/profile", icon: <User className="h-6 w-6" /> },
    { id: "mentorship", label: "Mentorship", icon: <GraduationCap className="h-6 w-6" /> },
    { id: "achievements", label: "Achievements", icon: <Trophy className="h-6 w-6" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-6 w-6" /> },
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white/95 backdrop-blur-xl border-r border-white/40 z-50 transform transition-all duration-500 ease-out shadow-2xl overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-white/40 bg-gradient-to-r from-white/50 to-white/30">
            <div className="flex items-center space-x-3 py-6 px-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Alumni-Sphere
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 mr-4 hover:scale-110"
            >
              {/* X icon (inline to avoid extra import) */}
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6">
            <nav className="space-y-3">
              {links.map((l) => (
                <SidebarLink
                  key={l.id}
                  href={l.href}
                  label={l.label}
                  icon={l.icon}
                  active={isActive(l.href)}
                  onClick={onClose}
                />
              ))}
            </nav>
          </div>

          <div className="border-t border-white/40 p-6 bg-gradient-to-r from-white/40 to-white/20">
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

export default Sidebar; 