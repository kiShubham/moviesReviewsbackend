const router = require("express").Router();

// import controller ;

const reviewsController = require("../controllers/review.controller");
const { authenticateToken } = require("../middlewares/authenticateToken");

/* 1. Allows authenticated users to post a rating and review for a movie, including rating and text.
 */

router.post("/:id/reviews", authenticateToken, reviewsController.postReview);

/* 2.Enables users to update their review and rating for a specific movie. */
router.put(
  ":movieId/reviews/:reviewId",
  authenticateToken,
  reviewsController.updateReview
);

/* 3. Allows users to delete their own review */
router.delete(
  ":movieId/reviews/:reviewId",
  authenticateToken,
  reviewsController.deleteReview
);

/* 4. Retrieves all reviews for a particular movie.id:movieid*/
router.get(":id/reviews", reviewsController.getAllReview);

/* 5. Calculates and returns the average rating for a movie. */
router.get(":id/averageRating", reviewsController.getAllRating);

module.exports = router;
