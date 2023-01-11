const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
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
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
