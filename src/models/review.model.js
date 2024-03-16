const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, default: "N/A", enum: [1, 2, 3, 4, 5] },
    text: { type: String, default: "N/A" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movies",
    },
  },
  { timestamps: false }
);

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
