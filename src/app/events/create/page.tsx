"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Event, EventCategory } from "@/types/events";
import EventCard from "@/components/EventCard";
import { Calendar, ArrowLeft, Link as LinkIcon, Sparkles } from "lucide-react";

const presets: Array<{
  title: string;
  description: string;
  category: EventCategory;
  durationMins: number;
}> = [
  {
    title: "Speed Networking (Online)",
    description: "Rapid-fire introductions in breakout rooms to expand your network.",
    category: "Networking",
    durationMins: 60,
  },
  {
    title: "Mentorship Circles",
    description: "Small-group mentorship with experienced alumni across domains.",
    category: "Mentorship",
    durationMins: 90,
  },
  {
    title: "Tech Deep Dive: AI in Production",
    description: "Real-world architectures, MLOps, and case studies from alumni.",
    category: "Academic",
    durationMins: 75,
  },
  {
    title: "Women-in-Leadership Roundtable",
    description: "Stories, challenges, and strategies to lead and thrive.",
    category: "Social",
    durationMins: 60,
  },
  {
    title: "Startup Pitch Night",
    description: "Founders pitch to alumni investors and get live feedback.",
    category: "Recruitment",
    durationMins: 90,
  },
  {
    title: "Wellbeing Session: Mindfulness @ Work",
    description: "Guided practices and tools to manage stress and burnout.",
    category: "Social",
    durationMins: 45,
  },
];

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<EventCategory>("Networking");
  const [type, setType] = useState<"alumni" | "admin">("alumni");
  const [virtualLink, setVirtualLink] = useState("");
  const [start, setStart] = useState<string>(new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 16));
  const [end, setEnd] = useState<string>("");
  const [max, setMax] = useState<number | "">(1000);
  const [pricingType, setPricingType] = useState<"free" | "paid" | "donation">("free");
  const [amount, setAmount] = useState<number | "">("");

  const applyPreset = (p: typeof presets[number]) => {
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    const startDt = new Date();
    startDt.setDate(startDt.getDate() + 3);
    const endDt = new Date(startDt);
    endDt.setMinutes(endDt.getMinutes() + p.durationMins);
    setStart(startDt.toISOString().slice(0, 16));
    setEnd(endDt.toISOString().slice(0, 16));
  };

  const eventPreview: Event = useMemo(() => ({
    id: "preview",
    title,
    description,
    category,
    type,
    organizer: {
      name: type === "admin" ? "Alumni Affairs Office" : "You",
      email: "you@example.com",
      isAdmin: type === "admin",
    },
    dateTime: {
      start: start ? new Date(start).toISOString() : new Date().toISOString(),
      end: end ? new Date(end).toISOString() : undefined,
    },
    location: {
      type: "virtual",
      virtualLink: virtualLink || "https://meet.example.com/your-event",
    },
    capacity: { max: typeof max === "number" ? max : undefined, registered: 0 },
    pricing: {
      type: pricingType,
      amount: pricingType === "paid" ? (typeof amount === "number" ? amount : 0) : undefined,
      currency: pricingType === "paid" ? "INR" : undefined,
    },
    status: "draft",
    visibility: "alumni-only",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }), [title, description, category, type, virtualLink, start, end, max, pricingType, amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!virtualLink) {
      alert("Please provide a meeting link.");
      return;
    }
    alert("Online event submitted. Hook this up to your API.");
    router.push("/events");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => router.back()} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Online Event</h1>
      <p className="text-gray-600 mb-6">Pick a preset or start from scratch. Live preview updates on the right.</p>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm">
              <Sparkles className="w-4 h-4 mr-2 text-amber-600" /> Quick presets
            </div>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  type="button"
                  key={p.title}
                  onClick={() => applyPreset(p)}
                  className="text-left text-xs bg-gray-50 hover:bg-gray-100 border rounded-lg px-3 py-2"
                >
                  <div className="font-medium text-gray-900 line-clamp-1">{p.title}</div>
                  <div className="text-gray-600 line-clamp-2">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Event title" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Brief description" rows={3} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as EventCategory)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>Networking</option>
                <option>Workshop</option>
                <option>Social</option>
                <option>Mentorship</option>
                <option>Recruitment</option>
                <option>Academic</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
              <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
              <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
            <div className="flex items-center bg-gray-50 border rounded-lg px-3 py-2">
              <LinkIcon className="w-4 h-4 text-gray-500 mr-2" />
              <input value={virtualLink} onChange={(e) => setVirtualLink(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" placeholder="https://..." required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
              <input type="number" value={max} onChange={(e) => setMax(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Unlimited" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
              <select value={pricingType} onChange={(e) => setPricingType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="donation">Donation</option>
              </select>
            </div>
          </div>

          {pricingType === "paid" && (
            <div>
              <label className="block text sm font-medium text-gray-700 mb-1">Amount (INR)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="200" />
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Submit Online Event
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" /> Live Preview
          </div>
          <EventCard event={eventPreview} onRSVP={() => {}} onShare={() => {}} />
        </div>
      </div>
    </div>
  );
} 