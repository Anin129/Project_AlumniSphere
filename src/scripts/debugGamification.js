import connectDB from "../dbConfig/dbConfig.js";
import Alumni from "../models/alumniModel.js";
import { GamificationEvent } from "../models/gamificationModel.js";

async function debugGamification() {
  try {
    await connectDB();
    
    console.log("=== Alumni Gamification Debug ===");
    
    // Find all alumni with points > 0
    const alumniWithPoints = await Alumni.find({ totalPoints: { $gt: 0 } }).select('name email totalPoints level badges');
    console.log(`Found ${alumniWithPoints.length} alumni with points > 0:`);
    
    for (const alumni of alumniWithPoints) {
      console.log(`\n--- ${alumni.name} (${alumni.email}) ---`);
      console.log(`Total Points: ${alumni.totalPoints}`);
      console.log(`Level: ${alumni.level}`);
      console.log(`Badges: ${alumni.badges.length}`);
      
      // Get all gamification events for this alumni
      const events = await GamificationEvent.find({ 
        'user.userId': alumni._id, 
        'user.userType': 'alumni' 
      }).sort({ createdAt: -1 }).limit(10);
      
      console.log(`Recent Gamification Events:`);
      for (const event of events) {
        console.log(`  - ${event.eventType}: ${event.pointsAwarded} points (${event.createdAt})`);
      }
    }
    
    // Check for any events that awarded points to alumni
    const pointEvents = await GamificationEvent.find({ 
      'user.userType': 'alumni',
      pointsAwarded: { $gt: 0 }
    }).sort({ createdAt: -1 }).limit(20);
    
    console.log(`\n=== Recent Alumni Point Awards ===`);
    for (const event of pointEvents) {
      console.log(`- ${event.eventType}: ${event.pointsAwarded} points to ${event.user.userId} (${event.createdAt})`);
    }
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugGamification();
