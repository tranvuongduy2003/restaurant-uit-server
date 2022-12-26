const express = require('express');

const userController = require('../controller/user');
const isUser = require('../middleware/is-user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/:id', isAuth, isUser, userController.getUser);

router.put('/:id', isAuth, isUser, userController.editUser);

module.exports = router;
