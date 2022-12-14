const { httpStatus } = require('../utils/httpStatus');

module.exports = async (req, res, next) => {
  const user = req.user;
  const userId = req.params.id;
  if (user && userId && user.id === userId) {
    req.userId = userId;
    next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.UNAUTHORIZED;
  }
};
