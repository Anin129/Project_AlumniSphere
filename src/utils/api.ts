export function getUserId(): string {
  if (typeof window === "undefined") return "anonymous";
  const existing = localStorage.getItem("user_id");
  if (existing) return existing;
  const id = `user_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("user_id", id);
  return id;
}

async function request(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("x-user-id", getUserId());
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");
  const res = await fetch(path, { ...init, headers, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  listEvents: () => request("/api/events"),
  createEvent: (body: any) => request("/api/events", { method: "POST", body: JSON.stringify(body) }),
  getEvent: (id: string) => request(`/api/events/${id}`),
  updateEvent: (id: string, body: any) => request(`/api/events/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  rsvp: (id: string) => request(`/api/events/${id}/rsvp`, { method: "POST" }),
  unrsvp: (id: string) => request(`/api/events/${id}/rsvp`, { method: "DELETE" }),
  myRegistrations: () => request("/api/users/me/registrations"),
}; 