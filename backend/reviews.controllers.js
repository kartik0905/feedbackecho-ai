import Review from "./reviews.models.js";

// 1. POST: Create a new review
export const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// 2. GET: List all reviews
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// 3. GET: Single review by ID
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// 4. PUT/PATCH: Update a review
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE: Remove a review
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// 6. GET (Extra Endpoint): Filter reviews by sentiment badge
export const filterReviewsByBadge = async (req, res, next) => {
  try {
    const { badge } = req.query;
    const reviews = await Review.find({ badge: badge });
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};
