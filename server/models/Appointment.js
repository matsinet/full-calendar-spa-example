const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  url: {
    type: String
  },
  allDay: {
    type: Boolean,
    default: false
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
