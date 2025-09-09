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
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
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
    industry: { type: String, trim: true },
    yearsOfExperience: { type: Number, min: 0, default: 0 },

    // Profile and networking
    bio: { type: String, trim: true, maxlength: 2000 },
    location: { type: String, trim: true },
    skills: { type: [String], default: [], index: true },
    interests: { type: [String], default: [] },
    social: { type: socialLinksSchema, default: {} },
    achievements: { type: [String], default: [] },


    // Admin/moderation
    isVerified: { type: Boolean, default: false },
    visibility: { type: String, enum: ['public', 'alumni_only', 'private'], default: 'public' },
    lastActiveAt: { type: Date },
    resumeUrl: { type: String, trim: true },
    notes: { type: String, trim: true }, // admin/internal notes
  },
  { timestamps: true }
);

// Useful compound indexes
alumniSchema.index({ graduationYear: 1, department: 1 });
alumniSchema.index({ currentCompany: 1, industry: 1 });
alumniSchema.index({ skills: 1 });

module.exports = mongoose.models.Alumni || mongoose.model('Alumni', alumniSchema);