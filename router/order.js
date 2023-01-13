const express = require('express');

const orderController = require('../controller/order');
const isAuth = require('../middleware/is-auth');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get('/', isAuth, checkRole.checkOrderRole, orderController.getAllOrders);

router.delete(
  '/:id',
  isAuth,
  checkRole.checkOrderRole,
  orderController.deleteOrder
);

router.put(
  '/:id',
  isAuth,
  checkRole.checkOrderRole,
  orderController.updateOrder
);

router.get(
  '/:id',
  isAuth,
  checkRole.checkOrderRole,
  orderController.getAllOrdersById
);

module.exports = router;
