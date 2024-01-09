const mongoose = require("mongoose");

// 1) дописать поля в схемах
// 2) превратитть схемы в модели
// 3) экспортировать модели
// 4) написать сервер express.js
// 5) написать все CRUD эндпоинты

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  year: Number,
  count: Number,
  publisher: String,
  inStock: Boolean,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Book = mongoose.model("Book", bookSchema);

const storeSchema = new mongoose.Schema({
  name: String,
  rent: Number,
  address: String,
  area: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

const Store = mongoose.model("Store", storeSchema);

const citySchema = new mongoose.Schema({
  name: String,
  region: String,
  population: String,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

const City = mongoose.model("City", citySchema);

const clientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  preferences: [String],
  discountCard: Boolean,
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  ],
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);

module.exports = { Book, Store, City, Client };
