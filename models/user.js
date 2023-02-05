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
    role: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Role',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        read: {
          type: Boolean,
          required: true,
        },
        add: {
          type: Boolean,
          required: true,
        },
        edit: {
          type: Boolean,
          required: true,
        },
        delete: {
          type: Boolean,
          required: true,
        },
      },
    ],
    cart: {
      items: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
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
    admin: {
      type: Boolean,
      require: false,
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
