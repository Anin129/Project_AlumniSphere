import mongoose from 'mongoose';

// Polymorphic user reference (Student or Alumni)
const userRefSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    userType: { type: String, required: true, enum: ['student', 'alumni'], index: true },
  },
  { _id: false }
);

// Log of all gamification events (posts, comments, logins, etc.)
const gamificationEventSchema = new mongoose.Schema(
  {
    user: { type: userRefSchema, required: true },
    eventType: {
      type: String,
      required: true,
      enum: [
        'login',
        'post_created',
        'comment_created',
        'discussion_created',
        'upvote_received',
        'answer_accepted',
      ],
      index: true,
    },
    quantity: { type: Number, default: 1, min: 1 },
    // For students (stars) and alumni (points)
    starsAwarded: { type: Number, default: 0, min: 0 },
    pointsAwarded: { type: Number, default: 0, min: 0 },
    // Optional linkage to domain objects
    relatedEntity: {
      entityId: { type: mongoose.Schema.Types.ObjectId },
      entityType: { type: String, enum: ['community_post', 'discussion', 'comment', 'job', 'event'] },
    },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Daily streak tracker per user (students and alumni)
const dailyStreakSchema = new mongoose.Schema(
  {
    user: { type: userRefSchema, required: true, index: true },
    currentStreak: { type: Number, default: 0, min: 0 },
    longestStreak: { type: Number, default: 0, min: 0 },
    lastActivityDate: { type: Date },
  },
  { timestamps: true }
);

// Badge catalog for alumni (students earn stars only)
const badgeCatalogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, enum: ['engagement', 'mentoring', 'networking', 'contribution', 'achievement'] },
    description: { type: String, trim: true },
    // criteria.type defines how to interpret threshold, and which metric to observe
    criteria: {
      type: new mongoose.Schema(
        {
          type: { type: String, required: true, enum: ['streak', 'points', 'level', 'mentoring', 'referrals', 'communityPosts'] },
          threshold: { type: Number, required: true, min: 1 },
        },
        { _id: false }
      ),
      required: true,
    },
    allowedUserTypes: { type: [String], default: ['alumni'], enum: ['student', 'alumni'] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Helpful indexes
gamificationEventSchema.index({ 'user.userId': 1, createdAt: -1 });
dailyStreakSchema.index({ 'user.userId': 1 }, { unique: true });

// Utility: rule-of-thumb awards (central place to reference from route handlers/services)
export const getAwardsForEvent = ({ userType, eventType, quantity = 1 }) => {
  const q = Math.max(1, quantity);
  const studentStars = {
    login: 1,
    post_created: 3,
    comment_created: 1,
    discussion_created: 2,
    upvote_received: 0, // receiving upvotes does not grant stars by default
    answer_accepted: 5,
  };
  const alumniPoints = {
    login: 0, // alumni level is point-based via engagements; login affects streak/badges
    post_created: 1,
    comment_created: 0,
    discussion_created: 1,
    upvote_received: 1, // recognition for contributions
    answer_accepted: 2,
  };

  if (userType === 'student') {
    return { stars: (studentStars[eventType] ?? 0) * q, points: 0 };
  }
  return { stars: 0, points: (alumniPoints[eventType] ?? 0) * q };
};

export const GamificationEvent = mongoose.models.GamificationEvent || mongoose.model('GamificationEvent', gamificationEventSchema);
export const DailyStreak = mongoose.models.DailyStreak || mongoose.model('DailyStreak', dailyStreakSchema);
export const BadgeCatalog = mongoose.models.BadgeCatalog || mongoose.model('BadgeCatalog', badgeCatalogSchema);

export default GamificationEvent;


