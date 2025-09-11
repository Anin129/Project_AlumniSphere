// // src/app/fundraising/page.tsx
// "use client";

// import React, { useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/store";
// import { fetchCampaigns } from "@/slices/campaignSlice";
// import { useEffect } from "react";
// import FundraisingCard from "@/components/campaignCard";
// import { Campaign } from "@/types";


// /* -----------------------------
//    Types
// ------------------------------*/
// // type Campaign = {
// //   id: string;
// //   title: string;
// //   category: "Infrastructure" | "Scholarship" | "Research" | "Sports" | "Other";
// //   description: string;
// //   goal: number;
// //   raised: number; // calculated from donations but kept here for demo convenience
// //   active: boolean;
// //   endDate: string; // ISO
// // };

// type Donation = {
//   id: string;
//   donorName: string;
//   donorEmail: string;
//   amount: number;
//   date: string; // ISO
//   campaignId?: string | null; // null -> general fund
// };

// /* -----------------------------
//    Dummy initial data
// ------------------------------*/
// const initialCampaigns: Campaign[] = [
//   {
//     id: "c1",
//     title: "New Library Construction",
//     category: "Infrastructure",
//     description: "Build a modern library with digital resources for students.",
//     goal: 5000000,
//     raised: 3250000,
//     active: true,
//     endDate: "2025-12-31",
//   },
//   {
//     id: "c2",
//     title: "Student Scholarship Fund",
//     category: "Scholarship",
//     description: "Support deserving students from disadvantaged backgrounds.",
//     goal: 2000000,
//     raised: 1450000,
//     active: true,
//     endDate: "2025-02-28",
//   },
//   {
//     id: "c3",
//     title: "Research Lab Equipment",
//     category: "Research",
//     description: "Upgrade research facilities with cutting-edge equipment.",
//     goal: 1500000,
//     raised: 520000,
//     active: false,
//     endDate: "2024-11-30",
//   },
//   {
//     id: "c4",
//     title: "Sports Complex Renovation",
//     category: "Sports",
//     description: "Renovate sports facilities to promote physical fitness.",
//     goal: 1200000,
//     raised: 300000,
//     active: true,
//     endDate: "2025-06-30",
//   },
// ];

// const initialDonations: Donation[] = [
//   {
//     id: "d1",
//     donorName: "John Doe",
//     donorEmail: "john@example.com",
//     amount: 50000,
//     date: daysAgoISO(3),
//     campaignId: "c1",
//   },
//   {
//     id: "d2",
//     donorName: "Priya Sharma",
//     donorEmail: "priya@example.com",
//     amount: 35000,
//     date: daysAgoISO(10),
//     campaignId: "c2",
//   },
//   {
//     id: "d3",
//     donorName: "Arjun Mehta",
//     donorEmail: "arjun@example.com",
//     amount: 25000,
//     date: daysAgoISO(2),
//     campaignId: "c1",
//   },
//   {
//     id: "d4",
//     donorName: "Rita Singh",
//     donorEmail: "rita@example.com",
//     amount: 15000,
//     date: daysAgoISO(5),
//     campaignId: "c4",
//   },
//   {
//     id: "d5",
//     donorName: "Nisha Rao",
//     donorEmail: "nisha@example.com",
//     amount: 20000,
//     date: daysAgoISO(40),
//     campaignId: "c2",
//   },
//   {
//     id: "d6",
//     donorName: "John Doe",
//     donorEmail: "john@example.com",
//     amount: 10000,
//     date: daysAgoISO(1),
//     campaignId: "c4",
//   },
// ];

// /* -----------------------------
//    Helpers
// ------------------------------*/
// function daysAgoISO(days: number) {
//   const d = new Date();
//   d.setDate(d.getDate() - days);
//   return d.toISOString();
// }

// const currencyINR = (n: number) =>
//   n >= 0
//     ? new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//       }).format(n)
//     : "₹0";

// const dispatch = useDispatch<AppDispatch>();
// const {
//   items: campaigns,
//   status,
//   error,
// } = useSelector((state: RootState) => state.campaigns);

// useEffect(() => {
//   if (status === "idle") {
//     dispatch(fetchCampaigns());
//   }
// }, [status, dispatch]);

// /* -----------------------------
//    Page Component
// ------------------------------*/
// export default function FundraisingPage() {
//   const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
//   const [donations, setDonations] = useState<Donation[]>(initialDonations);

//   // UI state
//   const [activeTab, setActiveTab] = useState<
//     "donation" | "campaigns" | "donors"
//   >("donation");
//   const [filterMode, setFilterMode] = useState<"All" | "Active" | "Category">(
//     "All"
//   );
//   const [selectedCategory, setSelectedCategory] = useState<
//     Campaign["category"] | "All"
//   >("All");
//   const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
//     null
//   );

//   /* -----------------------------
//      Derived stats
//   ------------------------------*/
//   // total raised across active campaigns (sum donations for active campaigns)
//   const totalRaisedActive = useMemo(() => {
//     // find active campaign ids
//     const activeIds = new Set(
//       campaigns.filter((c) => c.isActive).map((c) => c.id)
//     );
//     return donations.reduce(
//       (acc, d) =>
//         d.campaignId && activeIds.has(d.campaignId) ? acc + d.amount : acc,
//       0
//     );
//   }, [campaigns, donations]);

//   // unique donors across all donations
//   const uniqueDonorsCount = useMemo(() => {
//     const set = new Set<string>(
//       donations.map((d) => d.donorEmail.toLowerCase())
//     );
//     return set.size;
//   }, [donations]);

//   // average donation (per contribution)
//   const averageDonation = useMemo(() => {
//     if (donations.length === 0) return 0;
//     const sum = donations.reduce((a, b) => a + b.amount, 0);
//     return Math.round(sum / donations.length);
//   }, [donations]);

//   // funds raised in the last 7 days (all campaigns)
//   const lastWeekRaised = useMemo(() => {
//     const weekAgo = new Date();
//     weekAgo.setDate(weekAgo.getDate() - 7);
//     const sum = donations.reduce(
//       (acc, d) => (new Date(d.date) >= weekAgo ? acc + d.amount : acc),
//       0
//     );
//     return sum;
//   }, [donations]);

//   /* -----------------------------
//      Campaigns filtering logic
//   ------------------------------*/
//   // const visibleCampaigns = useMemo(() => {
//   //   let arr = campaigns.slice();
//   //   if (filterMode === "Active") arr = arr.filter((c) => c.active);
//   //   if (filterMode === "Category" && selectedCategory !== "All")
//   //     arr = arr.filter((c) => c.category === selectedCategory);
//   //   return arr;
//   // }, [campaigns, filterMode, selectedCategory]);

//   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//     {campaigns.length === 0 && status === "succeeded" && (
//       <p className="text-gray-500">No campaigns available.</p>
//     )}
//     {status === "loading" && <p className="text-gray-500">Loading...</p>}
//     {status === "failed" && <p className="text-red-500">Error: {error}</p>}

//     {campaigns.map((c, index) => (
//       <FundraisingCard key={index} campaign={c} />
//     ))}
//   </div>;


//   /* -----------------------------
//      Top donors (aggregate by email), sorted desc
//   ------------------------------*/
//   const topDonors = useMemo(() => {
//     const map = new Map<
//       string,
//       { name: string; email: string; total: number }
//     >();
//     for (const d of donations) {
//       const key = d.donorEmail.toLowerCase();
//       const prev = map.get(key);
//       if (prev) prev.total += d.amount;
//       else
//         map.set(key, {
//           name: d.donorName,
//           email: d.donorEmail,
//           total: d.amount,
//         });
//     }
//     const arr = Array.from(map.values()).sort((a, b) => b.total - a.total);
//     return arr;
//   }, [donations]);

//   /* -----------------------------
//      Donation submit handler
//   ------------------------------*/
//   function handleDonate(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const fd = new FormData(form);
//     const donorName = String(fd.get("donorName") || "").trim();
//     const donorEmail = String(fd.get("donorEmail") || "").trim();
//     const amount = Number(fd.get("amount") || 0);
//     const campaignId = String(fd.get("campaignId") || "") || null;

//     if (!donorName || !donorEmail || !amount || amount <= 0) {
//       alert("Please fill valid name, email and amount.");
//       return;
//     }

//     const newDonation: Donation = {
//       id: "d" + Math.random().toString(36).slice(2, 9),
//       donorName,
//       donorEmail,
//       amount,
//       date: new Date().toISOString(),
//       campaignId: campaignId === "null" ? null : campaignId,
//     };

//     // push donation
//     setDonations((prev) => [newDonation, ...prev]);

//     // update campaign's raised (for demo local state)
//     if (campaignId && campaignId !== "null") {
//       setCampaigns((prev) =>
//         prev.map((c) =>
//           c.id === campaignId ? { ...c, raised: c.collectedAmount + amount } : c
//         )
//       );
//     }

//     // reset to top or to "donation" tab
//     setActiveTab("donors");
//     form.reset();
//     setSelectedCampaignId(null);
//   }

//   /* -----------------------------
//      Render
//   ------------------------------*/
//   return (
//     <div className="min-h-screen bg-white text-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <header className="mb-6">
//           <h1 className="text-3xl font-extrabold">Alumni Giving</h1>
//           <p className="mt-1 text-gray-600">
//             Support your alma mater and help future generations succeed.
//           </p>
//         </header>

//         {/* Stats */}
//         <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//           <StatCard
//             title="Total Raised (Active)"
//             value={currencyINR(totalRaisedActive)}
//             subtitle={`${
//               campaigns.filter((c) => c.isActive).length
//             } active campaigns`}
//           />
//           <StatCard
//             title="Total Donors"
//             value={uniqueDonorsCount.toString()}
//             subtitle="Unique donors"
//           />
//           <StatCard
//             title="Average Donation"
//             value={currencyINR(averageDonation)}
//             subtitle="Per contribution"
//           />
//           <StatCard
//             title="Raised (Last 7 days)"
//             value={currencyINR(lastWeekRaised)}
//             subtitle="Recent contributions"
//           />
//         </section>

//         {/* Tabs */}
//         <nav className="mt-8 border-b">
//           <ul className="flex gap-6">
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "donation"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("donation")}
//               >
//                 Make Donation
//               </button>
//             </li>
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "campaigns"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("campaigns")}
//               >
//                 Campaigns
//               </button>
//             </li>
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "donors"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("donors")}
//               >
//                 Top Donors
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Tab Contents */}
//         <main className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
//           {/* Main column */}
//           <div>
//             {activeTab === "donation" && (
//               <section aria-labelledby="donation-heading">
//                 <h2
//                   id="donation-heading"
//                   className="text-xl font-semibold mb-4"
//                 >
//                   Make a Donation
//                 </h2>
//                 <DonationForm
//                   campaigns={campaigns}
//                   preselectedCampaignId={selectedCampaignId}
//                   onSubmit={handleDonate}
//                 />
//               </section>
//             )}

//             {activeTab === "campaigns" && (
//               <section aria-labelledby="campaigns-heading">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 id="campaigns-heading" className="text-xl font-semibold">
//                     Active Campaigns
//                   </h2>

//                   {/* filters */}
//                   <div className="flex items-center gap-3">
//                     <select
//                       className="border rounded px-2 py-1"
//                       value={filterMode}
//                       onChange={(e) => {
//                         const val = e.target.value as
//                           | "All"
//                           | "Active"
//                           | "Category";
//                         setFilterMode(val);
//                         if (val !== "Category") setSelectedCategory("All");
//                       }}
//                     >
//                       <option value="All">All</option>
//                       <option value="Active">Active</option>
//                       <option value="Category">Category</option>
//                     </select>

//                     {filterMode === "Category" && (
//                       <select
//                         className="border rounded px-2 py-1"
//                         value={selectedCategory}
//                         onChange={(e) =>
//                           setSelectedCategory(
//                             e.target.value as Campaign["category"] | "All"
//                           )
//                         }
//                       >
//                         <option value="All">All Categories</option>
//                         <option value="Infrastructure">Infrastructure</option>
//                         <option value="Scholarship">Scholarship</option>
//                         <option value="Research">Research</option>
//                         <option value="Sports">Sports</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     )}
//                   </div>
//                 </div>

//                 {/* campaign list */}
//                 <div className="grid gap-4">
//                   {campaigns.length === 0 && (
//                     <p className="text-gray-500">
//                       No campaigns match the selected filter.
//                     </p>
//                   )}
//                   {campaigns.map((c) => (
//                     <FundraisingCardign
//                       key={c.id}
//                       campaign={c}
//                       onContribute={() => {
//                         setSelectedCampaignId(c.id);
//                         setActiveTab("donation");
//                         // scroll to top / focus form could be added
//                       }}
//                     />
//                   ))}
//                 </div>
//               </section>
//             )}

//             {activeTab === "donors" && (
//               <section aria-labelledby="donors-heading">
//                 <h2 id="donors-heading" className="text-xl font-semibold mb-4">
//                   Top Donors
//                 </h2>
//                 <ul className="divide-y border rounded">
//                   {topDonors.length === 0 && (
//                     <li className="p-4 text-gray-500">No donors yet.</li>
//                   )}
//                   {topDonors.map((d, i) => (
//                     <li key={d.email} className="p-3 flex justify-between">
//                       <span className="font-medium">{d.name}</span>
//                       {/* price hidden per requirement (only names), but we'll show rank as subtle */}
//                       <span className="text-sm text-gray-400">#{i + 1}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}
//           </div>

//           {/* Right column: quick stats / recent donations / CTA */}
//           <aside>
//             <div className="bg-gray-50 border rounded p-4 mb-4">
//               <h3 className="text-sm text-gray-500">Quick Actions</h3>
//               <button
//                 onClick={() => {
//                   setActiveTab("donation");
//                 }}
//                 className="mt-3 w-full bg-red-600 text-white py-2 rounded"
//               >
//                 Make Donation
//               </button>
//               <button
//                 onClick={() => {
//                   setFilterMode("Active");
//                   setActiveTab("campaigns");
//                 }}
//                 className="mt-2 w-full border border-gray-200 py-2 rounded"
//               >
//                 View Active Campaigns
//               </button>
//             </div>

//             <div className="bg-white border rounded p-4">
//               <h4 className="text-sm text-gray-500 mb-3">Recent Donations</h4>
//               <ul className="space-y-2 text-sm">
//                 {donations.slice(0, 6).map((d) => (
//                   <li key={d.id} className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium">{d.donorName}</div>
//                       <div className="text-xs text-gray-500">
//                         {d.campaignId ? `Campaign: ${d.campaignId}` : "General"}
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-700">
//                       {currencyINR(d.amount)}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* -----------------------------
//    Subcomponents
// ------------------------------*/

// function StatCard({
//   title,
//   value,
//   subtitle,
// }: {
//   title: string;
//   value: string;
//   subtitle: string;
// }) {
//   return (
//     <div className="bg-white border rounded-lg p-4 shadow-sm">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-2xl font-semibold mt-1">{value}</div>
//       <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
//     </div>
//   );
// }

// // function CampaignCard({
// //   campaign,
// //   onContribute,
// // }: {
// //   campaign: Campaign;
// //   onContribute: () => void;
// // }) {
// //   const percent = Math.min(
// //     100,
// //     Math.round((campaign.collectedAmount / campaign.goalAmount) * 100)
// //   );

// //   return (
// //     <article className="border rounded-lg p-4 bg-white shadow-sm">
// //       <div className="flex items-start justify-between">
// //         <div>
// //           <h3 className="text-lg font-semibold">{campaign.name}</h3>
// //           <div className="text-sm text-gray-500">
// //             {campaign.category} • {campaign.isActive ? "Active" : "Inactive"}
// //           </div>
// //         </div>
// //         <div className="text-right">
// //           <div className="text-sm text-gray-500">Raised</div>
// //           <div className="font-semibold">{currencyINR(campaign.collectedAmount)}</div>
// //         </div>
// //       </div>

// //       <p className="text-sm text-gray-600 mt-3">{campaign.description}</p>

// //       <div className="mt-3">
// //         <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
// //           <div
// //             className="h-2 rounded bg-green-500"
// //             style={{ width: `${percent}%` }}
// //           />
// //         </div>
// //         <div className="flex justify-between text-xs text-gray-500 mt-2">
// //           <span>{percent}% funded</span>
// //           <span>Goal: {currencyINR(campaign.goal)}</span>
// //         </div>
// //       </div>

// //       <div className="mt-4 flex gap-3">
// //         <button
// //           onClick={onContribute}
// //           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //         >
// //           Contribute Now
// //         </button>
// //         <button
// //           className="px-4 py-2 border rounded text-gray-700"
// //           onClick={() =>
// //             alert(`Campaign details page not implemented in demo.`)
// //           }
// //         >
// //           View Details
// //         </button>
// //       </div>
// //     </article>
// //   );
// // }

// function DonationForm({
//   campaigns,
//   preselectedCampaignId,
//   onSubmit,
// }: {
//   campaigns: Campaign[];
//   preselectedCampaignId: string | null;
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }) {
//   return (
//     <form
//       onSubmit={onSubmit}
//       className="bg-white p-6 rounded-lg border shadow-sm max-w-xl"
//     >
//       <div className="grid gap-3">
//         <label className="text-sm">
//           <div className="text-xs text-gray-600">Name</div>
//           <input
//             name="donorName"
//             required
//             className="mt-1 block w-full rounded border px-3 py-2"
//             placeholder="Your full name"
//           />
//         </label>

//         <label className="text-sm">
//           <div className="text-xs text-gray-600">Email</div>
//           <input
//             name="donorEmail"
//             type="email"
//             required
//             className="mt-1 block w-full rounded border px-3 py-2"
//             placeholder="you@institute.edu"
//           />
//         </label>

//         <label className="text-sm">
//           <div className="text-xs text-gray-600">Amount (₹)</div>
//           <input
//             name="amount"
//             type="number"
//             required
//             min={1}
//             className="mt-1 block w-full rounded border px-3 py-2"
//             placeholder="1000"
//           />
//         </label>

//         <label className="text-sm">
//           <div className="text-xs text-gray-600">Select Campaign</div>
//           <select
//             name="campaignId"
//             defaultValue={preselectedCampaignId || "null"}
//             className="mt-1 block w-full rounded border px-3 py-2"
//           >
//             <option value="null">General Fund / No specific campaign</option>
//             {campaigns.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.title} {c.active ? "(Active)" : "(Inactive)"}
//               </option>
//             ))}
//           </select>
//         </label>

//         <div className="flex gap-3 items-center">
//           <button
//             type="submit"
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Donate
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               // simple quick fill for demo
//               const form = document.querySelector("form");
//               if (form) {
//                 (
//                   form.querySelector('[name="donorName"]') as HTMLInputElement
//                 ).value = "Demo Donor";
//                 (
//                   form.querySelector('[name="donorEmail"]') as HTMLInputElement
//                 ).value = "demo@donor.com";
//                 (
//                   form.querySelector('[name="amount"]') as HTMLInputElement
//                 ).value = "1000";
//               }
//             }}
//             className="px-3 py-2 border rounded"
//           >
//             Quick Fill
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }




// src/app/fundraising/page.tsx
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/store";
// import { fetchCampaigns } from "@/slices/campaignSlice";
// import FundraisingCard from "@/components/FundraisingCard";
// import { Campaign } from "@/types";

// /* -----------------------------
//    Local Donation type (demo)
// ------------------------------*/
// type Donation = {
//   id: string;
//   donorName: string;
//   donorEmail: string;
//   amount: number;
//   date: string;
//   campaignId?: string | null;
// };

// function daysAgoISO(days: number) {
//   const d = new Date();
//   d.setDate(d.getDate() - days);
//   return d.toISOString();
// }

// const currencyINR = (n: number) =>
//   n >= 0
//     ? new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//       }).format(n)
//     : "₹0";

// /* -----------------------------
//    Page
// ------------------------------*/
// export default function FundraisingPage() {
//   const dispatch = useDispatch<AppDispatch>();

//   // select the whole campaigns slice
//   const campaignSlice = useSelector((state: RootState) => state.campaigns);

//   // Ensure typed array for TypeScript
//   const campaigns: Campaign[] = (campaignSlice?.items as Campaign[]) ?? [];
//   const status = campaignSlice?.status ?? "idle";
//   const error = campaignSlice?.error ?? null;

//   // local demo donations (you can move to Redux later)
//   const [donations, setDonations] = useState<Donation[]>([
//     {
//       id: "d1",
//       donorName: "John Doe",
//       donorEmail: "john@example.com",
//       amount: 5000,
//       date: daysAgoISO(3),
//       campaignId: campaigns[0]?.id ?? "1",
//     },
//     {
//       id: "d2",
//       donorName: "Priya Sharma",
//       donorEmail: "priya@example.com",
//       amount: 3000,
//       date: daysAgoISO(10),
//       campaignId: campaigns[1]?.id ?? "2",
//     },
//   ]);

//   const [activeTab, setActiveTab] = useState<
//     "donation" | "campaigns" | "donors"
//   >("campaigns");
//   const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
//     null
//   );

//   // Controls whether the right column is in "shrunk" mode
//   const [isShrunk, setIsShrunk] = useState(false);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCampaigns());
//     }
//   }, [status, dispatch]);

//   // scroll listener to toggle shrink state
//   useEffect(() => {
//     const onScroll = () => {
//       // adjust threshold as you like
//       setIsShrunk(window.scrollY > 140);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* -----------------------------
//      Derived stats (all typed)
//   ------------------------------*/
//   const totalRaisedActive = useMemo(() => {
//     const activeIds = new Set(campaigns.filter((c) => c.isActive).map((c) => c.id));
//     return donations.reduce(
//       (acc, d) =>
//         d.campaignId && activeIds.has(d.campaignId) ? acc + d.amount : acc,
//       0
//     );
//   }, [campaigns, donations]);

//   const uniqueDonorsCount = useMemo(() => {
//     const set = new Set(donations.map((d) => d.donorEmail.toLowerCase()));
//     return set.size;
//   }, [donations]);

//   const averageDonation = useMemo(() => {
//     if (donations.length === 0) return 0;
//     return Math.round(donations.reduce((s, d) => s + d.amount, 0) / donations.length);
//   }, [donations]);

//   const lastWeekRaised = useMemo(() => {
//     const weekAgo = new Date();
//     weekAgo.setDate(weekAgo.getDate() - 7);
//     return donations.reduce((acc, d) => (new Date(d.date) >= weekAgo ? acc + d.amount : acc), 0);
//   }, [donations]);

//   const topDonors = useMemo(() => {
//     const map = new Map<string, { name: string; email: string; total: number }>();
//     for (const d of donations) {
//       const key = d.donorEmail.toLowerCase();
//       const prev = map.get(key);
//       if (prev) prev.total += d.amount;
//       else map.set(key, { name: d.donorName, email: d.donorEmail, total: d.amount });
//     }
//     return Array.from(map.values()).sort((a, b) => b.total - a.total);
//   }, [donations]);

//   /* -----------------------------
//      Donate handler (local demo)
//   ------------------------------*/
//   function handleDonate(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const donorName = String(fd.get("donorName") || "").trim();
//     const donorEmail = String(fd.get("donorEmail") || "").trim();
//     const amount = Number(fd.get("amount") || 0);
//     const campaignId = String(fd.get("campaignId") || "") || null;

//     if (!donorName || !donorEmail || !amount || amount <= 0) {
//       alert("Please provide valid values");
//       return;
//     }

//     const newDonation: Donation = {
//       id: "d" + Math.random().toString(36).slice(2, 9),
//       donorName,
//       donorEmail,
//       amount,
//       date: new Date().toISOString(),
//       campaignId: campaignId === "null" ? null : campaignId,
//     };

//     setDonations((s) => [newDonation, ...s]);
//     (e.currentTarget as HTMLFormElement).reset();
//     setActiveTab("donors");
//   }

//   /* dynamic grid column width for the right column (shrinks on scroll) */
//   const rightColWidth = isShrunk ? 220 : 360; // px

//   /* -----------------------------
//      Render
//   ------------------------------*/
//   return (
//     <div className="min-h-screen bg-white text-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <header className="mb-6">
//           <h1 className="text-3xl font-extrabold">Alumni Giving</h1>
//           <p className="mt-1 text-gray-600">
//             Support your alma mater and help future generations succeed.
//           </p>
//         </header>

//         <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//           <StatCard
//             title="Total Raised (Active)"
//             value={currencyINR(totalRaisedActive)}
//             subtitle={`${
//               campaigns.filter((c) => c.isActive).length
//             } active campaigns`}
//           />
//           <StatCard
//             title="Total Donors"
//             value={uniqueDonorsCount.toString()}
//             subtitle="Unique donors"
//           />
//           <StatCard
//             title="Average Donation"
//             value={currencyINR(averageDonation)}
//             subtitle="Per contribution"
//           />
//           <StatCard
//             title="Raised (Last 7 days)"
//             value={currencyINR(lastWeekRaised)}
//             subtitle="Recent contributions"
//           />
//         </section>

//         <nav className="mt-2 border-b mb-6">
//           <ul className="flex gap-6">
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "donation"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("donation")}
//               >
//                 Make Donation
//               </button>
//             </li>
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "campaigns"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("campaigns")}
//               >
//                 Campaigns
//               </button>
//             </li>
//             <li>
//               <button
//                 className={`pb-3 px-1 font-medium ${
//                   activeTab === "donors"
//                     ? "border-b-2 border-red-600 text-red-600"
//                     : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("donors")}
//               >
//                 Top Donors
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* main layout: left = cards, right = sticky small action panel */}
//         <main
//           className="grid grid-cols-1 gap-8"
//           // set responsive columns: single column on small screens, dynamic two-column on lg
//           style={
//             {
//               // TS: inline style for CSS grid template columns on large screens
//               // We'll let CSS handle small screens; for >=1024px we'll set the columns
//               // But since inline style is global, we'll set it conditionally via media query in classless way:
//             } as React.CSSProperties
//           }
//         >
//           <div
//             className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-8"
//             style={{ gridTemplateColumns: `1fr ${rightColWidth}px` }}
//           >
//             {/* Left column */}
//             <div>
//               {activeTab === "donation" && (
//                 <section className="mb-6">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Make a Donation
//                   </h2>
//                   <form
//                     onSubmit={handleDonate}
//                     className="bg-white p-6 rounded-lg border shadow-sm max-w-xl"
//                   >
//                     <div className="grid gap-3">
//                       <label className="text-sm">
//                         <div className="text-xs text-gray-600">Name</div>
//                         <input
//                           name="donorName"
//                           required
//                           className="mt-1 block w-full rounded border px-3 py-2"
//                           placeholder="Your full name"
//                         />
//                       </label>

//                       <label className="text-sm">
//                         <div className="text-xs text-gray-600">Email</div>
//                         <input
//                           name="donorEmail"
//                           type="email"
//                           required
//                           className="mt-1 block w-full rounded border px-3 py-2"
//                           placeholder="you@institute.edu"
//                         />
//                       </label>

//                       <label className="text-sm">
//                         <div className="text-xs text-gray-600">Amount (₹)</div>
//                         <input
//                           name="amount"
//                           type="number"
//                           required
//                           min={1}
//                           className="mt-1 block w-full rounded border px-3 py-2"
//                           placeholder="1000"
//                         />
//                       </label>

//                       <label className="text-sm">
//                         <div className="text-xs text-gray-600">
//                           Select Campaign
//                         </div>
//                         <select
//                           name="campaignId"
//                           defaultValue={"null"}
//                           className="mt-1 block w-full rounded border px-3 py-2"
//                         >
//                           <option value="null">
//                             General Fund / No specific campaign
//                           </option>
//                           {campaigns.map((c) => (
//                             <option key={c.id} value={c.id}>
//                               {c.name} {c.isActive ? "(Active)" : "(Inactive)"}
//                             </option>
//                           ))}
//                         </select>
//                       </label>

//                       <div className="flex gap-3 items-center">
//                         <button
//                           type="submit"
//                           className="bg-red-600 text-white px-4 py-2 rounded"
//                         >
//                           Donate
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </section>
//               )}

//               {activeTab === "campaigns" && (
//                 <section>
//                   <h2 className="text-xl font-semibold mb-4">Campaigns</h2>
//                   {/* {status === "loading" && <p>Loading campaigns…</p>} */}
//                   {status === "loading" && (
//                     <div
//                       className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//                       aria-busy="true"
//                       aria-live="polite"
//                     >
//                       {Array.from({ length: 6 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="animate-pulse bg-white rounded-3xl shadow-sm overflow-hidden p-0"
//                           role="status"
//                           aria-hidden="false"
//                         >
//                           {/* image placeholder */}
//                           <div className="h-44 bg-gray-500/80 w-full object-cover" />

//                           <div className="p-4 space-y-3">
//                             {/* title */}
//                             <div className="h-4 bg-gray-400 rounded w-3/4" />

//                             {/* description lines */}
//                             <div className="h-3 bg-gray-300 rounded w-full" />
//                             <div className="h-3 bg-gray-200 rounded w-5/6" />

//                             {/* progress + amounts row */}
//                             <div className="mt-2">
//                               <div className="h-2 bg-gray-300 rounded w-full" />
//                               <div className="flex justify-between items-center mt-2">
//                                 <div className="h-3 bg-gray-300 rounded w-1/4" />
//                                 <div className="h-3 bg-gray-300 rounded w-1/6" />
//                               </div>
//                             </div>
//                           </div>

//                           {/* CTA placeholder */}
//                           <div className="p-4">
//                             <div className="h-10 bg-gray-200 rounded w-full" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {status === "failed" && (
//                     <p className="text-red-500">{String(error)}</p>
//                   )}
//                   {status === "succeeded" && (
//                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                       {campaigns.map((c) => (
//                         <FundraisingCard
//                           key={c.id}
//                           campaign={c}
//                           onContribute={() => {
//                             setSelectedCampaignId(c.id);
//                             setActiveTab("donation");
//                             // optional: scroll to donate form
//                             window.scrollTo({ top: 0, behavior: "smooth" });
//                           }}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </section>
//               )}

//               {activeTab === "donors" && (
//                 <section>
//                   <h2 className="text-xl font-semibold mb-4">Top Donors</h2>
//                   <ul className="divide-y border rounded">
//                     {topDonors.length === 0 ? (
//                       <li className="p-4 text-gray-500">No donors yet.</li>
//                     ) : (
//                       topDonors.map((d, i) => (
//                         <li key={d.email} className="p-3 flex justify-between">
//                           <span className="font-medium">{d.name}</span>
//                           <span className="text-sm text-gray-400">
//                             #{i + 1}
//                           </span>
//                         </li>
//                       ))
//                     )}
//                   </ul>
//                 </section>
//               )}
//             </div>

//             {/* Right column: sticky small action panel (floating) */}
//             <aside className="hidden lg:block">
//               <div
//                 className={`sticky top-24 flex flex-col gap-4 transform transition-all duration-300`}
//                 style={{ width: rightColWidth }}
//               >
//                 {/* Compact action card */}
//                 <div
//                   className={`bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-3 items-stretch transition-all duration-300 ${
//                     isShrunk ? "text-sm p-3" : "text-base p-4"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-sm text-gray-500">Quick Actions</div>
//                       <div className="font-semibold">Support a Campaign</div>
//                     </div>
//                     <div
//                       className={`text-xs font-medium px-2 py-1 rounded-md ${
//                         isShrunk ? "bg-gray-100" : "bg-gray-200"
//                       }`}
//                     >
//                       {isShrunk ? "Compact" : "Panel"}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setActiveTab("donation")}
//                     className={`w-full ${
//                       isShrunk ? "py-2 text-sm" : "py-3"
//                     } bg-red-600 text-white rounded-lg font-semibold`}
//                   >
//                     Make Donation
//                   </button>

//                   <button
//                     onClick={() => setActiveTab("campaigns")}
//                     className={`w-full border ${
//                       isShrunk ? "py-2 text-sm" : "py-3"
//                     } rounded-lg`}
//                   >
//                     View Campaigns
//                   </button>

//                   {/* small extra hint */}
//                   <div className="text-xs text-gray-400 mt-1">
//                     Panel stays visible while you scroll — cards expand to use
//                     page space.
//                   </div>
//                 </div>

//                 {/* Optionally another tiny widget (e.g., promotion) */}
//                 <div
//                   className={`bg-white border rounded-xl shadow-sm p-3 transition-all duration-300 ${
//                     isShrunk ? "text-xs" : "text-sm"
//                   }`}
//                 >
//                   <div className="font-semibold">Featured</div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     Check out campaigns with high impact — tap a card to
//                     contribute.
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* Small subcomponent */
// function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
//   return (
//     <div className="bg-white border rounded-lg p-4 shadow-sm">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-2xl font-semibold mt-1">{value}</div>
//       <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchCampaigns } from "@/slices/campaignSlice";
import FundraisingCard from "@/components/FundraisingCard";
import { Campaign } from "@/types";

/* -----------------------------
   Local Donation type (demo)
------------------------------*/
type Donation = {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  date: string;
  campaignId?: string | null;
};

function daysAgoISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

const currencyINR = (n: number) =>
  n >= 0
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "₹0";

/* -----------------------------
   Page
------------------------------*/
export default function FundraisingPage() {
  const dispatch = useDispatch<AppDispatch>();

  // select the whole campaigns slice
  const campaignSlice = useSelector((state: RootState) => state.campaigns);

  // Ensure typed array for TypeScript
  const campaigns: Campaign[] = (campaignSlice?.items as Campaign[]) ?? [];
  const status = campaignSlice?.status ?? "idle";
  const error = campaignSlice?.error ?? null;

  // local demo donations (you can move to Redux later)
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "d1",
      donorName: "John Doe",
      donorEmail: "john@example.com",
      amount: 5000,
      date: daysAgoISO(3),
      campaignId: campaigns[0]?.id ?? "1",
    },
    {
      id: "d2",
      donorName: "Priya Sharma",
      donorEmail: "priya@example.com",
      amount: 3000,
      date: daysAgoISO(10),
      campaignId: campaigns[1]?.id ?? "2",
    },
  ]);

  const [activeTab, setActiveTab] = useState<
    "donation" | "campaigns" | "donors"
  >("campaigns");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );

  // Controls whether the right column is in "shrunk" mode (also used to trigger glow)
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampaigns());
    }
  }, [status, dispatch]);

  // scroll listener to toggle shrink state
  useEffect(() => {
    const onScroll = () => {
      setIsShrunk(window.scrollY > 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -----------------------------
     Derived stats (all typed)
  ------------------------------*/
  const totalRaisedActive = useMemo(() => {
    const activeIds = new Set(
      campaigns.filter((c) => c.isActive).map((c) => c.id)
    );
    return donations.reduce(
      (acc, d) =>
        d.campaignId && activeIds.has(d.campaignId) ? acc + d.amount : acc,
      0
    );
  }, [campaigns, donations]);

  const uniqueDonorsCount = useMemo(() => {
    const set = new Set(donations.map((d) => d.donorEmail.toLowerCase()));
    return set.size;
  }, [donations]);

  const averageDonation = useMemo(() => {
    if (donations.length === 0) return 0;
    return Math.round(
      donations.reduce((s, d) => s + d.amount, 0) / donations.length
    );
  }, [donations]);

  const lastWeekRaised = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return donations.reduce(
      (acc, d) => (new Date(d.date) >= weekAgo ? acc + d.amount : acc),
      0
    );
  }, [donations]);

  const topDonors = useMemo(() => {
    const map = new Map<
      string,
      { name: string; email: string; total: number }
    >();
    for (const d of donations) {
      const key = d.donorEmail.toLowerCase();
      const prev = map.get(key);
      if (prev) prev.total += d.amount;
      else
        map.set(key, {
          name: d.donorName,
          email: d.donorEmail,
          total: d.amount,
        });
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [donations]);

  /* -----------------------------
     Donate handler (local demo)
  ------------------------------*/
  function handleDonate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const donorName = String(fd.get("donorName") || "").trim();
    const donorEmail = String(fd.get("donorEmail") || "").trim();
    const amount = Number(fd.get("amount") || 0);
    const campaignId = String(fd.get("campaignId") || "") || null;

    if (!donorName || !donorEmail || !amount || amount <= 0) {
      alert("Please provide valid values");
      return;
    }

    const newDonation: Donation = {
      id: "d" + Math.random().toString(36).slice(2, 9),
      donorName,
      donorEmail,
      amount,
      date: new Date().toISOString(),
      campaignId: campaignId === "null" ? null : campaignId,
    };

    setDonations((s) => [newDonation, ...s]);
    (e.currentTarget as HTMLFormElement).reset();
    setActiveTab("donors");
  }

  /* dynamic grid column width for the right column (shrinks on scroll) */
  const rightColWidth = isShrunk ? 220 : 360; // px

  /* helper classes for glow effect */
  const glowBtnBase =
    "w-full rounded-lg font-semibold transition-all duration-50 transform";
  const makeDonationClass = isShrunk
    ? `${glowBtnBase} bg-gradient-to-r px-4 py-2 from-red-600 to-purple-600 text-white shadow-lg ring-4 ring-indigo-400/25 animate-pulse scale-[1.02]`
    : `${glowBtnBase}  px-4 py-2 bg-red-600 text-white hover:bg-red-700`;

  const viewCampaignClass = isShrunk
    ? `${glowBtnBase} bg-gradient-to-r px-4 py-2 from-green-700 to-teal-500 text-white shadow-lg ring-4 ring-emerald-300/25 animate-pulse scale-[1.02]`
    : `${glowBtnBase}  px-4 py-2 border bg-white hover:bg-gray-50`;

  /* -----------------------------
     Render
  ------------------------------*/
  return (
    <div className="min-h-screen bg-white text-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Alumni Giving</h1>
          <p className="mt-1 text-gray-600">
            Support your alma mater and help future generations succeed.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Raised (Active)"
            value={currencyINR(totalRaisedActive)}
            subtitle={`${
              campaigns.filter((c) => c.isActive).length
            } active campaigns`}
          />
          <StatCard
            title="Total Donors"
            value={uniqueDonorsCount.toString()}
            subtitle="Unique donors"
          />
          <StatCard
            title="Average Donation"
            value={currencyINR(averageDonation)}
            subtitle="Per contribution"
          />
          <StatCard
            title="Raised (Last 7 days)"
            value={currencyINR(lastWeekRaised)}
            subtitle="Recent contributions"
          />
        </section>

        <nav className="mt-2 border-b mb-6">
          <ul className="flex gap-6">
            <li>
              <button
                className={`pb-3 px-1 font-medium ${
                  activeTab === "donation"
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("donation")}
              >
                Make Donation
              </button>
            </li>
            <li>
              <button
                className={`pb-3 px-1 font-medium ${
                  activeTab === "campaigns"
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("campaigns")}
              >
                Campaigns
              </button>
            </li>
            <li>
              <button
                className={`pb-3 px-1 font-medium ${
                  activeTab === "donors"
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("donors")}
              >
                Top Donors
              </button>
            </li>
          </ul>
        </nav>

        {/* main layout: left = cards, right = sticky small action panel */}
        <main className="grid grid-cols-1 gap-8">
          <div
            className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-8"
            style={{ gridTemplateColumns: `1fr ${rightColWidth}px` }}
          >
            {/* Left column */}
            <div>
              {activeTab === "donation" && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Make a Donation
                  </h2>
                  <form
                    onSubmit={handleDonate}
                    className="bg-white p-6 rounded-lg border shadow-sm max-w-xl"
                  >
                    <div className="grid gap-3">
                      <label className="text-sm">
                        <div className="text-xs text-gray-600">Name</div>
                        <input
                          name="donorName"
                          required
                          className="mt-1 block w-full rounded border px-3 py-2"
                          placeholder="Your full name"
                        />
                      </label>

                      <label className="text-sm">
                        <div className="text-xs text-gray-600">Email</div>
                        <input
                          name="donorEmail"
                          type="email"
                          required
                          className="mt-1 block w-full rounded border px-3 py-2"
                          placeholder="you@institute.edu"
                        />
                      </label>

                      <label className="text-sm">
                        <div className="text-xs text-gray-600">Amount (₹)</div>
                        <input
                          name="amount"
                          type="number"
                          required
                          min={1}
                          className="mt-1 block w-full rounded border px-3 py-2"
                          placeholder="1000"
                        />
                      </label>

                      <label className="text-sm">
                        <div className="text-xs text-gray-600">
                          Select Campaign
                        </div>
                        <select
                          name="campaignId"
                          defaultValue={"null"}
                          className="mt-1 block w-full rounded border px-3 py-2"
                        >
                          <option value="null">
                            General Fund / No specific campaign
                          </option>
                          {campaigns.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} {c.isActive ? "(Active)" : "(Inactive)"}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="flex gap-3 items-center">
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Donate
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              )}

              {activeTab === "campaigns" && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Campaigns</h2>

                  {status === "loading" && (
                    <div
                      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                      aria-busy="true"
                      aria-live="polite"
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse bg-white rounded-3xl shadow-sm overflow-hidden p-0"
                          role="status"
                          aria-hidden="false"
                        >
                          <div className="h-44 bg-gray-500/80 w-full object-cover" />
                          <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-400 rounded w-3/4" />
                            <div className="h-3 bg-gray-300 rounded w-full" />
                            <div className="h-3 bg-gray-200 rounded w-5/6" />
                            <div className="mt-2">
                              <div className="h-2 bg-gray-300 rounded w-full" />
                              <div className="flex justify-between items-center mt-2">
                                <div className="h-3 bg-gray-300 rounded w-1/4" />
                                <div className="h-3 bg-gray-300 rounded w-1/6" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="h-10 bg-gray-200 rounded w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {status === "failed" && (
                    <p className="text-red-500">{String(error)}</p>
                  )}

                  {status === "succeeded" && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {campaigns.map((c) => (
                        <FundraisingCard
                          key={c.id}
                          campaign={c}
                          onContribute={() => {
                            setSelectedCampaignId(c.id);
                            setActiveTab("donation");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {activeTab === "donors" && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Top Donors</h2>
                  <ul className="divide-y border rounded">
                    {topDonors.length === 0 ? (
                      <li className="p-4 text-gray-500">No donors yet.</li>
                    ) : (
                      topDonors.map((d, i) => (
                        <li key={d.email} className="p-3 flex justify-between">
                          <span className="font-medium">{d.name}</span>
                          <span className="text-sm text-gray-400">
                            #{i + 1}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </section>
              )}
            </div>

            {/* Right column: sticky small action panel (floating) */}
            <aside className="hidden lg:block">
              <div
                className={`sticky mt-10 top-24 flex flex-col gap-4 transition-all duration-300`}
                style={{ width: rightColWidth }}
              >
                {/* Compact action card */}
                <div
                  className={`bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-3 items-stretch transition-all duration-300 ${
                    isShrunk ? "text-sm p-3" : "text-base p-4"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Quick Actions</div>
                      <div className="font-semibold">Support a Campaign</div>
                    </div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-md ${
                        isShrunk ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    >
                      {isShrunk ? "Compact" : "Panel"}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("donation")}
                    className={makeDonationClass}
                    aria-pressed={activeTab === "donation"}
                  >
                    Make Donation
                  </button>

                  <button
                    onClick={() => setActiveTab("campaigns")}
                    className={viewCampaignClass}
                    aria-pressed={activeTab === "campaigns"}
                  >
                    View Campaigns
                  </button>

                  <div className="text-xs text-gray-400 mt-1">
                    Panel stays visible while you scroll — cards expand to use
                    page space.
                  </div>
                </div>

                {/* small featured widget */}
                <div
                  className={`bg-white border rounded-xl shadow-sm p-3 transition-all duration-300 ${
                    isShrunk ? "text-xs" : "text-sm"
                  }`}
                >
                  <div className="font-semibold">Featured</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Check out campaigns with high impact — tap a card to
                    contribute.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Small subcomponent */
function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
    </div>
  );
}
