import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "ai"],
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for fetching Conversations in order
conversationSchema.index({ userId: 1, interviewId: 1, createdAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
