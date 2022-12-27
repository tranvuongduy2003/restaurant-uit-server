const User = require('../models/user');
const Order = require('../models/order');
const { httpStatus } = require('../utils/httpStatus');
const { status } = require('../utils/status');

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    res
      .status(httpStatus.OK)
      .json({ message: 'Get user successfully!', user: user });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatar = req.body.avatar;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const cart = req.body.cart;

    const cartItems = cart || [];
    let totalPrice = 0;
    cart?.forEach((item) => {
      totalPrice = item.qty * item.price + totalPrice;
    });

    const user = await User.findOne({ _id: userId });
    user.avatar = avatar;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.cart = { items: cartItems, totalPrice: totalPrice };

    const newUser = await user.save();

    res.status(httpStatus.OK).json({
      message: 'Update user successfully',
      user: newUser,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.pay = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const desc = req.body.desc;
    const method = req.body.method;
    const items = req.body.items;

    let totalPrice = 0;
    items?.forEach((item) => {
      totalPrice = item.qty * item.price + totalPrice;
    });

    const user = await User.findOne({ _id: userId });
    user.cart = { items: [], totalPrice: 0 };

    await user.save();

    const order = new Order({
      userId: userId,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      desc: desc,
      method: method,
      items: items || [],
      totalPrice: totalPrice,
      status: status.PENDING,
    });

    await order.save();

    res.status(httpStatus.OK).json({
      message: 'Order foods successfully',
      order: order,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
