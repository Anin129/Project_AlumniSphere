"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { Event } from "@/types/events";

export default function MyRegistrationsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .myRegistrations()
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

  if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-gray-600">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Registrations</h1>
        <p className="text-gray-600">Events you've RSVP'd to</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="mb-2">You haven't registered for any events yet.</p>
          <Link className="text-blue-600 hover:underline" href="/events">
            Browse online events
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{e.title}</div>
                <div className="text-sm text-gray-600 line-clamp-1">{e.description}</div>
              </div>
              <Link href={`/events`} className="text-blue-600 hover:underline text-sm">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 