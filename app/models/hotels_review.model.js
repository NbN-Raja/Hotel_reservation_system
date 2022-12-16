const mongoose = require("mongoose");
const User = require("./user.model");

const Hotel_review = mongoose.model(
  "Hotel_review",
  new mongoose.Schema({
    star: Number,
    comment: String,
    like: Number,
    hotel_id: String,

    time: { type: Date, default: new Date().getTime() },
  })
);

module.exports = Hotel_review;
