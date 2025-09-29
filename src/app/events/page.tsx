"use client";

import React, { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import { Event, EventCategory } from "@/types/events";
import { Search, Filter, Calendar, Plus } from "lucide-react";
import { api } from "@/utils/api";

const categories: { label: string; value: EventCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Networking", value: "Networking" },
  { label: "Workshop", value: "Workshop" },
  { label: "Social", value: "Social" },
  { label: "Mentorship", value: "Mentorship" },
  { label: "Recruitment", value: "Recruitment" },
  { label: "Academic", value: "Academic" },
  { label: "Other", value: "Other" },
];

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "All">("All");
  const [selectedType, setSelectedType] = useState<"all" | "alumni" | "admin">("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .listEvents()
      .then((res) => {
        if (!mounted) return;
        setEvents(res.items as Event[]);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchQuery = `${e.title} ${e.description} ${e.organizer?.name ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchCategory = selectedCategory === "All" || e.category === selectedCategory;
      const matchType = selectedType === "all" || e.type === selectedType;
      return matchQuery && matchCategory && matchType;
    });
  }, [events, query, selectedCategory, selectedType]);

  const handleRSVPToggle = async (eventId: string, registered: boolean) => {
    try {
      if (registered) await api.rsvp(eventId);
      else await api.unrsvp(eventId);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                capacity: {
                  ...e.capacity,
                  registered: Math.max(0, (e.capacity.registered ?? 0) + (registered ? 1 : -1)),
                },
              }
            : e
        )
      );
    } catch (e) {
      // no-op; in real app show toast
    }
  };

  const handleShare = (eventId: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href + "#" + eventId);
    }
    alert("Event link copied!");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Events</h1>
        <p className="text-gray-600">Join virtual alumni and admin-hosted sessions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
          <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search online events..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <select
                className="bg-transparent text-sm outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
              >
                {categories.map((c) => (
                  <option key={c.label} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <select
                className="bg-transparent text-sm outline-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <a href="/events/create" className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Online Event
            </a>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading events…</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} onRSVP={handleRSVPToggle} onShare={handleShare} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-10">No online events found</div>
          )}
        </>
      )}
    </div>
  );
}
