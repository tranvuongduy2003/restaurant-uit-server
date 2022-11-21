const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { httpStatus } = require('../utils/httpStatus');
const role = require('../utils/role');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed!');
      error.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
      phoneNumber: phoneNumber,
      role: role.USER,
    });
    const newUser = await user.save();
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      'secret'
    );
    res
      .status(httpStatus.CREATED)
      .json({ message: 'User created!', token: token, user: newUser });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error();
      error.message = 'Không tồn tại tài khoản';
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error();
      error.message = 'Sai mật khẩu';
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      'secret'
    );
    res.status(httpStatus.OK).json({ token: token, user: user });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
