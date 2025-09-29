import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb();
  const collection = db.collection("events");
  const item = await collection.findOne({ id: params.id }, { projection: { _id: 0 } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const db = await getDb();
  const collection = db.collection("events");
  body.updatedAt = new Date().toISOString();
  const res = await collection.updateOne({ id: params.id }, { $set: body });
  if (res.matchedCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await collection.findOne({ id: params.id }, { projection: { _id: 0 } });
  return NextResponse.json({ item: updated });
} 