const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
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
    address: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    items: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Category',
          require: false,
        },
        name: {
          type: String,
          require: false,
        },
        price: {
          type: Number,
          require: false,
        },
        imgUrl: {
          type: String,
          require: false,
        },
        qty: {
          type: Number,
          require: false,
        },
        require: false,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ name: 'text' });

module.exports = mongoose.model('Order', orderSchema);
