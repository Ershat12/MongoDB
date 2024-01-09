const express = require("express");
const mongoose = require("mongoose");
const { Publisher, Game } = require("./gameSchema");
const { Car, Driver } = require("./driverSchema");
const { Passport, Human } = require("./passportSchema");
const { Post, Comment } = require("./postSchema");
const app = express();

const mongoUrl = process.env.mONGO_URI;

const port = process.env.PORT;

mongoose.connect(mongoUrl).then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.status(200).json("Succcess");
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
  const driver = await Driver.findOne({ _id: "6581a82159ca39d652adb554" });

  const car = await Car.findOne({ _id: driver.car });

  driver.car = car;

  res.status(200).json(driver);
});

app.post("/passports", async (req, res) => {
  // создаем "паспорт без человека"
  const passport = await Passport.create({
    number: 566,
  });

  // создаем человека с паспортом
  const human = await Human.create({
    name: "Dr. Jennifer Melfi",
    passport: passport._id,
  });

  // вставляем человека в "паспорт без человека"
  const newPassport = await Passport.findByIdAndUpdate(
    passport._id,
    {
      human: human._id,
    },
    { new: true }
  );

  res.status(201).json({ newPassport, human });
});

app.listen(port, () => console.log("Server is running on port $(port"));
