const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    posterImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bestDeals: {
      type: Boolean,
    },
    popular: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);
