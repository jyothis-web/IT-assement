const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // trim:true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  updated_time: {
    type: Date,
    default: Date.now,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("GingerUser", userSchema);

module.exports = userModel;
