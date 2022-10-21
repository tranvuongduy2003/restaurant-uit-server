const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Food',
      },
    ],
  },
  { timestamps: true }
);

categorySchema.index({ name: 'text' });

module.exports = mongoose.model('Category', categorySchema);
