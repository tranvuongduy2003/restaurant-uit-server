const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageRef: {
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

deletedCategorySchema.index({ name: 'text' });

module.exports = mongoose.model('DeletedCategory', deletedCategorySchema);
