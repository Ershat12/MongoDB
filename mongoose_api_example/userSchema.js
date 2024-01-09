const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNumber: {
      unique: true,
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: Number,
    jobTitle: {
      type: String,
      required: true,
    },
    salary: Number,
    hobbies: [String],
    isPremium: Boolean,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
