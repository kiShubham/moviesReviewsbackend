const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: false }
);

const Movies = mongoose.model("Movies", movieSchema);
module.exports = Movies;
