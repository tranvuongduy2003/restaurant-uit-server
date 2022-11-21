const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    foods: [
      {
        food: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
