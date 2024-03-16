//import services
const moviesService = require("../services/movie.service");

const postMovie = async (req, res) => {
  try {
    const { title, genre, description, director, releaseYear } = req.body;
    const userId = req.user.id;
    const movieData = {
      title,
      genre,
      description,
      director,
      releaseYear,
      userId,
    };

    const movie = await moviesService.create(movieData);
    res.status(201).json({
      message: "successfully uploaded movie",
      movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // moviesid ;
    const updateData = req.body;
    const updateMovie = await moviesService.update(id, updateData, userId);
    res.status(201).json({
      message: "successfully updated movie detail",
      updateMovie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleteMovie = await moviesService.deleteMv(id, userId);

    res.status(201).json({
      message: "successfully deleted movie detail",
      deleteMovie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const getMovie = await moviesService.getById(id);
    res.status(200).json({
      message: "got the movie",
      getMovie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { genre, releaseYear, director } = req.query;
    console.log(req.query.genre);

    const getMovie = await moviesService.getAll(genre, releaseYear, director);
    res.status(200).json({
      message: "got the movie",
      getMovie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postMovie,
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById,
};
