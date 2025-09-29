import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Student from '@/models/studentModel';
import Alumni from '@/models/alumniModel';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const userId = params.id;

    if (type === 'student') {
      const student = await Student.findOne({ email: userId });
      if (student) {
        return NextResponse.json({
          id: student._id,
          name: student.name,
          email: student.email,
          department: student.department,
          graduationYear: student.graduationYear,
          type: 'student',
          totalStars: student.totalStars,
          level: student.level,
          dailyLoginStreak: student.dailyLoginStreak,
          longestStreak: student.longestStreak
        });
      }
    } else if (type === 'alumni') {
      const alumni = await Alumni.findOne({ email: userId });
      if (alumni) {
        return NextResponse.json({
          id: alumni._id,
          name: alumni.name,
          email: alumni.email,
          department: alumni.department,
          graduationYear: alumni.graduationYear,
          company: alumni.company,
          position: alumni.position,
          type: 'alumni',
          totalPoints: alumni.totalPoints,
          totalBadges: alumni.totalBadges,
          level: alumni.level,
          dailyLoginStreak: alumni.dailyLoginStreak,
          longestStreak: alumni.longestStreak
        });
      }
    } else {
      // Try both types if no type specified
      const [student, alumni] = await Promise.all([
        Student.findOne({ email: userId }),
        Alumni.findOne({ email: userId })
      ]);

      if (student) {
        return NextResponse.json({
          id: student._id,
          name: student.name,
          email: student.email,
          department: student.department,
          graduationYear: student.graduationYear,
          type: 'student',
          totalStars: student.totalStars,
          level: student.level,
          dailyLoginStreak: student.dailyLoginStreak,
          longestStreak: student.longestStreak
        });
      } else if (alumni) {
        return NextResponse.json({
          id: alumni._id,
          name: alumni.name,
          email: alumni.email,
          department: alumni.department,
          graduationYear: alumni.graduationYear,
          company: alumni.company,
          position: alumni.position,
          type: 'alumni',
          totalPoints: alumni.totalPoints,
          totalBadges: alumni.totalBadges,
          level: alumni.level,
          dailyLoginStreak: alumni.dailyLoginStreak,
          longestStreak: alumni.longestStreak
        });
      }
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}