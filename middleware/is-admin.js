const jwt = require('jsonwebtoken');
const { httpStatus } = require('../utils/httpStatus');
const role = require('../utils/role');

const User = require('../models/user');

module.exports = async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  if (user && user.role === role.ADMIN) {
    next();
  } else {
    const error = new Error('Not authenticated.');
    error.statusCode = httpStatus.UNAUTHORIZED;
  }
};
