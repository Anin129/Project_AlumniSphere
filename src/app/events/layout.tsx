import React from "react";
import Link from "next/link";

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Online Events</h1>
              <p className="text-white/80 text-sm">Join and host virtual events</p>
            </div>
            <Link href="/events/create" className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
              Create Online Event
            </Link>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
} 