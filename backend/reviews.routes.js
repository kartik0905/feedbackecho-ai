import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  filterReviewsByBadge,
} from "./reviews.controllers.js";
import { protect } from "./auth.middleware.js";

const router = express.Router();

router.route("/search").get(filterReviewsByBadge); // Must be above /:id
router.route("/").get(getReviews).post(createReview);
router.route("/:id").get(getReviewById).put(updateReview).delete(deleteReview);
router.route("/").get(protect, getReviews).post(protect, createReview);

export default router;
