const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
=======
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
>>>>>>> master
      },
    ],
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======
categorySchema.index({ name: 'text' });

>>>>>>> master
module.exports = mongoose.model('Category', categorySchema);
