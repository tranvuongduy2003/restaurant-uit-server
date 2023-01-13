const jwt = require('jsonwebtoken');
const { httpStatus } = require('../utils/httpStatus');
const role = require('../utils/role');

const User = require('../models/user');

module.exports = async (req, res, next) => {
  const user = req.user;
  if (user && user.admin === true) {
    return next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.UNAUTHORIZED;
  }
};
