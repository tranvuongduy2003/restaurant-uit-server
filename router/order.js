const express = require('express');

const orderController = require('../controller/order');
const isUser = require('../middleware/is-user');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, isAdmin, orderController.getAllOrders);

router.delete('/:id', isAuth, isAdmin, orderController.deleteOrder);

router.put('/:id', isAuth, isAdmin, orderController.updateOrder);

router.get('/:userId', isAuth, isUser, orderController.getAllOrdersById);

module.exports = router;
