const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const sendgridMail = require('@sendgrid/mail');

const User = require('../models/user');
const { httpStatus } = require('../utils/httpStatus');
const role = require('../utils/role');

sendgridMail.setApiKey(
  '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'
);

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    return null;
  }
};

const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    const token = await jwt.sign(
      {
        ...payload,
      },
      secretSignature,
      { expiresIn: tokenLife }
    );
    return token;
  } catch (error) {
    console.log(`Error in generate token + ${error}`);
    return null;
  }
};

const updateRefreshToken = async (email, refreshToken) => {
  try {
    await User.find({ email: email }).updateMany({}, [
      { $set: { refreshToken: refreshToken } },
    ]);
    return true;
  } catch (error) {
    return false;
  }
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Xác thực thất bại!');
      error.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = {
      email: email,
      password: hashedPassword,
      name: name,
      phoneNumber: phoneNumber,
      address: '',
      role: role.USER,
      avatar: {
        ref: '',
        url: '',
      },
    };
    const newUser = await createUser(userData);
    if (!newUser) {
      const error = new Error();
      error.statusCode = httpStatus.NOT_FOUND;
      error.message = 'Tạo người dùng thất bại!';
      throw error;
    }
    const accessToken = await generateToken({ email: email }, 'secret', '1m');

    if (!accessToken) {
      throw new Error();
    }

    let refreshToken = randToken.generate(accessToken.length);
    await updateRefreshToken(newUser.email, refreshToken);

    res.status(httpStatus.OK).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: newUser._id,
    });
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
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error();
      error.message = 'Sai mật khẩu';
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const accessToken = await generateToken({ email: email }, 'secret', '1m');

    if (!accessToken) {
      throw new Error();
    }

    let refreshToken = randToken.generate(accessToken.length);
    if (!user.refreshToken) {
      await updateRefreshToken(user.email, refreshToken);
    } else {
      refreshToken = user.refreshToken;
    }

    res.status(httpStatus.OK).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: user._id,
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: auth.js:152 ~ exports.login= ~ error',
      error.response.body.errors
    );
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      const error = new Error('Không tìm thấy access token!');
      error.statusCode = httpStatus.FORBIDDEN;
      next(error);
    }
    const accessTokenFromHeader = authHeader.split(' ')[1];

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
      const error = new Error();
      error.statusCode = httpStatus.NOT_FOUND;
      error.message = 'Không tìm thấy refresh token!';
      next(error);
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'secret';
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1m';

    const decoded = await jwt.decode(accessTokenFromHeader, 'secret');
    if (!decoded) {
      const error = new Error();
      error.statusCode = httpStatus.UNAUTHORIZED;
      error.message = 'Access token không hợp lệ!';
      next(error);
    }

    const email = decoded.email; // Lấy username từ payload

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error();
      error.statusCode = httpStatus.NOT_FOUND;
      error.message = 'Người dùng không tồn tại!';
      next(error);
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      const error = new Error();
      error.statusCode = httpStatus.UNAUTHORIZED;
      error.message = 'Refresh token không hợp lệ!';
      next(error);
    }

    const accessToken = await generateToken(
      {
        email: email,
      },
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      const error = new Error();
      error.statusCode = httpStatus.UNAUTHORIZED;
      error.message = 'Tạo access token không thành công, vui lòng thử lại!';
      next(error);
    }
    return res.status(httpStatus.OK).json({
      message: 'Refresh access token successfully!',
      accessToken: accessToken,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findOne({ _id: userId }).updateOne(
      {},
      { $unset: { refreshToken: '' } }
    );
    res.status(httpStatus.OK).json({ message: 'Logout successfully!' });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

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

    const user = await User.findOne({ _id: userId });
    user.avatar = avatar;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;

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
