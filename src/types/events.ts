export type EventType = "alumni" | "admin";

export type EventVisibility = "public" | "alumni-only" | "invite-only";

export type EventCategory =
  | "Networking"
  | "Workshop"
  | "Social"
  | "Mentorship"
  | "Recruitment"
  | "Academic"
  | "Other";

export type EventLocationType = "virtual"; // Online-only

export interface EventOrganizer {
  name: string;
  email: string;
  avatar?: string;
  graduationYear?: string;
  currentRole?: string;
  isAdmin: boolean;
}

export interface EventDateTime {
  start: string; // ISO
  end?: string; // ISO
  timezone?: string;
}

export interface EventLocation {
  type: EventLocationType; // always virtual
  virtualLink: string;
}

export interface EventCapacity {
  max?: number; // undefined => unlimited
  registered: number;
  waitlist?: number;
}

export interface EventPricing {
  type: "free" | "paid" | "donation";
  amount?: number;
  currency?: string; // default INR
}

export interface AlumniEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  type: "alumni";
  organizer: EventOrganizer;
  dateTime: EventDateTime;
  location: EventLocation; // virtual only
  capacity: EventCapacity;
  pricing: EventPricing;
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  status: "draft" | "published" | "cancelled" | "completed";
  visibility: EventVisibility;
  registrationDeadline?: string; // ISO
  imageUrl?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface AdminEvent extends Omit<AlumniEvent, "type"> {
  type: "admin";
}

export type Event = AlumniEvent | AdminEvent; 