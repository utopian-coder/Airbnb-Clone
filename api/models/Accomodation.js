const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accomodationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  photos: {
    type: [String],
  },
  perks: {
    type: [String],
  },
  description: {
    type: String,
  },
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Accomodation = model("Accomodation", accomodationSchema);
module.exports = Accomodation;
