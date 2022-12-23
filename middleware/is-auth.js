const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { httpStatus } = require('../utils/httpStatus');

const { TokenExpiredError } = jwt;

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Không tìm thấy access token!');
    error.statusCode = httpStatus.FORBIDDEN;
    return next(error);
  }
  const token = authHeader.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      error.statusCode = httpStatus.UNAUTHORIZED;
      error.message = 'Unauthorized! Access Token was expired!';
    }
    return next(error);
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = httpStatus.UNAUTHORIZED;
    return next(error);
  }

  const user = await User.findOne({ email: decodedToken.email });
  req.user = user;

  next();
};
