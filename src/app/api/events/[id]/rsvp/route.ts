import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import connectDB from "@/dbConfig/dbConfig";
import { GamificationEvent, getAwardsForEvent } from "@/models/gamificationModel";
import Student from "@/models/studentModel";
import Alumni from "@/models/alumniModel";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Missing x-user-id header" }, { status: 400 });

  const db = await getDb();
  const events = db.collection("events");
  const regs = db.collection("registrations");

  const ev = await events.findOne({ id: params.id });
  if (!ev) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  const existing = await regs.findOne({ eventId: params.id, userId });
  if (existing) return NextResponse.json({ ok: true, status: "already_registered" });

  await regs.insertOne({ eventId: params.id, userId, createdAt: new Date().toISOString() });
  await events.updateOne({ id: params.id }, { $inc: { "capacity.registered": 1 } });

  // Gamification: award for event participation (RSVP)
  try {
    await connectDB();
    const student = await Student.findById(userId);
    const alumni = await Alumni.findById(userId);
    
    if (student) {
      const awards = getAwardsForEvent({ userType: 'student', eventType: 'login', quantity: 1 }); // Using login as closest equivalent
      student.totalStars = (student.totalStars || 0) + awards.stars;
      student.level = Math.floor((student.totalStars || 0) / 50) + 1;
      await student.save();
      
      await GamificationEvent.create({
        user: { userId: student._id, userType: 'student' },
        eventType: 'login',
        quantity: 1,
        starsAwarded: awards.stars,
        pointsAwarded: 0,
        relatedEntity: { entityId: params.id, entityType: 'event' },
      });
    } else if (alumni) {
      const awards = getAwardsForEvent({ userType: 'alumni', eventType: 'login', quantity: 1 });
      alumni.totalPoints = (alumni.totalPoints || 0) + awards.points;
      alumni.level = Math.floor((alumni.totalPoints || 0) / 10) + 1;
      const maybeNewBadges = alumni.checkBadgeEligibility?.() || [];
      await alumni.save();
      
      await GamificationEvent.create({
        user: { userId: alumni._id, userType: 'alumni' },
        eventType: 'login',
        quantity: 1,
        starsAwarded: 0,
        pointsAwarded: awards.points,
        relatedEntity: { entityId: params.id, entityType: 'event' },
        metadata: { badgesEarned: maybeNewBadges?.map(b => b.name) || [] }
      });
    }
  } catch (gamErr) {
    console.error('Gamification award failed for RSVP:', gamErr);
    // do not fail the request due to gamification
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Missing x-user-id header" }, { status: 400 });

  const db = await getDb();
  const events = db.collection("events");
  const regs = db.collection("registrations");

  const ev = await events.findOne({ id: params.id });
  if (!ev) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  const res = await regs.deleteOne({ eventId: params.id, userId });
  if (res.deletedCount) {
    await events.updateOne({ id: params.id }, { $inc: { "capacity.registered": -1 } });
  }

  return NextResponse.json({ ok: true });
} 