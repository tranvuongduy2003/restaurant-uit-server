const { httpStatus } = require('../utils/httpStatus');

const Role = require('../models/role');
const { roleStatus } = require('../utils/role');

exports.checkFoodRole = async (req, res, next) => {
  const user = req.user;
  const roles = user?.role;
  const foodRole = roles.find(
    (item) => item._id.toString() === roleStatus.FOOD
  );

  if (foodRole) {
    const role = await Role.findOne({ _id: foodRole._id });
    req.role = role;
    return next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.FORBIDDEN;
  }
};

exports.checkCategoryRole = async (req, res, next) => {
  const user = req.user;
  const roles = user?.role;
  const categoryRole = roles.find(
    (item) => item._id.toString() === roleStatus.CATEGORY
  );

  if (categoryRole) {
    const role = await Role.findOne({ _id: categoryRole._id });
    req.role = role;
    next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.FORBIDDEN;
  }
};

exports.checkUserRole = async (req, res, next) => {
  const user = req.user;
  const roles = user?.role;
  const userRole = roles.find(
    (item) => item._id.toString() === roleStatus.USER
  );

  if (userRole) {
    const role = await Role.findOne({ _id: userRole._id });
    req.role = role;
    next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.FORBIDDEN;
  }
};

exports.checkBookingRole = async (req, res, next) => {
  const user = req.user;
  const roles = user?.role;
  const bookingRole = roles.find(
    (item) => item._id.toString() === roleStatus.BOOKING
  );

  if (bookingRole) {
    const role = await Role.findOne({ _id: bookingRole._id });
    req.role = role;
    next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.FORBIDDEN;
  }
};

exports.checkOrderRole = async (req, res, next) => {
  const user = req.user;
  const roles = user?.role;
  const orderRole = roles.find(
    (item) => item._id.toString() === roleStatus.ORDER
  );

  if (orderRole) {
    const role = await Role.findOne({ _id: orderRole._id });
    req.role = role;
    next();
  } else {
    const error = new Error('Bạn không có quyền truy cập tính năng này');
    error.statusCode = httpStatus.FORBIDDEN;
  }
};
