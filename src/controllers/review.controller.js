//services
const reviewServices = require("../services/review.service");

const postReview = async (req, res) => {
  try {
    const { id } = req.params; // movies id ;
    const userId = req.user.id;
    const { rating, text } = req.body;

    const reviewData = { rating, text, movieId: id, userId };
    const newReview = await reviewServices.create(reviewData, userId);
    res.status(201).json({
      message: "review posted 🤖",
      newReview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const userId = req.user.id;
    const updateR = await reviewServices.update(
      userId,
      req.body,
      movieId,
      reviewId
    );

    res.status(201).json({
      message: "review updated",
      updateR,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const userId = req.user.id;
    const deleteR = await reviewServices.deleteR(userId, movieId, reviewId);
    res.status(200).json({
      message: "review deleted",
      deleteR,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchAllR = await reviewServices.getAll(id);
    res.status(201).json({
      message: "all reviews",
      fetchAllR,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRating = async (req, res) => {
  try {
    const { id } = req.params;
    const getAverageRating = await reviewServices.getRating(id);
    res.status(201).json({
      message: "review updated",
      getAverageRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteReview,
  updateReview,
  postReview,
  getAllRating,
  getAllReview,
};
