const Reviews = require("../models/review.model");
const User = require("../models/user.model");

const checkUser = async (userId) => {
  try {
    const isExist = await User.findById({ _id: userId });
    if (!isExist) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const create = async (reviewData, userId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const newReview = await Reviews.create(reviewData);
    if (!newReview) throw new Error("not successful");
    return newReview;
  } catch (error) {
    throw error;
  }
};

const update = async (userId, data, movieId, reviewId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const review = await Reviews.findOne({
      _id: reviewId,
      movieId: movieId,
      userId: userId,
    });
    if (!review) throw new Error("no authorized/ review dont exist");
    let options = { new: true };
    const update = await Reviews.findOneAndUpdate(
      { _id: reviewId },
      { $set: data },
      options
    );
    return update;
  } catch (error) {
    throw error;
  }
};

const deleteR = async (userId, movieId, reviewId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const review = await Reviews.findOne({
      _id: reviewId,
      movieId: movieId,
      userId: userId,
    });
    if (!review) throw new Error("no authorized/ review dont exist");

    const del = await Reviews.findByIdAndDelete({ _id: reviewId });
    return del;
  } catch (error) {
    throw error;
  }
};

const getAll = async (id) => {
  try {
    const allReview = await Reviews.find({ movieId: id });
    if (!allReview) throw new Error("no such movie exist in database");
    return allReview;
  } catch (error) {
    throw error;
  }
};

const getRating = async (id) => {
  try {
    const getAllRating = await Reviews.find({ movieId: id });
    if (!getAllRating) throw new Error("no such movie exist in database");

    let len = getAllRating.length;
    let totalR = 0;
    for (let i = 0; i < len; i++) {
      totalR += getAllRating[i].rating;
    }
    const netRating = Math.floor(totalR / len);
    return netRating;
  } catch (error) {
    throw error;
  }
};

module.exports = { create, update, deleteR, getAll, getRating };
