const express = require("express");
const mongoose = require("mongoose");
const { Publisher, Game } = require("./gameSchema");
const { Car, Driver } = require("./driverSchema");
const { Passport, Human } = require("./passportSchema");
const { Post, Comment } = require("./postSchema");
const app = express();

const mongoUrl =
  "mongodb+srv://admin:admin@cluster0.ytv1wk5.mongodb.net/lesson_db?retryWrites=true&w=majority";

mongoose.connect(mongoUrl).then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.status(200).json("Success");
});

app.post("/games", async (req, res) => {
  const newPublisher = new Publisher({
    companyName: "Ubisoft",
    website: "ubisoft.com",
  });

  const newGame = new Game({ title: "Far Cry 19", publisher: newPublisher });

  const result = await newGame.save();

  res.status(201).json(result);
});

app.post("/drivers", async (req, res) => {
  const car = await Car.create({
    model: "Toyota Camry",
    producer: "Toyota",
  });

  const driver = await Driver.create({
    name: "Johnny Sack",
    car: car._id,
  });

  res.status(201).json(driver);
});

app.get("/drivers", async (req, res) => {
  const driver = await Driver.findOne({ _id: "6586785583268c011445d965" });

  const car = await Car.findOne({ _id: driver.car });

  driver.car = car;

  res.status(201).json(driver);
});

app.post("/passports", async (req, res) => {
  const passport = await Passport.create({
    number: 444,
  });

  const human = await Human.create({
    name: "Dr. Jennifer Melfi",
    passport: passport._id,
  });

  const newPassport = await Passport.findByIdAndUpdate(
    passport._id,
    {
      human: human._id,
    },
    { new: true }
  );
  res.status(201).json({ newPassport, human });
});

app.post("/posts", async (req, res) => {
  const post = await Post.create({
    title: "Hello",
    text: "My first post",
  });

  const comment1 = await Comment.create({
    text: "My first comment",
    post: post._id,
  });

  const comment2 = await Comment.create({
    text: "My second comment",
    post: post._id,
  });

  res.status(200).json({ post, comment1, comment2 });
});

app.get("/posts", async (req, res) => {
  const post = await Post.findById("658685982742f0e0edabe7a1");

  const comments = await Comment.find({
    post: post._id,
  });

  res.status(200).json({ post, comments });
});

app.post("/new", async (req, res) => {
  const book = await Book.create({
    title: "Emperor of Rome",
    author: "Mary Beard",
    price: 30,
    year: 2023,
    count: 20,
    publisher: "Liveright",
    inStock: true,
  });

  const store = await Store.create({
    name: "Amazon Library",
    rent: 500,
    address: "Kerei-Janybek 15/4",
    area: "40 sq.m",
  });

  const city = await City.create({
    name: "Astana",
    region: "Saryarka",
    population: "1 300 000",
  });

  const client = await Client.create({
    name: "Ershat",
    age: 23,
    preferences: "History",
  });

  res.status(200).json(Book);
});

app.listen(5000, () => console.log("Server is running on port 5000"));
