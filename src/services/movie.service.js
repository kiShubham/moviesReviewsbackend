const Movies = require("../models/movies.model");
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

const create = async (movieData, userId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const newMovie = await Movies.create(movieData);
    return newMovie;
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateData, userId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const filter = { _id: id, userId: userId };
    const updateOpertion = { $set: updateData };
    const options = { new: true };
    const updateMovie = await Movies.findOneAndUpdate(
      filter,
      updateOpertion,
      options
    );
    if (!updateMovie) throw new Error("You are not Authorized");
    return updateMovie;
  } catch (error) {
    throw error;
  }
};

const deleteMv = async (id, userId) => {
  try {
    const userCheck = await checkUser(userId);
    if (!userCheck) throw new Error("please login with valid credential");

    const check = await Movies.findOne({ _id: id, userId: userId });
    if (!check) throw new Error("you are not authorized");
    const deletemovie = await Movies.findByIdAndDelete({ _id: id });
    return deletemovie;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const getmovie = await Movies.findById({ _id: id });
    return getmovie;
  } catch (error) {
    throw error;
  }
};

const getAll = async (filter) => {
  try {
    const getmovie = await Movies.find(filter);
    return getmovie;
  } catch (error) {
    throw error;
  }
};

module.exports = { create, update, deleteMv, getById, getAll };
