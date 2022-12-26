const express = require('express');

const orderController = require('../controller/order');
const isUser = require('../middleware/is-user');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, isAdmin, orderController.getAllOrders);

router.get('/:id', isAuth, isUser, orderController.getAllOrdersById);

module.exports = router;
