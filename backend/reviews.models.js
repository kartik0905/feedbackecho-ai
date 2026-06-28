import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    badge: {
      type: String,
      enum: ["Positive", "Negative", "Neutral"],
      default: "Neutral",
    },
    author: { type: String, default: "Anonymous Guest" },
  },
  { timestamps: true },
);

export default mongoose.model("Review", reviewSchema);
