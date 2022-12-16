const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controller/auth');
const isUser = require('../middleware/is-user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.post('/refresh', authController.refreshToken);

router.post('/logout/:userId', authController.logout);

router.get('/user/:id', isAuth, isUser, authController.getUser);

router.post('/user/:id', isAuth, isUser, authController.editUser);

module.exports = router;
