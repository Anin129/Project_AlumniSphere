import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Missing x-user-id header" }, { status: 400 });

  const db = await getDb();
  const regs = db.collection("registrations");
  const events = db.collection("events");

  const registrations = await regs.find({ userId }).toArray();
  const ids = registrations.map((r) => r.eventId);
  const items = await events.find({ id: { $in: ids } }, { projection: { _id: 0 } }).toArray();

  return NextResponse.json({ items });
} 