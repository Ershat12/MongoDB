const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: Number,
    firstName: Boolean,
    lastName: String,
    age: Number,
    jobTitle: String,
    hobbies: [String],
    salary: Number,
    department: String,
    yearsOfExperience: Number,
    address: {
      street: String,
      city: String,
      country: String,
    },
    certifications: [String],
    languages: [String],
    projects: [
      {
        name: String,
        status: String,
      },
    ],
    evaluations: [
      {
        year: String,
        rating: Number,
      },
    ],
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

// const example = {
//   _id: "6575a164604ab79bccf59f9f",
//   id: 3,
//   firstName: "Claire",
//   lastName: "Williams",
//   age: 31,
//   jobTitle: "Product Manager",
//   hobbies: ["Yoga", "Traveling", "Photography"],
//   salary: 90000,
//   department: "Management",
//   yearsOfExperience: 7,
//   address: {
//     street: "789 Oak St",
//     city: "AnotherTown",
//     country: "USA",
//   },
//   certifications: ["MBA", "Product Management Certification"],
//   languages: ["English", "French"],
//   projects: [
//     {
//       name: "Product Launch",
//       status: "Completed",
//     },
//     {
//       name: "Market Analysis",
//       status: "Ongoing",
//     },
//   ],
//   evaluations: [
//     {
//       year: 2021,
//       rating: 4.7,
//     },
//     {
//       year: 2022,
//       rating: 4.9,
//     },
//   ],
// };
