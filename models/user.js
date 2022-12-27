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
        require: false,
      },
      required: false,
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
