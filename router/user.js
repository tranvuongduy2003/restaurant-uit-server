const express = require('express');

const userController = require('../controller/user');
const isAuth = require('../middleware/is-auth');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.post('/:id/pay', isAuth, checkRole.checkUserRole, userController.pay);

router.get('/:id', isAuth, checkRole.checkUserRole, userController.getUser);

router.put('/:id', isAuth, checkRole.checkUserRole, userController.editUser);

module.exports = router;
