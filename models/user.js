const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      ref: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
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
      // items: [
      //   {
      //     foodId: {
      //       type: Schema.Types.ObjectId,
      //       ref: 'Food',
      //       required: false,
      //     },
      //     quantity: {
      //       type: Number,
      //       required: false,
      //     },
      //     required: false,
      //   },
      // ],
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
