const User = require('../models/user');
const Order = require('../models/order');
const { httpStatus } = require('../utils/httpStatus');

exports.getAllOrders = async (req, res, next) => {
  try {
    let orders = [];
    let orderParams = {};
    if (req.query.status) {
      orderParams = { ...orderParams, status: req.query.status };
    }
    if (req.query.search) {
      orderParams = { ...orderParams, $text: { $search: req.query.search } };
    }
    const totalItems = await Order.find(orderParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      orders = await Order.find(orderParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      orders = await Order.find(orderParams);
    }
    res.status(httpStatus.OK).json({
      message: 'Fetched orders successfully',
      orders: orders,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.getAllOrdersById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await Order.find({ userId: id });
    const totalItems = await Order.find({ userId: id }).countDocuments();
    res.status(httpStatus.OK).json({
      message: 'Fetched orders successfully',
      orders: orders,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
