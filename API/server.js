const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const mongoUrl =
  "mongodb+srv://admin:admin@cluster0.ytv1wk5.mongodb.net/?retryWrites=true&w=majority";

const dbName = "users_db";
const collName = "users";

// Создание инстанции
const client = new MongoClient(mongoUrl);

// Функция подключения
const connect = async () => {
  await client.connect();
  console.log("Successfully connected to MongoDB");
  return client.db(dbName);
};

// get all users
app.get("/", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);


  const allUsers = await collection.find().toArray();

  res.status(200).json(allUsers);
});

app.patch("/:userId",)

app.listen(5000, () => console.log("Port 5000 is up and running"));
