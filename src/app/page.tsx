"use client";

import React, { useState, ReactNode, useEffect } from "react";

// -------------------for slider animation-------------------------------
import Link from "next/link";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// --------------------------------------

import {
  Video,
  Trophy,
  UserCheck,
  MessageSquare,
  Calendar,
  Briefcase,
  ChevronDown,
  User,
  Users,
  Settings,
  X,
  LogOut,
  MapPin,
  GraduationCap,
  Star,
  Search,
  Heart,
  TrendingUp,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

// ---------------- FeatureCard(initial) ----------------
// type FeatureCardProps = {
//   icon: ReactNode;
//   title: string;
//   description: string;
//   index: number;
//   color?: "blue" | "green" | "orange" | "purple" | "indigo" | "emerald";
// };

// const FeatureCard: React.FC<FeatureCardProps> = ({
//   icon,
//   title,
//   description,
//   index,
//   color = "blue",
// }) => {
//   const colorVariants: Record<NonNullable<FeatureCardProps["color"]>, string> = {
//     blue: "from-blue-500 to-purple-600",
//     green: "from-green-500 to-teal-600",
//     orange: "from-orange-500 to-red-600",
//     purple: "from-purple-500 to-pink-600",
//     indigo: "from-indigo-500 to-blue-600",
//     emerald: "from-emerald-500 to-cyan-600",
//   };

//   return (
//     <div
//       className="relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group feature-card overflow-hidden"
//       style={{ animationDelay: `${index * 100}ms` }}
//     >
//       {/* Animated gradient border on hover */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

//       <div className="relative z-10 flex flex-col items-center text-center">
//         <div
//           className={`mb-8 p-5 bg-gradient-to-br ${colorVariants[color]} rounded-3xl text-white group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
//         >
//           {icon}
//         </div>
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 transition-colors">
//           {title}
//         </h3>
//         <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors">
//           {description}
//         </p>

//         {/* Decorative elements */}
//         <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
//         <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity"></div>
//       </div>
//     </div>
//   );
// };
// ----------------------- FeatureCard --------------------------

// ---------------- SidebarLink ----------------
type SidebarLinkProps = {
  link: { id: string; label: string; icon: ReactNode };
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
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
        : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
    }`}
  >
    <span
      className={`transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-500 group-hover:text-blue-500"
      }`}
    >
      {link.icon}
    </span>
    <span className="font-semibold">{link.label}</span>
  </button>
);

// ---------------- Logo ----------------
const Logo: React.FC = () => (
  <div className="flex items-center space-x-3 py-6 px-6">
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-lg">AS</span>
    </div>
    <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Alumni-Sphere
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
    { id: "network", label: "Network", icon: <Users className="h-6 w-6" /> },
    { id: "events", label: "Events", icon: <Calendar className="h-6 w-6" /> },
    {
      id: "opportunities",
      label: "Opportunities",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "mentorship",
      label: "Mentorship",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Trophy className="h-6 w-6" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-6 w-6" />,
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
        className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-white/40 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
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
                JD
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">John Doe</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Alumni 2020
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

// ---------------- Main Component ----------------
export default function AlumniSphere() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ---------------- FeatureCard(initial) ----------------
  // const features: Omit<FeatureCardProps, "index">[] = [
  //   {
  //     icon: <Video className="h-10 w-10" />,
  //     title: "Video Messaging & Calls",
  //     description:
  //       "Connect face-to-face with alumni worldwide through HD video messaging and group calls. Share experiences and build meaningful relationships instantly.",
  //     color: "blue",
  //   },
  //   {
  //     icon: <Users className="h-10 w-10" />,
  //     title: "Smart Alumni Directory",
  //     description:
  //       "Discover and connect with alumni using intelligent search filters by location, industry, graduation year, and interests. Build your professional network effortlessly.",
  //     color: "green",
  //   },
  //   {
  //     icon: <Trophy className="h-10 w-10" />,
  //     title: "Gamified Networking",
  //     description:
  //       "Earn points, badges, and achievements as you engage with your alumni community. Make networking fun and rewarding with our comprehensive gamification system.",
  //     color: "orange",
  //   },
  //   {
  //     icon: <UserCheck className="h-10 w-10" />,
  //     title: "Structured Mentorship",
  //     description:
  //       "Join curated mentoring programs or become a mentor yourself. Guide newcomers and learn from experienced professionals with goal-tracking tools.",
  //     color: "purple",
  //   },
  //   {
  //     icon: <Calendar className="h-10 w-10" />,
  //     title: "Event Management Hub",
  //     description:
  //       "Create, discover, and attend alumni events seamlessly. From virtual reunions to professional workshops, stay connected with interactive event features.",
  //     color: "indigo",
  //   },
  //   {
  //     icon: <Briefcase className="h-10 w-10" />,
  //     title: "Career Opportunities",
  //     description:
  //       "Access exclusive job postings, internships, and freelance opportunities shared by alumni. Advance your career within your trusted network.",
  //     color: "emerald",
  //   },
  //   {
  //     icon: <MessageSquare className="h-10 w-10" />,
  //     title: "Discussion Forums",
  //     description:
  //       "Engage in industry-specific forums and special interest groups. Share knowledge, ask questions, and contribute to meaningful conversations.",
  //     color: "blue",
  //   },
  //   {
  //     icon: <MapPin className="h-10 w-10" />,
  //     title: "Location-Based Connect",
  //     description:
  //       "Find and meet alumni in your city or travel destinations. Organize local meetups and expand your global network with location intelligence.",
  //     color: "green",
  //   },
  //   {
  //     icon: <GraduationCap className="h-10 w-10" />,
  //     title: "Alumni Success Stories",
  //     description:
  //       "Share and discover inspiring career journeys, achievements, and milestones. Celebrate success and learn from diverse alumni experiences.",
  //     color: "orange",
  //   },
  //   {
  //     icon: <Star className="h-10 w-10" />,
  //     title: "Skill Exchange Platform",
  //     description:
  //       "Offer your expertise or learn new skills from fellow alumni. Create a collaborative learning environment with peer-to-peer knowledge sharing.",
  //     color: "purple",
  //   },
  //   {
  //     icon: <Search className="h-10 w-10" />,
  //     title: "Advanced Search & Filters",
  //     description:
  //       "Find exactly who you're looking for with powerful search capabilities. Filter by skills, location, experience level, and availability.",
  //     color: "indigo",
  //   },
  //   {
  //     icon: <Heart className="h-10 w-10" />,
  //     title: "Alumni Giving & Causes",
  //     description:
  //       "Support meaningful causes and fundraising campaigns initiated by fellow alumni. Make a positive impact together as a community.",
  //     color: "emerald",
  //   },
  // ];
  // ----------------------- FeatureCard --------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-[70px] left-6 z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
        >
          <span className="text-xl font-bold">☰</span>
        </button>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className=" animate-fade-in max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-blue-700 font-semibold mb-8 shadow-lg">
            <Zap className="h-5 w-5 mr-2" />
            <span>Next-Generation Alumni Platform</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight">
            Alumni-Sphere
          </h1>

          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mb-12 leading-relaxed font-medium">
            The ultimate digital platform connecting graduates worldwide —
            fostering collaboration, enabling mentorship, and building lifelong
            professional relationships.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToFeatures}
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-3 text-lg"
            >
              <span>Explore Features</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-lg hover:bg-white/30">
              <Globe className="h-6 w-6" />
              <span>Join Network</span>
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
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Comprehensive Features</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 py-2.5">
              Everything You Need to Connect
            </h2>

            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover powerful tools and features designed to strengthen alumni
              relationships, accelerate career growth, and build meaningful
              professional networks.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-16">
            {/*-------------------- Individual Feature Cards(initial)------------------------- */}
            {/* {features.map((feature, index) => (
              <FeatureCard
                key={index}
                index={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))} */}
            {/* -------------------------------------------------------------------------------------- */}

            <ContinuousSlidingCards />
          </div>

          {/* Trust Section */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-700 font-semibold mb-8">
              <Shield className="h-5 w-5 mr-2" />
              <span>Trusted & Secure Platform</span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities.
              Alumni-Sphere uses enterprise-grade encryption and follows strict
              privacy standards to protect your information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContinuousSlidingCards() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0); // track x position
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
      icon: <Video className="h-10 w-10" />,
      bg_img: "/bg_video_message.jpg",
      title: "Video Messaging & Calls",
      description:
        "Connect face-to-face with alumni worldwide through HD video messaging and group calls. Share experiences and build meaningful relationships instantly.",
      color: "blue",
      href: "#",
    },
    {
      icon: <Trophy className="h-10 w-10" />,
      bg_img: "/bg_gemified.jpg",
      title: "Gamified Networking",
      description:
        "Earn points, badges, and achievements as you engage with your alumni community. Make networking fun and rewarding with our comprehensive gamification system.",
      color: "orange",
      href: "#",
    },
    {
      icon: <UserCheck className="h-10 w-10" />,
      bg_img: "/bg_mentorship.jpg",
      title: "Structured Mentorship",
      description:
        "Join curated mentoring programs or become a mentor yourself. Guide newcomers and learn from experienced professionals with goal-tracking tools.",
      color: "purple",
      href: "#",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      bg_img: "/bg_event_management.jpg",
      title: "Event Management Hub",
      description:
        "Create, discover, and attend alumni events seamlessly. From virtual reunions to professional workshops, stay connected with interactive event features.",
      color: "indigo",
      href: "#",
    },
    {
      icon: <Briefcase className="h-10 w-10" />,
      bg_img: "/bg_career_opportunity.jpg",
      title: "Career Opportunities",
      description:
        "Access exclusive job postings, internships, and freelance opportunities shared by alumni. Advance your career within your trusted network.",
      color: "emerald",
      href: "#",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      bg_img: "/bg_discuss_forum.jpg",
      title: "Discussion Forums",
      description:
        "Engage in industry-specific forums and special interest groups. Share knowledge, ask questions, and contribute to meaningful conversations.",
      color: "blue",
      href: "#",
    },
    {
      icon: <Star className="h-10 w-10" />,
      bg_img: "/bg_skill_exchange.jpg",
      title: "Skill Exchange Platform",
      description:
        "Offer your expertise or learn new skills from fellow alumni. Create a collaborative learning environment with peer-to-peer knowledge sharing.",
      color: "purple",
      href: "#",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      bg_img: "/bg_alumni_giving.jpg",
      title: "Alumni Giving & Causes",
      description:
        "Support meaningful causes and fundraising campaigns initiated by fellow alumni. Make a positive impact together as a community.",
      color: "emerald",
      href: "#",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [x.get(), -12296], // adjust based on total width of cards
        transition: {
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        },
      });
    } else {
      controls.stop(); // pause at current position
    }
  }, [isPaused]);

  return (
    <div
      className="relative w-[95vw] justify-center p-0 overflow-hidden bg-transparent from-gray-50 to-white py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-8 p-2 w-max cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -12900, right: 0 }} // allow dragging
        style={{ x }}
      >
        {[...cards, ...cards].map((card, idx) => (
          // <Link key={idx} href={card.href} className="min-w-[280px] w-[500px]  flex-shrink-0">
          <div
            key={idx}
            className=" h-[400px] w-[800px] bg-gradient-to-r from-violet-300 to-violet-200 via-pink-100 flex flex-row  flex-shrink-0 relative backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center w-[50%]">
              <img
                src={card.bg_img}
                alt=""
                className="h-full w-[450px] object-cover rounded-2xl"
              />
            </div>

            <div className="w-[50%] relative grid-cols-1 z-10 flex flex-col items-center text-center">
              <div
                className={`mb-8 p-5 text-white rounded-3xl  group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl bg-gradient-to-br ${
                  colorVariants[card.color as keyof typeof colorVariants]
                }`}
              >
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold  mb-6 group-hover:text-gray-900 transition-colors">
                {card.title}
              </h3>
              <p className=" leading-relaxed text-lg group-hover:text-gray-700 transition-colors p-2">
                {card.description}
              </p>
            </div>
          </div>
          // </Link>
        ))}
      </motion.div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import {
//   Video,
//   Trophy,
//   UserCheck,
//   MessageSquare,
//   Calendar,
//   Briefcase,
//   ChevronDown,
//   User,
//   Users,
//   Settings,
//   X,
//   LogOut,
//   MapPin,
//   GraduationCap,
//   Star,
//   Search,
//   Heart,
//   Share2,
//   TrendingUp,
//   Shield,
//   Globe,
//   Zap
// } from "lucide-react";

// // Enhanced Feature Card Component with gradient borders and hover effects
// const FeatureCard = ({ icon, title, description, index, color = "blue" }) => {
//   const colorVariants = {
//     blue: "from-blue-500 to-purple-600",
//     green: "from-green-500 to-teal-600",
//     orange: "from-orange-500 to-red-600",
//     purple: "from-purple-500 to-pink-600",
//     indigo: "from-indigo-500 to-blue-600",
//     emerald: "from-emerald-500 to-cyan-600"
//   };

//   return (
//     <div
//       className={`relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group feature-card overflow-hidden`}
//       style={{ animationDelay: `${index * 100}ms` }}
//     >
//       {/* Animated gradient border on hover */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

//       <div className="relative z-10 flex flex-col items-center text-center">
//         <div className={`mb-8 p-5 bg-gradient-to-br ${colorVariants[color]} rounded-3xl text-white group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
//           {icon}
//         </div>
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 transition-colors">{title}</h3>
//         <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors">{description}</p>

//         {/* Decorative elements */}
//         <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
//         <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity"></div>
//       </div>
//     </div>
//   );
// };

// // Sidebar Components with enhanced styling
// const SidebarLink = ({ link, isActive, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
//       isActive
//         ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
//         : "text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:scale-102"
//     }`}
//   >
//     <span
//       className={`transition-all duration-300 ${
//         isActive ? "text-white" : "text-gray-500 group-hover:text-blue-500"
//       }`}
//     >
//       {link.icon}
//     </span>
//     <span className="font-semibold">{link.label}</span>
//   </button>
// );

// const Logo = () => (
//   <div className="flex items-center space-x-3 py-6 px-6">
//     <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
//       <span className="text-white font-bold text-lg">AS</span>
//     </div>
//     <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Alumni-Sphere</span>
//   </div>
// );

// const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
//   const links = [
//     { id: "profile", label: "Profile", icon: <User className="h-6 w-6" /> },
//     { id: "network", label: "Network", icon: <Users className="h-6 w-6" /> },
//     { id: "events", label: "Events", icon: <Calendar className="h-6 w-6" /> },
//     { id: "opportunities", label: "Opportunities", icon: <Briefcase className="h-6 w-6" /> },
//     { id: "mentorship", label: "Mentorship", icon: <GraduationCap className="h-6 w-6" /> },
//     { id: "achievements", label: "Achievements", icon: <Trophy className="h-6 w-6" /> },
//     { id: "settings", label: "Settings", icon: <Settings className="h-6 w-6" /> },
//   ];

//   const handleLinkClick = (linkId) => {
//     setActiveTab(linkId);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//           onClick={onClose}
//         />
//       )}
//       <div
//         className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-white/40 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between border-b border-white/40 bg-gradient-to-r from-white/50 to-white/30">
//             <Logo />
//             <button
//               onClick={onClose}
//               className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 mr-4 hover:scale-110"
//             >
//               <X className="h-7 w-7" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto py-8 px-6">
//             <nav className="space-y-3">
//               {links.map((link) => (
//                 <SidebarLink
//                   key={link.id}
//                   link={link}
//                   isActive={activeTab === link.id}
//                   onClick={() => handleLinkClick(link.id)}
//                 />
//               ))}
//             </nav>
//           </div>

//           <div className="border-t border-white/40 p-6 bg-gradient-to-r from-white/40 to-white/20">
//             <div className="flex items-center space-x-4 mb-4">
//               <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                 JD
//               </div>
//               <div>
//                 <div className="text-lg font-bold text-gray-800">John Doe</div>
//                 <div className="text-sm text-gray-600 flex items-center">
//                   <GraduationCap className="h-4 w-4 mr-1" />
//                   Alumni 2020
//                 </div>
//               </div>
//             </div>
//             <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-semibold">
//               <LogOut className="h-5 w-5" />
//               <span>Sign Out</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // Main App Component
// export default function AlumniSphere() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");

//   const scrollToFeatures = () => {
//     const featuresSection = document.getElementById("features");
//     if (featuresSection) {
//       featuresSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const features = [
//     {
//       icon: <Video className="h-10 w-10" />,
//       title: "Video Messaging & Calls",
//       description: "Connect face-to-face with alumni worldwide through HD video messaging and group calls. Share experiences and build meaningful relationships instantly.",
//       color: "blue"
//     },
//     {
//       icon: <Users className="h-10 w-10" />,
//       title: "Smart Alumni Directory",
//       description: "Discover and connect with alumni using intelligent search filters by location, industry, graduation year, and interests. Build your professional network effortlessly.",
//       color: "green"
//     },
//     {
//       icon: <Trophy className="h-10 w-10" />,
//       title: "Gamified Networking",
//       description: "Earn points, badges, and achievements as you engage with your alumni community. Make networking fun and rewarding with our comprehensive gamification system.",
//       color: "orange"
//     },
//     {
//       icon: <UserCheck className="h-10 w-10" />,
//       title: "Structured Mentorship",
//       description: "Join curated mentoring programs or become a mentor yourself. Guide newcomers and learn from experienced professionals with goal-tracking tools.",
//       color: "purple"
//     },
//     {
//       icon: <Calendar className="h-10 w-10" />,
//       title: "Event Management Hub",
//       description: "Create, discover, and attend alumni events seamlessly. From virtual reunions to professional workshops, stay connected with interactive event features.",
//       color: "indigo"
//     },
//     {
//       icon: <Briefcase className="h-10 w-10" />,
//       title: "Career Opportunities",
//       description: "Access exclusive job postings, internships, and freelance opportunities shared by alumni. Advance your career within your trusted network.",
//       color: "emerald"
//     },
//     {
//       icon: <MessageSquare className="h-10 w-10" />,
//       title: "Discussion Forums",
//       description: "Engage in industry-specific forums and special interest groups. Share knowledge, ask questions, and contribute to meaningful conversations.",
//       color: "blue"
//     },
//     {
//       icon: <MapPin className="h-10 w-10" />,
//       title: "Location-Based Connect",
//       description: "Find and meet alumni in your city or travel destinations. Organize local meetups and expand your global network with location intelligence.",
//       color: "green"
//     },
//     {
//       icon: <GraduationCap className="h-10 w-10" />,
//       title: "Alumni Success Stories",
//       description: "Share and discover inspiring career journeys, achievements, and milestones. Celebrate success and learn from diverse alumni experiences.",
//       color: "orange"
//     },
//     {
//       icon: <Star className="h-10 w-10" />,
//       title: "Skill Exchange Platform",
//       description: "Offer your expertise or learn new skills from fellow alumni. Create a collaborative learning environment with peer-to-peer knowledge sharing.",
//       color: "purple"
//     },
//     {
//       icon: <Search className="h-10 w-10" />,
//       title: "Advanced Search & Filters",
//       description: "Find exactly who you're looking for with powerful search capabilities. Filter by skills, location, experience level, and availability.",
//       color: "indigo"
//     },
//     {
//       icon: <Heart className="h-10 w-10" />,
//       title: "Alumni Giving & Causes",
//       description: "Support meaningful causes and fundraising campaigns initiated by fellow alumni. Make a positive impact together as a community.",
//       color: "emerald"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Enhanced Sidebar Toggle Button */}
//       {!isSidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed top-6 left-6 z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
//         >
//           <span className="text-xl font-bold">☰</span>
//         </button>
//       )}

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {/* Enhanced Hero Section */}
//       {/* <AuroraBackground> */}
//         <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
//           <div className="opacity-0 animate-fade-in max-w-6xl">
//             {/* Enhanced Badge */}
//             <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-blue-700 font-semibold mb-8 shadow-lg">
//               <Zap className="h-5 w-5 mr-2" />
//               <span>Next-Generation Alumni Platform</span>
//             </div>

//             <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight">
//               Alumni-Sphere
//             </h1>

//             <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mb-12 leading-relaxed font-medium">
//               The ultimate digital platform connecting graduates worldwide — fostering collaboration, enabling mentorship, and building lifelong professional relationships.
//             </p>

//             {/* Enhanced CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//               <button
//                 onClick={scrollToFeatures}
//                 className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-3 text-lg"
//               >
//                 <span>Explore Features</span>
//                 <ChevronDown className="h-6 w-6 animate-bounce" />
//               </button>

//               <button className="bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-lg hover:bg-white/30">
//                 <Globe className="h-6 w-6" />
//                 <span>Join Network</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       {/* </AuroraBackground> */}

//       {/* Enhanced Features Section */}
//       <section id="features" className="py-28 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20">
//         <div className="max-w-8xl mx-auto px-8">
//           {/* Enhanced Section Header */}
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6">
//               <TrendingUp className="h-5 w-5 mr-2" />
//               <span>Comprehensive Features</span>
//             </div>

//             <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//               Everything You Need to Connect
//             </h2>

//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Discover powerful tools and features designed to strengthen alumni relationships, accelerate career growth, and build meaningful professional networks.
//             </p>
//           </div>

//           {/* Enhanced Feature Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-16">
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 index={index}
//                 icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//                 color={feature.color}
//               />
//             ))}
//           </div>

//           {/* Trust & Security Section */}
//           <div className="mt-24 text-center">
//             <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-700 font-semibold mb-8">
//               <Shield className="h-5 w-5 mr-2" />
//               <span>Trusted & Secure Platform</span>
//             </div>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your privacy and data security are our top priorities. Alumni-Sphere uses enterprise-grade encryption and follows strict privacy standards to protect your information.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
