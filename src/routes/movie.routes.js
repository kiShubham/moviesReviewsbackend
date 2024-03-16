const router = require("express").Router();

// controllr
const moviesController = require("../controllers/movies.controller");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.post("/", authenticateToken, moviesController.postMovie); // user only
router.put("/:id", authenticateToken, moviesController.updateMovieById); //user only
router.delete("/:id", authenticateToken, moviesController.deleteMovieById); // user only
router.get("/:id", moviesController.getMovieById);
router.get("/", moviesController.getAllMovies);
//Supports filtering by genre, releaseYear, or director through query parameters.
// for filtering write using query parameter ?

module.exports = router;
