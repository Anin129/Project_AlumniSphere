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

const studentSchema = new mongoose.Schema(
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

    // Profile and interests
    bio: { type: String, trim: true, maxlength: 2000 },
    location: { type: String, trim: true },
    skills: { type: [String], default: [], index: true },
    interests: { type: [String], default: [] },
    social: { type: socialLinksSchema, default: {} },
    achievements: { type: [String], default: [] },

    // Career intent (student-specific)
    isSeekingInternship: { type: Boolean, default: false },
    isSeekingJob: { type: Boolean, default: false },
    portfolioUrl: { type: String, trim: true },

    // Gamification
    totalStars: { type: Number, default: 0, min: 0 },
    dailyLoginStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    lastLoginDate: { type: Date },
    loginHistory: [{ 
      date: { type: Date, required: true },
      starsEarned: { type: Number, default: 0, min: 0 }
    }],
    totalLogins: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    achievements: { type: [String], default: [] },

    // Admin/moderation
    lastActiveAt: { type: Date },
    notes: { type: String, trim: true }, // admin/internal notes
  },
  { timestamps: true }
);

// Gamification methods
studentSchema.methods.recordDailyLogin = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if already logged in today
  const todayLogin = this.loginHistory.find(login => {
    const loginDate = new Date(login.date);
    loginDate.setHours(0, 0, 0, 0);
    return loginDate.getTime() === today.getTime();
  });

  if (todayLogin) {
    return { alreadyLoggedIn: true, stars: 0 };
  }

  // Calculate stars based on streak
  let starsEarned = 1; // Base star for daily login
  if (this.dailyLoginStreak >= 7) starsEarned = 2; // Bonus for weekly streak
  if (this.dailyLoginStreak >= 30) starsEarned = 3; // Bonus for monthly streak
  if (this.dailyLoginStreak >= 100) starsEarned = 5; // Bonus for 100+ day streak

  // Update streak
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const yesterdayLogin = this.loginHistory.find(login => {
    const loginDate = new Date(login.date);
    loginDate.setHours(0, 0, 0, 0);
    return loginDate.getTime() === yesterday.getTime();
  });

  if (yesterdayLogin) {
    this.dailyLoginStreak += 1;
  } else {
    this.dailyLoginStreak = 1; // Reset streak if not consecutive
  }

  // Update longest streak
  if (this.dailyLoginStreak > this.longestStreak) {
    this.longestStreak = this.dailyLoginStreak;
  }

  // Add to login history
  this.loginHistory.push({
    date: today,
    starsEarned: starsEarned
  });

  // Update totals
  this.totalStars += starsEarned;
  this.totalLogins += 1;
  this.lastLoginDate = today;
  this.lastActiveAt = new Date();

  // Calculate level based on total stars (every 50 stars = 1 level)
  this.level = Math.floor(this.totalStars / 50) + 1;

  return { 
    alreadyLoggedIn: false, 
    stars: starsEarned, 
    newStreak: this.dailyLoginStreak,
    totalStars: this.totalStars,
    level: this.level
  };
};

studentSchema.methods.getGamificationStats = function() {
  return {
    totalStars: this.totalStars,
    dailyLoginStreak: this.dailyLoginStreak,
    longestStreak: this.longestStreak,
    totalLogins: this.totalLogins,
    level: this.level,
    achievements: this.achievements,
    lastLoginDate: this.lastLoginDate
  };
};

studentSchema.methods.addAchievement = function(achievement) {
  if (!this.achievements.includes(achievement)) {
    this.achievements.push(achievement);
    return true;
  }
  return false;
};

// Useful indexes similar to alumni
studentSchema.index({ graduationYear: 1, department: 1 });
studentSchema.index({ skills: 1 });
studentSchema.index({ totalStars: -1 }); // For leaderboards
studentSchema.index({ dailyLoginStreak: -1 }); // For streak leaderboards

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);

