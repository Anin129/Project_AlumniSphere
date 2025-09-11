import { NextResponse } from "next/server";

// Temporary in-memory storage (replace with DB later)
let jobs: any[] = [];

export async function POST(req: Request) {
  try {
    const job = await req.json();
    job.id = Date.now().toString(); // simple unique ID
    jobs.push(job);

    return NextResponse.json(
      { message: "Job created successfully", job },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error creating job" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(jobs, { status: 200 });
}
