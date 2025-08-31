import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobRole: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    interviewType: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    analysis: {
      summary: {
        type: String,
        required: true,
      },
      strengths: [{ type: String, trim: true }],
      weaknesses: [{ type: String, trim: true }],
      tags: [{ type: String, trim: true }],
      scores: {
        communication: {
          type: Number,
          min: 0,
          max: 5,
        },
        problemSolving: {
          type: Number,
          min: 0,
          max: 5,
        },
        technicalSkills: {
          type: Number,
          min: 0,
          max: 5,
        },
      },
    },
    overallRating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// Index for query user's interviews sorted by date
interviewSchema.index({ userId: 1, createdAt: -1 });

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
