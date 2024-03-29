const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  films: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
    },
  ],
});

const Actor = mongoose.model("Actor", actorSchema);

const filmSchema = new mongoose.Schema({
  name: String,
  year: Number,
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
});

const Film = mongoose.model("Film", filmSchema);

module.exports = { Actor, Film };
