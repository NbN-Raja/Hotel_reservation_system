const mongoose = require("mongoose");

const Schema =mongoose.Schema
// Rooms models here
const Rooms = mongoose.model(
  "room",
  new mongoose.Schema({
    Room_type: String,
    Room_price: Number,
    Room_capacity: Number,
    Room_foodservices: String,
    Room_ac: String,
    Room_images: String,
    hotel_id: String,
    mod_id:String,
    Room_amenities: [],
    deletedAt: {
      type: Date,
      default: null,
    },
    restoreAt: {
      type: Date,
      default: null,
    },
    hotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],


    // reviews: [{ type: Schema.Types.ObjectId, ref:'reviews' }],
    time: { type: Date, default: new Date().getTime() },
  })
);

module.exports = Rooms;
