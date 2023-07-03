const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    min: 4,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    min: 4,
  },
});

const User = model("User", userSchema);
module.exports = User;
