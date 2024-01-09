const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();

app.use(express.json());

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.gvrgdak.mongodb.net/?retryWrites=true&w=majority";
const dbName = "users_db";
const collName = "users";

const client = new MongoClient(mongoUri);

const connect = async () => {
  await client.connect();

  console.log("Succesfully connected to MongoDB");

  return client.db(dbName);
};

app.get("/", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);

  const users = await collection.find().toArray();

  res.status(200).json(users);
});

app.get("/:id", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);

  const id = new ObjectId(req.params.id);

  const user = await collection.findOne({ _id: id });

  res.status(200).json(user);
});

app.put("/:id", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);

  const id = new ObjectId(req.params.id);
  const newUser = req.body;

  await collection.replaceOne({ _id: id }, newUser);

  const updatedUser = await collection.findOne({ _id: id });

  res.status(200).json(updatedUser);
});

app.patch("/:id", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);

  const id = new ObjectId(req.params.id);
  const newUser = req.body;

  await collection.updateOne({ _id: id }, { $set: newUser });

  const updatedUser = await collection.findOne({ _id: id });

  res.status(200).json(updatedUser);
});

app.delete("/:id", async (req, res) => {
  const db = await connect();
  const collection = db.collection(collName);

  const id = new ObjectId(req.params.id);

  await collection.deleteOne({ _id: id });

  res.status(200).json(`User ${id} deleted successfully!`);
});

app.listen(5000, () => console.log("port 5000 is running"));
