// import React, { useState } from "react";
// import {
//   Heart,
//   Calendar,
//   Users,
//   Target,
//   TrendingUp,
//   Share2,
//   Bookmark,
//   ArrowRight,
// } from "lucide-react";

// const FundraisingCard = ({
//   campaign = {
//     name: "Build a Better Tomorrow",
//     description:
//       "Help us create innovative learning spaces that will transform education for thousands of students. Every contribution brings us closer to building state-of-the-art facilities.",
//     goalAmount: 50000,
//     collectedAmount: 32750,
//     donorsCount: 127,
//     category: "Education",
//     logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&crop=center",
//     status: "active",
//     endDate: "2024-12-31",
//     createdBy: "Education Foundation",
//   },
// }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const progressPercentage = Math.min(
//     (campaign.collectedAmount / campaign.goalAmount) * 100,
//     100
//   );
//   const remainingAmount = Math.max(
//     campaign.goalAmount - campaign.collectedAmount,
//     0
//   );
//   const daysLeft = campaign.endDate
//     ? Math.max(
//         Math.ceil(
//           (new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)
//         ),
//         0
//       )
//     : null;

//   const getCategoryGradient = (category) => {
//     const gradients = {
//       Education: "from-violet-600 via-purple-600 to-blue-600",
//       Healthcare: "from-rose-500 via-pink-500 to-red-500",
//       Environment: "from-emerald-500 via-teal-500 to-green-600",
//       Technology: "from-cyan-500 via-blue-500 to-indigo-600",
//       Emergency: "from-orange-500 via-red-500 to-pink-500",
//       Community: "from-purple-500 via-violet-500 to-indigo-600",
//       Research: "from-indigo-600 via-purple-600 to-pink-600",
//       Infrastructure: "from-slate-600 via-gray-600 to-zinc-600",
//       default: "from-blue-600 via-purple-600 to-indigo-600",
//     };
//     return gradients[category] || gradients.default;
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className="group relative w-full max-w-sm mx-auto">
//       <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
//         <div className="relative h-48 overflow-hidden">
//           {campaign.logo ? (
//             <img
//               src={campaign.logo}
//               alt={campaign.name}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//           ) : (
//             <div
//               className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(
//                 campaign.category
//               )} flex items-center justify-center`}
//             >
//               <Heart className="w-16 h-16 text-white/80" />
//             </div>
//           )}

//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

//           <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//             <div
//               className={`px-3 py-1.5 bg-gradient-to-r ${getCategoryGradient(
//                 campaign.category
//               )} text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}
//             >
//               {campaign.category}
//             </div>

//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
//                   isBookmarked
//                     ? "bg-white text-purple-600"
//                     : "bg-white/20 text-white hover:bg-white/30"
//                 }`}
//               >
//                 <Bookmark
//                   className="w-4 h-4"
//                   fill={isBookmarked ? "currentColor" : "none"}
//                 />
//               </button>
//               <button className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300">
//                 <Share2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="absolute bottom-4 left-4">
//             <div className="flex items-center space-x-2">
//               {daysLeft !== null && daysLeft > 0 && (
//                 <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full">
//                   <Calendar className="w-4 h-4 inline mr-1" />
//                   {daysLeft} days left
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
//               {campaign.name}
//             </h3>
//             <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
//               {campaign.description}
//             </p>
//           </div>

//           <div className="space-y-3">
//             <div className="flex justify-between items-center text-sm">
//               <span className="font-semibold text-gray-900">
//                 {formatCurrency(campaign.collectedAmount)} raised
//               </span>
//               <span className="text-gray-500">
//                 {progressPercentage.toFixed(1)}%
//               </span>
//             </div>

//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div
//                 className={`h-full bg-gradient-to-r ${getCategoryGradient(
//                   campaign.category
//                 )} transition-all duration-1000 ease-out rounded-full relative`}
//                 style={{ width: `${progressPercentage}%` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
//               </div>
//             </div>

//             <div className="text-sm text-gray-500">
//               <span className="font-medium text-gray-700">
//                 {formatCurrency(campaign.goalAmount)}
//               </span>{" "}
//               goal
//             </div>
//           </div>

//           <div className="flex justify-between items-center py-3 border-t border-gray-100">
//             <div className="flex items-center space-x-1 text-gray-600">
//               <Users className="w-4 h-4" />
//               <span className="text-sm font-medium">
//                 {campaign.donorsCount} supporters
//               </span>
//             </div>

//             <div className="flex items-center space-x-1 text-gray-600">
//               <TrendingUp className="w-4 h-4 text-green-500" />
//               <span className="text-sm font-medium">
//                 {formatCurrency(remainingAmount)} to go
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="px-6 pb-6">
//           <div className="flex space-x-3">
//             <button
//               className={`flex-1 bg-gradient-to-r ${getCategoryGradient(
//                 campaign.category
//               )} text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group`}
//             >
//               <span>Support Now</span>
//               <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
//             </button>

//             <button
//               onClick={() => setIsLiked(!isLiked)}
//               className={`p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
//                 isLiked
//                   ? "border-red-500 bg-red-50 text-red-500"
//                   : "border-gray-200 bg-gray-50 text-gray-600 hover:border-red-300 hover:text-red-500"
//               }`}
//             >
//               <Heart
//                 className="w-5 h-5"
//                 fill={isLiked ? "currentColor" : "none"}
//               />
//             </button>
//           </div>
//         </div>

//         <div
//           className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(
//             campaign.category
//           )} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default FundraisingCard;



"use client";

import React, { useState } from "react";
import {
  Heart,
  Calendar,
  Users,
  TrendingUp,
  Share2,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { Campaign } from "@/types";

type Props = {
  campaign: Campaign,
  onContribute?: () => void,
};

export default function FundraisingCard({ campaign, onContribute }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // protect against zero / missing values
  const goal = campaign.goalAmount ?? 1;
  const collected = campaign.collectedAmount ?? 0;

  const progressPercentage = Math.min((collected / goal) * 100, 100);
  const remainingAmount = Math.max(goal - collected, 0);
  const daysLeft = campaign.endDate
    ? Math.max(
        Math.ceil(
          (new Date(campaign.endDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        ),
        0
      )
    : null;

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      Education: "from-violet-600 via-purple-600 to-blue-600",
      Healthcare: "from-rose-500 via-pink-500 to-red-500",
      Environment: "from-emerald-500 via-teal-500 to-green-600",
      Technology: "from-cyan-500 via-blue-500 to-indigo-600",
      Emergency: "from-orange-500 via-red-500 to-pink-500",
      Community: "from-purple-500 via-violet-500 to-indigo-600",
      Research: "from-indigo-600 via-purple-600 to-pink-600",
      Infrastructure: "from-slate-600 via-gray-600 to-zinc-600",
      Sports: "from-yellow-500 via-orange-500 to-red-500",
      Scholarship: "from-green-500 via-emerald-500 to-teal-500",
      Events: "from-pink-500 via-red-500 to-rose-500",
      Innovation: "from-blue-500 via-indigo-500 to-purple-600",
      Cultural: "from-rose-500 via-pink-500 to-red-500",
      Other: "from-blue-600 via-purple-600 to-indigo-600",
    };
    return gradients[category] || gradients.Other;
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      <div className="relative bg-gray-200 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative h-44 overflow-hidden">
          {campaign.logo ? (
            <img
              src={campaign.logo}
              alt={campaign.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(
                campaign.category
              )} flex items-center justify-center`}
            >
              <Heart className="w-16 h-16 text-white/80" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div
              className={`px-3 py-1.5 bg-gradient-to-r ${getCategoryGradient(
                campaign.category
              )} text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}
            >
              {campaign.category}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsBookmarked((s) => !s)}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isBookmarked
                    ? "bg-white text-purple-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <button className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            {daysLeft !== null && daysLeft > 0 && (
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{daysLeft} days left</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {campaign.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {campaign.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-900">
                {formatCurrency(collected)} raised
              </span>
              <span className="text-gray-500">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>

            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getCategoryGradient(
                  campaign.category
                )} transition-all duration-1000 ease-out rounded-full`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                {formatCurrency(goal)}
              </span>{" "}
              goal
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                {campaign.donorsCount} supporters
              </span>
            </div>

            <div className="flex items-center space-x-1 text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">
                {formatCurrency(remainingAmount)} to go
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <button
              onClick={onContribute}
              className={`flex-1 bg-gradient-to-r ${getCategoryGradient(
                campaign.category
              )} text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center`}
            >
              <span>Support Now</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setIsLiked((s) => !s)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isLiked
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-red-300 hover:text-red-500"
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(
            campaign.category
          )} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}
        />
      </div>
    </div>
  );
}
