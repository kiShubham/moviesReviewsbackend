require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database 🚵‍♂️");
  })
  .catch((err) => {
    console.log("facing error to connect to database 🌠");
  });

const authRoutes = require("./routes/auth.routes");
const moviesRoutes = require("./routes/movie.routes");
const reviewRoutes = require("./routes/review.routes");

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/users", authRoutes);

app.use("/api/movies", moviesRoutes);

app.use("/api/movies", reviewRoutes);

app.listen(port, () => console.log(`server is listening on port ${port}!`));
