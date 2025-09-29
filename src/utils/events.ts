import { Event } from "@/types/events";

export type EventStatus = "upcoming" | "live" | "ended";

export function getEventStatus(event: Event, now: Date = new Date()): EventStatus {
  const start = new Date(event.dateTime.start).getTime();
  const end = new Date(event.dateTime.end ?? event.dateTime.start).getTime();
  const current = now.getTime();
  if (current < start) return "upcoming";
  if (current > end) return "ended";
  return "live";
}

export function isJoinEnabled(event: Event, now: Date = new Date(), leadMinutes = 10): boolean {
  const start = new Date(event.dateTime.start).getTime();
  const end = new Date(event.dateTime.end ?? event.dateTime.start).getTime();
  const current = now.getTime();
  const lead = leadMinutes * 60 * 1000;
  return current >= start - lead && current <= end + 5 * 60 * 1000;
}

export function toICSTimestamp(dateIso: string): string {
  const d = new Date(dateIso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export function generateGoogleCalendarUrl(event: Event): string {
  const base = "https://www.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description ?? "",
    location: event.location.virtualLink,
    dates: `${toICSTimestamp(event.dateTime.start)}/${toICSTimestamp(event.dateTime.end ?? event.dateTime.start)}`,
  });
  return `${base}?${params.toString()}`;
}

export function generateICS(event: Event): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AlumniSphere//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@alumnisphere`,
    `DTSTAMP:${toICSTimestamp(new Date().toISOString())}`,
    `DTSTART:${toICSTimestamp(event.dateTime.start)}`,
    `DTEND:${toICSTimestamp(event.dateTime.end ?? event.dateTime.start)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description ?? "")}`,
    `LOCATION:${escapeICS(event.location.virtualLink)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// Simple local RSVP store (can be swapped with backend later)
const STORAGE_KEY = "alumni_rsvps"; // stores string[] of event ids

export function loadRSVPs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveRSVPs(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function toggleRSVP(eventId: string): string[] {
  const ids = new Set(loadRSVPs());
  if (ids.has(eventId)) ids.delete(eventId);
  else ids.add(eventId);
  const arr = Array.from(ids);
  saveRSVPs(arr);
  return arr;
} 