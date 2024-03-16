const Movies = require("../models/movies.model");

const create = async (movieData) => {
  try {
    const newMovie = await Movies.create(movieData);
    return newMovie;
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateData, userId) => {
  try {
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
