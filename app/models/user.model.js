const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    address: String,
    email: String,
    gender: String,
    password: String,
    phone: Number,
    avatar: String,
    googleid: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      required: true,
    },
    time: { type: Date, default: new Date().getTime() },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
