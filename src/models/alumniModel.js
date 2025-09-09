// src/models/alumniModel.js
import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema(
  {
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  { _id: false }
);

const alumniSchema = new mongoose.Schema(
  {
    // Identity
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },

    // Academic
    rollNumber: { type: String, trim: true, index: true },
    department: { type: String, trim: true },
    degree: { type: String, trim: true }, // e.g., B.Tech, M.Tech, MBA
    graduationYear: { type: Number, min: 1950, max: 2100, index: true },

    // Current employment
    currentCompany: { type: String, trim: true, index: true },
    currentPosition: { type: String, trim: true },
    company: { type: String, trim: true },
    yearsOfExperience: { type: Number, min: 0, default: 0 },

    // Profile and networking
    bio: { type: String, trim: true, maxlength: 2000 },
    location: { type: String, trim: true },
    skills: { type: [String], default: [], index: true },
    interests: { type: [String], default: [] },
    social: { type: socialLinksSchema, default: {} },
    achievements: { type: [String], default: [] },

    // Gamification (Badge System)
    badges: [{
      name: { type: String, required: true },
      category: { type: String, required: true }, // 'engagement', 'mentoring', 'networking', 'contribution'
      earnedAt: { type: Date, default: Date.now },
      description: { type: String, trim: true }
    }],
    totalBadges: { type: Number, default: 0, min: 0 },
    dailyLoginStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    lastLoginDate: { type: Date },
    totalLogins: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    
    // Engagement tracking
    mentoringSessions: { type: Number, default: 0, min: 0 },
    referrals: { type: Number, default: 0, min: 0 },
    communityPosts: { type: Number, default: 0, min: 0 },
    totalPoints: { type: Number, default: 0, min: 0 },


    // Admin/moderation
    lastActiveAt: { type: Date },
    resumeUrl: { type: String, trim: true },
    notes: { type: String, trim: true }, // admin/internal notes
  },
  { timestamps: true }
);

// Gamification methods
alumniSchema.methods.recordDailyLogin = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if already logged in today
  if (this.lastLoginDate) {
    const lastLogin = new Date(this.lastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);
    if (lastLogin.getTime() === today.getTime()) {
      return { alreadyLoggedIn: true, badgesEarned: [] };
    }
  }

  // Update streak
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  if (this.lastLoginDate) {
    const lastLogin = new Date(this.lastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);
    if (lastLogin.getTime() === yesterday.getTime()) {
      this.dailyLoginStreak += 1;
    } else {
      this.dailyLoginStreak = 1; // Reset streak if not consecutive
    }
  } else {
    this.dailyLoginStreak = 1;
  }

  // Update longest streak
  if (this.dailyLoginStreak > this.longestStreak) {
    this.longestStreak = this.dailyLoginStreak;
  }

  // Update totals
  this.totalLogins += 1;
  this.lastLoginDate = today;
  this.lastActiveAt = new Date();

  // Calculate level based on total points (every 10 points = 1 level)
  this.level = Math.floor(this.totalPoints / 10) + 1;

  // Check for badge eligibility
  const badgesEarned = this.checkBadgeEligibility();

  return { 
    alreadyLoggedIn: false, 
    badgesEarned: badgesEarned,
    newStreak: this.dailyLoginStreak,
    totalBadges: this.totalBadges,
    level: this.level
  };
};

alumniSchema.methods.checkBadgeEligibility = function() {
  const newBadges = [];
  const existingBadgeNames = this.badges.map(badge => badge.name);

  // Login streak badges
  if (this.dailyLoginStreak >= 7 && !existingBadgeNames.includes('Week Warrior')) {
    newBadges.push({
      name: 'Week Warrior',
      category: 'engagement',
      description: 'Logged in for 7 consecutive days'
    });
  }
  if (this.dailyLoginStreak >= 30 && !existingBadgeNames.includes('Monthly Master')) {
    newBadges.push({
      name: 'Monthly Master',
      category: 'engagement',
      description: 'Logged in for 30 consecutive days'
    });
  }
  if (this.dailyLoginStreak >= 100 && !existingBadgeNames.includes('Century Champion')) {
    newBadges.push({
      name: 'Century Champion',
      category: 'engagement',
      description: 'Logged in for 100 consecutive days'
    });
  }

  // Mentoring badges
  if (this.mentoringSessions >= 1 && !existingBadgeNames.includes('First Mentor')) {
    newBadges.push({
      name: 'First Mentor',
      category: 'mentoring',
      description: 'Completed first mentoring session'
    });
  }
  if (this.mentoringSessions >= 5 && !existingBadgeNames.includes('Mentor Master')) {
    newBadges.push({
      name: 'Mentor Master',
      category: 'mentoring',
      description: 'Completed 5 mentoring sessions'
    });
  }
  if (this.mentoringSessions >= 20 && !existingBadgeNames.includes('Mentoring Legend')) {
    newBadges.push({
      name: 'Mentoring Legend',
      category: 'mentoring',
      description: 'Completed 20 mentoring sessions'
    });
  }

  // Referral badges
  if (this.referrals >= 1 && !existingBadgeNames.includes('First Referral')) {
    newBadges.push({
      name: 'First Referral',
      category: 'contribution',
      description: 'Made first referral'
    });
  }

  // Point-based achievement badges
  if (this.totalPoints >= 5 && !existingBadgeNames.includes('Bronze Badge')) {
    newBadges.push({
      name: 'Bronze Badge',
      category: 'achievement',
      description: 'Earned 5 points through engagement'
    });
  }
  if (this.totalPoints >= 20 && !existingBadgeNames.includes('Silver Badge')) {
    newBadges.push({
      name: 'Silver Badge',
      category: 'achievement',
      description: 'Earned 20 points through engagement'
    });
  }
  if (this.totalPoints >= 50 && !existingBadgeNames.includes('Gold Badge')) {
    newBadges.push({
      name: 'Gold Badge',
      category: 'achievement',
      description: 'Earned 50 points through engagement'
    });
  }

  // Level badges
  if (this.level >= 5 && !existingBadgeNames.includes('Rising Star')) {
    newBadges.push({
      name: 'Rising Star',
      category: 'engagement',
      description: 'Reached level 5'
    });
  }
  if (this.level >= 10 && !existingBadgeNames.includes('Alumni Ambassador')) {
    newBadges.push({
      name: 'Alumni Ambassador',
      category: 'engagement',
      description: 'Reached level 10'
    });
  }

  // Add new badges
  newBadges.forEach(badge => {
    this.badges.push(badge);
    this.totalBadges += 1;
  });

  return newBadges;
};

alumniSchema.methods.addEngagement = function(type, amount = 1) {
  let pointsEarned = 0;
  
  switch (type) {
    case 'mentoring':
      this.mentoringSessions += amount;
      pointsEarned = amount; // 1 point per mentoring session
      break;
    case 'referral':
      this.referrals += amount;
      pointsEarned = amount; // 1 point per referral
      break;
    case 'communityPost':
      this.communityPosts += amount;
      // 1 point for every 5 community posts
      const newPoints = Math.floor(this.communityPosts / 5);
      const previousPoints = Math.floor((this.communityPosts - amount) / 5);
      pointsEarned = newPoints - previousPoints;
      break;
  }
  
  // Update total points
  this.totalPoints += pointsEarned;
  
  // Recalculate level (every 10 points = 1 level)
  this.level = Math.floor(this.totalPoints / 10) + 1;
  
  // Check for new badges
  return this.checkBadgeEligibility();
};


alumniSchema.methods.getGamificationStats = function() {
  return {
    totalBadges: this.totalBadges,
    badges: this.badges,
    dailyLoginStreak: this.dailyLoginStreak,
    longestStreak: this.longestStreak,
    totalLogins: this.totalLogins,
    level: this.level,
    totalPoints: this.totalPoints,
    mentoringSessions: this.mentoringSessions,
    referrals: this.referrals,
    communityPosts: this.communityPosts,
    lastLoginDate: this.lastLoginDate
  };
};

// Useful compound indexes
alumniSchema.index({ graduationYear: 1, department: 1 });
alumniSchema.index({ currentCompany: 1, industry: 1 });
alumniSchema.index({ skills: 1 });
alumniSchema.index({ totalBadges: -1 }); // For badge leaderboards
alumniSchema.index({ dailyLoginStreak: -1 }); // For streak leaderboards
alumniSchema.index({ 'badges.category': 1 }); // For badge category queries

module.exports = mongoose.models.Alumni || mongoose.model('Alumni', alumniSchema);