import connectDB from "@/dbConfig/dbConfig";
import { GamificationEvent, getAwardsForEvent } from "@/models/gamificationModel";
import Student from "@/models/studentModel";
import Alumni from "@/models/alumniModel";

export async function processLoginGamification(userId, userType) {
  try {
    await connectDB();
    
    if (userType === 'student') {
      const student = await Student.findById(userId);
      if (!student) return { success: false, error: 'Student not found' };
      
      const loginResult = student.recordDailyLogin();
      await student.save();
      
      // Log gamification event
      await GamificationEvent.create({
        user: { userId: student._id, userType: 'student' },
        eventType: 'login',
        quantity: 1,
        starsAwarded: loginResult.stars || 0,
        pointsAwarded: 0,
      });
      
      return { 
        success: true, 
        stars: loginResult.stars, 
        streak: loginResult.newStreak,
        level: loginResult.level,
        totalStars: loginResult.totalStars
      };
    } else if (userType === 'alumni') {
      const alumni = await Alumni.findById(userId);
      if (!alumni) return { success: false, error: 'Alumni not found' };
      
      const loginResult = alumni.recordDailyLogin();
      await alumni.save();
      
      // Log gamification event
      await GamificationEvent.create({
        user: { userId: alumni._id, userType: 'alumni' },
        eventType: 'login',
        quantity: 1,
        starsAwarded: 0,
        pointsAwarded: 0,
        metadata: { badgesEarned: loginResult.badgesEarned?.map(b => b.name) || [] }
      });
      
      return { 
        success: true, 
        badges: loginResult.badgesEarned,
        streak: loginResult.newStreak,
        level: loginResult.level,
        totalBadges: loginResult.totalBadges
      };
    }
    
    return { success: false, error: 'Invalid user type' };
  } catch (error) {
    console.error('Login gamification error:', error);
    return { success: false, error: error.message };
  }
}

export async function getGamificationStats(userId, userType) {
  try {
    await connectDB();
    
    if (userType === 'student') {
      // Try to find by email first, then by ID
      let student = await Student.findOne({ email: userId });
      if (!student) {
        student = await Student.findById(userId);
      }
      if (!student) return null;
      return student.getGamificationStats();
    } else if (userType === 'alumni') {
      // Try to find by email first, then by ID
      let alumni = await Alumni.findOne({ email: userId });
      if (!alumni) {
        alumni = await Alumni.findById(userId);
      }
      if (!alumni) return null;
      return alumni.getGamificationStats();
    }
    
    return null;
  } catch (error) {
    console.error('Get gamification stats error:', error);
    return null;
  }
}
