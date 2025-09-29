"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Share2,
  Bookmark,
  Building2,
  Video,
  Ticket,
  User as UserIcon,
  Heart,
  Link as LinkIcon,
  ExternalLink,
  CalendarPlus,
} from "lucide-react";
import { Event } from "@/types/events";
import {
  getEventStatus,
  isJoinEnabled,
  loadRSVPs,
  toggleRSVP,
  generateGoogleCalendarUrl,
  generateICS,
} from "@/utils/events";

type Props = {
  event: Event;
  onRSVP?: (eventId: string, registered: boolean) => void;
  onShare?: (eventId: string) => void;
};

export default function EventCard({ event, onRSVP, onShare }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setIsRegistered(loadRSVPs().includes(event.id));
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, [event.id]);

  const status = getEventStatus(event, now);
  const joinEnabled = isJoinEnabled(event, now);
  const startDate = useMemo(() => new Date(event.dateTime.start), [event.dateTime.start]);
  const endDate = useMemo(() => (event.dateTime.end ? new Date(event.dateTime.end) : null), [event.dateTime.end]);

  const dateLabel = useMemo(() => {
    const date = startDate.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const time = startDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    if (endDate) {
      const endTime = endDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      return `${date}, ${time} - ${endTime}`;
    }
    return `${date}, ${time}`;
  }, [startDate, endDate]);

  const capacityLabel = useMemo(() => {
    const max = event.capacity.max;
    const reg = event.capacity.registered + (isRegistered ? 1 : 0);
    if (!max) return `${reg} registered`;
    const pct = Math.min(100, Math.round((reg / max) * 100));
    return `${reg}/${max} • ${pct}%`;
  }, [event.capacity, isRegistered]);

  const typeBadge = event.type === "admin" ? "bg-purple-600" : "bg-blue-600";
  const statusBadge =
    status === "live"
      ? "bg-green-600"
      : status === "upcoming"
      ? "bg-amber-600"
      : "bg-gray-600";

  const handleToggleRSVP = () => {
    const ids = toggleRSVP(event.id);
    const reg = ids.includes(event.id);
    setIsRegistered(reg);
    onRSVP?.(event.id, reg);
  };

  const handleDownloadICS = () => {
    const ics = generateICS(event);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative h-44 overflow-hidden">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${event.type === "admin" ? "from-purple-600 via-indigo-600 to-blue-600" : "from-blue-600 via-sky-600 to-indigo-600"} flex items-center justify-center`}>
              <Video className="w-16 h-16 text-white/80" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1.5 ${typeBadge} text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
                {event.type === "admin" ? "Admin Online Event" : "Alumni Online Event"}
              </div>
              <div className={`px-2 py-1 ${statusBadge} text-white text-[10px] font-semibold rounded-full shadow-lg backdrop-blur-sm uppercase`}>
                {status}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsBookmarked((s) => !s)}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isBookmarked ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => onShare?.(event.id)}
                className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg drop-shadow-sm line-clamp-1">{event.title}</h3>
            <p className="text-white/90 text-sm drop-shadow-sm line-clamp-1">{event.description}</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center text-gray-700 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>{dateLabel}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <LinkIcon className="w-4 h-4 mr-2 text-emerald-600" />
            <a href={event.location.virtualLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
              {event.location.virtualLink}
            </a>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-violet-600" />
              <span>{capacityLabel}</span>
            </div>
            <div className="flex items-center">
              <Ticket className="w-4 h-4 mr-2 text-teal-600" />
              <span>
                {event.pricing.type === "free"
                  ? "Free"
                  : event.pricing.type === "donation"
                  ? "Donation"
                  : `${event.pricing.currency ?? "INR"} ${event.pricing.amount ?? 0}`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center">
              {event.organizer.isAdmin ? <Building2 className="w-4 h-4 mr-2 text-purple-600" /> : <UserIcon className="w-4 h-4 mr-2 text-blue-600" />}
              <span className="truncate">
                {event.organizer.name}
                {event.organizer.currentRole ? ` • ${event.organizer.currentRole}` : ""}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={generateGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-md hover:bg-gray-100"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="w-4 h-4 text-gray-700" />
              </a>
              <button onClick={handleDownloadICS} className="px-2 py-1 rounded-md hover:bg-gray-100" title="Download .ics">
                <Calendar className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={handleToggleRSVP}
              className={`w-full ${isRegistered ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"} px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2`}
            >
              <Clock className="w-4 h-4" />
              <span>{isRegistered ? "Unregister" : "RSVP"}</span>
            </button>

            <a
              href={event.location.virtualLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full ${joinEnabled ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"} px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2`}
              onClick={(e) => {
                if (!joinEnabled) {
                  e.preventDefault();
                }
              }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Join Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 