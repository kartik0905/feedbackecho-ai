import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, googleOAuth } from "./auth.controllers.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, 
  message: {
    success: false,
    error: "Too many login attempts. Please try again in 15 minutes.",
  },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/google", googleOAuth);

export default router;
