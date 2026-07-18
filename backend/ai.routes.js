import express from "express";
import { analyzeReview } from "./ai.controllers.js";
import { protect } from "./auth.middleware.js"; // Ensure only logged-in users use the AI

const router = express.Router();

router.post("/analyze", protect, analyzeReview);

export default router;
