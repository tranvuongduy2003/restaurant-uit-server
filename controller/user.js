const User = require('../models/user');
const { httpStatus } = require('../utils/httpStatus');

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
