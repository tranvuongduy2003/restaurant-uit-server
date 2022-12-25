const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

reservationSchema.index({ name: 'text' });

module.exports = mongoose.model('Reservation', reservationSchema);
