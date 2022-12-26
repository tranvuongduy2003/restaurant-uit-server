const mongoose = require('mongoose');
const Food = require('./food');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      ref: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
          },
          name: {
            type: String,
          },
          price: {
            type: Number,
          },
          imgUrl: {
            type: String,
          },
          qty: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
      },
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ name: 'text' });

module.exports = mongoose.model('User', userSchema);
