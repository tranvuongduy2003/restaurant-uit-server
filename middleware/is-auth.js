const jwt = require('jsonwebtoken');
const { httpStatus } = require('../utils/httpStatus');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log('🚀 ~ file: is-auth.js ~ line 6 ~ authHeader', authHeader);
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = httpStatus.UNAUTHORIZED;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  console.log('🚀 ~ file: is-auth.js ~ line 13 ~ token', token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (error) {
    error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = httpStatus.UNAUTHORIZED;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
