const User = require('../models/user');
const Order = require('../models/order');
const { httpStatus } = require('../utils/httpStatus');

exports.getAllOrders = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
        .sort({ date: 'desc' })
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

exports.deleteOrder = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.delete) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({
      message: 'Deleted order successfully',
      order: order,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.edit) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const id = req.params.id;
    const userId = req.body.userId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const desc = req.body.desc;
    const method = req.body.method;
    const items = req.body.items;
    const action = req.body.action;
    const status = req.body.status;

    const order = await Order.findOne({ _id: id });

    if (userId) order.userId = userId;
    if (name) order.name = name;
    if (phoneNumber) order.phoneNumber = phoneNumber;
    if (address) order.address = address;
    if (desc) order.desc = desc;
    if (method) order.method = method;
    if (items) order.items = items;
    if (action) order.action = action;
    if (status) order.status = status;

    const newOrder = await order.save();

    res.status(httpStatus.OK).json({
      message: 'Updated order successfully',
      order: newOrder,
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
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const userId = req.params.id;
    const orders = await Order.find({ userId: userId });
    const totalItems = await Order.find({ userId: userId }).countDocuments();
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
