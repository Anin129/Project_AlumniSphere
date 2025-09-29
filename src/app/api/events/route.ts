import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import connectDB from "@/dbConfig/dbConfig";
import { GamificationEvent, getAwardsForEvent } from "@/models/gamificationModel";
import Student from "@/models/studentModel";
import Alumni from "@/models/alumniModel";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const collection = db.collection("events");
  const events = await collection
    .find({}, { projection: { _id: 0 } })
    .sort({ "dateTime.start": 1 })
    .toArray();
  return NextResponse.json({ items: events });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Minimal validation
  if (!body?.title || !body?.dateTime?.start || !body?.location?.virtualLink) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const userId = req.headers.get("x-user-id") ?? "anonymous";
  const db = await getDb();
  const collection = db.collection("events");

  const nowIso = new Date().toISOString();
  const doc = {
    ...body,
    id: body.id ?? crypto.randomUUID(),
    createdAt: nowIso,
    updatedAt: nowIso,
    organizer: body.organizer ?? { name: "Unknown", email: "", isAdmin: false },
    capacity: body.capacity ?? { registered: 0 },
    pricing: body.pricing ?? { type: "free" },
    status: body.status ?? "published",
    visibility: body.visibility ?? "alumni-only",
    createdBy: userId,
  };

  await collection.insertOne(doc);

  // Gamification: award for event creation
  try {
    await connectDB();
    const userEmail = body.organizer?.email;
    if (userEmail) {
      const student = await Student.findOne({ email: userEmail });
      const alumni = await Alumni.findOne({ email: userEmail });
      
      if (student) {
        const awards = getAwardsForEvent({ userType: 'student', eventType: 'discussion_created', quantity: 1 });
        student.totalStars = (student.totalStars || 0) + awards.stars;
        student.level = Math.floor((student.totalStars || 0) / 50) + 1;
        await student.save();
        
        await GamificationEvent.create({
          user: { userId: student._id, userType: 'student' },
          eventType: 'discussion_created',
          quantity: 1,
          starsAwarded: awards.stars,
          pointsAwarded: 0,
          relatedEntity: { entityId: doc.id, entityType: 'event' },
        });
      } else if (alumni) {
        const awards = getAwardsForEvent({ userType: 'alumni', eventType: 'discussion_created', quantity: 1 });
        alumni.totalPoints = (alumni.totalPoints || 0) + awards.points;
        alumni.level = Math.floor((alumni.totalPoints || 0) / 10) + 1;
        const maybeNewBadges = alumni.checkBadgeEligibility?.() || [];
        await alumni.save();
        
        await GamificationEvent.create({
          user: { userId: alumni._id, userType: 'alumni' },
          eventType: 'discussion_created',
          quantity: 1,
          starsAwarded: 0,
          pointsAwarded: awards.points,
          relatedEntity: { entityId: doc.id, entityType: 'event' },
          metadata: { badgesEarned: maybeNewBadges?.map(b => b.name) || [] }
        });
      }
    }
  } catch (gamErr) {
    console.error('Gamification award failed for event creation:', gamErr);
    // do not fail the request due to gamification
  }

  return NextResponse.json({ item: doc }, { status: 201 });
} 