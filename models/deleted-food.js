const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deletedFoodSchema = new Schema(
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
        ref: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    posterImage: {
      ref: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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

deletedFoodSchema.index({ name: 'text', categoryId: 'text' });

module.exports = mongoose.model('DeletedFood', deletedFoodSchema);
