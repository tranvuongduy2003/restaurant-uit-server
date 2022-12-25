const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedUserSchema = new Schema(
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
      type: Number,
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
  },
  { timestamps: true }
);

deletedUserSchema.index({ name: 'text' });

module.exports = mongoose.model('DeletedUser', deletedUserSchema);
