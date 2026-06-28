import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  filterReviewsByBadge,
} from "./reviews.controllers.js";

const router = express.Router();

router.route("/search").get(filterReviewsByBadge); // Must be above /:id
router.route("/").get(getReviews).post(createReview);
router.route("/:id").get(getReviewById).put(updateReview).delete(deleteReview);

export default router;
