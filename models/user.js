const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          foodId: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
