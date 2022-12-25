const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    foods: [
      {
        food: {
          type: Object,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
