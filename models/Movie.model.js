// loading stuff from mongoose
const { Schema, model } = require('mongoose');

// creating the schema
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [ { type: Schema.Types.ObjectId, ref: "celebritie" } ]
});

// defining the model
const Movie = model("movie", movieSchema);

// exporting to enable access from anywhere
module.exports = Movie;