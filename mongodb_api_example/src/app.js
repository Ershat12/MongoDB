const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./userModel");
const app = express();

app.use(express.json());

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.gvrgdak.mongodb.net/users_db?retryWrites=true&w=majority";

const connect = async () => {
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected!");
};

connect();

app.get("/", async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

app.post("/", async (req, res) => {
  const newUser = {
    firstName: "string",
  };

  const user = await User.create(newUser);

  res.status(200).json(user);
});

app.listen(5000, () => console.log("port 5000 is running "));
