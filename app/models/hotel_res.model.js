const mongoose = require("mongoose");
const User = require("./user.model");

const Hotel_reservations = mongoose.model(
  "Hotel_reservation",
  new mongoose.Schema({
    Username: String,
    Lastname: String,
    Address: String,
    Email: String,
    Phone: Number,
    Entry_date: Date,
    Exit_date: Date,
    Room_type: Number,
    Hotel_id: String,
    Price: Number,
    Status: ["COMPLETED", "INPAID", "PAID"],

    time: { type: Date, default: new Date().getTime() },
  })
);

module.exports = Hotel_reservations;
