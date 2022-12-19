const mongoose = require("mongoose");
const User = require("./user.model");

const Hotels = mongoose.model(
  "Hotel",
  new mongoose.Schema({
    Hotel_name: String,
    Hotel_description: String,
    Hotel_address: String,
    Hotel_phone: Number,
    Hotel_image: String,
    Hotel_email: String,
    Mod_id: String,
    Price: Number,
    isDeleted: { type: Boolean, default: false },
    deletedAt: {
      type: Date,
      default: null,
    },
    restoreAt: {
      type: Date,
      default: null,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
      },
    ],
    
    time: { type: Date, default: new Date().getTime() },
    
  })
);

module.exports = Hotels;
