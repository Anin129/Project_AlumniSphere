

import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    goalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    collectedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    donorsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Education",
        "Infrastructure",
        "Scholarship",
        "Emergency",
        "Research",
        "Healthcare",
        "Events",
        "Community",
        "Innovation",
        "Fundraising-Drive",
        "Library",
        "Sports",
        "Technology",
        "Environment",
        "Cultural",
        "Alumni-Support",
        "Student-Welfare",
        "Hostel",
        "Laboratory",
        "Other",
      ],
      default: "Other",
    },

    logo: {
      type: String, // Cloudinary URL or any image link
      default: "", // optional: empty if no logo uploaded
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed", "closed"],
      default: "active",
    },

    active: {
      type: Boolean,
      default: true,
    },

    donors: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        amount: {
          type: Number,
          required: true,
        },
        donatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", CampaignSchema);
