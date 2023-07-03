const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Accomodation",
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  checkInDate: {
    type: Date,
    required: true,
  },

  checkOutDate: {
    type: Date,
    required: true,
  },

  numberOfGuests: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
