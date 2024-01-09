const express = require("express");
const mongoose = require("mongoose");
const { Book, Store, City, Client } = require("./newSchema");
const app = express();

const mongoUrl =
  "mongodb+srv://admin:admin@cluster0.ytv1wk5.mongodb.net/library_db?retryWrites=true&w=majority";

mongoose.connect(mongoUrl).then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.status(200).json("Success");
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
    population: 1300000,
  });

  const client = await Client.create({
    name: "Ershat",
    age: 23,
    preferences: "History",
  });

  res.status(200).json(book, store, city, client);
});

app.listen(5000, () => console.log("Server is running on port 5000"));
