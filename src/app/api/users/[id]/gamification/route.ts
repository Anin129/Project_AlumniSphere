import { NextRequest, NextResponse } from "next/server";
import { getGamificationStats } from "@/lib/gamification";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const userType = searchParams.get('type') as 'student' | 'alumni';
    
    if (!userType || !['student', 'alumni'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    const stats = await getGamificationStats(params.id, userType);
    
    if (!stats) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get gamification stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gamification stats' },
      { status: 500 }
    );
  }
}
