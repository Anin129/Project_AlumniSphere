import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import Alumni from "@/models/alumniModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { role, name, email, password, graduationYear, department } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const common = { name: String(name).trim(), email: normalizedEmail, graduationYear, department } as any;

    if (String(role).toLowerCase() === 'alumni') {
      const exists = await Alumni.findOne({ email: normalizedEmail }).lean();
      if (exists) return NextResponse.json({ error: "User already exists" }, { status: 409 });
      const doc = new Alumni({ ...common, password: String(password) });
      await doc.save();
      return NextResponse.json({ ok: true, id: String(doc._id), role: 'alumni' }, { status: 201 });
    }

    // default to student
    const exists = await Student.findOne({ email: normalizedEmail }).lean();
    if (exists) return NextResponse.json({ error: "User already exists" }, { status: 409 });
    const doc = new Student({ ...common, password: String(password) });
    await doc.save();
    return NextResponse.json({ ok: true, id: String(doc._id), role: 'student' }, { status: 201 });
  } catch (err: any) {
    console.error('Register error', err);
    return NextResponse.json({ error: 'Registration failed', details: String(err?.message || err) }, { status: 500 });
  }
} 